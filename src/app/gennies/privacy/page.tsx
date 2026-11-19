import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gennies Nation Privacy Policy | Winter Advisory',
  description: 'How Gennies Nation handles local favorites, public feeds, YouTube playback, store checkout and support requests.',
  alternates: { canonical: 'https://www.winteradvisory.ai/gennies/privacy' },
}

export default function PrivacyPage() {
  return <>
    <h1>Privacy Policy</h1>
    <p>Effective November 19, 2026</p>
    <p>This policy describes Gennies Nation, an independent iPhone app provided by Andrew Winter / Winter Advisory. The app does not require an account, operate a user database, or include app analytics, advertising SDKs or cross-app tracking code.</p>
    <section><h2>Information on your iPhone</h2><p>Favorite teams and downloaded feed snapshots are stored locally. The app does not upload your favorites to us. A backup of saved favorites can help recover from damaged local data. iOS may include ordinary app preferences in device backups according to your settings. Cached feed files can be removed by iOS.</p></section>
    <section><h2>Public university sources</h2><p>When the app loads scores, news, schedules, images or campus events, your device connects directly to the relevant university or athletics website. Those services receive ordinary connection information, including your IP address, request URL and technical request headers, under their own privacy practices. Opening a linked page also connects you to its publisher.</p></section>
    <section><h2>YouTube videos</h2><p>The app loads the official university channel’s feed and thumbnails and uses YouTube’s privacy-enhanced player. Playback starts with your action. YouTube may show ads and process connection, device and playback information. Its privacy-enhanced mode does not mean that playback is anonymous. See <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a>. Choose whether to play a video or open YouTube; no YouTube account is required by Gennies Nation.</p></section>
    <section><h2>University-store shopping</h2><p>Shopping requests go directly to the university store. The app displays merchant-confirmed options, quantities and totals. Two cart-session cookies for store.wlu.edu are retained in the iPhone’s protected, device-only Keychain to restore your bag after relaunch. Other merchant website information remains in WebKit’s website storage. The merchant can expire its session.</p><p>The merchant and its checkout providers collect the details you supply to sign in, place an order, pay, ship or request a return. We do not receive your payment-card details or maintain an order database. The merchant controls its own retention, order records and privacy practices. Review its notices at <a href="https://store.wlu.edu/home">the university store</a> before checking out.</p></section>
    <section><h2>Calendar</h2><p>If you choose to add an event, Apple’s event editor lets you review, edit, save or cancel it. The app does not read your existing calendar events or upload your calendar to us. Saved events remain in the calendar account you choose.</p></section>
    <section><h2>Support, retention and your choices</h2><p>If you email support, we receive your email address and the information you choose to include. We use that correspondence to respond and retain it as needed to resolve your request and maintain a support record. Do not send passwords, verification codes or payment information.</p><p>You can remove favorite teams in the app. Removing the app deletes ordinary local app storage; iOS may retain Keychain entries separately. Ask support if you need help with local merchant-session information. Removing Gennies Nation does not delete orders, accounts or data held by the store, Google, university websites or your calendar provider; contact the relevant service for those requests.</p><p>Email <a href="mailto:andrew@winteradvisory.llc?subject=Gennies%20Nation%20privacy">andrew@winteradvisory.llc</a> to request access, correction or deletion of information we hold from support correspondence. We may need to verify the request. Rights vary by location.</p></section>
    <section><h2>Policy and website</h2><p>These support pages are hosted on Vercel, which processes ordinary web-request information to deliver and secure them. This policy will be updated when the app’s practices change. Gennies Nation is not directed to children under 13; contact us if you believe a child has provided personal information to app support.</p></section>
    <p>Visit <Link href="/gennies/support">Gennies Nation Support</Link> for app help.</p>
  </>
}
