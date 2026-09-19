"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import PixelAvatar from "@/components/PixelAvatar";
import PixelButton from "@/components/PixelButton";
import { usersData, triggerAuthChange, calculateUserLevel } from "@/utils/auth";
import { fetchAllProfiles, updateUserProfile } from "@/services/dataService";
import { useLanguage } from "@/utils/lang";

const OFFICIAL_ROLES = [
    "Product Manager (PM)",
    "Project / Scrum Master",
    "UI/UX Designer",
    "UX Researcher",
    "Frontend Developer",
    "Backend Developer",
    "Full-stack Developer",
    "Mobile App Developer",
    "QA (Quality Assurance) Engineer",
    "DevOps Engineer"
];

export default function AdminUsers() {
    const { lang } = useLanguage();
    const router = useRouter();
    const [logs, setLogs] = useState(["[SYSTEM] Grandmaster telemetry connected to database."]);
    const [users, setUsers] = useState(usersData);
    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("ALL");

    // Load Data Pengguna dari Cloud Supabase & LocalStorage
    useEffect(() => {
        const loadUsers = async () => {
            if (typeof window !== "undefined") {
                try {
                    const allProfiles = await fetchAllProfiles();
                    if (allProfiles && allProfiles.length > 0) {
                        setUsers(allProfiles);
                    }
                } catch (e) {
                    console.error("Failed to load profiles:", e);
                }
            }
        };

        loadUsers();
        window.addEventListener("auth-change", loadUsers);
        return () => window.removeEventListener("auth-change", loadUsers);
    }, []);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
    };

    const saveUsers = (updatedUsers) => {
        setUsers(updatedUsers);
        if (typeof window !== "undefined") {
            localStorage.setItem("usersList", JSON.stringify(updatedUsers));
            window.dispatchEvent(new Event("auth-change"));
        }
    };

    // 1. Toggle Ban / Unban User (Sinkron Kolom is_banned)
    const handleToggleBan = async (userId, userName) => {
        const targetUser = users.find((u) => u.user_id === userId);
        const currentBan = targetUser?.is_banned ?? targetUser?.isBanned ?? false;
        const newBanStatus = !currentBan;

        // Update state lokal seketika
        const updated = users.map((u) =>
            u.user_id === userId
                ? { ...u, isBanned: newBanStatus, is_banned: newBanStatus }
                : u
        );
        setUsers(updated);
        localStorage.setItem("usersList", JSON.stringify(updated));

        // Kirim update kolom 'is_banned' yang valid ke Supabase
        await updateUserProfile(userId, { is_banned: newBanStatus });

        addLog(`SECURITY: ${newBanStatus ? "BLOCKED/BANNED" : "UNBANNED"} ${userName.toUpperCase()} (${userId})`);
    };

    // 2. Ganti Role Kelas Mahasiswa
    const handleChangeRole = (userId, userName, newRole) => {
        const updated = users.map((u) =>
            u.user_id === userId ? { ...u, role: newRole } : u
        );
        saveUsers(updated);
        addLog(`CLASS SWAP: Changed ${userName} role to [${newRole.toUpperCase()}]`);
    };

    // 3. Impersonate / Login As Mahasiswa
    const handleImpersonate = (userObj) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("currentUser", JSON.stringify(userObj));
            localStorage.setItem("isLoggedOut", "false");
            window.dispatchEvent(new Event("auth-change"));
            addLog(`IMPERSONATE: Switching session as ${userObj.name} (${userObj.role})...`);
            setTimeout(() => {
                router.push("/profile");
            }, 400);
        }
    };

    // Filter User berdasarkan pencarian & role
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const q = search.toLowerCase().trim();
            const matchSearch =
                !q ||
                u.name.toLowerCase().includes(q) ||
                u.user_id.toLowerCase().includes(q) ||
                (u.university && u.university.toLowerCase().includes(q)) ||
                u.role.toLowerCase().includes(q);

            const matchRole = selectedRole === "ALL" || u.role === selectedRole;
            return matchSearch && matchRole;
        });
    }, [users, search, selectedRole]);

    return (
        // PERBAIKAN: latar halaman & panel disamakan ke tema gelap hijau
        // (senada sidebar & Dashboard), bukan navy-blue lagi.
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0a120c] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* 1. TOP HEADER TITLE & TELEMETRY BADGE */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-pixel-green/25 pb-4">
                <div>
                    <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider block mb-1">
            // GUILD COMMAND CONTROL
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-white">
                        [ MANAGE GUILD ADVENTURERS ]
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-[#0f1b13] border-2 border-pixel-green/30 px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green">
                        TOTAL: {users.length} REGISTERED
                    </span>
                </div>
            </div>

            {/* 2. FILTER & SEARCH TOOLBAR */}
            <div className="bg-[#0f1b13] border-4 border-pixel-green/25 p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col md:flex-row gap-3 items-center justify-between">

                {/* Search Bar */}
                <div className="w-full md:w-1/2 relative">
                    <input
                        type="text"
                        placeholder="Cari nama, ID mahasiswa, universitas, atau role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full font-sans text-xs p-2.5 pl-8 bg-[#132a1c] text-white border-2 border-pixel-green/20 focus:outline-none focus:border-pixel-green rounded-xl"
                    />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs">🔍</span>
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 font-pixel text-[7px] text-gray-400 hover:text-red-400"
                        >
                            CLEAR
                        </button>
                    )}
                </div>

                {/* Role Filter */}
                <div className="w-full md:w-1/3 relative">
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full font-sans text-xs p-2.5 bg-[#132a1c] text-white border-2 border-pixel-green/20 focus:outline-none focus:border-pixel-green appearance-none cursor-pointer rounded-xl"
                    >
                        <option value="ALL">Semua Kelas ({users.length})</option>
                        {OFFICIAL_ROLES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-pixel-green text-xs">
                        ▼
                    </div>
                </div>

            </div>

            {/* 3. USER MANAGEMENT GRID (CYBERPUNK CARDS) */}
            <div className="bg-[#0f1b13] border-4 border-pixel-green/25 p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.6)] flex flex-col gap-4 text-left">
                <div className="flex justify-between items-center border-b-2 border-pixel-green/20 pb-2">
                    <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider">
            // ADVENTURER DIRECTORY ROSTER ({filteredUsers.length})
                    </span>
                    <span className="font-pixel text-[7.5px] bg-[#132a1c] text-emerald-200/70 border border-pixel-green/20 px-2 py-0.5 rounded">
                        HYBRID SYNCED
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {filteredUsers.map((item) => {
                        const userLevel = calculateUserLevel(item);
                        const isSelfAdmin = item.role === "Admin" || item.user_id === "USR-000";

                        return (
                            <div
                                key={item.user_id}
                                className={`p-4 border-2 border-retro-black rounded-xl flex flex-col justify-between gap-3.5 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] ${item.isBanned
                                    ? "bg-red-950/30 border-red-500/60 opacity-75"
                                    : "bg-[#132a1c] hover:border-pixel-green"
                                    }`}
                            >
                                {/* Upper Details */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-11 h-11 bg-retro-black border-2 border-pixel-green rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                            <PixelAvatar role={item.role} size="w-full h-full" />
                                        </div>

                                        <div className="min-w-0 text-left">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <p className={`font-pixel text-[9.5px] font-bold truncate ${item.isBanned ? "line-through text-red-400" : "text-white"}`}>
                                                    {item.name}
                                                </p>
                                                {item.isBanned && (
                                                    <span className="font-pixel text-[6.5px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">
                                                        BANNED
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-sans text-[10px] text-gray-300 truncate mt-0.5">
                                                {item.university || "Universitas Indonesia"}
                                            </p>
                                            <p className="font-pixel text-[7.5px] text-emerald-200 mt-0.5">
                                                ID: {item.user_id} • Semester {item.semester || 4} • <span className="text-pixel-green font-bold">LV.{userLevel}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dropdown Role Selector */}
                                    <select
                                        value={item.role}
                                        disabled={item.isBanned || isSelfAdmin}
                                        onChange={(e) => handleChangeRole(item.user_id, item.name, e.target.value)}
                                        className="font-sans text-[10px] p-1.5 border-2 border-pixel-green/30 bg-[#0f1b13] text-emerald-200 focus:outline-none rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                                    >
                                        {OFFICIAL_ROLES.map((r) => (
                                            <option key={r} value={r} className="bg-[#0f1b13] text-white">
                                                {r}
                                            </option>
                                        ))}
                                        <option value="Admin" disabled className="bg-[#0f1b13]">
                                            Admin (System)
                                        </option>
                                    </select>
                                </div>

                                {/* Bottom Actions */}
                                <div className="border-t border-pixel-green/15 pt-2.5 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleImpersonate(item)}
                                        disabled={item.isBanned || isSelfAdmin}
                                        className="flex-1 font-pixel text-[8px] py-2 bg-sky-400 hover:bg-sky-300 text-retro-black font-bold border-2 border-retro-black rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        [LOGIN AS 👤]
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleToggleBan(item.user_id, item.name)}
                                        disabled={isSelfAdmin}
                                        className={`font-pixel text-[8px] py-2 px-4 border-2 border-retro-black font-bold rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all ${item.isBanned
                                            ? "bg-pixel-green hover:bg-green-400 text-retro-black"
                                            : "bg-red-600 hover:bg-red-700 text-white"
                                            }`}
                                    >
                                        {item.isBanned ? "UNBAN ✓" : "BAN ✗"}
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. RETRO SECURITY TERMINAL AUDIT LOGS */}
            <div className="bg-black border-4 border-pixel-green/25 p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] text-left">
                <div className="flex justify-between items-center border-b border-pixel-green/15 pb-2 mb-2">
                    <span className="font-pixel text-[8px] text-pixel-green">// LIVE AUDIT LOGS &amp; EVENT TELEMETRY</span>
                    <span className="font-pixel text-[7px] text-pixel-green animate-pulse">● LOGGING ACTIVE</span>
                </div>
                <div className="font-mono text-[10px] text-pixel-green space-y-1 max-h-[90px] overflow-y-auto custom-scrollbar">
                    {logs.map((log, index) => (
                        <div key={index} className="leading-relaxed">{log}</div>
                    ))}
                </div>
            </div>

        </div>
    );
}