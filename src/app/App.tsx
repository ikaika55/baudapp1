import { useState } from "react";
import { Shell } from "./Shell";
import { seedEvts, seedRsvps } from "../data/events";
import { groups } from "../data/groups";
import { ME, prof } from "../data/users";
import { EvtSheet } from "../features/events/EvtSheet";
import { byStart } from "../lib/date";
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
import { A, M } from "../theme";
import { CalI, HmI, PrI, UsrI } from "../ui/icons";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedAct, setSelectedAct] = useState(null);
  const [events, setEvents] = useState(seedEvts);
  const [posts, setPosts] = useState([]);
  const [rsvps, setRsvps] = useState(seedRsvps);
  const [selectedEvt, setSelectedEvt] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [photos, setPhotos] = useState(prof.phs);
  const [avatar, setAvatar] = useState(prof.av);
  const [grp, setGrp] = useState("フットサル部");
  const openGrp = (name) => { setGrp(name); setPage("detail"); };
  const openUser = (id) => { setSelectedUser(id); setPage("member"); };
  const addEvent = (ev) => setEvents([...events, ev].sort(byStart));
  const onRsvp = (eventId, answer) => setRsvps(prev => {
    const rest = prev.filter(r => !(r.eventId === eventId && r.userId === ME));
    return answerOf(prev, eventId, ME) === answer ? rest : [...rest, { eventId, userId: ME, answer }];
  });
  const nav = [
    { id: "calendar", lb: "イベント", ic: <CalI s={22} /> },
    { id: "home", lb: "ホーム", ic: <HmI /> },
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
      {page === "home" && <HomePage go={setPage} onSelectAct={setSelectedAct} events={events} posts={posts} setPosts={setPosts} openGrp={openGrp} onRsvp={onRsvp} rsvps={rsvps} />}
              {page === "profile" && <ProfPage go={setPage} photos={photos} setPhotos={setPhotos} avatar={avatar} setAvatar={setAvatar} />}
              {page === "members" && <MembersPage go={setPage} openUser={openUser} />}
              {page === "member" && <MemberPage go={setPage} userId={selectedUser} openGrp={openGrp} />}
              {page === "groups" && <GrpsPage go={setPage} openGrp={openGrp} />}
              {page === "detail" && <DetPage go={setPage} onSelectAct={setSelectedAct} events={events} grp={grp} onRsvp={onRsvp} rsvps={rsvps} openUser={openUser} />}
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
              <EvtSheet e={events.find(x => x.id === selectedEvt)} onClose={() => setSelectedEvt(null)}
                onRsvp={onRsvp} rsvps={rsvps} openGrp={openGrp} />
            )}
            {/* Activity Detail Overlay */}
            {selectedAct && (
              <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", borderRadius: 37, overflow: "hidden" }}>
                <div onClick={() => setSelectedAct(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                <div style={{ position: "relative", marginTop: "auto", background: "#fff", borderRadius: "16px 16px 0 0", maxHeight: "80%", overflowY: "auto", scrollbarWidth: "none" }}>
                  <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
                    <div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} />
                  </div>
                  <img src={selectedAct.img} alt="" style={{ width: "100%", height: 180, objectFit: "cover", marginTop: 8 }} />
                  <div style={{ padding: 16 }}>
                    <span style={{ fontSize: 12, color: A, fontWeight: 600 }}>{selectedAct.g}</span>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: "4px 0 0" }}>{selectedAct.t}</h2>
                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                      <span style={M}><CalI />{selectedAct.d}</span>
                      <span style={M}><UsrI s={12} />{selectedAct.p}人参加</span>
                    </div>
                    <div style={{ marginTop: 14, color: "#555", fontSize: 13, lineHeight: 1.8 }}>{selectedAct.detail}</div>
                    {selectedAct.photos && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>写真</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                          {selectedAct.photos.map((ph, i) => (
                            <div key={i} style={{ aspectRatio: "1/1", borderRadius: 8, overflow: "hidden" }}>
                              <img src={ph} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedAct.members && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>参加メンバー</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {selectedAct.members.map((name, i) => (
                            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#555", fontWeight: 500 }}>
                              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              </div>
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <button onClick={() => setSelectedAct(null)} style={{ width: "100%", marginTop: 20, padding: "11px 0", background: "#f5f5f5", border: "none", borderRadius: 10, color: "#888", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>閉じる</button>
                  </div>
                </div>
              </div>
            )}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </Shell>
  );
}
