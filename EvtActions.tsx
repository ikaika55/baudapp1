import { ME } from "../../data/users";
import { findUser } from "../../lib/people";
import { answerOf, tally } from "../../lib/rsvp";
import { A, BO, BP, M } from "../../theme";
import { Av } from "../../ui/Avatar";

export function Attendees({ ids, max = 6 }) {
  if (ids.length === 0) return <div style={{ ...M, marginTop: 8 }}>まだ参加者はいません</div>;
  const show = ids.slice(0, max);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 11, color: "#aaa", marginBottom: 5 }}>参加する人</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {show.map(id => {
          const u = findUser(id);
          return (
            <span key={id} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px 3px 3px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#555", fontWeight: 500 }}>
              <Av u={u} s={18} />{u.nm}
            </span>
          );
        })}
        {ids.length > show.length && (
          <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#999", fontWeight: 600 }}>
            他{ids.length - show.length}人
          </span>
        )}
      </div>
    </div>
  );
}

export function EvtActions({ e, onRsvp, rsvps }) {
  const mine = answerOf(rsvps, e.id, ME);
  const t = tally(rsvps, e);
  if (e.rsvp === "yesno") {
    const opt = (v, lb) => {
      const on = mine === v;
      const col = v === "yes" ? A : "#999";
      return (
        <button onClick={() => onRsvp(e.id, v)} style={{
          flex: 1, padding: "9px 0", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer",
          border: `1.5px solid ${on ? col : "#e5e7eb"}`,
          background: on ? col : "#fff", color: on ? "#fff" : "#888",
        }}>{lb}</button>
      );
    };
    return (
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>参加できますか？</div>
        <div style={{ display: "flex", gap: 8 }}>{opt("yes", "参加する")}{opt("no", "不参加")}</div>
        <div style={{ ...M, marginTop: 7, gap: 10 }}>
          <span>参加 {t.yes.length}</span><span>不参加 {t.no.length}</span>
        </div>
        <Attendees ids={t.yes} />
      </div>
    );
  }
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={() => onRsvp(e.id, "yes")} style={mine === "yes" ? BO : BP}>
        {mine === "yes" ? "参加予定" : "参加する"}
      </button>
      <Attendees ids={t.yes} />
    </div>
  );
}

export const EvtNote = ({ e }) => e.ds
  ? <div style={{ marginTop: 8, color: "#666", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{e.ds}</div>
  : null;
