"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usersData from "@/data/users.json";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Read user from localStorage or default to USR-001 (Joice)
    const loadUser = () => {
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
      // Fallback
      setUser(usersData[0]);
    };

    loadUser();
    
    // Listen for custom login events to update header in real-time
    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  const navItems = [
    { name: "QUEST BOARD", path: "/board" },
    { name: "SHOWCASE", path: "/showcase" },
    { name: "TIMELINE", path: "/following" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-retro-bg border-b-4 border-retro-black py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand Logo */}
      <Link href="/" className="group flex items-center gap-2">
        <div className="bg-retro-black text-pixel-green font-pixel text-lg md:text-xl px-3 py-1.5 pixel-border pixel-shadow-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          PARTYUP!
        </div>
        <span className="font-pixel text-[10px] text-navy-blue animate-pulse hidden sm:inline">
          [Q_BOARD]
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-2 sm:gap-6 flex-wrap justify-center">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`font-pixel text-[11px] px-3 py-1 border-2 transition-all ${
                isActive
                  ? "bg-navy-blue text-retro-bg border-retro-black translate-x-[1px] translate-y-[1px]"
                  : "bg-transparent text-retro-black border-transparent hover:border-retro-black hover:bg-retro-light-gray"
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
              className="flex items-center gap-2.5 p-1 border-2 border-retro-black bg-white pixel-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Retro Avatar Fallback */}
              <div className="w-8 h-8 bg-retro-gray flex items-center justify-center font-pixel text-xs font-bold border border-retro-black text-navy-blue">
                {user.name ? user.name[0].toUpperCase() : "P"}
              </div>
              <div className="text-left pr-2">
                <p className="font-pixel text-[10px] leading-tight text-retro-black">
                  {user.name}
                </p>
                <p className="font-pixel text-[8px] leading-tight text-pixel-green-dark">
                  LV.{user.skills ? user.skills.length + (user.semester || 1) : 4} {user.role?.toUpperCase()}
                </p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="font-pixel text-[9px] text-red-600 hover:underline border-none bg-transparent cursor-pointer"
            >
              [EXIT]
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="font-pixel text-[11px] px-3 py-1 bg-navy-blue text-white border-2 border-retro-black hover:bg-navy-light transition-all"
            >
              LOG IN
            </Link>
            <Link
              href="/register"
              className="font-pixel text-[11px] px-3 py-1 bg-pixel-green text-retro-black border-2 border-retro-black hover:bg-pixel-green-dark transition-all"
            >
              SIGN UP
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
