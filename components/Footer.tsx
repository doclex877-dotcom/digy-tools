import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[13px] text-ink-soft">
          © {new Date().getFullYear()} Digy. Free tools, no uploads, nothing leaves your browser.
        </p>
        <nav className="flex gap-6 text-[13px] text-ink-soft">
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
