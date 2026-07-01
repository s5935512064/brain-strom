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

รองรับ AI 2 เจ้า — แอปจะเลือกใช้ **Gemini ก่อน** ถ้ามี `GEMINI_API_KEY` ไม่งั้นใช้ Claude

- **Google Gemini (free tier — แนะนำ):** ขอ API key ฟรีที่ https://aistudio.google.com/apikey
  (ไม่ต้องผูกบัตร) แล้วใส่ `GEMINI_API_KEY=...` ใน `.env.local`
  - ค่าเริ่มต้นใช้โมเดล `gemini-2.0-flash` เปลี่ยนได้ด้วย `GEMINI_MODEL=...`
- **Anthropic Claude:** สมัคร https://console.anthropic.com/ (บัญชีใหม่มักได้เครดิตทดลองฟรี)
  แล้วใส่ `ANTHROPIC_API_KEY=...` — ประหยัดเครดิตด้วย `ANTHROPIC_MODEL=claude-haiku-4-5`
- **โหมดเดโม (ไม่ต้องมี key เลย):** กดปุ่ม **🧪 เดโม** ในแอป ได้ mindmap ตัวอย่างทันที

### ตัวแปรแวดล้อม / Environment variables

ตั้งค่าอย่างน้อย 1 provider (Gemini จะถูกใช้ก่อนถ้ามี key)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|--------|------------|----------|
| `GEMINI_API_KEY` | — | API key ของ Google Gemini (มี free tier) |
| `GEMINI_MODEL` | `gemini-2.0-flash` | เปลี่ยนโมเดล Gemini |
| `ANTHROPIC_API_KEY` | — | API key ของ Anthropic (ถ้าไม่ใช้ Gemini) |
| `ANTHROPIC_MODEL` | `claude-opus-4-8` | เปลี่ยนโมเดล Claude |

## 🛠️ เทคโนโลยี / Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **React Flow** (`@xyflow/react`) สำหรับวาด mindmap
- **@dagrejs/dagre** สำหรับจัด layout
- **Google Gemini** (REST) หรือ **@anthropic-ai/sdk** (Claude) — เลือกได้
- **Tailwind CSS**

## 📌 หมายเหตุ / Notes

- โมเดลเริ่มต้นคือ `claude-opus-4-8` — เปลี่ยนได้ผ่าน `ANTHROPIC_MODEL`
- API key ถูกใช้เฉพาะฝั่งเซิร์ฟเวอร์ (route handler) ไม่ถูกส่งไปที่เบราว์เซอร์
