import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const microgramma = localFont({
  src: [
    {
      path: '../fonts/microgrammanormal.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-microgramma',
  display: 'block',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Winter Advisory | AI Strategy, Systems, and Operator Enablement",
  description: "Winter Advisory helps leadership teams turn AI ambition into operating advantage through strategy, workflow automation, implementation advisory, and enablement.",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#05070a' },
    { media: '(prefers-color-scheme: dark)', color: '#05070a' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth dark ${spaceGrotesk.variable} ${microgramma.variable}`}>
      <body 
        className="bg-[#05070a] text-slate-100 antialiased" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
