import { ME } from "../../data/users";
import { FeedRow } from "../feed/FeedRow";
import { findUser, gColor } from "../../lib/people";
import { A } from "../../theme";
import { Av } from "../../ui/Avatar";

export function PostCard({ post, onDelete, onUpdate, onOpen }) {
  const au = findUser(post.u || ME);
  const joined = post.joined || [];
  const mine = (post.u || ME) === ME;
  return (
    <FeedRow avatar={<Av u={au} s={40} />} name={au.nm} time={post.d}
      sub={post.g && <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: gColor(post.g), borderRadius: 4, padding: "1px 7px" }}>{post.g}</span>}
      onDelete={mine ? onDelete : null}
      onComment={onOpen}
      meta={{ likes: post.likes, liked: post.liked, comments: post.comments || [] }}
      onUpdate={(m) => onUpdate({ ...post, likes: m.likes, liked: m.liked, comments: m.comments })}>
      <button onClick={onOpen} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer", color: "#222", fontSize: 14, lineHeight: 1.65, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{post.ds}</button>
      {post.recruiting && (
        <div style={{ marginTop: 10, padding: 12, borderRadius: 12, background: "#FFF9F0", border: "1px solid #F5DEB3" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: A }}>参加者募集中</span>
            {joined.length > 0 && <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>{joined.length}人が参加</span>}
          </div>
          <button onClick={() => onUpdate({ ...post, joined: joined.includes("あなた") ? joined.filter(x => x !== "あなた") : [...joined, "あなた"] })}
            style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
              background: joined.includes("あなた") ? "#f0f0f0" : A, color: joined.includes("あなた") ? "#999" : "#fff" }}>
            {joined.includes("あなた") ? "✓ 参加済み" : "参加する"}
          </button>
        </div>
      )}
    </FeedRow>
  );
}
