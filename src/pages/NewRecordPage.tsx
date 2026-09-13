import { useState } from "react";
import { A, BP, C } from "../theme";
import { BkI } from "../ui/icons";

export function NewRecordPage({ go }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [pCount, setPCount] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!title.trim()) return;
    setSaved(true);
    setTimeout(() => { setSaved(false); go("detail"); }, 1200);
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => go("detail")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />戻る</button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>活動記録を書く</span>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Photo */}
        <div style={{ ...C, overflow: "hidden" }}>
          <div style={{ height: 140, background: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <span style={{ fontSize: 12, color: "#bbb", fontWeight: 500 }}>カバー写真を追加</span>
          </div>
        </div>
        {/* Title */}
        <div style={{ ...C, padding: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>タイトル</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="例: 春の撮影会"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
        </div>
        {/* Description */}
        <div style={{ ...C, padding: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>活動内容</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="どんな活動をしましたか？"
            style={{ width: "100%", minHeight: 100, padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#111", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }} />
        </div>
        {/* Date & participants */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ ...C, padding: 14, flex: 1 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>日付</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="MM/DD"
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ ...C, padding: 14, flex: 1 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>参加人数</label>
            <input type="text" value={pCount} onChange={e => setPCount(e.target.value)} placeholder="例: 12"
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        {/* Additional photos */}
        <div style={{ ...C, padding: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8, display: "block" }}>写真を追加</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: 72, height: 72, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              </div>
            ))}
          </div>
        </div>
        {/* Save */}
        <button onClick={save}
          style={{ ...BP, opacity: title.trim() ? 1 : 0.5, background: saved ? "#4CAF50" : A }}>{saved ? "✓ 投稿しました" : "活動記録を投稿"}</button>
      </div>
    </div>
  );
}
