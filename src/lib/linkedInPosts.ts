import { google } from 'googleapis';

export interface LinkedInPost {
    postUrl: string;
    profileUrl: string;
    firstName: string;
    lastName: string;
    title: string;
    profileImgUrl: string;
    likeCount: number;
    commentCount: number;
    postDate: string;
    postTimestamp: string;
    textContent: string;
}

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_LINKEDIN_ID,
            range: 'Sheet1!A2:P1000', // Updated to handle up to 1000 rows
        });

        const rows = response.data.values;
        console.log(`Fetched ${rows?.length || 0} rows from spreadsheet`);
        
        if (!rows) {
            return [];
        }

        return rows.map((row) => ({
            postUrl: row[0] || '',
            profileUrl: row[1] || '',
            firstName: row[2] || '',
            lastName: row[3] || '',
            title: row[5] || '', // Skipping fullName, using title from column F
            profileImgUrl: row[6] || '',
            likeCount: parseInt(row[7]) || 0,
            commentCount: parseInt(row[8]) || 0,
            postDate: row[10] || '', // Updated index for postDate
            postTimestamp: row[11] || '', // Updated index for postTimestamp
            textContent: row[12] || '' // Updated index for textContent
        }));
    } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
        return [];
    }
} 