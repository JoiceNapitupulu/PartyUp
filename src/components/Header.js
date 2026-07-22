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

  useEffect(() => {
    // Read user from localStorage or default to USR-001 (Joice)
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
        // First visit: default to Joice
        localStorage.setItem("isLoggedOut", "false");
        localStorage.setItem("currentUser", JSON.stringify(usersData[0]));
        setUser(usersData[0]);
      }
    };

    loadUser();

    // Listen for custom login events to update header in real-time
    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

  // Efek pendeteksi scroll layar dengan threshold 20px
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

  // Sisipkan menu kontrol admin secara otomatis jika peran pengguna adalah "Admin"
  const navItems = user && user.role?.toLowerCase() === "admin"
    ? [{ name: "ADMIN CONTROL", path: "/admin" }, ...baseNavItems]
    : baseNavItems;

  return (
    <header
      className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out py-4 px-4 md:px-8 ${
        isScrolled
          ? "top-4 w-[90%] max-w-6xl rounded-full border-2 border-retro-black bg-retro-black/85 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md"
          : "top-0 w-full rounded-none border-b-4 border-retro-black bg-retro-bg shadow-none"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div
            className={`font-pixel text-lg md:text-xl px-3 py-1.5 pixel-border transition-all duration-500 bg-retro-black text-pixel-green ${
              isScrolled ? "rounded-full border-retro-black" : "rounded-none border-retro-black"
            }`}
          >
            PARTYUP!
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`font-pixel text-[11px] px-4 py-1.5 border-2 transition-all duration-500 ${
                  isActive
                    ? isScrolled
                      ? "bg-navy-blue text-retro-bg border-retro-black rounded-full"
                      : "bg-navy-blue text-retro-bg border-retro-black rounded-none"
                    : isScrolled
                    ? "bg-transparent text-retro-gray border-transparent rounded-full hover:bg-white/10"
                    : "bg-transparent text-retro-black border-transparent rounded-none hover:border-retro-black hover:bg-retro-light-gray"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Profile & Auth State */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className={`flex items-center gap-2.5 p-1 border-2 transition-all duration-500 ${
                  isScrolled
                    ? "border-retro-black/30 bg-white/10 rounded-full px-3"
                    : "border-retro-black bg-white rounded-none hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {/* Retro Avatar Fallback */}
                <div
                  className={`w-8 h-8 flex items-center justify-center font-pixel text-xs font-bold border transition-all duration-500 ${
                    isScrolled
                      ? "bg-retro-black text-white border-white/10 rounded-full"
                      : "bg-retro-gray text-navy-blue border-retro-black rounded-none"
                  }`}
                >
                  {user.name ? user.name[0].toUpperCase() : "P"}
                </div>
                <div className="text-left pr-2">
                  <p
                    className={`font-pixel text-[10px] leading-tight transition-colors duration-500 ${
                      isScrolled ? "text-white" : "text-retro-black"
                    }`}
                  >
                    {user.name}
                  </p>
                  <p className="font-pixel text-[8px] leading-tight text-pixel-green mt-0.5">
                    LV.{(user.skills?.length || 0) + (user.semester || 1)} {/* agar tidak crash jika user.skills undefined */}
                    {user.role?.toUpperCase()} 
                  </p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className={`font-pixel text-[9px] hover:underline border-none bg-transparent cursor-pointer transition-colors duration-500 ${
                  isScrolled ? "text-red-400" : "text-red-600"
                }`}
                suppressHydrationWarning
              >
                [EXIT]
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`font-pixel text-[11px] px-4 py-1.5 border-2 border-retro-black hover:bg-navy-light transition-all duration-500 ${
                  isScrolled ? "bg-navy-blue text-white rounded-full" : "bg-navy-blue text-white rounded-none"
                }`}
              >
                LOG IN
              </Link>
              <Link
                href="/register"
                className={`font-pixel text-[11px] px-4 py-1.5 border-2 border-retro-black hover:bg-pixel-green-dark transition-all duration-500 ${
                  isScrolled ? "bg-pixel-green text-retro-black rounded-full" : "bg-pixel-green text-retro-black rounded-none"
                }`}
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