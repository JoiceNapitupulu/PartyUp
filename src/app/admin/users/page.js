"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { usersData, triggerAuthChange, OFFICIAL_ROLES } from "@/utils/auth";

export default function AdminUsers() {
    const router = useRouter();
    const [logs, setLogs] = useState(["[SYSTEM] Adventurer directory connected."]);

    // Lazy Initialization untuk mencegah error set-state-in-effect
    const [users, setUsers] = useState(() => {
        if (typeof window !== "undefined") {
            const localUsers = localStorage.getItem("usersList");
            return localUsers ? JSON.parse(localUsers) : usersData;
        }
        return usersData;
    });

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

    const handleImpersonate = (userObj) => {
        localStorage.setItem("currentUser", JSON.stringify(userObj));
        triggerAuthChange();
        addLog(`AUTH: Impersonating ${userObj.name}... Redirecting...`);
        setTimeout(() => {
            router.push("/profile");
        }, 500);
    };

    return (
        <div className="flex-grow p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                <h1 className="font-pixel text-base text-retro-black">MANAGE ADVENTURERS</h1>
                <span className="font-pixel text-[8px] text-retro-dark-gray">SYS_USERS: ACTIVE</span>
            </div>

            <div className="bg-white border-4 border-retro-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                <span className="font-pixel text-[9px] text-navy-blue">
                    {/* Perbaikan komentar JSX */}
                    {/* DATA DIRECTORY */}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {users.map((item) => (
                        <div key={item.user_id} className={`p-4 border-2 border-retro-black bg-retro-light-gray flex flex-col gap-3 ${item.isBanned ? "opacity-60 bg-red-50 border-red-300" : ""
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
                                    {OFFICIAL_ROLES.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                    <option value="Admin" disabled>
                                        Admin
                                    </option>
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
                                    className={`font-pixel text-[7px] py-1.5 px-3 border-2 border-retro-black select-none cursor-pointer active:translate-y-[1px] disabled:opacity-40 ${item.isBanned ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                        }`}
                                >
                                    {item.isBanned ? "UNBAN" : "BAN"}
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