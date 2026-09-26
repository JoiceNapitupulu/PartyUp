"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usersData, projectsData } from "../../utils/auth";

const PixelIcon = ({ rows, className = "w-4 h-4" }) => {
    const size = rows.length;
    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            className={className}
            fill="currentColor"
            shapeRendering="crispEdges"
        >
            {rows.map((row, y) =>
                row.split("").map((cell, x) =>
                    cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
                )
            )}
        </svg>
    );
};

const ICONS = {
    users: ["0011100", "0111110", "0111110", "0011100", "0000000", "0111110", "1111111"],
    quest: ["1000000", "1111000", "1111100", "1111000", "1000000", "1000000", "1000000"],
    ban: ["0111100", "1100110", "1011010", "1010110", "1101100", "0111100", "0000000"],
    gauge: ["0011100", "0100010", "1000001", "1010101", "1000001", "1000001", "0111110"],
    shield: ["0111100", "1100110", "1000010", "1000010", "0100100", "0011000", "0011000"],
    // [BARU] ikon tambahan untuk panel grafik & aktivitas — gaya & resolusi
    // (grid 7x7) disamakan dengan ikon yang sudah ada di file ini.
    chart: ["0000000", "0000010", "0000010", "0010010", "0010010", "0110110", "1111111"],
    clock: ["0011100", "0100010", "1000101", "1001101", "1000001", "0100010", "0011100"],
    external: ["0001111", "0000011", "0001101", "0011001", "0110001", "1100001", "1111111"],
};

// Kartu ringkas: label kecil, ikon pixel di pojok, angka besar. Dibuat reusable
// biar konsisten & gampang dirapikan tanpa mengubah data/logic di bawah.
// PALET DIGANTI ke tema gelap hijau senada sidebar (bukan putih lagi).
const StatCard = ({ label, value, icon, accentClass }) => (
    <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-4 flex flex-col gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between gap-2">
            <span className="font-pixel text-[7px] text-emerald-200/70 leading-relaxed tracking-wide">
                {label}
            </span>
            <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${accentClass}`}>
                <PixelIcon rows={icon} className="w-3.5 h-3.5" />
            </span>
        </div>
        <span className="font-pixel text-lg text-white">{value}</span>
    </div>
);

// Baris progress bar dipakai ulang untuk kapasitas & keamanan supaya seragam.
// Track & label ikut dipadankan ke tema gelap hijau.
const ProgressRow = ({ icon, label, valueLabel, percent, barClass }) => (
    <div>
        <div className="flex items-center justify-between font-pixel text-[8px] text-white mb-1.5">
            <span className="flex items-center gap-2">
                <span className="text-emerald-300">
                    <PixelIcon rows={icon} className="w-3 h-3" />
                </span>
                {label}
            </span>
            <span className="text-emerald-200">{valueLabel}</span>
        </div>
        <div className="h-4 rounded-md bg-[#16241a] border-2 border-pixel-green/25 p-0.5">
            <div
                className={`h-full rounded-sm ${barClass} transition-all duration-500`}
                style={{ width: `${percent}%` }}
            ></div>
        </div>
    </div>
);

// [BARU] Panel wrapper reusable untuk section grafik/daftar baru di bawah,
// supaya border/glow/heading-nya konsisten dengan kartu-kartu di atas.
const PanelCard = ({ title, icon, right, children }) => (
    <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
            <span className="font-pixel text-[9px] text-pixel-green tracking-wide flex items-center gap-2">
                <span className="w-7 h-7 shrink-0 rounded-lg bg-pixel-green/10 text-pixel-green flex items-center justify-center">
                    <PixelIcon rows={icon} className="w-3.5 h-3.5" />
                </span>
                {title}
            </span>
            {right}
        </div>
        {children}
    </div>
);

const timeAgo = (iso, lang) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return lang === "EN" ? "just now" : "baru saja";
    if (mins < 60) return `${mins}m ${lang === "EN" ? "ago" : "lalu"}`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}j ${lang === "EN" ? "ago" : "lalu"}`;
    const days = Math.floor(hrs / 24);
    return `${days}h ${lang === "EN" ? "ago" : "lalu"}`;
};

