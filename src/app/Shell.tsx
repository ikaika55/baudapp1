export function Shell({ framed, children }) {
  if (!framed) {
    return (
      <div style={{ minHeight: "100dvh", background: "#e9e7e2", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 480, height: "100dvh", background: "#f7f6f3", position: "relative", overflow: "hidden", boxShadow: "0 0 40px rgba(0,0,0,0.06)" }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e8e6e1 0%, #d4d0c8 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#999", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>iPhone 14 — 375 × 720</div>
        <div style={{
          width: 375, height: 720,
          borderRadius: 44, border: "7px solid #1a1a1a",
          background: "#1a1a1a", overflow: "hidden", position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset",
        }}>
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, background: "#000", borderRadius: 20, zIndex: 100 }} />
          {children}
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.25)", zIndex: 100 }} />
        </div>
      </div>
    </div>
  );
}
