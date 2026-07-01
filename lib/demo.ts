import type { MindMapData } from "./types";

// Built-in sample mindmaps so the app can be tried without an API key.
// Used by the "Demo" button in the UI.

const coffee: MindMapData = {
  root: "เปิดร้านกาแฟ",
  nodes: [
    { id: "n1", label: "ทำเล & สถานที่", parentId: "root", emoji: "📍" },
    { id: "n1a", label: "ย่านคนเดินเยอะ", parentId: "n1", emoji: "🚶" },
    { id: "n1b", label: "ค่าเช่า & สัญญา", parentId: "n1", emoji: "📝" },
    { id: "n2", label: "เมนู & สินค้า", parentId: "root", emoji: "☕" },
    { id: "n2a", label: "กาแฟสเปเชียลตี้", parentId: "n2", emoji: "🫘" },
    { id: "n2b", label: "เบเกอรี่", parentId: "n2", emoji: "🥐" },
    { id: "n2c", label: "เครื่องดื่มไม่มีคาเฟอีน", parentId: "n2", emoji: "🧋" },
    { id: "n3", label: "การเงิน", parentId: "root", emoji: "💰" },
    { id: "n3a", label: "เงินลงทุนตั้งต้น", parentId: "n3", emoji: "🏦" },
    { id: "n3b", label: "จุดคุ้มทุน", parentId: "n3", emoji: "📈" },
    { id: "n4", label: "การตลาด", parentId: "root", emoji: "📣" },
    { id: "n4a", label: "โซเชียลมีเดีย", parentId: "n4", emoji: "📱" },
    { id: "n4b", label: "โปรเปิดร้าน", parentId: "n4", emoji: "🎉" },
    { id: "n5", label: "ทีมงาน", parentId: "root", emoji: "👥" },
    { id: "n5a", label: "จ้างบาริสต้า", parentId: "n5", emoji: "👨‍🍳" },
    { id: "n5b", label: "อบรมพนักงาน", parentId: "n5", emoji: "🎓" },
  ],
};

const ml: MindMapData = {
  root: "เรียน Machine Learning",
  nodes: [
    { id: "m1", label: "พื้นฐานคณิตศาสตร์", parentId: "root", emoji: "➗" },
    { id: "m1a", label: "พีชคณิตเชิงเส้น", parentId: "m1", emoji: "📐" },
    { id: "m1b", label: "สถิติ & ความน่าจะเป็น", parentId: "m1", emoji: "🎲" },
    { id: "m2", label: "โปรแกรมมิ่ง", parentId: "root", emoji: "🐍" },
    { id: "m2a", label: "Python", parentId: "m2", emoji: "💻" },
    { id: "m2b", label: "NumPy & Pandas", parentId: "m2", emoji: "🧮" },
    { id: "m3", label: "อัลกอริทึม ML", parentId: "root", emoji: "🤖" },
    { id: "m3a", label: "Supervised", parentId: "m3", emoji: "🏷️" },
    { id: "m3b", label: "Unsupervised", parentId: "m3", emoji: "🔍" },
    { id: "m3c", label: "Deep Learning", parentId: "m3", emoji: "🧠" },
    { id: "m4", label: "เครื่องมือ", parentId: "root", emoji: "🧰" },
    { id: "m4a", label: "scikit-learn", parentId: "m4", emoji: "⚙️" },
    { id: "m4b", label: "PyTorch", parentId: "m4", emoji: "🔥" },
    { id: "m5", label: "ลงมือทำโปรเจกต์", parentId: "root", emoji: "🚀" },
    { id: "m5a", label: "Kaggle", parentId: "m5", emoji: "🏆" },
    { id: "m5b", label: "สร้าง portfolio", parentId: "m5", emoji: "📁" },
  ],
};

const fitness: MindMapData = {
  root: "แผนออกกำลังกาย 3 เดือน",
  nodes: [
    { id: "f1", label: "ตั้งเป้าหมาย", parentId: "root", emoji: "🎯" },
    { id: "f1a", label: "ลดไขมัน / เพิ่มกล้าม", parentId: "f1", emoji: "⚖️" },
    { id: "f1b", label: "วัดผลรายสัปดาห์", parentId: "f1", emoji: "📊" },
    { id: "f2", label: "การฝึก", parentId: "root", emoji: "🏋️" },
    { id: "f2a", label: "เวทเทรนนิ่ง", parentId: "f2", emoji: "💪" },
    { id: "f2b", label: "คาร์ดิโอ", parentId: "f2", emoji: "🏃" },
    { id: "f2c", label: "วันพัก", parentId: "f2", emoji: "🛌" },
    { id: "f3", label: "โภชนาการ", parentId: "root", emoji: "🥗" },
    { id: "f3a", label: "โปรตีนให้พอ", parentId: "f3", emoji: "🍗" },
    { id: "f3b", label: "คุมแคลอรี่", parentId: "f3", emoji: "🔢" },
    { id: "f4", label: "การพักฟื้น", parentId: "root", emoji: "😴" },
    { id: "f4a", label: "นอน 7-8 ชม.", parentId: "f4", emoji: "🌙" },
    { id: "f4b", label: "ยืดเหยียด", parentId: "f4", emoji: "🧘" },
  ],
};

