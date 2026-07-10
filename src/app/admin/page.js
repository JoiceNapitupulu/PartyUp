"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import usersData from "@/data/users.json";
import projectsData from "@/data/projects.json";

export default function AdminDashboard() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeSubTab, setActiveTab] = useState("dashboard"); // dashboard, users, quests
    const [logs, setLogs] = useState([
        "[SYSTEM] Grand Console v1.2.0 initialized.",
        "[DATABASE] Local Storage Sync Layer: ACTIVE.",
        "[SECURITY] Grandmaster Admin authenticated successfully."
    ]);

    useEffect(() => {
        const stored = localStorage.getItem("currentUser");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.role?.toLowerCase() === "admin") {
                    setIsAdmin(true);
                } else {
                    return;
                }
            } catch (e) {
                console.error(e);
            }
        }

        // Load database lokal
        const localUsers = localStorage.getItem("usersList");
        setUsers(localUsers ? JSON.parse(localUsers) : usersData);

        const localProjects = localStorage.getItem("projectsList");
        setProjects(localProjects ? JSON.parse(localProjects) : projectsData);
    }, []);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
    };

    const saveUsers = (updatedUsers) => {
        setUsers(updatedUsers);
        localStorage.setItem("usersList", JSON.stringify(updatedUsers));
    };

    const saveProjects = (updatedProjects) => {
        setProjects(updatedProjects);
        localStorage.setItem("projectsList", JSON.stringify(updatedProjects));
    };

    const handleToggleBan = (userId, userName) => {
        const updated = users.map((u) =>
            u.user_id === userId ? { ...u, isBanned: !u.isBanned } : u
        );
        saveUsers(updated);
        const isBanned = updated.find((u) => u.user_id === userId).isBanned;
        addLog(`SECURITY: ${isBanned ? "BANNED" : "UNBANNED"} ${userName.toUpperCase()} (${userId})`);
    };

    const handleChangeRole = (userId, userName, newRole) => {
        const updated = users.map((u) =>
            u.user_id === userId ? { ...u, role: newRole } : u
        );
        saveUsers(updated);
        addLog(`CHARACTER: Swapped class of ${userName} to [${newRole.toUpperCase()}]`);
    };

    const handleDeleteQuest = (projectId, projectTitle) => {
        const updated = projects.filter((p) => p.project_id !== projectId);
        saveProjects(updated);
        addLog(`DATABASE: Quest [${projectTitle}] (${projectId}) deleted permanently.`);
    };

    const handleImpersonate = (userObj) => {
        localStorage.setItem("currentUser", JSON.stringify(userObj));
        window.dispatchEvent(new Event("auth-change"));
        router.push("/profile");
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.dispatchEvent(new Event("auth-change"));
        router.push("/");
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-retro-black flex flex-col items-center justify-center p-6 text-center font-pixel">
                <div className="max-w-md border-4 border-red-600 bg-black p-8 text-red-500 shadow-[6px_6px_0px_0px_rgba(220,38,38,0.5)] flex flex-col gap-6">
                    <h1 className="text-xl animate-pulse">[ACCESS DENIED: LEVEL INSUFFICIENT]</h1>
                    <p className="font-sans text-xs text-retro-gray/80 leading-relaxed">
                        You must be logged in as the Grandmaster Admin to access this restricted control deck.
                    </p>
                    <PixelButton variant="navy" onClick={() => router.push("/login")} className="py-2.5 text-[9px] border-2 border-red-600">
                        [← GO TO GATEKEEPER]
                    </PixelButton>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-retro-bg font-sans">

            {/* 1. SIDEBAR KIRI KUSTOM (Seperti Desain Nolito / SaaS Profesional) */}
            <aside className="w-64 bg-retro-black border-r-4 border-retro-black flex flex-col justify-between text-white p-6 sticky top-0 h-screen z-10">
                <div className="flex flex-col gap-8">
                    {/* Logo Dashboard Admin */}
                    <Link href="/" className="flex flex-col gap-1 border-b-2 border-retro-dark-gray pb-4">
                        <span className="font-pixel text-[13px] text-pixel-green tracking-wider">
                            PARTYUP! MASTER
                        </span>
                        <span className="font-pixel text-[7px] text-retro-gray">
                            [SYSTEMS_CONTROL_PANEL]
                        </span>
                    </Link>

                    {/* Navigasi Link Sidebar */}
                    <nav className="flex flex-col gap-2">
                        <span className="font-pixel text-[8px] text-retro-dark-gray tracking-widest mb-1">// NAVIGATION</span>
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`font-pixel text-left text-[9px] p-3 border-2 transition-all cursor-pointer ${activeSubTab === "dashboard"
                                    ? "bg-pixel-green text-retro-black border-white"
                                    : "bg-transparent text-retro-gray border-transparent hover:text-white hover:bg-white/5"
                                }`}
                        >
                            [■] DASHBOARD METRICS
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`font-pixel text-left text-[9px] p-3 border-2 transition-all cursor-pointer ${activeSubTab === "users"
                                    ? "bg-pixel-green text-retro-black border-white"
                                    : "bg-transparent text-retro-gray border-transparent hover:text-white hover:bg-white/5"
                                }`}
                        >
                            [■] ADVENTURER DIRECTORY
                        </button>
                        <button
                            onClick={() => setActiveTab("quests")}
                            className={`font-pixel text-left text-[9px] p-3 border-2 transition-all cursor-pointer ${activeSubTab === "quests"
                                    ? "bg-pixel-green text-retro-black border-white"
                                    : "bg-transparent text-retro-gray border-transparent hover:text-white hover:bg-white/5"
                                }`}
                        >
                            [■] QUEST AUDIT BOARD
                        </button>
                    </nav>
                </div>

                {/* Info Admin & Tombol Exit */}
                <div className="flex flex-col gap-4 border-t-2 border-retro-dark-gray pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-pixel-green text-retro-black font-pixel text-xs font-bold flex items-center justify-center">
                            A
                        </div>
                        <div className="text-left leading-tight">
                            <p className="font-pixel text-[8px] text-white">GM_ADMIN</p>
                            <p className="font-pixel text-[6px] text-pixel-green">LV.99 OWNER</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full font-pixel text-[8px] py-2 bg-red-600 hover:bg-red-700 text-white border-2 border-retro-black transition-all cursor-pointer text-center"
                    >
                        [EXIT SYSTEM]
                    </button>
                </div>
            </aside>

            {/* 2. PANEL KONTEN KANAN (Scrollable & Responsive) */}
            <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
                <main className="flex-grow p-6 md:p-8 flex flex-col gap-6">

                    {/* Header Konten Aktif */}
                    <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                        <h1 className="font-pixel text-base text-retro-black">
                            {activeSubTab === "dashboard" && "DATABASE DIAGNOSTICS & STATUS"}
                            {activeSubTab === "users" && "MANAGE ADVENTURERS LEVEL"}
                            {activeSubTab === "quests" && "QUEST BOARD SANITIZATION"}
                        </h1>
                        <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_TIME: 2026_EST</span>
                    </div>

                    {/* VIEW TAB 1: DASHBOARD METRICS */}
                    {activeSubTab === "dashboard" && (
                        <div className="flex flex-col gap-6">
                            {/* Widgets Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white border-4 border-retro-black p-4 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="font-pixel text-[8px] text-retro-dark-gray">TOTAL ACADEMY ADVENTURERS</span>
                                    <span className="font-pixel text-lg text-navy-blue">{users.length} CHARS</span>
                                </div>
                                <div className="bg-white border-4 border-retro-black p-4 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="font-pixel text-[8px] text-retro-dark-gray">DISPATCHED COMMUNITY QUESTS</span>
                                    <span className="font-pixel text-lg text-pixel-green-dark">{projects.length} QUESTS</span>
                                </div>
                                <div className="bg-white border-4 border-retro-black p-4 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="font-pixel text-[8px] text-retro-dark-gray">BANNED ACCOUNTS</span>
                                    <span className="font-pixel text-lg text-red-500">{users.filter(u => u.isBanned).length} BLOCKED</span>
                                </div>
                            </div>

                            {/* Progress System Metrics */}
                            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                                <span className="font-pixel text-[9px] text-navy-blue">// SYSTEM CAPACITY AND ENGINE READOUTS</span>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between font-pixel text-[8px] text-retro-black mb-1">
                                            <span>GUILD ENGINE CAPACITY</span>
                                            <span>{Math.round((projects.length / 10) * 100)}%</span>
                                        </div>
                                        <div className="h-4 bg-retro-light-gray border-2 border-retro-black p-0.5">
                                            <div className="h-full bg-pixel-green border border-black transition-all duration-500" style={{ width: `${(projects.length / 10) * 100}%` }}></div>
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
                        </div>
                    )}

                    {/* VIEW TAB 2: ADVENTURER DIRECTORY */}
                    {activeSubTab === "users" && (
                        <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                            <span className="font-pixel text-[9px] text-navy-blue">// DIRECT MANIPULATION OF STUDENT ROLE DATA</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {users.map((item) => (
                                    <div key={item.user_id} className={`p-4 border-2 border-retro-black bg-retro-light-gray flex flex-col gap-3 transition-all ${item.isBanned ? "opacity-60 bg-red-50 border-red-300" : ""
                                        }`}>
                                        <div className="flex justify-between items-start">
                                            <div className="text-left">
                                                <p className={`font-pixel text-[9px] text-retro-black ${item.isBanned ? "line-through text-red-500" : ""}`}>
                                                    {item.name}
                                                </p>
                                                <p className="font-pixel text-[7px] text-retro-dark-gray mt-1">ID: {item.user_id} • Semester {item.semester}</p>
                                            </div>
                                            <select
                                                value={item.role}
                                                disabled={item.isBanned || item.role === "Admin"}
                                                onChange={(e) => handleChangeRole(item.user_id, item.name, e.target.value)}
                                                className="font-sans text-[10px] p-1 border-2 border-retro-black bg-white cursor-pointer focus:outline-none"
                                            >
                                                <option value="Hacker">Hacker</option>
                                                <option value="Hipster">Hipster</option>
                                                <option value="Hustler">Hustler</option>
                                                <option value="Admin" disabled>Admin</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleImpersonate(item)}
                                                disabled={item.isBanned || item.role === "Admin"}
                                                className="flex-1 font-pixel text-[7px] py-1.5 bg-navy-blue text-white border-2 border-retro-black hover:bg-navy-light select-none cursor-pointer active:translate-y-[1px] disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                [LOGIN AS]
                                            </button>
                                            <button
                                                onClick={() => handleToggleBan(item.user_id, item.name)}
                                                disabled={item.role === "Admin"}
                                                className={`font-pixel text-[7px] py-1.5 px-3 border-2 border-retro-black select-none cursor-pointer active:translate-y-[1px] disabled:opacity-40 ${item.isBanned
                                                        ? "bg-green-500 text-white hover:bg-green-600"
                                                        : "bg-red-500 text-white hover:bg-red-600"
                                                    }`}
                                            >
                                                {item.isBanned ? "UNBAN" : "BAN"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIEW TAB 3: QUEST AUDIT BOARD */}
                    {activeSubTab === "quests" && (
                        <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                            <span className="font-pixel text-[9px] text-navy-blue">// SANITIZE & MODERATE SPAM QUEST POSTS</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((item) => (
                                    <div key={item.project_id} className="p-4 border-2 border-retro-black bg-retro-light-gray flex flex-col justify-between gap-3">
                                        <div className="text-left">
                                            <p className="font-pixel text-[9px] text-retro-black truncate">{item.title}</p>
                                            <p className="font-pixel text-[7px] text-retro-dark-gray mt-1">ID: {item.project_id} • Author ID: {item.author}</p>
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
                    )}

                    {/* Terminal Logs (Muncul di semua sub-view demi detail hacker konsol yang mengesankan!) */}
                    <div className="bg-black border-4 border-retro-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-auto">
                        <div className="flex justify-between items-center border-b border-pixel-green/30 pb-2 mb-3">
                            <span className="font-pixel text-[9px] text-pixel-green flex items-center gap-2">
                                <span className="w-2 h-2 bg-pixel-green rounded-full animate-pulse inline-block"></span>
                                LIVE_SYSTEM_LOGS.TXT
                            </span>
                            <span className="font-pixel text-[8px] text-retro-dark-gray">DIAGNOSTICS BOARD</span>
                        </div>
                        <div className="font-mono text-[10px] text-pixel-green space-y-2 max-h-[100px] overflow-y-auto pr-2 select-text">
                            {logs.map((log, index) => (
                                <div key={index} className="leading-relaxed">
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>

                </main>

                <Footer />
            </div>

        </div>
    );
}