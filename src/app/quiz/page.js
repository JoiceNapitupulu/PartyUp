"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import PixelAvatar from "../../components/PixelAvatar";
import usersData from "../../data/users.json";
import { calculateUserLevel } from "../../utils/auth";
import Link from "next/link";

// Latar utama luar game (di belakang seluruh halaman/console GameBoy)
const OUTER_BG = "/kuis/bg1.jpg";

// Efek elemen serangan: Air (hero, kebaikan) vs Api (boss, kejahatan)
const EFFECT_WATER = "/efek/air.webp"; // dilempar dari hero ke boss
const EFFECT_FIRE = "/efek/api.webp"; // dilempar dari boss ke hero

const STAGES = [
    {
        id: "design",
        name: "FIGMA FOREST",
        iconImg: "/kuis/uiux.png", // Logo UI/UX piksel asli menggantikan pohon 🌳
        bossName: "BAD UX GOBLIN",
        bossSprite: "👾",
        bgGif: "/kuis/bg2.jpg",
        roleTrack: "UI/UX Designer",
        questions: [
            { q: "What is the primary goal of low-fidelity wireframing in UX design?", options: ["Color palette testing", "Testing layout structure & user flows", "Exporting SVG icons"], answer: 1 },
            { q: "In Figma, which feature allows components to auto-resize responsively?", options: ["Auto Layout", "Smart Animate", "Vector Network"], answer: 0 },
            { q: "Which research method observes users completing tasks on a prototype?", options: ["A/B Testing", "Usability Testing", "Card Sorting"], answer: 1 },
        ],
    },
    {
        id: "frontend",
        name: "FRONTEND VALLEY",
        iconImg: "/kuis/2.png", // Logo Frontend piksel asli menggantikan 💻
        bossName: "SYNTAX BUG DRAGON",
        bossSprite: "🐉",
        bgGif: "/kuis/bg3.jpg",
        roleTrack: "Frontend Developer",
        questions: [
            { q: "In Next.js App Router, which file name defines a page route?", options: ["index.js", "page.js", "route.js"], answer: 1 },
            { q: "Which React hook handles side-effects and data loading?", options: ["useState", "useEffect", "useContext"], answer: 1 },
            { q: "What Tailwind utility creates a 4px black hard shadow?", options: ["shadow-sm", "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", "drop-shadow-md"], answer: 1 },
        ],
    },
    {
        id: "backend",
        name: "BACKEND CASTLE",
        iconImg: "/kuis/3.png", // Logo Backend piksel asli menggantikan 🏰
        bossName: "SQL INJECTION DEMON",
        bossSprite: "👹",
        bgGif: "/kuis/bg4.jpg",
        roleTrack: "Backend Developer",
        questions: [
            { q: "Which HTTP status code represents '200 OK' for successful API requests?", options: ["200 OK", "404 Not Found", "500 Server Error"], answer: 0 },
            { q: "What technique prevents SQL Injection vulnerabilities in database queries?", options: ["String Concatenation", "Parameterized Queries (Prepared Statements)", "Base64 Encoding"], answer: 1 },
            { q: "Which database type uses SQL tables with primary/foreign key relations?", options: ["MongoDB", "PostgreSQL / MySQL", "Redis"], answer: 1 },
        ],
    },
];


function useGameSfx() {
    const ctxRef = useRef(null);
    const [muted, setMuted] = useState(false);

    const getCtx = () => {
        if (typeof window === "undefined") return null;
        if (!ctxRef.current) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            ctxRef.current = new AC();
        }
        if (ctxRef.current.state === "suspended") ctxRef.current.resume();
        return ctxRef.current;
    };

    const beep = useCallback((freq, duration, type = "square", volume = 0.16, delay = 0) => {
        if (muted) return;
        const ctx = getCtx();
        if (!ctx) return;
        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.value = volume;
            osc.connect(gain);
            gain.connect(ctx.destination);
            const t0 = ctx.currentTime + delay;
            osc.start(t0);
            gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
            osc.stop(t0 + duration + 0.02);
        } catch (e) {
            /* autoplay policy or unsupported browser — fail silently */
        }
    }, [muted]);

    return {
        muted,
        setMuted,
        playSelect: () => beep(440, 0.05, "square", 0.1),
        // NAIK — energi/HP boss turun tapi progress hero "naik" (serangan berhasil)
        playPowerUp: () => { beep(660, 0.07); beep(880, 0.07, "square", 0.14, 0.07); beep(1100, 0.09, "square", 0.14, 0.14); },
        playLevelUp: () => [523, 659, 784, 1046].forEach((f, i) => beep(f, 0.16, "square", 0.18, i * 0.13)),
        // TURUN — HP hero berkurang / kalah
        playPowerDown: () => { beep(220, 0.12, "sawtooth", 0.18); beep(150, 0.18, "sawtooth", 0.18, 0.11); },
        playDefeatedJingle: () => [400, 300, 200, 100].forEach((f, i) => beep(f, 0.22, "sawtooth", 0.2, i * 0.16)),
    };
}

