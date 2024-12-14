import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function GET() {
    try {
        if (!process.env.GOOGLE_SHEET_LINKEDIN_ID) {
            throw new Error('LinkedIn Google Sheet ID not configured');
        }

        const range = 'Sheet1!A2:P'; // Assuming headers are in row 1
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_LINKEDIN_ID,
            range,
        });

        const rows = response.data.values || [];
        
        const posts = rows.map(row => ({
            postUrl: row[0],
            profileUrl: row[1],
            firstName: row[2],
            lastName: row[3],
            fullName: row[4],
            title: row[5],
            profileImgUrl: row[6],
            likeCount: parseInt(row[7]) || 0,
            commentCount: parseInt(row[8]) || 0,
            connectionDegree: row[9],
            postDate: row[10],
            postTimestamp: row[11],
            textContent: row[12],
            query: row[13],
            category: row[14],
            timestamp: row[15],
        }));

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch LinkedIn posts' }, 
            { status: 500 }
        );
    }
} 