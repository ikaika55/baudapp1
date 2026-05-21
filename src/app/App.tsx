import { useState } from "react";

const A = "#E89B3C";
const C = { background: "#fff", borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" };
const M = { display: "flex", alignItems: "center", gap: 5, color: "#999", fontSize: 11 };
const BP = { padding: "9px 16px", background: A, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12, width: "100%" };
const BO = { padding: "9px 16px", border: `1.5px solid ${A}`, color: A, background: "#fff", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12, width: "100%" };

const groups = [
  { id: 1, name: "写真部", n: 24, color: "#E89B3C" },
  { id: 2, name: "読書会", n: 16, color: "#8B7355" },
  { id: 3, name: "ハイキング同好会", n: 18, color: "#6B8E23" },
  { id: 4, name: "音楽部", n: 20, color: "#9370DB" },
  { id: 5, name: "料理クラブ", n: 15, color: "#DC143C" },
];
const evts = [
  { id: 1, g: "写真部", t: "夕焼け撮影会", d: "04/25", tm: "17:00", l: "海浜公園" },
  { id: 2, g: "ハイキング同好会", t: "春の登山", d: "04/28", tm: "06:00", l: "富士山麓" },
  { id: 3, g: "読書会", t: "5月読書会", d: "05/05", tm: "14:00", l: "カフェ・ブックス" },
  { id: 4, g: "音楽部", t: "アコースティックライブ", d: "05/10", tm: "19:00", l: "駅前ホール" },
  { id: 5, g: "料理クラブ", t: "イタリアン料理会", d: "05/12", tm: "11:00", l: "コミュニティキッチン" },
  { id: 6, g: "写真部", t: "夜景撮影ツアー", d: "05/17", tm: "20:00", l: "東京タワー周辺" },
  { id: 7, g: "ハイキング同好会", t: "新緑トレッキング", d: "05/24", tm: "07:00", l: "奥多摩" },
];
const acts = [
  { id: 1, g: "写真部", t: "春の撮影会", ds: "桜を撮りに行きました", d: "04/10", img: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop", p: 12,
    detail: "桜の名所を巡りながら、メンバーそれぞれのカメラで春の瞬間を切り取りました。初心者向けの構図レクチャーもあり、参加者全員が素敵な一枚を撮れました。次回は夏の花火を予定しています！",
    photos: ["https://images.unsplash.com/photo-1522383225653-ed111181a951?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=300&h=300&fit=crop"],
    members: ["山田太郎", "佐藤花子", "田中次郎", "鈴木美咲"] },
  { id: 2, g: "読書会", t: "月例読書会", ds: "今月のテーマ本について議論しました", d: "04/08", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop", p: 8,
    detail: "今月は村上春樹の作品をテーマに語り合いました。様々な解釈が飛び交い、3時間があっという間に過ぎました。来月のテーマ本も決定済みです。新しい参加者も大歓迎！",
    photos: ["https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop"],
    members: ["佐藤花子", "鈴木美咲", "高橋健太"] },
];
const mems = [
  { id: 1, nm: "山田太郎", av: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
  { id: 2, nm: "佐藤花子", av: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 3, nm: "田中次郎", av: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 4, nm: "鈴木美咲", av: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
];
const grpCards = [
  { id: 1, name: "写真部", ds: "写真が好きな人が集まるグループです。", n: 24, color: "#E89B3C", cat: "アウトドア", img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=200&fit=crop" },
  { id: 2, name: "読書会", ds: "月に一度、本を読んで語り合うグループです。", n: 16, color: "#8B7355", cat: "インドア", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop" },
  { id: 3, name: "ハイキング同好会", ds: "自然を楽しみながら健康的に過ごすグループ。", n: 18, color: "#6B8E23", cat: "アウトドア", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop" },
  { id: 4, name: "音楽部", ds: "音楽を楽しむグループです。楽器演奏や鑑賞会を開催。", n: 20, color: "#9370DB", cat: "インドア", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=200&fit=crop" },
  { id: 5, name: "料理クラブ", ds: "新しいレシピに挑戦したり食事会を開催。", n: 15, color: "#DC143C", cat: "趣味", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=200&fit=crop" },
  { id: 6, name: "フットサル部", ds: "毎週末フットサルを楽しむグループです。", n: 22, color: "#2E8B57", cat: "アウトドア", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop" },
  { id: 7, name: "映画鑑賞会", ds: "週末に映画を観て語り合うグループです。", n: 12, color: "#4682B4", cat: "インドア", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=200&fit=crop" },
  { id: 8, name: "ヨガサークル", ds: "心と体をリフレッシュ。初心者歓迎。", n: 14, color: "#DA70D6", cat: "インドア", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop" },
  { id: 9, name: "ボードゲーム部", ds: "カタンやアズールなど毎週遊んでいます。", n: 19, color: "#FF6347", cat: "趣味", img: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=200&fit=crop" },
];
const prof = {
  name: "山田太郎", bio: "写真が好きです。週末は撮影に出かけています。", loc: "東京", joined: "2025-01-15",
  hometown: "大阪府", joinedCompany: "2022年4月", department: "第◯技術部",
  av: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  grps: [{ name: "写真部", color: "#E89B3C" }, { name: "ハイキング同好会", color: "#6B8E23" }, { name: "音楽部", color: "#9370DB" }],
  phs: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=300&h=300&fit=crop",
  ],
};

const Ic = ({ d, s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const CalI = ({ s = 14 }) => <Ic s={s} d={<><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></>}/>;
const PinI = ({ s = 14 }) => <Ic s={s} d={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>}/>;
const UsrI = ({ s = 14 }) => <Ic s={s} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}/>;
const HmI = ({ s = 22 }) => <Ic s={s} d={<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}/>;
const PrI = ({ s = 22 }) => <Ic s={s} d={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}/>;
const BkI = ({ s = 18 }) => <Ic s={s} d={<><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>}/>;
const ChI = ({ s = 16 }) => <Ic s={s} d={<path d="m9 18 6-6-6-6"/>}/>;

function PostCard({ post, onDelete, onUpdate }) {
  const [cmtText, setCmtText] = useState("");
  const [showCmts, setShowCmts] = useState(false);
  const addComment = () => {
    if (!cmtText.trim()) return;
    onUpdate({ ...post, comments: [...post.comments, { id: Date.now(), text: cmtText, d: "今" }] });
    setCmtText("");
  };
  return (
    <div style={{ ...C, padding: 14, position: "relative" }}>
      <button onClick={onDelete} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 4 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>山田太郎</span>
          <span style={{ fontSize: 11, color: "#bbb", marginLeft: 8 }}>{post.d}</span>
        </div>
      </div>
      <div style={{ color: "#444", fontSize: 13, lineHeight: 1.6, marginBottom: post.recruiting ? 0 : 10 }}>{post.ds}</div>
      {/* Recruitment */}
      {post.recruiting && (
        <div style={{ margin: "10px 0", padding: 12, borderRadius: 10, background: "#FFF9F0", border: `1px solid #F5DEB3` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: A }}>参加者募集中</span>
            {(post.joined || []).length > 0 && (
              <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>{post.joined.length}人が参加</span>
            )}
          </div>
          <button
            onClick={() => {
              const j = post.joined || [];
              if (!j.includes("あなた")) {
                onUpdate({ ...post, joined: [...j, "あなた"] });
              }
            }}
            style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
              background: (post.joined || []).includes("あなた") ? "#f0f0f0" : A,
              color: (post.joined || []).includes("あなた") ? "#999" : "#fff",
            }}
          >{(post.joined || []).includes("あなた") ? "✓ 参加済み" : "参加する"}</button>
        </div>
      )}
      {/* Actions */}
      <div style={{ display: "flex", gap: 12, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>
        {post.interested && (
          <button onClick={() => onUpdate({ ...post, likes: (post.likes || 0) + ((post.liked) ? -1 : 1), liked: !post.liked })}
            style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 12,
              color: post.liked ? "#e05688" : "#999" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={post.liked ? "#e05688" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            興味ある！{(post.likes || 0) > 0 ? ` ${post.likes}` : ""}
          </button>
        )}
        <button onClick={() => setShowCmts(!showCmts)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 12 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {post.comments.length > 0 ? post.comments.length : "コメント"}
        </button>
      </div>
      {/* Comments section */}
      {showCmts && (
        <div style={{ marginTop: 10, borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
          {post.comments.map(c => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e5e7eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>ゲスト</span>
                <span style={{ fontSize: 10, color: "#ccc", marginLeft: 6 }}>{c.d}</span>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2, lineHeight: 1.5 }}>{c.text}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text" value={cmtText} onChange={e => setCmtText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addComment()}
              placeholder="コメントする..."
              style={{ flex: 1, padding: "8px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fafafa", fontSize: 12, color: "#111", outline: "none" }}
            />
            <button onClick={addComment} style={{ background: cmtText.trim() ? A : "#e5e7eb", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: cmtText.trim() ? "pointer" : "default", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cmtText.trim() ? "#fff" : "#bbb"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HomePage({ go, onSelectAct }) {
  const [showAll, setShowAll] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [postText, setPostText] = useState("");
  const [recruiting, setRecruiting] = useState(false);
  const [interested, setInterested] = useState(false);
  const [posts, setPosts] = useState([]);
  const visibleEvts = showAll ? evts : evts.slice(0, 3);
  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#555", marginBottom: 10 }}>ホットなボド活</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
          {groups.map(g => (
            <button key={g.id} onClick={() => go("detail")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color }} />{g.name}
            </button>
          ))}
        </div>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 10 }}>イベント</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 6 }}>
        {visibleEvts.map(e => (
          <div key={e.id} style={{ ...C, padding: 14 }}>
            <span style={{ fontSize: 11, color: A, fontWeight: 600 }}>{e.g}</span>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginTop: 2 }}>{e.t}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <span style={M}><CalI />{e.d} {e.tm}</span>
              <span style={M}><PinI />{e.l}</span>
            </div>
            <button style={{ ...BP, marginTop: 10 }}>参加する</button>
          </div>
        ))}
      </div>
      {evts.length > 3 && (
        <button onClick={() => setShowAll(!showAll)} style={{ width: "100%", padding: "10px 0", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, color: A, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          {showAll ? "閉じる" : `もっと見る（残り${evts.length - 3}件）`}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAll ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="m6 9 6 6 6-6"/></svg>
        </button>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>みんなのボド活</h3>
        <button onClick={() => setShowPost(!showPost)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 999, border: "none", background: showPost ? "#f3f3f3" : A, color: showPost ? "#888" : "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          {showPost ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>閉じる</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12h16"/><path d="M12 4v16"/></svg>シェア</>
          )}
        </button>
      </div>
      {/* Post form - X style */}
      {showPost && (
        <div style={{ marginBottom: 12, borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", gap: 12, padding: "12px 0" }}>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <textarea
                value={postText} onChange={e => setPostText(e.target.value)}
                placeholder="いまどんなボド活してる？"
                style={{ width: "100%", minHeight: 80, padding: 0, border: "none", background: "transparent", fontSize: 15, color: "#111", resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              {/* Recruitment toggle */}
              {recruiting && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#FFF5E6", marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  <span style={{ fontSize: 12, color: A, fontWeight: 600 }}>参加者を募集中</span>
                  <button onClick={() => setRecruiting(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              )}
              {interested && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#FFF0F5", marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  <span style={{ fontSize: 12, color: "#e05688", fontWeight: 600 }}>「興味ある！」リアクション付き</span>
                  <button onClick={() => setInterested(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              )}
              <div style={{ height: 1, background: "#e5e7eb", marginBottom: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 2 }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: A, padding: 6, borderRadius: 999 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </button>
                  <button onClick={() => setInterested(!interested)} style={{ background: interested ? "#FFF0F5" : "none", border: "none", cursor: "pointer", color: A, padding: 6, borderRadius: 999 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                  <button onClick={() => setRecruiting(!recruiting)} style={{ background: recruiting ? "#FFF5E6" : "none", border: "none", cursor: "pointer", color: A, padding: 6, borderRadius: 999 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  </button>
                </div>
                <button
                  onClick={() => { if (postText.trim()) { setPosts([{ id: Date.now(), ds: postText, d: "今日", comments: [], recruiting, interested, joined: [], likes: 0 }, ...posts]); setPostText(""); setShowPost(false); setRecruiting(false); setInterested(false); } }}
                  style={{ padding: "8px 20px", background: postText.trim() ? A : "rgba(232,155,60,0.5)", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: postText.trim() ? "pointer" : "default" }}
                >ポストする</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* User posts with comments */}
        {posts.map(p => (
          <PostCard key={p.id} post={p} onDelete={() => setPosts(posts.filter(x => x.id !== p.id))} onUpdate={(updated) => setPosts(posts.map(x => x.id === p.id ? updated : x))} />
        ))}
        {/* Existing activities */}
        {acts.map(a => (
          <button key={a.id} onClick={() => onSelectAct(a)} style={{ ...C, overflow: "hidden", border: "none", cursor: "pointer", textAlign: "left", width: "100%", padding: 0 }}>
            <img src={a.img} alt="" style={{ width: "100%", height: 140, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <span style={{ fontSize: 11, color: A, fontWeight: 600 }}>{a.g}</span>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginTop: 2 }}>{a.t}</div>
              <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>{a.ds}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "#bbb" }}>
                <span>{a.d}</span><span style={{ display: "flex", alignItems: "center", gap: 3 }}><UsrI s={11} />{a.p}人</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GrpsPage({ go }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("すべて");
  const tabs = ["すべて", "アウトドア", "インドア", "趣味", "その他"];
  const filtered = grpCards.filter(g => {
    const matchQ = !q || g.name.includes(q) || g.ds.includes(q);
    const matchCat = cat === "すべて" || g.cat === cat;
    return matchQ && matchCat;
  });
  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
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
      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
        {tabs.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "7px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, flexShrink: 0,
            background: cat === c ? A : "#fff",
            color: cat === c ? "#fff" : "#888",
            boxShadow: cat === c ? "none" : "0 0 0 1px #e5e7eb",
          }}>{c}</button>
        ))}
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
            <button key={g.id} onClick={() => go("detail")} style={{ ...C, overflow: "hidden", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
              <div style={{ position: "relative", height: 130 }}>
                <img src={g.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, borderRadius: "50%", border: "2px solid #fff", background: g.color }} />
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{g.name}</span><ChI />
                </div>
                <div style={{ color: "#888", fontSize: 12, marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.ds}</div>
                <span style={{ ...M, fontSize: 12 }}><UsrI s={12} />{g.n}人</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminPage({ go }) {
  const [tab, setTab] = useState("group");
  const [gName, setGName] = useState("写真部");
  const [gDesc, setGDesc] = useState("写真が好きな人が集まるグループです。週末に撮影会を開催したり、作品を共有したりしています。");
  const [evtList, setEvtList] = useState([
    { id: 1, t: "夕焼け撮影会", d: "04/25", tm: "17:00", l: "海浜公園", st: "公開中" },
    { id: 2, t: "機材交換会", d: "05/02", tm: "15:00", l: "コミュニティセンター", st: "公開中" },
    { id: 3, t: "夜景撮影ツアー", d: "05/17", tm: "20:00", l: "東京タワー周辺", st: "下書き" },
  ]);
  const [showNewEvt, setShowNewEvt] = useState(false);
  const [newEvt, setNewEvt] = useState({ t: "", d: "", tm: "", l: "" });
  const [saved, setSaved] = useState(false);

  const addEvt = () => {
    if (!newEvt.t.trim()) return;
    setEvtList([...evtList, { id: Date.now(), ...newEvt, st: "下書き" }]);
    setNewEvt({ t: "", d: "", tm: "", l: "" });
    setShowNewEvt(false);
  };

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
              <img src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&h=300&fit=crop" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            <div style={{ ...C, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="text" placeholder="イベント名" value={newEvt.t} onChange={e => setNewEvt({ ...newEvt, t: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <input type="text" placeholder="日付 (MM/DD)" value={newEvt.d} onChange={e => setNewEvt({ ...newEvt, d: e.target.value })}
                  style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                <input type="text" placeholder="時間 (HH:MM)" value={newEvt.tm} onChange={e => setNewEvt({ ...newEvt, tm: e.target.value })}
                  style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <input type="text" placeholder="場所" value={newEvt.l} onChange={e => setNewEvt({ ...newEvt, l: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setShowNewEvt(false)} style={{ ...BO, flex: 1 }}>キャンセル</button>
                <button onClick={addEvt} style={{ ...BP, flex: 1, opacity: newEvt.t.trim() ? 1 : 0.5 }}>作成</button>
              </div>
            </div>
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
                    <span style={M}><CalI />{e.d} {e.tm}</span>
                    <span style={M}><PinI />{e.l}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {/* Toggle status */}
                  <button onClick={() => setEvtList(evtList.map(x => x.id === e.id ? { ...x, st: x.st === "公開中" ? "下書き" : "公開中" } : x))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  {/* Delete */}
                  <button onClick={() => setEvtList(evtList.filter(x => x.id !== e.id))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#e55", padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewRecordPage({ go }) {
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

function DetPage({ go, onSelectAct }) {
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => go("groups")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}><BkI />戻る</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => go("newRecord")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 8, border: "none", background: A, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            記録
          </button>
          <button onClick={() => go("admin")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            管理
          </button>
        </div>
      </div>
      <div style={{ position: "relative", height: 160 }}>
        <img src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&h=300&fit=crop" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, padding: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>写真部</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>24人 • 2024-06-10設立</div>
        </div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={C}>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>メンバー</span>
              <span style={{ fontSize: 12, color: "#999" }}>24人</span>
            </div>
            <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none" }}>
              {mems.map(m => (
                <button key={m.id} onClick={() => go("profile")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", minWidth: 56 }}>
                  <img src={m.av} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontSize: 10, color: "#666" }}>{m.nm.slice(0, 3)}</span>
                </button>
              ))}
            </div>
            <button style={{ ...BO, marginTop: 12 }}>グループに参加</button>
          </div>
        </div>
        <div style={{ ...C, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 8 }}>グループについて</div>
          <div style={{ color: "#666", fontSize: 13, lineHeight: 1.7 }}>写真が好きな人が集まるグループです。週末に撮影会を開催したり、作品を共有したりしています。</div>
        </div>
        <div style={{ ...C, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 10 }}>今後の予定</div>
          {[{ t: "夕焼け撮影会", d: "04/25 17:00", l: "海浜公園" }, { t: "機材交換会", d: "05/02 15:00", l: "コミュニティセンター" }].map((e, i) => (
            <div key={i} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{e.t}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}><span style={M}><CalI />{e.d}</span><span style={M}><PinI />{e.l}</span></div>
              <button style={{ ...BP, marginTop: 10 }}>参加する</button>
            </div>
          ))}
        </div>
        <div style={{ ...C, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 10 }}>活動記録</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {acts.map(a => (
              <button key={a.id} onClick={() => onSelectAct(a)} style={{ ...C, overflow: "hidden", border: "none", cursor: "pointer", textAlign: "left", width: "100%", padding: 0 }}>
                <img src={a.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{a.t}</div>
                  <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{a.ds}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={M}><CalI />{a.d}</span>
                    <span style={M}><UsrI s={11} />{a.p}人</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfPage() {
  const [editing, setEditing] = useState(false);
  const [p, setP] = useState({
    name: prof.name, bio: prof.bio, hometown: prof.hometown,
    joinedCompany: prof.joinedCompany, deptNum: "◯",
  });
  const [saved, setSaved] = useState(false);
  const dept = `第${p.deptNum}技術部`;

  const save = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(false); }, 1000);
  };

  return (
    <div style={{ padding: "14px 16px", paddingBottom: 20 }}>
      {!editing ? (
        <>
          <div style={{ ...C, padding: 20, textAlign: "center", marginBottom: 20 }}>
            <img src={prof.av} alt="" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px" }} />
            <div style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 8 }}>{p.name}</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
              {prof.grps.map((g, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#fff", background: g.color }}>
                  <span style={{ width: 5, height: 5, background: "#fff", borderRadius: "50%", display: "inline-block" }} />{g.name}
                </span>
              ))}
            </div>
            <div style={{ color: "#777", fontSize: 13, marginBottom: 12 }}>{p.bio}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{p.hometown}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{p.joinedCompany}入社</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#666" }}>{dept}</span>
            </div>
            <button onClick={() => setEditing(true)} style={BP}>プロフィールを編集</button>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 12 }}>写真</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {prof.phs.map((u, i) => (
              <div key={i} style={{ aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", ...C }}>
                <img src={u} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
              <img src={prof.av} alt="" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: A, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </div>
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

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedAct, setSelectedAct] = useState(null);
  const nav = [
    { id: "home", lb: "ホーム", ic: <HmI /> },
    { id: "groups", lb: "ボド部", ic: <UsrI s={22} /> },
    { id: "profile", lb: "プロフィール", ic: <PrI /> },
  ];
  const on = (id) => page === id || (id === "groups" && (page === "groups" || page === "detail" || page === "admin" || page === "newRecord"));

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e8e6e1 0%, #d4d0c8 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#999", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>iPhone 14 — 375 × 812</div>
        {/* Phone body */}
        <div style={{
          width: 375, height: 720,
          borderRadius: 44, border: "7px solid #1a1a1a",
          background: "#1a1a1a", overflow: "hidden", position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset",
        }}>
          {/* Dynamic Island */}
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, background: "#000", borderRadius: 20, zIndex: 100 }} />
          {/* Screen */}
          <div style={{ width: "100%", height: "100%", borderRadius: 37, overflow: "hidden", background: "#f7f6f3", display: "flex", flexDirection: "column", fontFamily: "'Noto Sans JP', -apple-system, 'Hiragino Sans', sans-serif", position: "relative" }}>
            <div style={{ height: 48 }} />
            <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "10px 16px", flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: 18, color: A }}>コミュニティ</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="no-scrollbar">
              {page === "home" && <HomePage go={setPage} onSelectAct={setSelectedAct} />}
              {page === "profile" && <ProfPage />}
              {page === "groups" && <GrpsPage go={setPage} />}
              {page === "detail" && <DetPage go={setPage} onSelectAct={setSelectedAct} />}
              {page === "admin" && <AdminPage go={setPage} />}
              {page === "newRecord" && <NewRecordPage go={setPage} />}
            </div>
            <div style={{ background: "#fff", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around", padding: "6px 0 20px", flexShrink: 0 }}>
              {nav.map(n => (
                <button key={n.id} onClick={() => setPage(n.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 12px",
                    color: on(n.id) ? A : "#ccc", fontWeight: on(n.id) ? 700 : 400, fontSize: 10 }}>
                  {n.ic}{n.lb}
                </button>
              ))}
            </div>
            {/* Activity Detail Overlay */}
            {selectedAct && (
              <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", borderRadius: 37, overflow: "hidden" }}>
                <div onClick={() => setSelectedAct(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                <div style={{ position: "relative", marginTop: "auto", background: "#fff", borderRadius: "16px 16px 0 0", maxHeight: "80%", overflowY: "auto", scrollbarWidth: "none" }}>
                  <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
                    <div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} />
                  </div>
                  <img src={selectedAct.img} alt="" style={{ width: "100%", height: 180, objectFit: "cover", marginTop: 8 }} />
                  <div style={{ padding: 16 }}>
                    <span style={{ fontSize: 12, color: A, fontWeight: 600 }}>{selectedAct.g}</span>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: "4px 0 0" }}>{selectedAct.t}</h2>
                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                      <span style={M}><CalI />{selectedAct.d}</span>
                      <span style={M}><UsrI s={12} />{selectedAct.p}人参加</span>
                    </div>
                    <div style={{ marginTop: 14, color: "#555", fontSize: 13, lineHeight: 1.8 }}>{selectedAct.detail}</div>
                    {selectedAct.photos && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>写真</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                          {selectedAct.photos.map((ph, i) => (
                            <div key={i} style={{ aspectRatio: "1/1", borderRadius: 8, overflow: "hidden" }}>
                              <img src={ph} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedAct.members && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>参加メンバー</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {selectedAct.members.map((name, i) => (
                            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, background: "#f5f5f5", fontSize: 11, color: "#555", fontWeight: 500 }}>
                              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              </div>
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <button onClick={() => setSelectedAct(null)} style={{ width: "100%", marginTop: 20, padding: "11px 0", background: "#f5f5f5", border: "none", borderRadius: 10, color: "#888", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>閉じる</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Home indicator */}
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.25)" }} />
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </div>
  );
}
