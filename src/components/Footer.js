"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../utils/lang";

export default function Footer() {
  const { t } = useLanguage();

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

          {/* KOLOM 1: Brand & Informasi Detail Platform (5 Kolom) */}
          <div className="md:col-span-5 text-left flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="font-pixel text-base text-pixel-green bg-retro-black px-3 py-1 border-2 border-retro-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                PARTYUP!
              </div>
              <span className="font-pixel text-[7.5px] bg-[#101b2b] text-pixel-green px-2 py-0.5 border border-pixel-green/40 rounded">
                STUDENT ECOSYSTEM
              </span>
            </div>

            <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-sm">
              {t("buildingSmarter") || 
                "Platform kolaborasi dan pencarian rekan tim kompetisi IT mahasiswa berbasis ekosistem 8-bit RPG."}
            </p>

            {/* Kotak Informasi Detail Ekosistem (Aksen Hijau) */}
            <div className="bg-[#0e1626] border-2 border-retro-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-1.5 mt-1 text-left">
              <span className="font-pixel text-[7.5px] text-pixel-green tracking-wider uppercase">
                // PROOF-OF-WORK MATCHMAKING
              </span>
              <p className="font-sans text-[11px] text-gray-300 leading-relaxed">
                Menghubungkan talenta Software Engineer, UI/UX Designer, dan Product Manager dalam pembentukan tim kompetisi berdasarkan bukti karya portofolio nyata dan rating keahlian transparan.
              </p>
            </div>
          </div>

          {/* KOLOM 2: Navigasi Direktori Cepat (4 Kolom) */}
          <div className="md:col-span-4 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-1 w-full text-left">
              <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider">
                // GUILD DIRECTORY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full text-left">
              <Link
                href="/board"
                className="group flex items-center gap-1.5 font-pixel text-[8.5px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("questBoard") || "QUEST BOARD"}</span>
              </Link>

              <Link
                href="/showcase"
                className="group flex items-center gap-1.5 font-pixel text-[8.5px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("showcase") || "SHOWCASE"}</span>
              </Link>

              <Link
                href="/following"
                className="group flex items-center gap-1.5 font-pixel text-[8.5px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("timeline") || "TIMELINE"}</span>
              </Link>

              <Link
                href="/guide"
                className="group flex items-center gap-1.5 font-pixel text-[8.5px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("guide") || "GUIDE"}</span>
              </Link>

              <Link
                href="/quiz"
                className="group flex items-center gap-1.5 font-pixel text-[8.5px] text-gray-300 hover:text-pixel-green transition-all hover:translate-x-1"
              >
                <span className="text-pixel-green opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                <span>{t("quiz") || "QUIZ"}</span>
              </Link>

              <Link
                href="/admin"
                className="group flex items-center gap-1.5 font-pixel text-[8.5px] text-pixel-green hover:text-white transition-all hover:translate-x-1 font-bold"
              >
                <span>★</span>
                <span>{t("adminControl") || "ADMIN PANEL"}</span>
              </Link>
            </div>
          </div>

          {/* KOLOM 3: Spesifikasi Teknis & Tombol Back To Top (3 Kolom) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3 text-left md:text-right font-pixel text-[8px]">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-1 w-full justify-start md:justify-end">
              <span className="text-pixel-green uppercase tracking-wider">
                // SYSTEM ENGINE
              </span>
            </div>

            <div className="flex flex-col gap-1 text-gray-400 leading-relaxed">
              <p>CORE: <span className="text-gray-200">NEXT.JS 14 (APP ROUTER)</span></p>
              <p>STYLING: <span className="text-gray-200">TAILWIND CSS v4</span></p>
              <p>ENGINE: <span className="text-pixel-green">8-BIT PIXEL HUD</span></p>
              <p>STORAGE: <span className="text-gray-200">LOCAL PERSISTENT</span></p>
            </div>

            {/* Tombol Back-to-Top Hijau Retro */}
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-1 flex items-center gap-1.5 bg-[#101b2b] hover:bg-[#16273e] text-pixel-green hover:text-white border-2 border-retro-black px-3 py-1.5 rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] transition-all"
            >
              <span>▲</span>
              <span>TOP OF PAGE</span>
            </button>
          </div>

        </div>

        {/* BOTTOM STRIP: Hak Cipta & Protokol */}
        <div className="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-pixel text-[7.5px] text-gray-500">
          <p>© 2026 PARTYUP! GUILD REALM. {t("rights") || "ALL GUILD RIGHTS RESERVED."}</p>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-pixel-green cursor-pointer transition-colors">[PRIVACY_POLICY]</span>
            <span className="hover:text-pixel-green cursor-pointer transition-colors">[TERMS_OF_SERVICE]</span>
            <span className="hover:text-pixel-green cursor-pointer transition-colors">[SECURITY_LOG]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}