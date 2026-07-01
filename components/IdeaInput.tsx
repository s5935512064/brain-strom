"use client";

import { useState } from "react";

const EXAMPLES = [
  "วางแผนเปิดร้านกาแฟ",
  "ระบบ Intranet performance & UX",
  "เรียน Machine Learning ตั้งแต่ศูนย์",
  "แผนออกกำลังกาย 3 เดือน",
];

export function IdeaInput({
  onGenerate,
  onDemo,
  loading,
}: {
  onGenerate: (idea: string) => void;
  onDemo: (idea: string) => void;
  loading: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    const idea = value.trim();
    if (idea && !loading) onGenerate(idea);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="พิมพ์ไอเดียของคุณ… / Type your idea…"
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        />
        <button
          onClick={submit}
          disabled={loading || !value.trim()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              กำลังสร้าง…
            </>
          ) : (
            <>✨ สร้าง Mindmap</>
          )}
        </button>
        <button
          onClick={() => onDemo(value.trim())}
          disabled={loading}
          title="ดูตัวอย่างโดยไม่ต้องใช้ API key"
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50"
        >
          🧪 เดโม
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-400">ลองตัวอย่าง:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              setValue(ex);
              if (!loading) onGenerate(ex);
            }}
            disabled={loading}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
