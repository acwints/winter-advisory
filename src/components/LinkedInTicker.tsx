'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    const [posts] = useState<LinkedInPost[]>(initialPosts);
    const [imageError, setImageError] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    function getInitials(firstName: string, lastName: string): import("react").ReactNode {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="w-full py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0a66c2]">Trade Action</h2>
            </div>
            <div className="relative w-full overflow-hidden">
                <div 
                    className="flex animate-scroll whitespace-nowrap"
                    style={{
                        width: `${posts.length * 416}px`, // 400px card + 16px gap
                    }}
                >
                    {posts.map((post, index) => (
                        <div
                            key={`${post.postUrl}-${index}`}
                            onClick={() => window.open(post.postUrl, '_blank')}
                            className="inline-flex flex-col w-[400px] h-[400px] bg-white/10 backdrop-blur-sm rounded-xl p-8 
                                     hover:bg-white/15 transition-all cursor-pointer shrink-0 mx-2
                                     border border-white/10 hover:border-white/20"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
                                    {(!post.profileImgUrl || imageError[post.postUrl]) ? (
                                        <span className="text-white font-semibold text-xl">
                                            {getInitials(post.firstName, post.lastName)}
                                        </span>
                                    ) : (
                                        <Image
                                            src={post.profileImgUrl.replace('amp;', '')}
                                            alt={`${post.firstName} ${post.lastName}`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                            onError={() => setImageError(prev => ({ ...prev, [post.postUrl]: true }))}
                                            referrerPolicy="no-referrer"
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