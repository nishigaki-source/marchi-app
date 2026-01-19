import { Briefcase, Calendar, Utensils, Ticket, Scissors, GraduationCap } from 'lucide-react';

export const CATEGORIES = [
  { id: 'gourmet', name: 'グルメ', icon: Utensils, color: 'bg-orange-100 text-orange-600', badge: 'orange' },
  { id: 'event', name: 'イベント', icon: Ticket, color: 'bg-purple-100 text-purple-600', badge: 'purple' },
  { id: 'beauty', name: '美容', icon: Scissors, color: 'bg-pink-100 text-pink-600', badge: 'pink' },
  { id: 'school', name: 'スクール', icon: GraduationCap, color: 'bg-green-100 text-green-600', badge: 'green' },
  { id: 'job', name: '求人', icon: Briefcase, color: 'bg-blue-100 text-blue-600', badge: 'blue' },
];

export const INITIAL_LISTINGS = [
  {
    id: 1,
    type: 'job',
    title: '【急募】カフェホールスタッフ募集！週2〜OK',
    businessName: 'Sunny Cafe',
    area: '世田谷区',
    wage: '時給 1,200円〜',
    tags: ['未経験OK', 'まかない有', 'シフト自由'],
    status: 'published',
    imageUrl: '[https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000)',
    description: '地元で愛されるカフェで働きませんか？未経験の方も丁寧に教えます。',
    requirements: '週2日以上、1日4時間〜',
    adminStatus: 'approved'
  },
  {
    id: 2,
    type: 'school',
    title: '年少〜小学生向け 英会話教室 体験受付中',
    businessName: 'Global Kids Lab',
    area: '世田谷区',
    wage: '月謝 8,000円',
    tags: ['無料体験あり', 'ネイティブ講師', '送迎あり'],
    status: 'published',
    imageUrl: '[https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000)',
    description: '遊びながら学ぶ英会話。まずは無料体験にお越しください！',
    requirements: '3歳〜12歳対象',
    adminStatus: 'approved'
  },
  {
    id: 3,
    type: 'event',
    title: '【週末限定】地元野菜のマルシェ開催',
    businessName: '世田谷グリーンファーム',
    area: '世田谷区',
    wage: '入場無料',
    tags: ['雨天決行', '家族連れ歓迎', 'ペット可'],
    status: 'published',
    imageUrl: '[https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1000)',
    description: '採れたての新鮮野菜が並ぶマルシェ。キッチンカーも多数出店！',
    requirements: 'どなたでも参加可能',
    adminStatus: 'approved'
  },
  {
    id: 4,
    type: 'gourmet',
    title: '隠れ家イタリアン ランチコース開始',
    businessName: 'Trattoria Verde',
    area: '目黒区',
    wage: 'ランチ 1,500円〜',
    tags: ['個室あり', 'テラス席', 'ワイン充実'],
    status: 'published',
    imageUrl: '[https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=1000)',
    description: '特別な日のランチに。自家製パスタと厳選ワインをお楽しみください。',
    requirements: '要予約',
    adminStatus: 'approved'
  },
  {
    id: 5,
    type: 'beauty',
    title: '【初回オフ無料】ジェルネイル モデル募集',
    businessName: 'Nail Salon Pinky',
    area: '渋谷区',
    wage: '施術代 3,000円',
    tags: ['練習モデル', 'デザイン自由', '駅近'],
    status: 'published',
    imageUrl: '[https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1000)',
    description: '技術向上のため、ハンドジェルの練習モデル様を募集しています。',
    requirements: '2時間程度お座りいただける方',
    adminStatus: 'approved'
  },
  {
    id: 6,
    type: 'job',
    title: '【短期】イベント設営スタッフ',
    businessName: '株式会社イベントプロ',
    area: '渋谷区',
    wage: '日給 15,000円',
    tags: ['短期', '高収入', '現金手渡し'],
    status: 'pending_review',
    imageUrl: '[https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000)',
    description: '週末だけのイベント設営です。体力に自信がある方歓迎。',
    requirements: '経験者優遇',
    adminStatus: 'pending'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 101,
    listingId: 1,
    applicantName: '山田 太郎',
    status: 'unread',
    appliedAt: '2023-10-25 14:30',
    message: 'カフェでの経験はありませんが、接客が好きです。',
    isBillable: true
  },
  {
    id: 102,
    listingId: 2,
    applicantName: '佐藤 花子',
    status: 'contacted',
    appliedAt: '2023-10-24 09:15',
    message: '5歳の娘の体験をお願いしたいです。',
    isBillable: true
  }
];
