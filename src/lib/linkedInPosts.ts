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
        const credentials = {
            type: 'service_account',
            project_id: 'winter-advisory',
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.GOOGLE_CLIENT_EMAIL || '')}`
        };

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        
        console.log('Attempting to fetch from sheet:', process.env.GOOGLE_SHEET_LINKEDIN_ID);
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_LINKEDIN_ID,
            range: 'Sheet1!A2:P1000',
        });

        const rows = response.data.values;
        console.log(`Fetched ${rows?.length || 0} rows from spreadsheet`);
        
        if (!rows) {
            console.error('No rows returned from spreadsheet');
            return [];
        }

        return rows.map((row) => ({
            postUrl: row[0] || '',
            profileUrl: row[1] || '',
            firstName: row[2] || '',
            lastName: row[3] || '',
            title: row[5] || '',
            profileImgUrl: row[6] || '',
            likeCount: parseInt(row[7]) || 0,
            commentCount: parseInt(row[8]) || 0,
            postDate: row[10] || '',
            postTimestamp: row[11] || '',
            textContent: row[12] || ''
        }));
    } catch (error: any) {
        console.error('Error fetching LinkedIn posts:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        return [];
    }
} 