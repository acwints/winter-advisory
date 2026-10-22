import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://www.winteradvisory.ai/6am/privacy'

export const metadata: Metadata = {
  title: '6AM Privacy Policy | Winter Advisory',
  description: 'How 6AM handles on-device Apple Health data, account information, and your privacy choices.',
  alternates: { canonical: url },
  openGraph: { title: '6AM Privacy Policy', description: 'Health data stays on your iPhone. Learn about account sync and your privacy choices.', url, type: 'website' },
}

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="text-sm">Effective October 21, 2026</p>
      <p>This policy explains how Winter Advisory handles information in the 6AM iPhone and Apple Watch app and when you contact us for 6AM support. An account and an active trial or subscription are required to use the app.</p>

      <section>
        <h2>Apple Health stays on your iPhone</h2>
        <p>With your permission, 6AM reads Sleep Analysis data from Apple Health to calculate recorded sleep duration, stage breakdowns, wake-time trends, and a SixAM sleep score. The calculations happen on your iPhone. The app does not upload Health samples or derived sleep insights to Winter Advisory or its hosting providers, and it does not write to or modify Apple Health data. You can revoke access in Apple Health settings at any time.</p>
      </section>
      <section>
        <h2>Local wake notifications</h2>
        <p>Your wake preference and recurring weekday notification schedule are stored locally on your iPhone. Apple manages delivery and forwarding to a paired Watch. Notifications do not contain Health data, and scheduled wake taps do not depend on an account or an internet connection.</p>
      </section>
      <section>
        <h2>Local weather</h2>
        <p>If you choose to use local weather, 6AM requests your location only while the app is open. Coordinates are rounded to two decimal places and sent directly to MET Norway for a forecast. MET Norway also receives your IP address and logs requests under its own privacy practices. Forecast responses are cached on your device. 6AM does not track your location in the background or add it to your account.</p>
      </section>
      <section>
        <h2>Subscriptions</h2>
        <p>Apple processes in-app payments. RevenueCat manages subscription access, purchase restoration, and subscription reporting. RevenueCat receives your 6AM account identifier, purchase and renewal records, product identifiers, subscription status, and technical information such as app version, operating-system version, and storefront. Your 6AM account name, email, Apple Health data, derived sleep insights, and location are not sent to RevenueCat. We do not receive your payment-card details. Learn more in <a href="https://www.revenuecat.com/privacy/">RevenueCat’s privacy policy</a>.</p>
        <p className="mt-4">Subscriptions are linked to your App Store purchase history and RevenueCat’s anonymous identifier, separately from an 6AM account. Deleting your 6AM account does not cancel an App Store subscription or automatically erase purchase records kept by Apple or RevenueCat. Manage subscriptions in App Store settings, or contact us for help with purchase-data requests and applicable retention requirements.</p>
      </section>
      <section>
        <h2>Account information</h2>
        <p>When you sign in with Apple, the account service stores:</p>
        <ul>
          <li>Your Apple sign-in identifier, account identifier, and the name and email address Apple provides, including a private relay email if you choose Hide My Email.</li>
          <li>Authentication records needed to manage your session and revoke Apple authorization when you delete the account. Your app session token is stored in the iPhone Keychain; the server stores a hash of that token and an encrypted Apple refresh token.</li>
          <li>Your wake preference, time zone, app installation identifier, app and operating-system versions, reported notification status, and scheduling or disabling events with timestamps.</li>
        </ul>
        <p className="mt-4">We use this information to provide sign-in, account management, preference sync, troubleshooting, and service reliability. Scheduling events describe app operations; they are not measurements of when you slept or woke, or proof that a notification was delivered.</p>
      </section>
      <section>
        <h2>Service providers and sharing</h2>
        <p>Apple provides Sign in with Apple, Health access, in-app purchases, system alarms, and notification services. RevenueCat provides subscription management, and MET Norway provides weather forecasts. Railway hosts the 6AM account service and database. These providers process information needed to operate their services. Hosting infrastructure may also process IP addresses and request metadata to deliver and secure network requests. Our service records operational errors and request identifiers for troubleshooting.</p>
        <p className="mt-4">6AM does not show advertising, include advertising SDKs, sell personal information, or track you across other companies’ apps and websites. RevenueCat reporting is limited to subscription operations and revenue; your Health data remains on your iPhone. We may disclose information where required by law or necessary to address fraud, security incidents, or threats to people’s rights. The public support pages are hosted on Vercel; visiting them sends ordinary web-request information to that hosting service.</p>
      </section>
      <section>
        <h2>Retention and account deletion</h2>
        <p>Account, preference, installation, and operational event records remain in the account database until the account is deleted. Signing out ends that session but does not delete the account. Removing the app does not delete server records.</p>
        <p className="mt-4">To delete your account, open 6AM → Settings → Delete Account (or Account → Delete Account during onboarding) while online. Once deletion succeeds, the service revokes the stored Apple authorization and removes your account and associated sessions, preferences, installations, and event records from the active database. If deletion fails, the app shows an error so you can retry or contact support.</p>
        <p className="mt-4">Account deletion does not erase Apple Health records or turn off wake notifications already scheduled on your iPhone. Turn off wake taps separately in the app. Provider logs and any backup copies are separate from active account records and may remain until their configured retention periods expire. Contact us for help with deletion or questions about retained information.</p>
      </section>
      <section>
        <h2>Support and your choices</h2>
        <p>If you email us, we receive your email address and the information you choose to include. We use that correspondence to answer your request and keep a record of the support provided. Please do not send private Health exports, passwords, or sign-in codes.</p>
        <p className="mt-4">You can turn wake taps off, revoke Health or notification permissions, manage subscriptions, and delete your account. Account management and alarm shutoff remain available before subscribing or after access expires. Contact <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20privacy">andrew@winteradvisory.llc</a> to request access, correction, or deletion of information we hold about you. We may need to verify that the request concerns your own account. Applicable privacy rights depend on where you live.</p>
      </section>
      <section>
        <h2>Children and policy updates</h2>
        <p>6AM is not directed to children under 13, and we do not knowingly collect account information from them. Contact us if you believe a child has provided personal information. We will update this page and its effective date when our practices change.</p>
      </section>
      <p>For setup and deletion help, visit <Link href="/6am/support">6AM Support</Link>.</p>
    </>
  )
}
