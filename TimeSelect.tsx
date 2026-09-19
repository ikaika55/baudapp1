import { HOURS, MINS } from "../lib/date";
import { SEL } from "../theme";

export function TimeSelect({ value, onChange }) {
  const h = value ? value.slice(0, 2) : "";
  const m = value ? value.slice(3, 5) : "00";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <select value={h} onChange={e => onChange(e.target.value ? `${e.target.value}:${m}` : "")} style={{ ...SEL, flex: 1 }}>
        <option value="">--</option>
        {HOURS.map(x => <option key={x} value={x}>{x}</option>)}
      </select>
      <span style={{ color: "#ccc", fontSize: 13, fontWeight: 700 }}>:</span>
      <select value={m} onChange={e => onChange(`${h || "00"}:${e.target.value}`)} style={{ ...SEL, flex: 1 }}>
        {MINS.map(x => <option key={x} value={x}>{x}</option>)}
      </select>
    </div>
  );
}
