export const dPart = (iso) => (iso || "").slice(0, 10);

export const tPart = (iso) => (iso || "").slice(11, 16);

export const fmtDate = (iso) => `${dPart(iso).slice(5, 7)}/${dPart(iso).slice(8, 10)}`;

export const tRange = (e) => {
  if (!e.end) return tPart(e.start);
  return dPart(e.start) === dPart(e.end)
    ? `${tPart(e.start)}–${tPart(e.end)}`
    : `${tPart(e.start)}–${fmtDate(e.end)} ${tPart(e.end)}`;
};

export const byStart = (a, b) => (a.start || "").localeCompare(b.start || "");

export const stamp = (d) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;
};

export const nowISO = () => stamp(new Date());

export const daysAgoISO = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return stamp(d); };

export const endOf = (e) => e.end || e.start || "";

export const isPast = (e) => endOf(e) < nowISO();
// 終了から1週間たった予定は「今後の予定」から自動的に消える

export const KEEP_DAYS = 7;

export const stillListed = (e) => endOf(e) >= daysAgoISO(KEEP_DAYS);

export const pad2 = (n) => String(n).padStart(2, "0");

export const WD = ["日", "月", "火", "水", "木", "金", "土"];

export const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

export const MINS = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