export default function AdminDashboard() {
    // [DIPERBARUI] Sekarang menyimpan SELURUH list (bukan cuma angka)
    // supaya bisa dipakai membangun grafik & feed aktivitas di bawah.
    // Nilai usersCount/bannedCount/projectsCount hasil turunannya PERSIS
    // SAMA seperti perhitungan sebelumnya — tidak ada logic yang berubah.
    const [usersList] = useState(() => {
        if (typeof window !== "undefined") {
            const local = localStorage.getItem("usersList");
            return local ? JSON.parse(local) : usersData;
        }
        return usersData;
    });

    const [projectsList] = useState(() => {
        if (typeof window !== "undefined") {
            const local = localStorage.getItem("projectsList");
            return local ? JSON.parse(local) : projectsData;
        }
        return projectsData;
    });

    const usersCount = usersList.length;
    const bannedCount = usersList.filter((u) => u.isBanned).length;
    const projectsCount = projectsList.length;
    const capacityPercent = Math.min(Math.round((projectsCount / 10) * 100), 100);

    // [BARU] Grafik aktivitas quest 7 hari terakhir — dihitung dari field
    // `created_at` tiap quest asli (kalau ada), bukan data dummy.
    const questActivity = useMemo(() => {
        const days = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            days.push({
                key: d.toISOString().slice(0, 10),
                label: d.toLocaleDateString("id-ID", { weekday: "short" }),
                count: 0,
            });
        }
        projectsList.forEach((p) => {
            if (!p.created_at) return;
            const key = new Date(p.created_at).toISOString().slice(0, 10);
            const day = days.find((d) => d.key === key);
            if (day) day.count += 1;
        });
        const max = Math.max(1, ...days.map((d) => d.count));
        return days.map((d) => ({ ...d, percent: Math.round((d.count / max) * 100) }));
    }, [projectsList]);

    const hasActivityThisWeek = questActivity.some((d) => d.count > 0);

    // [BARU] Distribusi kategori quest — Top 5, dari data quest asli.
    const categoryDistribution = useMemo(() => {
        const counts = {};
        projectsList.forEach((p) => {
            const cat = p.category || "Lainnya";
            counts[cat] = (counts[cat] || 0) + 1;
        });
        const total = projectsList.length || 1;
        return Object.entries(counts)
            .map(([category, count]) => ({ category, count, percent: Math.round((count / total) * 100) }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [projectsList]);

    // [BARU] Feed aktivitas terbaru — 5 quest terakhir dibuat, dari data asli.
    const recentQuests = useMemo(() => {
        return [...projectsList]
            .filter((p) => p.created_at)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
    }, [projectsList]);

    return (
        // PERBAIKAN UTAMA: background halaman sekarang gelap hijau senada
        // sidebar (bukan putih lagi), supaya seluruh dashboard admin terasa
        // satu tema yang konsisten.
        <div className="flex-grow min-h-screen bg-[#0a120c] p-6 md:p-8 flex flex-col gap-6">
            {/* HEADER */}
            <div className="flex flex-wrap justify-between items-end gap-3 border-b-2 border-pixel-green/25 pb-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-pixel text-base text-white">DATABASE DIAGNOSTICS & STATUS</h1>
                    <p className="font-sans text-xs text-emerald-200/60">
                        Ringkasan aktivitas guild dan kesehatan sistem PartyUp! secara real-time.
                    </p>
                </div>
                <span className="font-pixel text-[8px] text-pixel-green bg-[#0f1b13] border border-pixel-green/30 px-2.5 py-1.5 rounded-md">
                    SYS_TIME: 2026_EST
                </span>
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    label="TOTAL ACADEMY ADVENTURERS"
                    value={`${usersCount} CHARS`}
                    icon={ICONS.users}
                    accentClass="bg-sky-400/10 text-sky-300"
                />
                <StatCard
                    label="DISPATCHED COMMUNITY QUESTS"
                    value={`${projectsCount} QUESTS`}
                    icon={ICONS.quest}
                    accentClass="bg-pixel-green/15 text-pixel-green"
                />
                <StatCard
                    label="BANNED ACCOUNTS"
                    value={`${bannedCount} BLOCKED`}
                    icon={ICONS.ban}
                    accentClass="bg-red-500/15 text-red-400"
                />
            </div>

            {/* Metrics System */}
            <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span className="font-pixel text-[9px] text-pixel-green tracking-wide">
                        SYSTEM CAPACITY AND ENGINE READOUTS
                    </span>
                    <span className="w-7 h-7 shrink-0 rounded-lg bg-pixel-green/10 text-pixel-green flex items-center justify-center">
                        <PixelIcon rows={ICONS.gauge} className="w-3.5 h-3.5" />
                    </span>
                </div>

                <div className="space-y-4">
                    <ProgressRow
                        icon={ICONS.gauge}
                        label="GUILD ENGINE CAPACITY"
                        valueLabel={`${capacityPercent}%`}
                        percent={capacityPercent}
                        barClass="bg-pixel-green border border-black"
                    />
                    <ProgressRow
                        icon={ICONS.shield}
                        label="DATABASE SECURITY STATUS"
                        valueLabel="100% SECURE"
                        percent={100}
                        barClass="bg-sky-400 border border-black"
                    />
                </div>
            </div>

            {/* [BARU] GRAFIK & INFORMASI DINAMIS — grid 2 kolom: chart
                aktivitas + kategori di kiri, feed aktivitas terbaru di kanan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Kolom Kiri: Chart Aktivitas 7 Hari + Top Kategori */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <PanelCard
                        title="QUEST ACTIVITY — 7 HARI TERAKHIR"
                        icon={ICONS.chart}
                        right={
                            <span className="font-pixel text-[7px] text-emerald-200/60">
                                TOTAL: {questActivity.reduce((s, d) => s + d.count, 0)} QUEST
                            </span>
                        }
                    >
                        <div className="flex items-end justify-between gap-2 h-32 px-1">
                            {questActivity.map((d) => (
                                <div key={d.key} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                                    <span className="font-pixel text-[7px] text-emerald-200/70">{d.count}</span>
                                    <div className="w-full max-w-[22px] h-full bg-[#16241a] border border-pixel-green/20 rounded-t-md flex items-end overflow-hidden">
                                        <div
                                            className="w-full bg-pixel-green transition-all duration-500"
                                            style={{ height: `${Math.max(d.percent, 4)}%` }}
                                        />
                                    </div>
                                    <span className="font-pixel text-[6.5px] text-emerald-200/50 capitalize">{d.label}</span>
                                </div>
                            ))}
                        </div>
                        {!hasActivityThisWeek && (
                            <p className="font-sans text-[10px] text-emerald-200/40 text-center -mt-2">
                                Belum ada quest baru dalam 7 hari terakhir.
                            </p>
                        )}
                    </PanelCard>

                    <PanelCard title="TOP 5 KATEGORI QUEST" icon={ICONS.quest}>
                        <div className="flex flex-col gap-3">
                            {categoryDistribution.length > 0 ? (
                                categoryDistribution.map(({ category, count, percent }) => (
                                    <div key={category} className="flex flex-col gap-1">
                                        <div className="flex justify-between font-pixel text-[7.5px] text-emerald-100">
                                            <span className="truncate pr-2">{category}</span>
                                            <span className="text-pixel-green shrink-0">{count} ({percent}%)</span>
                                        </div>
                                        <div className="h-3 bg-[#16241a] border border-pixel-green/20 rounded p-0.5">
                                            <div className="h-full bg-pixel-green rounded-sm transition-all duration-500" style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="font-sans text-xs text-emerald-200/40 py-2 text-center">Belum ada data kategori.</span>
                            )}
                        </div>
                    </PanelCard>
                </div>

                {/* Kolom Kanan: Feed Aktivitas Terbaru + Akses Cepat */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <PanelCard title="AKTIVITAS TERBARU" icon={ICONS.clock}>
                        <div className="flex flex-col gap-2.5">
                            {recentQuests.length > 0 ? (
                                recentQuests.map((q) => (
                                    <div
                                        key={q.project_id || q.id}
                                        className="bg-[#16241a] border border-pixel-green/20 rounded-lg p-3 flex items-start justify-between gap-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-pixel text-[8px] text-white truncate">{q.title}</p>
                                            <p className="font-sans text-[10px] text-emerald-200/50 truncate">{q.category || "Lainnya"}</p>
                                        </div>
                                        <span className="font-pixel text-[6.5px] text-emerald-200/60 shrink-0 whitespace-nowrap pt-0.5">
                                            {timeAgo(q.created_at)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <span className="font-sans text-xs text-emerald-200/40 py-4 text-center">
                                    Belum ada aktivitas quest tercatat.
                                </span>
                            )}
                        </div>
                    </PanelCard>

                    <PanelCard title="AKSES CEPAT" icon={ICONS.external}>
                        <div className="grid grid-cols-2 gap-2.5">
                            <Link
                                href="/admin/users"
                                className="font-pixel text-[7.5px] text-emerald-100 bg-[#16241a] hover:bg-pixel-green/15 hover:text-pixel-green border border-pixel-green/20 hover:border-pixel-green/50 rounded-lg p-3 flex flex-col gap-1.5 transition-colors"
                            >
                                <PixelIcon rows={ICONS.users} className="w-3.5 h-3.5" />
                                DIREKTORI USER
                            </Link>
                            <Link
                                href="/admin/quests"
                                className="font-pixel text-[7.5px] text-emerald-100 bg-[#16241a] hover:bg-pixel-green/15 hover:text-pixel-green border border-pixel-green/20 hover:border-pixel-green/50 rounded-lg p-3 flex flex-col gap-1.5 transition-colors"
                            >
                                <PixelIcon rows={ICONS.quest} className="w-3.5 h-3.5" />
                                AUDIT QUEST
                            </Link>
                            <Link
                                href="/admin/analytics"
                                className="font-pixel text-[7.5px] text-emerald-100 bg-[#16241a] hover:bg-pixel-green/15 hover:text-pixel-green border border-pixel-green/20 hover:border-pixel-green/50 rounded-lg p-3 flex flex-col gap-1.5 transition-colors"
                            >
                                <PixelIcon rows={ICONS.chart} className="w-3.5 h-3.5" />
                                ANALITIK
                            </Link>
                            <Link
                                href="/admin/settings"
                                className="font-pixel text-[7.5px] text-emerald-100 bg-[#16241a] hover:bg-pixel-green/15 hover:text-pixel-green border border-pixel-green/20 hover:border-pixel-green/50 rounded-lg p-3 flex flex-col gap-1.5 transition-colors"
                            >
                                <PixelIcon rows={ICONS.gauge} className="w-3.5 h-3.5" />
                                PENGATURAN
                            </Link>
                        </div>
                    </PanelCard>
                </div>
            </div>
        </div>
    );
}