import { NextResponse } from 'next/server'
import { InquiryError, readInquiry, submitInquiry } from '@/server/inquiry'
import type { Inquiry } from '@/server/inquiry'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const inquiry = await readInquiry(req)
    await submitInquiry(inquiry, process.env, { fetch, appendSheet })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof InquiryError ? error.message : 'Failed to send message' },
      { status: error instanceof InquiryError ? error.status : 500 }
    )
  }
}

async function appendSheet(inquiry: Inquiry) {
  const { name, email, company, website, role, priority, timeline, message,
    sourcePath, referrer, utmSource, utmMedium, utmCampaign, scoreSummary } = inquiry
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    throw new InquiryError('Contact form is not configured', 503)
  }

  const { google } = await import('googleapis')

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Contact!A:R',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        name,
        email,
        company,
        website || '',
        role || '',
        '', // retired column (commerce stack) — kept so sheet layout stays aligned
        '', // retired column (order volume)
        priority || '',
        '', // retired column (pilot KPI)
        timeline || '',
        message,
        sourcePath || '',
        referrer || '',
        utmSource || '',
        utmMedium || '',
        utmCampaign || '',
        scoreSummary || '',
        new Date().toISOString(),
      ]],
    },
  })

}
