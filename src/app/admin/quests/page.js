"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
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
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <h1 className="font-pixel text-base text-retro-black">QUEST BOARD SANITIZATION &amp; VERIFICATION</h1>
                <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_QUESTS: ACTIVE</span>
            </div>

            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                <span className="font-pixel text-[9px] text-navy-blue">
                    // AUDIT &amp; VERIFY ACTIVE QUESTS
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((item) => (
                        <div key={item.project_id} className={`p-4 border-2 border-retro-black bg-retro-light-gray flex flex-col justify-between gap-3 ${item.isVerified ? "ring-2 ring-yellow-400 bg-amber-50/60" : ""}`}>
                            <div className="text-left">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <p className="font-pixel text-[9px] text-retro-black truncate font-bold">{item.title}</p>
                                    {item.isVerified && (
                                        <span className="font-pixel text-[7px] bg-yellow-400 text-retro-black px-1.5 py-0.5 border border-retro-black font-bold shrink-0">
                                            ★ VERIFIED
                                        </span>
                                    )}
                                </div>
                                <p className="font-pixel text-[7px] text-retro-dark-gray">ID: {item.project_id} • Author: {item.author} • Category: {item.category}</p>
                                <p className="font-sans text-[11px] text-retro-dark-gray leading-tight mt-1 opacity-80">{item.description}</p>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-retro-black/10 pt-2">
                                <button
                                    onClick={() => handleToggleVerify(item.project_id, item.title)}
                                    className={`font-pixel text-[7px] py-1 px-3 border-2 border-retro-black select-none cursor-pointer active:translate-y-[1px] ${
                                        item.isVerified
                                            ? "bg-yellow-400 text-retro-black hover:bg-yellow-300 font-bold"
                                            : "bg-navy-blue text-white hover:bg-navy-light"
                                    }`}
                                >
                                    {item.isVerified ? "[★ VERIFIED ✓]" : "[VERIFY QUEST]"}
                                </button>
                                <button
                                    onClick={() => handleDeleteQuest(item.project_id, item.title)}
                                    className="font-pixel text-[7px] py-1 px-3 bg-red-500 text-white border-2 border-retro-black hover:bg-red-600 select-none cursor-pointer active:translate-y-[1px]"
                                >
                                    [DELETE]
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Terminal Logs */}
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