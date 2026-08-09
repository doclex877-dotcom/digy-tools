import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://digy.cash"),
  title: {
    default: "Digy — Free Image Tools, No Uploads Required",
    template: "%s — Digy",
  },
  description:
    "Fast, free image tools that run entirely in your browser. Compress, convert, resize and prepare images with nothing ever uploaded to a server.",
  openGraph: {
    title: "Digy — Free Image Tools, No Uploads Required",
    description:
      "Fast, free image tools that run entirely in your browser. Nothing you upload ever leaves your device.",
    url: "https://digy.cash",
    siteName: "Digy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
