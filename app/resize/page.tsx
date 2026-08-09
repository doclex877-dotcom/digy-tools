"use client";

import { useState } from "react";
import FileDrop from "@/components/FileDrop";
import ResultCard from "@/components/ResultCard";
import ToolShell from "@/components/ToolShell";
import { Loader2, Link2, Link2Off } from "lucide-react";

const PRESETS = [
  { label: "Instagram post", w: 1080, h: 1080 },
  { label: "LinkedIn banner", w: 1584, h: 396 },
  { label: "Passport photo", w: 600, h: 600 },
  { label: "HD (1920×1080)", w: 1920, h: 1080 },
];

type Result = {
  fileName: string;
  beforeBytes: number;
  afterBytes: number;
  url: string;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function ResizePage() {
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [lockRatio, setLockRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    const file = files[0];
    if (!file) return;
    setError(null);
    setResult(null);
    setPendingFile(file);

    const img = await loadImage(file);
    const ratio = img.naturalWidth / img.naturalHeight;
    setAspectRatio(ratio);
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
  }

  function applyPreset(w: number, h: number) {
    setWidth(w);
    setHeight(h);
    setAspectRatio(w / h);
  }

  function onWidthChange(v: number) {
    setWidth(v);
    if (lockRatio) setHeight(Math.round(v / aspectRatio));
  }

  function onHeightChange(v: number) {
    setHeight(v);
    if (lockRatio) setWidth(Math.round(v * aspectRatio));
  }

  async function processResize() {
    if (!pendingFile) return;
    setProcessing(true);
    setError(null);

    try {
      const img = await loadImage(pendingFile);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, 0, 0, width, height);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, pendingFile.type || "image/png", 0.92)
      );
      if (!blob) throw new Error("Resize failed");

      const url = URL.createObjectURL(blob);
      setResult({
        fileName: pendingFile.name,
        beforeBytes: pendingFile.size,
        afterBytes: blob.size,
        url,
      });
    } catch {
      setError("That file couldn't be resized. Try a different image.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <ToolShell
      title="Image Resizer"
      subtitle="Resize to exact pixels or a ready-made preset."
      howItWorks="Pick a preset or type exact pixel dimensions, and the image is redrawn to that size on an in-memory canvas in your browser. Locking the aspect ratio keeps the image from stretching when you change just one dimension."
      faqs={[
        {
          q: "Will resizing distort my image?",
          a: "Only if the aspect ratio lock is off and your new width/height don't match the original proportions. Keep the lock on to avoid stretching.",
        },
        {
          q: "Can I make an image larger, not just smaller?",
          a: "Yes, but enlarging a small image beyond its original size will look softer — resizing works best when shrinking down.",
        },
        {
          q: "What do the presets use?",
          a: "Common sizes for Instagram posts, LinkedIn banners, passport-style photos, and standard HD — a starting point you can still fine-tune.",
        },
      ]}
      related={[
        { href: "/compress", label: "Image Compressor" },
        { href: "/convert", label: "Image Converter" },
        { href: "/image-to-pdf", label: "Image to PDF" },
      ]}
    >
      <FileDrop
        accept="image/png,image/jpeg,image/webp"
        helperText="PNG, JPG or WebP"
        onFiles={handleFiles}
      />

      {pendingFile && !result && (
        <div className="mt-6 rounded-2xl border border-border bg-paper-raised p-6">
          <div className="flex flex-wrap gap-2 mb-5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.w, p.h)}
                className="text-[13px] px-3 py-1.5 rounded-full border border-border text-ink-soft hover:border-teal hover:text-teal transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-3">
            <label className="flex-1">
              <span className="text-[12px] text-ink-soft block mb-1">Width</span>
              <input
                type="number"
                value={width}
                onChange={(e) => onWidthChange(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-[14px] tabular-nums bg-paper"
              />
            </label>

            <button
              onClick={() => setLockRatio((v) => !v)}
              className="mb-2 text-ink-soft hover:text-teal transition-colors"
              aria-label="Toggle aspect ratio lock"
              title={lockRatio ? "Aspect ratio locked" : "Aspect ratio unlocked"}
            >
              {lockRatio ? <Link2 size={17} /> : <Link2Off size={17} />}
            </button>

            <label className="flex-1">
              <span className="text-[12px] text-ink-soft block mb-1">Height</span>
              <input
                type="number"
                value={height}
                onChange={(e) => onHeightChange(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-[14px] tabular-nums bg-paper"
              />
            </label>
          </div>

          <button
            onClick={processResize}
            disabled={processing}
            className="w-full mt-5 bg-ink text-paper rounded-full py-3 text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing && <Loader2 size={16} className="animate-spin" />}
            {processing ? "Resizing…" : "Resize image"}
          </button>
        </div>
      )}

      {error && (
        <p className="text-[14px] text-error bg-error-soft rounded-lg px-4 py-3 mt-6">
          {error}
        </p>
      )}

      {result && (
        <ResultCard
          fileName={result.fileName}
          beforeBytes={result.beforeBytes}
          afterBytes={result.afterBytes}
          downloadUrl={result.url}
          downloadName={`resized-${result.fileName}`}
          onReset={() => {
            setResult(null);
            setPendingFile(null);
          }}
        />
      )}
    </ToolShell>
  );
}
