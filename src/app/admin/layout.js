"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, triggerAuthChange } from "../../utils/auth";
import PixelButton from "../../components/PixelButton";
const SIDEBAR_BG = "bg-[#0E2A22]";
const SIDEBAR_BORDER = "border-[#1D4A3B]";
const SIDEBAR_PANEL = "bg-white/[0.06]";
const SIDEBAR_PANEL_HOVER = "hover:bg-white/[0.09]";

const PixelIcon = ({ rows, className = "w-3.5 h-3.5" }) => {
    const size = rows.length;
    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            className={className}
            fill="currentColor"
            shapeRendering="crispEdges"
        >
            {rows.map((row, y) =>
                row.split("").map((cell, x) =>
                    cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
                )
            )}
        </svg>
    );
};

const ICONS = {
    dashboard: ["1110111", "1110111", "1110111", "0000000", "1110111", "1110111", "1110111"],
    users: ["0011100", "0111110", "0111110", "0011100", "0000000", "0111110", "1111111"],
    quest: ["1000000", "1111000", "1111100", "1111000", "1000000", "1000000", "1000000"],
    settings: ["0010100", "0111110", "1011101", "1111111", "1011101", "0111110", "0010100"],
    search: ["0111000", "1000100", "1000100", "1000100", "0111010", "0000101", "0000010"],
    help: ["0111000", "1000100", "0000100", "0001000", "0010000", "0000000", "0010000"],
    logout: ["1100000", "1000110", "1000001", "1000110", "1100000", "0000000", "0000000"],
};

