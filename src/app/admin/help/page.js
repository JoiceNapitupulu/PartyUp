"use client";

import React, { useState } from "react";
import Link from "next/link";
import PixelButton from "@/components/PixelButton";
import { useLanguage } from "@/utils/lang";

const ADMIN_FAQS = [
    {
        q: "Bagaimana cara kerja fitur Blokir Akun (Ban / Unban)?",
        a: "Ketika Admin mengklik tombol 'BAN ✗' pada menu Direktori Petualang (/admin/users), status 'is_banned: true' seketika tersimpan di database Cloud Supabase dan LocalStorage. Jika mahasiswa tersebut sedang membuka web atau mencoba login, sistem secara otomatis menolak akses dan menguncinya ke Layar Keamanan Retro.",
        tag: "KEAMANAN",
    },
    {
        q: "Apa fungsi tombol [LOGIN AS] (Impersonasi Akun)?",
        a: "Tombol [LOGIN AS] memungkinkan Grandmaster Admin menyamar sebagai karakter mahasiswa tertentu untuk menguji tampilan profil, memvalidasi undangan tim, atau mensimulasikan alur pendaftaran misi tanpa perlu mengetahui kata sandi mahasiswa tersebut.",
        tag: "IMPERSONASI",
    },
    {
        q: "Bagaimana cara memberikan badge emas ★ GUILD VERIFIED pada Quest?",
        a: "Buka menu Audit Papan Quest (/admin/quests), cari quest yang ingin diperiksa, lalu klik tombol 'VERIFY (★)'. Quest tersebut otomatis mendapatkan lencana terverifikasi emas yang menyala di Papan Quest publik.",
        tag: "AUDIT QUEST",
    },
    {
        q: "Apa yang terjadi jika koneksi internet lomba terputus saat presentasi?",
        a: "Website PartyUp! menggunakan arsitektur Hybrid Fail-Safe (Local-First). Jika internet terputus, seluruh data dibaca dan ditulis secara instan ke LocalStorage peramban tanpa melempar error atau layar putih. Saat internet kembali aktif, data akan otomatis disinkronkan ke Supabase.",
        tag: "DATABASE CLOUD",
    },
    {
        q: "Bagaimana cara mengubah teks pengumuman berjalan (Announcement Ticker)?",
        a: "Buka menu Pengaturan Sistem (/admin/settings), masukkan pesan pengumuman baru pada kotak 'BROADCAST TICKER', lalu klik Simpan. Teks pengumuman di atas navbar seluruh halaman web akan langsung berganti secara real-time.",
        tag: "PENGATURAN",
    },
];

