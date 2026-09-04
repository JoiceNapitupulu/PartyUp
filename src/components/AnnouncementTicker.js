"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../utils/lang";

export default function AnnouncementTicker() {
  const [announcement, setAnnouncement] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkAnnouncement = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("guildAnnouncement");
        if (stored && stored.trim()) {
          setAnnouncement(stored.trim());
          setIsVisible(true);
        } else {
          setAnnouncement("");
          setIsVisible(false);
        }
      }
    };

    checkAnnouncement();

    window.addEventListener("announcement-change", checkAnnouncement);
    return () => window.removeEventListener("announcement-change", checkAnnouncement);
  }, []);

  if (!isVisible || !announcement) return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-retro-black border-b-2 border-retro-black py-1 px-4 z-[10001] relative flex items-center justify-between text-xs overflow-hidden shadow-md selection:bg-black selection:text-yellow-300">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        <span className="font-pixel text-[8px] md:text-[9px] bg-retro-black text-yellow-300 px-2 py-0.5 border border-retro-black shrink-0 font-bold animate-pulse">
          {t("announcementPrefix") || "👑 GUILD BROADCAST:"}
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <p className="font-pixel text-[8px] md:text-[9px] font-bold text-retro-black tracking-wide truncate">
            {announcement}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="font-pixel text-[8px] text-retro-black hover:text-red-700 bg-transparent border-none cursor-pointer shrink-0 ml-2 font-bold"
          title="Hilangkan Pengumuman"
        >
          [X]
        </button>
      </div>
    </div>
  );
}
