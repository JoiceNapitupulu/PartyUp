"use client";

import Link from "next/link";
import { useLanguage } from "../utils/lang";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-[#0a0714] text-retro-gray border-t-4 border-retro-black relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto py-10 px-6 md:px-8 flex flex-col gap-8">

        {/* Grid Konten Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Kolom 1: Brand & Deskripsi Komunitas */}
          <div className="md:col-span-5 text-center md:text-left flex flex-col gap-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="font-pixel text-lg text-pixel-green bg-retro-black px-3 py-1 border-2 border-retro-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                PARTYUP!
              </div>
              <span className="font-pixel text-[7px] bg-yellow-400 text-retro-black px-1.5 py-0.5 border border-retro-black font-bold">
                v2.0 PRO
              </span>
            </div>

            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              {t("buildingSmarter")}
            </p>

            <p className="font-pixel text-[8px] text-yellow-400/90 mt-1">
              ✦ DESIGNED FOR INVENTION 2026 - WEB DESIGN COMPETITION ✦
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat Guild */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-3">
            <span className="font-pixel text-[9px] text-pixel-green uppercase tracking-wider border-b border-retro-black/50 pb-1">
              // GUILD DIRECTORY
            </span>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-center md:text-left">
              <Link
                href="/board"
                className="font-pixel text-[9px] text-gray-300 hover:text-pixel-green hover:translate-x-1 transition-all"
              >
                ▶ {t("questBoard")}
              </Link>
              <Link
                href="/showcase"
                className="font-pixel text-[9px] text-gray-300 hover:text-pixel-green hover:translate-x-1 transition-all"
              >
                ▶ {t("showcase")}
              </Link>
              <Link
                href="/following"
                className="font-pixel text-[9px] text-gray-300 hover:text-pixel-green hover:translate-x-1 transition-all"
              >
                ▶ {t("timeline")}
              </Link>
              <Link
                href="/admin"
                className="font-pixel text-[9px] text-yellow-400 hover:text-yellow-300 hover:translate-x-1 transition-all"
              >
                ★ {t("adminControl")}
              </Link>
            </div>
          </div>

          {/* Kolom 3: Info Spesifikasi Sistem RPG */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end text-center md:text-right font-pixel text-[8px] text-gray-400 gap-1.5">
            <span className="text-pixel-green uppercase tracking-wider border-b border-retro-black/50 pb-1 mb-1">
              // ENGINE SPECS
            </span>
            <p>FRAMEWORK: NEXT.JS 14 (APP ROUTER)</p>
            <p>STYLING: TAILWIND CSS &amp; PIXEL HUD</p>
            <p>LATENCY: 12MS (AP-SOUTHEAST-1)</p>
            <p className="text-sky-400">DATABASE: CLIENT-PERSISTENT</p>
          </div>

        </div>

        {/* Bagian Bawah: Copyright & Badge Pengembang */}
        <div className="border-t border-[#1d1738] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 font-pixel text-[8px] text-gray-500">
          <p>© 2026 PARTYUP! GUILD REALM. {t("rights")}</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">[PRIVACY_POLICY]</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">[GUILD_TERMS]</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">[SYSTEM_LOGS]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}