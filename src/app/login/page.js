"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PixelButton from "@/components/PixelButton";
import usersData from "@/data/users.json";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!username.trim()) {
      setError("ENTER ADVENTURER NAME!");
      return;
    }

    // Mencari kecocokan user dari file database dummy
    const matchedUser = usersData.find(
      (u) => u.name.toLowerCase() === username.trim().toLowerCase()
    );

    try {
      localStorage.setItem("isLoggedOut", "false");
      if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      } else {
        // Buat karakter kustom baru jika tidak terdaftar di database dummy
        const tempUser = {
          user_id: `USR-${Math.floor(100 + Math.random() * 900)}`,
          name: username.trim(),
          semester: 4,
          university: "Universitas Indonesia",
          major: "Computer Science",
          role: "Hacker",
          skills: ["React", "CSS", "Javascript"],
          bio: `Adventurer ${username.trim()} has arrived. Seeking quests!`,
          portfolio: [],
        };
        localStorage.setItem("currentUser", JSON.stringify(tempUser));
      }

      // Memicu perubahan header secara instan
      window.dispatchEvent(new Event("auth-change"));

      // Pengalihan halaman dinamis berdasarkan role admin/user biasa
      const targetUser = matchedUser || {};
      if (targetUser.role?.toLowerCase() === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      console.error("Local storage error:", err);
      setError("LOCAL STORAGE BLOCKED BY BROWSER!");
    }
  };

  const handleQuickLogin = (name) => {
    const matchedUser = usersData.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );
    if (matchedUser) {
      try {
        localStorage.setItem("isLoggedOut", "false");
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        window.dispatchEvent(new Event("auth-change"));

        // Pengalihan halaman dinamis berdasarkan role
        if (matchedUser.role?.toLowerCase() === "admin") {
          router.push("/admin");
        } else {
          router.push("/profile");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-retro-bg to-slate-200 flex flex-col items-center justify-center p-6 relative">
      {/* Tombol Escape Kembali ke Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 font-pixel text-[9px] text-retro-black hover:text-navy-blue flex items-center gap-2 transition-colors border-2 border-retro-black px-3 py-1.5 bg-white pixel-shadow-sm active:translate-y-[1px]"
      >
        [← ESCAPE TO TOWN]
      </Link>

      <div className="max-w-md w-full flex flex-col gap-6 mt-12 sm:mt-0">
        {/* Login Box */}
        <div className="bg-white pixel-border pixel-shadow p-6 md:p-8 flex flex-col gap-6">
          <div className="text-center border-b-2 border-retro-light-gray pb-4">
            <h1 className="font-pixel text-xs text-navy-blue mb-1">
              [GUILD GATEKEEPER]
            </h1>
            <p className="font-sans text-xs text-retro-dark-gray">
              Enter your student credentials to log into the Quest Hub.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 font-pixel text-[8px] p-2 pixel-border-sm border-red-600 text-center animate-shake">
              [WARNING: {error}]
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="font-pixel text-[8px] text-retro-black">ADVENTURER NAME / USERNAME</label>
              <input
                type="text"
                placeholder="e.g. Joice, Alex or Sarah"
                value={username}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-pixel text-[8px] text-retro-black">SECURITY KEY / PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={(e) => setPassword(e.target.value)}
                className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
              />
            </div>

            {/* Action buttons */}
            <PixelButton
              variant="navy"
              type="button"
              onClick={handleLogin}
              className="w-full mt-2 py-3"
            >
              LOG IN
            </PixelButton>
          </form>

          {/* Quick Preload Profiles */}
          <div className="border-t-2 border-retro-light-gray pt-4 flex flex-col gap-2">
            <p className="font-pixel text-[8px] text-retro-dark-gray text-center">
              QUICK START (LOAD MOCK DB ADVENTURERS)
            </p>
            <div className="grid grid-cols-3 gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleQuickLogin("Joice")}
                className="font-pixel text-[7px] p-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                JOICE (HIPSTER)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("Alex")}
                className="font-pixel text-[7px] p-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                ALEX (HACKER)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("Sarah")}
                className="font-pixel text-[7px] p-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                SARAH (HUSTLER)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("Kevin")}
                className="font-pixel text-[7px] p-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                KEVIN (HACKER)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("Rian")}
                className="font-pixel text-[7px] p-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                RIAN (HIPSTER)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("Admin")}
                className="font-pixel text-[7px] p-1.5 bg-red-100 text-red-700 border-2 border-red-700 hover:bg-red-200 select-none cursor-pointer active:translate-y-[1px]"
              >
                ADMIN (CONTROL)
              </button>
            </div>
          </div>
        </div>

        {/* Link back to Register */}
        <div className="text-center">
          <p className="font-sans text-xs text-retro-dark-gray">
            New adventurer?{" "}
            {/* Perbaikan Kritis: Karakter > diubah menjadi &gt; agar tidak error compile */}
            <Link href="/register" className="font-pixel text-[9px] text-navy-blue hover:underline pl-1">
              CREATE CHARACTER &gt;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}