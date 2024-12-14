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
    textContent: string;
}

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
    try {
        const response = await fetch('/api/linkedin-posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
        return [];
    }
} 