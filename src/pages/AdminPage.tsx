import { useState } from "react";
import { EvtForm } from "../features/events/EvtForm";
import { RsvpBreakdown } from "../features/events/RsvpBreakdown";
import { byStart, fmtDate, tRange } from "../lib/date";
import { findGrp } from "../lib/people";
import { isPublic, tally } from "../lib/rsvp";
import { A, BP, C, M } from "../theme";
import { Cover } from "../ui/Cover";
import { BkI, CalI, PinI } from "../ui/icons";

export function AdminPage({ go, events, setEvents, grp, rsvps }) {
  const [tab, setTab] = useState("group");
  const [gName, setGName] = useState(findGrp(grp).name);
  const [gDesc, setGDesc] = useState(findGrp(grp).ds);
  const GRP = findGrp(grp).name;
  const evtList = events.filter(e => e.g === GRP).sort(byStart);
  const [showNewEvt, setShowNewEvt] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openRsvp, setOpenRsvp] = useState(null);

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go("detail")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />戻る</button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>管理者設定</span>
        <div style={{ width: 40 }} />
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #eee", padding: "0 16px" }}>
        {[{ id: "group", lb: "グループ設定" }, { id: "events", lb: "イベント管理" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", borderBottom: tab === t.id ? `2px solid ${A}` : "2px solid transparent", color: tab === t.id ? A : "#999", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{t.lb}</button>
        ))}
      </div>

      {tab === "group" && (
        <div style={{ padding: "16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Cover image */}
          <div style={{ ...C, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 120 }}>
              <Cover g={findGrp(grp)} fs={16} />
              <button style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: 8, color: "#fff", padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                変更
              </button>
            </div>
          </div>
          {/* Group name */}
          <div style={{ ...C, padding: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>グループ名</label>
            <input type="text" value={gName} onChange={e => setGName(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
          </div>
          {/* Description */}
          <div style={{ ...C, padding: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>説明文</label>
            <textarea value={gDesc} onChange={e => setGDesc(e.target.value)}
              style={{ width: "100%", minHeight: 80, padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#111", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }} />
          </div>
          {/* Category */}
          <div style={{ ...C, padding: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>カテゴリ</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["アウトドア", "インドア", "趣味", "その他"].map(c => (
                <button key={c} style={{ padding: "6px 14px", borderRadius: 999, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  background: c === "アウトドア" ? A : "#f0f0f0", color: c === "アウトドア" ? "#fff" : "#888" }}>{c}</button>
              ))}
            </div>
          </div>
          {/* Danger zone */}
          <div style={{ ...C, padding: 14 }}>
            <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e55", background: "#fff", color: "#e55", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>グループを削除する</button>
          </div>
          {/* Save */}
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            style={{ ...BP, background: saved ? "#4CAF50" : A }}>{saved ? "✓ 保存しました" : "変更を保存"}</button>
        </div>
      )}

      {tab === "events" && (
        <div style={{ padding: "16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* New event button */}
          <button onClick={() => setShowNewEvt(!showNewEvt)} style={{ ...BP, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            新しいイベントを作成
          </button>
          {/* New event form */}
          {showNewEvt && (
            <EvtForm fixedGrp={GRP}
              onSubmit={(ev) => { setEvents([...events, ev].sort(byStart)); setShowNewEvt(false); }}
              onCancel={() => setShowNewEvt(false)} />
          )}
          {/* Event list */}
          {evtList.map(e => (
            <div key={e.id} style={{ ...C, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{e.t}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999,
                      background: e.st === "公開中" ? "#E8F5E9" : "#FFF3E0",
                      color: e.st === "公開中" ? "#4CAF50" : "#FF9800" }}>{e.st}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={M}><CalI />{fmtDate(e.start)} {tRange(e)}</span>
                    <span style={M}><PinI />{e.l}</span>
                    <span style={M}>{e.rsvp === "yesno" ? "可否を確認" : "参加ボタン"}</span>
                  </div>
                  <button onClick={() => setOpenRsvp(openRsvp === e.id ? null : e.id)}
                    style={{ marginTop: 8, background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 11, color: A, fontWeight: 600 }}>
                    {openRsvp === e.id ? "回答を隠す" : `回答を見る（参加 ${tally(rsvps, e).yes.length}）`}
                  </button>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {/* Toggle status */}
                  <button onClick={() => setEvents(events.map(x => x.id === e.id ? { ...x, st: isPublic(x) ? "下書き" : "公開中" } : x))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  {/* Delete */}
                  <button onClick={() => setEvents(events.filter(x => x.id !== e.id))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#e55", padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
              {openRsvp === e.id && <RsvpBreakdown e={e} rsvps={rsvps} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
