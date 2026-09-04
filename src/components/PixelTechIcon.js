"use client";

import React from "react";

// Menghapus spasi, titik, garis miring, dan simbol lain agar nama skill
function normalize(str) {
    return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function PixelTechIcon({ tech, size = "w-4 h-4" }) {
    const key = normalize(tech);

    // Helper: cek apakah key cocok dengan salah satu alias yang diberikan
    const is = (...aliases) => aliases.some((alias) => normalize(alias) === key);

    // === 1. FRONTIER LANGUAGES ===

    // JAVASCRIPT (Kotak Kuning JS)
    if (is("javascript", "js")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-yellow-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" />
                <path d="M7 10h1.5v1.5H7zm3 0h1.5v1.5H10zm0-1.5h1.5V10H10z" fill="black" />
            </svg>
        );
    }

    // FIGMA (F Warna-warni - Memantul/Bounce saat hover)
    if (is("figma")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:-translate-y-1 transition-transform duration-300`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M5 3h3v3H5zm0 3h3v3H5z" fill="#f24e1e" />
                <path d="M8 3h3v3H8z" fill="#ff7262" />
                <path d="M8 6h3v3H8z" fill="#a259ff" />
                <path d="M5 9h3v3H5z" fill="#1abc9c" />
                <path d="M8 9h3v3H8z" fill="#0acf83" />
            </svg>
        );
    }

    // GOLANG / GO (Gopher Biru Muda - Memantul/Bounce)
    if (is("go", "golang")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-400 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="4" y="3" width="8" height="10" rx="3" />
                <rect x="7" y="9" width="2" height="2" fill="white" />
                <rect x="5" y="5" width="2" height="2" fill="white" />
                <rect x="9" y="5" width="2" height="2" fill="white" />
                <rect x="5.5" y="5.5" width="1" height="1" fill="black" />
                <rect x="9.5" y="5.5" width="1" height="1" fill="black" />
            </svg>
        );
    }

    // UI/UX (Layout Monitor & Wireframe Pink - Berdenyut/Pulse)
    if (is("ui/ux", "ui", "ux", "uiux", "uiuxdesign", "uiuxdesigner")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-pink-500 hover:scale-110 transition-transform duration-300`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="5" width="3" height="4" />
                <rect x="9" y="5" width="3" height="2" />
                <rect x="9" y="8" width="3" height="1" />
            </svg>
        );
    }

    // TYPESCRIPT (Kotak Biru TS)
    if (is("typescript", "ts")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" />
                <path d="M5 5h4v1.5H7v4.5H5zm5 0h2v1.5h-1.5v4.5H10v-4.5H8.5V6.5h1.5z" fill="white" />
            </svg>
        );
    }

    // PYTHON (Ular Biru-Kuning)
    if (is("python", "py")) {
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
    if (is("php")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-indigo-400 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="4" width="12" height="8" rx="2" />
                <path d="M4 6h2v4H4zm4 0h2v2H8zm4 0h2v4H12z" fill="white" />
            </svg>
        );
    }

    // JAVA (Cangkir Kopi Mengepul)
    if (is("java")) {
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
    if (is("react", "react native", "reactnative")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-400 hover:rotate-180 transition-transform duration-700 ease-out`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="7" y="7" width="2" height="2" />
                <path d="M4 8c0-3 3-5 4-5s4 2 4 5-3 5-4 5-4-2-4-5z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M8 4c3 0 5 3 5 4s-2 4-5 4-5-3-5-4 2-4 5-4z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        );
    }

    // NEXT.JS (Kapsul N)
    if (is("next.js", "nextjs", "next")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-black hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="6" />
                <path d="M5 5h1.5v6H5zm5 0h1v6h-1.5z" fill="white" />
                <path d="M6 5.5l3.5 5.5h1l-3.5-5.5z" fill="white" />
            </svg>
        );
    }

    // TAILWIND CSS (Dua Gelombang Biru) — sekarang cocok untuk "Tailwind", "TailwindCSS", "Tailwind CSS", dst.
    if (is("tailwind", "tailwindcss", "tailwind css")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-teal-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 8c2-3 4-3 6 0s4 3 6 0" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M2 5c2 3 4 3 6 0s4-3 6 0" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // BOOTSTRAP (Mahkota Ungu B)
    if (is("bootstrap")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-purple-600 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M5 5h3.5c1 0 1.5.5 1.5 1s-.5 1-1.5 1H5zm0 3h4c1 0 1.5.5 1.5 1s-.5 1-1.5 1H5z" fill="white" />
            </svg>
        );
    }

    // FLUTTER (Burung Sayap Biru)
    if (is("flutter")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-500 hover:translate-x-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l4 4-4 4-4-4zm4 4l-4 4 4 4zm-4 4l-4 4 4-4z" />
            </svg>
        );
    }

    // HTML (Tameng 5 Orange)
    if (is("html", "html5")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-orange-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 2l1.5 11h9L14 2zm10 4H6v1.5h6l-.5 3-3.5 1-3.5-1-.2-1.5h1.5l.1.7L8 10l1.9-.5.2-1.5H4.5V4h7.7z" />
            </svg>
        );
    }

    // CSS (Tameng 3 Biru)
    if (is("css", "css3")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 2l1.5 11h9L14 2zm10 4H6v1.5h6l-.5 3-3.5 1-3.5-1-.2-1.5h1.5l.1.7L8 10l1.9-.5.2-1.5H4.5V4h7.7z" />
            </svg>
        );
    }

    // === 3. BACKEND & WEB FRAMEWORKS ===

    // NODE.JS (Hexagon Hijau)
    if (is("node.js", "nodejs", "node")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-green-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 3.5v7L8 16 2 12.5v-7z" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="6" y="6" width="4" height="4" />
            </svg>
        );
    }

    // LARAVEL (Perisai Merah L)
    if (is("laravel")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-600 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 3v7L8 15 2 12V5z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M5 5h2v6h4v2H5z" />
            </svg>
        );
    }

    // NESTJS (Kucing Merah Nest)
    if (is("nestjs", "nest")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 3v6L8 14 2 11V5z" />
                <circle cx="8" cy="8" r="3" fill="white" />
            </svg>
        );
    }

    // FASTAPI (Kilatan Petir Teal)
    if (is("fastapi")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-teal-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M9 3L4 9h3v3l5-6H9z" fill="white" />
            </svg>
        );
    }

    // GIN (Botol Biru Gin)
    if (is("gin")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-400 hover:skew-y-6 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M6 3h4v2H6zm-1 3h6v8H5z" />
            </svg>
        );
    }

    // BUN.JS (Roti Imut)
    if (is("bun.js", "bun")) {
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
    if (is("postgresql", "postgres")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-500 hover:skew-x-6 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M4 3h7v1H4zm-1 1h9v1H3zm-1 1h10v3H2zm1 3h9v1H3zm1 1h7v1H4z" />
                <rect x="12" y="6" width="2" height="2" fill="white" />
            </svg>
        );
    }

    // MYSQL (Lumba-lumba Biru)
    if (is("mysql")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-600 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M3 6h10v4H3zM2 8h12v2H2zm1 3h10v2H3z" />
            </svg>
        );
    }

    // MONGODB (Daun Hijau Mongo)
    if (is("mongodb", "mongo")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-emerald-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2c2 3 3 6 1 10h-2c-2-4-1-7 1-10z" />
            </svg>
        );
    }

    // SUPABASE (Petir Hijau-Kuning)
    if (is("supabase")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-emerald-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M10 2L3 10h5v4l7-8H10z" />
            </svg>
        );
    }

    // REDIS (Tumpukan Database Merah)
    if (is("redis")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-600 hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M2 3h12v3H2zm0 4h12v3H2zm0 4h12v3H2z" />
            </svg>
        );
    }

    // PRISMA (Segitiga Prisma)
    if (is("prisma")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-900 hover:rotate-12 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 11H2z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // NEONDB (Petir Neon Hijau)
    if (is("neondb", "neon")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-lime-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M9 2L4 9h4v5l5-7H9z" />
            </svg>
        );
    }

    // === 5. DEVOPS & TOOLS ===

    // DOCKER (Paus Biru Kontainer)
    if (is("docker")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-blue-400 hover:translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="5" y="3" width="6" height="4" />
                <path d="M2 8h12v3H2z" />
            </svg>
        );
    }

    // GIT (Cabang Logam Merah)
    if (is("git")) {
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
    if (is("github")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-slate-800 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="6" />
                <path d="M6 5l1 2h2l1-2z" fill="white" />
            </svg>
        );
    }

    // LINUX (Penguin Tux)
    if (is("linux")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-yellow-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M4 12c0-3 3-5 4-5s4 2 4 5H4z" fill="black" />
                <circle cx="8" cy="5" r="2" fill="white" />
                <circle cx="8" cy="5" r="0.5" fill="black" />
            </svg>
        );
    }

    // N8N (Node Konektor Hitam-Hijau)
    if (is("n8n")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-red-500 hover:rotate-12 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="4" cy="8" r="2" />
                <circle cx="12" cy="8" r="2" />
                <path d="M6 8h4" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // FIREBASE (Api Orange)
    if (is("firebase", "firebace")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-amber-500 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M3 13l5-11 5 11z" />
            </svg>
        );
    }

    // === 6. AI, DATA SCIENCE & TOOLS ===

    // PANDAS (Muka Panda Imut)
    if (is("pandas")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:-translate-y-1 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="3" y="3" width="10" height="10" rx="3" fill="white" stroke="black" strokeWidth="1" />
                <circle cx="6" cy="7" r="1.5" fill="black" />
                <circle cx="10" cy="7" r="1.5" fill="black" />
            </svg>
        );
    }

    // PYTORCH (Logo Api Segitiga)
    if (is("pytorch")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-orange-600 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l6 11H2z" />
                <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
        );
    }

    // JUPYTER (Planet Orange Ber-Cincin)
    if (is("jupyter")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-orange-500 hover:rotate-45 transition-transform duration-500`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="4" />
                <path d="M2 8h12" stroke="white" strokeWidth="2" />
            </svg>
        );
    }

    // SCIKIT-LEARN (Roda Gigi Oranye-Biru)
    if (is("scikitlearn", "scikit-learn", "scikit learn")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-sky-500 hover:rotate-90 transition-transform duration-500`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }

    // === 7. DESAIN & KREATIF (BARU) ===

    // ILLUSTRATOR (Kotak Hitam "Ai" Orange - identik dengan logo Adobe Illustrator asli)
    if (is("illustrator", "adobeillustrator", "ai")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="1" y="2" width="14" height="12" rx="1.5" fill="#1a1a1a" />
                <text x="8" y="11.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#ff9a00">Ai</text>
            </svg>
        );
    }

    // PHOTOSHOP (Kotak Biru Tua "Ps" Cyan - identik dengan logo Adobe Photoshop asli)
    if (is("photoshop", "adobephotoshop", "ps")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="1" y="2" width="14" height="12" rx="1.5" fill="#001e36" />
                <text x="8" y="11.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#31a8ff">Ps</text>
            </svg>
        );
    }

    // ADOBE XD (Kotak Hitam "Xd" Magenta)
    if (is("adobexd", "xd", "adobe xd")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <rect x="1" y="2" width="14" height="12" rx="1.5" fill="#1a1a1a" />
                <text x="8" y="11.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#ff26bc">Xd</text>
            </svg>
        );
    }

    // SKETCH (Berlian Kuning-Oranye)
    if (is("sketch")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-amber-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <path d="M8 2l5 4-5 8-5-8z" />
            </svg>
        );
    }

    // CANVA (Lingkaran Gradasi Teal-Ungu dengan huruf C)
    if (is("canva")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                <circle cx="8" cy="8" r="6" fill="#00c4cc" />
                <path d="M10.5 6.5c-.6-.6-1.4-1-2.5-1-2 0-3.3 1.4-3.3 3.2 0 1.7 1.2 3 2.9 3 .9 0 1.7-.4 2.2-1l.9.9c-.8.9-1.9 1.4-3.1 1.4-2.4 0-4.2-1.8-4.2-4.3S6.2 4.4 8.5 4.4c1.3 0 2.4.5 3.1 1.3z" fill="white" />
            </svg>
        );
    }

    // GRAPHIC DESIGN (ikon generik: palet warna + pena — dipakai jika skill tidak spesifik ke satu software)
    if (is("graphic design", "graphicdesign", "design", "desain grafis", "desaingrafis")) {
        return (
            <svg viewBox="0 0 16 16" className={`${size} text-fuchsia-400 hover:scale-110 transition-transform`} style={{ imageRendering: "pixelated" }} fill="currentColor">
                {/* Palet */}
                <path d="M8 2c-3.3 0-6 2.5-6 5.6 0 2.2 1.7 3.4 3.2 3.4.6 0 1-.4 1-1 0-.3-.1-.5-.3-.7-.2-.2-.3-.4-.3-.7 0-.6.5-1 1.1-1H8c2.8 0 5-2 5-4.4C13 3.3 10.8 2 8 2z" />
                <circle cx="6" cy="5.3" r="0.9" fill="#f97316" />
                <circle cx="9" cy="4.6" r="0.9" fill="#22c55e" />
                <circle cx="11" cy="6.5" r="0.9" fill="#3b82f6" />
                <circle cx="5.5" cy="8" r="0.9" fill="#eab308" />
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