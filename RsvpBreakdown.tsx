import { findUser } from "../../lib/people";
import { tally } from "../../lib/rsvp";
import { Av } from "../../ui/Avatar";

export function RsvpBreakdown({ e, rsvps }) {
  const t = tally(rsvps, e);
  const row = (lb, ids, col) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: col, marginBottom: 5 }}>{lb} {ids.length}人</div>
      {ids.length === 0
        ? <div style={{ fontSize: 11, color: "#ccc" }}>なし</div>
        : <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {ids.map(id => {
              const u = findUser(id);
              return (
                <span key={id} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px 4px 4px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#555", fontWeight: 500 }}>
                  <Av u={u} s={18} />{u.nm}
                </span>
              );
            })}
          </div>}
    </div>
  );
  return (
    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
      {row("参加", t.yes, "#4CAF50")}
      {row("不参加", t.no, "#e05656")}
    </div>
  );
}
