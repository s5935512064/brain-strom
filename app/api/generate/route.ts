import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { MINDMAP_SYSTEM_PROMPT, extractJson } from "@/lib/prompt";
import { isMindMapData } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

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

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า ANTHROPIC_API_KEY — ดูวิธีตั้งค่าใน README / ANTHROPIC_API_KEY is not set. See README." },
      { status: 500 }
    );
  }

  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: MINDMAP_SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Idea: ${idea}` }],
    });

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

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
    const status = err instanceof Anthropic.APIError ? err.status ?? 500 : 500;
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `สร้างไม่สำเร็จ / Generation failed: ${detail}` }, { status });
  }
}
