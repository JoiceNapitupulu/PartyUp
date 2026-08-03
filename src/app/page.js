"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  // Ambil 3 proyek terbuka teratas untuk featured quests
  const featuredProjects = projectsData
    .filter((p) => p.status === "Open")
    .slice(0, 3);

  // Pendeteksi posisi Scroll untuk efek Parallax & Animasi Halus
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bintang pixel acak untuk lapisan langit (posisi & delay di-generate sekali)
  const stars = Array.from({ length: 26 }).map((_, i) => ({
    id: i,
    top: Math.random() * 55,
    left: Math.random() * 100,
    size: Math.random() > 0.7 ? 3 : 2,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
  }));

  // Partikel kunang-kunang pixel yang melayang naik perlahan
  const fireflies = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 5,
    size: Math.random() > 0.5 ? 3 : 2,
  }));

  return (
    <div className="bg-[#0e1726] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      {/* CSS Keyframe Animasi Latar Pixel */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cloudScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes crtGlow {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-float {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-[#cloud-loop] {
          animation: cloudScroll 60s linear infinite;
        }
        .animate-crt {
          animation: crtGlow 3s ease-in-out infinite;
        }

        /* ====== ANIMASI TAMBAHAN: LANGIT & LATAR YANG LEBIH HIDUP ====== */

        @keyframes skyBreathe {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.06) saturate(1.12); }
        }
        .animate-sky-breathe {
          animation: skyBreathe 8s ease-in-out infinite;
          will-change: filter;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes fireflyRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.9; }
          50% { transform: translateY(-140px) translateX(12px); }
          90% { opacity: 0.7; }
          100% { transform: translateY(-280px) translateX(-8px); opacity: 0; }
        }
        .animate-firefly {
          animation: fireflyRise linear infinite;
        }

        @keyframes swayTree {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        .animate-sway {
          animation: swayTree 5s ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes bobGentle {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-bob {
          animation: bobGentle 4.5s ease-in-out infinite;
        }

        @keyframes typeBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .animate-type-blink {
          animation: typeBlink 1.1s steps(2) infinite;
        }

        @keyframes screenFlicker {
          0%, 100% { opacity: 1; }
          48% { opacity: 1; }
          50% { opacity: 0.85; }
          52% { opacity: 1; }
        }
        .animate-screen-flicker {
          animation: screenFlicker 4s ease-in-out infinite;
        }

        /* Menghormati preferensi pengguna yang sensitif terhadap gerakan */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-[#cloud-loop],
          .animate-crt,
          .animate-sky-breathe,
          .animate-twinkle,
          .animate-firefly,
          .animate-sway,
          .animate-bob,
          .animate-type-blink,
          .animate-screen-flicker {
            animation: none !important;
          }
        }
      `}</style>

      {/* Header Utama */}
      <Header />

      <main className="flex-1 w-full mx-auto flex flex-col">

        {/* ========================================================= */}
        {/* HERO SECTION: CODÉDEX STYLE PIXEL CODING ADVENTURE         */}
        {/* ========================================================= */}
        <section className="relative min-h-[90vh] pt-24 md:pt-32 pb-16 flex flex-col items-center justify-between overflow-hidden border-b-4 border-retro-black">

          {/* 1. LAYER LATAR SKIES & PARALLAX MOUNTAINS */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#1b3a4b] via-[#2d6a4f] to-[#52b788] z-0 transition-transform duration-75 ease-out animate-sky-breathe"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />

          {/* Bintang Pixel Berkelap-kelip di Langit */}
          <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
            {stars.map((s) => (
              <span
                key={s.id}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Kunang-kunang Pixel Melayang (efek "hidup" di malam senja) */}
          <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
            {fireflies.map((f) => (
              <span
                key={f.id}
                className="absolute bottom-24 bg-yellow-300 rounded-full shadow-[0_0_6px_2px_rgba(250,204,21,0.7)] animate-firefly"
                style={{
                  left: `${f.left}%`,
                  width: `${f.size}px`,
                  height: `${f.size}px`,
                  animationDelay: `${f.delay}s`,
                  animationDuration: `${f.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Awan Pixel Berjalan Otomatis (Infinite Loop) */}
          <div className="absolute top-12 left-0 w-[200%] h-32 pointer-events-none z-0 opacity-40 flex animate-[#cloud-loop]">
            <div className="w-1/2 flex justify-around">
              <div className="w-24 h-8 bg-white/80 rounded-full blur-[1px] pixel-border-sm" />
              <div className="w-36 h-10 bg-white/70 rounded-full blur-[1px] pixel-border-sm" />
              <div className="w-28 h-8 bg-white/80 rounded-full blur-[1px] pixel-border-sm" />
            </div>
            <div className="w-1/2 flex justify-around">
              <div className="w-24 h-8 bg-white/80 rounded-full blur-[1px] pixel-border-sm" />
              <div className="w-36 h-10 bg-white/70 rounded-full blur-[1px] pixel-border-sm" />
              <div className="w-28 h-8 bg-white/80 rounded-full blur-[1px] pixel-border-sm" />
            </div>
          </div>

          {/* Pegunungan Pixel Siluet Latar Belakang */}
          <div
            className="absolute bottom-16 left-0 right-0 h-48 bg-repeat-x bg-bottom z-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 100%, #1b4332 0%, #081c15 100%)`,
              clipPath: `polygon(0% 100%, 0% 40%, 15% 20%, 30% 60%, 45% 10%, 65% 55%, 80% 25%, 100% 45%, 100% 100%)`,
              transform: `translateY(${scrollY * 0.08}px)`
            }}
          />

          {/* Barisan Pohon Pixel Bergoyang (lapisan tengah, menambah kesan ramai) */}
          <div
            className="absolute bottom-16 left-0 right-0 h-20 z-0 pointer-events-none hidden md:flex items-end justify-around opacity-70"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="animate-sway"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="w-3 h-3 bg-[#081c15]" />
                <div className="w-6 h-8 -mt-1 -ml-1.5 bg-[#1b4332] clip-path-triangle" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
              </div>
            ))}
          </div>

          {/* Rumput Pixel Bertekstur di Dasar Layar (menambah corak) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 z-0 pointer-events-none opacity-90"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, #1b4332 0px, #1b4332 8px, #081c15 8px, #081c15 16px)`,
              backgroundSize: "16px 100%",
              clipPath: "polygon(0% 40%, 4% 20%, 8% 45%, 12% 15%, 16% 40%, 20% 10%, 24% 35%, 28% 20%, 32% 45%, 36% 15%, 40% 40%, 44% 20%, 48% 45%, 52% 10%, 56% 35%, 60% 20%, 64% 45%, 68% 15%, 72% 40%, 76% 20%, 80% 45%, 84% 10%, 88% 35%, 92% 20%, 96% 45%, 100% 15%, 100% 100%, 0% 100%)",
            }}
          />

          {/* 2. KONTEN UTAMA HERO (HERO TEXT & CTA) */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">

            {/* Badge Status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-retro-black/80 text-yellow-300 font-pixel text-[9px] md:text-[10px] border-2 border-yellow-400 rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              ✦ START YOUR CODING ADVENTURE ✦
            </div>

            {/* Judul Pixel Bergaya Codédex */}
            <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-white leading-tight md:leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wide">
              FORM YOUR <br />
              <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                CODING PARTY.
              </span>
            </h1>

            {/* Subtitle / Deskripsi */}
            <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl bg-retro-black/40 backdrop-blur-md p-3 border border-white/20 rounded shadow-md">
              The most fun &amp; collaborative 8-bit platform for IT students to find party members for <strong className="text-yellow-300">GEMASTIK, INVENTION 2026</strong>, and college quests. ★✦
            </p>

            {/* Tombol Aksi Utama (Kuning Bergaya Codédex) */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link href="/board">
                <button className="font-pixel text-xs md:text-sm py-3 px-8 bg-yellow-400 hover:bg-yellow-300 text-retro-black font-bold border-4 border-retro-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[2px] transition-all">
                  GET STARTED ▶
                </button>
              </Link>
              <Link href="/register">
                <button className="font-pixel text-xs md:text-sm py-3 px-6 bg-retro-black hover:bg-navy-blue text-white border-4 border-retro-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[2px] transition-all">
                  POST A QUEST ✦
                </button>
              </Link>
            </div>
          </div>

          {/* 3. ELEMEN DEKORASI ANIME CRT MONITOR CHARACTER (ILUSTRASI CODÉDEX) */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-8 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">

            {/* Karakter Anime Pixel Sedang Coding dengan Laptop */}
            <div className="animate-bob flex flex-col items-center self-center md:self-end order-2 md:order-1" aria-hidden="true">
              <svg
                viewBox="0 0 100 100"
                className="w-28 h-28 md:w-36 md:h-36 drop-shadow-[4px_6px_0px_rgba(0,0,0,0.5)]"
                style={{ imageRendering: "pixelated" }}
              >
                {/* Bayangan */}
                <ellipse cx="50" cy="93" rx="26" ry="4" fill="#000" opacity="0.25" />

                {/* Kaki bersila */}
                <rect x="28" y="76" width="44" height="10" fill="#1b263b" />
                <rect x="24" y="70" width="14" height="10" fill="#2d3748" />
                <rect x="62" y="70" width="14" height="10" fill="#2d3748" />

                {/* Badan / Hoodie */}
                <rect x="32" y="48" width="36" height="30" fill="#facc15" />
                <rect x="32" y="48" width="36" height="6" fill="#eab308" />
                <rect x="30" y="54" width="4" height="20" fill="#eab308" />
                <rect x="66" y="54" width="4" height="20" fill="#eab308" />

                {/* Lengan memegang laptop */}
                <rect x="26" y="60" width="10" height="14" fill="#facc15" />
                <rect x="64" y="60" width="10" height="14" fill="#facc15" />

                {/* Laptop */}
                <rect x="34" y="64" width="32" height="4" fill="#0e1726" />
                <rect x="36" y="50" width="28" height="16" fill="#2d3748" />
                <rect x="38" y="52" width="24" height="12" fill="#52b788" />
                <rect x="40" y="55" width="10" height="1.5" fill="#0e1726" className="animate-type-blink" />
                <rect x="40" y="58" width="16" height="1.5" fill="#0e1726" className="animate-type-blink" />
                <rect x="40" y="61" width="7" height="1.5" fill="#0e1726" className="animate-type-blink" />

                {/* Kepala */}
                <rect x="36" y="24" width="28" height="26" fill="#ffd8b0" />
                {/* Rambut anime (poni + belakang) */}
                <rect x="32" y="16" width="36" height="12" fill="#1b263b" />
                <rect x="32" y="24" width="6" height="10" fill="#1b263b" />
                <rect x="62" y="24" width="6" height="14" fill="#1b263b" />
                <rect x="38" y="24" width="6" height="6" fill="#1b263b" />
                <rect x="48" y="22" width="6" height="6" fill="#1b263b" />
                <rect x="58" y="24" width="6" height="6" fill="#1b263b" />

                {/* Kacamata programmer */}
                <rect x="39" y="36" width="9" height="6" fill="none" stroke="#0e1726" strokeWidth="1.5" />
                <rect x="52" y="36" width="9" height="6" fill="none" stroke="#0e1726" strokeWidth="1.5" />
                <rect x="48" y="38" width="4" height="1.5" fill="#0e1726" />

                {/* Mata & senyum */}
                <rect x="41.5" y="38" width="2" height="2" fill="#0e1726" />
                <rect x="54.5" y="38" width="2" height="2" fill="#0e1726" />
                <rect x="46" y="44" width="8" height="2" fill="#c2410c" opacity="0.8" />

                {/* Cahaya layar memantul ke wajah */}
                <rect x="40" y="42" width="20" height="4" fill="#52b788" opacity="0.25" className="animate-screen-flicker" />
              </svg>
              <div className="mt-1 bg-retro-black text-yellow-300 font-pixel text-[7px] md:text-[8px] px-2 py-1 border-2 border-yellow-400">
                LV.1 CODER
              </div>
            </div>

            {/* Monitor CRT Karakter Smiling Mascot (Mirip Ilustrasi Codédex) */}
            <div className="animate-float flex flex-col items-center self-center md:self-end order-1 md:order-2">
              <div className="bg-[#2d3748] border-4 border-retro-black p-3 rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-crt">
                {/* Layar CRT Hijau Senyum */}
                <div className="w-24 h-20 bg-[#52b788] border-2 border-retro-black flex flex-col items-center justify-center font-pixel text-xs text-retro-black font-bold shadow-inner">
                  <span className="text-base">^ _ ^</span>
                  <span className="text-[7px] mt-1 bg-retro-black text-white px-1">PARTYUP!</span>
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 border border-black" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black" />
                  <div className="w-2 h-2 rounded-full bg-green-500 border border-black" />
                </div>
              </div>
            </div>

            {/* Baris Logo Mitra Kampus & Kompetisi */}
            <div className="order-3 w-full md:w-auto bg-retro-black/75 backdrop-blur-md border-2 border-retro-black p-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-center gap-6 text-gray-300 font-pixel text-[8px] md:text-[9px] pointer-events-auto">
              <span className="text-yellow-400 font-bold">GUILD PARTNERS:</span>
              <span className="hover:text-white transition-colors">GEMASTIK 2026</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">INVENTION 2026</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">KAMPUS MERDEKA</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">UI / ITB / UGM / BINUS</span>
            </div>

          </div>

        </section>

        {/* ========================================================= */}
        {/* STATISTIK QUEST HUB (RPG HUD STYLE)                        */}
        {/* ========================================================= */}
        <section className="max-w-6xl w-full mx-auto px-4 -mt-6 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-retro-black text-white p-6 border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-yellow-400/30">
              <span className="font-pixel text-xs text-yellow-400 mb-1">ACTIVE PARTY HEROES</span>
              <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">342+</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-pixel-green/30">
              <span className="font-pixel text-xs text-pixel-green mb-1">QUESTS COMPLETED</span>
              <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">1,208+</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-sky-400/30">
              <span className="font-pixel text-xs text-sky-400 mb-1">GUILD MATCH RATE</span>
              <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">94%</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW IT WORKS SECTION                                      */}
        {/* ========================================================= */}
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-16 flex flex-col gap-8">
          <h2 className="font-pixel text-sm md:text-base text-white text-center md:text-left tracking-wider">
            [ HOW THE ADVENTURE WORKS ]
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1b263b] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
              <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                01
              </div>
              <h3 className="font-pixel text-xs text-yellow-400 mt-2">CHOOSE CLASS ROLE</h3>
              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                Select your primary 8-bit role from 10 specialized classes: Full-stack, UI/UX, PM, Mobile Developer, QA, or DevOps Engineer.
              </p>
            </div>

            <div className="bg-[#1b263b] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
              <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                02
              </div>
              <h3 className="font-pixel text-xs text-yellow-400 mt-2">DISPATCH A QUEST</h3>
              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                Post a quest specifying target competitions (e.g. GEMASTIK, INVENTION 2026), project scope, required skills, and party slots.
              </p>
            </div>

            <div className="bg-[#1b263b] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
              <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                03
              </div>
              <h3 className="font-pixel text-xs text-yellow-400 mt-2">FORM THE PARTY</h3>
              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                Trigger instant matchmaking, review student showcase portfolios, send invitations, and conquer the quest leaderboards!
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED ACTIVE QUESTS (MENJAGA FUNGSI UNTUK USER)        */}
        {/* ========================================================= */}
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 mb-16 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-pixel text-sm md:text-base text-white text-left">
              [ FEATURED ACTIVE QUESTS ]
            </h2>
            <Link href="/board">
              <PixelButton variant="secondary" className="text-[9px] py-2 px-4 border-2">
                VIEW ALL QUESTS ▶
              </PixelButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer Utama */}
      <Footer />
    </div>
  );
}