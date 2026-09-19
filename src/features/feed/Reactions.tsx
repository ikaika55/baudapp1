import { useState } from "react";
import { ME } from "../../data/users";
import { findUser } from "../../lib/people";
import { A } from "../../theme";
import { Av } from "../../ui/Avatar";

export function Reactions({ meta, onUpdate, open, setOpen, bare, onComment }) {
  const [cmtText, setCmtText] = useState("");
  const likes = meta.likes || 0;
  const comments = meta.comments || [];
  const add = () => {
    if (!cmtText.trim()) return;
    onUpdate({ ...meta, comments: [...comments, { id: Date.now(), u: ME, text: cmtText, d: "今" }] });
    setCmtText("");
  };
  return (
    <>
      <div style={{ display: "flex", gap: 22, paddingTop: bare ? 9 : 8, borderTop: bare ? "none" : "1px solid #f0f0f0" }}>
        <button onClick={() => (onComment ? onComment() : setOpen(!open))} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 12 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {comments.length > 0 ? comments.length : "コメント"}
        </button>
        <button onClick={() => onUpdate({ ...meta, likes: likes + (meta.liked ? -1 : 1), liked: !meta.liked })}
          style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 12, color: meta.liked ? "#e05688" : "#999" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill={meta.liked ? "#e05688" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          {likes > 0 ? likes : ""}
        </button>
      </div>
      {open && !onComment && (
        <div style={{ marginTop: 10, borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <Av u={findUser(c.u || ME)} s={24} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{findUser(c.u || ME).nm}</span>
                <span style={{ fontSize: 10, color: "#ccc", marginLeft: 6 }}>{c.d}</span>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2, lineHeight: 1.5 }}>{c.text}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="text" value={cmtText} onChange={e => setCmtText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && add()} placeholder="コメントする..."
              style={{ flex: 1, padding: "8px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fafafa", fontSize: 12, color: "#111", outline: "none" }} />
            <button onClick={add} style={{ background: cmtText.trim() ? A : "#e5e7eb", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: cmtText.trim() ? "pointer" : "default", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cmtText.trim() ? "#fff" : "#bbb"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
