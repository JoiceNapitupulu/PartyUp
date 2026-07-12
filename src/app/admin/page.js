"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { usersData, projectsData } from "@/utils/auth";

export default function AdminDashboard() {
    const [usersCount, setUsersCount] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [bannedCount, setBannedCount] = useState(0);

    useEffect(() => {
        const localUsers = localStorage.getItem("usersList");
        const activeUsers = localUsers ? JSON.parse(localUsers) : usersData;
        setUsersCount(activeUsers.length);
        setBannedCount(activeUsers.filter(u => u.isBanned).length);

        const localProjects = localStorage.getItem("projectsList");
        const activeProjects = localProjects ? JSON.parse(localProjects) : projectsData;
        setProjectsCount(activeProjects.length);
    }, []);

    return (
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <h1 className="font-pixel text-base text-retro-black">DATABASE DIAGNOSTICS & STATUS</h1>
                <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_TIME: 2026_EST</span>
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border-4 border-retro-black p-4 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[8px] text-retro-dark-gray">TOTAL ACADEMY ADVENTURERS</span>
                    <span className="font-pixel text-lg text-navy-blue">{usersCount} CHARS</span>
                </div>
                <div className="bg-white border-4 border-retro-black p-4 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[8px] text-retro-dark-gray">DISPATCHED COMMUNITY QUESTS</span>
                    <span className="font-pixel text-lg text-pixel-green-dark">{projectsCount} QUESTS</span>
                </div>
                <div className="bg-white border-4 border-retro-black p-4 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[8px] text-retro-dark-gray">BANNED ACCOUNTS</span>
                    <span className="font-pixel text-lg text-red-500">{bannedCount} BLOCKED</span>
                </div>
            </div>

            {/* Metrics System */}
            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                <span className="font-pixel text-[9px] text-navy-blue">// SYSTEM CAPACITY AND ENGINE READOUTS</span>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between font-pixel text-[8px] text-retro-black mb-1">
                            <span>GUILD ENGINE CAPACITY</span>
                            <span>{Math.min(Math.round((projectsCount / 10) * 100), 100)}%</span>
                        </div>
                        <div className="h-4 bg-retro-light-gray border-2 border-retro-black p-0.5">
                            <div className="h-full bg-pixel-green border border-black transition-all duration-500" style={{ width: `${Math.min((projectsCount / 10) * 100, 100)}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between font-pixel text-[8px] text-retro-black mb-1">
                            <span>DATABASE SECURITY STATUS</span>
                            <span>100% SECURE</span>
                        </div>
                        <div className="h-4 bg-retro-light-gray border-2 border-retro-black p-0.5">
                            <div className="h-full bg-navy-blue border border-black" style={{ width: "100%" }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}