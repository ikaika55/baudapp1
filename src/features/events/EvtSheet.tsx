import { useState } from "react";
import { ME } from "../../data/users";
import { EvtActions, EvtNote } from "./EvtActions";
import { WD, dPart, fmtDate, tRange } from "../../lib/date";
import { findGrp, isAdmin } from "../../lib/people";
import { M } from "../../theme";
import { CalI, PinI } from "../../ui/icons";

export function EvtSheet({ e, onClose, onRsvp, rsvps, openGrp, onDelete }) {
  const g = findGrp(e.g);
  const [menu, setMenu] = useState(false);
  const canEdit = isAdmin(e.g, ME);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "relative", marginTop: "auto", background: "#fff", borderRadius: "16px 16px 0 0", maxHeight: "82%", overflowY: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} />
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => { onClose(); openGrp(e.g); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: g.color }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color }} />{e.g}
            </button>
            {canEdit && onDelete && (
              <div style={{ marginLeft: "auto", position: "relative" }}>
                <button onClick={() => setMenu(!menu)} aria-label="メニュー" style={{ background: "none", border: "none", cursor: "pointer", color: "#c8c8c8", padding: 0, display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>
                </button>
                {menu && (
                  <>
                    <div onClick={() => setMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 210 }} />
                    <div style={{ position: "absolute", top: 24, right: 0, zIndex: 220, minWidth: 166, background: "#fff", borderRadius: 10, border: "1px solid #eee", boxShadow: "0 8px 24px rgba(0,0,0,0.16)", overflow: "hidden" }}>
                      <button onClick={() => { setMenu(false); onDelete(e.id); }}
                        style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "11px 13px", background: "none", border: "none", cursor: "pointer", color: "#e05656", fontSize: 13, fontWeight: 700 }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        イベントを削除
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: "6px 0 0" }}>{e.t}</h2>
          {e.st !== "公開中" && (
            <span style={{ display: "inline-block", marginTop: 8, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "#FFF3E0", color: "#FF9800" }}>{e.st}</span>
          )}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
            <span style={{ ...M, fontSize: 12 }}><CalI />{fmtDate(e.start)}（{WD[new Date(dPart(e.start)).getDay()]}） {tRange(e)}</span>
            <span style={{ ...M, fontSize: 12 }}><PinI />{e.l || "場所未定"}</span>
          </div>
          <EvtNote e={e} />
          <EvtActions e={e} onRsvp={onRsvp} rsvps={rsvps} />
          <button onClick={onClose} style={{ width: "100%", marginTop: 20, padding: "11px 0", background: "#f5f5f5", border: "none", borderRadius: 10, color: "#888", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>閉じる</button>
        </div>
      </div>
    </div>
  );
}
