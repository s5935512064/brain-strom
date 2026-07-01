"use client";

import { useCallback, useEffect, useState } from "react";
import { MindMap } from "@/components/MindMap";
import { IdeaInput } from "@/components/IdeaInput";
import { isMindMapData, type MindMapData } from "@/lib/types";

const STORAGE_KEY = "brain-strom:last";

export default function Home() {
  const [data, setData] = useState<MindMapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore the last generated mindmap so it feels like a personal workspace.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isMindMapData(parsed)) setData(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const generate = useCallback(async (idea: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body?.error ?? "เกิดข้อผิดพลาด / Something went wrong.");
        return;
      }
      if (isMindMapData(body)) {
        setData(body);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(body));
        } catch {
          /* storage full or unavailable — non-fatal */
        }
      } else {
        setError("รูปแบบข้อมูลไม่ถูกต้อง / Unexpected response.");
      }
    } catch {
      setError("เชื่อมต่อไม่ได้ / Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="flex h-screen flex-col">
      <header className="z-10 border-b border-slate-200 bg-white/80 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <h1 className="text-lg font-bold text-slate-800">🧠 Brain Strom</h1>
            <p className="text-xs text-slate-400">
              พิมพ์ไอเดีย → AI สร้าง mindmap ให้อัตโนมัติ
            </p>
          </div>
          <IdeaInput onGenerate={generate} loading={loading} />
          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          ) : null}
        </div>
      </header>

      <section className="relative flex-1">
        {data ? (
          <MindMap data={data} />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div className="max-w-sm text-slate-400">
              <div className="mb-3 text-5xl">🗺️</div>
              <p className="text-sm">
                ยังไม่มี mindmap — พิมพ์ไอเดียด้านบนแล้วกด{" "}
                <span className="font-medium text-slate-500">สร้าง Mindmap</span>
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
            <div className="flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-lg">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
              <span className="text-sm text-slate-600">AI กำลังคิด…</span>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
