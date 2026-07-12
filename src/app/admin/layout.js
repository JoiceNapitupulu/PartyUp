"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, triggerAuthChange } from "@/utils/auth";
import PixelButton from "@/components/PixelButton";

// Ikon representasi visual sidebar terbuka (untuk aksi menciutkan/collapse)
const CollapseIcon = () => (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
        <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="2" width="3" height="12" />
    </svg>
);

// Ikon representasi visual sidebar tertutup (untuk aksi melebarkan/expand)
const ExpandIcon = () => (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
        <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="11" y="2" width="3" height="12" />
    </svg>
);

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mounted, setMounted] = useState(false); // Penyelamat dari Hydration Error

    useEffect(() => {
        setMounted(true); // Menandakan komponen telah sukses termuat di browser client
        const user = getCurrentUser();
        if (user && user.role?.toLowerCase() === "admin") {
            setIsAdmin(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        triggerAuthChange();
        router.push("/");
    };

    const menuItems = [
        { name: "DASHBOARD METRICS", short: "D", path: "/admin" },
        { name: "ADVENTURER DIRECTORY", short: "A", path: "/admin/users" },
        { name: "QUEST AUDIT BOARD", short: "Q", path: "/admin/quests" },
        { name: "SYSTEM SETTINGS", short: "S", path: "/admin/settings" },
    ];

    // Jembatan SSR: Sebelum ter-mount di browser client, render layar loading netral yang sama di server & client
    if (!mounted) {
        return (
            <div className="min-h-screen bg-retro-black flex items-center justify-center font-pixel text-xs text-retro-gray">
                [BOOTING SECURE CONSOLE...]
            </div>
        );
    }

    // Jika sudah ter-mount di client tetapi ternyata bukan admin, tampilkan layar blokir merah
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

    // Jika sudah ter-mount di client dan terbukti admin, tampilkan layout sidebar admin sesungguhnya
    return (
        <div className="min-h-screen flex bg-retro-bg font-sans">

            {/* SIDEBAR KIRI PERMANEN */}
            <aside
                className={`bg-retro-black border-r-4 border-retro-black flex flex-col justify-between text-white p-4 sticky top-0 h-screen z-10 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20 items-center" : "w-64"
                    }`}
            >
                <div className="flex flex-col gap-8 w-full">
                    {/* HEADER: LOGO & TOGGLE BUTTON (Menggunakan Flexbox Dinamis, Bebas Tabrakan!) */}
                    <div
                        className={`flex border-b-2 border-retro-dark-gray pb-4 items-center ${isCollapsed
                                ? "flex-col gap-3 justify-center"
                                : "flex-row gap-2 justify-between"
                            }`}
                    >
                        {/* Brand Logo */}
                        {isCollapsed ? (
                            <Link href="/" className="font-pixel text-[13px] text-pixel-green animate-pulse">
                                P!
                            </Link>
                        ) : (
                            <Link href="/" className="flex flex-col gap-1 max-w-[150px]">
                                <span className="font-pixel text-[10px] text-pixel-green tracking-wider truncate">
                                    PARTYUP! MASTER
                                </span>
                                <span className="font-pixel text-[6px] text-retro-gray">
                                    [SYSTEMS_CONTROL]
                                </span>
                            </Link>
                        )}

                        {/* Tombol Pemicu Buka-Tutup Minimalis (Mengikuti Aliran Flex) */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="w-7 h-7 rounded-lg bg-white border-2 border-retro-black text-retro-black flex items-center justify-center cursor-pointer hover:bg-pixel-green hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
                        >
                            {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col gap-2 w-full">
                        {!isCollapsed && (
                            <span className="font-pixel text-[8px] text-retro-dark-gray tracking-widest mb-1">
                                {/* NAVIGATION */}
                            </span>
                        )}

                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    title={isCollapsed ? item.name : ""}
                                    className={`font-pixel text-[9px] p-3 border-2 transition-all flex items-center ${isCollapsed
                                            ? "justify-center w-10 h-10 mx-auto rounded-lg"
                                            : "text-left w-full"
                                        } ${isActive
                                            ? "bg-pixel-green text-retro-black border-white"
                                            : "bg-transparent text-retro-gray border-transparent hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {isCollapsed ? `[${item.short}]` : `[■] ${item.name}`}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Info Admin & Tombol Exit */}
                {isCollapsed ? (
                    <div className="flex flex-col items-center gap-3 border-t-2 border-retro-dark-gray pt-4 w-full">
                        <div className="w-8 h-8 rounded-full bg-pixel-green text-retro-black font-pixel text-xs font-bold flex items-center justify-center">
                            A
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Exit System"
                            className="font-pixel text-[8px] w-8 h-8 bg-red-600 hover:bg-red-700 text-white border-2 border-retro-black flex items-center justify-center cursor-pointer rounded-lg"
                        >
                            [X]
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 border-t-2 border-retro-dark-gray pt-4 w-full">
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
                )}
            </aside>

            {/* VIEWPORT KONTEN UTAMA */}
            <div className="flex-1 flex flex-col min-h-screen overflow-y-auto transition-all duration-300">
                {children}
            </div>

        </div>
    );
}