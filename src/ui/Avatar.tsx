import { gColor } from "../lib/people";

export const Av = ({ u, s = 28 }) => u.av
  ? <img src={u.av} alt="" style={{ width: s, height: s, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
  : <div style={{ width: s, height: s, borderRadius: "50%", flexShrink: 0, background: "#ececec", color: "#888", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(s * 0.4), fontWeight: 700 }}>{u.nm.slice(0, 1)}</div>;

export const ClubAv = ({ g, s = 40 }) => (
  <div style={{ width: s, height: s, borderRadius: "50%", flexShrink: 0, background: gColor(g), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(s * 0.42), fontWeight: 800 }}>{g.slice(0, 1)}</div>
);
