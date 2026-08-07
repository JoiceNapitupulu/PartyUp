"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import usersData from "@/data/users.json";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fullSpeechText = "Log in to resume your party journey~"; // Teks ucapan satu"
  const [displayedSpeech, setDisplayedSpeech] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedSpeech("");
    const typingTimer = setInterval(() => {
      if (index < fullSpeechText.length) {
        setDisplayedSpeech(fullSpeechText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 40); // Kecepatan ketik (40ms per huruf)

    return () => clearInterval(typingTimer);
  }, []);

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
          role: "Full-stack Developer",
          skills: ["React", "Next.js", "Javascript"],
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
    <div className="min-h-screen w-full bg-[#08091a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none selection:bg-yellow-400 selection:text-black">
      
      {/* Background Pixel Stars & GIF Latar Belakang */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70 z-0 pointer-events-none"
        style={{ backgroundImage: "url('/bglogin.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08091a]/80 via-transparent to-[#08091a] z-0 pointer-events-none" />

      {/* Tombol Escape Kembali ke Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 font-pixel text-[9px] text-white hover:text-yellow-300 flex items-center gap-2 transition-colors border-2 border-retro-black px-3 py-1.5 bg-[#121b2d] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
      >
        [← ESCAPE TO TOWN]
      </Link>

      <div className="max-w-md w-full flex flex-col items-center gap-3 relative z-10 my-8">
        
        {/* Container Maskot & Speech Bubble (DIAM TOTAL 100%) */}
        <div className="flex items-center gap-3 mb-2">

          {/* 1. Ikon Pikachu DIAM TOTAL */}
          <div className="relative w-24 h-24 shrink-0">
            <Image
              src="/Pikachu.gif"
              alt="Pikachu Mascot"
              fill
              unoptimized
              className="object-contain drop-shadow-[2px_4px_0px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* 2. Kartu Ucapan DIAM TOTAL (Lebar dikunci w-[260px] h-[48px] agar tidak bergeser) */}
          <div className="relative bg-white text-retro-black font-pixel text-[10px] md:text-[11px] py-3 px-4 border-2 border-retro-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[260px] h-[48px] flex items-center justify-start text-left shrink-0">
            <span>
              {displayedSpeech}
              <span className="animate-pulse font-bold text-yellow-500">|</span>
            </span>
            {/* Segitiga Panah Bubble */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          </div>
        </div>

        {/* 2. LOGIN WHITE CARD CONTAINER (GAYA CODÉDEX) */}
        <div className="w-full bg-white text-retro-black border-4 border-retro-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5 text-left">
          
          {/* Tombol OAuth Social (Google & GitHub) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin("Joice")}
              className="flex items-center justify-center gap-2 font-pixel text-[9px] py-2 px-3 bg-white border-2 border-retro-black rounded-lg hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px]"
            >
              <span className="text-red-500 font-bold">G</span> Google
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("Alex")}
              className="flex items-center justify-center gap-2 font-pixel text-[9px] py-2 px-3 bg-white border-2 border-retro-black rounded-lg hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px]"
            >
              <span className="font-bold">🐙</span> GitHub
            </button>
          </div>

          {/* OR Divider Line */}
          <div className="flex items-center gap-3 my-0.5">
            <div className="flex-1 h-[1px] bg-slate-300" />
            <span className="font-pixel text-[8px] text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-slate-300" />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 font-pixel text-[8px] p-2 border-2 border-red-600 text-center animate-shake">
              [WARNING: {error}]
            </div>
          )}

          {/* Form Input Login */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-[8px] text-gray-600">ADVENTURER NAME / EMAIL</label>
              <input
                type="text"
                placeholder="e.g. Joice, Alex or Sarah"
                value={username}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-[8px] text-gray-600">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={(e) => setPassword(e.target.value)}
                className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none"
              />
            </div>

            {/* Tombol Primary Cyan Blue (Gaya Codédex) */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full font-pixel text-xs py-3 bg-navy-blue hover:bg-navy-light text-white font-bold border-2 border-retro-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px] transition-all mt-2"
            >
              Log in ▶
            </button>
          </form>

          {/* Quick Preload Character Profiles */}
          <div className="border-t border-slate-200 pt-3 flex flex-col gap-2">
            <span className="font-pixel text-[7px] text-gray-400 text-center">
              PRELOAD MOCK GUILD CHARACTER DB
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {["Joice", "Alex", "Sarah", "Kevin", "Rian", "Admin"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleQuickLogin(name)}
                  className={`font-pixel text-[7px] p-1.5 border border-retro-black rounded select-none cursor-pointer active:translate-y-[1px] ${
                    name === "Admin"
                      ? "bg-red-100 text-red-700 hover:bg-red-200 font-bold"
                      : "bg-slate-100 text-retro-black hover:bg-slate-200"
                  }`}
                >
                  {name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Up & Reset Password Links */}
          <div className="text-center border-t border-slate-200 pt-3 flex flex-col gap-2 relative z-20">
            <p className="font-sans text-xs text-gray-500">
              Need an account?{" "}
              <Link
                href="/register"
                className="font-pixel text-[9px] text-navy-blue font-bold hover:underline pl-1 cursor-pointer inline-block relative z-20"
              >
                Sign up &gt;
              </Link>
            </p>

            <p className="font-sans text-xs text-gray-500 mt-2.5">
              Lost security key?{" "}
              <Link
                href="/forgot-password"
                className="font-pixel text-[9px] text-navy-blue font-bold hover:underline pl-1 cursor-pointer inline-block relative z-20"
              >
                Reset Password &gt;
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}