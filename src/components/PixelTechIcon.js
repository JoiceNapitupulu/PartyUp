"use client";

import React from "react";

export default function PixelTechIcon({ tech, size = "w-4 h-4" }) {
    const name = tech?.toLowerCase().trim() || "";

    // === 1. FRONTIER LANGUAGES ===

    // JAVASCRIPT (Kotak Kuning JS)
    if (name === "javascript" || name === "js") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-yellow-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" />
                <path d="M7 10h1.5v1.5H7zm3 0h1.5v1.5H10zm0-1.5h1.5V10H10z" fill="black" />
            </svg>
        );
    }

    // 1. FIGMA (F Warna-warni - Memantul/Bounce saat hover)
    if (name === "figma") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:-translate-y-1 transition-transform duration-300`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                {/* Lingkaran Merah atas kiri */}
                <path d="M5 3h3v3H5zm0 3h3v3H5z" fill="#f24e1e" />
                {/* Lingkaran Orange atas kanan */}
                <path d="M8 3h3v3H8z" fill="#ff7262" />
                {/* Lingkaran Ungu tengah */}
                <path d="M8 6h3v3H8z" fill="#a259ff" />
                {/* Bentuk daun biru bawah kiri */}
                <path d="M5 9h3v3H5z" fill="#1abc9c" />
                {/* Bentuk bulat hijau bawah kanan */}
                <path d="M8 9h3v3H8z" fill="#0acf83" />
            </svg>
        );
    }

    // 2. GOLANG / GO (Gopher Biru Muda - Memantul/Bounce)
    if (name === "go" || name === "golang") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-400 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="4" y="3" width="8" height="10" rx="3" />
                {/* Gigi kelinci */}
                <rect x="7" y="9" width="2" height="2" fill="white" />
                {/* Mata besar */}
                <rect x="5" y="5" width="2" height="2" fill="white" />
                <rect x="9" y="5" width="2" height="2" fill="white" />
                <rect x="5.5" y="5.5" width="1" height="1" fill="black" />
                <rect x="9.5" y="5.5" width="1" height="1" fill="black" />
            </svg>
        );
    }

    // 3. UI/UX (Layout Monitor & Wireframe Pink - Berdenyut/Pulse)
    if (name === "ui/ux" || name === "ui" || name === "ux") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-pink-500 hover:scale-110 transition-transform duration-300`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                {/* Kerangka Layar Monitor */}
                <rect x="2" y="2" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Desain grid layout di dalam layar */}
                <rect x="4" y="5" width="3" height="4" />
                <rect x="9" y="5" width="3" height="2" />
                <rect x="9" y="8" width="3" height="1" />
            </svg>
        );
    }
    
    // TYPESCRIPT (Kotak Biru TS)
    if (name === "typescript" || name === "ts") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" />
                <path d="M5 5h4v1.5H7v4.5H5zm5 0h2v1.5h-1.5v4.5H10v-4.5H8.5V6.5h1.5z" fill="white" />
            </svg>
        );
    }

    // PYTHON (Ular Biru-Kuning)
    if (name === "python" || name === "py") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:scale-125 hover:rotate-6 transition-transform duration-300`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M3 3h7v3H3zm3 3h4v4H6z" fill="#306998" />
                <path d="M6 10h7v3H6zm0-4h4v4H6z" fill="#ffe873" />
                <rect x="4" y="4" width="1" height="1" fill="white" />
                <rect x="11" y="11" width="1" height="1" fill="#306998" />
            </svg>
        );
    }

    // PHP (Konsol Ungu PHP)
    if (name === "php") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-indigo-400 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="4" width="12" height="8" rx="2" />
                <path d="M4 6h2v4H4zm4 0h2v2H8zm4 0h2v4H12z" fill="white" />
            </svg>
        );
    }

    // JAVA (Cangkir Kopi Mengepul)
    if (name === "java") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-500 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M4 10h8v2H4zm-1-1h10v1H3z" fill="#007397" />
                <path d="M5 8h6v2H5z" fill="#ea2d2e" />
                <path d="M6 4h1v3H6zm3 1h1v2H9z" fill="gray" />
            </svg>
        );
    }

    // === 2. FRONTEND FRAMEWORKS ===

    // REACT / REACT NATIVE (Atom Putar)
    if (name === "react" || name === "react native" || name === "reactnative") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-400 hover:rotate-180 transition-transform duration-700 ease-out`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="7" y="7" width="2" height="2" />
                <path d="M4 8c0-3 3-5 4-5s4 2 4 5-3 5-4 5-4-2-4-5z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M8 4c3 0 5 3 5 4s-2 4-5 4-5-3-5-4 2-4 5-4z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        );
    }

    // NEXT.JS (Kapsul N)
    if (name === "next.js" || name === "nextjs") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-black hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="6" />
                <path d="M5 5h1.5v6H5zm5 0h1v6h-1.5z" fill="white" />
                <path d="M6 5.5l3.5 5.5h1l-3.5-5.5z" fill="white" />
            </svg>
        );
    }

    // TAILWIND CSS (Dua Gelombang Biru)
    if (name === "tailwind" || name === "tailwindcss") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-teal-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 8c2-3 4-3 6 0s4 3 6 0" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M2 5c2 3 4 3 6 0s4-3 6 0" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // BOOTSTRAP (Mahkota Ungu B)
    if (name === "bootstrap") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-purple-600 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M5 5h3.5c1 0 1.5.5 1.5 1s-.5 1-1.5 1H5zm0 3h4c1 0 1.5.5 1.5 1s-.5 1-1.5 1H5z" fill="white" />
            </svg>
        );
    }

    // FLUTTER (Burung Sayap Biru)
    if (name === "flutter") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-500 hover:translate-x-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l4 4-4 4-4-4zm4 4l-4 4 4 4zm-4 4l-4 4 4-4z" />
            </svg>
        );
    }

    // HTML (Tameng 5 Orange)
    if (name === "html" || name === "html5") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-orange-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 2l1.5 11h9L14 2zm10 4H6v1.5h6l-.5 3-3.5 1-3.5-1-.2-1.5h1.5l.1.7L8 10l1.9-.5.2-1.5H4.5V4h7.7z" />
            </svg>
        );
    }

    // CSS (Tameng 3 Biru)
    if (name === "css" || name === "css3") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 2l1.5 11h9L14 2zm10 4H6v1.5h6l-.5 3-3.5 1-3.5-1-.2-1.5h1.5l.1.7L8 10l1.9-.5.2-1.5H4.5V4h7.7z" />
            </svg>
        );
    }

    // === 3. BACKEND & WEB FRAMEWORKS ===

    // NODE.JS (Hexagon Hijau)
    if (name === "node.js" || name === "nodejs" || name === "node") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-green-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 3.5v7L8 16 2 12.5v-7z" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="6" y="6" width="4" height="4" />
            </svg>
        );
    }

    // LARAVEL (Perisai Merah L)
    if (name === "laravel") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-600 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 3v7L8 15 2 12V5z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M5 5h2v6h4v2H5z" />
            </svg>
        );
    }

    // NESTJS (Kucing Merah Nest)
    if (name === "nestjs") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 3v6L8 14 2 11V5z" />
                <circle cx="8" cy="8" r="3" fill="white" />
            </svg>
        );
    }

    // FASTAPI (Kilatan Petir Teal)
    if (name === "fastapi") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-teal-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M9 3L4 9h3v3l5-6H9z" fill="white" />
            </svg>
        );
    }

    // GIN (Botol Biru Gin)
    if (name === "gin") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-400 hover:skew-y-6 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M6 3h4v2H6zm-1 3h6v8H5z" />
            </svg>
        );
    }

    // BUN.JS (Roti Imut)
    if (name === "bun.js" || name === "bun") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="4" y="4" width="8" height="8" rx="3" fill="#ffedd5" />
                <circle cx="6" cy="7" r="1" fill="black" />
                <circle cx="10" cy="7" r="1" fill="black" />
                <rect x="5" y="9" width="1" height="1" fill="#f43f5e" />
                <rect x="10" y="9" width="1" height="1" fill="#f43f5e" />
            </svg>
        );
    }

    // === 4. DATABASES & STORAGE ===

    // POSTGRESQL (Gajah Biru)
    if (name === "postgresql" || name === "postgres") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-500 hover:skew-x-6 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M4 3h7v1H4zm-1 1h9v1H3zm-1 1h10v3H2zm1 3h9v1H3zm1 1h7v1H4z" />
                <rect x="12" y="6" width="2" height="2" fill="white" />
            </svg>
        );
    }

    // MYSQL (Lumba-lumba Biru)
    if (name === "mysql") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-600 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M3 6h10v4H3zM2 8h12v2H2zm1 3h10v2H3z" />
            </svg>
        );
    }

    // MONGODB (Daun Hijau Mongo)
    if (name === "mongodb" || name === "mongo") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-emerald-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2c2 3 3 6 1 10h-2c-2-4-1-7 1-10z" />
            </svg>
        );
    }

    // SUPABASE (Petir Hijau-Kuning)
    if (name === "supabase") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-emerald-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M10 2L3 10h5v4l7-8H10z" />
            </svg>
        );
    }

    // REDIS (Tumpukan Database Merah)
    if (name === "redis") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-600 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 3h12v3H2zm0 4h12v3H2zm0 4h12v3H2z" />
            </svg>
        );
    }

    // PRISMA (Segitiga Prisma)
    if (name === "prisma") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-900 hover:rotate-12 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 11H2z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // NEONDB (Petir Neon Hijau)
    if (name === "neondb" || name === "neon") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-lime-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M9 2L4 9h4v5l5-7H9z" />
            </svg>
        );
    }

    // === 5. DEVOPS & TOOLS ===

    // DOCKER (Paus Biru Kontainer)
    if (name === "docker") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-400 hover:translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="5" y="3" width="6" height="4" />
                <path d="M2 8h12v3H2z" />
            </svg>
        );
    }

    // GIT (Cabang Logam Merah)
    if (name === "git") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-500 hover:rotate-45 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="4" r="2" />
                <circle cx="5" cy="12" r="2" />
                <circle cx="11" cy="12" r="2" />
                <path d="M8 6v4m-3 2h6" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // GITHUB (Kucing Hitam Octocat)
    if (name === "github") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-slate-800 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="6" />
                <path d="M6 5l1 2h2l1-2z" fill="white" />
            </svg>
        );
    }

    // LINUX (Penguin Tux)
    if (name === "linux") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-yellow-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M4 12c0-3 3-5 4-5s4 2 4 5H4z" fill="black" />
                <circle cx="8" cy="5" r="2" fill="white" />
                <circle cx="8" cy="5" r="0.5" fill="black" />
            </svg>
        );
    }

    // N8N (Node Konektor Hitam-Hijau)
    if (name === "n8n") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-500 hover:rotate-12 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="4" cy="8" r="2" />
                <circle cx="12" cy="8" r="2" />
                <path d="M6 8h4" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // FIREBASE (Api Orange)
    if (name === "firebase" || name === "firebace") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-amber-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M3 13l5-11 5 11z" />
            </svg>
        );
    }

    // === 6. AI, DATA SCIENCE & TOOLS ===

    // PANDAS (Muka Panda Imut)
    if (name === "pandas") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="3" y="3" width="10" height="10" rx="3" fill="white" stroke="black" strokeWidth="1" />
                <circle cx="6" cy="7" r="1.5" fill="black" />
                <circle cx="10" cy="7" r="1.5" fill="black" />
            </svg>
        );
    }

    // PYTORCH (Logo Api Segitiga)
    if (name === "pytorch") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-orange-600 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 11H2z" />
                <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
        );
    }

    // JUPYTER (Planet Orange Ber-Cincin)
    if (name === "jupyter") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-orange-500 hover:rotate-45 transition-transform duration-500`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="4" />
                <path d="M2 8h12" stroke="white" strokeWidth="2" />
            </svg>
        );
    }

    // SCIKIT-LEARN (Roda Gigi Oranye-Biru)
    if (name === "scikitlearn" || name === "scikit-learn") {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-500 hover:rotate-90 transition-transform duration-500`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // === DEFAULT LOGO (Jika tidak dikenali) ===
    return (
        <svg viewBox="0 0 16 16" className={`${size} text-retro-dark-gray`} style={{ imageRendering: "pixelated" }} fill="currentColor">
            <rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="6" y="6" width="4" height="4" />
        </svg>
    );

    
}

//  FIGMA (F Warna-warni - Memantul/Bounce saat hover)
if (name === "figma") {
    return (
        <svg viewBox="0 0 16 16" className={`${size} hover:-translate-y-1 transition-transform duration-300`} style={{ imageRendering: "pixelated" }} fill="currentColor">
            {/* Lingkaran Merah atas kiri */}
            <path d="M5 3h3v3H5zm0 3h3v3H5z" fill="#f24e1e" />
            {/* Lingkaran Orange atas kanan */}
            <path d="M8 3h3v3H8z" fill="#ff7262" />
            {/* Lingkaran Ungu tengah */}
            <path d="M8 6h3v3H8z" fill="#a259ff" />
            {/* Bentuk daun biru bawah kiri */}
            <path d="M5 9h3v3H5z" fill="#1abc9c" />
            {/* Bentuk bulat hijau bawah kanan */}
            <path d="M8 9h3v3H8z" fill="#0acf83" />
        </svg>
    );
}
