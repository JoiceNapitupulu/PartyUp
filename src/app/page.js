"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PixelButton from "../components/PixelButton";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";

export default function Home() {
  // 1. EFEK TEKS KETIK SATU PER SATU (WORKSTATION TITLE)
  const fullWorkspaceTitle = "REAL-TIME RETRO PROGRAMMING WORKSPACE";
  const [typedWorkspaceTitle, setTypedWorkspaceTitle] = useState("");

  useEffect(() => {
    let index = 0;
    setTypedWorkspaceTitle("");
    const typingTimer = setInterval(() => {
      if (index < fullWorkspaceTitle.length) {
        setTypedWorkspaceTitle(fullWorkspaceTitle.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 70); // Kecepatan ketik per huruf (40ms)

    return () => clearInterval(typingTimer);
  }, []);

  // 2. EFEK ANGKA BERTAMBAH CEPAT (COUNT-UP ANIMATION)
  const [heroesCount, setHeroesCount] = useState(0);
  const [questsCount, setQuestsCount] = useState(0);
  const [matchRateCount, setMatchRateCount] = useState(0);

  useEffect(() => {
    const duration = 3000; // Total waktu hitungan cepat (1.5 detik)
    const steps = 40;
    const intervalTime = duration / steps;

    let step = 0;
    const countTimer = setInterval(() => {
      step++;
      const progress = step / steps;

      setHeroesCount(Math.min(342, Math.floor(342 * progress)));
      setQuestsCount(Math.min(1208, Math.floor(1208 * progress)));
      setMatchRateCount(Math.min(94, Math.floor(94 * progress)));

      if (step >= steps) {
        clearInterval(countTimer);
      }
    }, intervalTime);

    return () => clearInterval(countTimer);
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const videoRef = useRef(null);

  // Ambil 3 proyek terbuka teratas untuk featured quests
  const featuredProjects = projectsData
    .filter((p) => p.status === "Open")
    .slice(0, 3);

  // Pendeteksi posisi Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efek menyalakan suara otomatis saat pengguna mengklik/berinteraksi pertama kali
  useEffect(() => {
    const playAudio = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => { });
      }
    };
    playAudio();
    window.addEventListener("click", playAudio, { once: true });
    return () => window.removeEventListener("click", playAudio);
  }, []);

  // Fungsi Toggle Mute / Unmute
  const handleToggleSound = () => {
    if (videoRef.current) {
      const nextState = !isAudioOn;
      setIsAudioOn(nextState);
      videoRef.current.muted = !nextState;
      if (nextState) videoRef.current.play();
    }
  };

  return (
    <div className="bg-[#1a2f3b] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">

      {/* ========================================================= */}
      {/* CSS KEYFRAME ANIMASI                                       */}
      {/* ========================================================= */}
      <style jsx global>{`
        /* Animasi Daun Melayang Berguguran */
        @keyframes leafFalling {
          0% {
            transform: translate(0px, -20px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translate(100px, 80vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Animasi Floating Komputer */
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-float-gentle {
          animation: floatGentle 4s ease-in-out infinite;
        }

        .leaf-particle {
          position: absolute;
          pointer-events: none;
          z-index: 5;
          animation: leafFalling 8s linear infinite;
        }

        /* Animasi Judul "Coding Adventure": bernapas halus + berpendar emas,
           dibuat sedikit lebih modern dengan mikro pergeseran letter-spacing
           supaya terasa "hidup" tanpa mengganggu keterbacaan */
        @keyframes titleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.65)) drop-shadow(0 6px 0px rgba(0,0,0,1));
            transform: translateY(0px) scale(1);
            letter-spacing: 0.01em;
          }
          50% {
            filter: drop-shadow(0 0 26px rgba(250, 204, 21, 0.95)) drop-shadow(0 6px 0px rgba(0,0,0,1));
            transform: translateY(-5px) scale(1.015);
            letter-spacing: 0.02em;
          }
        }
        .animate-title-glow {
          animation: titleGlow 3.4s ease-in-out infinite;
          will-change: transform, filter;
        }

        /* Animasi lencana XP kecil yang "pop" masuk satu-satu di section info baru */
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: popIn 0.5s ease-out both;
        }

        /* Hormati preferensi pengguna yang sensitif terhadap gerakan */
        @media (prefers-reduced-motion: reduce) {
          .animate-title-glow {
            animation: none;
            filter: drop-shadow(0 0 14px rgba(250, 204, 21, 0.8)) drop-shadow(0 6px 0px rgba(0,0,0,1));
          }
          .animate-pop-in {
            animation: none;
          }
        }
      `}</style>

      {/* Header Utama */}
      <Header />

      <main className="flex-1 w-full mx-auto flex flex-col">

        {/* ========================================================= */}
        {/* HERO SECTION: CODÉDEX STYLE PIXEL CODING ADVENTURE         */}
        {/* ========================================================= */}
        <section className="relative min-h-[95vh] pt-28 md:pt-36 pb-12 flex flex-col items-center justify-between overflow-hidden border-b-4 border-retro-black">

          {/* 1. LATAR BELAKANG DIAM & TETAP (bg2.gif) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url('/bg2.gif')`,
            }}
          />

          {/* Overlay Tipis agar Teks Tetap Sangat Jelas Dibaca */}
          <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

          {/* 2. PARTIKEL DAUN PIXEL MELAYANG BERGUGURAN OTOMATIS */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <div className="leaf-particle text-amber-300 font-pixel text-xs left-[10%]" style={{ animationDelay: "0s", animationDuration: "7s" }}>🍃</div>
            <div className="leaf-particle text-pink-300 font-pixel text-xs left-[25%]" style={{ animationDelay: "2s", animationDuration: "9s" }}>🌸</div>
            <div className="leaf-particle text-emerald-300 font-pixel text-xs left-[45%]" style={{ animationDelay: "1s", animationDuration: "8s" }}>🍃</div>
            <div className="leaf-particle text-yellow-300 font-pixel text-xs left-[65%]" style={{ animationDelay: "4s", animationDuration: "10s" }}>✨</div>
            <div className="leaf-particle text-pink-300 font-pixel text-xs left-[85%]" style={{ animationDelay: "3s", animationDuration: "7.5s" }}>🌸</div>
          </div>

          {/* 3. KONTEN TENGAH HERO (TEXT & BUTTON) */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-5">

            <div className="font-pixel text-[10px] md:text-[11px] text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              START YOUR
            </div>

            <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-yellow-300 tracking-wide leading-tight animate-title-glow">
              Coding Adventure
            </h1>

            <p className="font-pixel text-xs md:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-xl leading-relaxed mt-1">
              The most fun and collaborative way for IT students to form team parties for GEMASTIK &amp; INVENTION 2026. ✦°
            </p>

            <div className="pt-2 flex flex-col items-center gap-3">
              <Link href="/board">
                <button className="font-pixel text-xs md:text-sm py-3.5 px-10 bg-yellow-400 hover:bg-yellow-300 text-retro-black font-bold border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[2px] transition-all rounded-sm">
                  Get started ▶
                </button>
              </Link>

              {/* Tombol Sakelar Suara Video */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="font-pixel text-[8px] px-3 py-1 bg-retro-black/90 hover:bg-retro-black text-yellow-300 border-2 border-yellow-400 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5"
              >
                <span>
                  {isAudioOn ? "🔊 SOUND: ON (CLICK TO MUTE)" : "🔇 SOUND: MUTED (CLICK TO UNMUTE)"}
                </span>
              </button>
            </div>
          </div>

          {/* 4. ELEMEN MONITOR CRT VIDEO & LAPTOP SPRITE */}
          <div className="relative z-20 w-full max-w-6xl mx-auto px-6 mt-6 flex flex-col md:flex-row items-end justify-between gap-6">

            {/* Monitor CRT Video Melayang Halus di Rumput Kiri */}
            <div className="animate-float-gentle flex flex-col items-center self-center md:self-end">
              <div className="relative w-48 md:w-56 aspect-square border-4 border-retro-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/pixel-monitor.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] opacity-40" />

                <div className="absolute top-1.5 left-1.5 bg-retro-black/80 text-yellow-300 font-pixel text-[6px] px-1 py-0.5 border border-yellow-400">
                  {isAudioOn ? "🔊 BGM PLAYING" : "🔇 MUTED"}
                </div>
              </div>
            </div>

            {/* Laptop Sprite (mac.png) Sebelah Kanan */}
            <div className="hidden lg:flex flex-col items-center animate-float-gentle">
              <div className="w-24 h-24 relative">
                <Image
                  src="/mac.png"
                  alt="Pixel Laptop"
                  fill
                  className="object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>

            {/* Baris Logo Mitra Kampus di Bagian Bawah Rumput */}
            <div className="w-full md:w-auto bg-retro-black/85 backdrop-blur-md border-2 border-retro-black p-2.5 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-center gap-6 text-gray-200 font-pixel text-[8px] md:text-[9px] mx-auto md:mx-0">
              <span className="text-yellow-400 font-bold">SUPPORTED BY:</span>
              <span className="hover:text-white transition-colors">GEMASTIK 2026</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">INVENTION 2026</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">KAMPUS MERDEKA</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">UI / ITB / UGM / BINUS</span>
            </div>

          </div>

        </section>

        {/* ========================================================= */}
        {/* SHOWCASE SECTION: RETRO CODING SETUP                       */}
        {/* ========================================================= */}
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-16">
          <div className="bg-[#13222e] border-4 border-retro-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-left flex flex-col gap-4">
              <span className="font-pixel text-[9px] text-yellow-400 bg-retro-black px-2 py-1 w-fit border border-retro-black">
                // ADVANCED MATCHMAKING ENGINE
              </span>
              <h2 className="font-pixel text-lg md:text-xl text-white leading-relaxed min-h-[50px] flex items-center">
                <span>
                  {typedWorkspaceTitle}
                  <span className="animate-pulse text-yellow-400 font-bold">|</span>
                </span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                PartyUp! connects student programmers directly with designers and product managers. Build high-performing hackathon parties equipped with 10 modern IT class roles.
              </p>
            </div>

            <div className="w-full lg:w-[420px] aspect-video relative border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <Image
                src="/computer.png"
                alt="Retro Coding Terminal Setup"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* STATISTIK QUEST HUB (ANGKA BERTAMBAH OTOMATIS) */}
        <section className="max-w-6xl w-full mx-auto px-4 relative z-20 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-retro-black text-white p-6 border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

            {/* Hero Count */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-yellow-400/30">
              <span className="font-pixel text-xs text-yellow-400 mb-1">ACTIVE PARTY HEROES</span>
              <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                {heroesCount.toLocaleString()}+
              </span>
            </div>

            {/* Quests Count */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-pixel-green/30">
              <span className="font-pixel text-xs text-pixel-green mb-1">QUESTS COMPLETED</span>
              <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                {questsCount.toLocaleString()}+
              </span>
            </div>

            {/* Match Rate Count */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-sky-400/30">
              <span className="font-pixel text-xs text-sky-400 mb-1">GUILD MATCH RATE</span>
              <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                {matchRateCount}%
              </span>
            </div>

          </div>
        </section>

        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-16 flex flex-col lg:flex-row items-center gap-12">

          {/* TEKS SEBELAH KIRI */}
          <div className="flex-1 text-left flex flex-col gap-4">
            <span className="font-pixel text-[10px] text-yellow-400 bg-retro-black px-3 py-1.5 w-fit border border-retro-black">
              // PROGRESSION SYSTEM
            </span>
            <h2 className="font-pixel text-xl md:text-3xl text-white leading-relaxed">
              Level up your team
            </h2>
            <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-lg">
              Bentuk party-mu, kumpulkan XP dari tiap quest yang diselesaikan, dan koleksi lencana pencapaian saat kamu berkolaborasi lintas role. Sistem matchmaking kami bikin cari tim impian buat GEMASTIK &amp; INVENTION 2026 jadi semenyenangkan menyelesaikan quest berikutnya.
            </p>
          </div>

          {/* SEBELAH KANAN: TEAM.GIF LEBIH NYATA & IKON LEBIH BESAR */}
          <div className="w-full lg:w-[460px] relative pt-16">

            {/* Karakter Pixel Diperbesar di Atas */}
            <div className="absolute top-2 left-6 flex items-center gap-4 z-10 animate-float-gentle">
              <div className="w-24 h-24 relative">
                <Image
                  src="/cursors/2pc.gif"
                  alt="Character 1"
                  fill
                  unoptimized
                  className="object-contain drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>

            {/* Container Gambar Lebih Bersih & Nyata (Tanpa kotak hitam kaku) */}
            <div className="bg-[#111e28] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-3.5 relative flex flex-col gap-3">

              <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-inner bg-black">
                <Image
                  src="/cursors/team.gif"
                  alt="Team Campfire"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="flex justify-between w-full items-center px-2 pb-1">
                <span className="font-pixel text-[10px] text-yellow-300 tracking-wider">PARTY_CAMPFIRE.GIF</span>
                <span className="font-pixel text-[8px] bg-emerald-500 text-black px-2.5 py-0.5 rounded-full font-bold">ONLINE</span>
              </div>

            </div>
          </div>
        </section>

        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* SEBELAH KIRI: 2 IKON GIF LEBIH BESAR & BERDAMPINGAN */}
          <div className="w-full lg:w-auto flex items-center justify-center gap-6 md:gap-8 shrink-0">

            {/* Ikon Pertama */}
            <div className="w-36 h-36 md:w-44 md:h-44 relative animate-float-gentle">
              <Image
                src="/cursors/pc3.gif"
                alt="Character 1"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
              />
            </div>

            {/* Ikon Kedua */}
            <div className="w-36 h-36 md:w-44 md:h-44 relative animate-float-gentle" style={{ animationDelay: "1s" }}>
              <Image
                src="/cursors/1.gif"
                alt="Character 2"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
              />
            </div>

          </div>

          {/* SEBELAH KANAN: TEKS LEBIH PROPOSIONAL & NYAMAN DIBACA */}
          <div className="flex-1 text-left flex flex-col gap-4 max-w-xl">
            <span className="font-pixel text-[10px] text-pixel-green bg-retro-black px-3 py-1.5 w-fit border border-retro-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              // INSTANT MATCHMAKING
            </span>
            <h2 className="font-pixel text-xl md:text-2xl lg:text-3xl text-white leading-tight tracking-wide">
              Conquer Leaderboards Together
            </h2>
            <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
              Tinjau portofolio mahasiswa, filter berdasarkan *tech stack* atau target kompetisi, dan kirim undangan tim secara instan. Bentuk tim impian Anda dan raih posisi puncak di papan peringkat GEMASTIK & INVENTION 2026!
            </p>
          </div>

        </section>

        {/* ========================================================= */}
        {/* HOW IT WORKS SECTION                                      */}
        {/* ========================================================= */}
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-12 flex flex-col gap-8">
          <h2 className="font-pixel text-sm md:text-base text-white text-center md:text-left tracking-wider">
            [ HOW THE ADVENTURE WORKS ]
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#172a3a] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
              <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                01
              </div>
              <h3 className="font-pixel text-xs text-yellow-400 mt-2">CHOOSE CLASS ROLE</h3>
              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                Select your primary 8-bit role from 10 specialized classes: Full-stack, UI/UX, PM, Mobile Developer, QA, or DevOps Engineer.
              </p>
            </div>

            <div className="bg-[#172a3a] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
              <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                02
              </div>
              <h3 className="font-pixel text-xs text-yellow-400 mt-2">DISPATCH A QUEST</h3>
              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                Post a quest specifying target competitions (e.g. GEMASTIK, INVENTION 2026), project scope, required skills, and party slots.
              </p>
            </div>

            <div className="bg-[#172a3a] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
              <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                03
              </div>
              <h3 className="font-pixel text-xs text-yellow-400 mt-2">FORM THE PARTY</h3>
              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                Trigger instant matchmaking, review student showcase portfolios, send invitations, and conquer the quest leaderboards!
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED ACTIVE QUESTS                                    */}
        {/* ========================================================= */}
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 mb-16 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-pixel text-sm md:text-base text-white text-left">
              [ FEATURED ACTIVE QUESTS ]
            </h2>
            <Link href="/board">
              <PixelButton variant="secondary" className="text-[9px] py-2 px-4 border-2">
                VIEW ALL QUESTS ▶
              </PixelButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer Utama */}
      <Footer />
    </div>
  );
}