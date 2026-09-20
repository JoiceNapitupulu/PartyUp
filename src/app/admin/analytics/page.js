"use client";

import React, { useState, useEffect, useMemo } from "react";
import PixelAvatar from "@/components/PixelAvatar";
import PixelTechIcon from "@/components/PixelTechIcon";
import { usersData, calculateUserLevel } from "@/utils/auth";
import { fetchAllProfiles, fetchAllQuests } from "@/services/dataService";
import { useLanguage } from "@/utils/lang";

export default function AdminAnalytics() {
    const { lang } = useLanguage();
    const [users, setUsers] = useState(usersData);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const u = await fetchAllProfiles();
                setUsers(u);
                const q = await fetchAllQuests();
                setQuests(q);
            } catch (e) {
                console.error(e);
            }
        };
        loadData();
    }, []);

    // Leaderboard Mahasiswa Diurutkan dari Level Tertinggi
    const rankedUsers = useMemo(() => {
        return [...users]
            .filter((u) => u.role !== "Admin" && u.user_id !== "USR-000")
            .sort((a, b) => calculateUserLevel(b) - calculateUserLevel(a));
    }, [users]);

    // Statistik Distribusi Kelas
    const roleDistribution = useMemo(() => {
        const counts = {};
        users.forEach((u) => {
            if (u.role !== "Admin") {
                counts[u.role] = (counts[u.role] || 0) + 1;
            }
        });
        return Object.entries(counts);
    }, [users]);

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0c1322] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-retro-black pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider block mb-1">
            // GUILD INTELLIGENCE & TELEMETRY
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-yellow-300">
                        [ ANALITIK &amp; LEADERBOARD GUILD ]
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-[#121b2d] border-2 border-retro-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green">
                        TELEMETRY: REAL-TIME SYNC
                    </span>
                </div>
            </div>

            {/* Grid 2 Kolom: Leaderboard & Distribusi Role */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">

                {/* Kolom Kiri: Peringkat Petualang (Leaderboard) */}
                <div className="lg:col-span-7 bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b-2 border-gray-700/80 pb-3">
                        <span className="font-pixel text-[9px] text-yellow-400 uppercase">
                            👑 TOP ADVENTURER LEADERBOARD
                        </span>
                        <span className="font-pixel text-[7.5px] bg-[#18233a] text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded">
                            BY EXP &amp; LEVEL
                        </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        {rankedUsers.map((u, index) => {
                            const lvl = calculateUserLevel(u);
                            return (
                                <div
                                    key={u.user_id}
                                    className="bg-[#18233a] border-2 border-retro-black p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm hover:border-yellow-400 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className={`font-pixel text-xs w-6 text-center font-bold ${index === 0 ? "text-yellow-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-600" : "text-gray-500"
                                            }`}>
                                            #{index + 1}
                                        </span>

                                        <div className="w-10 h-10 bg-retro-black border border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                            <PixelAvatar role={u.role} size="w-full h-full" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-pixel text-[9.5px] text-white font-bold truncate">{u.name}</p>
                                            <p className="font-sans text-[10px] text-gray-400 truncate">{u.university} • {u.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="font-pixel text-[8.5px] bg-pixel-green/20 text-pixel-green border border-pixel-green/40 px-2.5 py-1 rounded font-bold">
                                            LV.{lvl}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Kolom Kanan: Distribusi Role & Kampus */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Distribusi Kelas */}
                    <div className="bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                        <span className="font-pixel text-[8.5px] text-yellow-400 uppercase border-b-2 border-gray-700/80 pb-2">
              // DISTRIBUSI KELAS PETUALANG
                        </span>

                        <div className="flex flex-col gap-3">
                            {roleDistribution.map(([roleName, count]) => {
                                const percent = Math.round((count / (users.length - 1 || 1)) * 100);
                                return (
                                    <div key={roleName} className="flex flex-col gap-1">
                                        <div className="flex justify-between font-pixel text-[7.5px] text-gray-300">
                                            <span>{roleName}</span>
                                            <span className="text-yellow-400">{count} ({percent}%)</span>
                                        </div>
                                        <div className="h-3 bg-[#18233a] border border-retro-black rounded p-0.5">
                                            <div className="h-full bg-pixel-green rounded-sm transition-all duration-500" style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Kampus Guild Roster */}
                    <div className="bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                        <span className="font-pixel text-[8.5px] text-yellow-400 uppercase border-b-2 border-gray-700/80 pb-2">
              // KAMPUS TERDAFTAR
                        </span>
                        <div className="flex flex-wrap gap-1.5 font-sans text-xs text-gray-300">
                            <span className="bg-[#18233a] px-2.5 py-1 border border-gray-700 rounded">🏛️ Universitas Indonesia</span>
                            <span className="bg-[#18233a] px-2.5 py-1 border border-gray-700 rounded">🏛️ ITB</span>
                            <span className="bg-[#18233a] px-2.5 py-1 border border-gray-700 rounded">🏛️ Universitas Udayana</span>
                            <span className="bg-[#18233a] px-2.5 py-1 border border-gray-700 rounded">🏛️ UGM</span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}