import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.renss.top"),
  title: {
    default: "Ren Sishuo | AI Solutions Engineer",
    template: "%s | Ren Sishuo",
  },
  description:
    "AI solutions engineer in Guangzhou building deployable agent workflows, enterprise AI platforms and intelligent automation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ren Sishuo — AI Solutions Engineer",
    title: "Ren Sishuo | AI Solutions Engineer",
    description:
      "Enterprise Agent systems, AI platform engineering and intelligent automation built around real business constraints.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Ren Sishuo AI Solutions Engineer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ren Sishuo | AI Solutions Engineer",
    description:
      "Enterprise Agent systems, AI platform engineering and intelligent automation.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
