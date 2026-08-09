import Link from "next/link";

type FAQItem = { q: string; a: string };

type RelatedTool = { href: string; label: string };

type ToolShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  howItWorks: string;
  faqs: FAQItem[];
  related: RelatedTool[];
};

export default function ToolShell({
  title,
  subtitle,
  children,
  howItWorks,
  faqs,
  related,
}: ToolShellProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-ink">{title}</h1>
        <p className="text-[15px] text-ink-soft mt-2">{subtitle}</p>
      </div>

      {children}

      <section className="mt-20 border-t border-border pt-10">
        <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-soft mb-3">
          How it works
        </h2>
        <p className="text-[15px] text-ink leading-relaxed">{howItWorks}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-soft mb-3">
          Questions
        </h2>
        <div className="divide-y divide-border border-t border-b border-border">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer text-[15px] text-ink list-none flex justify-between items-center gap-4">
                {item.q}
                <span className="text-ink-soft group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="text-[14px] text-ink-soft mt-2.5 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-soft mb-3">
            Other tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="text-[14px] px-3.5 py-2 rounded-full border border-border text-ink-soft hover:border-teal hover:text-teal transition-colors"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
