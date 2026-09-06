import type { Metadata } from 'next'
import Link from 'next/link'

const url = 'https://www.winteradvisory.ai/6am/support'

export const metadata: Metadata = {
  title: '6AM Support | Winter Advisory',
  description: 'Set up weekday wake taps, connect Apple Health, troubleshoot Watch notifications, or delete your 6AM account.',
  alternates: { canonical: url },
  openGraph: { title: '6AM Support', description: 'Help for the 6AM iPhone and Apple Watch app.', url, type: 'website' },
}

export default function SupportPage() {
  return (
    <>
      <h1>6AM Support</h1>
      <p>Help with your weekday wake sequence, Apple Health insights, and optional account. Email <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a> for assistance.</p>
      <section>
        <h2>Turn on weekday wake taps</h2>
        <p>Open 6AM on iPhone and tap Turn On Wake Taps. Allow notifications, sounds, and Time Sensitive Notifications. The app schedules one notification per minute from 5:55 through 6:05 a.m., Monday through Friday, in your local time zone. There are eleven notifications each weekday.</p>
      </section>
      <section>
        <h2>Receive taps on Apple Watch</h2>
        <p>Wear your charged, unlocked Watch and keep the paired iPhone locked. In the Watch app on iPhone, confirm that 6AM notifications mirror your iPhone. The Watch’s “Check wake taps on iPhone” message is setup guidance; open the iPhone app to check its schedule.</p>
        <p className="mt-4">If a tap does not arrive, check 6AM’s notification settings, Watch connection, and your active Focus settings. Allow Time Sensitive notifications through the Focus you use overnight. Apple controls forwarding, haptics, and whether the Watch display wakes. Test your own setup before relying on it, and keep a separate alarm for important wake-ups.</p>
      </section>
      <section>
        <h2>Connect Apple Health</h2>
        <p>Open Insights on iPhone and choose Connect Apple Health, then allow read access to Sleep. Insights use qualifying overnight sessions in Apple Health; short naps or missing sleep records may not produce a wake time. Check Health’s sleep records if the dashboard is empty or a time looks unexpected. Calculations stay on your iPhone.</p>
      </section>
      <section>
        <h2>Offline use and sign-in issues</h2>
        <p>Local wake taps and Health insights do not require an account. A sequence already scheduled on the iPhone does not depend on an internet connection. Account sign-in, sync, and deletion require connectivity. If account restoration fails after an outage, reconnect and close and reopen 6AM. Contact support if the problem continues.</p>
      </section>
      <section>
        <h2>Delete your account or turn off taps</h2>
        <p>While online and signed in, open 6AM → Settings → Delete Account and confirm. Wait for success; if an error appears, retry while online or email support. Successful deletion removes the account and its associated active server records. Uninstalling or signing out does not delete the account.</p>
        <p className="mt-4">Account deletion leaves Apple Health records and the local wake schedule unchanged. To stop the schedule, use Turn Off Wake Taps in the app. You can separately revoke Health access or notification permissions in Apple’s settings.</p>
      </section>
      <section>
        <h2>Contact us</h2>
        <p>Email <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a> with the app version, iPhone and Watch models, operating-system versions, what you expected, and what happened. For missed taps, include the time zone and Focus settings. Do not send Health exports, passwords, or Apple sign-in codes.</p>
      </section>
      <p>Read the <Link href="/6am/privacy">Privacy Policy</Link> and <Link href="/6am/terms">Terms of Use</Link>.</p>
    </>
  )
}
