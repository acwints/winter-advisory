import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://www.winteradvisory.ai/6am/terms'

export const metadata: Metadata = {
  title: '6AM Terms of Use | Winter Advisory',
  description: 'License information, wake-notification limitations, account choices, and support for 6AM.',
  alternates: { canonical: url },
  openGraph: { title: '6AM Terms of Use', description: 'License information and practical terms for using 6AM.', url, type: 'website' },
}

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Use</h1>
      <p className="text-sm">Effective October 21, 2026</p>
      <p>6AM is provided by Winter Advisory. These terms describe the app’s intended use and account services.</p>
      <section>
        <h2>Your App Store license</h2>
        <p>For copies obtained through the App Store, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard Licensed Application End User License Agreement</a> applies unless a custom license is supplied with the app. This page does not replace that license or limit consumer rights that cannot be excluded under applicable law.</p>
      </section>
      <section>
        <h2>Wake taps and sleep insights</h2>
        <p>6AM schedules five weekday wake taps from 5:55 through 5:59 a.m., followed by a system alarm at 6:00 a.m. on iOS 26 or later, and can display wake-time trends calculated from Apple Health sleep records. It is a wellness and routine tool, not a medical device, emergency service, or guaranteed alarm.</p>
        <p className="mt-4">Delivery, haptics, and display wake depend on Apple’s operating systems, notification permissions, Focus settings, battery, connectivity between your devices, and how your Watch is worn. Use a separate dependable alarm when missing a wake-up would have serious consequences. Sleep insights depend on the completeness and accuracy of the records in Apple Health and are not medical advice.</p>
      </section>
      <section>
        <h2>6AM Plus subscriptions</h2>
        <p>An account and an active 6AM Plus trial or subscription are required for the wake sequence, morning briefing, and analytics. Monthly and annual plans offer a seven-day introductory free trial to eligible Apple Accounts. Returning subscribers can sign in and restore an active subscription. Available plans, localized prices, billing periods, and any eligible introductory trial are shown before purchase. Apple charges the Apple Account used for your purchase. Subscriptions renew automatically unless canceled at least 24 hours before the current period ends. If a free trial is offered, cancel at least 24 hours before it ends to avoid the subscription charge.</p>
        <p className="mt-4">Manage or cancel your subscription in App Store account settings. Use Restore purchases in 6AM to recover an active subscription purchased with the same Apple Account. Deleting the app or a 6AM account does not cancel your subscription. Billing access changes do not automatically cancel an already scheduled alarm; you can turn the wake sequence off in the app. Refund requests are handled by Apple, subject to applicable consumer rights.</p>
      </section>
      <section>
        <h2>Accounts and responsible use</h2>
        <p>Sign in with Apple is required. Use your own Apple account and protect access to your devices. Do not use the account service to access someone else’s information, bypass security, or disrupt the service. Account features require network access and may be unavailable during outages or maintenance.</p>
      </section>
      <section>
        <h2>Privacy and leaving the service</h2>
        <p>The <Link href="/6am/privacy">Privacy Policy</Link> explains on-device Health processing and the information used for account services. You can stop using 6AM at any time. Turn off wake taps in the app and use Settings → Delete Account to remove your account. Signing out or uninstalling the app does not delete server account records.</p>
      </section>
      <section>
        <h2>Changes and support</h2>
        <p>Features and these terms may change as 6AM develops. Updated terms will appear here with a new effective date. For setup, account, or service questions, visit <Link href="/6am/support">6AM Support</Link> or email <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a>.</p>
      </section>
    </>
  )
}
