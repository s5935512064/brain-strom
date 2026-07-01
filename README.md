# 🧠 Brain Strom

ระบบส่วนตัวสำหรับแปลง **ไอเดีย → Mindmap** ด้วย AI
พิมพ์หัวข้อหรือไอเดียลงไป แล้ว AI (Claude) จะแตกออกมาเป็น mindmap แบบในภาพตัวอย่าง
วาดด้วย [React Flow](https://reactflow.dev/) และจัดวางอัตโนมัติด้วย dagre

> A personal tool that turns an **idea into a mindmap** using the Anthropic Claude API,
> rendered with React Flow and auto-laid-out with dagre.

---

## ✨ ฟีเจอร์ / Features

- พิมพ์ไอเดียภาษาไทยหรืออังกฤษ → ได้ mindmap ทันที (AI ตอบเป็นภาษาเดียวกับที่พิมพ์)
- โครงสร้างหลายชั้น มีสี + emoji แยกตามระดับ เหมือนภาพตัวอย่าง
- ลาก / ซูม / minimap / fit-to-view
- จำ mindmap ล่าสุดไว้ใน `localStorage` (เปิดใหม่ก็ยังอยู่)
- ตัวอย่างไอเดียให้กดลองได้เลย

## 🧱 สถาปัตยกรรม / How it works

```
Browser (Next.js client)
  │  พิมพ์ไอเดีย
  ▼
POST /api/generate          ← app/api/generate/route.ts
  │  เรียก Claude (messages.create) พร้อม system prompt
  ▼
Claude → JSON แบบ flat { root, nodes:[{id,label,parentId,emoji}] }
  │
  ▼
lib/mindmap.ts  → แปลงเป็น nodes/edges + คำนวณความลึก/สี
lib/layout.ts   → จัดตำแหน่งด้วย dagre (ซ้าย→ขวา)
  ▼
components/MindMap.tsx (React Flow) → วาดออกมา
```

โครงสร้างไฟล์:

| ไฟล์ | หน้าที่ |
|------|--------|
| `app/api/generate/route.ts` | เรียก Claude แล้วคืน JSON ของ mindmap |
| `lib/prompt.ts` | system prompt + ตัวแยก JSON ออกจากคำตอบ |
| `lib/mindmap.ts` | แปลง JSON → nodes/edges ของ React Flow |
| `lib/layout.ts` | จัด layout อัตโนมัติด้วย dagre |
| `components/MindMap.tsx` | canvas ของ React Flow |
| `components/MindMapNode.tsx` | หน้าตาแต่ละ node |
| `components/IdeaInput.tsx` | ช่องพิมพ์ไอเดีย + ตัวอย่าง |

## 🚀 เริ่มใช้งาน / Getting started

ต้องมี **Node.js 18+**

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. (ไม่บังคับ) ตั้งค่า API key เพื่อให้ AI สร้างจริง
cp .env.example .env.local
# แล้วแก้ค่า ANTHROPIC_API_KEY=sk-ant-... ในไฟล์ .env.local

# 3. รัน dev server
npm run dev
```

เปิด http://localhost:3000

## 🧪 ทดสอบฟรี / Testing for free

- **โหมดเดโม (ไม่ต้องมี key):** กดปุ่ม **🧪 เดโม** ได้เลย จะได้ mindmap ตัวอย่าง
  (ถ้าพิมพ์ไอเดียไว้ก่อน ระบบจะสร้างโครงตัวอย่างจากไอเดียนั้นให้) — ใช้ดูหน้าตา/การทำงานได้ครบโดยไม่ต้องมี API key
- **ใช้ AI จริง:** ต้องมี API key ของ Anthropic
  - Anthropic **ไม่มี key ฟรีถาวร** แต่บัญชีใหม่มัก **ได้เครดิตทดลองฟรี** — สมัครที่ https://console.anthropic.com/ แล้วสร้าง key ที่ **Settings → API Keys**
  - อยากประหยัดเครดิต ใช้โมเดลถูกสุด: ตั้ง `ANTHROPIC_MODEL=claude-haiku-4-5` ใน `.env.local`

### ตัวแปรแวดล้อม / Environment variables

| ตัวแปร | จำเป็น | ค่าเริ่มต้น | คำอธิบาย |
|--------|:------:|------------|----------|
| `ANTHROPIC_API_KEY` | ✅ | — | API key ของ Anthropic |
| `ANTHROPIC_MODEL` | — | `claude-opus-4-8` | เปลี่ยนโมเดลที่ใช้สร้าง mindmap ได้ |

## 🛠️ เทคโนโลยี / Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **React Flow** (`@xyflow/react`) สำหรับวาด mindmap
- **@dagrejs/dagre** สำหรับจัด layout
- **@anthropic-ai/sdk** เชื่อมต่อ Claude
- **Tailwind CSS**

## 📌 หมายเหตุ / Notes

- โมเดลเริ่มต้นคือ `claude-opus-4-8` — เปลี่ยนได้ผ่าน `ANTHROPIC_MODEL`
- API key ถูกใช้เฉพาะฝั่งเซิร์ฟเวอร์ (route handler) ไม่ถูกส่งไปที่เบราว์เซอร์
