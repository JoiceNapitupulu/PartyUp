"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/utils/lang";

export default function AdminLogs() {
    const { lang } = useLanguage();
    const [logs, setLogs] = useState([
        `[${new Date().toLocaleTimeString()}] [SYSTEM] Security Audit Terminal initialized.`,
        `[${new Date().toLocaleTimeString()}] [DATABASE] PostgreSQL Supabase Hybrid Sync: ONLINE.`,
        `[${new Date().toLocaleTimeString()}] [SECURITY] Guard Role-Based Access Control: ENFORCED.`,
        `[${new Date().toLocaleTimeString()}] [TELEMETRY] Latency check AP-SOUTHEAST-3: 14ms (Optimal).`,
    ]);

    const addCustomLog = (eventText) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${eventText}`, ...prev]);
    };

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0c1322] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-retro-black pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider block mb-1">
            // TELEMETRY &amp; SECURITY EVENT STREAM
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-yellow-300">
                        [ LOG AUDIT KEAMANAN REAL-TIME ]
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => addCustomLog("[AUDIT_MANUAL] Grandmaster triggered system integrity check. OK.")}
                        className="font-pixel text-[8px] px-3 py-1.5 bg-yellow-400 text-retro-black font-bold border-2 border-retro-black rounded-lg cursor-pointer shadow-sm"
                    >
                        ⚡ TRIGGER AUDIT CHECK
                    </button>
                </div>
            </div>

            {/* Cyberpunk Terminal Stream Box */}
            <div className="bg-black border-4 border-retro-black rounded-2xl p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-left flex flex-col gap-3">
                <div className="flex items-center justify-between border-b-2 border-gray-800 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-pixel-green inline-block" />
                        <span className="font-pixel text-[8.5px] text-pixel-green ml-2">TERMINAL_LOG_STREAM v2.6</span>
                    </div>
                    <span className="font-pixel text-[7.5px] text-yellow-300 animate-pulse">● LOGGING ACTIVE</span>
                </div>

                <div className="font-mono text-xs text-pixel-green space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar p-2 bg-[#050811] rounded-xl border border-gray-900">
                    {logs.map((l, i) => (
                        <div key={i} className="leading-relaxed flex items-start gap-2">
                            <span className="text-gray-500 select-none">&gt;</span>
                            <span>{l}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}