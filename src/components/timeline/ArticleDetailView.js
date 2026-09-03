"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../Footer";
import PixelButton from "../PixelButton";
import PixelAvatar from "../PixelAvatar";

export default function ArticleDetailView({
    post,
    author,
    authorLevel,
    user,
    otherPostsByAuthor,
    onBack,
    onSelectOtherPost,
    onLike,
    onSendReply,
    onDeleteComment,
    onCopyLink,
    copiedId,
    replyText,
    setReplyText,
    getDefaultBanner,
}) {
    return (
        <div className="bg-[#080d1a] min-h-screen text-white flex flex-col font-sans selection:bg-yellow-400 selection:text-black">

            {/* TOP COMPACT BAR: TOMBOL KEMBALI & BREADCRUMB */}
            <div className="bg-[#0b1222] border-b-4 border-retro-black sticky top-0 z-50 px-4 md:px-8 py-3 shadow-md">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="font-pixel text-[9px] md:text-[10px] bg-[#121c2e] hover:bg-[#1a2840] text-yellow-300 hover:text-white border-2 border-retro-black px-3.5 py-1.5 rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] transition-all flex items-center gap-2"
                    >
                        <span>◀</span>
                        <span>BACK TO TIMELINE</span>
                    </button>

                    {/* Breadcrumb Info */}
                    <div className="flex items-center gap-2 font-pixel text-[8px] text-gray-400 truncate">
                        <span>GUILD CODEX</span>
                        <span>/</span>
                        <span className="text-pixel-green uppercase">{post.category || "TECH"}</span>
                        <span>/</span>
                        <span className="text-gray-300 truncate hidden sm:inline">{post.title}</span>
                    </div>
                </div>
            </div>

            {/* CONTAINER DUA KOLOM */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* KOLOM KIRI (75%): KONTEN ARTIKEL & KOMENTAR */}
                <div className="lg:col-span-8 flex flex-col gap-6 text-left">

                    {/* Breadcrumb Tags */}
                    <div className="flex items-center gap-2 font-pixel text-[8px]">
                        <span className="text-gray-400">Project Tutorials /</span>
                        <span className="bg-[#121c2e] text-yellow-300 border border-retro-black px-2.5 py-1 rounded">
                            {post.category || "TECH"}
                        </span>
                        <span className="bg-[#121c2e] text-pixel-green border border-retro-black px-2.5 py-1 rounded">
                            {post.level || "INTERMEDIATE"}
                        </span>
                    </div>

                    {/* Banner Gambar Besar */}
                    <div className="relative h-64 md:h-80 w-full border-4 border-retro-black rounded-2xl overflow-hidden bg-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src={post.image || getDefaultBanner(post.content)}
                            alt={post.title || "Article Banner"}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-black/30" />
                    </div>

                    {/* Judul & Meta */}
                    <div className="flex flex-col gap-2">
                        <h1 className="font-pixel text-xl md:text-2xl text-white leading-snug">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-3 font-sans text-xs text-gray-400 pb-2 border-b border-gray-800">
                            <span className="text-yellow-300 font-bold">{author.name}</span>
                            <span>•</span>
                            <span>{post.readTime || "6 min read"}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                        </div>
                    </div>

                    {/* Toolbar Like & Share */}
                    <div className="flex items-center justify-between py-3 border-b-2 border-gray-800/80 my-2 select-none">
                        <div className="flex items-center gap-2.5">

                            {/* 1. PIXEL HEART (LIKE) */}
                            <button
                                type="button"
                                onClick={() => onLike(post.id)}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${post.isLiked
                                        ? "bg-red-950/40 border-red-500 text-red-400 font-bold"
                                        : "bg-[#0f172a] hover:bg-[#182338] border-gray-700 text-gray-300 hover:text-white"
                                    }`}
                            >
                                {/* 8-Bit Stepped Pixel Heart SVG */}
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                    <path d="M2 3h3v2H2zM5 2h2v1H5zM7 3h2v2H7zM9 2h2v1H9zM11 3h3v2h-3zM1 5h1v4H1zM14 5h1v4h-1zM2 9h2v2H2zM12 9h2v2h-2zM4 11h2v2H4zM10 11h2v2h-2zM6 13h4v2H6z" />
                                </svg>
                                <span className="font-pixel text-[9px]">{post.likes}</span>
                            </button>

                            {/* 2. PIXEL SPEECH BUBBLE (COMMENTS) */}
                            <a
                                href="#comments"
                                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 bg-[#0f172a] hover:bg-[#182338] border-gray-700 text-gray-300 hover:text-yellow-300 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
                            >
                                {/* 8-Bit Stepped Pixel Comment Bubble */}
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                    <path d="M2 2h12v9H6v3H4v-3H2V2zm2 2v5h8V4H4z" />
                                </svg>
                                <span className="font-pixel text-[9px]">{post.comments.length}</span>
                            </a>

                            {/* 4. PIXEL SHARE (FORWARD ARROW) */}
                            <button
                                type="button"
                                onClick={() => onCopyLink(post.id)}
                                className="flex items-center justify-center px-3 py-1.5 rounded-xl border-2 bg-[#0f172a] hover:bg-[#182338] border-gray-700 text-gray-300 hover:text-pixel-green transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
                                title="Share broadcast link"
                            >
                                {/* 8-Bit Stepped Pixel Share Arrow */}
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                    <path d="M9 2l5 5-5 5v-3H3V6h6V2zm2 3.8v-1.6L13.8 7 11 9.8V8.2H5V5.8h6z" />
                                </svg>
                            </button>

                        </div>

                        {/* Status Salin Tautan */}
                        {copiedId === post.id && (
                            <span className="font-pixel text-[7.5px] text-pixel-green animate-pulse">
                                ✓ LINK COPIED TO CLIPBOARD
                            </span>
                        )}
                    </div>

                    {/* Prerequisites Box */}
                    <div className="bg-[#0f172a] border-2 border-retro-black rounded-xl p-4 flex flex-col gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <div className="grid grid-cols-3 gap-2 font-sans text-xs">
                            <span className="font-pixel text-[8px] text-gray-400 uppercase">PREREQUISITES</span>
                            <span className="col-span-2 text-gray-200">{post.prerequisites}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 font-sans text-xs border-t border-gray-800 pt-2">
                            <span className="font-pixel text-[8px] text-gray-400 uppercase">TARGET DIVISION</span>
                            <span className="col-span-2 text-yellow-300 font-mono">Invention 2026 &amp; Gemastik</span>
                        </div>
                    </div>

                    {/* Isi Narasi */}
                    <div className="flex flex-col gap-4">
                        <h2 className="font-pixel text-sm text-yellow-300">// # Introduction &amp; Concept</h2>
                        <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                            {post.content}
                        </p>

                        {/* Code Snippet */}
                        {post.codeSnippet && (
                            <div className="bg-[#050912] border-2 border-retro-black rounded-xl p-4 font-mono text-xs text-pixel-green shadow-inner overflow-x-auto">
                                <span className="font-pixel text-[7.5px] text-gray-500 block mb-2">// TERMINAL EXECUTION SNIPPET</span>
                                <pre className="whitespace-pre">{post.codeSnippet}</pre>
                            </div>
                        )}
                    </div>

                    {/* SEKSI KOMENTAR */}
                    <section className="border-t-2 border-gray-800 pt-8 flex flex-col gap-6 mt-4">
                        <h3 className="font-pixel text-xs text-pixel-green uppercase">
              // DISCUSSION THREAD ({post.comments.length})
                        </h3>

                        {/* Input Komentar jika login */}
                        {user ? (
                            <div className="bg-[#0f172a] border-2 border-retro-black rounded-xl p-4 flex flex-col gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <span className="font-pixel text-[8px] text-yellow-300">Replying as {user.name} ({user.role})</span>
                                <textarea
                                    rows={3}
                                    placeholder="Share your thoughts, suggestions, or recruitment inquiries..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="w-full font-sans text-xs p-3 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 placeholder-gray-400 rounded-lg resize-none"
                                />
                                <div className="flex justify-end">
                                    <PixelButton
                                        variant="green"
                                        onClick={() => onSendReply(post.id)}
                                        className="py-2 px-5 text-[8.5px]"
                                    >
                                        POST COMMENT ➔
                                    </PixelButton>
                                </div>
                            </div>
                        ) : (
                            /* Banner Wajib Login */
                            <div className="bg-[#0f172a] border-2 border-yellow-400/80 rounded-xl p-5 text-center flex flex-col items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-xl">🔒</span>
                                <p className="font-pixel text-[9px] text-yellow-300">AUTHENTICATION REQUIRED TO COMMENT</p>
                                <p className="font-sans text-xs text-gray-300 max-w-md">
                                    You must be logged into your guild student character to post comments, send replies, or like broadcasts.
                                </p>
                                <Link href="/register" className="mt-2">
                                    <PixelButton variant="secondary" className="py-2 px-6 text-[8px]">
                                        REGISTER OR LOGIN ✦
                                    </PixelButton>
                                </Link>
                            </div>
                        )}

                        {/* Daftar Komentar */}
                        <div className="flex flex-col gap-3">
                            {post.comments.length === 0 ? (
                                <p className="font-sans text-xs text-gray-400 text-center py-6">
                                    No comments in this thread yet. Be the first to start the discussion!
                                </p>
                            ) : (
                                post.comments.map((comment, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#0f172a] border-2 border-retro-black rounded-xl p-4 flex flex-col gap-2 relative group hover:border-yellow-400/60 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-pixel text-[8.5px] text-yellow-300 font-bold">
                                                    {comment.author}
                                                </span>
                                                {comment.role && (
                                                    <span className="font-sans text-[10px] text-gray-400">
                                                        • {comment.role}
                                                    </span>
                                                )}
                                                <span className="font-sans text-[10px] text-gray-500">
                                                    • {comment.timestamp || "Recent"}
                                                </span>
                                            </div>

                                            {user && (comment.author_id === user.user_id || comment.name === user.name || post.author_id === user.user_id || user.role === "Admin") && (
                                                <button
                                                    type="button"
                                                    onClick={() => onDeleteComment(post.id, idx)}
                                                    className="font-pixel text-[7px] text-red-400 hover:text-white bg-red-950/40 hover:bg-red-600 border border-red-500/40 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                                                >
                                                    ✕ DEL
                                                </button>
                                            )}
                                        </div>

                                        <p className="font-sans text-xs text-gray-200 leading-relaxed pl-1">
                                            {comment.text}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                </div>

                {/* KOLOM KANAN (25%): SIDEBAR AUTHOR & MORE POSTS */}
                <aside className="lg:col-span-4 flex flex-col gap-6 text-left sticky top-20">

                    {/* Kartu Profil Penulis */}
                    <div className="bg-[#0f172a] border-4 border-retro-black rounded-2xl p-6 flex flex-col gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center gap-3.5">
                            <div className="w-14 h-14 bg-retro-black border-2 border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                                <PixelAvatar role={author.role} size="w-full h-full" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-pixel text-xs text-white font-bold truncate">{author.name}</h3>
                                <p className="font-sans text-[11px] text-yellow-300 font-bold">{author.role}</p>
                                <p className="font-pixel text-[7.5px] text-pixel-green mt-0.5">LV.{authorLevel} GUILD MEMBER</p>
                            </div>
                        </div>

                        <p className="font-sans text-xs text-gray-300 leading-relaxed border-t border-gray-800 pt-3">
                            {author.bio || "Student software developer and active guild participant building production-grade projects."}
                        </p>

                        <div className="flex flex-col gap-2 pt-1 font-sans text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                                <span>💼</span>
                                <span>{author.major || "Computer Science"} Major</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📍</span>
                                <span>Indonesia IT Community</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-800">
                            <PixelButton variant="green" className="w-full py-2 text-[8px]">
                                + RECRUIT TO PARTY
                            </PixelButton>
                            <Link href="/showcase">
                                <PixelButton variant="secondary" className="w-full py-2 text-[8px]">
                                    VIEW PORTFOLIO
                                </PixelButton>
                            </Link>
                        </div>
                    </div>

                    {/* Widget: More by Author */}
                    {otherPostsByAuthor.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <h4 className="font-pixel text-[8.5px] text-yellow-300 uppercase">
                // MORE BY {author.name.toUpperCase()}
                            </h4>

                            <div className="flex flex-col gap-3">
                                {otherPostsByAuthor.map((otherPost) => (
                                    <div
                                        key={otherPost.id}
                                        onClick={() => onSelectOtherPost(otherPost)}
                                        className="bg-[#0f172a] border-2 border-retro-black rounded-xl p-3 flex gap-3 items-center hover:border-yellow-400 cursor-pointer transition-colors shadow-sm"
                                    >
                                        <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-retro-black shrink-0 border border-gray-700">
                                            <Image
                                                src={otherPost.image || getDefaultBanner(otherPost.content)}
                                                alt={otherPost.title || "Related Article"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 text-left">
                                            <span className="font-pixel text-[7px] text-pixel-green">{otherPost.category}</span>
                                            <p className="font-sans text-xs text-white font-bold truncate leading-tight mt-0.5">
                                                {otherPost.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </aside>

            </main>

            <Footer />
        </div>
    );
}