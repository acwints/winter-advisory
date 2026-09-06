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
      <p className="text-sm">Effective September 6, 2026</p>
      <p>6AM is provided by Winter Advisory. These terms describe the app’s intended use and account services.</p>
      <section>
        <h2>Your App Store license</h2>
        <p>For copies obtained through the App Store, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard Licensed Application End User License Agreement</a> applies unless a custom license is supplied with the app. This page does not replace that license or limit consumer rights that cannot be excluded under applicable law.</p>
      </section>
      <section>
        <h2>Wake taps and sleep insights</h2>
        <p>6AM schedules eleven weekday notifications from 5:55 through 6:05 a.m. and can display wake-time trends calculated from Apple Health sleep records. It is a wellness and routine tool, not a medical device, emergency service, or guaranteed alarm.</p>
        <p className="mt-4">Delivery, haptics, and display wake depend on Apple’s operating systems, notification permissions, Focus settings, battery, connectivity between your devices, and how your Watch is worn. Use a separate dependable alarm when missing a wake-up would have serious consequences. Sleep insights depend on the completeness and accuracy of the records in Apple Health and are not medical advice.</p>
      </section>
      <section>
        <h2>Optional accounts and responsible use</h2>
        <p>An account is optional for local wake taps and sleep insights. If you sign in, use your own Apple account and protect access to your devices. Do not use the account service to access someone else’s information, bypass security, or disrupt the service. Account features require network access and may be unavailable during outages or maintenance.</p>
      </section>
      <section>
        <h2>Privacy and leaving the service</h2>
        <p>The <Link href="/6am/privacy">Privacy Policy</Link> explains on-device Health processing and the information used for optional account sync. You can stop using 6AM at any time. Turn off wake taps in the app and use Settings → Delete Account to remove your optional account. Signing out or uninstalling the app does not delete server account records.</p>
      </section>
      <section>
        <h2>Changes and support</h2>
        <p>Features and these terms may change as 6AM develops. Updated terms will appear here with a new effective date. For setup, account, or service questions, visit <Link href="/6am/support">6AM Support</Link> or email <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a>.</p>
      </section>
    </>
  )
}
