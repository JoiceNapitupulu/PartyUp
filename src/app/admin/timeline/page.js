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
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0a140f] min-h-screen selection:bg-pixel-green selection:text-[#0E2A22]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-pixel-green/20 pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8px] text-pixel-green/80 uppercase tracking-wider block mb-1.5">
                        // PUBLIC BROADCAST MODERATION
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-white">
                        MODERASI LINIMASA &amp; POSTINGAN
                    </h1>
                    <p className="font-sans text-xs text-gray-400 mt-1.5">
                        {lang === "ID"
                            ? "Tinjau dan hapus siaran komunitas yang melanggar aturan feed publik."
                            : "Review and remove community broadcasts that violate public feed rules."}
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 border border-pixel-green/40 bg-pixel-green/5 px-3.5 py-1.5 rounded-lg shrink-0">
                    <span className="w-2 h-2 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green whitespace-nowrap">
                        FEED ITEMS: {posts.length} PUBLISHED
                    </span>
                </div>
            </div>

            {/* Roster Postingan Linimasa */}
            <div className="bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_40px_-15px_rgba(34,197,94,0.4)] flex flex-col gap-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pixel-green/20 pb-3">
                    <span className="font-pixel text-[8.5px] text-pixel-green uppercase">
                        // SIARAN KOMUNITAS AKTIF
                    </span>
                    <span className="font-pixel text-[7.5px] text-gray-400 whitespace-nowrap">
                        FEED COUNT: {posts.length} POST
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-[#0a140f] border border-pixel-green/20 hover:border-pixel-green/45 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                            >
                                <div className="flex flex-col gap-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-pixel text-[7.5px] bg-pixel-green/10 text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded">
                                            {post.category || "TECH"}
                                        </span>
                                        <h3 className="font-pixel text-xs text-white font-bold truncate">{post.title || "Untitled Sprint"}</h3>
                                        <span className="font-sans text-[10px] text-gray-500">• {post.timestamp}</span>
                                    </div>
                                    <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed">{post.content}</p>
                                    <div className="flex items-center gap-3 font-pixel text-[7px] text-gray-500 mt-1">
                                        <span>♥ {post.likes || 0} LIKES</span>
                                        <span>💬 {(post.comments || []).length} REPLIES</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleDeletePost(post.id, post.title)}
                                    className="font-pixel text-[8px] py-1.5 px-3 bg-red-600/90 hover:bg-red-600 text-white font-bold border border-red-500/60 rounded-lg cursor-pointer shrink-0 transition-colors"
                                >
                                    PURGE POST ✗
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center font-pixel text-xs text-gray-500">
                            BELUM ADA SIARAN LINIMASA YANG TERCATAT.
                        </div>
                    )}
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