"use client";

import React from "react";

export default function PixelAvatar({ role, size = "w-24 h-24" }) {
    const r = role?.toLowerCase() || "";

    // Pemetaan langsung 10 peran baru ke 4 visual karakter utama
    let category = "coder";
    if (r.includes("designer") || r.includes("researcher")) {
        category = "designer"; // Karakter Pink (Ranger/Artist)
    } else if (r.includes("manager") || r.includes("master")) {
        category = "manager"; // Karakter Emas (Knight/Leader)
    } else if (r.includes("qa") || r.includes("quality") || r.includes("devops") || r.includes("infrastructure")) {
        category = "guardian"; // Karakter Biru Baja (Guardian/DevOps)
    } else if (r.includes("admin")) {
        category = "admin";
    }

    return (
        <svg
            viewBox="0 0 16 16"
            className={`${size} transition-transform duration-300 hover:scale-105`}
            style={{ imageRendering: "pixelated" }}
            fill="currentColor"
        >
            {/* 1. CODER CHARACTER (Jubah Hijau) */}
            {category === "coder" && (
                <>
                    <rect x="6" y="5" width="4" height="4" fill="#fed7aa" />
                    <rect x="6" y="6" width="1" height="1" fill="#3b82f6" />
                    <rect x="9" y="6" width="1" height="1" fill="#3b82f6" />
                    <path d="M5 4h6v1H5zm1-1h4v1H6zm1-1h2v1H7zm-3 6h8v6H4z" className="text-pixel-green" />
                    <rect x="4" y="11" width="8" height="1" className="text-retro-black" />
                    <rect x="7" y="11" width="2" height="1" fill="#eab308" />
                </>
            )}

            {/* 2. DESIGNER CHARACTER (Ranger Pink) */}
            {category === "designer" && (
                <>
                    <rect x="6" y="5" width="4" height="4" fill="#fbcfe8" />
                    <path d="M5 3h6v2H5zm0 2h1v2H5zm5 0h1v2h-1z" fill="#78350f" />
                    <rect x="4" y="5" width="1" height="3" fill="#ec4899" />
                    <rect x="11" y="4" width="1" height="3" fill="#ec4899" />
                    <rect x="5" y="3" width="6" height="1" fill="#ec4899" />
                    <path d="M4 9h8v6H4z" className="text-navy-blue" />
                    <rect x="5" y="9" width="6" height="1" fill="#06b6d4" />
                </>
            )}

            {/* 3. MANAGER CHARACTER (Ksatria Emas) */}
            {category === "manager" && (
                <>
                    <rect x="6" y="5" width="4" height="4" fill="#ffedd5" />
                    <rect x="6" y="6" width="1" height="1" className="text-retro-black" />
                    <rect x="9" y="6" width="1" height="1" className="text-retro-black" />
                    <path d="M5 3h6v1H5zm0 1h1v1H5zm4 0h1v1h-1zm-2 0h1v1H7z" fill="#eab308" />
                    <path d="M4 9h8v6H4z" fill="#cbd5e1" />
                    <rect x="7" y="11" width="2" height="2" fill="#ef4444" />
                </>
            )}

            {/* 4. GUARDIAN CHARACTER (Biru Baja) */}
            {category === "guardian" && (
                <>
                    <rect x="6" y="5" width="4" height="4" fill="#ffedd5" />
                    <path d="M5 4h6v1H5zm1-1h4v1H6z" fill="#475569" />
                    <path d="M4 9h8v6H4z" fill="#1e3a8a" />
                    <rect x="7" y="10" width="2" height="3" fill="#eab308" />
                </>
            )}

            {/* 5. ADMIN CHARACTER (Jubah Hitam Dewa) */}
            {category === "admin" && (
                <>
                    <rect x="6" y="5" width="4" height="4" fill="#ffedd5" />
                    <rect x="5" y="6" width="6" height="1" className="text-retro-black" />
                    <path d="M4 9h8v6H4z" className="text-retro-black" />
                    <path d="M5 3h6v1H5zm1-1h4v1H6z" fill="#ef4444" />
                </>
            )}
        </svg>
    );
}