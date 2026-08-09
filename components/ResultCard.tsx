"use client";

import { Download, RotateCcw } from "lucide-react";
import { formatBytes, percentChange } from "@/lib/format";

type ResultCardProps = {
  fileName: string;
  beforeBytes: number;
  afterBytes?: number;
  downloadUrl?: string;
  downloadName?: string;
  onReset: () => void;
  actionLabel?: string;
};

export default function ResultCard({
  fileName,
  beforeBytes,
  afterBytes,
  downloadUrl,
  downloadName,
  onReset,
  actionLabel = "Download",
}: ResultCardProps) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-paper-raised p-6 animate-[fadeIn_0.25s_ease]">
      <p className="text-[14px] text-ink-soft truncate mb-4">{fileName}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[20px] tabular-nums text-ink-soft line-through decoration-1">
            {formatBytes(beforeBytes)}
          </span>
          {afterBytes !== undefined && (
            <>
              <span className="text-ink-soft">→</span>
              <span className="text-[22px] tabular-nums font-semibold text-teal">
                {formatBytes(afterBytes)}
              </span>
              <span className="text-[13px] tabular-nums text-teal bg-teal-soft px-2 py-0.5 rounded-full">
                {percentChange(beforeBytes, afterBytes)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {downloadUrl && (
          <a
            href={downloadUrl}
            download={downloadName}
            className="flex-1 flex items-center justify-center gap-2 bg-ink text-paper rounded-full py-3 text-[14px] font-medium hover:opacity-90 transition-opacity"
          >
            <Download size={16} />
            {actionLabel}
          </a>
        )}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 border border-border rounded-full px-5 py-3 text-[14px] text-ink-soft hover:text-ink hover:border-ink-soft transition-colors"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>
    </div>
  );
}
