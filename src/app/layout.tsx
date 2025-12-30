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
  title: "Winter Advisory | AI Consulting",
  description: "We help companies with AI. From strategy to implementation, Winter Advisory partners with organizations to unlock the full potential of artificial intelligence.",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
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
        className="bg-gray-900 text-gray-100 antialiased" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