const CollapseIcon = () => <PixelIcon rows={["1111111", "1011101", "1010001", "1010101", "1010001", "1011101", "1111111"]} className="w-3.5 h-3.5" />;
const ExpandIcon = () => <PixelIcon rows={["1111111", "1011101", "1000101", "1010101", "1000101", "1011101", "1111111"]} className="w-3.5 h-3.5" />;

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mounted, setMounted] = useState(false); // Penyelamat dari Hydration Error
    const [search, setSearch] = useState(""); // filter menu, kosmetik & ringan — tidak menyentuh data lain

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
        { name: "DASHBOARD METRICS", short: "D", path: "/admin", icon: ICONS.dashboard },
        { name: "ADVENTURER DIRECTORY", short: "A", path: "/admin/users", icon: ICONS.users },
        { name: "QUEST AUDIT BOARD", short: "Q", path: "/admin/quests", icon: ICONS.quest },
        { name: "SYSTEM SETTINGS", short: "S", path: "/admin/settings", icon: ICONS.settings },
    ];

    const filteredMenu = search.trim()
        ? menuItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        : menuItems;

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
                className={`${SIDEBAR_BG} border-r-4 ${SIDEBAR_BORDER} flex flex-col justify-between text-white p-4 sticky top-0 h-screen z-10 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20 items-center" : "w-64"
                    }`}
            >
                <div className="flex flex-col gap-6 w-full">
                    {/* HEADER: LOGO & TOGGLE BUTTON */}
                    <div
                        className={`flex border-b-2 ${SIDEBAR_BORDER} pb-4 items-center ${isCollapsed ? "flex-col gap-3 justify-center" : "flex-row gap-2 justify-between"
                            }`}
                    >
                        {isCollapsed ? (
                            <Link href="/" className="w-9 h-9 flex items-center justify-center bg-pixel-green text-[#0E2A22] font-pixel text-[11px] border-2 border-white rounded-lg shrink-0">
                                P!
                            </Link>
                        ) : (
                            <Link href="/" className="flex items-center gap-2 min-w-0">
                                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-pixel-green text-[#0E2A22] font-pixel text-[10px] border-2 border-white rounded-lg">
                                    P!
                                </span>
                                <span className="flex flex-col gap-1 min-w-0">
                                    <span className="font-pixel text-[10px] text-pixel-green tracking-wider truncate">
                                        PARTYUP! MASTER
                                    </span>
                                    <span className="font-pixel text-[6px] text-retro-gray truncate">
                                        [SYSTEMS_CONTROL]
                                    </span>
                                </span>
                            </Link>
                        )}

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="w-7 h-7 rounded-lg bg-white border-2 border-[#0E2A22] text-[#0E2A22] flex items-center justify-center cursor-pointer hover:bg-pixel-green hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
                        >
                            {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
                        </button>
                    </div>

                    {/* SEARCH BAR — kotak putih seperti referensi, tetap font pixel */}
                    {isCollapsed ? (
                        <button
                            title="Search menu"
                            onClick={() => setIsCollapsed(false)}
                            className="w-9 h-9 flex items-center justify-center bg-white text-[#0E2A22] rounded-lg hover:bg-pixel-green transition-all shrink-0"
                        >
                            <PixelIcon rows={ICONS.search} className="w-3.5 h-3.5" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-white text-[#0E2A22] rounded-lg px-3 py-2.5 border-2 border-transparent focus-within:border-pixel-green transition-all">
                            <span className="shrink-0 text-[#0E2A22]/60">
                                <PixelIcon rows={ICONS.search} className="w-3 h-3" />
                            </span>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search menu"
                                className="bg-transparent outline-none font-pixel text-[8px] text-[#0E2A22] placeholder:text-[#0E2A22]/40 w-full"
                            />
                        </div>
                    )}

                    {/* Nav Links */}
                    <nav className="flex flex-col gap-1.5 w-full">
                        {!isCollapsed && (
                            <span className="font-pixel text-[7px] text-retro-gray/60 tracking-widest mb-1 px-1">
                                Main menu
                            </span>
                        )}

                        {filteredMenu.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    title={isCollapsed ? item.name : ""}
                                    className={`relative font-pixel text-[9px] p-3 transition-all flex items-center gap-2.5 rounded-lg ${isCollapsed ? "justify-center w-11 h-11 mx-auto" : "text-left w-full"
                                        } ${isActive
                                            ? "bg-pixel-green text-[#0E2A22]"
                                            : `bg-transparent text-retro-gray ${SIDEBAR_PANEL_HOVER} hover:text-white`
                                        }`}
                                >
                                    {isActive && !isCollapsed && (
                                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-r" />
                                    )}
                                    <PixelIcon rows={item.icon} className="w-3.5 h-3.5 shrink-0" />
                                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                                </Link>
                            );
                        })}

                        {!isCollapsed && filteredMenu.length === 0 && (
                            <span className="font-pixel text-[8px] text-retro-gray/50 px-2 py-2">
                                [NO MATCHES]
                            </span>
                        )}
                    </nav>
                </div>

                {/* ACCOUNT / FOOTER */}
                <div className={`flex flex-col gap-1.5 border-t-2 ${SIDEBAR_BORDER} pt-4 w-full ${isCollapsed ? "items-center" : ""}`}>
                    {!isCollapsed && (
                        <span className="font-pixel text-[7px] text-retro-gray/60 tracking-widest mb-1 px-1">
                            Account
                        </span>
                    )}

                    <Link
                        href="/admin/help"
                        title={isCollapsed ? "Help Center" : ""}
                        className={`font-pixel text-[9px] p-3 rounded-lg text-retro-gray ${SIDEBAR_PANEL_HOVER} hover:text-white transition-all flex items-center gap-2.5 ${isCollapsed ? "justify-center w-11 h-11" : "w-full"
                            }`}
                    >
                        <PixelIcon rows={ICONS.help} className="w-3.5 h-3.5 shrink-0" />
                        {!isCollapsed && <span>HELP CENTER</span>}
                    </Link>

                    {/* Kartu profil admin + tombol keluar, senada dengan panel referensi */}
                    <div
                        className={`flex items-center gap-2 ${SIDEBAR_PANEL} rounded-lg p-2 mt-1 ${isCollapsed ? "w-11 h-11 justify-center" : "w-full"
                            }`}
                    >
                        <div className="w-7 h-7 shrink-0 rounded-full bg-pixel-green text-[#0E2A22] font-pixel text-[9px] font-bold flex items-center justify-center">
                            A
                        </div>
                        {!isCollapsed && (
                            <>
                                <div className="text-left leading-tight min-w-0 flex-1">
                                    <p className="font-pixel text-[8px] text-white truncate">GM_ADMIN</p>
                                    <p className="font-pixel text-[6px] text-pixel-green truncate">LV.99 OWNER</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    title="Exit System"
                                    className="w-6 h-6 shrink-0 rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer transition-all"
                                >
                                    <PixelIcon rows={ICONS.logout} className="w-3 h-3" />
                                </button>
                            </>
                        )}
                    </div>

                    {isCollapsed && (
                        <button
                            onClick={handleLogout}
                            title="Exit System"
                            className="w-9 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer transition-all"
                        >
                            <PixelIcon rows={ICONS.logout} className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </aside>

            {/* VIEWPORT KONTEN UTAMA */}
            <div className="flex-1 flex flex-col min-h-screen overflow-y-auto transition-all duration-300">
                {children}
            </div>

        </div>
    );
}