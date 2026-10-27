import type { Metadata, Viewport } from 'next';
import Essay from './Essay';
const url = 'https://www.winteradvisory.ai/writing/ai-adoption-default';
const title = 'AI adoption and the upskilling default';
const description = 'Andrew Winter on AI adoption, employee upskilling, and why changing the training default doesn’t settle who benefits or what pays off.';
export const metadata: Metadata = {
  title: `${title} | Andrew Winter`, description,
  authors: [{ name: 'Andrew Winter' }],
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title, description, url, type: 'article', publishedTime: '2026-10-27T12:00:00-07:00', authors: ['Andrew Winter'], images: [{ url: 'https://www.winteradvisory.ai/images/ai-upskilling/builders.webp', width: 1536, height: 1024, alt: 'A narrow technical gate becomes a wider opening to build with AI.' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['https://www.winteradvisory.ai/images/ai-upskilling/builders.webp'] },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5 };
export default function Page() { return <Essay />; }
