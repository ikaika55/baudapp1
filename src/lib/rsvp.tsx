import { findGrp } from "./people";

export const isPublic = (e) => e.st === "公開中";

export const answerOf = (rsvps, eventId, userId) => {
  const r = rsvps.find(x => x.eventId === eventId && x.userId === userId);
  return r ? r.answer : null;
};

export const tally = (rsvps, e) => {
  const roster = findGrp(e.g).members || [];
  const of = (a) => roster.filter(u => answerOf(rsvps, e.id, u) === a);
  const yes = of("yes"), no = of("no");
  const pending = roster.filter(u => !answerOf(rsvps, e.id, u));
  return { yes, no, pending, roster };
};
