// System prompt + helpers for turning an idea into a mindmap via Claude.

export const MINDMAP_SYSTEM_PROMPT = `You are a mindmap generator. Given a single idea, topic, or question, you break it down into a clear, well-structured mindmap.

Return ONLY a JSON object (no markdown fences, no commentary) with this exact shape:

{
  "root": "the central topic — short, a few words",
  "nodes": [
    { "id": "n1", "label": "Main branch", "parentId": "root", "emoji": "🚀" },
    { "id": "n2", "label": "Sub point", "parentId": "n1", "emoji": "✅" }
  ]
}

Rules:
- "root" is the central node label. Keep it short.
- Every entry in "nodes" needs a unique "id" (like "n1", "n2", ...), a concise "label", a "parentId", and a fitting "emoji".
- Top-level branches use "parentId": "root".
- Deeper nodes reference their parent's id.
- Produce 4 to 6 main branches. Give each branch 2 to 4 children. Go up to 3 levels deep where it adds value.
- Labels should be short phrases (max ~8 words), not sentences.
- Pick a single relevant emoji per node.
- Respond in the SAME language as the user's idea (e.g. Thai idea -> Thai labels).
- Output valid JSON only. Do not wrap it in code fences.`;

/**
 * Pulls the first balanced JSON object out of a model response, tolerating
 * stray prose or code fences around it.
 */
export function extractJson(text: string): unknown {
  const trimmed = text.trim();

  // Fast path: the whole thing is JSON.
  try {
    return JSON.parse(trimmed);
  } catch {
    // fall through to bracket scanning
  }

  const start = trimmed.indexOf("{");
  if (start === -1) throw new Error("No JSON object found in model response");

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return JSON.parse(trimmed.slice(start, i + 1));
      }
    }
  }

  throw new Error("Could not parse JSON from model response");
}
