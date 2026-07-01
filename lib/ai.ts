import Anthropic from "@anthropic-ai/sdk";
import { MINDMAP_SYSTEM_PROMPT } from "./prompt";

// Provider abstraction: the app can talk to Google Gemini (has a free tier) or
// Anthropic Claude. Selection is automatic based on which key is present.

export type Provider = "gemini" | "anthropic";

export function activeProvider(): Provider | null {
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return "gemini";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  return null;
}

/** Calls the configured provider and returns its raw text response (JSON string). */
export async function generateMindMapText(idea: string): Promise<string> {
  const provider = activeProvider();
  if (provider === "gemini") return callGemini(idea);
  if (provider === "anthropic") return callAnthropic(idea);
  throw new Error("NO_PROVIDER");
}

async function callGemini(idea: string): Promise<string> {
  const key = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)!;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: MINDMAP_SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: `Idea: ${idea}` }] }],
      // Force a JSON response so it parses cleanly.
      generationConfig: { responseMimeType: "application/json", temperature: 0.8 },
    }),
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error(
        `โควตา Gemini free tier เต็ม (429) — รอสักครู่แล้วลองใหม่ หรือเปลี่ยนโมเดลด้วย GEMINI_MODEL (เช่น gemini-2.0-flash) / Gemini free-tier quota exceeded. Wait a bit or set a different GEMINI_MODEL.`
      );
    }
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text =
    data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text) throw new Error("Gemini returned an empty response");
  return text;
}

async function callAnthropic(idea: string): Promise<string> {
  const client = new Anthropic();
  const model = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
  const message = await client.messages.create({
    model,
    max_tokens: 4096,
    system: MINDMAP_SYSTEM_PROMPT,
    messages: [{ role: "user", content: `Idea: ${idea}` }],
  });
  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}
