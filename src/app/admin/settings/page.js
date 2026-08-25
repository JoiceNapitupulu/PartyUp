"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import { getCurrentUser } from "@/utils/auth"; // Menggunakan utilitas aman Anda

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

        // Simpan pembaruan data bio admin ke localStorage secara aman
        localStorage.setItem("currentUser", JSON.stringify(admin));

        // Sinkronisasikan juga ke usersList global agar database konsisten
        const storedUsers = localStorage.getItem("usersList");
        if (storedUsers) {
            const parsed = JSON.parse(storedUsers);
            const updatedList = parsed.map((u) => u.user_id === admin.user_id ? admin : u);
            localStorage.setItem("usersList", JSON.stringify(updatedList));
        }

        // Trigger update header
        window.dispatchEvent(new Event("auth-change"));

        setStatusMsg("[SUCCESS] ADMIN COGNITIVE DATABASE UPDATED!");
        setTimeout(() => setStatusMsg(""), 3000);
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
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <h1 className="font-pixel text-base text-retro-black">SYSTEM CONFIG &amp; SETTINGS</h1>
                <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_SETT: ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Kolom Kiri: Profil Admin Card (Bisa Diedit & Disimpan) */}
                <form onSubmit={handleSaveProfile} className="lg:col-span-6 bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                    <h2 className="font-pixel text-[10px] text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-1">
                        ADMINISTRATOR STAT SHEET
                    </h2>

                    {/* Avatar statis */}
                    <div className="flex items-center gap-4 border-b border-dashed border-retro-black/15 pb-4">
                        <div className="w-16 h-16 bg-retro-gray border-4 border-retro-black flex items-center justify-center font-pixel text-2xl text-navy-blue font-bold shadow-inner">
                            A
                        </div>
                        <div className="text-left leading-tight">
                            <p className="font-pixel text-[10px] text-retro-black">{admin.name}</p>
                            <p className="font-pixel text-[7px] text-pixel-green-dark mt-1">ID: {admin.user_id} • Grand Master</p>
                        </div>
                    </div>

                    {/* Form input bio */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-pixel text-[8px] text-retro-black">ADMINISTRATOR BIO LOG:</label>
                        <textarea
                            rows={3}
                            value={admin.bio || ""}
                            onChange={(e) => setAdmin({ ...admin, bio: e.target.value })}
                            className="font-sans text-xs p-2 bg-white border-2 border-retro-black focus:outline-none resize-none"
                            placeholder="Write administrative bio..."
                        />
                    </div>

                    {statusMsg && (
                        <p className="font-pixel text-[8px] text-green-600 text-center animate-pulse">
                            {statusMsg}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full font-pixel text-[10px] py-2.5 bg-pixel-green text-retro-black border-2 border-retro-black hover:bg-pixel-green-dark shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    >
                        SAVE CHANGES
                    </button>
                </form>

                {/* Kolom Kanan: Sakelar Fitur Sistem RPG & Announcement Dispatcher */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                    {/* Announcement Dispatcher */}
                    <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                        <h2 className="font-pixel text-[10px] text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-1 flex items-center gap-2">
                            <span>👑</span> GLOBAL GUILD ANNOUNCEMENT TICKER
                        </h2>

                        <div className="flex flex-col gap-2">
                            <label className="font-pixel text-[8px] text-retro-black">REAL-TIME BROADCAST MESSAGE:</label>
                            <input
                                type="text"
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                placeholder="e.g. ✦ INVENTION 2026 PARTY MATCHMAKING IS NOW LIVE! ✦"
                                className="font-sans text-xs p-2.5 bg-yellow-50/50 border-2 border-retro-black focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleBroadcastAnnouncement}
                                className="flex-1 font-pixel text-[8px] py-2 bg-yellow-400 text-retro-black border-2 border-retro-black hover:bg-yellow-300 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px]"
                            >
                                [BROADCAST TICKER]
                            </button>
                            <button
                                type="button"
                                onClick={handleClearAnnouncement}
                                className="font-pixel text-[8px] py-2 px-3 bg-red-500 text-white border-2 border-retro-black hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px]"
                            >
                                [CLEAR]
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                        <h2 className="font-pixel text-[10px] text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-1">
                            GUILD ENGINE CONFIG
                        </h2>

                        <div className="space-y-4">
                            {/* Input Nama Guild */}
                            <div className="flex flex-col gap-1.5 border-b border-retro-light-gray pb-3">
                                <label className="font-pixel text-[8px] text-retro-black">GLOBAL GUILD NAME:</label>
                                <input
                                    type="text"
                                    value={guildName}
                                    onChange={(e) => setGuildName(e.target.value.toUpperCase())}
                                    className="font-sans text-xs p-2 bg-white border-2 border-retro-black focus:outline-none"
                                />
                            </div>

                            {/* Toggle Sakelar Sakti RPG */}
                            <div className="space-y-3">
                                <label className="block font-pixel text-[8px] text-retro-black mb-2">SYSTEM PARAMETERS:</label>

                                {/* Sakelar 1: BGM */}
                                <div className="flex justify-between items-center p-2 border-2 border-retro-black bg-retro-light-gray">
                                    <span className="font-pixel text-[9px] text-retro-black">8-BIT BGM CHIPTUNE OUTPUT</span>
                                    <button
                                        onClick={() => setIsBgmOn(!isBgmOn)}
                                        className={`font-pixel text-[8px] px-3 py-1 border-2 border-retro-black cursor-pointer ${isBgmOn ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {isBgmOn ? "ON" : "OFF"}
                                    </button>
                                </div>

                                {/* Sakelar 2: Batasi Posting Quest */}
                                <div className="flex justify-between items-center p-2 border-2 border-retro-black bg-retro-light-gray">
                                    <span className="font-pixel text-[9px] text-retro-black">ALLOW ADVENTURER POST QUEST</span>
                                    <button
                                        onClick={() => setAllowQuestPost(!allowQuestPost)}
                                        className={`font-pixel text-[8px] px-3 py-1 border-2 border-retro-black cursor-pointer ${allowQuestPost ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {allowQuestPost ? "ALLOW" : "RESTRICT"}
                                    </button>
                                </div>

                                {/* Sakelar 3: Maintenance Mode */}
                                <div className="flex justify-between items-center p-2 border-2 border-retro-black bg-retro-light-gray">
                                    <span className="font-pixel text-[9px] text-retro-black">GUILD MAINTENANCE LOCK</span>
                                    <button
                                        onClick={() => setIsMaintenance(!isMaintenance)}
                                        className={`font-pixel text-[8px] px-3 py-1 border-2 border-retro-black cursor-pointer ${isMaintenance ? "bg-yellow-500 text-black" : "bg-green-500 text-white"
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

            <Footer />
        </div>
    );
}