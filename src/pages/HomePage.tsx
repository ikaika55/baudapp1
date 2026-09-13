import { useState } from "react";
import { acts } from "../data/activities";
import { groups } from "../data/groups";
import { EvtActions, EvtNote } from "../features/events/EvtActions";
import { PostCard } from "../features/posts/PostCard";
import { fmtDate, tRange } from "../lib/date";
import { myAdminGrps } from "../lib/people";
import { isPublic } from "../lib/rsvp";
import { A, C, M } from "../theme";
import { CalI, PinI, UsrI } from "../ui/icons";

export function HomePage({ go, onSelectAct, events, posts, setPosts, openGrp, onRsvp, rsvps }) {
  const [showAll, setShowAll] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [postText, setPostText] = useState("");
  const [recruiting, setRecruiting] = useState(false);
  const [interested, setInterested] = useState(false);
  const canPost = false; // シェア機能を一旦非表示（戻すときは myAdminGrps().length > 0 に）
  const pubEvts = events.filter(isPublic);
  const visibleEvts = showAll ? pubEvts : pubEvts.slice(0, 3);
  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#555", marginBottom: 10 }}>ホットなボド活</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
          {groups.map(g => (
            <button key={g.id} onClick={() => openGrp(g.name)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color }} />{g.name}
            </button>
          ))}
        </div>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 10 }}>イベント</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 6 }}>
        {visibleEvts.map(e => (
          <div key={e.id} style={{ ...C, padding: 14 }}>
            <span style={{ fontSize: 11, color: A, fontWeight: 600 }}>{e.g}</span>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginTop: 2 }}>{e.t}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <span style={M}><CalI />{fmtDate(e.start)} {tRange(e)}</span>
              <span style={M}><PinI />{e.l}</span>
            </div>
            <EvtNote e={e} />
            <EvtActions e={e} onRsvp={onRsvp} rsvps={rsvps} />
          </div>
        ))}
      </div>
      {pubEvts.length > 3 && (
        <button onClick={() => setShowAll(!showAll)} style={{ width: "100%", padding: "10px 0", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, color: A, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          {showAll ? "閉じる" : `もっと見る（残り${pubEvts.length - 3}件）`}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAll ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="m6 9 6 6 6-6"/></svg>
        </button>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>みんなのボド活</h3>
        {canPost && <button onClick={() => setShowPost(!showPost)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 999, border: "none", background: showPost ? "#f3f3f3" : A, color: showPost ? "#888" : "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          {showPost ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>閉じる</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12h16"/><path d="M12 4v16"/></svg>シェア</>
          )}
        </button>}
      </div>
      {/* Post form - X style */}
      {canPost && showPost && (
        <div style={{ marginBottom: 12, borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", gap: 12, padding: "12px 0" }}>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <textarea
                value={postText} onChange={e => setPostText(e.target.value)}
                placeholder="いまどんなボド活してる？"
                style={{ width: "100%", minHeight: 80, padding: 0, border: "none", background: "transparent", fontSize: 15, color: "#111", resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              {/* Recruitment toggle */}
              {recruiting && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#FFF5E6", marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  <span style={{ fontSize: 12, color: A, fontWeight: 600 }}>参加者を募集中</span>
                  <button onClick={() => setRecruiting(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              )}
              {interested && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#FFF0F5", marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  <span style={{ fontSize: 12, color: "#e05688", fontWeight: 600 }}>「興味ある！」リアクション付き</span>
                  <button onClick={() => setInterested(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              )}
              <div style={{ height: 1, background: "#e5e7eb", marginBottom: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 2 }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: A, padding: 6, borderRadius: 999 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </button>
                  <button onClick={() => setInterested(!interested)} style={{ background: interested ? "#FFF0F5" : "none", border: "none", cursor: "pointer", color: A, padding: 6, borderRadius: 999 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                  <button onClick={() => setRecruiting(!recruiting)} style={{ background: recruiting ? "#FFF5E6" : "none", border: "none", cursor: "pointer", color: A, padding: 6, borderRadius: 999 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  </button>
                </div>
                <button
                  onClick={() => { if (postText.trim()) { setPosts([{ id: Date.now(), ds: postText, d: "今日", comments: [], recruiting, interested, joined: [], likes: 0 }, ...posts]); setPostText(""); setShowPost(false); setRecruiting(false); setInterested(false); } }}
                  style={{ padding: "8px 20px", background: postText.trim() ? A : "rgba(232,155,60,0.5)", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: postText.trim() ? "pointer" : "default" }}
                >ポストする</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* User posts with comments */}
        {posts.map(p => (
          <PostCard key={p.id} post={p} onDelete={() => setPosts(posts.filter(x => x.id !== p.id))} onUpdate={(updated) => setPosts(posts.map(x => x.id === p.id ? updated : x))} />
        ))}
        {/* Existing activities */}
        {acts.map(a => (
          <button key={a.id} onClick={() => onSelectAct(a)} style={{ ...C, overflow: "hidden", border: "none", cursor: "pointer", textAlign: "left", width: "100%", padding: 0 }}>
            <img src={a.img} alt="" style={{ width: "100%", height: 140, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <span style={{ fontSize: 11, color: A, fontWeight: 600 }}>{a.g}</span>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginTop: 2 }}>{a.t}</div>
              <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>{a.ds}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "#bbb" }}>
                <span>{a.d}</span><span style={{ display: "flex", alignItems: "center", gap: 3 }}><UsrI s={11} />{a.p}人</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
