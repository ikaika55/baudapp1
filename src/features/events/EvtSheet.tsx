import { EvtActions, EvtNote } from "./EvtActions";
import { WD, dPart, fmtDate, tRange } from "../../lib/date";
import { findGrp } from "../../lib/people";
import { M } from "../../theme";
import { CalI, PinI } from "../../ui/icons";

export function EvtSheet({ e, onClose, onRsvp, rsvps, openGrp }) {
  const g = findGrp(e.g);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "relative", marginTop: "auto", background: "#fff", borderRadius: "16px 16px 0 0", maxHeight: "82%", overflowY: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} />
        </div>
        <div style={{ padding: 16 }}>
          <button onClick={() => { onClose(); openGrp(e.g); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: g.color }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color }} />{e.g}
          </button>
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
