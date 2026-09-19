import { useState } from "react";
import { ME, prof } from "../data/users";
import { EvRow } from "../features/events/EvRow";
import { byStart, fmtDate, isPast, tRange } from "../lib/date";
import { gColor, grpsOf } from "../lib/people";
import { answerOf, isPublic } from "../lib/rsvp";
import { A, BP, C, IN, M } from "../theme";
import { NameCard } from "../ui/NameCard";
import { BkI, CalI, ChI, UsrI } from "../ui/icons";

export function ProfPage({ go, photos, setPhotos, avatar, setAvatar, mem, events, rsvps, onOpenEvt }) {
  const joined = events.filter(e => isPublic(e) && answerOf(rsvps, e.id, ME) === "yes");
  const upcoming = joined.filter(e => !isPast(e)).sort(byStart).slice(0, 3);
  const attended = joined.filter(isPast).sort((a, b) => byStart(b, a)).slice(0, 3);
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 10 }}>
            <button onClick={() => go("members")}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                border: "1px solid #e5e7eb", background: "#fff", color: "#666", fontSize: 12, fontWeight: 600 }}>
              <UsrI s={14} />社員一覧
            </button>
            <button onClick={() => setEditing(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                border: `1.5px solid ${A}`, background: "#fff", color: A, fontSize: 12, fontWeight: 700 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              編集
            </button>
          </div>
          <NameCard name={p.name} kana={p.kana} nick={p.nick} hometown={p.hometown} dept={dept} hobby={p.hobby} avatar={avatar} />

          <div style={{ ...C, padding: 16, textAlign: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
              {grpsOf(ME, mem).map((g, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#fff", background: g.color }}>
                  <span style={{ width: 5, height: 5, background: "#fff", borderRadius: "50%", display: "inline-block" }} />{g.name}
                </span>
              ))}
            </div>
            <div style={{ color: "#777", fontSize: 13, marginBottom: 12 }}>{p.bio}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{p.joinedCompany}入社</span>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 10 }}>参加予定のイベント</div>
            {upcoming.length === 0
              ? <div style={{ ...C, padding: "22px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>参加予定のイベントはありません</div>
              : upcoming.map(e => <EvRow key={e.id} e={e} onGo={() => onOpenEvt(e.id)} />)}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 10 }}>参加したイベント</div>
            {attended.length === 0
              ? <div style={{ ...C, padding: "22px 16px", textAlign: "center", color: "#bbb", fontSize: 12 }}>まだ参加したイベントはありません</div>
              : attended.map(e => (
                  <button key={e.id} onClick={() => onOpenEvt(e.id)}
                    style={{ ...C, display: "flex", alignItems: "center", gap: 10, padding: 12, marginBottom: 8, border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
                    <span style={{ width: 3, alignSelf: "stretch", borderRadius: 2, background: gColor(e.g), flexShrink: 0 }} />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 11, color: gColor(e.g), fontWeight: 600 }}>{e.g}</span>
                      <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#111", marginTop: 2 }}>{e.t}</span>
                      <span style={{ ...M, marginTop: 5 }}><CalI s={12} />{fmtDate(e.start)} {tRange(e)}</span>
                    </span>
                    <span style={{ color: "#ddd" }}><ChI /></span>
                  </button>
                ))}
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
