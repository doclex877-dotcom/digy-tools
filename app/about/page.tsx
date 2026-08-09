import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description: "Why Digy exists and how its tools work.",
};

export default function AboutPage() {
  return (
    <PageShell title="About Digy">
      <p>
        Digy is a small set of image tools built around one idea: the tasks
        people do most often with their photos — shrinking a file, changing
        its format, resizing it for a specific use, converting an iPhone
        photo, or putting a few images into a PDF — shouldn&apos;t require an
        account, a subscription, or handing your files over to a server you
        know nothing about.
      </p>
      <p>
        Every tool on this site runs entirely in your browser. When you drop
        a file into a tool, it&apos;s processed on your own device using your
        browser&apos;s built-in capabilities — it is never uploaded, stored,
        or seen by anyone else. Close the tab and it&apos;s gone.
      </p>
      <h2>Why free</h2>
      <p>
        Digy is supported by advertising rather than fees or accounts. That
        trade-off keeps the tools free and fast for anyone who needs them,
        without asking for a login or payment for something that should be
        simple.
      </p>
      <h2>What&apos;s here now</h2>
      <p>
        Five tools, chosen deliberately rather than trying to cover
        everything: an image compressor, a format converter, a HEIC to JPG
        converter, an image resizer, and an image-to-PDF tool. More may be
        added over time, but only when they meet the same bar — genuinely
        useful, fast, and private by default.
      </p>
    </PageShell>
  );
}
