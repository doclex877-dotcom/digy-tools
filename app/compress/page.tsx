"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
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

export default function CompressPage() {
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
      const compressed = await imageCompression(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 3840,
        useWebWorker: true,
        initialQuality: 0.8,
      });

      const url = URL.createObjectURL(compressed);
      setResult({
        fileName: file.name,
        beforeBytes: file.size,
        afterBytes: compressed.size,
        url,
      });
    } catch {
      setError("That file couldn't be compressed. Try a different PNG or JPG.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <ToolShell
      title="Image Compressor"
      subtitle="Reduce file size without losing visible quality."
      howItWorks="Your image is compressed using your browser's built-in image codecs, running locally on your device. The file is resampled and re-encoded at a slightly lower quality setting chosen to stay visually close to the original, then handed back to you as a download. Nothing is uploaded anywhere in the process."
      faqs={[
        {
          q: "Will this reduce image quality?",
          a: "Slightly, but it's tuned to stay close to invisible at normal viewing sizes. If you need lossless output, this tool isn't the right fit — it trades a small amount of quality for a large drop in file size.",
        },
        {
          q: "What file types are supported?",
          a: "PNG and JPG. For WebP or format conversion alongside compression, use the Image Converter.",
        },
        {
          q: "Is there a file size limit?",
          a: "No hard limit, but very large files (over ~25MB) may take a few extra seconds since everything runs on your own device.",
        },
        {
          q: "Do you store my images?",
          a: "No. The file never leaves your browser — there's no server involved in this tool at all.",
        },
      ]}
      related={[
        { href: "/convert", label: "Image Converter" },
        { href: "/resize", label: "Image Resizer" },
        { href: "/image-to-pdf", label: "Image to PDF" },
      ]}
    >
      <FileDrop
        accept="image/png,image/jpeg"
        helperText="PNG or JPG"
        onFiles={handleFiles}
      />

      {processing && (
        <div className="flex items-center justify-center gap-2 text-ink-soft text-[14px] mt-6">
          <Loader2 size={16} className="animate-spin" />
          Compressing…
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
          downloadName={`compressed-${result.fileName}`}
          onReset={() => setResult(null)}
        />
      )}
    </ToolShell>
  );
}
