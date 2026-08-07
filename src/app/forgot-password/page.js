"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Teks ucapan Pikachu dengan efek ketik satu per satu
  const fullSpeechText = "Lost your security key? Let's recover it~";
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

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatusMsg("PLEASE ENTER YOUR ADVENTURER EMAIL!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMsg("[SUCCESS] RECOVERY LINK TRANSMITTED TO YOUR EMAIL!");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#08091a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none selection:bg-yellow-400 selection:text-black">
      
      {/* Background Pixel Stars & GIF Latar Belakang (Sama Persis Login & Register) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 z-0 pointer-events-none"
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
        
        {/* 1. MASKOT PIKACHU GIF & SPEECH BUBBLE TEKS KETIK */}
        <div className="flex items-center gap-3 mb-2">
          {/* Ikon Pikachu Statis */}
          <div className="relative w-24 h-24 shrink-0">
            <Image 
              src="/Pikachu.gif" 
              alt="Pikachu Mascot" 
              fill 
              unoptimized
              className="object-contain drop-shadow-[2px_4px_0px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Kartu Speech Bubble Teks Ketik Satu Per Satu */}
          <div className="relative bg-white text-retro-black font-pixel text-[10px] md:text-[11px] py-3 px-4 border-2 border-retro-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[260px] h-[48px] flex items-center justify-start text-left shrink-0">
            <span>
              {displayedSpeech}
              <span className="animate-pulse font-bold text-yellow-500">|</span>
            </span>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          </div>
        </div>

        {/* 2. FORGOT PASSWORD WHITE CARD CONTAINER (GAYA CODÉDEX) */}
        <div className="w-full bg-white text-retro-black border-4 border-retro-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5 text-left">
          
          <div className="border-b border-slate-200 pb-3">
            <h1 className="font-pixel text-sm text-retro-black mb-1">
              [PASSWORD RECOVERY SCREEN]
            </h1>
            <p className="font-sans text-xs text-gray-500">
              Enter your registered student email to receive a password reset recovery link.
            </p>
          </div>

          {statusMsg && (
            <div className={`font-pixel text-[8px] p-2.5 border-2 text-center ${
              statusMsg.includes("SUCCESS") 
                ? "bg-green-100 text-green-800 border-green-600" 
                : "bg-red-100 text-red-700 border-red-600"
            }`}>
              {statusMsg}
            </div>
          )}

          {/* Form Input Email */}
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-[8px] text-gray-600">REGISTERED ADVENTURER EMAIL</label>
              <input
                type="email"
                required
                placeholder="e.g. adventurer@ui.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none"
              />
            </div>

            {/* Tombol Primary Send Reset Link */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-pixel text-xs py-3 bg-navy-blue hover:bg-navy-light text-white font-bold border-2 border-retro-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px] transition-all mt-1 disabled:opacity-50"
            >
              {isSubmitting ? "TRANSMITTING..." : "Send Reset Link ▶"}
            </button>
          </form>

          {/* Link Kembali ke Login */}
          <div className="text-center border-t border-slate-200 pt-3 relative z-20">
            <p className="font-sans text-xs text-gray-500">
              Remembered your key?{" "}
              <Link 
                href="/login" 
                className="font-pixel text-[9px] text-navy-blue font-bold hover:underline pl-1 cursor-pointer relative z-20 inline-block"
              >
                Log in &gt;
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}