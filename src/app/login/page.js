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

    const matchedUser = usersData.find(
      (u) => u.name.toLowerCase() === username.trim().toLowerCase()
    );

    try {
      if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      } else {
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
      window.dispatchEvent(new Event("auth-change"));
      window.location.href = "/profile";
    } catch (e) {
      console.error("Local storage error:", e);
      setError("LOCAL STORAGE BLOCKED BY BROWSER!");
    }
  };

  const handleQuickLogin = (name) => {
    const matchedUser = usersData.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );
    if (matchedUser) {
      try {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/profile";
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
                placeholder="e.g. Joice or Alex"
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
              QUICK START (LOAD MOCK DB CHARACTERS)
            </p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleQuickLogin("Joice")}
                className="font-pixel text-[8px] px-2.5 py-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                JOICE (HIPSTER)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("Alex")}
                className="font-pixel text-[8px] px-2.5 py-1.5 bg-retro-light-gray border-2 border-retro-black hover:bg-retro-gray select-none cursor-pointer active:translate-y-[1px]"
              >
                ALEX (HACKER)
              </button>
            </div>
          </div>
        </div>

        {/* Link back to Register */}
        <div className="text-center">
          <p className="font-sans text-xs text-retro-dark-gray">
            New adventurer?{" "}
            <Link href="/register" className="font-pixel text-[9px] text-navy-blue hover:underline pl-1">
              CREATE CHARACTER &gt;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}