import { useState } from "react";
import { grpCards } from "../data/groups";
import { grpN } from "../lib/people";
import { C, M } from "../theme";
import { Cover } from "../ui/Cover";
import { ChI, UsrI } from "../ui/icons";

export function GrpsPage({ go, openGrp, mem }) {
  const [q, setQ] = useState("");
  const filtered = grpCards.filter(g => !q || g.name.includes(q) || g.ds.includes(q));
  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text" value={q} onChange={e => setQ(e.target.value)}
          placeholder="グループを検索..."
          style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }}
        />
        {q && (
          <button onClick={() => setQ("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "#ddd", border: "none", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>
      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 12 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <div style={{ fontSize: 14, fontWeight: 600 }}>見つかりませんでした</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>別のキーワードで試してみてください</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map(g => (
            <button key={g.id} onClick={() => openGrp(g.name)} style={{ ...C, overflow: "hidden", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
              <div style={{ position: "relative", height: 130 }}>
                <Cover g={g} />
                <span style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, borderRadius: "50%", border: "2px solid #fff", background: g.color }} />
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{g.name}</span><ChI />
                </div>
                <div style={{ color: "#888", fontSize: 12, marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.ds}</div>
                <span style={{ ...M, fontSize: 12 }}><UsrI s={12} />{grpN(g, mem)}人</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
