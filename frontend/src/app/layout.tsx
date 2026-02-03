import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Ask Al",
  description: "Ask Allen, our friendly assistant, anything",
};

const themeScript = `
(function() {
  const stored = localStorage.getItem('shaped-agent-theme');
  const theme = stored === 'dark' || stored === 'light' ? stored : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<Record<string, string>>;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