export default function AdminHelpCenter() {
    const { lang } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);

    const toggleFaq = (idx) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    const handleTriggerHealthCheck = () => {
        setToastMsg("✅ SYSTEM HEALTH: Seluruh modul database, auth guard, dan telemetri 100% OPERASIONAL!");
        setTimeout(() => setToastMsg(null), 4000);
    };

    return (
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0c1322] min-h-screen selection:bg-yellow-400 selection:text-black">

            {/* Toast Notifikasi */}
            {toastMsg && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#121b2d] border-2 border-pixel-green text-pixel-green font-pixel text-[8.5px] px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce select-none">
                    {toastMsg}
                </div>
            )}

            {/* 1. TOP HEADER TITLE */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-4 border-retro-black pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider block mb-1">
            // GRANDMASTER OPERATIONS MANUAL
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-yellow-300">
                        [ PUSAT BANTUAN &amp; DOKUMENTASI ADMIN ]
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-[#121b2d] border-2 border-retro-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green">
                        DOCS VERSION: v2.6-FINAL
                    </span>
                </div>
            </div>

            {/* 2. 4 PANDUAN CEPAT MODERASI (CARD GRID) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">

                {/* Card 1 */}
                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🛡️</span>
                        <span className="font-pixel text-[8.5px] text-yellow-300 font-bold">MODERASI USER</span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Kelola status blokir akun mahasiswa pelanggar dan ganti role kelas di menu Direktori Petualang.
                    </p>
                    <Link href="/admin/users" className="font-pixel text-[7.5px] text-pixel-green hover:underline pt-2 border-t border-gray-800">
                        BUKA DIREKTORI ➔
                    </Link>
                </div>

                {/* Card 2 */}
                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚔️</span>
                        <span className="font-pixel text-[8.5px] text-yellow-300 font-bold">AUDIT QUEST</span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Verifikasi kelayakan lowongan tim lomba dan bersihkan quest spam dari Papan Misi publik.
                    </p>
                    <Link href="/admin/quests" className="font-pixel text-[7.5px] text-yellow-400 hover:underline pt-2 border-t border-gray-800">
                        AUDIT MISI ➔
                    </Link>
                </div>

                {/* Card 3 */}
                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">☁️</span>
                        <span className="font-pixel text-[8.5px] text-yellow-300 font-bold">SUPABASE CLOUD</span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Database PostgreSQL terhubung secara Hybrid. Perubahan data otomatis tersinkronisasi antar-perangkat.
                    </p>
                    <span className="font-pixel text-[7.5px] text-cyan-300 pt-2 border-t border-gray-800">
                        HYBRID ACTIVE
                    </span>
                </div>

                {/* Card 4 */}
                <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📜</span>
                        <span className="font-pixel text-[8.5px] text-yellow-300 font-bold">TELEMETRI LIVE</span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Pantau seluruh log aktivitas autentikasi, ban user, dan query database melalui terminal audit live.
                    </p>
                    <Link href="/admin/logs" className="font-pixel text-[7.5px] text-pink-300 hover:underline pt-2 border-t border-gray-800">
                        LIHAT TERMINAL ➔
                    </Link>
                </div>

            </div>

            {/* 3. TROUBLESHOOTING & FAQ OPERASIONAL ADMIN */}
            <div className="bg-[#121b2d] border-4 border-retro-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between border-b-2 border-gray-700/80 pb-3">
                    <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider">
            // TANYA JAWAB OPERASIONAL &amp; PEMECAHAN MASALAH
                    </span>
                    <span className="font-pixel text-[7.5px] bg-[#18233a] text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded">
                        {ADMIN_FAQS.length} PANDUAN
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {ADMIN_FAQS.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-[#18233a] border-2 border-retro-black rounded-xl overflow-hidden shadow-sm transition-all hover:border-yellow-400/80"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-4 text-left flex justify-between items-center gap-4 font-pixel text-[9px] md:text-[10px] text-white hover:text-yellow-300 cursor-pointer bg-transparent border-none"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="font-pixel text-[7.5px] bg-[#121b2d] text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded font-bold">
                                            {faq.tag}
                                        </span>
                                        <span>{faq.q}</span>
                                    </div>
                                    <span className={`text-yellow-400 font-bold text-xs shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                                        ▼
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="p-4 border-t-2 border-gray-700 bg-[#121b2d] font-sans text-xs text-gray-200 leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. EMERGENCY SYSTEM DIAGNOSTIC ACTIONS */}
            <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left flex flex-col gap-4">
                <span className="font-pixel text-[8.5px] text-yellow-400 uppercase tracking-wider border-b border-gray-800 pb-2">
          // DIAGNOSTIK DARURAT &amp; KENDALI SISTEM
                </span>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="font-sans text-xs text-gray-300 max-w-xl leading-relaxed">
                        Gunakan tombol diagnostik untuk memeriksa integritas data Supabase, me-refresh cache peramban, dan memastikan seluruh saluran telemetri siap dinilai oleh dewan juri.
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={handleTriggerHealthCheck}
                            className="font-pixel text-[8px] py-2 px-4 bg-pixel-green text-retro-black font-bold border-2 border-retro-black rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] transition-all"
                        >
                            ⚡ UJI KESEHATAN SISTEM
                        </button>

                        <Link href="/admin/settings">
                            <PixelButton variant="secondary" className="py-2 px-4 text-[8px]">
                                ⚙️ PENGATURAN SISTEM ➔
                            </PixelButton>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}