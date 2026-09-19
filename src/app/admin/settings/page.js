"use client";

import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";

export default function AdminSettings() {
    const [admin, setAdmin] = useState(null);
    const [guildName, setGuildName] = useState("PARTYUP! GUILD");
    const [isBgmOn, setIsBgmOn] = useState(true);
    const [allowQuestPost, setAllowQuestPost] = useState(true);
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [announcement, setAnnouncement] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        const user = getCurrentUser();
        if (user && user.role?.toLowerCase() === "admin") {
            setAdmin(user);
        }
        if (typeof window !== "undefined") {
            const storedAnnouncement = localStorage.getItem("guildAnnouncement");
            if (storedAnnouncement) {
                setAnnouncement(storedAnnouncement);
            }
        }
    }, []);

    const handleBroadcastAnnouncement = (e) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
            localStorage.setItem("guildAnnouncement", announcement.trim());
            window.dispatchEvent(new Event("announcement-change"));
            setStatusMsg("[SUCCESS] GUILD BROADCAST ANNOUNCEMENT DISPATCHED!");
            setTimeout(() => setStatusMsg(""), 3000);
        }
    };

    const handleClearAnnouncement = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("guildAnnouncement");
            setAnnouncement("");
            window.dispatchEvent(new Event("announcement-change"));
            setStatusMsg("[SUCCESS] ANNOUNCEMENT CLEARED FROM REALM!");
            setTimeout(() => setStatusMsg(""), 3000);
        }
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!admin) return;

        localStorage.setItem("currentUser", JSON.stringify(admin));

        const storedUsers = localStorage.getItem("usersList");
        if (storedUsers) {
            const parsed = JSON.parse(storedUsers);
            const updatedList = parsed.map((u) => u.user_id === admin.user_id ? admin : u);
            localStorage.setItem("usersList", JSON.stringify(updatedList));
        }

        window.dispatchEvent(new Event("auth-change"));

        setStatusMsg("[SUCCESS] ADMIN COGNITIVE DATABASE UPDATED!");
        setTimeout(() => setStatusMsg(""), 3000);
    };

    if (!admin) {
        return (
            <div className="flex-1 min-h-screen bg-[#0a120c] p-6 md:p-8 flex items-center justify-center font-pixel text-xs text-pixel-green">
                [ACCESSING MASTER ENGINE TERMINAL...]
            </div>
        );
    }

    return (
        // BACKGROUND UTAMA: Menggunakan bg-[#0a120c] sama persis dengan Dashboard
        <div className="flex-grow min-h-screen bg-[#0a120c] p-6 md:p-8 flex flex-col gap-6 text-white">

            {/* HEADER */}
            <div className="flex flex-wrap justify-between items-end gap-3 border-b-2 border-pixel-green/25 pb-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-pixel text-base text-white">SYSTEM CONFIG &amp; SETTINGS</h1>
                    <p className="font-sans text-xs text-emerald-200/60">
                        Kelola parameter mesin guild, identitas admin, dan siaran pengumuman global.
                    </p>
                </div>
                <span className="font-pixel text-[8px] text-pixel-green bg-[#0f1b13] border border-pixel-green/30 px-2.5 py-1.5 rounded-md">
                    SYS_SETT: ACTIVE
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Kolom Kiri: Profil Admin Card */}
                <form
                    onSubmit={handleSaveProfile}
                    className="lg:col-span-6 bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-5"
                >
                    <div className="border-b border-pixel-green/15 pb-3 flex items-center justify-between">
                        <h2 className="font-pixel text-[9px] text-pixel-green tracking-wide">
                            ADMINISTRATOR STAT SHEET
                        </h2>
                        <span className="font-pixel text-[7px] text-emerald-200/50">LVL.99 OWNER</span>
                    </div>

                    {/* Avatar statis */}
                    <div className="flex items-center gap-4 border-b border-pixel-green/15 pb-4">
                        <div className="w-14 h-14 bg-[#16241a] border-2 border-pixel-green/40 rounded-xl flex items-center justify-center font-pixel text-2xl text-pixel-green font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                            A
                        </div>
                        <div className="text-left leading-tight">
                            <p className="font-pixel text-[11px] text-white font-bold">{admin.name}</p>
                            <p className="font-pixel text-[8px] text-pixel-green mt-1">ID: {admin.user_id} • Grand Master</p>
                            <p className="font-sans text-[11px] text-emerald-200/60 mt-0.5">{admin.email}</p>
                        </div>
                    </div>

                    {/* Form input bio */}
                    <div className="flex flex-col gap-2">
                        <label className="font-pixel text-[8px] text-emerald-200/70">ADMINISTRATOR BIO LOG:</label>
                        <textarea
                            rows={3}
                            value={admin.bio || ""}
                            onChange={(e) => setAdmin({ ...admin, bio: e.target.value })}
                            className="font-sans text-xs p-3 bg-[#16241a] border-2 border-pixel-green/25 rounded-lg text-white placeholder-emerald-200/30 focus:outline-none focus:border-pixel-green resize-none transition-colors"
                            placeholder="Tuliskan catatan bio administrator..."
                        />
                    </div>

                    {statusMsg && (
                        <p className="font-pixel text-[8px] text-pixel-green text-center animate-pulse">
                            {statusMsg}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full font-pixel text-[9px] py-2.5 bg-pixel-green text-black rounded-lg font-bold hover:bg-[#20e872] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-[1px] cursor-pointer transition-all"
                    >
                        [SAVE PROFILE CHANGES]
                    </button>
                </form>

                {/* Kolom Kanan: Pengaturan Sistem & Announcement */}
                <div className="lg:col-span-6 flex flex-col gap-6">

                    {/* Announcement Dispatcher */}
                    <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-4">
                        <div className="border-b border-pixel-green/15 pb-2">
                            <h2 className="font-pixel text-[9px] text-pixel-green tracking-wide flex items-center gap-2">
                                <span>👑</span> GLOBAL GUILD ANNOUNCEMENT TICKER
                            </h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-pixel text-[8px] text-emerald-200/70">REAL-TIME BROADCAST MESSAGE:</label>
                            <input
                                type="text"
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                placeholder="Contoh: ✦ GUILD QUESTS UPDATED! ✦"
                                className="font-sans text-xs p-2.5 bg-[#16241a] border-2 border-pixel-green/25 rounded-lg text-white placeholder-emerald-200/30 focus:outline-none focus:border-pixel-green transition-colors"
                            />
                        </div>

                        <div className="flex gap-2 pt-1">
                            <button
                                type="button"
                                onClick={handleBroadcastAnnouncement}
                                className="flex-1 font-pixel text-[8px] py-2 bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 rounded-lg hover:bg-yellow-400 hover:text-black font-bold cursor-pointer transition-colors active:translate-y-[1px]"
                            >
                                [BROADCAST TICKER]
                            </button>
                            <button
                                type="button"
                                onClick={handleClearAnnouncement}
                                className="font-pixel text-[8px] py-2 px-4 bg-red-500/15 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer transition-colors active:translate-y-[1px]"
                            >
                                [CLEAR]
                            </button>
                        </div>
                    </div>

                    {/* Guild Engine Config */}
                    <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-4">
                        <div className="border-b border-pixel-green/15 pb-2">
                            <h2 className="font-pixel text-[9px] text-pixel-green tracking-wide">
                                GUILD ENGINE CONFIG
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Input Nama Guild */}
                            <div className="flex flex-col gap-2 border-b border-pixel-green/15 pb-4">
                                <label className="font-pixel text-[8px] text-emerald-200/70">GLOBAL GUILD NAME:</label>
                                <input
                                    type="text"
                                    value={guildName}
                                    onChange={(e) => setGuildName(e.target.value.toUpperCase())}
                                    className="font-sans text-xs p-2.5 bg-[#16241a] border-2 border-pixel-green/25 rounded-lg text-white focus:outline-none focus:border-pixel-green"
                                />
                            </div>

                            {/* Sakelar Parameter */}
                            <div className="space-y-2.5">
                                <label className="block font-pixel text-[8px] text-emerald-200/70 mb-1">SYSTEM PARAMETERS:</label>

                                {/* Sakelar 1: BGM */}
                                <div className="flex justify-between items-center p-3 rounded-lg border border-pixel-green/20 bg-[#16241a]">
                                    <span className="font-pixel text-[8px] text-white">8-BIT BGM CHIPTUNE OUTPUT</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsBgmOn(!isBgmOn)}
                                        className={`font-pixel text-[7px] px-3 py-1.5 rounded border select-none cursor-pointer transition-colors ${isBgmOn
                                                ? "bg-pixel-green text-black font-bold border-pixel-green"
                                                : "bg-red-500/20 text-red-400 border-red-500/40"
                                            }`}
                                    >
                                        {isBgmOn ? "ON" : "OFF"}
                                    </button>
                                </div>

                                {/* Sakelar 2: Batasi Posting Quest */}
                                <div className="flex justify-between items-center p-3 rounded-lg border border-pixel-green/20 bg-[#16241a]">
                                    <span className="font-pixel text-[8px] text-white">ALLOW ADVENTURER POST QUEST</span>
                                    <button
                                        type="button"
                                        onClick={() => setAllowQuestPost(!allowQuestPost)}
                                        className={`font-pixel text-[7px] px-3 py-1.5 rounded border select-none cursor-pointer transition-colors ${allowQuestPost
                                                ? "bg-pixel-green text-black font-bold border-pixel-green"
                                                : "bg-red-500/20 text-red-400 border-red-500/40"
                                            }`}
                                    >
                                        {allowQuestPost ? "ALLOW" : "RESTRICT"}
                                    </button>
                                </div>

                                {/* Sakelar 3: Maintenance Mode */}
                                <div className="flex justify-between items-center p-3 rounded-lg border border-pixel-green/20 bg-[#16241a]">
                                    <span className="font-pixel text-[8px] text-white">GUILD MAINTENANCE LOCK</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsMaintenance(!isMaintenance)}
                                        className={`font-pixel text-[7px] px-3 py-1.5 rounded border select-none cursor-pointer transition-colors ${isMaintenance
                                                ? "bg-yellow-400 text-black font-bold border-yellow-400"
                                                : "bg-pixel-green/15 text-pixel-green border-pixel-green/40"
                                            }`}
                                    >
                                        {isMaintenance ? "LOCKED" : "ACTIVE"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer sudah dihilangkan sepenuhnya */}
        </div>
    );
}