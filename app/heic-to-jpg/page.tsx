"use client";

import { useState } from "react";
import FileDrop from "@/components/FileDrop";
import ResultCard from "@/components/ResultCard";
import ToolShell from "@/components/ToolShell";
import { Loader2 } from "lucide-react";

type Result = {
  fileName: string;
  beforeBytes: number;
  afterBytes: number;
  url: string;
};

export default function HeicToJpgPage() {
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
      const heic2any = (await import("heic2any")).default;
      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });
      const blob = Array.isArray(converted) ? converted[0] : converted;

      const url = URL.createObjectURL(blob);
      setResult({
        fileName: file.name,
        beforeBytes: file.size,
        afterBytes: blob.size,
        url,
      });
    } catch {
      setError("That file couldn't be converted. Make sure it's a valid HEIC or HEIF photo.");
    } finally {
      setProcessing(false);
    }
  }

  const baseName = result?.fileName.replace(/\.[^.]+$/, "") ?? "photo";

  return (
    <ToolShell
      title="HEIC to JPG"
      subtitle="Turn iPhone photos into JPG files anyone can open."
      howItWorks="HEIC is the photo format iPhones save by default, which many apps and Windows PCs still can't open directly. This tool decodes the HEIC file and re-encodes it as a standard JPG, entirely in your browser — the photo is never uploaded anywhere."
      faqs={[
        {
          q: "Why can't I open HEIC files on my PC?",
          a: "HEIC is Apple's default photo format since iOS 11. Many Windows apps, older software, and some websites don't support it, which is why converting to JPG is often necessary.",
        },
        {
          q: "Will I lose photo quality?",
          a: "Very little — the conversion uses a 90% quality setting, which is close to visually lossless for viewing and sharing.",
        },
        {
          q: "Can I convert HEIF files too?",
          a: "Yes, HEIF and HEIC use the same underlying format and both work with this tool.",
        },
        {
          q: "Does this work on iPhone Safari?",
          a: "Yes — it runs in any modern mobile or desktop browser, including Safari on iPhone.",
        },
      ]}
      related={[
        { href: "/compress", label: "Image Compressor" },
        { href: "/convert", label: "Image Converter" },
        { href: "/image-to-pdf", label: "Image to PDF" },
      ]}
    >
      <FileDrop
        accept="image/heic,image/heif,.heic,.heif"
        helperText="HEIC or HEIF"
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
          downloadName={`${baseName}.jpg`}
          onReset={() => setResult(null)}
          actionLabel="Download JPG"
        />
      )}
    </ToolShell>
  );
}
