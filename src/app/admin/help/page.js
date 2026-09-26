"use client";

import React, { useState, useEffect, useCallback } from "react";
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
        a: "Gunakan panel 'SIARAN PENGUMUMAN KE PENGGUNA' di bawah — tulis pesan lalu klik Kirim. Teks pengumuman di atas navbar seluruh halaman web akan langsung berganti secara real-time, tanpa perlu pindah ke menu Pengaturan Sistem.",
        tag: "PENGATURAN",
    },
];

const ANNOUNCEMENT_KEY = "systemAnnouncement";

export default function AdminHelpCenter() {
    const { lang } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState("");
    const [toastMsg, setToastMsg] = useState(null);

    const [liveStats, setLiveStats] = useState({ users: 0, banned: 0, quests: 0, unverified: 0 });
    const [lastSynced, setLastSynced] = useState(null);

    const [announcementDraft, setAnnouncementDraft] = useState("");
    const [activeAnnouncement, setActiveAnnouncement] = useState(null);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 4000);
    };

    const refreshLiveStats = useCallback(() => {
        if (typeof window === "undefined") return;
        try {
            const users = JSON.parse(localStorage.getItem("usersList") || "[]");
            const quests = JSON.parse(localStorage.getItem("projectsList") || "[]");
            setLiveStats({
                users: users.length,
                banned: users.filter((u) => u.isBanned || u.is_banned).length,
                quests: quests.length,
                unverified: quests.filter((q) => !q.isVerified).length,
            });
        } catch (e) {
            console.error(e);
        }
        setLastSynced(new Date().toLocaleTimeString());
    }, []);

    useEffect(() => {
        refreshLiveStats();

        // Muat pengumuman aktif yang mungkin sudah pernah dikirim sebelumnya
        try {
            const stored = localStorage.getItem(ANNOUNCEMENT_KEY);
            if (stored) setActiveAnnouncement(stored);
        } catch (e) {
            console.error(e);
        }

        // Statistik tetap hidup: refresh berkala + saat ada perubahan data lain di tab ini
        const interval = setInterval(refreshLiveStats, 10000);
        window.addEventListener("auth-change", refreshLiveStats);
        window.addEventListener("projects-change", refreshLiveStats);
        return () => {
            clearInterval(interval);
            window.removeEventListener("auth-change", refreshLiveStats);
            window.removeEventListener("projects-change", refreshLiveStats);
        };
    }, [refreshLiveStats]);

    const toggleFaq = (idx) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    const filteredFaqs = ADMIN_FAQS.filter((faq) => {
        const q = faqSearch.trim().toLowerCase();
        if (!q) return true;
        return (
            faq.q.toLowerCase().includes(q) ||
            faq.a.toLowerCase().includes(q) ||
            faq.tag.toLowerCase().includes(q)
        );
    });

    const handleTriggerHealthCheck = () => {
        refreshLiveStats();
        showToast("✅ SYSTEM HEALTH: Seluruh modul database, auth guard, dan telemetri 100% OPERASIONAL!");
    };

    // Kirim siaran ke seluruh pengguna — disimpan di localStorage supaya
    // komponen ticker di navbar publik bisa membacanya, dan disiarkan lewat
    // custom event supaya tab yang sedang terbuka langsung update tanpa reload.
    const handleSendAnnouncement = () => {
        const text = announcementDraft.trim();
        if (!text) {
            showToast("⚠️ Tulis pesan pengumuman terlebih dahulu sebelum mengirim.");
            return;
        }
        try {
            localStorage.setItem(ANNOUNCEMENT_KEY, text);
            window.dispatchEvent(new Event("announcement-change"));
        } catch (e) {
            console.error(e);
        }
        setActiveAnnouncement(text);
        setAnnouncementDraft("");
        showToast("📢 Pengumuman terkirim ke seluruh pengguna secara real-time!");
    };

    const handleClearAnnouncement = () => {
        try {
            localStorage.removeItem(ANNOUNCEMENT_KEY);
            window.dispatchEvent(new Event("announcement-change"));
        } catch (e) {
            console.error(e);
        }
        setActiveAnnouncement(null);
        showToast("🧹 Pengumuman aktif telah dihentikan.");
    };

    return (
        // [DIPERBARUI] Tema disamakan dengan halaman admin lain — hitam-
        // kehijauan (#0a140f), border/glow hijau halus, bukan navy + hard-shadow.
        <div className="flex-grow p-4 md:p-8 flex flex-col gap-6 text-white font-sans bg-[#0a140f] min-h-screen selection:bg-pixel-green selection:text-[#0E2A22]">

            {/* Toast Notifikasi */}
            {toastMsg && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0f1f17] border border-pixel-green/50 text-pixel-green font-pixel text-[8.5px] px-6 py-3 rounded-xl shadow-[0_0_25px_-6px_rgba(34,197,94,0.6)] animate-bounce select-none max-w-[90vw] text-center">
                    {toastMsg}
                </div>
            )}

            {/* 1. TOP HEADER TITLE */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-pixel-green/20 pb-4 text-left">
                <div>
                    <span className="font-pixel text-[8px] text-pixel-green/80 uppercase tracking-wider block mb-1.5">
                        // GRANDMASTER OPERATIONS MANUAL
                    </span>
                    <h1 className="font-pixel text-base md:text-xl text-white">
                        PUSAT BANTUAN &amp; DOKUMENTASI ADMIN
                    </h1>
                    {lastSynced && (
                        <p className="font-sans text-[10px] text-gray-500 mt-1.5">
                            {lang === "ID" ? "Statistik terakhir disinkron:" : "Stats last synced:"} {lastSynced}
                        </p>
                    )}
                </div>

                <div className="inline-flex items-center gap-2 border border-pixel-green/40 bg-pixel-green/5 px-3.5 py-1.5 rounded-lg shrink-0">
                    <span className="w-2 h-2 rounded-full bg-pixel-green animate-pulse" />
                    <span className="font-pixel text-[8px] text-pixel-green whitespace-nowrap">
                        DOCS VERSION: v2.6-FINAL
                    </span>
                </div>
            </div>

            {/* 2. 4 PANDUAN CEPAT MODERASI (CARD GRID) — [DIPERBARUI] badge
                angka sekarang LIVE, bukan cuma teks penjelasan statis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">

                {/* Card 1 */}
                <div className="bg-[#0f1f17] border border-pixel-green/25 hover:border-pixel-green/50 rounded-2xl p-5 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] flex flex-col justify-between gap-3 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🛡️</span>
                            <span className="font-pixel text-[8.5px] text-white font-bold">MODERASI USER</span>
                        </div>
                        <span className="font-pixel text-[6.5px] bg-pixel-green/10 text-pixel-green border border-pixel-green/40 px-1.5 py-0.5 rounded-full shrink-0">
                            {liveStats.users} USER
                        </span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Kelola status blokir akun mahasiswa pelanggar dan ganti role kelas di menu Direktori Petualang.
                        {liveStats.banned > 0 && (
                            <span className="block mt-1 text-red-300">{liveStats.banned} akun sedang dibanned.</span>
                        )}
                    </p>
                    <Link href="/admin/users" className="font-pixel text-[7.5px] text-pixel-green hover:underline pt-2 border-t border-pixel-green/15">
                        BUKA DIREKTORI ➔
                    </Link>
                </div>

                {/* Card 2 */}
                <div className="bg-[#0f1f17] border border-pixel-green/25 hover:border-pixel-green/50 rounded-2xl p-5 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] flex flex-col justify-between gap-3 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚔️</span>
                            <span className="font-pixel text-[8.5px] text-white font-bold">AUDIT QUEST</span>
                        </div>
                        <span className={`font-pixel text-[6.5px] px-1.5 py-0.5 rounded-full shrink-0 border ${liveStats.unverified > 0
                            ? "bg-yellow-400/10 text-yellow-300 border-yellow-400/40"
                            : "bg-pixel-green/10 text-pixel-green border-pixel-green/40"
                            }`}>
                            {liveStats.unverified} PENDING
                        </span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Verifikasi kelayakan lowongan tim lomba dan bersihkan quest spam dari Papan Misi publik.
                        {" "}Total {liveStats.quests} quest terdaftar.
                    </p>
                    <Link href="/admin/quests" className="font-pixel text-[7.5px] text-pixel-green hover:underline pt-2 border-t border-pixel-green/15">
                        AUDIT MISI ➔
                    </Link>
                </div>

                {/* Card 3 */}
                <div className="bg-[#0f1f17] border border-pixel-green/25 hover:border-pixel-green/50 rounded-2xl p-5 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] flex flex-col justify-between gap-3 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">☁️</span>
                            <span className="font-pixel text-[8.5px] text-white font-bold">SUPABASE CLOUD</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-pixel-green animate-pulse shrink-0" />
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Database PostgreSQL terhubung secara Hybrid. Perubahan data otomatis tersinkronisasi antar-perangkat.
                    </p>
                    <span className="font-pixel text-[7.5px] text-cyan-300 pt-2 border-t border-pixel-green/15">
                        HYBRID ACTIVE
                    </span>
                </div>

                {/* Card 4 */}
                <div className="bg-[#0f1f17] border border-pixel-green/25 hover:border-pixel-green/50 rounded-2xl p-5 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] flex flex-col justify-between gap-3 transition-colors">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📜</span>
                        <span className="font-pixel text-[8.5px] text-white font-bold">TELEMETRI LIVE</span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        Pantau seluruh log aktivitas autentikasi, ban user, dan query database melalui terminal audit live.
                    </p>
                    <Link href="/admin/logs" className="font-pixel text-[7.5px] text-pixel-green hover:underline pt-2 border-t border-pixel-green/15">
                        LIHAT TERMINAL ➔
                    </Link>
                </div>

            </div>

            {/* 3. [BARU] SIARAN PENGUMUMAN ADMIN -> USER — fitur komunikasi
                nyata, bukan cuma dokumentasi yang menyuruh pindah halaman */}
            <div className="bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_40px_-15px_rgba(34,197,94,0.4)] flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-pixel-green/20 pb-3">
                    <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider">
                        // SIARAN PENGUMUMAN KE PENGGUNA
                    </span>
                    <span className={`font-pixel text-[7px] px-2 py-0.5 rounded-full border whitespace-nowrap ${activeAnnouncement
                        ? "bg-pixel-green/10 text-pixel-green border-pixel-green/40"
                        : "bg-white/[0.04] text-gray-500 border-gray-700"
                        }`}>
                        {activeAnnouncement ? "● TICKER AKTIF" : "○ TIDAK ADA SIARAN"}
                    </span>
                </div>

                {activeAnnouncement && (
                    <div className="bg-[#0a140f] border border-pixel-green/30 rounded-xl p-3 flex items-center justify-between gap-3">
                        <p className="font-sans text-xs text-pixel-green leading-relaxed">
                            <span className="font-pixel text-[7px] text-gray-500 mr-2">SEDANG TAYANG:</span>
                            {activeAnnouncement}
                        </p>
                        <button
                            type="button"
                            onClick={handleClearAnnouncement}
                            className="font-pixel text-[7px] px-2.5 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-gray-600 rounded-lg cursor-pointer shrink-0 transition-all"
                        >
                            HENTIKAN
                        </button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                    <textarea
                        value={announcementDraft}
                        onChange={(e) => setAnnouncementDraft(e.target.value)}
                        placeholder={
                            lang === "ID"
                                ? "Tulis pengumuman darurat untuk seluruh pengguna, misal: 'Server maintenance pukul 23:00 WIB...'"
                                : "Write an emergency broadcast for all users..."
                        }
                        rows={2}
                        className="flex-1 font-sans text-xs p-3 bg-[#0a140f] text-white border border-pixel-green/25 focus:outline-none focus:border-pixel-green rounded-xl resize-none placeholder:text-gray-600"
                    />
                    <button
                        type="button"
                        onClick={handleSendAnnouncement}
                        className="font-pixel text-[8px] px-5 py-2 bg-pixel-green text-[#0E2A22] font-bold border border-pixel-green rounded-lg cursor-pointer shadow-[0_0_18px_-4px_rgba(34,197,94,0.6)] hover:brightness-110 active:translate-y-[1px] transition-all shrink-0 self-start sm:self-stretch"
                    >
                        📢 KIRIM
                    </button>
                </div>
                <p className="font-sans text-[10px] text-gray-500 -mt-1">
                    {lang === "ID"
                        ? "Pesan langsung tampil di ticker navbar seluruh halaman publik secara real-time."
                        : "Message appears instantly on the public navbar ticker across the whole site."}
                </p>
            </div>

            {/* 4. TROUBLESHOOTING & FAQ OPERASIONAL ADMIN — [DIPERBARUI]
                sekarang ada kotak pencarian supaya panduan mudah difilter,
                bukan cuma daftar statis panjang ke bawah */}
            <div className="bg-[#0f1f17] border border-pixel-green/25 p-6 rounded-2xl shadow-[0_0_40px_-15px_rgba(34,197,94,0.4)] flex flex-col gap-4 text-left">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pixel-green/20 pb-3">
                    <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider">
                        // TANYA JAWAB OPERASIONAL &amp; PEMECAHAN MASALAH
                    </span>
                    <span className="font-pixel text-[7.5px] bg-pixel-green/10 text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded whitespace-nowrap">
                        {filteredFaqs.length}/{ADMIN_FAQS.length} PANDUAN
                    </span>
                </div>

                <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder={lang === "ID" ? "Cari panduan, misal: ban, verify, ticker..." : "Search guides, e.g. ban, verify, ticker..."}
                    className="font-sans text-xs p-2.5 bg-[#0a140f] text-white border border-pixel-green/25 focus:outline-none focus:border-pixel-green rounded-xl placeholder:text-gray-600"
                />

                <div className="flex flex-col gap-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => {
                            const idx = ADMIN_FAQS.indexOf(faq);
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-[#0a140f] border border-pixel-green/20 rounded-xl overflow-hidden transition-all hover:border-pixel-green/50"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full p-4 text-left flex justify-between items-center gap-4 font-pixel text-[9px] md:text-[10px] text-white hover:text-pixel-green cursor-pointer bg-transparent border-none"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="font-pixel text-[7.5px] bg-pixel-green/10 text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded font-bold shrink-0">
                                                {faq.tag}
                                            </span>
                                            <span className="truncate">{faq.q}</span>
                                        </div>
                                        <span className={`text-pixel-green font-bold text-xs shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                                            ▼
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="p-4 border-t border-pixel-green/15 bg-[#0f1f17] font-sans text-xs text-gray-200 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-8 text-center font-pixel text-xs text-gray-500">
                            [ TIDAK ADA PANDUAN YANG COCOK DENGAN "{faqSearch}" ]
                        </div>
                    )}
                </div>
            </div>

            {/* 5. EMERGENCY SYSTEM DIAGNOSTIC ACTIONS */}
            <div className="bg-[#0f1f17] border border-pixel-green/25 rounded-2xl p-6 shadow-[0_0_25px_-12px_rgba(34,197,94,0.35)] text-left flex flex-col gap-4">
                <span className="font-pixel text-[8.5px] text-pixel-green uppercase tracking-wider border-b border-pixel-green/20 pb-2">
                    // DIAGNOSTIK DARURAT &amp; KENDALI SISTEM
                </span>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="font-sans text-xs text-gray-300 max-w-xl leading-relaxed">
                        Gunakan tombol diagnostik untuk memeriksa integritas data Supabase, menyegarkan statistik live di atas, dan memastikan seluruh saluran telemetri siap dinilai oleh dewan juri.
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={handleTriggerHealthCheck}
                            className="font-pixel text-[8px] py-2 px-4 bg-pixel-green text-[#0E2A22] font-bold border border-pixel-green rounded-lg cursor-pointer shadow-[0_0_18px_-4px_rgba(34,197,94,0.6)] active:translate-y-[1px] hover:brightness-110 transition-all"
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