"use client";

import React from "react";

// Gambarkan 3 Karakter Role AKun 8-Bit Kustom (Hacker, Hipster, Hustler)
export default function PixelAvatar({ role, size = "w-24 h-24" }) {
    const currentRole = role?.toLowerCase() || "hacker";

    return (
        <svg
            viewBox="0 0 16 16"
            className={`${size} transition-transform duration-300 hover:scale-105`}
            style={{ imageRendering: "pixelated" }}
            fill="currentColor"
        >
            {/* 1. KELAS HACKER: Penyihir Jubah Hijau Neon (The Code Mage) */}
            {currentRole === "hacker" && (
                <>
                    {/* Kulit Muka */}
                    <rect x="6" y="5" width="4" height="4" fill="#fed7aa" />
                    {/* Mata Biru Kacamata Coding */}
                    <rect x="6" y="6" width="1" height="1" fill="#3b82f6" />
                    <rect x="9" y="6" width="1" height="1" fill="#3b82f6" />
                    {/* Jubah Penyihir Hijau & Topi */}
                    <path d="M5 4h6v1H5zm1-1h4v1H6zm1-1h2v1H7zm-3 6h8v6H4z" className="text-pixel-green" />
                    {/* Tali Pinggang */}
                    <rect x="4" y="11" width="8" height="1" className="text-retro-black" />
                    <rect x="7" y="11" width="2" height="1" fill="#eab308" />
                </>
            )}

            {/* 2. KELAS HIPSTER: Karakter Artistik dengan Syal & Headset (The Visualist) */}
            {currentRole === "hipster" && (
                <>
                    {/* Kulit Muka */}
                    <rect x="6" y="5" width="4" height="4" fill="#fbcfe8" />
                    {/* Rambut Gaul Cokelat */}
                    <path d="M5 3h6v2H5zm0 2h1v2H5zm5 0h1v2h-1z" fill="#78350f" />
                    {/* Headset Musik Pink */}
                    <rect x="4" y="5" width="1" height="3" fill="#ec4899" />
                    <rect x="11" y="4" width="1" height="3" fill="#ec4899" />
                    <rect x="5" y="3" width="6" height="1" fill="#ec4899" />
                    {/* Syal Biru & Baju Navy */}
                    <path d="M4 9h8v6H4z" className="text-navy-blue" />
                    <rect x="5" y="9" width="6" height="1" fill="#06b6d4" />
                </>
            )}

            {/* 3. KELAS HUSTLER: Ksatria Baju Besi Emas & Mahkota (The Leader) */}
            {currentRole === "hustler" && (
                <>
                    {/* Kulit Muka */}
                    <rect x="6" y="5" width="4" height="4" fill="#ffedd5" />
                    {/* Mata Hitam Tegas */}
                    <rect x="6" y="6" width="1" height="1" className="text-retro-black" />
                    <rect x="9" y="6" width="1" height="1" className="text-retro-black" />
                    {/* Mahkota Emas Pemberi Misi */}
                    <path d="M5 3h6v1H5zm0 1h1v1H5zm4 0h1v1h-1zm-2 0h1v1H7z" fill="#eab308" />
                    {/* Baju Armor Silver */}
                    <path d="M4 9h8v6H4z" fill="#cbd5e1" />
                    {/* Logo Guild Merah di Dada */}
                    <rect x="7" y="11" width="2" height="2" fill="#ef4444" />
                </>
            )}

            {/* 4. DEFAULT/ADMIN: Mahkota Merah & Jubah Hitam Dewa */}
            {currentRole === "admin" && (
                <>
                    <rect x="6" y="5" width="4" height="4" fill="#ffedd5" />
                    {/* Kacamata Hitam Boss */}
                    <rect x="5" y="6" width="6" height="1" className="text-retro-black" />
                    <path d="M4 9h8v6H4z" className="text-retro-black" />
                    <path d="M5 3h6v1H5zm1-1h4v1H6z" fill="#ef4444" />
                </>
            )}
        </svg>
    );
}