export function NameCard({ name, kana, nick, hometown, dept, hobby, avatar }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.08)", background: "linear-gradient(120deg, #FCE38A 0%, #F9C87B 42%, #F0964A 100%)", position: "relative" }}>
      <span style={{ position: "absolute", top: 9, right: 11, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.95)", letterSpacing: "0.02em" }}>baudroie inc.</span>

      <div style={{ display: "flex", gap: 10, padding: "12px 11px 14px", alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0, width: 96 }}>
          <div style={{ width: 96, height: 116, borderRadius: "48px / 58px", overflow: "hidden", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {avatar
              ? <img src={avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 40, fontWeight: 800, color: "#d8cdbd" }}>{(name || "?").slice(0, 1)}</span>}
          </div>
          <div style={{ marginTop: 6, background: "rgba(255,255,255,0.85)", borderRadius: 4, padding: "3px 4px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "#5b4a3a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nick || "\u3000"}</div>
        </div>

        <div style={{ flex: 1, minWidth: 0, paddingTop: 12 }}>
          <div style={{ fontSize: 9, fontWeight: 600, color: "#5b4a3a", letterSpacing: "0.12em" }}>{kana}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#2b2b2b", letterSpacing: "0.05em", lineHeight: 1.15, marginTop: 1 }}>{name}</div>

          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { lb: "プロフィール", v: `${hometown || "―"}出身 / ${dept || "―"}` },
              { lb: "趣味/マイブーム", v: hobby || "―" },
            ].map(row => (
              <div key={row.lb} style={{ position: "relative", paddingTop: 8 }}>
                <span style={{ position: "absolute", top: 0, left: 6, zIndex: 1, padding: "1px 8px", borderRadius: 3, fontSize: 8, fontWeight: 700, color: "#fff", background: "linear-gradient(90deg, #9b6bc4 0%, #e28a4f 100%)", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{row.lb}</span>
                <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 7, padding: "12px 9px 9px", fontSize: 11, color: "#444", textAlign: "center", lineHeight: 1.5, wordBreak: "break-word" }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
