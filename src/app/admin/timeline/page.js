"use client";

import React, { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { useLanguage } from "@/utils/lang";

export default function AdminTimeline() {
    const { lang } = useLanguage();
    const [posts, setPosts] = useState([]);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    const loadPosts = () => {
        if (typeof window !== "undefined") {
            const localPosts = localStorage.getItem("timelinePosts");
            if (localPosts) {
                try {
                    setPosts(JSON.parse(localPosts));
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleDeletePost = (postId, postTitle) => {
        setConfirmModal({
            isOpen: true,
            title: "PURGE TIMELINE POST",
            message: `Hapus siaran linimasa "${postTitle || postId}" dari feed publik?`,
            onConfirm: () => {
                const updated = posts.filter((p) => p.id !== postId);
                setPosts(updated);
                localStorage.setItem("timelinePosts", JSON.stringify(updated));
                setConfirmModal((prev) => ({ ...prev, isOpen: false }));
            },
        });
    };

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0c1322] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-retro-black pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider block mb-1">
            // PUBLIC BROADCAST MODERATION
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-yellow-300">
                        [ MODERASI LINIMASA &amp; POSTINGAN ]
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-[#121b2d] border-2 border-retro-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green">
                        FEED ITEMS: {posts.length} PUBLISHED
                    </span>
                </div>
            </div>

            {/* Roster Postingan Linimasa */}
            <div className="bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 text-left">
                <span className="font-pixel text-[8.5px] text-yellow-400 uppercase border-b-2 border-gray-700/80 pb-2">
          // SIARAN KOMUNITAS AKTIF ({posts.length})
                </span>

                <div className="flex flex-col gap-3">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-[#18233a] border-2 border-retro-black p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                        >
                            <div className="flex flex-col gap-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-pixel text-[7.5px] bg-[#121b2d] text-yellow-300 border border-retro-black px-2 py-0.5 rounded">
                                        {post.category || "TECH"}
                                    </span>
                                    <h3 className="font-pixel text-xs text-white font-bold truncate">{post.title || "Untitled Sprint"}</h3>
                                    <span className="font-sans text-[10px] text-gray-400">• {post.timestamp}</span>
                                </div>
                                <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed">{post.content}</p>
                                <div className="flex items-center gap-3 font-pixel text-[7px] text-gray-400 mt-1">
                                    <span>♥ {post.likes || 0} LIKES</span>
                                    <span>💬 {(post.comments || []).length} REPLIES</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDeletePost(post.id, post.title)}
                                className="font-pixel text-[8px] py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-retro-black rounded-lg cursor-pointer shadow-sm shrink-0"
                            >
                                PURGE POST ✗
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText="PURGE"
                cancelText="CANCEL"
                variant="danger"
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
            />

        </div>
    );
}