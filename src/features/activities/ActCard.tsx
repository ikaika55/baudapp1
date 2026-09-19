import { FeedRow } from "../feed/FeedRow";
import { M } from "../../theme";
import { ClubAv } from "../../ui/Avatar";
import { ActImg } from "../../ui/Cover";
import { UsrI } from "../../ui/icons";

export function ActCard({ a, meta, onUpdate, onOpen }) {
  return (
    <FeedRow avatar={<ClubAv g={a.g} />} name={a.g} time={a.d} meta={meta} onUpdate={onUpdate} onComment={onOpen}
      sub={<span style={{ fontSize: 10, fontWeight: 700, color: "#aaa", background: "#f2f2f0", borderRadius: 4, padding: "1px 6px" }}>活動記録</span>}>
      <button onClick={onOpen} style={{ display: "block", border: "none", background: "none", padding: 0, width: "100%", textAlign: "left", cursor: "pointer" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{a.t}</div>
        <div style={{ color: "#555", fontSize: 13, marginTop: 3, lineHeight: 1.6 }}>{a.ds}</div>
        <div style={{ marginTop: 9, borderRadius: 12, overflow: "hidden", border: "1px solid #eee" }}>
          <ActImg a={a} h={168} />
        </div>
        <div style={{ ...M, marginTop: 7 }}><UsrI s={12} />{a.p}人が参加</div>
      </button>
    </FeedRow>
  );
}
