"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../../utils/lang";

export default function HomeHero() {
    const { lang, t } = useLanguage();
    const [scrollY, setScrollY] = useState(0);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const videoRef = useRef(null);

    // Pendeteksi posisi Scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Efek menyalakan suara otomatis saat pengguna mengklik/berinteraksi pertama kali
    useEffect(() => {
        const playAudio = () => {
            if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.play().catch(() => { });
            }
        };
        playAudio();
        window.addEventListener("click", playAudio, { once: true });
        return () => window.removeEventListener("click", playAudio);
    }, []);

    // Fungsi Toggle Mute / Unmute
    const handleToggleSound = () => {
        if (videoRef.current) {
            const nextState = !isAudioOn;
            setIsAudioOn(nextState);
            videoRef.current.muted = !nextState;
            if (nextState) videoRef.current.play();
        }
    };

    return (
        <section className="relative min-h-[95vh] pt-28 md:pt-36 pb-12 flex flex-col items-center justify-between overflow-hidden border-b-4 border-retro-black">

            {/* 1. LATAR BELAKANG DIAM & TETAP (bg2.gif) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: `url('/bg2.gif')`,
                }}
            />

            {/* Overlay Tipis agar Teks Tetap Sangat Jelas Dibaca */}
            <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

            {/* 2. PARTIKEL DAUN PIXEL MELAYANG BERGUGURAN OTOMATIS */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="leaf-particle text-amber-300 font-pixel text-xs left-[10%]" style={{ animationDelay: "0s", animationDuration: "7s" }}>🍃</div>
                <div className="leaf-particle text-pink-300 font-pixel text-xs left-[25%]" style={{ animationDelay: "2s", animationDuration: "9s" }}>🌸</div>
                <div className="leaf-particle text-emerald-300 font-pixel text-xs left-[45%]" style={{ animationDelay: "1s", animationDuration: "8s" }}>🍃</div>
                <div className="leaf-particle text-yellow-300 font-pixel text-xs left-[65%]" style={{ animationDelay: "4s", animationDuration: "10s" }}>✨</div>
                <div className="leaf-particle text-pink-300 font-pixel text-xs left-[85%]" style={{ animationDelay: "3s", animationDuration: "7.5s" }}>🌸</div>
            </div>

            {/* 3. KONTEN TENGAH HERO (TEXT & BUTTON) */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-5">

                <div className="font-pixel text-[10px] md:text-[11px] text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {lang === "ID" ? "MULAI PETUALANGAN" : "START YOUR"}
                </div>

                <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-yellow-300 tracking-wide leading-tight animate-title-glow">
                    {lang === "ID" ? "Petualangan Koding" : "Coding Adventure"}
                </h1>

                <p className="font-pixel text-xs md:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-xl leading-relaxed mt-1">
                    {t("heroDesc")}
                </p>

                <div className="pt-2 flex flex-col items-center gap-3">
                    <Link href="/board">
                        <button className="font-pixel text-xs md:text-sm py-3.5 px-10 bg-yellow-400 hover:bg-yellow-300 text-retro-black font-bold border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[2px] transition-all rounded-sm">
                            {lang === "ID" ? "Mulai Sekarang ▶" : "Get started ▶"}
                        </button>
                    </Link>

                    {/* Tombol Sakelar Suara Video */}
                    <button
                        type="button"
                        onClick={handleToggleSound}
                        className="font-pixel text-[8px] px-3 py-1 bg-retro-black/90 hover:bg-retro-black text-yellow-300 border-2 border-yellow-400 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5"
                    >
                        <span>
                            {isAudioOn
                                ? (lang === "ID" ? "🔊 SUARA: AKTIF (KLIK UTK BISUKAN)" : "🔊 SOUND: ON (CLICK TO MUTE)")
                                : (lang === "ID" ? "🔇 SUARA: DIBISUKAN (KLIK UTK SUARA)" : "🔇 SOUND: MUTED (CLICK TO UNMUTE)")}
                        </span>
                    </button>
                </div>
            </div>

            {/* 4. ELEMEN MONITOR CRT VIDEO & LAPTOP SPRITE */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-6 mt-6 flex flex-col md:flex-row items-end justify-between gap-6">

                {/* Monitor CRT Video Melayang Halus di Rumput Kiri */}
                <div className="animate-float-gentle flex flex-col items-center self-center md:self-end">
                    <div className="relative w-48 md:w-56 aspect-square border-4 border-retro-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/videos/pixel-monitor.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] opacity-40" />

                        <div className="absolute top-1.5 left-1.5 bg-retro-black/80 text-yellow-300 font-pixel text-[6px] px-1 py-0.5 border border-yellow-400">
                            {isAudioOn ? "🔊 BGM PLAYING" : "🔇 MUTED"}
                        </div>
                    </div>
                </div>

                {/* Laptop Sprite (mac.png) Sebelah Kanan */}
                <div className="hidden lg:flex flex-col items-center animate-float-gentle">
                    <div className="w-24 h-24 relative">
                        <Image
                            src="/mac.png"
                            alt="Pixel Laptop"
                            fill
                            className="object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
                        />
                    </div>
                </div>

                {/* Baris Informasi Lomba Resmi INVENTION 2026 di Bagian Bawah */}
                <div className="w-full md:w-auto bg-retro-black/85 backdrop-blur-md border-2 border-retro-black p-2.5 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-200 font-pixel text-[8px] md:text-[9px] mx-auto md:mx-0">
                    <span className="text-yellow-400 font-bold">
                        {lang === "ID" ? "★ KARYA LOMBA:" : "★ ENTRY SUBMISSION:"}
                    </span>
                    <span className="text-pixel-green hover:text-white transition-colors font-bold">
                        INVENTION 2026
                    </span>
                    <span>•</span>
                    <span className="hover:text-white transition-colors">
                        {lang === "ID" ? "UNIVERSITAS UDAYANA" : "UDAYANA UNIVERSITY"}
                    </span>
                    <span>•</span>
                    <span className="hover:text-yellow-300 transition-colors">
                        {lang === "ID" ? "SUBTEMA: DIGITAL LEARNING" : "SUBTHEME: DIGITAL LEARNING"}
                    </span>
                </div>

            </div>

        </section>
    );
}