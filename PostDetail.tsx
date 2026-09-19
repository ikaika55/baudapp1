import { useState } from "react";
import { ME } from "../../data/users";
import { findUser, gColor } from "../../lib/people";
import { A } from "../../theme";
import { Av } from "../../ui/Avatar";
import { BkI } from "../../ui/icons";

export function PostDetail({ post, onClose, onUpdate, onDelete }) {
  const au = findUser(post.u || ME);
  const joined = post.joined || [];
  const comments = post.comments || [];
  const mine = (post.u || ME) === ME;
  const likes = post.likes || 0;
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(false);
  const send = () => {
    if (!text.trim()) return;
    onUpdate({ ...post, comments: [...comments, { id: Date.now(), u: ME, text: text.trim(), d: "今" }] });
    setText("");
  };
  const stat = (n, lb) => (
    <span style={{ fontSize: 12, color: "#888" }}><b style={{ color: "#111", fontWeight: 700 }}>{n}</b> {lb}</span>
  );

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 400, background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 14px", borderBottom: "1px solid #f0efec", flexShrink: 0 }}>
        <button onClick={onClose} aria-label="戻る" style={{ background: "none", border: "none", cursor: "pointer", color: "#444", padding: 0, display: "flex" }}><BkI s={20} /></button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>ポスト</span>
        {mine && (
          <div style={{ marginLeft: "auto", position: "relative" }}>
            <button onClick={() => setMenu(!menu)} aria-label="メニュー" style={{ background: "none", border: "none", cursor: "pointer", color: "#c8c8c8", padding: 0, display: "flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>
            </button>
            {menu && (
              <>
                <div onClick={() => setMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 410 }} />
                <div style={{ position: "absolute", top: 24, right: 0, zIndex: 420, minWidth: 156, background: "#fff", borderRadius: 10, border: "1px solid #eee", boxShadow: "0 8px 24px rgba(0,0,0,0.16)", overflow: "hidden" }}>
                  <button onClick={() => { setMenu(false); onDelete(); onClose(); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "11px 13px", background: "none", border: "none", cursor: "pointer", color: "#e05656", fontSize: 13, fontWeight: 700 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    ポストを削除
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "14px 16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Av u={au} s={44} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{au.nm}</div>
              <div style={{ fontSize: 11.5, color: "#999", marginTop: 1 }}>{au.dept}</div>
            </div>
            {post.g && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "#fff", background: gColor(post.g), borderRadius: 5, padding: "3px 9px" }}>{post.g}</span>}
          </div>

          <div style={{ fontSize: 17, lineHeight: 1.75, color: "#111", whiteSpace: "pre-wrap" }}>{post.ds}</div>

          {post.recruiting && (
            <div style={{ marginTop: 14, padding: 13, borderRadius: 12, background: "#FFF9F0", border: "1px solid #F5DEB3" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: A }}>参加者募集中</span>
                {joined.length > 0 && <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>{joined.length}人が参加</span>}
              </div>
              <button onClick={() => onUpdate({ ...post, joined: joined.includes("あなた") ? joined.filter(x => x !== "あなた") : [...joined, "あなた"] })}
                style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  background: joined.includes("あなた") ? "#f0f0f0" : A, color: joined.includes("あなた") ? "#999" : "#fff" }}>
                {joined.includes("あなた") ? "✓ 参加済み" : "参加する"}
              </button>
            </div>
          )}

          <div style={{ fontSize: 12, color: "#aaa", margin: "14px 0 12px" }}>{post.d}</div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "11px 0", borderTop: "1px solid #f0efec", borderBottom: "1px solid #f0efec" }}>
            {stat(comments.length, "コメント")}
            <button onClick={() => onUpdate({ ...post, likes: likes + (post.liked ? -1 : 1), liked: !post.liked })}
              style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, padding: 0, color: post.liked ? "#e05688" : "#999" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill={post.liked ? "#e05688" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              {likes > 0 ? likes : ""}
            </button>
          </div>
        </div>

        <div>
          {comments.length === 0 ? (
            <div style={{ textAlign: "center", color: "#ccc", fontSize: 12.5, padding: "34px 20px" }}>まだコメントはありません</div>
          ) : comments.map(c => {
            const cu = findUser(c.u || ME);
            return (
              <div key={c.id} style={{ display: "flex", gap: 10, padding: "13px 16px", borderBottom: "1px solid #f4f3f0" }}>
                <Av u={cu} s={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{cu.nm}</span>
                    <span style={{ fontSize: 11, color: "#bbb" }}>· {c.d}</span>
                  </div>
                  <div style={{ fontSize: 13.5, color: "#333", marginTop: 3, lineHeight: 1.6 }}>{c.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 9, alignItems: "center", padding: "10px 14px", borderTop: "1px solid #f0efec", flexShrink: 0, background: "#fff" }}>
        <Av u={findUser(ME)} s={30} />
        <input type="text" value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()} placeholder="コメントを書く..."
          style={{ flex: 1, padding: "9px 14px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fafafa", fontSize: 13, color: "#111", outline: "none" }} />
        <button onClick={send} disabled={!text.trim()}
          style={{ background: text.trim() ? A : "#e5e7eb", border: "none", borderRadius: 999, padding: "8px 16px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: text.trim() ? "pointer" : "default", flexShrink: 0 }}>返信</button>
      </div>
    </div>
  );
}
