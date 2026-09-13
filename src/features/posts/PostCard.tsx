import { useState } from "react";
import { A, C } from "../../theme";

export function PostCard({ post, onDelete, onUpdate }) {
  const [cmtText, setCmtText] = useState("");
  const [showCmts, setShowCmts] = useState(false);
  const addComment = () => {
    if (!cmtText.trim()) return;
    onUpdate({ ...post, comments: [...post.comments, { id: Date.now(), text: cmtText, d: "今" }] });
    setCmtText("");
  };
  return (
    <div style={{ ...C, padding: 14, position: "relative" }}>
      <button onClick={onDelete} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 4 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>山田太郎</span>
          <span style={{ fontSize: 11, color: "#bbb", marginLeft: 8 }}>{post.d}</span>
        </div>
      </div>
      <div style={{ color: "#444", fontSize: 13, lineHeight: 1.6, marginBottom: post.recruiting ? 0 : 10 }}>{post.ds}</div>
      {/* Recruitment */}
      {post.recruiting && (
        <div style={{ margin: "10px 0", padding: 12, borderRadius: 10, background: "#FFF9F0", border: `1px solid #F5DEB3` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: A }}>参加者募集中</span>
            {(post.joined || []).length > 0 && (
              <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>{post.joined.length}人が参加</span>
            )}
          </div>
          <button
            onClick={() => {
              const j = post.joined || [];
              if (!j.includes("あなた")) {
                onUpdate({ ...post, joined: [...j, "あなた"] });
              }
            }}
            style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
              background: (post.joined || []).includes("あなた") ? "#f0f0f0" : A,
              color: (post.joined || []).includes("あなた") ? "#999" : "#fff",
            }}
          >{(post.joined || []).includes("あなた") ? "✓ 参加済み" : "参加する"}</button>
        </div>
      )}
      {/* Actions */}
      <div style={{ display: "flex", gap: 12, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>
        {post.interested && (
          <button onClick={() => onUpdate({ ...post, likes: (post.likes || 0) + ((post.liked) ? -1 : 1), liked: !post.liked })}
            style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 12,
              color: post.liked ? "#e05688" : "#999" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={post.liked ? "#e05688" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            興味ある！{(post.likes || 0) > 0 ? ` ${post.likes}` : ""}
          </button>
        )}
        <button onClick={() => setShowCmts(!showCmts)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 12 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {post.comments.length > 0 ? post.comments.length : "コメント"}
        </button>
      </div>
      {/* Comments section */}
      {showCmts && (
        <div style={{ marginTop: 10, borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
          {post.comments.map(c => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e5e7eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>ゲスト</span>
                <span style={{ fontSize: 10, color: "#ccc", marginLeft: 6 }}>{c.d}</span>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2, lineHeight: 1.5 }}>{c.text}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text" value={cmtText} onChange={e => setCmtText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addComment()}
              placeholder="コメントする..."
              style={{ flex: 1, padding: "8px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fafafa", fontSize: 12, color: "#111", outline: "none" }}
            />
            <button onClick={addComment} style={{ background: cmtText.trim() ? A : "#e5e7eb", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: cmtText.trim() ? "pointer" : "default", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cmtText.trim() ? "#fff" : "#bbb"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
