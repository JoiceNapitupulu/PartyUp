"use client";

import React, { useState } from "react";
import { projectsData } from "@/utils/auth";

export default function AdminQuests() {
    const [logs, setLogs] = useState(["[SYSTEM] Quest Audit system connected."]);

    // Lazy Initialization untuk mencegah error set-state-in-effect
    const [projects, setProjects] = useState(() => {
        if (typeof window !== "undefined") {
            const localProjects = localStorage.getItem("projectsList");
            return localProjects ? JSON.parse(localProjects) : projectsData;
        }
        return projectsData;
    });

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
    };

    const handleToggleVerify = (projectId, projectTitle) => {
        const updated = projects.map((p) =>
            p.project_id === projectId ? { ...p, isVerified: !p.isVerified } : p
        );
        setProjects(updated);
        localStorage.setItem("projectsList", JSON.stringify(updated));
        const verifiedNow = updated.find((p) => p.project_id === projectId)?.isVerified;
        addLog(`VERIFICATION: Quest [${projectTitle}] is now ${verifiedNow ? "★ GUILD VERIFIED" : "UNVERIFIED"}.`);
    };

    const handleDeleteQuest = (projectId, projectTitle) => {
        const updated = projects.filter((p) => p.project_id !== projectId);
        setProjects(updated);
        localStorage.setItem("projectsList", JSON.stringify(updated));
        addLog(`DATABASE: Quest [${projectTitle}] (${projectId}) deleted permanently.`);
    };

    return (
        // BACKGROUND UTAMA: Menggunakan bg-[#0a120c] sama persis dengan Dashboard
        <div className="flex-grow min-h-screen bg-[#0a120c] p-6 md:p-8 flex flex-col gap-6 text-white">

            {/* HEADER: Seragam dengan header Diagnostics & Status */}
            <div className="flex flex-wrap justify-between items-end gap-3 border-b-2 border-pixel-green/25 pb-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-pixel text-base text-white">QUEST BOARD SANITIZATION &amp; AUDIT</h1>
                    <p className="font-sans text-xs text-emerald-200/60">
                        Audit integritas quest, status verifikasi guild, dan sanitasi database.
                    </p>
                </div>
                <span className="font-pixel text-[8px] text-pixel-green bg-[#0f1b13] border border-pixel-green/30 px-2.5 py-1.5 rounded-md">
                    SYS_QUESTS: ACTIVE ({projects.length})
                </span>
            </div>

            {/* CONTAINER UTAMA: Format Box bg-[#0f1b13] rounded-xl border-4 */}
            <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-pixel-green/15 pb-3">
                    <span className="font-pixel text-[9px] text-pixel-green tracking-wide">
                        // AUDIT &amp; VERIFY ACTIVE QUESTS
                    </span>
                    <span className="font-pixel text-[8px] text-emerald-200/70">
                        ROSTER COUNT: {projects.length} QUESTS
                    </span>
                </div>

                {/* Grid Daftar Quest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((item) => (
                        <div
                            key={item.project_id}
                            className={`p-4 rounded-xl border-2 flex flex-col justify-between gap-3 transition-all ${item.isVerified
                                    ? "bg-[#16241a] border-pixel-green/80 shadow-[0_0_10px_rgba(0,255,102,0.15)]"
                                    : "bg-[#0a120c] border-pixel-green/25 hover:border-pixel-green/50"
                                }`}
                        >
                            <div className="text-left">
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <p className="font-pixel text-[9px] text-white font-bold leading-relaxed">
                                        {item.title}
                                    </p>
                                    {item.isVerified ? (
                                        <span className="font-pixel text-[7px] bg-pixel-green text-black px-2 py-0.5 rounded font-bold shrink-0">
                                            ★ VERIFIED
                                        </span>
                                    ) : (
                                        <span className="font-pixel text-[7px] bg-[#16241a] text-emerald-200/60 border border-pixel-green/20 px-1.5 py-0.5 rounded shrink-0">
                                            UNVERIFIED
                                        </span>
                                    )}
                                </div>

                                <p className="font-pixel text-[7px] text-emerald-200/70">
                                    ID: {item.project_id} • AUTHOR: {item.author}
                                </p>
                                <p className="font-pixel text-[7px] text-emerald-300/50 mt-0.5">
                                    CAT: {item.category}
                                </p>
                                <p className="font-sans text-[11px] text-gray-300 leading-snug mt-2 opacity-85">
                                    {item.description}
                                </p>
                            </div>

                            {/* Tombol Aksi Senada Palet Dashboard */}
                            <div className="flex justify-end gap-2 border-t border-pixel-green/15 pt-3 mt-1">
                                <button
                                    onClick={() => handleToggleVerify(item.project_id, item.title)}
                                    className={`font-pixel text-[7px] py-1.5 px-3 rounded-lg border select-none cursor-pointer transition-colors active:translate-y-[1px] ${item.isVerified
                                            ? "bg-pixel-green text-black border-pixel-green font-bold hover:bg-[#20e872]"
                                            : "bg-pixel-green/15 text-pixel-green border-pixel-green/40 hover:bg-pixel-green hover:text-black"
                                        }`}
                                >
                                    {item.isVerified ? "[★ VERIFIED ✓]" : "[VERIFY QUEST]"}
                                </button>
                                <button
                                    onClick={() => handleDeleteQuest(item.project_id, item.title)}
                                    className="font-pixel text-[7px] py-1.5 px-3 bg-red-500/15 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white select-none cursor-pointer transition-colors active:translate-y-[1px]"
                                >
                                    [DELETE]
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TERMINAL LOGS: Menggunakan gaya box senada */}
            <div className="bg-[#0f1b13] rounded-xl border-4 border-pixel-green/25 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between border-b border-pixel-green/20 pb-2 mb-2">
                    <span className="font-pixel text-[8px] text-pixel-green">// REAL-TIME AUDIT LOGS</span>
                    <span className="font-pixel text-[7px] text-emerald-200/50">SYS_CONSOLE</span>
                </div>
                <div className="font-mono text-[10px] text-pixel-green space-y-1 max-h-[85px] overflow-y-auto">
                    {logs.map((log, index) => (
                        <div key={index} className="leading-tight">{log}</div>
                    ))}
                </div>
            </div>

            {/* Catatan: Komponen <Footer /> sudah dihapus */}
        </div>
    );
}