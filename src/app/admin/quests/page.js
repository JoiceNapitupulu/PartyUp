"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { projectsData } from "@/utils/auth";

export default function AdminQuests() {
    const [projects, setProjects] = useState([]);
    const [logs, setLogs] = useState(["[SYSTEM] Quest Audit system connected."]);

    useEffect(() => {
        const localProjects = localStorage.getItem("projectsList");
        setProjects(localProjects ? JSON.parse(localProjects) : projectsData);
    }, []);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
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
                <h1 className="font-pixel text-base text-retro-black">QUEST BOARD SANITIZATION</h1>
                <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_QUESTS: ACTIVE</span>
            </div>

            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                <span className="font-pixel text-[9px] text-navy-blue">// SANITIZE SYSTEM</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((item) => (
                        <div key={item.project_id} className="p-4 border-2 border-retro-black bg-retro-light-gray flex flex-col justify-between gap-3">
                            <div className="text-left">
                                <p className="font-pixel text-[9px] text-retro-black truncate">{item.title}</p>
                                <p className="font-pixel text-[7px] text-retro-dark-gray mt-1">ID: {item.project_id} • Author: {item.author}</p>
                                <p className="font-sans text-[11px] text-retro-dark-gray leading-tight mt-1 opacity-80">{item.description}</p>
                            </div>
                            <div className="flex justify-end border-t border-retro-black/10 pt-2">
                                <button
                                    onClick={() => handleDeleteQuest(item.project_id, item.title)}
                                    className="font-pixel text-[7px] py-1 px-3.5 bg-red-500 text-white border-2 border-retro-black hover:bg-red-600 select-none cursor-pointer active:translate-y-[1px]"
                                >
                                    [DELETE QUEST]
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