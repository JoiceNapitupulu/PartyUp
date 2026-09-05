"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../utils/lang";

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-auto bg-[#070b14] text-gray-300 border-t-4 border-retro-black relative select-none">
      
      {/* KONTEN UTAMA FOOTER */}
      <div className="max-w-6xl mx-auto py-10 px-6 md:px-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* KOLOM 1: Brand & Informasi Detail Platform (7 Kolom) */}
          <div className="md:col-span-7 text-left flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="font-pixel text-base text-pixel-green bg-retro-black px-3 py-1 border-2 border-retro-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                PARTYUP!
              </div>
              <span className="font-pixel text-[7.5px] bg-yellow-400/20 text-yellow-300 px-2.5 py-1 border border-yellow-400/50 rounded">
                INVENTION 2026
              </span>
              <span className="font-pixel text-[7.5px] bg-[#101b2b] text-pixel-green px-2.5 py-1 border border-pixel-green/40 rounded">
                STUDENT GUILD
              </span>
            </div>

            <p className="font-sans text-xs text-gray-200 leading-relaxed max-w-lg">
              {lang === "ID"
                ? "Membangun Komunitas Cerdas Melalui Pembelajaran Digital."
                : "Building Smarter Communities Through Digital Learning."}
            </p>

            {/* Kotak Informasi Detail Ekosistem (Aksen Retro) */}
            <div className="bg-[#0e1626] border-2 border-retro-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-1.5 mt-1 text-left max-w-lg">
              <span className="font-pixel text-[8px] text-pixel-green tracking-wider uppercase">
                {lang === "ID" ? "// KARYA LOMBA WEB DESIGN" : "// WEB DESIGN COMPETITION ENTRY"}
              </span>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                {lang === "ID"
                  ? "Platform pencarian tim kolaborasi mahasiswa IT & Desain se-Indonesia untuk ajang INVENTION 2026 Universitas Udayana. Menghubungkan talenta berdasarkan portofolio nyata dan pembagian peran 10 kelas RPG modern."
                  : "Nationwide student matchmaking & collaboration platform for INVENTION 2026 Universitas Udayana. Connects top engineering and design talent through verified proof-of-work portfolios and 10 modern RPG class roles."}
              </p>
            </div>
          </div>

          {/* KOLOM 2: Navigasi Direktori Cepat & Tombol Top (5 Kolom) */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end gap-3.5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 w-full text-left">
              <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider">
                {lang === "ID" ? "// DIREKTORI GUILD" : "// GUILD DIRECTORY"}
              </span>
              
              {/* Tombol Back-to-Top Retro */}
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-1.5 bg-[#101b2b] hover:bg-[#16273e] text-pixel-green hover:text-white border-2 border-retro-black px-2.5 py-1 rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] transition-all font-pixel text-[7.5px]"
              >
                <span>▲</span>
                <span>{lang === "ID" ? "KE ATAS" : "TOP OF PAGE"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full text-left pt-1">
              <Link
                href="/board"
                className="group flex items-center gap-1.5 font-pixel text-[9px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("questBoard") || "ACTIVE QUESTS"}</span>
              </Link>

              <Link
                href="/showcase"
                className="group flex items-center gap-1.5 font-pixel text-[9px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("showcase") || "FINISHED LOGS"}</span>
              </Link>

              <Link
                href="/following"
                className="group flex items-center gap-1.5 font-pixel text-[9px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("timeline") || "TIMELINE"}</span>
              </Link>

              <Link
                href="/guide"
                className="group flex items-center gap-1.5 font-pixel text-[9px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("guide") || "GUIDE"}</span>
              </Link>

              <Link
                href="/quiz"
                className="group flex items-center gap-1.5 font-pixel text-[9px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("quiz") || "QUIZ"}</span>
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP: Hak Cipta & Protokol */}
        <div className="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-pixel text-[7.5px] text-gray-500">
          <p>© 2026 PARTYUP! • INFORMATICS FESTIVAL &amp; COMPETITION (INVENTION 2026)</p>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-pixel-green cursor-pointer transition-colors">[UNIVERSITAS_UDAYANA]</span>
            <span className="hover:text-pixel-green cursor-pointer transition-colors">[SUBTHEME_04]</span>
            <span className="hover:text-pixel-green cursor-pointer transition-colors">[OPEN_LICENSE]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}