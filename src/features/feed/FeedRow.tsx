import { useState } from "react";
import { Reactions } from "./Reactions";

export function FeedRow({ avatar, name, sub, time, onDelete, meta, onUpdate, onComment, noReactions, children }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <div style={{ display: "flex", gap: 11, padding: "13px 16px 11px", borderBottom: "1px solid #ecebe7", background: "#fff" }}>
      {avatar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#111" }}>{name}</span>
          {sub}
          <span style={{ fontSize: 11, color: "#bbb" }}>· {time}</span>
          {onDelete && (
            <div style={{ marginLeft: "auto", position: "relative" }}>
              <button onClick={() => setMenu(!menu)} aria-label="メニュー"
                style={{ background: "none", border: "none", cursor: "pointer", color: menu ? "#888" : "#c8c8c8", padding: "2px 0 2px 8px", display: "flex" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>
              </button>
              {menu && (
                <>
                  <div onClick={() => setMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 190 }} />
                  <div style={{ position: "absolute", top: 24, right: 0, zIndex: 200, minWidth: 156, background: "#fff", borderRadius: 10, border: "1px solid #eee", boxShadow: "0 8px 24px rgba(0,0,0,0.16)", overflow: "hidden" }}>
                    <button onClick={() => { setMenu(false); onDelete(); }}
                      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "11px 13px", background: "none", border: "none", cursor: "pointer", color: "#e05656", fontSize: 13, fontWeight: 700, textAlign: "left" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      ポストを削除
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {children}
        {!noReactions && <Reactions meta={meta} onUpdate={onUpdate} open={open} setOpen={setOpen} bare onComment={onComment} />}
      </div>
    </div>
  );
}
