export default function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-[28px] font-semibold tracking-tight text-ink mb-8">{title}</h1>
      <div className="prose-content text-[15px] text-ink-soft leading-relaxed space-y-5 [&_h2]:text-ink [&_h2]:text-[16px] [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-2 [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
