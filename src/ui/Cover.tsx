export const Cover = ({ g, fs = 20 }) => (
  g.img
    ? <img src={g.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${g.color} 0%, ${g.color}aa 100%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.95)", fontWeight: 800, fontSize: fs, letterSpacing: "0.06em" }}>{g.name}</div>
);
