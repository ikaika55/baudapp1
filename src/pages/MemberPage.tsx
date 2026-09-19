import { photosOf } from "../data/users";
import { EvRow } from "../features/events/EvRow";
import { byStart, fmtDate, isPast, tRange } from "../lib/date";
import { findUser, gColor, grpsOf } from "../lib/people";
import { answerOf, isPublic } from "../lib/rsvp";
import { C, M } from "../theme";
import { NameCard } from "../ui/NameCard";
import { BkI, CalI, ChI } from "../ui/icons";

export function MemberPage({ go, userId, openGrp, mem, events, rsvps, onOpenEvt }) {
  const u = findUser(userId);
  const gs = grpsOf(u.id, mem);
  const joined = events.filter(e => isPublic(e) && answerOf(rsvps, e.id, u.id) === "yes");
  const upcoming = joined.filter(e => !isPast(e)).sort(byStart).slice(0, 3);
  const attended = joined.filter(isPast).sort((a, b) => byStart(b, a)).slice(0, 3);
  const photos = photosOf(u);

  const evtRow = (e) => (
    <button key={e.id} onClick={() => onOpenEvt(e.id)}
      style={{ ...C, display: "flex", alignItems: "center", gap: 10, padding: 12, marginBottom: 8, border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
      <span style={{ width: 3, alignSelf: "stretch", borderRadius: 2, background: gColor(e.g), flexShrink: 0 }} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 11, color: gColor(e.g), fontWeight: 600 }}>{e.g}</span>
        <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#111", marginTop: 2 }}>{e.t}</span>
        <span style={{ ...M, marginTop: 5 }}><CalI s={12} />{fmtDate(e.start)} {tRange(e)}</span>
      </span>
      <span style={{ color: "#ddd" }}><ChI /></span>
    </button>
  );

  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => go("members")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />一覧</button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>プロフィール</span>
        <div style={{ width: 50 }} />
      </div>

      <NameCard name={u.nm} kana={u.kana} nick={u.nick} hometown={u.hometown} dept={u.dept} hobby={u.hobby} avatar={u.av} />

      <div style={{ ...C, padding: 16, textAlign: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          {gs.map(g => (
            <button key={g.id} onClick={() => openGrp(g.name)}
              style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#fff", background: g.color, border: "none", cursor: "pointer" }}>
              <span style={{ width: 5, height: 5, background: "#fff", borderRadius: "50%" }} />{g.name}
            </button>
          ))}
          {gs.length === 0 && <span style={{ fontSize: 11, color: "#bbb" }}>所属している部活はありません</span>}
        </div>
        {u.bio && <div style={{ color: "#777", fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>{u.bio}</div>}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{u.since}入社</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 10 }}>参加予定のイベント</div>
        {upcoming.length === 0
          ? <div style={{ ...C, padding: "22px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>参加予定のイベントはありません</div>
          : upcoming.map(e => <EvRow key={e.id} e={e} onGo={() => onOpenEvt(e.id)} />)}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 10 }}>参加したイベント</div>
        {attended.length === 0
          ? <div style={{ ...C, padding: "22px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>まだ参加したイベントはありません</div>
          : attended.map(evtRow)}
      </div>

      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 10 }}>写真</div>
      {photos.length === 0 ? (
        <div style={{ ...C, padding: "32px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>まだ写真がありません</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {photos.map((ph, i) => (
            <div key={i} style={{ aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", ...C }}>
              <img src={ph} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
