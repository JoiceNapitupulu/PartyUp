"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { projectsData } from "@/utils/auth";

export default function AdminQuests() {
    const [logs, setLogs] = useState(["[SYSTEM] Quest Audit & Verification system connected."]);
    const [projects, setProjects] = useState([]);

    // 1. Load data proyek secara aman (Client-side sync)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localProjects = localStorage.getItem("projectsList");
            if (localProjects) {
                try {
                    const parsed = JSON.parse(localProjects);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setProjects(parsed);
                    } else {
                        setProjects(projectsData);
                        localStorage.setItem("projectsList", JSON.stringify(projectsData));
                    }
                } catch (e) {
                    setProjects(projectsData);
                    localStorage.setItem("projectsList", JSON.stringify(projectsData));
                }
            } else {
                setProjects(projectsData);
                localStorage.setItem("projectsList", JSON.stringify(projectsData));
            }
        }
    }, []);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
    };

    const saveProjects = (updatedProjects) => {
        setProjects(updatedProjects);
        localStorage.setItem("projectsList", JSON.stringify(updatedProjects));

        // Memicu event perubahan global agar Quest Board (/board) langsung mengupdate tampilannya
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("projectsChange"));
            window.dispatchEvent(new Event("authChange"));
        }
    };

    // 2. Fungsi Fitur Baru: Verifikasi / Unverifikasi Quest Resmi Admin
    const handleToggleVerify = (projectId, projectTitle) => {
        const updated = projects.map((p) =>
            p.project_id === projectId ? { ...p, isVerified: !p.isVerified } : p
        );
        saveProjects(updated);

        const target = updated.find((p) => p.project_id === projectId);
        addLog(
            `MODERATOR: ${target?.isVerified ? "VERIFIED ★" : "UNVERIFIED"} Quest [${projectTitle}] (${projectId})`
        );
    };

    // 3. Fungsi Hapus Quest
    const handleDeleteQuest = (projectId, projectTitle) => {
        const updated = projects.filter((p) => p.project_id !== projectId);
        saveProjects(updated);
        addLog(`DATABASE: Quest [${projectTitle}] (${projectId}) deleted permanently.`);
    };

    // 4. Reset Data Misi ke Default
    const handleResetProjects = () => {
        localStorage.removeItem("projectsList");
        setProjects(projectsData);
        localStorage.setItem("projectsList", JSON.stringify(projectsData));
        addLog("[SYSTEM] QUEST DATABASE RESET TO DEFAULT INITIAL STATE.");
    };

    return (
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            {/* Header Terminal */}
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <div>
                    <h1 className="font-pixel text-base text-retro-black">QUEST AUDIT & VERIFICATION</h1>
                    <p className="font-pixel text-[8px] text-retro-dark-gray mt-1">OFFICIAL GUILD MODERATION CONTROL</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleResetProjects}
                        className="font-pixel text-[7px] bg-gray-200 hover:bg-gray-300 border border-retro-black px-2 py-1 cursor-pointer active:translate-y-[1px]"
                    >
                        RESET QUESTS
                    </button>
                    <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2 py-1 border border-retro-black">
                        SYS_QUESTS: ACTIVE
                    </span>
                </div>
            </div>

            {/* Panel Audit Kartu Quest */}
            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-2 border-retro-light-gray pb-2">
                    <span className="font-pixel text-[9px] text-navy-blue">// ACTIVE QUEST DIRECTORY AUDIT</span>
                    <span className="font-pixel text-[8px] text-retro-dark-gray">
                        TOTAL: {projects.length} QUESTS
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {projects.map((item) => {
                        const isVerified = Boolean(item.isVerified);

                        return (
                            <div
                                key={item.project_id}
                                className={`p-4 border-4 flex flex-col justify-between gap-4 transition-all ${isVerified
                                        ? "border-amber-500 bg-amber-50/40 shadow-[4px_4px_0px_0px_rgba(245,158,11,0.3)]"
                                        : "border-retro-black bg-retro-light-gray shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    }`}
                            >
                                {/* Bagian Atas: Header Quest & Badge Status */}
                                <div className="flex flex-col gap-2 text-left">
                                    <div className="flex justify-between items-start gap-2 flex-wrap">
                                        <p className="font-pixel text-[10px] text-retro-black font-bold leading-tight">
                                            {item.title}
                                        </p>
                                        {isVerified ? (
                                            <span className="font-pixel text-[7px] bg-amber-400 text-retro-black font-bold border border-retro-black px-1.5 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                                                ★ GUILD VERIFIED
                                            </span>
                                        ) : (
                                            <span className="font-pixel text-[7px] bg-gray-200 text-retro-dark-gray border border-retro-black px-1.5 py-0.5">
                                                UNVERIFIED
                                            </span>
                                        )}
                                    </div>

                                    <p className="font-pixel text-[7px] text-retro-dark-gray">
                                        ID: {item.project_id} • Author: <span className="font-bold text-navy-blue">{item.author || "USR-001"}</span> • Category: <span className="text-retro-black">{item.category || "General"}</span>
                                    </p>

                                    <p className="font-sans text-[11px] text-retro-dark-gray leading-tight opacity-90 border-t border-dashed border-retro-black/10 pt-2">
                                        {item.description}
                                    </p>

                                    {/* Skills / Roles Required Tags */}
                                    {item.looking_for && item.looking_for.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {item.looking_for.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="font-pixel text-[6px] bg-white text-retro-black border border-retro-black px-1 py-0.5"
                                                >
                                                    +{skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Bagian Bawah: Aksi Modifikasi Admin (Verify / Unverify / Delete) */}
                                <div className="flex justify-end gap-2 border-t border-retro-black/10 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleVerify(item.project_id, item.title)}
                                        className={`font-pixel text-[8px] py-1.5 px-3 border-2 border-retro-black select-none cursor-pointer active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isVerified
                                                ? "bg-amber-400 text-retro-black hover:bg-amber-500 font-bold"
                                                : "bg-pixel-green text-retro-black hover:bg-pixel-green-dark"
                                            }`}
                                    >
                                        {isVerified ? "[UNVERIFY QUEST]" : "[★ VERIFY QUEST]"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuest(item.project_id, item.title)}
                                        className="font-pixel text-[8px] py-1.5 px-3 bg-red-500 hover:bg-red-600 text-white border-2 border-retro-black select-none cursor-pointer active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        [DELETE]
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Terminal Logs System */}
            <div className="bg-black border-4 border-retro-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-mono text-[10px] text-pixel-green space-y-1 max-h-[80px] overflow-y-auto">
                    {logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}