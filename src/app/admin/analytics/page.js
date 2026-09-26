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
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    }, [users]);

    const campusDistribution = useMemo(() => {
        const counts = {};
        rankedUsers.forEach((u) => {
            const campus = u.university?.trim() || (lang === "ID" ? "Tidak Diketahui" : "Unknown");
            counts[campus] = (counts[campus] || 0) + 1;
        });
        const total = rankedUsers.length || 1;
        return Object.entries(counts)
            .map(([campus, count]) => ({ campus, count, percent: Math.round((count / total) * 100) }))
            .sort((a, b) => b.count - a.count);
    }, [rankedUsers, lang]);

    // [BARU] Ringkasan statistik atas — angka nyata, bukan teks statis
    const avgLevel = useMemo(() => {
        if (rankedUsers.length === 0) return 0;
        const total = rankedUsers.reduce((sum, u) => sum + calculateUserLevel(u), 0);
        return Math.round(total / rankedUsers.length);
    }, [rankedUsers]);

    const topCampus = campusDistribution[0]?.campus || "-";

    return (
        // [DIPERBARUI] Tema disamakan dengan halaman admin lain — hitam-
        // kehijauan (#0a140f), border/glow hijau halus, bukan navy + hard-shadow.
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0a140f] min-h-screen selection:bg-pixel-green selection:text-[#0E2A22]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-pixel-green/20 pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8px] text-pixel-green/80 uppercase tracking-wider block mb-1.5">
                        // GUILD INTELLIGENCE &amp; TELEMETRY
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-white">
                        ANALITIK &amp; LEADERBOARD GUILD
                    </h1>
                </div>

                <div className="inline-flex items-center gap-2 border border-pixel-green/40 bg-pixel-green/5 px-3.5 py-1.5 rounded-lg shrink-0">
                    <span className="w-2 h-2 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green whitespace-nowrap">
                        TELEMETRY: REAL-TIME SYNC
                    </span>
                </div>
            </div>

            {/* [BARU] Ringkasan Statistik — angka nyata dari data yang sama
                dipakai leaderboard & distribusi di bawah */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-4 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)]">
                    <span className="font-pixel text-[7px] text-gray-400 uppercase">TOTAL PETUALANG</span>
                    <p className="font-pixel text-xl text-pixel-green mt-1">{rankedUsers.length}</p>
                </div>
                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-4 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)]">
                    <span className="font-pixel text-[7px] text-gray-400 uppercase">RATA-RATA LEVEL</span>
                    <p className="font-pixel text-xl text-cyan-300 mt-1">LV.{avgLevel}</p>
                </div>
                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-4 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)]">
                    <span className="font-pixel text-[7px] text-gray-400 uppercase">TOTAL QUEST</span>
                    <p className="font-pixel text-xl text-yellow-300 mt-1">{quests.length}</p>
                </div>
                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-4 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)]">
                    <span className="font-pixel text-[7px] text-gray-400 uppercase">KAMPUS TERBANYAK</span>
                    <p className="font-pixel text-[10px] text-white mt-1.5 truncate" title={topCampus}>{topCampus}</p>
                </div>
            </div>

            {/* Grid 2 Kolom: Leaderboard & Distribusi Role */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">

                {/* Kolom Kiri: Peringkat Petualang (Leaderboard) */}
                <div className="lg:col-span-7 bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_40px_-15px_rgba(34,197,94,0.4)] flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-pixel-green/20 pb-3">
                        <span className="font-pixel text-[9px] text-pixel-green uppercase">
                            👑 TOP ADVENTURER LEADERBOARD
                        </span>
                        <span className="font-pixel text-[7.5px] bg-pixel-green/10 text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded whitespace-nowrap">
                            BY EXP &amp; LEVEL
                        </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        {rankedUsers.map((u, index) => {
                            const lvl = calculateUserLevel(u);
                            return (
                                <div
                                    key={u.user_id}
                                    className="bg-[#0a140f] border border-pixel-green/20 p-3.5 rounded-xl flex items-center justify-between gap-3 hover:border-pixel-green/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className={`font-pixel text-xs w-6 text-center font-bold ${index === 0 ? "text-yellow-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-600" : "text-gray-500"
                                            }`}>
                                            #{index + 1}
                                        </span>

                                        <div className="w-10 h-10 bg-black border border-pixel-green/50 rounded-full flex items-center justify-center overflow-hidden shrink-0">
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
                    <div className="bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] flex flex-col gap-4">
                        <span className="font-pixel text-[8.5px] text-pixel-green uppercase border-b border-pixel-green/20 pb-2">
                            // DISTRIBUSI KELAS PETUALANG
                        </span>

                        <div className="flex flex-col gap-3">
                            {roleDistribution.map(([roleName, count]) => {
                                const percent = Math.round((count / (users.length - 1 || 1)) * 100);
                                return (
                                    <div key={roleName} className="flex flex-col gap-1">
                                        <div className="flex justify-between font-pixel text-[7.5px] text-gray-300">
                                            <span className="truncate pr-2">{roleName}</span>
                                            <span className="text-pixel-green shrink-0">{count} ({percent}%)</span>
                                        </div>
                                        <div className="h-3 bg-[#0a140f] border border-pixel-green/15 rounded p-0.5">
                                            <div className="h-full bg-pixel-green rounded-sm transition-all duration-500" style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* [DIPERBARUI] Kampus Guild Roster — sekarang grafik batang
                        dinamis dari data user asli, bukan 4 nama kampus statis */}
                    <div className="bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] flex flex-col gap-3">
                        <span className="font-pixel text-[8.5px] text-pixel-green uppercase border-b border-pixel-green/20 pb-2">
                            // DISTRIBUSI KAMPUS TERDAFTAR
                        </span>

                        <div className="flex flex-col gap-3">
                            {campusDistribution.length > 0 ? (
                                campusDistribution.map(({ campus, count, percent }) => (
                                    <div key={campus} className="flex flex-col gap-1">
                                        <div className="flex justify-between font-sans text-[11px] text-gray-300">
                                            <span className="truncate pr-2 flex items-center gap-1.5">🏛️ {campus}</span>
                                            <span className="text-cyan-300 font-pixel text-[7.5px] shrink-0">{count} ({percent}%)</span>
                                        </div>
                                        <div className="h-3 bg-[#0a140f] border border-pixel-green/15 rounded p-0.5">
                                            <div className="h-full bg-cyan-400/80 rounded-sm transition-all duration-500" style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="font-sans text-xs text-gray-500 py-4 text-center">
                                    {lang === "ID" ? "Belum ada data kampus." : "No campus data yet."}
                                </span>
                            )}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}