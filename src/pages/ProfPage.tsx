import { useState } from "react";
import { prof } from "../data/users";
import { A, BO, BP, C, IN } from "../theme";
import { BkI } from "../ui/icons";

export function ProfPage({ go, photos, setPhotos, avatar, setAvatar }) {
  const [editing, setEditing] = useState(false);
  const [p, setP] = useState({
    name: prof.name, kana: prof.kana, bio: prof.bio, hometown: prof.hometown,
    joinedCompany: prof.joinedCompany, deptNum: "◯",
    nick: prof.nick, hobby: prof.hobby,
  });
  const [saved, setSaved] = useState(false);
  const dept = `第${p.deptNum}技術部`;

  const save = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(false); }, 1000);
  };

  const readFiles = (fileList, onEach) => {
    Array.from(fileList || []).forEach(f => {
      if (!f.type.startsWith("image/")) return;
      const r = new FileReader();
      r.onload = () => onEach(r.result);
      r.readAsDataURL(f);
    });
  };
  const pickPhotos = (e) => { readFiles(e.target.files, (url) => setPhotos(prev => [url, ...prev])); e.target.value = ""; };
  const pickAvatar = (e) => { readFiles(e.target.files, (url) => setAvatar(url)); e.target.value = ""; };

  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      {!editing ? (
        <>
          <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.08)", background: "linear-gradient(120deg, #FCE38A 0%, #F9C87B 42%, #F0964A 100%)", position: "relative" }}>
            <span style={{ position: "absolute", top: 9, right: 11, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.95)", letterSpacing: "0.02em" }}>baudroie inc.</span>

            <div style={{ display: "flex", gap: 10, padding: "12px 11px 14px", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 96 }}>
                <div style={{ width: 96, height: 116, borderRadius: "48px / 58px", overflow: "hidden", background: "#fff" }}>
                  <img src={avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ marginTop: 6, background: "rgba(255,255,255,0.85)", borderRadius: 4, padding: "3px 4px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "#5b4a3a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nick || "　"}</div>
              </div>

              <div style={{ flex: 1, minWidth: 0, paddingTop: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#5b4a3a", letterSpacing: "0.12em" }}>{p.kana}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#2b2b2b", letterSpacing: "0.05em", lineHeight: 1.15, marginTop: 1 }}>{p.name}</div>

                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { lb: "プロフィール", v: `${p.hometown}出身 / ${dept}` },
                    { lb: "趣味/マイブーム", v: p.hobby },
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

          <div style={{ ...C, padding: 16, textAlign: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
              {prof.grps.map((g, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#fff", background: g.color }}>
                  <span style={{ width: 5, height: 5, background: "#fff", borderRadius: "50%", display: "inline-block" }} />{g.name}
                </span>
              ))}
            </div>
            <div style={{ color: "#777", fontSize: 13, marginBottom: 12 }}>{p.bio}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{p.joinedCompany}入社</span>
            </div>
            <button onClick={() => setEditing(true)} style={BP}>プロフィールを編集</button>
            <button onClick={() => go("members")} style={{ ...BO, marginTop: 8 }}>社員一覧を見る</button>
          </div>
          <input id="pickPhotos" type="file" accept="image/*" multiple onChange={pickPhotos} style={{ display: "none" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>写真</span>
              <span style={{ fontSize: 12, color: "#bbb" }}>{photos.length}枚</span>
            </div>
            <label htmlFor="pickPhotos" style={{
              display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer",
              padding: "6px 12px", borderRadius: 999, border: `1.5px solid ${A}`,
              color: A, fontSize: 12, fontWeight: 700,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              写真を追加
            </label>
          </div>
          {photos.length === 0 && (
            <div style={{ ...C, padding: "32px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>まだ写真がありません</div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {photos.map((u, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", ...C }}>
                <img src={u} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))} aria-label="削除"
                  style={{ position: "absolute", top: 6, right: 6, width: 24, height: 24, borderRadius: "50%", border: "none", cursor: "pointer",
                    background: "rgba(0,0,0,0.55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <button onClick={() => setEditing(false)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />キャンセル</button>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>プロフィール編集</span>
            <div style={{ width: 70 }} />
          </div>
          {/* Avatar */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={avatar} alt="" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
              <input id="pickAvatar" type="file" accept="image/*" onChange={pickAvatar} style={{ display: "none" }} />
              <label htmlFor="pickAvatar" style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: A, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff", cursor: "pointer" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </label>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Name */}
            <div style={{ ...C, padding: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>名前</label>
              <input type="text" value={p.name} onChange={e => setP({ ...p, name: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
            </div>
            {/* Free space */}
            <div style={{ ...C, padding: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>ふりがな</label>
              <input type="text" value={p.kana} onChange={e => setP({ ...p, kana: e.target.value })} placeholder="例: やまだたろう" style={{ ...IN, marginBottom: 16 }} />

              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>あだ名</label>
              <input type="text" value={p.nick} onChange={e => setP({ ...p, nick: e.target.value })} placeholder="例: たろちゃん" style={{ ...IN, marginBottom: 16 }} />

              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>趣味 / マイブーム</label>
              <input type="text" value={p.hobby} onChange={e => setP({ ...p, hobby: e.target.value })} placeholder="例: Ai、筋トレ、本" style={{ ...IN, marginBottom: 16 }} />

              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>フリースペース</label>
              <textarea value={p.bio} onChange={e => setP({ ...p, bio: e.target.value })} placeholder="自由に自己紹介を書いてください"
                style={{ width: "100%", minHeight: 80, padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#111", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }} />
            </div>
            {/* Hometown */}
            <div style={{ ...C, padding: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>出身</label>
              <input type="text" value={p.hometown} onChange={e => setP({ ...p, hometown: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
            </div>
            {/* Joined company */}
            <div style={{ ...C, padding: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>入社年月</label>
              <input type="text" value={p.joinedCompany} onChange={e => setP({ ...p, joinedCompany: e.target.value })} placeholder="例: 2022年4月"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
            </div>
            {/* Department select */}
            <div style={{ ...C, padding: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>所属技術部</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["1", "2", "3", "4", "5", "6"].map(n => (
                  <button key={n} onClick={() => setP({ ...p, deptNum: n })}
                    style={{ width: 48, height: 40, borderRadius: 8, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                      background: p.deptNum === n ? A : "#f0f0f0",
                      color: p.deptNum === n ? "#fff" : "#888" }}>
                    {n}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>第{p.deptNum}技術部</div>
            </div>
            {/* Save */}
            <button onClick={save}
              style={{ ...BP, background: saved ? "#4CAF50" : A }}>{saved ? "✓ 保存しました" : "保存する"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
