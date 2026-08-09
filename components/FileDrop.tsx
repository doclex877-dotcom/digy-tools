"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

type FileDropProps = {
  accept: string;
  helperText: string;
  onFiles: (files: File[]) => void;
  multiple?: boolean;
};

export default function FileDrop({ accept, helperText, onFiles, multiple = false }: FileDropProps) {
  const [dragging, setDragging] = useState(false);
  const [pulse, setPulse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList);
      onFiles(multiple ? files : [files[0]]);
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    },
    [onFiles, multiple]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={`
        cursor-pointer rounded-2xl border-2 border-dashed
        flex flex-col items-center justify-center text-center
        py-16 px-6 transition-colors duration-150
        ${dragging ? "border-teal bg-teal-soft" : "border-border bg-paper-raised hover:border-ink-soft"}
        ${pulse ? "border-teal" : ""}
      `}
    >
      <UploadCloud size={30} strokeWidth={1.5} className="text-ink-soft mb-4" />
      <p className="text-[15px] text-ink">
        Drag a file here, or <span className="text-teal underline underline-offset-2">click to browse</span>
      </p>
      <p className="text-[13px] text-ink-soft mt-1.5">{helperText}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
