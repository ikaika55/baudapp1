import { findUser, grpsOf } from "../lib/people";
import { C } from "../theme";
import { Av } from "../ui/Avatar";
import { BkI } from "../ui/icons";

export function MemberPage({ go, userId, openGrp, mem }) {
  const u = findUser(userId);
  const gs = grpsOf(u.id, mem);
  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => go("members")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />一覧</button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>プロフィール</span>
        <div style={{ width: 50 }} />
      </div>

      <div style={{ ...C, padding: 20, textAlign: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><Av u={u} s={80} /></div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 8 }}>{u.nm}</div>
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
          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{u.dept}</span>
          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{u.since}入社</span>
        </div>
      </div>
    </div>
  );
}
