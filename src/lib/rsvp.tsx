import { findGrpRaw } from "./people";

export const isPublic = (e) => e.st === "公開中";

export const answerOf = (rsvps, eventId, userId) => {
  const r = rsvps.find(x => x.eventId === eventId && x.userId === userId);
  return r ? r.answer : null;
};

export const tally = (rsvps, e) => {
  const rows = rsvps.filter(r => r.eventId === e.id);
  const yes = rows.filter(r => r.answer === "yes").map(r => r.userId);
  const no = rows.filter(r => r.answer === "no").map(r => r.userId);
  const roster = findGrpRaw(e.g).members || [];
  const pending = roster.filter(u => !rows.some(r => r.userId === u));
  return { yes, no, pending, roster };
};
