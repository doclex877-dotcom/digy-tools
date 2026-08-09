"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileDrop from "@/components/FileDrop";
import ResultCard from "@/components/ResultCard";
import ToolShell from "@/components/ToolShell";
import { Loader2, X } from "lucide-react";

type Result = {
  beforeBytes: number;
  afterBytes: number;
  url: string;
};

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(newFiles: File[]) {
    setError(null);
    setResult(null);
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function buildPdf() {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();
      const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const isPng = file.type === "image/png";
        const image = isPng
          ? await pdfDoc.embedPng(bytes)
          : await pdfDoc.embedJpg(bytes);

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setResult({ beforeBytes: totalBytes, afterBytes: blob.size, url });
    } catch {
      setError("Couldn't build the PDF. Make sure all files are PNG or JPG images.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <ToolShell
      title="Image to PDF"
      subtitle="Combine one or more images into a single PDF."
      howItWorks="Each image is embedded onto its own page, sized to match the image's original dimensions, and assembled into one PDF file — all in your browser using an in-memory PDF library. Nothing is uploaded to a server at any point."
      faqs={[
        {
          q: "Can I add more than one image?",
          a: "Yes — drop or select multiple images and each becomes its own page, in the order you added them.",
        },
        {
          q: "What order will the pages be in?",
          a: "The same order the images were added. Remove and re-add a file if you need to reorder it.",
        },
        {
          q: "Which image formats are supported?",
          a: "PNG and JPG. Convert HEIC or WebP images first using the HEIC to JPG or Image Converter tools.",
        },
      ]}
      related={[
        { href: "/compress", label: "Image Compressor" },
        { href: "/convert", label: "Image Converter" },
        { href: "/resize", label: "Image Resizer" },
      ]}
    >
      <FileDrop
        accept="image/png,image/jpeg"
        helperText="PNG or JPG — add as many as you need"
        onFiles={handleFiles}
        multiple
      />

      {files.length > 0 && !result && (
        <div className="mt-6 rounded-2xl border border-border bg-paper-raised p-4">
          <ul className="divide-y divide-border">
            {files.map((file, i) => (
              <li key={`${file.name}-${i}`} className="flex items-center justify-between py-2.5 px-2">
                <span className="text-[14px] text-ink truncate">{i + 1}. {file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-ink-soft hover:text-error transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={buildPdf}
            disabled={processing}
            className="w-full mt-4 bg-ink text-paper rounded-full py-3 text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing && <Loader2 size={16} className="animate-spin" />}
            {processing ? "Building PDF…" : `Build PDF from ${files.length} image${files.length > 1 ? "s" : ""}`}
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
          fileName={`${files.length} image${files.length > 1 ? "s" : ""} combined`}
          beforeBytes={result.beforeBytes}
          afterBytes={result.afterBytes}
          downloadUrl={result.url}
          downloadName="digy-images.pdf"
          onReset={() => {
            setResult(null);
            setFiles([]);
          }}
          actionLabel="Download PDF"
        />
      )}
    </ToolShell>
  );
}
