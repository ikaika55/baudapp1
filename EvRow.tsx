import { tRange } from "../../lib/date";
import { gColor } from "../../lib/people";
import { C, M } from "../../theme";
import { ChI, PinI } from "../../ui/icons";

export function EvRow({ e, onGo }) {
  return (
    <div onClick={onGo} style={{ ...C, display: "flex", gap: 10, padding: 12, marginBottom: 8, cursor: "pointer" }}>
      <div style={{ width: 3, borderRadius: 2, background: gColor(e.g), flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{tRange(e)}</span>
          <span style={{ fontSize: 11, color: gColor(e.g), fontWeight: 600 }}>{e.g}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginTop: 3 }}>{e.t}</div>
        <div style={{ ...M, marginTop: 5 }}><PinI s={12} />{e.l}</div>
      </div>
      <div style={{ alignSelf: "center", color: "#ddd" }}><ChI /></div>
    </div>
  );
}
