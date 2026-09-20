"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
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
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0c1322] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-retro-black pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider block mb-1">
            // GUILD SQUAD &amp; ALLIANCE MONITOR
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-yellow-300">
                        [ MONITORING TIM &amp; SQUAD LOMBA ]
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-[#121b2d] border-2 border-retro-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green">
                        SQUADS ACTIVE: {acceptedInvites.length + approvedApps.length} FORMED
                    </span>
                </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[8px] text-gray-400 uppercase">REKRUTMEN DITERIMA</span>
                    <p className="font-pixel text-2xl text-pixel-green mt-1">{acceptedInvites.length}</p>
                    <span className="font-sans text-[10px] text-gray-400">Kolaborasi Showcase aktif</span>
                </div>

                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[8px] text-gray-400 uppercase">PELAMAR DISETUJUI</span>
                    <p className="font-pixel text-2xl text-yellow-300 mt-1">{approvedApps.length}</p>
                    <span className="font-sans text-[10px] text-gray-400">Bergabung via Quest Board</span>
                </div>

                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[8px] text-gray-400 uppercase">TOTAL QUEST TERSEDIA</span>
                    <p className="font-pixel text-2xl text-cyan-300 mt-1">{quests.length}</p>
                    <span className="font-sans text-[10px] text-gray-400">Target Gemastik &amp; Invention</span>
                </div>
            </div>

            {/* Roster Kolaborasi Tim */}
            <div className="bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 text-left">
                <span className="font-pixel text-[8.5px] text-yellow-400 uppercase border-b-2 border-gray-700/80 pb-2">
          // DAFTAR KOLABORASI TIM YANG TELAH TERBENTUK ({acceptedInvites.length})
                </span>

                {acceptedInvites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {acceptedInvites.map((inv) => (
                            <div key={inv.id} className="bg-[#18233a] border-2 border-retro-black p-4 rounded-xl flex flex-col gap-2 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="font-pixel text-[8.5px] bg-[#121b2d] text-pixel-green px-2 py-0.5 border border-pixel-green/40 rounded font-bold">
                                        {inv.project_title}
                                    </span>
                                    <span className="font-pixel text-[7px] bg-pixel-green text-retro-black px-1.5 py-0.5 rounded font-bold">
                                        ACTIVE SQUAD ✓
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-sans text-gray-200 mt-1">
                                    <span>Ketua: <strong className="text-yellow-300">{inv.sender_name}</strong></span>
                                    <span>➔</span>
                                    <span>Anggota: <strong className="text-white">{inv.receiver_name}</strong> ({inv.proposed_role})</span>
                                </div>

                                <p className="font-sans text-[11px] text-gray-400 italic">"{inv.note || "No custom note."}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center font-pixel text-xs text-gray-400">
                        BELUM ADA KOLABORASI TIM YANG DITERIMA.
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}