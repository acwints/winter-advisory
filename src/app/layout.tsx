import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "Winter Advisory | Boutique Consulting Firm",
  description: "Expert consulting services tailored to your business needs. Winter Advisory helps organizations achieve their strategic goals through innovative solutions.",
  icons: {
    icon: '/favicon.svg',
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`bg-gray-900 text-gray-100 ${spaceGrotesk.className}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
