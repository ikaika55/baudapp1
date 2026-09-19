import { useState } from "react";
import { ME, users } from "../data/users";
import { grpsOf } from "../lib/people";
import { C, IN, M } from "../theme";
import { Av } from "../ui/Avatar";
import { BkI, ChI } from "../ui/icons";

export function MembersPage({ go, openUser, mem }) {
  const [q, setQ] = useState("");
  const kw = q.trim();
  const list = users.filter(u => !kw || u.nm.includes(kw) || (u.dept || "").includes(kw));

  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => go("profile")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />戻る</button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>社員一覧</span>
        <div style={{ width: 50 }} />
      </div>

      <input type="text" placeholder="名前や部署で検索" value={q} onChange={e => setQ(e.target.value)}
        style={{ ...IN, marginBottom: 12 }} />
      <div style={{ ...M, marginBottom: 10 }}>{list.length}人</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {list.length === 0 && <div style={{ ...C, padding: "28px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>該当する社員がいません</div>}
        {list.map(u => (
          <button key={u.id} onClick={() => openUser(u.id)}
            style={{ ...C, display: "flex", alignItems: "center", gap: 11, padding: 12, border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
            <Av u={u} s={42} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{u.nm}{u.id === ME && <span style={{ fontSize: 10, color: "#bbb", marginLeft: 6 }}>自分</span>}</div>
              <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{u.dept}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                {grpsOf(u.id, mem).map(g => (
                  <span key={g.id} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600, color: "#fff", background: g.color }}>{g.name}</span>
                ))}
              </div>
            </div>
            <span style={{ color: "#ddd" }}><ChI /></span>
          </button>
        ))}
      </div>
    </div>
  );
}
