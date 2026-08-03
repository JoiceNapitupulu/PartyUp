"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { usersData, triggerAuthChange } from "@/utils/auth";
import PixelAvatar from "@/components/PixelAvatar";

// Daftar 10 Role Resmi Sistem
export const CLASS_ROLES = [
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
    const router = useRouter();
    const [logs, setLogs] = useState(["[SYSTEM] Adventurer directory connected."]);
    const [users, setUsers] = useState([]);

    // Load data & atur ulang jika masih tersimpan cache role lama di browser
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUsers = localStorage.getItem("usersList");
            let activeData = usersData;

            if (localUsers) {
                try {
                    const parsed = JSON.parse(localUsers);
                    // Cek jika localStorage masih menyimpan role lama ("Hacker", "Hipster", "Hustler")
                    const hasLegacyRole = parsed.some((u) =>
                        ["Hacker", "Hipster", "Hustler"].includes(u.role)
                    );
                    if (!hasLegacyRole) {
                        activeData = parsed;
                    }
                } catch (e) {
                    activeData = usersData;
                }
            }

            setUsers(activeData);
            localStorage.setItem("usersList", JSON.stringify(activeData));
        }
    }, []);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
    };

    const saveUsers = (updatedUsers) => {
        setUsers(updatedUsers);
        localStorage.setItem("usersList", JSON.stringify(updatedUsers));
    };

    const handleToggleBan = (userId, userName) => {
        const updated = users.map((u) =>
            u.user_id === userId ? { ...u, isBanned: !u.isBanned } : u
        );
        saveUsers(updated);
        const targetUser = updated.find((u) => u.user_id === userId);
        addLog(`SECURITY: ${targetUser?.isBanned ? "BANNED" : "UNBANNED"} ${userName.toUpperCase()} (${userId})`);
    };

    const handleChangeRole = (userId, userName, newRole) => {
        const updated = users.map((u) =>
            u.user_id === userId ? { ...u, role: newRole } : u
        );
        saveUsers(updated);
        addLog(`CHARACTER: Swapped class of ${userName} to [${newRole.toUpperCase()}]`);
    };

    const handleImpersonate = (userObj) => {
        localStorage.setItem("currentUser", JSON.stringify(userObj));
        triggerAuthChange();
        addLog(`AUTH: Impersonating ${userObj.name}... Redirecting...`);

        setTimeout(() => {
            router.push("/profile");
        }, 300);
    };

    return (
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <h1 className="font-pixel text-base text-retro-black">MANAGE ADVENTURERS</h1>
                <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_USERS: ACTIVE</span>
            </div>

            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                <span className="font-pixel text-[9px] text-navy-blue">// DATA DIRECTORY</span>

                {/* Grid Kartu User */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {users.map((item) => {
                        const isAdminUser = item.role?.toLowerCase() === "admin";

                        return (
                            <div
                                key={item.user_id}
                                className={`p-4 border-4 flex flex-col justify-between gap-4 transition-all ${isAdminUser
                                    ? "border-yellow-500 bg-amber-50/20 shadow-[4px_4px_0px_0px_rgba(234,179,8,0.3)]"
                                    : item.isBanned
                                        ? "opacity-60 bg-red-50 border-red-400 shadow-none"
                                        : "border-retro-black bg-retro-light-gray shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    }`}
                            >
                                {/* Atas: Avatar & Profil */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 flex items-center justify-center border-2 border-retro-black bg-retro-black ${isAdminUser ? "border-yellow-500" : ""}`}>
                                        <PixelAvatar role={item.role} size="w-14 h-14" />
                                    </div>

                                    <div className="text-left flex-1">
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <p className={`font-pixel text-[10px] ${isAdminUser ? "text-yellow-600 font-bold" : "text-retro-black"} ${item.isBanned ? "line-through text-red-500" : ""}`}>
                                                {item.name}
                                            </p>
                                            {isAdminUser && (
                                                <span className="font-pixel text-[7px] bg-yellow-500 text-retro-black border border-retro-black px-1.5 py-0.5">
                                                    SYSTEM OVERSEER
                                                </span>
                                            )}
                                        </div>
                                        <p className="font-pixel text-[7px] text-retro-dark-gray mt-1">
                                            ID: {item.user_id} • Semester {item.semester || 4}
                                        </p>
                                    </div>
                                </div>

                                {/* Tengah: Select Dropdown 10 Role */}
                                <div className="flex items-center justify-between border-t border-b border-retro-black/10 py-2.5">
                                    <span className="font-pixel text-[8px] text-navy-blue">ASSIGN CLASS ROLE:</span>
                                    {isAdminUser ? (
                                        <span className="font-pixel text-[8px] text-yellow-600 font-bold">
                                            [LOCKED IN MASTER CLASS]
                                        </span>
                                    ) : (
                                        <select
                                            value={item.role}
                                            disabled={item.isBanned}
                                            onChange={(e) => handleChangeRole(item.user_id, item.name, e.target.value)}
                                            className="font-sans text-[10px] p-1 border-2 border-retro-black bg-white cursor-pointer focus:outline-none disabled:cursor-not-allowed"
                                        >
                                            {CLASS_ROLES.map((roleName) => (
                                                <option key={roleName} value={roleName}>
                                                    {roleName}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {/* Bawah: Tombol Action */}
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleImpersonate(item)}
                                        disabled={item.isBanned || isAdminUser}
                                        className="flex-1 font-pixel text-[8px] py-2 bg-navy-blue text-white border-2 border-retro-black hover:bg-navy-light select-none cursor-pointer active:translate-y-[1px] disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        [LOGIN AS]
                                    </button>
                                    {!isAdminUser && (
                                        <button
                                            type="button"
                                            onClick={() => handleToggleBan(item.user_id, item.name)}
                                            className={`font-pixel text-[8px] py-2 px-4 border-2 border-retro-black select-none cursor-pointer active:translate-y-[1px] ${item.isBanned
                                                ? "bg-green-500 text-white hover:bg-green-600"
                                                : "bg-red-500 text-white hover:bg-red-600"
                                                }`}
                                        >
                                            {item.isBanned ? "UNBAN" : "BAN"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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