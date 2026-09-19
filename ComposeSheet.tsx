import { useState } from "react";
import { ME } from "../../data/users";
import { grpsOf } from "../../lib/people";
import { A } from "../../theme";

export function ComposeSheet({ avatar, onClose, onPost, mem }) {
  const [text, setText] = useState("");
  const [g, setG] = useState("");
  const [recruiting, setRecruiting] = useState(false);
  const mine = grpsOf(ME, mem);
  const n = text.trim().length;
  const over = n > MAXLEN;
  const ok = n > 0 && !over;
  const ring = Math.min(1, n / MAXLEN);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 400, background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid #f0efec", flexShrink: 0 }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#555", padding: 0 }}>キャンセル</button>
        <button disabled={!ok}
          onClick={() => { onPost({ ds: text.trim(), g: g || null, recruiting, joined: [], likes: 0, comments: [] }); onClose(); }}
          style={{ padding: "7px 20px", borderRadius: 999, border: "none", fontWeight: 700, fontSize: 14,
            background: ok ? A : "#f0e2cd", color: "#fff", cursor: ok ? "pointer" : "default" }}>ポストする</button>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "14px 14px 0" }}>
        <div style={{ display: "flex", gap: 11 }}>
          <img src={avatar} alt="" style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            {mine.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                {mine.map(c => {
                  const on = g === c.name;
                  return (
                    <button key={c.id} onClick={() => setG(on ? "" : c.name)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px", borderRadius: 999, cursor: "pointer",
                        border: `1.5px solid ${on ? c.color : "#e5e7eb"}`, background: on ? c.color : "#fff",
                        color: on ? "#fff" : "#888", fontSize: 11.5, fontWeight: 600 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "#fff" : c.color }} />{c.name}
                    </button>
                  );
                })}
              </div>
            )}
            <textarea autoFocus value={text} onChange={e => setText(e.target.value)}
              placeholder="いまどんなボド活してる？"
              style={{ width: "100%", minHeight: 150, padding: 0, border: "none", background: "transparent", fontSize: 17, color: "#111",
                resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }} />
            {recruiting && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 10, background: "#FFF9F0", border: "1px solid #F5DEB3", marginTop: 4 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                <span style={{ fontSize: 12, color: A, fontWeight: 700 }}>参加者を募集する</span>
                <button onClick={() => setRecruiting(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 0, display: "flex" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderTop: "1px solid #f0efec", flexShrink: 0 }}>
        <button onClick={() => setRecruiting(!recruiting)} title="参加者を募集"
          style={{ display: "flex", alignItems: "center", gap: 5, background: recruiting ? "#FFF5E6" : "none", border: "none", cursor: "pointer", color: A, padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          募集
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 9 }}>
          {n > MAXLEN - 60 && (
            <span style={{ fontSize: 12, fontWeight: 600, color: over ? "#e05656" : "#999" }}>{MAXLEN - n}</span>
          )}
          <svg width="22" height="22" viewBox="0 0 24 24" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="12" cy="12" r="9" fill="none" stroke="#eee" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="9" fill="none" stroke={over ? "#e05656" : A} strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={`${ring * 56.5} 56.5`} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const MAXLEN = 280;
