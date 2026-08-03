"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/utils/auth";
import PixelAvatar from "@/components/PixelAvatar";

export default function AdminSettings() {
    const [admin, setAdmin] = useState(null);

    // State Pengaturan Sistem
    const [guildName, setGuildName] = useState("PARTYUP! GUILD");
    const [isBgmOn, setIsBgmOn] = useState(true);
    const [allowQuestPost, setAllowQuestPost] = useState(true);
    const [isMaintenance, setIsMaintenance] = useState(false);

    // State Fitur Baru: Pengumuman Global (Ticker)
    const [announcement, setAnnouncement] = useState("");

    // State Notifikasi
    const [statusMsg, setStatusMsg] = useState(null);

    // Load data awal dari localStorage & user
    useEffect(() => {
        const user = getCurrentUser();
        if (user && (user.role?.toLowerCase() === "admin" || user.user_id === "USR-000")) {
            setAdmin(user);
        } else {
            // Fallback default admin jika tidak ada session
            setAdmin({
                user_id: "USR-000",
                name: "Admin Overseer",
                role: "Admin",
                bio: "System Overseer of the PartyUp! Guild. Maintaining balance and ensuring smooth quest matchmaking.",
            });
        }

        // Load pengaturan dari LocalStorage
        if (typeof window !== "undefined") {
            const savedGuildName = localStorage.getItem("guildName");
            if (savedGuildName) setGuildName(savedGuildName);

            const savedBgm = localStorage.getItem("isBgmOn");
            if (savedBgm !== null) setIsBgmOn(savedBgm === "true");

            const savedQuest = localStorage.getItem("allowQuestPost");
            if (savedQuest !== null) setAllowQuestPost(savedQuest === "true");

            const savedMaint = localStorage.getItem("isMaintenance");
            if (savedMaint !== null) setIsMaintenance(savedMaint === "true");

            const savedAnnounce = localStorage.getItem("guildAnnouncement");
            if (savedAnnounce) setAnnouncement(savedAnnounce);
        }
    }, []);

    // Helper untuk memicu event pembaruan global
    const triggerGlobalEvent = () => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("authChange"));
            window.dispatchEvent(new Event("auth-change"));
        }
    };

    // 1. Simpan Profil Admin
    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!admin) return;

        localStorage.setItem("currentUser", JSON.stringify(admin));

        const storedUsers = localStorage.getItem("usersList");
        if (storedUsers) {
            try {
                const parsed = JSON.parse(storedUsers);
                const updatedList = parsed.map((u) => u.user_id === admin.user_id ? admin : u);
                localStorage.setItem("usersList", JSON.stringify(updatedList));
            } catch (err) {
                console.error("Failed updating usersList", err);
            }
        }

        triggerGlobalEvent();
        setStatusMsg({ type: "success", text: "[SUCCESS] ADMIN COGNITIVE DATABASE UPDATED!" });
        setTimeout(() => setStatusMsg(null), 3500);
    };

    // 2. Simpan Config Parameter Sistem
    const handleSaveEngineConfig = () => {
        localStorage.setItem("guildName", guildName);
        localStorage.setItem("isBgmOn", String(isBgmOn));
        localStorage.setItem("allowQuestPost", String(allowQuestPost));
        localStorage.setItem("isMaintenance", String(isMaintenance));

        triggerGlobalEvent();
        setStatusMsg({ type: "success", text: "[SUCCESS] GUILD ENGINE PARAMETERS SAVED & BROADCASTED!" });
        setTimeout(() => setStatusMsg(null), 3500);
    };

    // 3. Dispatch Pengumuman Global Ticker
    const handleDispatchAnnouncement = (e) => {
        e.preventDefault();
        const text = announcement.trim();

        if (!text) {
            localStorage.removeItem("guildAnnouncement");
            triggerGlobalEvent();
            setStatusMsg({ type: "warning", text: "[NOTICE] GLOBAL BULLETIN CLEARED." });
        } else {
            localStorage.setItem("guildAnnouncement", text);
            triggerGlobalEvent();
            setStatusMsg({ type: "danger", text: "🚨 [DISPATCHED] GLOBAL BULLETIN BROADCASTED TO ALL ADVENTURERS!" });
        }

        setTimeout(() => setStatusMsg(null), 4000);
    };

    // 4. Hapus Pengumuman Global
    const handleClearAnnouncement = () => {
        setAnnouncement("");
        localStorage.removeItem("guildAnnouncement");
        triggerGlobalEvent();
        setStatusMsg({ type: "warning", text: "[NOTICE] GLOBAL BULLETIN HAS BEEN CLEARED." });
        setTimeout(() => setStatusMsg(null), 3500);
    };

    if (!admin) {
        return (
            <div className="flex-1 p-6 md:p-8 flex items-center justify-center font-pixel text-xs text-retro-black">
                [ACCESSING MASTER ENGINE TERMINAL...]
            </div>
        );
    }

    return (
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            {/* Top Header */}
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <div>
                    <h1 className="font-pixel text-base text-retro-black">SYSTEM CONFIG & SETTINGS</h1>
                    <p className="font-pixel text-[8px] text-retro-dark-gray mt-1">MASTER ENGINE OVERSEER CONSOLE</p>
                </div>
                <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2 py-1 border border-retro-black">
                    SYS_SETT: ACTIVE
                </span>
            </div>

            {/* Banner Status Prompt */}
            {statusMsg && (
                <div
                    className={`p-3 border-4 border-retro-black font-pixel text-[9px] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce ${statusMsg.type === "danger"
                        ? "bg-red-500 text-white"
                        : statusMsg.type === "warning"
                            ? "bg-yellow-400 text-retro-black"
                            : "bg-pixel-green text-retro-black"
                        }`}
                >
                    {statusMsg.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Kolom Kiri: Profil Admin Stat Sheet */}
                <form
                    onSubmit={handleSaveProfile}
                    className="lg:col-span-5 bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4"
                >
                    <div className="flex justify-between items-center border-b-2 border-retro-light-gray pb-2 mb-1">
                        <h2 className="font-pixel text-[10px] text-navy-blue">// ADMINISTRATOR STAT SHEET</h2>
                        <span className="font-pixel text-[7px] text-yellow-600 font-bold">LEVEL 99</span>
                    </div>

                    {/* Avatar Statis */}
                    <div className="flex items-center gap-4 border-b border-dashed border-retro-black/15 pb-4">
                        <div className="w-16 h-16 bg-retro-black border-2 border-yellow-500 flex items-center justify-center shadow-inner">
                            <PixelAvatar role="Admin" size="w-14 h-14" />
                        </div>
                        <div className="text-left leading-tight flex-1">
                            <p className="font-pixel text-[10px] text-retro-black font-bold">{admin.name}</p>
                            <p className="font-pixel text-[7px] text-yellow-600 font-bold mt-1">
                                ID: {admin.user_id} • SYSTEM OVERSEER
                            </p>
                        </div>
                    </div>

                    {/* Form Input Bio Log */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-pixel text-[8px] text-retro-black">ADMINISTRATOR BIO LOG:</label>
                        <textarea
                            rows={4}
                            value={admin.bio || ""}
                            onChange={(e) => setAdmin({ ...admin, bio: e.target.value })}
                            className="font-sans text-xs p-2.5 bg-white border-2 border-retro-black focus:outline-none resize-none shadow-inner"
                            placeholder="Write administrative bio..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full font-pixel text-[9px] py-3 bg-pixel-green text-retro-black border-2 border-retro-black hover:bg-pixel-green-dark shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px]"
                    >
                        [SAVE ADMIN BIO PROFILE]
                    </button>
                </form>

                {/* Kolom Kanan: Guild Engine Config & Dispatch Bulletin */}
                <div className="lg:col-span-7 flex flex-col gap-6">

                    {/* 1. Sakelar Fitur Sistem RPG */}
                    <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                        <h2 className="font-pixel text-[10px] text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-1">
                            // GUILD ENGINE CONFIG & PARAMETERS
                        </h2>

                        <div className="space-y-4">
                            {/* Input Nama Guild */}
                            <div className="flex flex-col gap-1.5 border-b border-retro-light-gray pb-3">
                                <label className="font-pixel text-[8px] text-retro-black">GLOBAL GUILD NAME:</label>
                                <input
                                    type="text"
                                    value={guildName}
                                    onChange={(e) => setGuildName(e.target.value.toUpperCase())}
                                    className="font-sans text-xs p-2 bg-white border-2 border-retro-black focus:outline-none uppercase"
                                />
                            </div>

                            {/* Sakelar Parameter System */}
                            <div className="space-y-3">
                                <label className="block font-pixel text-[8px] text-retro-black">SYSTEM PARAMETERS:</label>

                                {/* Sakelar 1: BGM */}
                                <div className="flex justify-between items-center p-2.5 border-2 border-retro-black bg-retro-light-gray">
                                    <span className="font-pixel text-[8px] text-retro-black">8-BIT BGM CHIPTUNE OUTPUT</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsBgmOn(!isBgmOn)}
                                        className={`font-pixel text-[8px] px-3 py-1 border-2 border-retro-black cursor-pointer select-none ${isBgmOn ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {isBgmOn ? "ON" : "OFF"}
                                    </button>
                                </div>

                                {/* Sakelar 2: Batasi Posting Quest */}
                                <div className="flex justify-between items-center p-2.5 border-2 border-retro-black bg-retro-light-gray">
                                    <span className="font-pixel text-[8px] text-retro-black">ALLOW ADVENTURER POST QUEST</span>
                                    <button
                                        type="button"
                                        onClick={() => setAllowQuestPost(!allowQuestPost)}
                                        className={`font-pixel text-[8px] px-3 py-1 border-2 border-retro-black cursor-pointer select-none ${allowQuestPost ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {allowQuestPost ? "ALLOW" : "RESTRICT"}
                                    </button>
                                </div>

                                {/* Sakelar 3: Maintenance Mode */}
                                <div className="flex justify-between items-center p-2.5 border-2 border-retro-black bg-retro-light-gray">
                                    <span className="font-pixel text-[8px] text-retro-black">GUILD MAINTENANCE LOCK</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsMaintenance(!isMaintenance)}
                                        className={`font-pixel text-[8px] px-3 py-1 border-2 border-retro-black cursor-pointer select-none ${isMaintenance ? "bg-yellow-400 text-retro-black font-bold" : "bg-green-500 text-white"
                                            }`}
                                    >
                                        {isMaintenance ? "LOCKED" : "ACTIVE"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleSaveEngineConfig}
                                className="w-full font-pixel text-[8px] py-2 bg-navy-blue text-white border-2 border-retro-black hover:bg-navy-light cursor-pointer active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                [APPLY ENGINE PARAMETERS]
                            </button>
                        </div>
                    </div>

                    {/* 2. Fitur Baru: GLOBAL GUILD ANNOUNCEMENT TICKER DISPATCH */}
                    <form
                        onSubmit={handleDispatchAnnouncement}
                        className="bg-red-50 border-4 border-red-600 p-6 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] flex flex-col gap-4 relative"
                    >
                        <div className="flex justify-between items-center border-b-2 border-red-300 pb-2">
                            <span className="font-pixel text-[9px] text-red-600 font-bold animate-pulse flex items-center gap-2">
                                <span>🚨</span> DISPATCH GLOBAL GUILD BULLETIN
                            </span>
                            <span className="font-pixel text-[7px] bg-red-600 text-white px-1.5 py-0.5 border border-retro-black">
                                LIVE TICKER
                            </span>
                        </div>

                        <p className="font-pixel text-[7px] text-retro-black leading-relaxed">
                            Pesan ini akan disiarkan secara <strong className="text-red-600">Real-time Running Text</strong> di bagian paling atas seluruh layar mahasiswa (Quest Board & Dashboard).
                        </p>

                        <div className="flex flex-col gap-1.5">
                            <input
                                type="text"
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                placeholder="e.g. ATTENTION: GEMASTIK 2026 Submission Deadline Approaching! Prepare your parties!"
                                className="font-sans text-xs p-2.5 bg-white border-2 border-retro-black focus:outline-none shadow-inner"
                            />
                        </div>

                        {/* Preview Ticker Live */}
                        {announcement && (
                            <div className="p-2 bg-yellow-300 border-2 border-retro-black flex items-center gap-2 overflow-hidden">
                                <span className="font-pixel text-[7px] bg-retro-black text-yellow-300 px-1 py-0.5 shrink-0">
                                    PREVIEW:
                                </span>
                                <marquee className="font-pixel text-[8px] text-retro-black flex-1">
                                    {announcement}
                                </marquee>
                            </div>
                        )}

                        <div className="flex gap-2 pt-1">
                            <button
                                type="submit"
                                className="flex-1 font-pixel text-[8px] py-2.5 bg-red-600 hover:bg-red-700 text-white border-2 border-retro-black cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
                            >
                                [DISPATCH BULLETIN]
                            </button>
                            {announcement && (
                                <button
                                    type="button"
                                    onClick={handleClearAnnouncement}
                                    className="font-pixel text-[8px] py-2.5 px-3 bg-white hover:bg-gray-100 text-retro-black border-2 border-retro-black cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
                                >
                                    [CLEAR]
                                </button>
                            )}
                        </div>
                    </form>

                </div>

            </div>

            <Footer />
        </div>
    );
}