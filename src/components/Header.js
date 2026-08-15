"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usersData from "../data/users.json";
import { translations } from "../utils/lang";
import PixelAvatar from "./PixelAvatar";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        setIsLightMode(true);
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }

      const savedLang = localStorage.getItem("language");
      if (savedLang) setLanguage(savedLang);
    }

    const loadUser = () => {
      const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
      const stored = localStorage.getItem("currentUser");

      if (stored) {
        try {
          setUser(JSON.parse(stored));
          return;
        } catch (e) {
          console.error("Failed to parse local user", e);
        }
      }

      if (isLoggedOut) {
        setUser(null);
      } else {
        localStorage.setItem("isLoggedOut", "false");
        localStorage.setItem("currentUser", JSON.stringify(usersData[0]));
        setUser(usersData[0]);
      }
    };

    loadUser();

    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "EN" ? "ID" : "EN";
    setLanguage(nextLang);
    localStorage.setItem("language", nextLang);
    window.dispatchEvent(new Event("language-change"));
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedOut", "true");
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  // 2. Perbaikan: Menggunakan nameKey dinamis agar sinkron dengan kamus terjemahan
  const baseNavItems = [
    { nameKey: "questBoard", path: "/board" },
    { nameKey: "showcase", path: "/showcase" },
    { nameKey: "timeline", path: "/following" },
    { nameKey: "guide", path: "/guide" },
    { nameKey: "QUIZ", path: "/quiz" },
  ];

  const navItems = user && (user.role?.toLowerCase() === "admin" || user.user_id === "USR-000")
    ? [{ nameKey: "adminControl", path: "/admin" }, ...baseNavItems]
    : baseNavItems;

  const SunIcon = () => (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-yellow-500 animate-pulse" style={{ imageRendering: "pixelated" }} fill="currentColor">
      <rect x="7" y="1" width="2" height="2" />
      <rect x="7" y="13" width="2" height="2" />
      <rect x="1" y="7" width="2" height="2" />
      <rect x="13" y="7" width="2" height="2" />
      <rect x="5" y="5" width="6" height="6" />
      <rect x="3" y="3" width="2" height="2" />
      <rect x="11" y="3" width="2" height="2" />
      <rect x="3" y="11" width="2" height="2" />
      <rect x="11" y="11" width="2" height="2" />
    </svg>
  );

  const MoonIcon = () => (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-sky-200" style={{ imageRendering: "pixelated" }} fill="currentColor">
      <path d="M6 2h5v1H6zm4 1h2v1h-2zm1 1h1v2h-1zm1 2h1v4h-1zm-1 4h1v2h-1zm-1 2h1v1h-1zm-1 1h-5v1h5zm-5-1h-1v-1h1zm-1-1h-1v-2h1zm-1-4h-1v-4h1zm1-2h-1v-2h1zm1-1h-1v-1h1z" />
      <rect x="3" y="4" width="1" height="1" fill="#eab308" className="animate-pulse" />
      <rect x="12" y="11" width="1" height="1" fill="#eab308" className="animate-pulse" />
    </svg>
  );

  return (
    <header
      className={`fixed z-[9999] pointer-events-auto left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out px-4 md:px-8 backdrop-blur-md border-retro-black ${isLightMode
        ? isScrolled
          ? "top-3 py-2.5 w-[90%] max-w-7xl rounded-full border-2 border-slate-400 bg-white/90 text-retro-black shadow-lg"
          : "top-0 py-3.5 w-full rounded-none border-b-2 border-slate-300 bg-white/95 text-retro-black shadow-none"
        : isScrolled
          ? "top-3 py-2.5 w-[90%] max-w-7xl rounded-full border-2 bg-retro-black/85 text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]"
          : "top-0 py-3.5 w-full rounded-none border-b-2 bg-retro-black/90 text-white shadow-none"
        }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 md:gap-4 pointer-events-auto relative z-[10000]">

        {/* Brand Logo Tanpa Latar Belakang */}
        <Link href="/" className="group flex items-center gap-2 shrink-0 pointer-events-auto cursor-pointer relative z-[10000] transition-transform hover:-translate-y-[1px]">
          <span className="font-pixel text-base md:text-lg text-pixel-green group-hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.6)] transition-all">
            PARTYUP!
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1 md:gap-2 flex-nowrap overflow-x-auto no-scrollbar pointer-events-auto relative z-[10000]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`font-pixel text-[9px] md:text-[10px] px-2.5 md:px-3.5 py-1.5 border-2 transition-all duration-300 whitespace-nowrap shrink-0 pointer-events-auto cursor-pointer relative z-[10000] hover:-translate-y-[1px] ${isActive
                  ? "bg-navy-blue text-white border-retro-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : isLightMode
                    ? "bg-transparent text-retro-black border-transparent hover:text-pixel-green-dark hover:border-retro-black rounded-full"
                    : "bg-transparent text-white border-transparent hover:text-pixel-green hover:border-white/10 rounded-full"
                  }`}
              >
                {/* 3. Perbaikan: Mengambil data terjemahan dinamis secara aman dari kamus */}
                {translations[language]?.[item.nameKey] || item.nameKey}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 pointer-events-auto relative z-[10000]">

          {/* Tombol Bahasa (ID 🇮🇩 / EN 🇬🇧) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className={`px-2 py-1.5 rounded-full border-2 font-pixel text-[8px] md:text-[9px] transition-all duration-300 active:scale-90 shrink-0 flex items-center justify-center shadow-sm cursor-pointer hover:-translate-y-[1px] ${isLightMode
              ? "border-slate-300 bg-black/5 hover:bg-black/10 text-retro-black font-bold"
              : "border-retro-black/30 bg-white/10 hover:bg-white/20 text-pixel-green font-bold"
              }`}
            title={language === "EN" ? "Switch to Bahasa Indonesia (ID)" : "Switch to English (EN)"}
          >
            <span>{language === "EN" ? "[EN]" : "[ID]"}</span>
          </button>

          {/* Tombol Tema (Matahari / Bulan) */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-1.5 rounded-full border-2 transition-all duration-300 active:scale-90 shrink-0 flex items-center justify-center shadow-sm pointer-events-auto cursor-pointer relative z-[10000] hover:-translate-y-[1px] ${isLightMode
              ? "border-slate-300 bg-black/5 hover:bg-black/10"
              : "border-retro-black/30 bg-white/10 hover:bg-white/20 text-white"
              }`}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* User Profile Singkat & Rapi */}
          {/* User Profile Singkat & Rapi */}
          {user ? (
            <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto relative z-[10000]">

              {/* Wrapper dengan Group untuk Efek Hover Tooltip */}
              <div className="relative group">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 p-1 border-2 rounded-full px-2.5 transition-all pointer-events-auto cursor-pointer relative z-[10000] hover:-translate-y-[1px] ${isLightMode
                      ? "border-slate-300 bg-black/5 hover:bg-black/10"
                      : "border-retro-black/30 bg-white/10 hover:bg-white/20"
                    }`}
                >
                  {/* Avatar Karakter Anime Pixel Sesuai Role User */}
                  <div className="w-7 h-7 flex items-center justify-center bg-retro-black border border-yellow-400 rounded-full shrink-0 overflow-hidden shadow-sm">
                    <PixelAvatar role={user.role} size="w-full h-full" />
                  </div>
                  <div className="text-left pr-1 leading-tight">
                    <p className={`font-pixel text-[9px] ${isLightMode ? "text-retro-black font-bold" : "text-white"}`}>
                      {user.name}
                    </p>
                    <p className="font-pixel text-[7.5px] text-pixel-green mt-0.5 animate-pulse">
                      LV.{(user.skills?.length || 0) + (user.semester || 1)}
                    </p>
                  </div>
                </Link>

                {/* Custom Pixel Role Tooltip (Disesuaikan ukuran & warnanya) */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[10005] whitespace-nowrap">
                  <div className="font-pixel text-[8px] md:text-[8.5px] px-2.5 py-1 bg-retro-black text-white border border-white/30 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] flex items-center gap-1">
                    <span className="text-pixel-green">Role:</span>
                    <span>{user.role ? user.role.toUpperCase() : "MEMBER"}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="font-pixel text-[8px] md:text-[9px] hover:underline border-none bg-transparent cursor-pointer text-red-500 font-bold pointer-events-auto relative z-[10000] hover:scale-105 transition-transform"
              >
                [EXIT]
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto relative z-[10000]">
              <Link
                href="/login"
                className="font-pixel text-[9px] md:text-[10px] px-3 py-1 border-2 border-retro-black hover:bg-navy-light transition-all rounded-full bg-navy-blue text-white pointer-events-auto cursor-pointer relative z-[10000]"
              >
                LOG IN
              </Link>
              <Link
                href="/register"
                className="font-pixel text-[9px] md:text-[10px] px-3 py-1 border-2 border-retro-black hover:bg-pixel-green-dark transition-all rounded-full bg-pixel-green text-retro-black pointer-events-auto cursor-pointer relative z-[10000]"
              >
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}