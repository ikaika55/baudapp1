import { acts } from "../data/activities";
import { ActCard } from "../features/activities/ActCard";
import { EvtCard } from "../features/events/EvtCard";
import { PostCard } from "../features/posts/PostCard";
import { isPast } from "../lib/date";
import { isPublic } from "../lib/rsvp";

export function HomePage({ onSelectAct, posts, setPosts, actMeta, setActMeta, onOpenPost, events, rsvps, onRsvp, onOpenEvt }) {
  const newEvts = events.filter(e => isPublic(e) && !isPast(e)).sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 4);
  const feed = [
    ...newEvts.map(e => ({ k: "e", id: `e${e.id}`, o: e.id, node: (
      <EvtCard key={`e${e.id}`} e={e} onOpen={() => onOpenEvt(e.id)} onRsvp={onRsvp} rsvps={rsvps} />
    )})),
    ...posts.map(p => ({ k: "p", id: `p${p.id}`, o: p.id, node: (
      <PostCard key={`p${p.id}`} post={p} onOpen={() => onOpenPost(p.id)}
        onDelete={() => setPosts(posts.filter(x => x.id !== p.id))}
        onUpdate={(u) => setPosts(posts.map(x => x.id === p.id ? u : x))} />
    )})),
    ...acts.map(a => ({ k: "a", id: `a${a.id}`, o: a.id, node: (
      <ActCard key={`a${a.id}`} a={a} meta={actMeta[a.id] || {}} onOpen={() => onSelectAct(a)}
        onUpdate={(m) => setActMeta({ ...actMeta, [a.id]: m })} />
    )})),
  ];
  return (
    <div style={{ paddingBottom: 8 }}>
      {feed.length === 0 && (
        <div style={{ textAlign: "center", color: "#bbb", fontSize: 13, padding: "48px 24px", lineHeight: 1.8 }}>
          まだ投稿がありません<br />右下のボタンから最初のポストを書いてみましょう
        </div>
      )}
      {feed.map(f => f.node)}
    </div>
  );
}
