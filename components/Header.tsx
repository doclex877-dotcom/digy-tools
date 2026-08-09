"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TOOLS = [
  { href: "/compress", label: "Image Compressor" },
  { href: "/convert", label: "Image Converter" },
  { href: "/heic-to-jpg", label: "HEIC to JPG" },
  { href: "/resize", label: "Image Resizer" },
  { href: "/image-to-pdf", label: "Image to PDF" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-paper-raised shadow-[0_1px_0_0_rgba(0,0,0,0.03)] sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-teal text-paper flex items-center justify-center text-[15px] font-bold tracking-tight">
            D
          </span>
          <span className="text-[19px] font-semibold tracking-tight text-ink">
            Digy
          </span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="flex items-center gap-1.5 text-[15px] text-ink-soft hover:text-ink transition-colors"
            aria-expanded={open}
            aria-haspopup="true"
          >
            5 tools
            <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-paper-raised border border-border rounded-lg shadow-sm py-1.5 z-10">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block px-4 py-2 text-[14px] text-ink hover:bg-teal-soft hover:text-teal transition-colors"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
