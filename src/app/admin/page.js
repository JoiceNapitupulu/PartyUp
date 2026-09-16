"use client";

import React, { useState } from "react";
import Footer from "../../components/Footer";
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
};

// Kartu ringkas: label kecil, ikon pixel di pojok, angka besar. Dibuat reusable
// biar konsisten & gampang dirapikan tanpa mengubah data/logic di bawah.
const StatCard = ({ label, value, icon, accentClass }) => (
    <div className="bg-white rounded-xl border-4 border-retro-black p-4 flex flex-col gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-start justify-between gap-2">
            <span className="font-pixel text-[7px] text-retro-dark-gray leading-relaxed tracking-wide">
                {label}
            </span>
            <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${accentClass}`}>
                <PixelIcon rows={icon} className="w-3.5 h-3.5" />
            </span>
        </div>
        <span className="font-pixel text-lg text-retro-black">{value}</span>
    </div>
);

// Baris progress bar dipakai ulang untuk kapasitas & keamanan supaya seragam.
const ProgressRow = ({ icon, label, valueLabel, percent, barClass }) => (
    <div>
        <div className="flex items-center justify-between font-pixel text-[8px] text-retro-black mb-1.5">
            <span className="flex items-center gap-2">
                <span className="text-retro-dark-gray">
                    <PixelIcon rows={icon} className="w-3 h-3" />
                </span>
                {label}
            </span>
            <span>{valueLabel}</span>
        </div>
        <div className="h-4 rounded-md bg-retro-light-gray border-2 border-retro-black p-0.5">
            <div
                className={`h-full rounded-sm ${barClass} transition-all duration-500`}
                style={{ width: `${percent}%` }}
            ></div>
        </div>
    </div>
);

export default function AdminDashboard() {
    // Inisialisasi metrik secara Lazy untuk menghilangkan error set-state-in-effect
    const [usersCount] = useState(() => {
        if (typeof window !== "undefined") {
            const localUsers = localStorage.getItem("usersList");
            return localUsers ? JSON.parse(localUsers).length : usersData.length;
        }
        return usersData.length;
    });

    const [bannedCount] = useState(() => {
        if (typeof window !== "undefined") {
            const localUsers = localStorage.getItem("usersList");
            const list = localUsers ? JSON.parse(localUsers) : usersData;
            return list.filter((u) => u.isBanned).length;
        }
        return 0;
    });

    const [projectsCount] = useState(() => {
        if (typeof window !== "undefined") {
            const localProjects = localStorage.getItem("projectsList");
            return localProjects ? JSON.parse(localProjects).length : projectsData.length;
        }
        return projectsData.length;
    });

    const capacityPercent = Math.min(Math.round((projectsCount / 10) * 100), 100);

    return (
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            {/* HEADER */}
            <div className="flex flex-wrap justify-between items-end gap-3 border-b-2 border-retro-black pb-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-pixel text-base text-retro-black">DATABASE DIAGNOSTICS & STATUS</h1>
                    <p className="font-sans text-xs text-retro-dark-gray">
                        Ringkasan aktivitas guild dan kesehatan sistem PartyUp! secara real-time.
                    </p>
                </div>
                <span className="font-pixel text-[8px] text-white bg-retro-black px-2.5 py-1.5 rounded-md">
                    SYS_TIME: 2026_EST
                </span>
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    label="TOTAL ACADEMY ADVENTURERS"
                    value={`${usersCount} CHARS`}
                    icon={ICONS.users}
                    accentClass="bg-navy-blue/10 text-navy-blue"
                />
                <StatCard
                    label="DISPATCHED COMMUNITY QUESTS"
                    value={`${projectsCount} QUESTS`}
                    icon={ICONS.quest}
                    accentClass="bg-pixel-green/20 text-pixel-green-dark"
                />
                <StatCard
                    label="BANNED ACCOUNTS"
                    value={`${bannedCount} BLOCKED`}
                    icon={ICONS.ban}
                    accentClass="bg-red-500/10 text-red-500"
                />
            </div>

            {/* Metrics System */}
            <div className="bg-white rounded-xl border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span className="font-pixel text-[9px] text-navy-blue tracking-wide">
                        SYSTEM CAPACITY AND ENGINE READOUTS
                    </span>
                    <span className="w-7 h-7 shrink-0 rounded-lg bg-navy-blue/10 text-navy-blue flex items-center justify-center">
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
                        barClass="bg-navy-blue border border-black"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}