import { EvtActions } from "./EvtActions";
import { FeedRow } from "../feed/FeedRow";
import { WD, dPart, fmtDate, tRange } from "../../lib/date";
import { tally } from "../../lib/rsvp";
import { A, M } from "../../theme";
import { ClubAv } from "../../ui/Avatar";
import { CalI, PinI, UsrI } from "../../ui/icons";

export function EvtCard({ e, onOpen, onRsvp, rsvps }) {
  const t = tally(rsvps, e);
  return (
    <FeedRow avatar={<ClubAv g={e.g} />} name={e.g} time={"イベント告知"} noReactions
      sub={<span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: A, borderRadius: 4, padding: "1px 6px" }}>新しい予定</span>}>
      <button onClick={onOpen} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#111" }}>{e.t}</div>
        <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 12, border: "1px solid #eee", background: "#fbfaf8" }}>
          <div style={{ ...M, fontSize: 12 }}><CalI s={13} />{fmtDate(e.start)}（{WD[new Date(dPart(e.start)).getDay()]}） {tRange(e)}</div>
          <div style={{ ...M, fontSize: 12, marginTop: 5 }}><PinI s={13} />{e.l || "場所未定"}</div>
          {t.yes.length > 0 && <div style={{ ...M, fontSize: 12, marginTop: 5 }}><UsrI s={13} />{t.yes.length}人が参加予定</div>}
        </div>
      </button>
      <div style={{ marginTop: 2 }}><EvtActions e={e} onRsvp={onRsvp} rsvps={rsvps} /></div>
    </FeedRow>
  );
}
