import { useState } from "react";
import { EvRow } from "../features/events/EvRow";
import { EvtForm } from "../features/events/EvtForm";
import { WD, byStart, dPart, pad2 } from "../lib/date";
import { gColor, myAdminGrps } from "../lib/people";
import { isPublic } from "../lib/rsvp";
import { A, BP, C } from "../theme";
import { ChI } from "../ui/icons";

export function CalPage({ go, events, openGrp, addEvent, onOpenEvt }) {
  const [showNew, setShowNew] = useState(false);
  const adminGrps = myAdminGrps();
  const today = new Date();
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() + 1 });
  const { y: YEAR, m: month } = ym;
  const [sel, setSel] = useState(today.getDate());
  const isToday = (d) => d === today.getDate() && month === today.getMonth() + 1 && YEAR === today.getFullYear();

  const startDow = new Date(YEAR, month - 1, 1).getDay();
  const nDays = new Date(YEAR, month, 0).getDate();
  const ymKey = `${YEAR}-${pad2(month)}`;
  const pub = events.filter(isPublic);
  const evOn = (d) => pub.filter(e => dPart(e.start) === `${ymKey}-${pad2(d)}`).sort(byStart);
  const monthEvts = pub.filter(e => dPart(e.start).startsWith(ymKey)).sort(byStart);

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= nDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const shift = (n) => {
    const d = new Date(YEAR, month - 1 + n, 1);
    setYm({ y: d.getFullYear(), m: d.getMonth() + 1 });
    setSel(null);
  };

  const listEvts = sel ? evOn(sel) : monthEvts;
  const listTitle = sel ? `${month}月${sel}日の予定` : `${month}月の予定`;

  return (
    <div style={{ padding: 12 }}>
      <div style={{ ...C, padding: "12px 10px 14px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 10px" }}>
          <button onClick={() => shift(-1)} aria-label="前の月"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 4, display: "flex", transform: "rotate(180deg)" }}><ChI s={18} /></button>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>{YEAR}年{month}月</div>
          <button onClick={() => shift(1)} aria-label="次の月"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 4, display: "flex" }}><ChI s={18} /></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {WD.map((w, i) => (
            <div key={w} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, paddingBottom: 6, color: i === 0 ? "#d9755f" : i === 6 ? "#6b8fb5" : "#aaa" }}>{w}</div>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const de = evOn(d);
            const isSel = sel === d;
            return (
              <button key={i} onClick={() => setSel(isSel ? null : d)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "3px 0 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: isSel || isToday(d) ? 700 : 500,
                  background: isSel ? A : "transparent",
                  boxShadow: !isSel && isToday(d) ? `inset 0 0 0 1.5px ${A}` : "none",
                  color: isSel ? "#fff" : isToday(d) ? A : i % 7 === 0 ? "#d9755f" : i % 7 === 6 ? "#6b8fb5" : "#333",
                }}>{d}</span>
                <span style={{ display: "flex", gap: 2, height: 4 }}>
                  {de.slice(0, 3).map(e => (
                    <span key={e.id} style={{ width: 4, height: 4, borderRadius: "50%", background: gColor(e.g) }} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {adminGrps.length === 0 ? null : showNew ? (
        <div style={{ marginBottom: 14 }}>
          <EvtForm options={adminGrps} initDate={sel ? `${ymKey}-${pad2(sel)}` : ""}
            onSubmit={(ev) => {
              addEvent({ ...ev, st: "公開中" });
              const d = dPart(ev.start);
              if (d) { setYm({ y: +d.slice(0, 4), m: +d.slice(5, 7) }); setSel(+d.slice(8, 10)); }
              setShowNew(false);
            }}
            onCancel={() => setShowNew(false)} />
        </div>
      ) : (
        <button onClick={() => setShowNew(true)} style={{ ...BP, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          {sel ? `${month}月${sel}日にイベントを作成` : "イベントを作成"}
        </button>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, padding: "0 2px" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{listTitle}</span>
        {sel && <button onClick={() => setSel(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: A, fontWeight: 600 }}>月全体を見る</button>}
      </div>

      {listEvts.length === 0 ? (
        <div style={{ ...C, padding: "28px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>
          予定はありません
        </div>
      ) : (
        listEvts.map(e => <EvRow key={e.id} e={e} onGo={() => onOpenEvt(e.id)} />)
      )}
    </div>
  );
}

// アプリの外枠。通常は画面いっぱい（PCでは中央に寄せる）、framed のときだけ端末モック。
