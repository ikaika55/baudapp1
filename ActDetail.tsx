import { useState } from "react";
import { ME, users } from "../../data/users";
import { findUser } from "../../lib/people";
import { A } from "../../theme";
import { Av, ClubAv } from "../../ui/Avatar";
import { ActImg } from "../../ui/Cover";
import { BkI } from "../../ui/icons";

export function ActDetail({ a, meta, onUpdate, onClose, openGrp }) {
  const comments = meta.comments || [];
  const likes = meta.likes || 0;
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    onUpdate({ ...meta, comments: [...comments, { id: Date.now(), u: ME, text: text.trim(), d: "今" }] });
    setText("");
  };
  const stat = (n, lb) => (
    <span style={{ fontSize: 12, color: "#888" }}><b style={{ color: "#111", fontWeight: 700 }}>{n}</b> {lb}</span>
  );

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 400, background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 14px", borderBottom: "1px solid #f0efec", flexShrink: 0 }}>
        <button onClick={onClose} aria-label="戻る" style={{ background: "none", border: "none", cursor: "pointer", color: "#444", padding: 0, display: "flex" }}><BkI s={20} /></button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>活動記録</span>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "14px 16px 0" }}>
          <button onClick={() => { onClose(); openGrp(a.g); }}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", padding: 0, cursor: "pointer", marginBottom: 12 }}>
            <ClubAv g={a.g} s={44} />
            <span style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#111" }}>{a.g}</span>
              <span style={{ display: "block", fontSize: 11.5, color: "#999", marginTop: 1 }}>{a.d} · {a.p}人が参加</span>
            </span>
          </button>

          <div style={{ fontSize: 19, fontWeight: 800, color: "#111", lineHeight: 1.4 }}>{a.t}</div>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "#333", marginTop: 10, whiteSpace: "pre-wrap" }}>{a.detail || a.ds}</div>

          <div style={{ marginTop: 14, borderRadius: 14, overflow: "hidden", border: "1px solid #eee" }}>
            <ActImg a={a} h={200} />
          </div>

          {a.photos && a.photos.length > 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
              {a.photos.map((ph, i) => (
                <div key={i} style={{ aspectRatio: "1/1", borderRadius: 8, overflow: "hidden" }}>
                  <img src={ph} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}

          {a.members && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#111", marginBottom: 8 }}>参加メンバー</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {a.members.map((name, i) => {
                  const u = users.find(x => x.nm === name) || { nm: name };
                  return (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 11px 4px 4px", borderRadius: 999, background: "#f5f5f5", fontSize: 11.5, color: "#555", fontWeight: 500 }}>
                      <Av u={u} s={20} />{name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "11px 0", marginTop: 16, borderTop: "1px solid #f0efec", borderBottom: "1px solid #f0efec" }}>
            {stat(comments.length, "コメント")}
            <button onClick={() => onUpdate({ ...meta, likes: likes + (meta.liked ? -1 : 1), liked: !meta.liked })}
              style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, padding: 0, color: meta.liked ? "#e05688" : "#999" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill={meta.liked ? "#e05688" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
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