export default function GameBoyAdventureQuiz() {
    const sfx = useGameSfx();

    const [hero, setHero] = useState(usersData[0]);
    const [allUsers, setAllUsers] = useState(usersData);
    const [gameState, setGameState] = useState("SELECT_HERO"); // SELECT_HERO | WORLD_MAP | PLAYING_STAGE | CLEAR | GAME_OVER

    const [activeStage, setActiveStage] = useState(null);
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [playerHp, setPlayerHp] = useState(100);
    const [bossHp, setBossHp] = useState(100);
    const [dialogueText, setDialogueText] = useState("");
    const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
    const [isBossAttacking, setIsBossAttacking] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [pickedIdx, setPickedIdx] = useState(null);
    const [screenShake, setScreenShake] = useState(false);
    const [itemsCollected] = useState(["🍎", "📜"]);
    const [floatingTexts, setFloatingTexts] = useState([]); // {id, target, text}
    const floatIdRef = useRef(0);

    const heroLevel = calculateUserLevel(hero);

    // Progress panggung murni turunan dari bossHp (single source of
    // truth), jadi tidak ada lagi 2 kondisi menang yang bisa saling tabrakan.
    const stageProgress = 100 - bossHp;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUsers = localStorage.getItem("usersList");
            if (storedUsers) {
                try { setAllUsers(JSON.parse(storedUsers)); } catch (e) { console.error(e); }
            }
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                try { setHero(JSON.parse(storedUser)); } catch (e) { console.error(e); }
            }
        }
    }, []);

    const spawnFloatingText = (target, text) => {
        const id = ++floatIdRef.current;
        setFloatingTexts((prev) => [...prev, { id, target, text }]);
        setTimeout(() => setFloatingTexts((prev) => prev.filter((f) => f.id !== id)), 900);
    };

    const triggerShake = () => {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 350);
    };

    const startStage = (stage) => {
        sfx.playSelect();
        setActiveStage(stage);
        setCurrentQIdx(0);
        setPlayerHp(100);
        setBossHp(100);
        setPickedIdx(null);
        setIsLocked(false);
        setDialogueText(`Encountered ${stage.bossName}! Select your attack command...`);
        setGameState("PLAYING_STAGE");
    };

    const handleCommandAnswer = (optionIdx) => {
        if (gameState !== "PLAYING_STAGE" || isLocked) return;
        setIsLocked(true);
        setPickedIdx(optionIdx);

        const question = activeStage.questions[currentQIdx];
        const isCorrect = optionIdx === question.answer;

        if (isCorrect) {
            sfx.playPowerUp();
            const damage = Math.ceil(100 / activeStage.questions.length);
            setDialogueText(`💧 SPLASH HIT! ${hero.name} doused ${activeStage.bossName} for -${damage} DMG!`);

            // Lempar proyektil Air dulu (isPlayerAttacking=true), baru HP & angka
            // damage muncul SETELAH proyektil "sampai" — bukan tiba-tiba nempel
            // di musuh dari awal.
            setTimeout(() => {
                setIsPlayerAttacking(true);

                setTimeout(() => {
                    spawnFloatingText("boss", `-${damage}`);
                    triggerShake();

                    setBossHp((prev) => {
                        const next = Math.max(0, prev - damage);

                        setTimeout(() => {
                            setIsPlayerAttacking(false);

                            if (next <= 0) {
                                setGameState("CLEAR");
                                sfx.playLevelUp();
                                setDialogueText(`🏆 STAGE CLEAR! You conquered ${activeStage.name}!`);

                                if (typeof window !== "undefined") {
                                    const updatedHero = {
                                        ...hero,
                                        skills: Array.from(new Set([...(hero.skills || []), activeStage.roleTrack])),
                                        semester: (hero.semester || 1) + 1,
                                    };
                                    setHero(updatedHero);
                                    localStorage.setItem("currentUser", JSON.stringify(updatedHero));
                                    const updatedList = allUsers.map((u) => (u.user_id === updatedHero.user_id ? updatedHero : u));
                                    setAllUsers(updatedList);
                                    localStorage.setItem("usersList", JSON.stringify(updatedList));
                                    window.dispatchEvent(new Event("auth-change"));
                                }
                            } else if (currentQIdx + 1 < activeStage.questions.length) {
                                setCurrentQIdx((i) => i + 1);
                                setPickedIdx(null);
                                setIsLocked(false);
                            } else {
                                setCurrentQIdx(0);
                                setPickedIdx(null);
                                setIsLocked(false);
                                setDialogueText(`${activeStage.bossName} is still standing! Keep attacking!`);
                            }
                        }, 220);

                        return next;
                    });
                }, 320); // waktu tempuh proyektil sebelum "mendarat"
            }, 500);
        } else {
            sfx.playPowerDown();
            const damage = 30;
            setDialogueText(`🔥 SCORCHED! ${activeStage.bossName} burned ${hero.name} for -${damage} DMG!`);

            // Sama: proyektil Api dilempar dulu, HP & damage baru muncul saat mendarat.
            setTimeout(() => {
                setIsBossAttacking(true);

                setTimeout(() => {
                    spawnFloatingText("player", `-${damage}`);
                    triggerShake();

                    setPlayerHp((prev) => {
                        const next = Math.max(0, prev - damage);

                        setTimeout(() => {
                            setIsBossAttacking(false);

                            if (next <= 0) {
                                setGameState("GAME_OVER");
                                sfx.playDefeatedJingle();
                                setDialogueText(`💀 GAME OVER! ${hero.name} fainted. Return to Town to recover.`);
                            } else if (currentQIdx + 1 < activeStage.questions.length) {
                                setCurrentQIdx((i) => i + 1);
                                setPickedIdx(null);
                                setIsLocked(false);
                            } else {
                                setCurrentQIdx(0);
                                setPickedIdx(null);
                                setIsLocked(false);
                            }
                        }, 220);

                        return next;
                    });
                }, 320);
            }, 500);
        }
    };

    const currentQuestion = activeStage?.questions?.[currentQIdx];

    return (
        <div
            className="min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black bg-[#080d1a] bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: `url('${OUTER_BG}')` }}
        >
            {/* Overlay gelap di atas latar luar supaya seluruh konten tetap terbaca & kontras */}
            <div className="absolute inset-0 bg-[#080d1a]/80 pointer-events-none z-0" />

            {/* Keyframes animasi pertarungan */}
            <style jsx global>{`
        @keyframes screenShake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-6px, 3px); }
          40% { transform: translate(5px, -3px); }
          60% { transform: translate(-4px, 2px); }
          80% { transform: translate(4px, -2px); }
        }
        .animate-screen-shake { animation: screenShake 0.35s ease-in-out; }

        @keyframes hpFlash {
          0%, 100% { filter: brightness(1); }
          30% { filter: brightness(2.2) saturate(0); }
        }
        .animate-hp-flash { animation: hpFlash 0.35s ease-in-out; }

        @keyframes floatDamage {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          15% { transform: translateY(-6px) scale(1.15); opacity: 1; }
          100% { transform: translateY(-42px) scale(1); opacity: 0; }
        }
        .animate-float-damage { animation: floatDamage 0.9s ease-out forwards; }

        @keyframes spritePulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-sprite-pulse { animation: spritePulse 2.2s ease-in-out infinite; }

        /* PROYEKTIL AIR: benar-benar terbang dari posisi hero (kiri) menuju
           posisi boss (kanan) di sepanjang baris pertarungan, baru "meledak"
           & memudar setelah sampai — bukan muncul tiba-tiba di atas musuh. */
        @keyframes throwWater {
          0%   { left: 12%; opacity: 0;   transform: translateY(-50%) scale(0.5)  rotate(0deg); }
          15%  { opacity: 1;              transform: translateY(-50%) scale(0.9)  rotate(70deg); }
          70%  { left: 74%; opacity: 1;   transform: translateY(-50%) scale(1.15) rotate(230deg); }
          100% { left: 74%; opacity: 0;   transform: translateY(-50%) scale(1.5)  rotate(260deg); }
        }
        .animate-throw-water { animation: throwWater 0.42s cubic-bezier(0.25,0.1,0.6,1) forwards; }

        /* PROYEKTIL API: kebalikannya, terbang dari boss (kanan) ke hero (kiri) */
        @keyframes throwFire {
          0%   { right: 12%; opacity: 0;  transform: translateY(-50%) scale(0.5)  rotate(0deg); }
          15%  { opacity: 1;              transform: translateY(-50%) scale(0.9)  rotate(-70deg); }
          70%  { right: 74%; opacity: 1;  transform: translateY(-50%) scale(1.15) rotate(-230deg); }
          100% { right: 74%; opacity: 0;  transform: translateY(-50%) scale(1.5)  rotate(-260deg); }
        }
        .animate-throw-fire { animation: throwFire 0.42s cubic-bezier(0.25,0.1,0.6,1) forwards; }

        @media (prefers-reduced-motion: reduce) {
          .animate-screen-shake, .animate-hp-flash, .animate-sprite-pulse,
          .animate-throw-water, .animate-throw-fire {
            animation: none !important;
          }
        }
      `}</style>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                {/* CONTAINER DIPERLEBAR: max-w-3xl -> max-w-6xl supaya lebih lega & modern */}
                <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16 flex flex-col items-center gap-6">

                    {/* TOP TITLE */}
                    <div className="text-center flex flex-col items-center gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400 text-yellow-300 font-pixel text-[9px] rounded">
                            ✦ 8-BIT GAMEBOY RPG ADVENTURE ✦
                        </div>
                        <h1 className="font-pixel text-2xl md:text-4xl text-yellow-300 drop-shadow-[0_4px_0px_rgba(0,0,0,1)]">
                            [ TODAY LAND: GUILD QUEST ]
                        </h1>
                        <p className="font-sans text-xs md:text-sm text-gray-300">
                            Select your student hero, navigate stages, defeat bugs, and level up your character profile!
                        </p>

                        <button
                            type="button"
                            onClick={() => sfx.setMuted((m) => !m)}
                            className="mt-1 font-pixel text-[8px] px-3 py-1.5 bg-retro-black/90 hover:bg-retro-black text-yellow-300 border-2 border-yellow-400 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            {sfx.muted ? "🔇 SFX: OFF (CLICK TO ENABLE)" : "🔊 SFX: ON (CLICK TO MUTE)"}
                        </button>
                    </div>

                    {/* GAME BOY ADVENTURE QUIZ */}
                    <div
                        className={`w-full max-w-5xl bg-[#121b2d] border-4 border-retro-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden flex flex-col relative ${screenShake ? "animate-screen-shake" : ""
                            }`}
                    >
                        {/* GAME BOY TOP SCREEN HEADER */}
                        <div className="bg-retro-black px-4 py-2 flex justify-between items-center border-b-4 border-retro-black font-pixel text-[8px] text-gray-300">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                <span className="text-yellow-300">GAME-BOY ADVANCE 8-BIT</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span>HERO: <strong className="text-pixel-green">{hero.name.toUpperCase()}</strong></span>
                                <span className="text-sky-300">LV.{heroLevel}</span>
                            </div>
                        </div>

                        {/* GAME STAGE VIEWPORT — bg per-stage (bg2/3/4) saat bertarung, bg1 saat di luar stage */}
                        <div
                            className="relative h-[380px] sm:h-[460px] md:h-[520px] w-full bg-cover bg-center overflow-hidden flex flex-col justify-between p-4 transition-[background-image] duration-500"
                            style={{ backgroundImage: `url('${activeStage ? activeStage.bgGif : OUTER_BG}')` }}
                        >
                            <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />

                            {/* STAGE 1: SELEKSI KARAKTER HERO */}
                            {gameState === "SELECT_HERO" && (
                                <div className="relative z-10 h-full flex flex-col justify-between items-center text-center">
                                    <div className="bg-retro-black/80 px-4 py-2 border-2 border-yellow-400 font-pixel text-xs text-yellow-300 rounded shadow-md">
                                        CHOOSE YOUR GUILD HERO:
                                    </div>

                                    <div className="flex items-center justify-center gap-3 flex-wrap px-4">
                                        {allUsers.map((u) => {
                                            const isSelected = hero.user_id === u.user_id;
                                            return (
                                                <button
                                                    key={u.user_id}
                                                    type="button"
                                                    onClick={() => {
                                                        sfx.playSelect();
                                                        setHero(u);
                                                    }}
                                                    className={`flex flex-col items-center gap-1 p-2 bg-retro-black/80 border-2 rounded transition-all cursor-pointer ${isSelected ? "border-yellow-400 scale-110 shadow-lg" : "border-gray-600 hover:border-white"
                                                        }`}
                                                >
                                                    <div className="w-12 h-12 relative">
                                                        <PixelAvatar role={u.role} size="w-full h-full" />
                                                    </div>
                                                    <span className="font-pixel text-[7px] text-white">{u.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            sfx.playSelect();
                                            setGameState("WORLD_MAP");
                                        }}
                                        className="font-pixel text-xs py-2.5 px-6 bg-yellow-400 hover:bg-yellow-300 text-retro-black font-bold border-2 border-retro-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px]"
                                    >
                                        START STORY &amp; MAP ▶
                                    </button>
                                </div>
                            )}

                            {/* STAGE 2: PETA DUNIA STAGE */}
                            {gameState === "WORLD_MAP" && (
                                <div className="relative z-10 h-full flex flex-col justify-between items-center text-center">
                                    <div className="bg-retro-black/80 px-4 py-1.5 border-2 border-yellow-400 font-pixel text-[10px] text-yellow-300 rounded">
                                        SELECT STAGE DUNGEON TO RAID:
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                                        {STAGES.map((stg) => (
                                            <button
                                                key={stg.id}
                                                type="button"
                                                onClick={() => startStage(stg)}
                                                className="bg-[#121b2d]/90 border-2 border-retro-black hover:border-yellow-400 p-4 rounded flex flex-col items-center gap-2 cursor-pointer transition-transform hover:-translate-y-1 shadow-md text-left"
                                            >
                                                {/* Logo tech piksel asli menggantikan emoji pohon/laptop/kastil */}
                                                <div className="w-14 h-14 relative my-1 animate-sprite-pulse">
                                                    <Image
                                                        src={stg.iconImg}
                                                        alt={stg.name}
                                                        fill
                                                        unoptimized
                                                        className="object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
                                                    />
                                                </div>
                                                <span className="font-pixel text-[9px] text-yellow-300 font-bold text-center">{stg.name}</span>
                                                <span className="font-sans text-[10px] text-gray-300 text-center">Boss: {stg.bossName}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setGameState("SELECT_HERO")}
                                        className="font-pixel text-[8px] text-gray-300 hover:underline bg-retro-black/80 px-3 py-1 border border-gray-600 cursor-pointer"
                                    >
                                        [CHANGE HERO]
                                    </button>
                                </div>
                            )}

                            {/* STAGE 3: PERTARUNGAN — Air (hero) vs Api (boss jahat) */}
                            {gameState === "PLAYING_STAGE" && activeStage && (
                                <div className="relative z-10 h-full flex flex-col justify-between">

                                    {/* Boss HP Bar Atas — flash saat kena hit */}
                                    <div className={`flex justify-between items-center bg-retro-black/80 px-3 py-1.5 border border-retro-black rounded ${isPlayerAttacking ? "animate-hp-flash" : ""}`}>
                                        <span className="font-pixel text-[8px] text-red-400 font-bold">{activeStage.bossName} {activeStage.bossSprite}</span>
                                        <div className="w-40 h-3 bg-[#18233a] border border-gray-600 rounded overflow-hidden">
                                            <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${bossHp}%` }} />
                                        </div>
                                        <span className="font-pixel text-[7px] text-white w-10 text-right">{bossHp}%</span>
                                    </div>

                                    {/* Visual Karakter Berjalan di Atas Rumput — sekarang jadi ARENA
                                        proyektil: air/api benar-benar melintas di baris ini */}
                                    <div className="relative flex justify-between items-end px-6 sm:px-12 py-4 min-h-[120px]">
                                        {/* Hero Sprite */}
                                        <div className={`relative flex flex-col items-center transition-transform z-10 ${isPlayerAttacking ? "translate-x-4" : "animate-sprite-pulse"}`}>
                                            <div className="w-16 h-16 relative drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)]">
                                                <PixelAvatar role={hero.role} size="w-full h-full" />

                                                {/* Angka damage melayang di atas hero — cuma muncul saat proyektil api sudah mendarat */}
                                                {floatingTexts.filter((f) => f.target === "player").map((f) => (
                                                    <span key={f.id} className="absolute -top-2 left-1/2 -translate-x-1/2 font-pixel text-[10px] text-red-400 animate-float-damage pointer-events-none z-20">
                                                        {f.text}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="font-pixel text-[7px] bg-pixel-green text-retro-black px-1 font-bold">{hero.name}</span>
                                        </div>

                                        {/* Boss Sprite */}
                                        <div className={`relative flex flex-col items-center transition-transform z-10 ${isBossAttacking ? "-translate-x-4 animate-screen-shake" : "animate-sprite-pulse"}`}>
                                            <span className="text-5xl drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)] relative inline-block w-16 h-16 leading-[4rem] text-center">
                                                {activeStage.bossSprite}

                                                {/* Angka damage melayang di atas boss — cuma muncul saat proyektil air sudah mendarat */}
                                                {floatingTexts.filter((f) => f.target === "boss").map((f) => (
                                                    <span key={f.id} className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel text-[11px] text-yellow-300 animate-float-damage pointer-events-none z-20">
                                                        {f.text}
                                                    </span>
                                                ))}
                                            </span>
                                            <span className="font-pixel text-[7px] bg-red-600 text-white px-1 font-bold">{activeStage.bossName}</span>
                                        </div>

                                        {/* PROYEKTIL AIR — benar-benar terbang dari hero menuju boss */}
                                        {isPlayerAttacking && (
                                            <div className="absolute top-1/2 w-12 h-12 pointer-events-none z-30 animate-throw-water">
                                                <Image
                                                    src={EFFECT_WATER}
                                                    alt="Water projectile"
                                                    fill
                                                    unoptimized
                                                    className="object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                                                />
                                            </div>
                                        )}

                                        {/* PROYEKTIL API — benar-benar terbang dari boss menuju hero */}
                                        {isBossAttacking && (
                                            <div className="absolute top-1/2 w-12 h-12 pointer-events-none z-30 animate-throw-fire">
                                                <Image
                                                    src={EFFECT_FIRE}
                                                    alt="Fire projectile"
                                                    fill
                                                    unoptimized
                                                    className="object-contain drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* STAGE CLEAR / WIN */}
                            {gameState === "CLEAR" && (
                                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center gap-3 bg-retro-black/85 p-4 rounded">
                                    <span className="text-5xl animate-bounce">🏆</span>
                                    <h2 className="font-pixel text-base text-yellow-300">[ STAGE CLEAR! ]</h2>
                                    <p className="font-sans text-xs text-gray-200">
                                        {hero.name} defeated the Boss! Level Up to <strong className="text-pixel-green">LV.{heroLevel}</strong>!
                                    </p>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setGameState("WORLD_MAP")}
                                            className="font-pixel text-[9px] py-2 px-4 bg-yellow-400 text-retro-black font-bold border-2 border-retro-black cursor-pointer"
                                        >
                                            PLAY NEXT STAGE ▶
                                        </button>
                                        <Link href="/profile">
                                            <PixelButton variant="green" className="text-[9px] py-2 px-4 border-2">
                                                VIEW PROFILE ★
                                            </PixelButton>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* GAME OVER */}
                            {gameState === "GAME_OVER" && (
                                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center gap-3 bg-retro-black/85 p-4 rounded">
                                    <span className="text-5xl">💀</span>
                                    <h2 className="font-pixel text-base text-red-400">[ GAME OVER! ]</h2>
                                    <p className="font-sans text-xs text-gray-200">{hero.name} fainted. Try again!</p>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setGameState("WORLD_MAP")}
                                            className="font-pixel text-[9px] py-2 px-4 bg-[#1c2a4a] text-white font-bold border-2 border-retro-black cursor-pointer"
                                        >
                                            BACK TO MAP
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => startStage(activeStage)}
                                            className="font-pixel text-[9px] py-2 px-4 bg-red-600 text-white font-bold border-2 border-retro-black cursor-pointer"
                                        >
                                            RETRY STAGE ⚔️
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#0a0f1d] border-t-4 border-retro-black p-4 flex flex-col gap-4 text-left">

                            <div className="bg-retro-black border-2 border-yellow-400/80 p-3 rounded flex items-center gap-3 shadow-inner min-h-[64px]">
                                <div className="w-10 h-10 bg-[#121b2d] border border-yellow-400 flex items-center justify-center shrink-0 rounded overflow-hidden">
                                    <PixelAvatar role={hero.role} size="w-full h-full" />
                                </div>
                                <div className="flex flex-col gap-0.5 text-left flex-1">
                                    <span className="font-pixel text-[9px] text-yellow-300 font-bold">{hero.name.toUpperCase()}</span>
                                    <p className="font-pixel text-[8.5px] text-gray-200 leading-relaxed">
                                        {dialogueText}
                                    </p>
                                </div>
                            </div>

                            {/* COMMAND OPTIONS — sekarang terkunci setelah dipilih & kasih feedback benar/salah */}
                            {gameState === "PLAYING_STAGE" && activeStage && currentQuestion && (
                                <div className="flex flex-col gap-2">
                                    <span className="font-pixel text-[8px] text-yellow-400">
                                        COMMAND QUESTION {currentQIdx + 1}: {currentQuestion.q}
                                    </span>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        {currentQuestion.options.map((opt, idx) => {
                                            const showResult = pickedIdx !== null;
                                            const isAnswerCorrect = idx === currentQuestion.answer;
                                            const isPicked = pickedIdx === idx;

                                            let stateClass = "bg-[#1c2a4a] hover:bg-navy-blue hover:border-yellow-400 border-retro-black";
                                            if (showResult) {
                                                if (isAnswerCorrect) stateClass = "bg-emerald-900/60 border-pixel-green";
                                                else if (isPicked) stateClass = "bg-red-900/60 border-red-500";
                                                else stateClass = "bg-[#1c2a4a] border-retro-black opacity-50";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => handleCommandAnswer(idx)}
                                                    disabled={isLocked}
                                                    className={`font-sans text-xs p-2.5 text-white border-2 text-left transition-all rounded flex items-center justify-between disabled:cursor-not-allowed ${stateClass} ${isLocked ? "" : "cursor-pointer"}`}
                                                >
                                                    <span>
                                                        <span className="font-pixel text-[8px] text-yellow-400 mr-1.5">[{String.fromCharCode(65 + idx)}]</span>
                                                        {opt}
                                                    </span>
                                                    {!showResult && (
                                                        <span className="font-pixel text-[7px] bg-pixel-green text-retro-black px-1.5 py-0.5 font-bold">ATTACK ⚔️</span>
                                                    )}
                                                    {showResult && isAnswerCorrect && <span className="font-pixel text-[7px] text-pixel-green">✓</span>}
                                                    {showResult && isPicked && !isAnswerCorrect && <span className="font-pixel text-[7px] text-red-400">✗</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* BOTTOM RPG HUD STATS & ITEM INVENTORY */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-700/60 pt-3 font-pixel text-[8px]">
                                <div className={`flex items-center gap-2 ${isBossAttacking ? "animate-hp-flash" : ""}`}>
                                    <span className="text-yellow-400">ENERGY</span>
                                    <div className="w-28 h-3 bg-[#18233a] border border-gray-600 rounded overflow-hidden">
                                        <div className="h-full bg-pixel-green transition-all duration-300" style={{ width: `${playerHp}%` }} />
                                    </div>
                                    <span className="text-white">{playerHp}/100</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-300">
                                    <span>STATS: <strong className="text-pixel-green">LV.{heroLevel}</strong></span>
                                    {gameState === "PLAYING_STAGE" && (
                                        <span>STAGE PROGRESS: <strong className="text-sky-300">{stageProgress}%</strong></span>
                                    )}
                                    <div className="flex items-center gap-1 bg-[#121b2d] px-2 py-0.5 border border-gray-700 rounded">
                                        <span>ITEMS:</span>
                                        {itemsCollected.map((it, idx) => (
                                            <span key={idx}>{it}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}