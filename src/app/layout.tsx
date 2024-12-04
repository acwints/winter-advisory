import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Winter Advisory | Boutique Consulting Firm",
  description: "Expert consulting services tailored to your business needs. Winter Advisory helps organizations achieve their strategic goals through innovative solutions.",
  icons: {
    icon: '/favicon.svg',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
};

// Add security headers
export const headers = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://js.stripe.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' https://js.stripe.com;
    frame-src 'self' https://calendly.com;
    connect-src 'self' https://calendly.com;
  `.replace(/\s+/g, ' ').trim(),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth dark ${spaceGrotesk.variable}`}>
      <body 
        className="bg-gray-900 text-gray-100 antialiased" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
