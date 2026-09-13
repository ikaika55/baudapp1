import { acts } from "../data/activities";
import { groups } from "../data/groups";
import { ME } from "../data/users";
import { EvtActions, EvtNote } from "../features/events/EvtActions";
import { byStart, fmtDate, tRange } from "../lib/date";
import { findGrp, findUser, grpN, isAdmin } from "../lib/people";
import { isPublic } from "../lib/rsvp";
import { A, BO, C, M } from "../theme";
import { Av } from "../ui/Avatar";
import { Cover } from "../ui/Cover";
import { BkI, CalI, PinI, UsrI } from "../ui/icons";

export function DetPage({ go, onSelectAct, events, grp, onRsvp, rsvps, openUser }) {
  const g = findGrp(grp);
  const grpEvts = events.filter(e => e.g === g.name && isPublic(e)).sort(byStart);
  const grpActs = acts.filter(a => a.g === g.name);
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => go("groups")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />戻る</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => go("newRecord")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 8, border: "none", background: A, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            記録
          </button>
          {isAdmin(g.name, ME) && <button onClick={() => go("admin")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            管理
          </button>}
        </div>
      </div>
      <div style={{ position: "relative", height: 160 }}>
        <Cover g={g} fs={26} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, padding: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{g.name}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{grpN(g)}人 • {g.since}設立</div>
        </div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={C}>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>メンバー</span>
              <span style={{ fontSize: 12, color: "#999" }}>{grpN(g)}人</span>
            </div>
            <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none" }}>
              {(g.members || []).map(id => findUser(id)).map(m => (
                <button key={m.id} onClick={() => openUser(m.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", minWidth: 56 }}>
                  <Av u={m} s={44} />
                  <span style={{ fontSize: 10, color: "#666" }}>{m.nm.slice(0, 3)}</span>
                </button>
              ))}
            </div>
            <button style={{ ...BO, marginTop: 12 }}>グループに参加</button>
          </div>
        </div>
        <div style={{ ...C, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 8 }}>グループについて</div>
          <div style={{ color: "#666", fontSize: 13, lineHeight: 1.7 }}>{g.ds}</div>
        </div>
        <div style={{ ...C, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 10 }}>今後の予定</div>
          {grpEvts.length === 0 && <div style={{ color: "#bbb", fontSize: 12, padding: "10px 0" }}>予定はまだありません</div>}
          {grpEvts.map((e, i) => (
            <div key={i} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{e.t}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}><span style={M}><CalI />{fmtDate(e.start)} {tRange(e)}</span><span style={M}><PinI />{e.l}</span></div>
              <EvtNote e={e} />
              <EvtActions e={e} onRsvp={onRsvp} rsvps={rsvps} />
            </div>
          ))}
        </div>
        <div style={{ ...C, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 10 }}>活動記録</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {grpActs.length === 0 && <div style={{ color: "#bbb", fontSize: 12, padding: "4px 0" }}>活動記録はまだありません</div>}
            {grpActs.map(a => (
              <button key={a.id} onClick={() => onSelectAct(a)} style={{ ...C, overflow: "hidden", border: "none", cursor: "pointer", textAlign: "left", width: "100%", padding: 0 }}>
                <img src={a.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{a.t}</div>
                  <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{a.ds}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={M}><CalI />{a.d}</span>
                    <span style={M}><UsrI s={11} />{a.p}人</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
