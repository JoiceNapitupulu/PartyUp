"use client";

import React, { useState, useEffect } from "react";
import PixelAvatar from "@/components/PixelAvatar";
import { fetchAllInvitations, fetchAllApplications, fetchAllQuests } from "@/services/dataService";
import { useLanguage } from "@/utils/lang";

export default function AdminTeams() {
    const { lang } = useLanguage();
    const [invitations, setInvitations] = useState([]);
    const [applications, setApplications] = useState([]);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const loadSquadData = async () => {
            try {
                const invs = await fetchAllInvitations();
                setInvitations(invs);
                const apps = await fetchAllApplications();
                setApplications(apps);
                const q = await fetchAllQuests();
                setQuests(q);
            } catch (e) {
                console.error(e);
            }
        };
        loadSquadData();
    }, []);

    const acceptedInvites = invitations.filter((i) => i.status === "Accepted");
    const approvedApps = applications.filter((a) => a.status === "Approved");

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0a140f] min-h-screen selection:bg-pixel-green selection:text-[#0E2A22]">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-pixel-green/20 pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8px] text-pixel-green/80 uppercase tracking-wider block mb-1.5">
                        // GUILD SQUAD &amp; ALLIANCE MONITOR
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-white">
                        MONITORING TIM &amp; SQUAD LOMBA
                    </h1>
                    <p className="font-sans text-xs text-gray-400 mt-1.5">
                        {lang === "ID"
                            ? "Pantau kolaborasi tim yang terbentuk dari undangan & lamaran quest."
                            : "Track squads formed through accepted invitations & approved quest applications."}
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 border border-pixel-green/40 bg-pixel-green/5 px-3.5 py-1.5 rounded-lg shrink-0">
                    <span className="w-2 h-2 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green whitespace-nowrap">
                        SQUADS ACTIVE: {acceptedInvites.length + approvedApps.length} FORMED
                    </span>
                </div>
            </div>

            {/* 3 Metric Cards — [DIPERBARUI] bg gelap + border hijau tipis +
                glow halus (bukan hard-shadow hitam kotak-kotak) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-5 shadow-[0_0_30px_-12px_rgba(34,197,94,0.35)] hover:border-pixel-green/50 transition-colors">
                    <span className="font-pixel text-[7.5px] text-gray-400 uppercase tracking-wide">REKRUTMEN DITERIMA</span>
                    <p className="font-pixel text-2xl text-pixel-green mt-1.5">{acceptedInvites.length}</p>
                    <span className="font-sans text-[10px] text-gray-500">Kolaborasi Showcase aktif</span>
                </div>

                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-5 shadow-[0_0_30px_-12px_rgba(34,197,94,0.35)] hover:border-pixel-green/50 transition-colors">
                    <span className="font-pixel text-[7.5px] text-gray-400 uppercase tracking-wide">PELAMAR DISETUJUI</span>
                    <p className="font-pixel text-2xl text-yellow-300 mt-1.5">{approvedApps.length}</p>
                    <span className="font-sans text-[10px] text-gray-500">Bergabung via Quest Board</span>
                </div>

                <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-5 shadow-[0_0_30px_-12px_rgba(34,197,94,0.35)] hover:border-pixel-green/50 transition-colors">
                    <span className="font-pixel text-[7.5px] text-gray-400 uppercase tracking-wide">TOTAL QUEST TERSEDIA</span>
                    <p className="font-pixel text-2xl text-cyan-300 mt-1.5">{quests.length}</p>
                    <span className="font-sans text-[10px] text-gray-500">Target Gemastik &amp; Invention</span>
                </div>
            </div>

            {/* Roster Kolaborasi Tim — [DIPERBARUI] panel utama dengan border
                hijau tipis + glow lembut di sekelilingnya, senada persis
                dengan panel "AUDIT & VERIFY ACTIVE QUESTS" di referensi */}
            <div className="bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_40px_-15px_rgba(34,197,94,0.4)] flex flex-col gap-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pixel-green/20 pb-3">
                    <span className="font-pixel text-[8.5px] text-pixel-green uppercase">
                        // DAFTAR KOLABORASI TIM YANG TELAH TERBENTUK
                    </span>
                    <span className="font-pixel text-[7.5px] text-gray-400 whitespace-nowrap">
                        ROSTER COUNT: {acceptedInvites.length} SQUAD
                    </span>
                </div>

                {acceptedInvites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {acceptedInvites.map((inv) => (
                            <div
                                key={inv.id}
                                className="bg-[#0a140f] border border-pixel-green/20 hover:border-pixel-green/45 p-4 rounded-xl flex flex-col gap-2 transition-colors"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-pixel text-[8.5px] bg-pixel-green/10 text-pixel-green px-2 py-0.5 border border-pixel-green/40 rounded font-bold">
                                        {inv.project_title}
                                    </span>
                                    <span className="font-pixel text-[7px] bg-pixel-green text-[#0E2A22] px-1.5 py-0.5 rounded font-bold shrink-0">
                                        ACTIVE SQUAD ✓
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-sans text-gray-300 mt-1 flex-wrap">
                                    <span>Ketua: <strong className="text-pixel-green">{inv.sender_name}</strong></span>
                                    <span className="text-pixel-green/60">➔</span>
                                    <span>Anggota: <strong className="text-white">{inv.receiver_name}</strong> ({inv.proposed_role})</span>
                                </div>

                                <p className="font-sans text-[11px] text-gray-500 italic">"{inv.note || "No custom note."}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center font-pixel text-xs text-gray-500">
                        BELUM ADA KOLABORASI TIM YANG DITERIMA.
                    </div>
                )}
            </div>
        </div>
    );
}