const intranet: MindMapData = {
  root: "Intranet Performance & UX",
  nodes: [
    { id: "i1", label: "Performance Optimization", parentId: "root", emoji: "🚀" },
    { id: "i1a", label: "Caching & CDN", parentId: "i1", emoji: "⚡" },
    { id: "i1b", label: "Frontend rendering", parentId: "i1", emoji: "🧠" },
    { id: "i2", label: "User Experience", parentId: "root", emoji: "🧭" },
    { id: "i2a", label: "Personalization", parentId: "i2", emoji: "🎯" },
    { id: "i2b", label: "Accessibility", parentId: "i2", emoji: "♿" },
    { id: "i3", label: "Network & Connectivity", parentId: "root", emoji: "🌐" },
    { id: "i3a", label: "Edge / WAN optimization", parentId: "i3", emoji: "📡" },
    { id: "i3b", label: "Multi-device", parentId: "i3", emoji: "📱" },
    { id: "i4", label: "Analytics & Monitoring", parentId: "root", emoji: "📈" },
    { id: "i4a", label: "Usage analytics", parentId: "i4", emoji: "📊" },
    { id: "i4b", label: "Real-user monitoring", parentId: "i4", emoji: "🔎" },
  ],
};

const SAMPLES: { keywords: string[]; data: MindMapData }[] = [
  { keywords: ["กาแฟ", "coffee", "cafe", "คาเฟ่", "ร้านกาแฟ"], data: coffee },
  { keywords: ["machine", "ml", "learning", "เรียน", "ai", "deep"], data: ml },
  { keywords: ["ออกกำลัง", "fitness", "workout", "ฟิต", "gym", "สุขภาพ"], data: fitness },
  { keywords: ["intranet", "performance", "ux", "เว็บ", "ระบบ"], data: intranet },
];

/** Generic scaffold used when the idea doesn't match any built-in sample. */
function genericFromIdea(idea: string): MindMapData {
  const root = idea.trim() || "ไอเดียของฉัน";
  return {
    root,
    nodes: [
      { id: "g1", label: "เป้าหมาย", parentId: "root", emoji: "🎯" },
      { id: "g1a", label: "เป้าหมายหลัก", parentId: "g1", emoji: "⭐" },
      { id: "g1b", label: "ตัวชี้วัดความสำเร็จ", parentId: "g1", emoji: "📊" },
      { id: "g2", label: "ขั้นตอนการทำ", parentId: "root", emoji: "🪜" },
      { id: "g2a", label: "เริ่มต้น", parentId: "g2", emoji: "🟢" },
      { id: "g2b", label: "ลงมือทำ", parentId: "g2", emoji: "🔨" },
      { id: "g2c", label: "ตรวจทาน", parentId: "g2", emoji: "✅" },
      { id: "g3", label: "ทรัพยากร", parentId: "root", emoji: "🧰" },
      { id: "g3a", label: "คน / ทีม", parentId: "g3", emoji: "👥" },
      { id: "g3b", label: "งบประมาณ", parentId: "g3", emoji: "💰" },
      { id: "g4", label: "ความเสี่ยง", parentId: "root", emoji: "⚠️" },
      { id: "g4a", label: "อุปสรรคที่อาจเจอ", parentId: "g4", emoji: "🚧" },
      { id: "g4b", label: "แผนสำรอง", parentId: "g4", emoji: "🛟" },
      { id: "g5", label: "วัดผล & ปรับปรุง", parentId: "root", emoji: "📈" },
      { id: "g5a", label: "เก็บ feedback", parentId: "g5", emoji: "💬" },
      { id: "g5b", label: "ปรับแผน", parentId: "g5", emoji: "🔄" },
    ],
  };
}

/**
 * Returns a demo mindmap for the given idea — a matching built-in sample if a
 * keyword matches, otherwise a generic scaffold centred on the typed idea.
 */
export function getDemo(idea: string): MindMapData {
  const q = idea.trim().toLowerCase();
  if (q) {
    const hit = SAMPLES.find((s) => s.keywords.some((k) => q.includes(k)));
    if (hit) return hit.data;
  }
  return genericFromIdea(idea);
}
