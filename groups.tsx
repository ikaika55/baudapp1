export const grpCards = [
  { id: 1, name: "フットサル部", since: "2023-05-12", ds: "毎週末フットサルを楽しむグループです。", members: [1, 2, 3, 4, 5, 6], admins: [1, 2], color: "#2E8B57", cat: "スポーツ", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop" },
  { id: 2, name: "ダンス部", since: "2024-04-08", ds: "振り入れから発表会まで、みんなで踊るグループです。", members: [2, 4, 7, 8], admins: [4], color: "#DA70D6", cat: "スポーツ" },
  { id: 3, name: "ダーツ部", since: "2024-02-20", ds: "仕事帰りにダーツを投げています。初心者歓迎。", members: [3, 5, 7], admins: [3], color: "#DC143C", cat: "インドア" },
  { id: 4, name: "麻雀部", since: "2023-09-15", ds: "月に数回集まって卓を囲んでいます。", members: [1, 3, 6, 7, 8], admins: [7], color: "#6B8E23", cat: "インドア" },
  { id: 5, name: "バスケ部", since: "2023-07-03", ds: "体育館を借りて練習と試合をしています。", members: [1, 2, 5, 6], admins: [5], color: "#E89B3C", cat: "スポーツ" },
  { id: 6, name: "バレー部", since: "2024-01-22", ds: "経験者も未経験者も一緒に楽しむバレーボール部。", members: [2, 4, 6, 8], admins: [2], color: "#4682B4", cat: "スポーツ" },
  { id: 7, name: "ゲーム部", since: "2024-02-14", ds: "対戦ゲームからボードゲームまで幅広く遊んでいます。", members: [1, 3, 4, 7, 8], admins: [1, 7], color: "#9370DB", cat: "インドア", img: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=200&fit=crop" },
];

export const groups = grpCards.map(({ id, name, members, color }) => ({ id, name, n: members.length, color }));

export const seedMem = () => Object.fromEntries(grpCards.map(g => [g.name, g.members || []]));
