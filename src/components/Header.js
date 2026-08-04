"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usersData from "@/data/users.json";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false); // State tema

  useEffect(() => {
    const loadUser = () => {
      const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
      const stored = localStorage.getItem("currentUser");

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
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

  // SINKRONISASI TEMA GLOBAL: Menambahkan kelas "light" atau "dark" pada root HTML (Standar Tailwind)
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [isLightMode]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedOut", "true");
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  const baseNavItems = [
    { name: "QUEST BOARD", path: "/board" },
    { name: "SHOWCASE", path: "/showcase" },
    { name: "TIMELINE", path: "/following" },
  ];

  const navItems = user && user.role?.toLowerCase() === "admin"
    ? [{ name: "ADMIN CONTROL", path: "/admin" }, ...baseNavItems]
    : baseNavItems;

  // Ikon Matahari 8-Bit (Light Mode)
  const SunIcon = () => (
    <svg viewBox="0 0 16 16" className="w-4 h-4 text-yellow-400 animate-pulse" style={{ imageRendering: "pixelated" }} fill="currentColor">
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

  // Ikon Bulan & Bintang 8-Bit (Dark Mode)
  const MoonIcon = () => (
    <svg viewBox="0 0 16 16" className="w-4 h-4 text-sky-200" style={{ imageRendering: "pixelated" }} fill="currentColor">
      <path d="M6 2h5v1H6zm4 1h2v1h-2zm1 1h1v2h-1zm1 2h1v4h-1zm-1 4h1v2h-1zm-1 2h1v1h-1zm-1 1h-5v1h5zm-5-1h-1v-1h1zm-1-1h-1v-2h1zm-1-4h-1v-4h1zm1-2h-1v-2h1zm1-1h-1v-1h1z" />
      <rect x="3" y="4" width="1" height="1" fill="#eab308" className="animate-pulse" />
      <rect x="12" y="11" width="1" height="1" fill="#eab308" className="animate-pulse" />
    </svg>
  );

  return (
    <header
      className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out px-4 md:px-8 backdrop-blur-md ${
        isLightMode
          ? isScrolled
            ? "top-3 py-2.5 w-[90%] max-w-6xl rounded-full border-2 border-slate-300 bg-white/85 text-retro-black shadow-lg"
            : "top-0 py-3.5 w-full rounded-none border-b-2 border-slate-200 bg-white/95 text-retro-black shadow-none"
          : isScrolled
            ? "top-3 py-2.5 w-[90%] max-w-6xl rounded-full border-2 border-retro-black bg-retro-black/85 text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]"
            : "top-0 py-3.5 w-full rounded-none border-b-2 border-retro-black bg-retro-black/90 text-white shadow-none"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="font-pixel text-lg md:text-xl px-3 py-1.5 pixel-border transition-all duration-500 bg-retro-black text-pixel-green rounded-full border-retro-black">
            PARTYUP!
          </div>
        </Link>

        {/* Nav Links Dinamis */}
        <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`font-pixel text-[11px] px-4 py-1.5 border-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-navy-blue text-white border-retro-black"
                    : isLightMode
                      ? "bg-transparent text-retro-black border-transparent hover:bg-black/5"
                      : "bg-transparent text-white border-transparent hover:bg-white/20"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Profile & Auth State Dinamis */}
        <div className="flex items-center gap-4">

          {/* Tombol Sakelar Tema Interaktif */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className={`p-2 rounded-full border-2 transition-all duration-300 active:scale-90 shrink-0 flex items-center justify-center shadow-md ${
              isLightMode
                ? "border-slate-300 bg-black/5 hover:bg-black/10"
                : "border-retro-black/30 bg-white/10 hover:bg-white/20 text-white"
            }`}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className={`flex items-center gap-2.5 p-1 border-2 rounded-full px-3 transition-all ${
                  isLightMode
                    ? "border-slate-300 bg-black/5 hover:bg-black/10"
                    : "border-retro-black/30 bg-white/10 hover:bg-white/20"
                }`}
              >
                {/* Retro Avatar */}
                <div className={`w-8 h-8 flex items-center justify-center font-pixel text-xs font-bold border rounded-full ${
                  isLightMode
                    ? "bg-white text-retro-black border-slate-200"
                    : "bg-retro-black text-white border-white/10"
                }`}>
                  {user.name ? user.name[0].toUpperCase() : "P"}
                </div>
                <div className="text-left pr-2">
                  <p className={`font-pixel text-[10px] leading-tight ${isLightMode ? "text-retro-black" : "text-white"}`}>
                    {user.name}
                  </p>
                  <p className="font-pixel text-[8px] leading-tight text-pixel-green mt-0.5">
                    LV.{(user.skills?.length || 0) + (user.semester || 1)}{" "}
                    {user.role?.toUpperCase()}
                  </p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="font-pixel text-[9px] hover:underline border-none bg-transparent cursor-pointer text-red-400"
                suppressHydrationWarning
              >
                [EXIT]
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="font-pixel text-[11px] px-4 py-1.5 border-2 border-retro-black hover:bg-navy-light transition-all rounded-full bg-navy-blue text-white"
              >
                LOG IN
              </Link>
              <Link
                href="/register"
                className="font-pixel text-[11px] px-4 py-1.5 border-2 border-retro-black hover:bg-pixel-green-dark transition-all rounded-full bg-pixel-green text-retro-black"
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