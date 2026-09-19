import { useState } from "react";
import { grpCards } from "../../data/groups";
import { A, BO, BP, C, IN } from "../../theme";
import { TimeSelect } from "../../ui/TimeSelect";

export function EvtForm({ fixedGrp, options = grpCards, initDate = "", onSubmit, onCancel }) {
  const [f, setF] = useState({ t: "", g: fixedGrp || (options[0] || {}).name || "", d: initDate, d2: initDate, tm: "", te: "", l: "", ds: "", rsvp: "join" });
  const set = (k, v) => setF({ ...f, [k]: v });
  const missing = [];
  if (!f.t.trim()) missing.push("イベント名");
  if (!f.d) missing.push("日付");
  if (!f.tm) missing.push("開始時刻");
  const ready = missing.length === 0;

  const submit = () => {
    if (!ready) return;
    onSubmit({
      id: Date.now(), g: fixedGrp || f.g, t: f.t, l: f.l, ds: f.ds, rsvp: f.rsvp, st: "下書き",
      start: f.d && f.tm ? `${f.d}T${f.tm}` : "",
      end: (f.d2 || f.d) && f.te ? `${f.d2 || f.d}T${f.te}` : "",
    });
  };
  return (
    <div style={{ ...C, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
      {!fixedGrp && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>どの部活のイベント？</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {options.map(g => {
              const on = f.g === g.name;
              return (
                <button key={g.id} onClick={() => set("g", g.name)} style={{
                  display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                  border: `1.5px solid ${on ? g.color : "#e5e7eb"}`, background: on ? g.color : "#fff",
                  color: on ? "#fff" : "#666", fontSize: 12, fontWeight: 600,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: on ? "#fff" : g.color }} />{g.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <input type="text" placeholder="イベント名" value={f.t} onChange={e => set("t", e.target.value)} style={IN} />
      <div>
        <div style={{ fontSize: 11, color: "#999", marginBottom: 5 }}>開始</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="date" value={f.d}
            onChange={e => setF({ ...f, d: e.target.value, d2: (!f.d2 || f.d2 === f.d) ? e.target.value : f.d2 })}
            style={{ ...IN, flex: 1.15, minWidth: 0, colorScheme: "light" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <TimeSelect value={f.tm} onChange={v => setF({ ...f, tm: v, te: f.te || (v ? `${String(Math.min(23, Number(v.slice(0, 2)) + 2)).padStart(2, "0")}:${v.slice(3, 5)}` : "") })} />
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#999", marginBottom: 5 }}>終了</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="date" value={f.d2} onChange={e => set("d2", e.target.value)}
            style={{ ...IN, flex: 1.15, minWidth: 0, colorScheme: "light" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <TimeSelect value={f.te} onChange={v => set("te", v)} />
          </div>
        </div>
        {f.d && f.tm && f.te && `${f.d2 || f.d}T${f.te}` < `${f.d}T${f.tm}` && (
          <div style={{ fontSize: 11, color: "#e05656", marginTop: 5 }}>終了が開始より前になっています</div>
        )}
      </div>
      <input type="text" placeholder="場所" value={f.l} onChange={e => set("l", e.target.value)} style={IN} />
      <textarea placeholder="詳細（持ち物、集合場所、注意点など）" value={f.ds} onChange={e => set("ds", e.target.value)}
        style={{ ...IN, minHeight: 88, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>参加確認のしかた</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { v: "join", lb: "参加ボタンのみ", sub: "参加する人だけが押します" },
            { v: "yesno", lb: "参加・不参加を選ぶ", sub: "全員に可否を回答してもらいます" },
          ].map(o => {
            const on = f.rsvp === o.v;
            return (
              <button key={o.v} onClick={() => set("rsvp", o.v)}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                  border: `1.5px solid ${on ? A : "#e5e7eb"}`, background: on ? "#FFF7EC" : "#fff" }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, border: `2px solid ${on ? A : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {on && <span style={{ width: 8, height: 8, borderRadius: "50%", background: A }} />}
                </span>
                <span>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: on ? A : "#333" }}>{o.lb}</span>
                  <span style={{ display: "block", fontSize: 11, color: "#999", marginTop: 1 }}>{o.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onCancel} style={{ ...BO, flex: 1 }}>キャンセル</button>
        <button onClick={submit} disabled={!ready}
          style={{ ...BP, flex: 1, background: ready ? A : "#e8e6e1", color: ready ? "#fff" : "#aaa", cursor: ready ? "pointer" : "default" }}>作成</button>
      </div>
      {!ready && (
        <div style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: -4 }}>{missing.join("・")}を入力すると作成できます</div>
      )}
    </div>
  );
}
