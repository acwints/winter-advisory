import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gennies Nation Support | Winter Advisory',
  description: 'Help with Generals scores, favorite teams, campus events, videos and university-store shopping.',
  alternates: { canonical: 'https://www.winteradvisory.ai/gennies/support' },
}

export default function SupportPage() {
  return <>
    <h1>Gennies Nation Support</h1>
    <p>An independent iPhone companion for the Generals community. Email <a href="mailto:andrew@winteradvisory.llc?subject=Gennies%20Nation%20support">andrew@winteradvisory.llc</a> for help.</p>
    <section><h2>Teams, results and schedules</h2><p>Open Teams from Today or Scores, then select a team for its current-season Results and Schedule. Tap a star to follow that team. Favorites stay on your iPhone; no account is required. Pull down to refresh. Official schedules remain the source for changes and cancellations.</p></section>
    <section><h2>News, videos and events</h2><p>News shows The Columns headlines. Choose Videos inside News for the university’s latest uploads. Playback requires a connection and starts when you press play. If a video cannot play in the app, choose Watch on YouTube. Calendar shows the current month’s public campus feed and upcoming athletics. Open an event to view its details or add an individual event using Apple’s calendar editor.</p></section>
    <section><h2>Shopping and your bag</h2><p>The university store handles inventory, final prices, checkout, payment, delivery and returns. Gennies Nation displays the merchant’s products and confirmed cart. Select the available options before adding an item. If an add is uncertain, check your bag before trying again. The merchant may expire cart sessions. For an order or refund, contact the university store through <a href="https://store.wlu.edu/home">its website</a>; do not send payment details to app support.</p></section>
    <section><h2>Offline use and source changes</h2><p>Downloaded and bundled feed snapshots remain readable offline. Photos, videos, shopping and linked pages need a connection. A failed refresh retains the previous successful feed. Public feed formats and schedules may change independently of the app.</p></section>
    <section><h2>Contact and privacy</h2><p>Include the app version, iPhone model, iOS version, affected team or product, and what happened. Do not send passwords, sign-in codes or card details. Read the <Link href="/gennies/privacy">Privacy Policy</Link> for local storage and third-party services.</p></section>
    <p>Gennies Nation is not affiliated with, sponsored by, or endorsed by Washington and Lee University.</p>
  </>
}
