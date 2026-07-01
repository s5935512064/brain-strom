import { NextResponse } from "next/server";
import { extractJson } from "@/lib/prompt";
import { isMindMapData } from "@/lib/types";
import { activeProvider, generateMindMapText } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  let idea: string;
  try {
    const body = await request.json();
    idea = typeof body?.idea === "string" ? body.idea.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!idea) {
    return NextResponse.json({ error: "กรุณาใส่ไอเดียก่อนครับ / Please enter an idea." }, { status: 400 });
  }
  if (idea.length > 2000) {
    return NextResponse.json({ error: "ไอเดียยาวเกินไป / Idea is too long." }, { status: 400 });
  }

  if (!activeProvider()) {
    return NextResponse.json(
      {
        error:
          "ยังไม่ได้ตั้งค่า API key — ใส่ GEMINI_API_KEY (ฟรีที่ aistudio.google.com/apikey) หรือ ANTHROPIC_API_KEY ใน .env.local, หรือกดปุ่ม 🧪 เดโม เพื่อลองโดยไม่ต้องมี key / No API key set. Add GEMINI_API_KEY (free) or ANTHROPIC_API_KEY to .env.local, or click 🧪 Demo.",
      },
      { status: 500 }
    );
  }

  try {
    const text = await generateMindMapText(idea);
    const parsed = extractJson(text);

    if (!isMindMapData(parsed)) {
      return NextResponse.json(
        { error: "โมเดลตอบกลับมาในรูปแบบที่ไม่ถูกต้อง ลองกดสร้างใหม่อีกครั้ง / The model returned an unexpected shape. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[generate] error", err);
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `สร้างไม่สำเร็จ / Generation failed: ${detail}` }, { status: 500 });
  }
}
