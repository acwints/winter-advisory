'use client';

import { useEffect, useState } from 'react';

interface LinkedInPost {
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

export default function LinkedInTicker({ posts: initialPosts }: { posts: LinkedInPost[] }) {
    const [mounted, setMounted] = useState(false);
    const [posts, setPosts] = useState<LinkedInPost[]>(initialPosts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setMounted(true);
        refreshPosts();
    }, []);

    const refreshPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/linkedin-posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load LinkedIn posts');
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    if (!mounted) return null;

    if (loading && posts.length === 0) {
        return (
            <div className="w-full py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#0a66c2] mb-4">Trade Action</h2>
                    <div className="text-gray-300">Loading posts...</div>
                </div>
            </div>
        );
    }

    if (error && posts.length === 0) {
        return (
            <div className="w-full py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#0a66c2] mb-4">Trade Action</h2>
                    <div className="text-red-400">{error}</div>
                    <button 
                        onClick={refreshPosts}
                        className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0a66c2]">Trade Action</h2>
            </div>
            <div className="relative w-full overflow-hidden bg-white/5 backdrop-blur-sm">
                <div className="animate-scroll-x flex whitespace-nowrap gap-8 py-8 px-4">
                    {[...posts, ...posts].map((post, index) => (
                        <div
                            key={`${post.postUrl}-${index}`}
                            onClick={() => window.open(post.postUrl, '_blank')}
                            className="inline-flex flex-col w-[400px] h-[400px] bg-white/10 backdrop-blur-sm rounded-xl p-8 
                                     hover:bg-white/15 transition-all cursor-pointer shrink-0
                                     border border-white/10 hover:border-white/20"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
                                    {imageError[post.postUrl] ? (
                                        <span className="text-white font-semibold text-xl">
                                            {getInitials(post.firstName, post.lastName)}
                                        </span>
                                    ) : (
                                        <img
                                            src={post.profileImgUrl}
                                            alt={`${post.firstName} ${post.lastName}`}
                                            className="w-full h-full object-cover"
                                            onError={() => setImageError(prev => ({ ...prev, [post.postUrl]: true }))}
                                            referrerPolicy="origin"
                                            crossOrigin="anonymous"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-white text-xl truncate">{`${post.firstName} ${post.lastName}`}</h3>
                                    <p className="text-base text-gray-300 truncate">{post.title}</p>
                                </div>
                            </div>
                            <div className="text-gray-100 mb-8 line-clamp-6 whitespace-normal text-base leading-relaxed flex-grow overflow-hidden">
                                {post.textContent}
                            </div>
                            <div className="flex gap-6 text-sm text-gray-300 mt-auto pt-4 border-t border-white/10">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                    </svg>
                                    {post.likeCount}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    {post.commentCount}
                                </span>
                                <span className="ml-auto">
                                    {new Date(post.postTimestamp).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}