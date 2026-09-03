"use client";

import React from "react";
import Image from "next/image";
import PixelAvatar from "../PixelAvatar";

export default function TimelineCard({
    post,
    author,
    authorLevel,
    currentUser,
    onSelectPost,
    onDeletePost,
    getDefaultBanner,
}) {
    return (
        <div
            onClick={() => onSelectPost(post)}
            className="bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 overflow-hidden flex flex-col justify-between transition-all duration-200 text-left cursor-pointer group hover:-translate-y-1 select-none"
        >
            <div>
                {/* Banner Gambar Kartu */}
                <div className="relative h-40 w-full border-b-4 border-retro-black bg-retro-black overflow-hidden">
                    <Image
                        src={post.image || getDefaultBanner(post.content)}
                        alt={post.title || "Timeline Post Banner"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                        <span className="font-pixel text-[7.5px] bg-[#121b2d]/90 text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded font-bold">
                            {post.category || "TECH"}
                        </span>
                    </div>

                    {/* Tombol Hapus Postingan (Hanya untuk Pemilik Post yang Sudah Login / Admin) */}
                    {currentUser && (post.author_id === currentUser.user_id || currentUser.role === "Admin") && (
                        <button
                            type="button"
                            onClick={(e) => onDeletePost(post.id, e)}
                            className="absolute top-2.5 right-2.5 z-20 font-pixel text-[7px] bg-red-900/80 hover:bg-red-600 text-white border border-retro-black px-2 py-0.5 rounded cursor-pointer transition-colors shadow-sm"
                            title="Delete broadcast"
                        >
                            ✕ DEL
                        </button>
                    )}
                </div>

                {/* Isi Teks Kartu */}
                <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-pixel text-xs text-white leading-snug font-bold group-hover:text-yellow-300 transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-3">
                        {post.content}
                    </p>
                </div>
            </div>

            {/* Footer Penulis & Metrik Piksel */}
            <div className="p-4 pt-0">
                <div className="border-t border-gray-700/80 pt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 bg-retro-black border border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                            <PixelAvatar role={author.role} size="w-full h-full" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-pixel text-[8px] text-white font-bold truncate">{author.name}</p>
                            <p className="font-sans text-[9px] text-gray-400 truncate">LV.{authorLevel} • {post.readTime || "5m"}</p>
                        </div>
                    </div>

                    {/* Ikon Metrik Piksel */}
                    <div className="flex items-center gap-2.5 font-pixel text-[8px] text-gray-400">
                        {/* Heart */}
                        <span className="flex items-center gap-1 text-red-400">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
                                <path d="M2 3h3v2H2zM5 2h2v1H5zM7 3h2v2H7zM9 2h2v1H9zM11 3h3v2h-3zM1 5h1v4H1zM14 5h1v4h-1zM2 9h2v2H2zM12 9h2v2h-2zM4 11h2v2H4zM10 11h2v2h-2zM6 13h4v2H6z" />
                            </svg>
                            {post.likes}
                        </span>

                        {/* Comment */}
                        <span className="flex items-center gap-1 text-yellow-300">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
                                <path d="M2 2h12v9H6v3H4v-3H2V2zm2 2v5h8V4H4z" />
                            </svg>
                            {post.comments.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}