import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Digy.",
};

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <p>
        Found a bug, have a tool request, or need to reach us for any other
        reason? Send an email and we&apos;ll get back to you.
      </p>
      <a
        href="mailto:hello@digy.cash"
        className="inline-flex items-center gap-2 mt-2 bg-ink text-paper rounded-full px-5 py-3 text-[14px] font-medium hover:opacity-90 transition-opacity no-underline"
      >
        <Mail size={16} />
        hello@digy.cash
      </a>
    </PageShell>
  );
}
