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
      <p>Help with your weekday wake sequence, Apple Health insights, and account. Email <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a> for assistance.</p>
      <section>
        <h2>Set up the weekday wake sequence</h2>
        <p>Open Wake in 6AM on iPhone and choose Set up wake sequence or turn on the weekday alarm. The system alarm requires iOS 26 or later. Allow Alarms, notification sounds, and Time Sensitive notifications. Monday through Friday, 6AM schedules five taps, one per minute from 5:55 through 5:59 a.m., followed by a real system alarm at 6:00 a.m. in your local time zone. There are no taps at or after 6:00.</p>
      </section>
      <section>
        <h2>Receive taps on Apple Watch</h2>
        <p>Wear your charged, unlocked Watch and keep the paired iPhone locked. In the Watch app on iPhone, confirm that 6AM notifications mirror your iPhone. The Watch companion directs you to iPhone for setup; check the schedule in the iPhone app.</p>
        <p className="mt-4">If a tap does not arrive, check 6AM’s notification settings, Watch connection, and your active Focus settings. Allow Time Sensitive notifications through the Focus you use overnight. Apple controls forwarding, haptics, and whether the Watch display wakes. Test your own setup before relying on it, and keep a separate alarm for important wake-ups.</p>
      </section>
      <section>
        <h2>Connect Apple Health</h2>
        <p>Open Analytics on iPhone and choose Connect Apple Health, then allow read access to Sleep. Analytics use qualifying overnight sessions in Apple Health; short naps or missing sleep records may not produce a wake time. Check Health’s sleep records if the dashboard is empty or a time looks unexpected. Calculations stay on your iPhone. Sleep analytics show recorded time asleep, REM/Core/Deep stages when available, a nightly timeline, duration history, and a default SixAM score. The score is our wellness estimate based on duration, recorded continuity, and wake-time regularity, not Apple’s Sleep Score or a medical assessment; open How your score works for the calculation. In-bed-only records cannot provide actual sleep duration or a score. Missing score components are excluded rather than scored zero. Membership includes sleep and wake analytics: average wake time, consistency, earliest and latest wakes, daily trends, distribution, and 30-, 90-, and 180-day views.</p>
      </section>
      <section>
        <h2>6AM Plus and restore purchases</h2>
        <p>Create an account using Sign in with Apple, then start a trial or subscription to use the app, including analytics. The US base prices are $2.99 monthly or $19.99 yearly, with a seven-day trial on either plan when eligible. The App Store shows your localized price and eligibility before purchase. Returning active subscribers can sign in and restore without repeating a trial. Use Settings → Restore purchases to recover access, or manage and cancel subscriptions in App Store settings. Expired access does not cancel an already scheduled alarm.</p>
      </section>
      <section>
        <h2>Quote and local weather</h2>
        <p>The morning briefing includes a daily quote and a forecast based on MET Norway data. Choose Use my location to allow approximate location while using the app. No background location tracking is used. If location is denied, open Location settings from Settings. Weather needs connectivity; the quote remains available if weather cannot load. Automatic briefings appear on enabled weekdays between 6 a.m. and noon when membership access is available.</p>
      </section>
      <section>
        <h2>Offline use and sign-in issues</h2>
        <p>An account and verified active membership are required. Previously verified accounts and unexpired membership can be used offline. A sequence already scheduled on the iPhone does not depend on an internet connection. Weather, purchase/restore verification, and account sign-in, saving preferences, and deletion require connectivity. If account restoration fails after an outage, reconnect and close and reopen 6AM. Contact support if the problem continues.</p>
      </section>
      <section>
        <h2>Delete your account or turn off the sequence</h2>
        <p>While online and signed in, open 6AM → Settings → Delete Account (or Account → Delete Account during onboarding) and confirm. Wait for success; if an error appears, retry while online or email support. Successful deletion removes the account and its associated active server records. Uninstalling or signing out does not delete the account.</p>
        <p className="mt-4">Account deletion leaves Apple Health records and the local wake schedule unchanged. To stop the schedule, turn off the weekday alarm in Wake or use Turn off weekday alarm on the account or membership screen. Wait for confirmation that it is off. If 6AM reports that the system alarm could not be removed, retry; cancellation is retried when you reopen the app. You can separately revoke Health access or notification permissions in Apple’s settings. Deleting the account does not cancel a subscription; manage subscriptions in the App Store.</p>
      </section>
      <section>
        <h2>Contact us</h2>
        <p>Email <a href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a> with the app version, iPhone and Watch models, operating-system versions, what you expected, and what happened. For missed taps, include the time zone and Focus settings. Do not send Health exports, passwords, or Apple sign-in codes.</p>
      </section>
      <p>Read the <Link href="/6am/privacy">Privacy Policy</Link> and <Link href="/6am/terms">Terms of Use</Link>.</p>
    </>
  )
}
