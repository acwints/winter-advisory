import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './ai-adoption-default/essay.module.css';
export const metadata: Metadata = {
  title: 'Writing | Andrew Winter',
  description: 'Andrew Winter on work, AI, and building things.',
  alternates: { canonical: 'https://www.winteradvisory.ai/writing' },
};
export default function Writing() {
  return <main className={styles.essay} data-theme="winter-essay">
    <header className={styles.header}><Link href="/" className={styles.wordmark}>WINTER ADVISORY</Link><Link href="/contact">Contact</Link></header>
    <div className={styles.hero}><h1>Writing</h1><p className={styles.dek}>A few things I’m thinking through.</p></div>
    <section className={styles.prose}><p><time dateTime="2026-10-27">October 27, 2026</time></p><h2><Link href="/writing/ai-adoption-default">AI adoption and the upskilling default</Link></h2><p>AI adoption, employee upskilling, and why changing the training default doesn’t settle who benefits or what pays off.</p><p><Link href="/writing/ai-adoption-default">Read the essay</Link></p></section>
    <footer className={styles.footer}><Link href="/">Winter Advisory</Link></footer>
  </main>;
}
