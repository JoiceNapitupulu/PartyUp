"use client";

import React, { useState, useEffect, useMemo } from "react";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import PixelTechIcon from "@/components/PixelTechIcon";
import ConfirmModal from "@/components/ConfirmModal";
import { fetchAllQuests, updateQuestVerification, deleteQuest } from "@/services/dataService";
import projectsData from "@/data/projects.json";

export default function AdminQuests() {
    const [quests, setQuests] = useState(projectsData);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [logs, setLogs] = useState(["[SYSTEM] Quest Audit Console connected."]);

    // Modal Konfirmasi Hapus Quest
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    // Load Data Quest dari Supabase / LocalStorage
    const loadQuests = async () => {
        if (typeof window !== "undefined") {
            try {
                const activeQuests = await fetchAllQuests();
                setQuests(activeQuests && activeQuests.length > 0 ? activeQuests : projectsData);
            } catch (e) {
                console.error("Failed to load quests:", e);
            }
        }
    };

    useEffect(() => {
        loadQuests();
        window.addEventListener("projects-change", loadQuests);
        return () => window.removeEventListener("projects-change", loadQuests);
    }, []);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
    };

    // 1. Toggle Verifikasi Quest (★ GUILD VERIFIED)
    const handleToggleVerify = async (projectId, questTitle, currentStatus) => {
        const newStatus = !currentStatus;
        const updated = await updateQuestVerification(projectId, newStatus);
        setQuests(updated);
        window.dispatchEvent(new Event("projects-change"));
        addLog(`AUDIT: Set [${questTitle}] verification status to -> ${newStatus ? "VERIFIED (★)" : "UNVERIFIED"}`);
    };

    // 2. Hapus Quest Pelanggaran
    const handleDeleteQuest = (projectId, questTitle) => {
        setConfirmModal({
            isOpen: true,
            title: "DELETE QUEST AUDIT",
            message: `Are you sure you want to delete quest "${questTitle}" (${projectId}) from the Guild Board?`,
            onConfirm: async () => {
                const updated = await deleteQuest(projectId);
                setQuests(updated);
                window.dispatchEvent(new Event("projects-change"));
                addLog(`SECURITY: Purged quest [${questTitle}] (${projectId}) from database.`);
                setConfirmModal((prev) => ({ ...prev, isOpen: false }));
            },
        });
    };

    // Filter Quests
    const filteredQuests = useMemo(() => {
        return quests.filter((q) => {
            const query = search.toLowerCase().trim();
            const matchSearch =
                !query ||
                q.title.toLowerCase().includes(query) ||
                (q.project_id && q.project_id.toLowerCase().includes(query)) ||
                (q.category && q.category.toLowerCase().includes(query));

            const matchCat = selectedCategory === "ALL" || q.category?.includes(selectedCategory);
            return matchSearch && matchCat;
        });
    }, [quests, search, selectedCategory]);

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0c1322] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-retro-black pb-4">
                <div>
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider block mb-1">
            // GUILD QUEST MODERATION
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-yellow-300">
                        [ AUDIT &amp; VERIFY QUESTS ]
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-[#121b2d] border-2 border-retro-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green">
                        TOTAL: {quests.length} QUESTS
                    </span>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-[#121b2d] border-4 border-retro-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="w-full md:w-1/2 relative">
                    <input
                        type="text"
                        placeholder="Search quest title, ID, category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full font-sans text-xs p-2.5 pl-8 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 rounded-xl"
                    />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs">🔍</span>
                </div>

                <div className="w-full md:w-1/3 relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full font-sans text-xs p-2.5 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none rounded-xl cursor-pointer"
                    >
                        <option value="ALL">All Categories ({quests.length})</option>
                        <option value="GEMASTIK">GEMASTIK 2026</option>
                        <option value="INVENTION">INVENTION 2026</option>
                        <option value="College">College Project</option>
                        <option value="HackFest">HackFest</option>
                    </select>
                </div>
            </div>

            {/* Quests Roster Grid */}
            <div className="bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 text-left">
                <div className="flex justify-between items-center border-b-2 border-gray-700/80 pb-2">
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider">
            // ACTIVE DISPATCHED QUESTS ({filteredQuests.length})
                    </span>
                    <span className="font-pixel text-[7.5px] bg-[#18233a] text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded">
                        HYBRID DATA SYNC
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {filteredQuests.map((q) => {
                        const isVerified = q.is_verified ?? q.isVerified ?? true;
                        return (
                            <div
                                key={q.project_id || q.id}
                                className="bg-[#18233a] border-2 border-retro-black p-4 rounded-xl flex flex-col justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 transition-all text-left"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <span className="font-pixel text-[7.5px] bg-[#121b2d] text-yellow-300 border border-retro-black px-2 py-0.5 rounded">
                                            {q.category}
                                        </span>
                                        <span
                                            className={`font-pixel text-[7px] px-2 py-0.5 rounded font-bold ${isVerified
                                                    ? "bg-yellow-400 text-retro-black"
                                                    : "bg-gray-700 text-gray-300"
                                                }`}
                                        >
                                            {isVerified ? "★ GUILD VERIFIED" : "UNVERIFIED"}
                                        </span>
                                    </div>

                                    <h3 className="font-pixel text-xs text-white font-bold leading-snug">
                                        {q.title}
                                    </h3>
                                    <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed">
                                        {q.description}
                                    </p>
                                </div>

                                <div className="border-t border-gray-700/60 pt-3 flex items-center justify-between gap-2">
                                    <span className="font-pixel text-[7.5px] text-gray-400">
                                        ID: {q.project_id || q.id}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleVerify(q.project_id || q.id, q.title, isVerified)}
                                            className={`font-pixel text-[7.5px] py-1.5 px-3 rounded-lg border-2 border-retro-black font-bold cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isVerified
                                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                                    : "bg-yellow-400 hover:bg-yellow-300 text-retro-black"
                                                }`}
                                        >
                                            {isVerified ? "REVOKE (★)" : "VERIFY (★)"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteQuest(q.project_id || q.id, q.title)}
                                            className="font-pixel text-[7.5px] py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-retro-black rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                        >
                                            PURGE ✗
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Terminal Logs */}
            <div className="bg-black border-4 border-retro-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-2">
                    <span className="font-pixel text-[8px] text-yellow-400">// LIVE AUDIT LOGS</span>
                    <span className="font-pixel text-[7px] text-pixel-green animate-pulse">● LOGGING ACTIVE</span>
                </div>
                <div className="font-mono text-[10px] text-pixel-green space-y-1 max-h-[85px] overflow-y-auto">
                    {logs.map((log, index) => (
                        <div key={index} className="leading-relaxed">{log}</div>
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText="DELETE"
                cancelText="CANCEL"
                variant="danger"
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
            />

            <Footer />
        </div>
    );
}