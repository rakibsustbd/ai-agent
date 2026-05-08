import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Command Center | AI-Powered SME Growth",
  description: "Deploy elite AI agents to handle your SME's most critical tasks. ROI-focused, state-of-the-art automation on retainer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antigravity-scroll-lock">
        <div className="mesh-bg" />
        {children}
      </body>
    </html>
  );
}
