export const users = [
  { id: 1, nm: "山田太郎", av: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" , dept: "第1技術部", since: "2021-04", bio: "体を動かすのが好きです。週末はだいたいコートにいます。" , kana: "やまだたろう", nick: "たろちゃん", hometown: "大阪府", hobby: "フットサル、ゲーム、カメラ" },
  { id: 2, nm: "佐藤花子", av: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" , dept: "第2技術部", since: "2019-04", bio: "バレーとダンス。声だけは大きいです。" , kana: "さとうはなこ", nick: "はなちゃん", hometown: "神奈川県", hobby: "バレー、ダンス、カフェ巡り" },
  { id: 3, nm: "田中次郎", av: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" , dept: "営業部", since: "2022-10", bio: "ダーツ歴3年。同期募集中。" , kana: "たなかじろう", nick: "じろー", hometown: "愛知県", hobby: "ダーツ、麻雀、ラーメン" },
  { id: 4, nm: "鈴木美咲", av: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" , dept: "第1技術部", since: "2023-04", bio: "踊ることと食べることが好きです。" , kana: "すずきみさき", nick: "みさ", hometown: "東京都", hobby: "ダンス、映画、パン作り" },
  { id: 5, nm: "高橋健太" , dept: "管理部", since: "2018-04", bio: "バスケは学生時代から。ブランクあり。" , kana: "たかはしけんた", nick: "けんちゃん", hometown: "北海道", hobby: "バスケ、ダーツ、筋トレ" },
  { id: 6, nm: "中村優子" , dept: "第2技術部", since: "2020-04", bio: "運動もゲームもほどほどに楽しんでいます。" , kana: "なかむらゆうこ", nick: "ゆうこさん", hometown: "福岡県", hobby: "バレー、散歩、読書" },
  { id: 7, nm: "小林大輔" , dept: "営業部", since: "2017-04", bio: "麻雀とゲームの幹事をやっています。" , kana: "こばやしだいすけ", nick: "だいちゃん", hometown: "埼玉県", hobby: "麻雀、ゲーム、将棋" },
  { id: 8, nm: "渡辺さくら" , dept: "第1技術部", since: "2024-04", bio: "新人です。いろいろ顔を出しています。" , kana: "わたなべさくら", nick: "さくら", hometown: "京都府", hobby: "ダンス、バレー、写真" },
];

export const ME = 1;

export const prof = {
  name: "山田太郎", kana: "やまだたろう", bio: "体を動かすのが好きです。週末はだいたいコートにいます。", loc: "東京", joined: "2025-01-15",
  nick: "たろちゃん", hobby: "フットサル、ゲーム、カメラ",
  hometown: "大阪府", joinedCompany: "2022年4月", department: "第◯技術部",
  av: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  grps: [{ name: "フットサル部", color: "#2E8B57" }, { name: "バスケ部", color: "#E89B3C" }, { name: "ゲーム部", color: "#9370DB" }],
  phs: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=300&h=300&fit=crop",
  ],
};

export const demoPhotos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=300&h=300&fit=crop",
];

export const photosOf = (u) => (u.id % 2 === 0 ? demoPhotos.slice(0, 2) : demoPhotos.slice(2));
