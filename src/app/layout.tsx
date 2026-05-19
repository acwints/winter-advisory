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
  metadataBase: new URL('https://winteradvisory.llc'),
  title: "Winter Advisory | AI Deployment for Ecommerce Brands",
  description: "Winter Advisory helps Shopify and DTC ecommerce teams deploy practical AI workflows across lifecycle marketing, CX, merchandising, analytics, and operations.",
  keywords: [
    'ecommerce AI consulting',
    'Shopify AI consulting',
    'AI deployment lead',
    'DTC AI automation',
    'Klaviyo AI workflow',
    'Gorgias AI automation',
  ],
  openGraph: {
    title: 'Winter Advisory | AI Deployment for Ecommerce Brands',
    description: 'Practical AI deployment advisory for ecommerce teams running Shopify, Klaviyo, CX, analytics, and operations workflows.',
    url: 'https://winteradvisory.llc',
    siteName: 'Winter Advisory',
    type: 'website',
  },
  alternates: {
    canonical: 'https://winteradvisory.llc',
  },
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
