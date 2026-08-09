import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Digy handles your files and data.",
};

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy">
      <p>Last updated: August 2026</p>

      <h2>Your files</h2>
      <p>
        Every tool on Digy processes files entirely within your own browser,
        using standard browser APIs. The images or documents you use with
        these tools are never uploaded, transmitted to, or stored on any
        server operated by Digy or anyone else. When you close or refresh
        the page, the file and any result are gone.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        Digy displays advertising served by Google AdSense. Google and its
        partners may use cookies and similar technologies to serve ads based
        on your visits to this and other sites, and to measure ad
        performance. You can learn more about how Google uses this data, and
        adjust your ad personalization settings, at{" "}
        <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer">
          Google&apos;s Ad Settings
        </a>. Third-party vendors, including Google, may also use cookies to
        serve ads based on a user&apos;s prior visits to this website or other
        websites.
      </p>

      <h2>Analytics</h2>
      <p>
        Digy may use privacy-conscious analytics to understand overall site
        traffic and which tools are used, such as page views and general
        location at a country or city level. This data is aggregated and is
        not linked to the files you process with any tool.
      </p>

      <h2>Data we don&apos;t collect</h2>
      <p>
        Digy does not require an account, does not ask for your name or
        email to use any tool, and does not store the images, PDFs, or other
        files you process on this site.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Digy is not directed at children under 13 and does not knowingly
        collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        This policy may be updated as tools are added or requirements
        change. Continued use of the site after changes are posted means you
        accept the revised policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </PageShell>
  );
}
