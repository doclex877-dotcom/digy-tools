import Link from "next/link";
import { Shrink, Repeat, ImageIcon, Crop, FileOutput, ArrowRight } from "lucide-react";

const TOOLS = [
  {
    href: "/compress",
    icon: Shrink,
    name: "Image Compressor",
    description: "Shrink PNG and JPG file size without losing visible quality.",
  },
  {
    href: "/convert",
    icon: Repeat,
    name: "Image Converter",
    description: "Convert between PNG, JPG and WebP in one click.",
  },
  {
    href: "/heic-to-jpg",
    icon: ImageIcon,
    name: "HEIC to JPG",
    description: "Turn iPhone photos into JPG files anyone can open.",
  },
  {
    href: "/resize",
    icon: Crop,
    name: "Image Resizer",
    description: "Resize to exact pixels or a ready-made preset.",
  },
  {
    href: "/image-to-pdf",
    icon: FileOutput,
    name: "Image to PDF",
    description: "Combine one or more images into a single PDF.",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-16 text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal bg-teal-soft px-3.5 py-1.5 rounded-full mb-6">
          Free · No sign-up · Nothing uploaded
        </span>
        <h1 className="text-[34px] sm:text-[42px] font-semibold tracking-tight text-ink leading-[1.1]">
          Five image tools. Zero uploads.
        </h1>
        <p className="text-[16px] text-ink-soft mt-4 leading-relaxed">
          Every tool runs in your browser. Your files are processed on your
          own device and never sent to a server.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-4 pb-24">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-border bg-paper-raised p-6 hover:border-teal hover:shadow-[0_4px_20px_rgba(45,106,98,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              <span className="w-11 h-11 rounded-full bg-teal-soft flex items-center justify-center mb-4">
                <Icon size={20} strokeWidth={1.75} className="text-teal" />
              </span>
              <h2 className="text-[17px] font-medium text-ink flex items-center gap-1.5">
                {tool.name}
                <ArrowRight
                  size={15}
                  className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                />
              </h2>
              <p className="text-[14px] text-ink-soft mt-1.5 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
