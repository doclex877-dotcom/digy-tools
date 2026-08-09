"use client";

import { useState } from "react";
import FileDrop from "@/components/FileDrop";
import ResultCard from "@/components/ResultCard";
import ToolShell from "@/components/ToolShell";
import { Loader2 } from "lucide-react";

type Format = "image/png" | "image/jpeg" | "image/webp";

const FORMATS: { value: Format; label: string; ext: string }[] = [
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

type Result = {
  fileName: string;
  beforeBytes: number;
  afterBytes: number;
  url: string;
  ext: string;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function ConvertPage() {
  const [target, setTarget] = useState<Format>("image/webp");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    const file = files[0];
    if (!file) return;
    setError(null);
    setProcessing(true);
    setResult(null);

    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      if (target === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, target, 0.92)
      );
      if (!blob) throw new Error("Conversion failed");

      const url = URL.createObjectURL(blob);
      const ext = FORMATS.find((f) => f.value === target)!.ext;
      setResult({
        fileName: file.name,
        beforeBytes: file.size,
        afterBytes: blob.size,
        url,
        ext,
      });
    } catch {
      setError("That file couldn't be converted. Try a different image.");
    } finally {
      setProcessing(false);
    }
  }

  const baseName = result?.fileName.replace(/\.[^.]+$/, "") ?? "image";

  return (
    <ToolShell
      title="Image Converter"
      subtitle="Convert between PNG, JPG and WebP in one click."
      howItWorks="Your image is drawn onto an in-memory canvas in your browser and re-encoded into the format you choose. WebP is usually the smallest for the web; JPG is the most universally supported; PNG keeps transparency. The conversion happens entirely on your device."
      faqs={[
        {
          q: "Which format should I pick?",
          a: "WebP for the smallest file size on websites, JPG for maximum compatibility with older tools, and PNG when you need a transparent background.",
        },
        {
          q: "Does converting to JPG lose transparency?",
          a: "Yes — JPG doesn't support transparent pixels, so any transparent areas are filled with white. Use PNG or WebP if you need to keep transparency.",
        },
        {
          q: "Is quality lost when converting?",
          a: "Converting to PNG is lossless. Converting to JPG or WebP uses a high quality setting (92%) that keeps visible loss minimal.",
        },
      ]}
      related={[
        { href: "/compress", label: "Image Compressor" },
        { href: "/heic-to-jpg", label: "HEIC to JPG" },
        { href: "/resize", label: "Image Resizer" },
      ]}
    >
      <div className="flex justify-center gap-2 mb-5">
        {FORMATS.map((f) => (
          <button
            key={f.value}
            onClick={() => setTarget(f.value)}
            className={`px-4 py-1.5 rounded-full text-[13px] border transition-colors ${
              target === f.value
                ? "bg-ink text-paper border-ink"
                : "border-border text-ink-soft hover:border-ink-soft"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <FileDrop
        accept="image/png,image/jpeg,image/webp"
        helperText={`Convert to ${FORMATS.find((f) => f.value === target)!.label}`}
        onFiles={handleFiles}
      />

      {processing && (
        <div className="flex items-center justify-center gap-2 text-ink-soft text-[14px] mt-6">
          <Loader2 size={16} className="animate-spin" />
          Converting…
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
          downloadName={`${baseName}.${result.ext}`}
          onReset={() => setResult(null)}
        />
      )}
    </ToolShell>
  );
}
