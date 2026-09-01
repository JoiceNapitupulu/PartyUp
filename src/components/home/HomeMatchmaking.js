"use client";

import Image from "next/image";
import { useLanguage } from "../../utils/lang";

export default function HomeMatchmaking() {
    const { lang } = useLanguage();

    return (
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

            {/* SEBELAH KIRI: 2 IKON GIF LEBIH BESAR & BERDAMPINGAN */}
            <div className="w-full lg:w-auto flex items-center justify-center gap-6 md:gap-8 shrink-0">

                {/* Ikon Pertama */}
                <div className="w-36 h-36 md:w-44 md:h-44 relative animate-float-gentle">
                    <Image
                        src="/cursors/pc3.gif"
                        alt="Character 1"
                        fill
                        unoptimized
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                    />
                </div>

                {/* Ikon Kedua */}
                <div className="w-36 h-36 md:w-44 md:h-44 relative animate-float-gentle" style={{ animationDelay: "1s" }}>
                    <Image
                        src="/cursors/1.gif"
                        alt="Character 2"
                        fill
                        unoptimized
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                    />
                </div>

            </div>

            {/* SEBELAH KANAN: TEKS LEBIH PROPOSIONAL & NYAMAN DIBACA */}
            <div className="flex-1 text-left flex flex-col gap-4 max-w-xl">
                <span className="font-pixel text-[10px] text-pixel-green bg-retro-black px-3 py-1.5 w-fit border border-retro-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {lang === "ID" ? "// MATCHMAKING INSTAN" : "// INSTANT MATCHMAKING"}
                </span>
                <h2 className="font-pixel text-xl md:text-2xl lg:text-3xl text-white leading-tight tracking-wide">
                    {lang === "ID" ? "Kuasai Papan Peringkat Bersama" : "Conquer Leaderboards Together"}
                </h2>
                <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                    {lang === "ID"
                        ? "Tinjau portofolio mahasiswa, filter berdasarkan tech stack atau target kompetisi, dan kirim undangan tim secara instan. Bentuk tim impianmu dan raih posisi puncak di leaderboard GEMASTIK & INVENTION 2026!"
                        : "Inspect student portfolios, filter by tech stack or target competition division, and send party invites instantly. Assemble your championship squad and dominate the GEMASTIK & INVENTION 2026 leaderboard!"}
                </p>
            </div>

        </section>
    );
}