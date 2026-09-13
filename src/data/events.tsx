import { byStart } from "../lib/date";

export const evts = [
  { id: 1, g: "フットサル部", t: "練習試合", start: "2026-04-25T17:00", end: "2026-04-25T19:00", l: "市民体育館グラウンド", ds: "動きやすい服装と室内シューズを持ってきてください。見学だけでも大丈夫です。" },
  { id: 2, g: "バスケ部", t: "週末練習", start: "2026-04-28T10:00", end: "2026-04-28T12:00", l: "第2体育館" },
  { id: 3, g: "麻雀部", t: "月例卓会", start: "2026-05-05T14:00", end: "2026-05-05T18:00", l: "コミュニティルーム", ds: "4人1卓で回します。人数を確定させたいので、参加できるかどうか必ず回答してください。初めての方には最初にルール説明をします。", rsvp: "yesno" },
  { id: 4, g: "ダンス部", t: "振り入れ練習", start: "2026-05-10T19:00", end: "2026-05-10T21:00", l: "スタジオA" },
  { id: 5, g: "ダーツ部", t: "部内トーナメント", start: "2026-05-12T19:00", end: "2026-05-12T21:30", l: "ダーツバー Bull" },
  { id: 6, g: "ゲーム部", t: "対戦会", start: "2026-05-17T20:00", end: "2026-05-17T22:30", l: "会議室C", st: "下書き" },
  { id: 7, g: "バレー部", t: "合同練習", start: "2026-05-24T09:00", end: "2026-05-24T12:00", l: "市民体育館" },
  { id: 8, g: "フットサル部", t: "5月フットサル大会", start: "2026-05-02T13:00", end: "2026-05-02T17:00", l: "河川敷グラウンド", ds: "他部署チームを招いての交流戦です。チーム分けの都合があるので参加可否を早めにお願いします。飲み物はこちらで用意します。", rsvp: "yesno" },
];

export const seedEvts = evts.map(e => ({ st: "公開中", ...e })).sort(byStart);

export const seedRsvps = [
  { eventId: 1, userId: 2, answer: "yes" },
  { eventId: 1, userId: 6, answer: "yes" },
  { eventId: 3, userId: 3, answer: "yes" },
  { eventId: 3, userId: 6, answer: "no" },
  { eventId: 3, userId: 7, answer: "yes" },
  { eventId: 8, userId: 2, answer: "yes" },
  { eventId: 8, userId: 3, answer: "yes" },
  { eventId: 8, userId: 4, answer: "no" },
  { eventId: 8, userId: 5, answer: "yes" },
];
