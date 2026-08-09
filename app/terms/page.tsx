import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using Digy's tools.",
};

export default function TermsPage() {
  return (
    <PageShell title="Terms of Use">
      <p>Last updated: August 2026</p>

      <h2>Using Digy</h2>
      <p>
        Digy provides free browser-based tools for working with images and
        documents. By using this site, you agree to use it lawfully and not
        to attempt to disrupt, reverse engineer for malicious purposes, or
        abuse the service.
      </p>

      <h2>No warranty</h2>
      <p>
        Digy&apos;s tools are provided &quot;as is,&quot; without warranty of
        any kind. While every tool is built to work reliably, Digy does not
        guarantee uninterrupted availability or that results will be
        error-free for every file or device. You&apos;re responsible for
        keeping your own backup of any original file before processing it.
      </p>

      <h2>Your content</h2>
      <p>
        You retain all rights to any file you use with Digy&apos;s tools.
        Since processing happens locally in your browser, Digy never
        receives, stores, or claims any right to your files.
      </p>

      <h2>Advertising</h2>
      <p>
        Digy is supported by advertising, including ads served through
        Google AdSense. Ads are provided by third parties, and Digy is not
        responsible for the content of advertisements shown on the site.
      </p>

      <h2>Changes to the service</h2>
      <p>
        Tools may be added, changed, or removed at any time without notice.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </PageShell>
  );
}
