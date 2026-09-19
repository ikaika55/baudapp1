import { useState } from "react";
import { Shell } from "./Shell";
import { seedActMeta } from "../data/activities";
import { seedEvts, seedRsvps } from "../data/events";
import { groups, seedMem } from "../data/groups";
import { seedPosts } from "../data/posts";
import { ME, prof } from "../data/users";
import { ActDetail } from "../features/activities/ActDetail";
import { EvtSheet } from "../features/events/EvtSheet";
import { ComposeSheet } from "../features/posts/ComposeSheet";
import { PostDetail } from "../features/posts/PostDetail";
import { byStart } from "../lib/date";
import { rosterOf } from "../lib/people";
import { answerOf } from "../lib/rsvp";
import { AdminPage } from "../pages/AdminPage";
import { CalPage } from "../pages/CalPage";
import { DetPage } from "../pages/DetPage";
import { GrpsPage } from "../pages/GrpsPage";
import { HomePage } from "../pages/HomePage";
import { MemberPage } from "../pages/MemberPage";
import { MembersPage } from "../pages/MembersPage";
import { NewRecordPage } from "../pages/NewRecordPage";
import { ProfPage } from "../pages/ProfPage";
import { A } from "../theme";
import { CalI, HmI, PrI, UsrI } from "../ui/icons";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedAct, setSelectedAct] = useState(null);
  const [compose, setCompose] = useState(false);
  const [openPostId, setOpenPostId] = useState(null);
  const [mem, setMem] = useState(seedMem);
  const toggleJoin = (name) => setMem({
    ...mem,
    [name]: rosterOf(mem, name).includes(ME)
      ? rosterOf(mem, name).filter(u => u !== ME)
      : [...rosterOf(mem, name), ME],
  });
  const [events, setEvents] = useState(seedEvts);
  const [posts, setPosts] = useState(seedPosts);
  const [actMeta, setActMeta] = useState(seedActMeta);
  const [rsvps, setRsvps] = useState(seedRsvps);
  const [selectedEvt, setSelectedEvt] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [photos, setPhotos] = useState(prof.phs);
  const [avatar, setAvatar] = useState(prof.av);
  const [grp, setGrp] = useState("フットサル部");
  const openGrp = (name) => { setGrp(name); setPage("detail"); };
  const openAct = (a) => setSelectedAct(a);
  const addPost = (p) => setPosts([{ ...p, id: Date.now(), u: ME, d: "今" }, ...posts]);
  const openUser = (id) => { setSelectedUser(id); setPage("member"); };
  const addEvent = (ev) => setEvents([...events, ev].sort(byStart));
  const deleteEvent = (id) => { setEvents(events.filter(x => x.id !== id)); setSelectedEvt(null); };
  const onRsvp = (eventId, answer) => setRsvps(prev => {
    const rest = prev.filter(r => !(r.eventId === eventId && r.userId === ME));
    return answerOf(prev, eventId, ME) === answer ? rest : [...rest, { eventId, userId: ME, answer }];
  });
  const nav = [
    { id: "calendar", lb: "イベント", ic: <CalI s={22} /> },
    { id: "home", lb: "SNS", ic: <HmI /> },
    { id: "groups", lb: "ボド部", ic: <UsrI s={22} /> },
    { id: "profile", lb: "プロフィール", ic: <PrI /> },
  ];
  const on = (id) => page === id || (id === "groups" && (page === "groups" || page === "detail" || page === "admin" || page === "newRecord")) || (id === "profile" && (page === "members" || page === "member"));

  // ?frame を付けて開いたときだけ端末モックを表示する（デモ・スクショ用）
  const framed = typeof window !== "undefined" && window.location.search.includes("frame");

  return (
    <Shell framed={framed}>
      {/* Screen */}
      <div style={{ width: "100%", height: "100%", borderRadius: framed ? 37 : 0, overflow: "hidden", background: "#f7f6f3", display: "flex", flexDirection: "column", fontFamily: "'Noto Sans JP', -apple-system, 'Hiragino Sans', sans-serif", position: "relative" }}>
            {framed && <div style={{ height: 48 }} />}
            <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "10px 16px", paddingTop: framed ? 10 : "calc(10px + env(safe-area-inset-top))", flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: 18, color: A }}>コミュニティ</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="no-scrollbar">
              {page === "calendar" && <CalPage go={setPage} events={events} openGrp={openGrp} addEvent={addEvent} onOpenEvt={setSelectedEvt} />}
      {page === "home" && <HomePage onSelectAct={openAct} posts={posts} setPosts={setPosts} actMeta={actMeta} setActMeta={setActMeta} onOpenPost={setOpenPostId} events={events} rsvps={rsvps} onRsvp={onRsvp} onOpenEvt={setSelectedEvt} />}
              {page === "profile" && <ProfPage go={setPage} photos={photos} setPhotos={setPhotos} avatar={avatar} setAvatar={setAvatar} mem={mem} events={events} rsvps={rsvps} onOpenEvt={setSelectedEvt} />}
              {page === "members" && <MembersPage go={setPage} openUser={openUser} mem={mem} />}
              {page === "member" && <MemberPage go={setPage} userId={selectedUser} openGrp={openGrp} mem={mem} />}
              {page === "groups" && <GrpsPage go={setPage} openGrp={openGrp} mem={mem} />}
              {page === "detail" && <DetPage go={setPage} onSelectAct={openAct} events={events} grp={grp} onRsvp={onRsvp} rsvps={rsvps} openUser={openUser} mem={mem} toggleJoin={toggleJoin} />}
              {page === "admin" && <AdminPage go={setPage} events={events} setEvents={setEvents} grp={grp} rsvps={rsvps} />}
              {page === "newRecord" && <NewRecordPage go={setPage} />}
            </div>
            <div style={{ background: "#fff", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around", padding: "6px 0 20px", paddingBottom: framed ? 20 : "calc(10px + env(safe-area-inset-bottom))", flexShrink: 0 }}>
              {nav.map(n => (
                <button key={n.id} onClick={() => setPage(n.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 12px",
                    color: on(n.id) ? A : "#ccc", fontWeight: on(n.id) ? 700 : 400, fontSize: 10 }}>
                  {n.ic}{n.lb}
                </button>
              ))}
            </div>
            {selectedEvt !== null && events.find(x => x.id === selectedEvt) && (
              <EvtSheet e={events.find(x => x.id === selectedEvt)} onClose={() => setSelectedEvt(null)} onDelete={deleteEvent}
                onRsvp={onRsvp} rsvps={rsvps} openGrp={openGrp} />
            )}
            {page === "home" && !compose && openPostId === null && !selectedAct && (
              <button onClick={() => setCompose(true)} aria-label="ポストする"
                style={{ position: "absolute", right: 16, bottom: 86, width: 54, height: 54, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: A, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 150,
                  boxShadow: "0 6px 18px rgba(232,155,60,0.45)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
            )}
            {compose && <ComposeSheet avatar={avatar} onClose={() => setCompose(false)} onPost={addPost} mem={mem} />}
            {openPostId !== null && posts.find(x => x.id === openPostId) && (
              <PostDetail post={posts.find(x => x.id === openPostId)} onClose={() => setOpenPostId(null)}
                onUpdate={(u) => setPosts(posts.map(x => x.id === openPostId ? u : x))}
                onDelete={() => setPosts(posts.filter(x => x.id !== openPostId))} />
            )}
            {selectedAct && (
              <ActDetail a={selectedAct} meta={actMeta[selectedAct.id] || {}}
                onUpdate={(m) => setActMeta({ ...actMeta, [selectedAct.id]: m })}
                onClose={() => setSelectedAct(null)} openGrp={openGrp} />
            )}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </Shell>
  );
}
