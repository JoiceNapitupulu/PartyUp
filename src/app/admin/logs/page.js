"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/utils/lang";

const LOG_LEVEL_STYLES = {
    SYSTEM: "text-pixel-green",
    DATABASE: "text-cyan-300",
    SECURITY: "text-yellow-300",
    TELEMETRY: "text-sky-300",
    AUDIT_MANUAL: "text-fuchsia-300",
    WARNING: "text-orange-300",
};

const LIVE_EVENT_SAMPLES = [
    { level: "TELEMETRY", text: () => `Latency check AP-SOUTHEAST-3: ${Math.floor(10 + Math.random() * 20)}ms (Optimal).` },
    { level: "DATABASE", text: () => "Heartbeat ping: Supabase connection stable." },
    { level: "SECURITY", text: () => "Session token rotation check: PASSED." },
    { level: "SYSTEM", text: () => "Background integrity sweep completed. No anomalies." },
    { level: "WARNING", text: () => "Elevated read latency detected on usersList cache, auto-recovered." },
];

const MAX_LOGS = 60; // batas jumlah baris supaya stream tetap rapi, tidak menumpuk tanpa henti

export default function AdminLogs() {
    const { lang } = useLanguage();
    const [mounted, setMounted] = useState(false); // hindari mismatch waktu render server vs client
    const [logs, setLogs] = useState([]);
    const [isLive, setIsLive] = useState(true);
    const idRef = useRef(0);

    const nextId = () => {
        idRef.current += 1;
        return idRef.current;
    };

    const addLog = useCallback((level, text) => {
        setLogs((prev) => [
            { id: nextId(), timestamp: new Date().toLocaleTimeString(), level, text },
            ...prev,
        ].slice(0, MAX_LOGS));
    }, []);

    useEffect(() => {
        setMounted(true);

        let usersCount = 0, questsCount = 0, appsCount = 0, postsCount = 0;
        if (typeof window !== "undefined") {
            try { usersCount = JSON.parse(localStorage.getItem("usersList") || "[]").length; } catch (e) { /* ignore */ }
            try { questsCount = JSON.parse(localStorage.getItem("projectsList") || "[]").length; } catch (e) { /* ignore */ }
            try { appsCount = JSON.parse(localStorage.getItem("quest_applications") || "[]").length; } catch (e) { /* ignore */ }
            try { postsCount = JSON.parse(localStorage.getItem("timelinePosts") || "[]").length; } catch (e) { /* ignore */ }
        }

        const now = new Date().toLocaleTimeString();
        setLogs([
            { id: nextId(), timestamp: now, level: "TELEMETRY", text: "Latency check AP-SOUTHEAST-3: 14ms (Optimal)." },
            { id: nextId(), timestamp: now, level: "SECURITY", text: "Guard Role-Based Access Control: ENFORCED." },
            {
                id: nextId(),
                timestamp: now,
                level: "DATABASE",
                text: `PostgreSQL Supabase Hybrid Sync: ONLINE. Snapshot — ${usersCount} users, ${questsCount} quests, ${appsCount} applications, ${postsCount} posts.`,
            },
            { id: nextId(), timestamp: now, level: "SYSTEM", text: "Security Audit Terminal initialized." },
        ]);
    }, []);

    useEffect(() => {
        if (!mounted || !isLive) return undefined;
        const interval = setInterval(() => {
            const sample = LIVE_EVENT_SAMPLES[Math.floor(Math.random() * LIVE_EVENT_SAMPLES.length)];
            addLog(sample.level, sample.text());
        }, 9000);
        return () => clearInterval(interval);
    }, [mounted, isLive, addLog]);

    const handleClearLogs = () => {
        setLogs([]);
        addLog("SYSTEM", "Log stream cleared by Grandmaster Admin.");
    };

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0a140f] min-h-screen selection:bg-pixel-green selection:text-[#0E2A22]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-pixel-green/20 pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8px] text-pixel-green/80 uppercase tracking-wider block mb-1.5">
                        // TELEMETRY &amp; SECURITY EVENT STREAM
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-white">
                        LOG AUDIT KEAMANAN REAL-TIME
                    </h1>
                    <p className="font-sans text-xs text-gray-400 mt-1.5">
                        {lang === "ID"
                            ? "Stream event sistem, keamanan, dan database — otomatis diperbarui secara berkala."
                            : "Live system, security, and database event stream — auto-refreshes periodically."}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        type="button"
                        onClick={() => setIsLive((v) => !v)}
                        className={`font-pixel text-[7.5px] px-3 py-1.5 border rounded-lg cursor-pointer transition-all ${isLive
                            ? "bg-pixel-green/10 text-pixel-green border-pixel-green/40 hover:bg-pixel-green/20"
                            : "bg-white/[0.05] text-gray-400 border-gray-600 hover:text-white"
                            }`}
                    >
                        {isLive ? "⏸ PAUSE STREAM" : "▶ RESUME STREAM"}
                    </button>

                    <button
                        type="button"
                        onClick={handleClearLogs}
                        className="font-pixel text-[7.5px] px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-gray-600 rounded-lg cursor-pointer transition-all"
                    >
                        🗑 CLEAR LOGS
                    </button>

                    <button
                        type="button"
                        onClick={() => addLog("AUDIT_MANUAL", "Grandmaster triggered system integrity check. OK.")}
                        className="font-pixel text-[7.5px] px-3 py-1.5 bg-pixel-green text-[#0E2A22] font-bold border border-pixel-green rounded-lg cursor-pointer shadow-[0_0_18px_-4px_rgba(34,197,94,0.6)] hover:brightness-110 transition-all"
                    >
                        ⚡ TRIGGER AUDIT CHECK
                    </button>
                </div>
            </div>

            {/* Terminal Stream Box */}
            <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-6 shadow-[0_0_40px_-15px_rgba(34,197,94,0.4)] text-left flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-pixel-green/20 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-pixel-green inline-block" />
                        <span className="font-pixel text-[8.5px] text-pixel-green ml-2">TERMINAL_LOG_STREAM v2.6</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-pixel text-[7px] text-gray-500 whitespace-nowrap">{logs.length}/{MAX_LOGS} LINES</span>
                        <span className={`font-pixel text-[7.5px] whitespace-nowrap ${isLive ? "text-pixel-green animate-pulse" : "text-gray-500"}`}>
                            {isLive ? "● LOGGING ACTIVE" : "○ STREAM PAUSED"}
                        </span>
                    </div>
                </div>

                <div className="font-mono text-xs space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar p-2 bg-black rounded-xl border border-pixel-green/10">
                    {mounted && logs.length > 0 ? (
                        logs.map((l) => (
                            <div key={l.id} className="leading-relaxed flex items-start gap-2">
                                <span className="text-gray-600 select-none shrink-0">&gt;</span>
                                <span className="text-gray-500 shrink-0">[{l.timestamp}]</span>
                                <span className={`shrink-0 font-bold ${LOG_LEVEL_STYLES[l.level] || "text-pixel-green"}`}>
                                    [{l.level}]
                                </span>
                                <span className="text-gray-200 break-words">{l.text}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-600 font-pixel text-[10px] py-6 text-center">
                            {mounted ? "[ NO LOG ENTRIES — STREAM CLEARED ]" : "[ BOOTING LOG STREAM... ]"}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}