"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import Link from "next/link";

const GROUP_STYLES = {
    manager: {
        label: "MANAGER CLASS",
        border: "border-yellow-400/70 hover:border-yellow-400",
        badgeBg: "bg-yellow-400/10 border-yellow-400",
        dot: "bg-yellow-400",
    },
    designer: {
        label: "DESIGNER CLASS",
        border: "border-pink-400/70 hover:border-pink-400",
        badgeBg: "bg-pink-400/10 border-pink-400",
        dot: "bg-pink-400",
    },
    coder: {
        label: "TECHNICAL CLASS",
        border: "border-emerald-400/70 hover:border-emerald-400",
        badgeBg: "bg-emerald-400/10 border-emerald-400",
        dot: "bg-emerald-400",
    },
};

const rolesDetail = [
    { role: "Product Manager (PM)", icon: "💼", group: "manager", desc: "Menentukan visi produk, menganalisis kebutuhan pengguna, serta menyusun strategi bisnis untuk kompetisi seperti Gemastik / Invention." },
    { role: "Project / Scrum Master", icon: "⏱️", group: "manager", desc: "Mengatur alur kerja tim Agile/Scrum, membagi sprint pekerjaan, dan memastikan milestone proyek selesai tepat waktu." },
    { role: "UI/UX Designer", icon: "🎨", group: "designer", desc: "Merancang wireframe, alur penggunaan (user flow), serta tampilan visual aplikasi yang intuitif dan berestetika tinggi." },
    { role: "UX Researcher", icon: "🔍", group: "designer", desc: "Melakukan riset wawancara pengguna, validasi ide produk, serta menguji keterpakaian aplikasi (usability testing)." },
    { role: "Frontend Developer", icon: "💻", group: "coder", desc: "Membangun bagian antarmuka aplikasi web/mobile yang responsif dan interaktif menggunakan React, Next.js, dan Tailwind CSS." },
    { role: "Backend Developer", icon: "⚙️", group: "coder", desc: "Mengurus arsitektur server, API endpoint, manajemen database, dan keamanan logika bisnis aplikasi." },
    { role: "Full-stack Developer", icon: "🚀", group: "coder", desc: "Menguasai frontend sekaligus backend untuk menangani pembuatan sistem aplikasi secara end-to-end." },
    { role: "Mobile App Developer", icon: "📱", group: "coder", desc: "Fokus khusus mengembangkan aplikasi native Android/iOS menggunakan Flutter, React Native, Kotlin, atau Swift." },
    { role: "QA (Quality Assurance) Engineer", icon: "🛡️", group: "coder", desc: "Menguji keandalan sistem, melakukan automated testing, serta memastikan aplikasi bebas dari bug sebelum dipresentasikan." },
    { role: "DevOps Engineer", icon: "☁️", group: "coder", desc: "Mengatur otomatisasi deployment (CI/CD), pengelolaan cloud server (Vercel, AWS, Docker), dan pemantauan performa web." },
];

const faqs = [
    {
        q: "Apa itu PartyUp! dan untuk siapa platform ini dibuat?",
        a: "PartyUp! adalah platform pencari tim proyek (matchmaking) dan micro-networking berbasis 8-bit RPG yang dirancang khusus untuk mahasiswa IT Indonesia agar mudah menemukan rekan tim sefrekuensi untuk lomba GEMASTIK, INVENTION 2026, maupun proyek perkuliahan.",
    },
    {
        q: "Bagaimana cara mengajak mahasiswa lain bergabung dalam proyek saya?",
        a: "Masuk ke halaman QUEST BOARD (/board), klik tombol '+ DISPATCH QUEST', lalu isi judul proyek, target lomba, serta slot peran kelas yang Anda butuhkan. Misi Anda akan langsung tampil secara publik untuk di-apply mahasiswa lain!",
    },
    {
        q: "Bagaimana sistem level (LV) karakter dihitung?",
        a: "Level karakter dihitung otomatis dari 3 komponen: jumlah skill yang dikuasai (×2 poin), semester perkuliahan saat ini (×2 poin), dan jumlah quest/proyek yang sudah diselesaikan (×3 poin). Lihat rincian lengkapnya di section LEVEL SYSTEM di atas.",
    },
    {
        q: "Apakah pengguna biasa dapat mendaftar tanpa akun dummy?",
        a: "Bisa! Anda cukup masuk ke halaman Register (/register) untuk membuat karakter baru, memilih prodi, universitas, serta peran kelas RPG pilihan Anda.",
    },
    {
        q: "Apa bedanya QUEST BOARD, SHOWCASE, dan TIMELINE?",
        a: "QUEST BOARD untuk mencari/menawarkan tim proyek yang sedang berjalan. SHOWCASE adalah galeri portofolio proyek yang sudah selesai (bukti keahlian). TIMELINE adalah feed obrolan harian & update progress ala media sosial ringan.",
    },
];

const NAV_SECTIONS = [
    { id: "overview", label: "OVERVIEW" },
    { id: "level-system", label: "LEVEL SYSTEM" },
    { id: "roles", label: "ROLES" },
    { id: "faq", label: "FAQ" },
];

export default function GuildGuide() {
    const [activeFaq, setActiveFaq] = useState(null); // menyimpan teks pertanyaan yang sedang terbuka
    const [faqSearch, setFaqSearch] = useState("");

    const toggleFaq = (question) => {
        setActiveFaq(activeFaq === question ? null : question);
    };

    const filteredFaqs = useMemo(() => {
        const q = faqSearch.toLowerCase().trim();
        if (!q) return faqs;
        return faqs.filter(
            (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
        );
    }, [faqSearch]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
            <Header />

            {/* BANNER HERO GUILD GUIDE */}
            <section
                className="relative w-full min-h-[340px] md:min-h-[420px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-24 md:pt-28"
                style={{ backgroundImage: "url('/bg3.gif')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/80 via-black/50 to-[#0c1322] pointer-events-none z-0" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 md:py-14 text-center flex flex-col items-center justify-center gap-4">
                    <span className="font-pixel text-[9px] md:text-[11px] text-yellow-300 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        ✦ GUILD INSTRUCTION MANUAL ✦
                    </span>

                    <h1 className="font-pixel text-3xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
                        [ THE ADVENTURER&apos;S CODEX ]
                    </h1>

                    <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        Official guide manual on how to navigate the PartyUp! guild, understanding 10 IT class roles, and forming winning parties for <strong className="text-yellow-300 font-bold">GEMASTIK &amp; INVENTION 2026</strong>.
                    </p>
                </div>
            </section>

            {/* STICKY QUICK-NAV — lompat cepat antar section */}
            <nav className="sticky top-0 z-30 bg-[#0c1322]/95 backdrop-blur-sm border-b-4 border-retro-black">
                <div className="max-w-6xl mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto no-scrollbar">
                    {NAV_SECTIONS.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => scrollToSection(s.id)}
                            className="font-pixel text-[9px] md:text-[10px] text-gray-300 hover:text-yellow-300 whitespace-nowrap px-4 py-3.5 border-b-4 border-transparent hover:border-yellow-400 transition-colors cursor-pointer bg-transparent"
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-10 pb-16 flex flex-col gap-14">

                {/* SECTION 1: PENJELASAN TENTANG PARTYUP! */}
                <section id="overview" className="scroll-mt-16 bg-[#131f37] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-2 border-b-2 border-gray-700 pb-3">
                        <span className="font-pixel text-base text-yellow-400">📜</span>
                        <h2 className="font-pixel text-xs md:text-sm text-yellow-300 uppercase">// WHAT IS PARTYUP!?</h2>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed">
                        PartyUp! adalah platform micro-networking dan matchmaking tim berbasis tema 8-bit RPG yang memfasilitasi mahasiswa IT seluruh Indonesia untuk saling menemukan rekan tim terbaik.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="bg-[#1c2a4a] p-4 border-2 border-retro-black text-left hover:border-pixel-green transition-colors">
                            <span className="font-pixel text-[9px] text-pixel-green block mb-1">01. QUEST BOARD</span>
                            <p className="font-sans text-xs text-gray-300">Tempat ajak lomba, cari anggota tim, atau dispatch misi baru Anda.</p>
                        </div>
                        <div className="bg-[#1c2a4a] p-4 border-2 border-retro-black text-left hover:border-yellow-300 transition-colors">
                            <span className="font-pixel text-[9px] text-yellow-300 block mb-1">02. SHOWCASE</span>
                            <p className="font-sans text-xs text-gray-300">Galeri portofolio karya historis mahasiswa untuk dibuktikan keahliannya.</p>
                        </div>
                        <div className="bg-[#1c2a4a] p-4 border-2 border-retro-black text-left hover:border-sky-300 transition-colors">
                            <span className="font-pixel text-[9px] text-sky-300 block mb-1">03. TIMELINE</span>
                            <p className="font-sans text-xs text-gray-300">Feeds obrolan harian &amp; update progress tim antar sesama mahasiswa.</p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2 (BARU): LEVEL SYSTEM — sebelumnya dijelaskan di chat tapi belum ada di halaman */}
                <section id="level-system" className="scroll-mt-16 flex flex-col gap-6 text-left">
                    <div className="border-b-4 border-gray-700 pb-3">
                        <h2 className="font-pixel text-sm md:text-base text-yellow-300 mb-1">
                            [ CHARACTER LEVEL SYSTEM ]
                        </h2>
                        <p className="font-sans text-xs md:text-sm text-gray-300">
                            Level (LV) karaktermu dihitung otomatis dari 3 pencapaian nyata — bukan angka acak.
                        </p>
                    </div>

                    <div className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-6">
                        {/* Rumus visual */}
                        <div className="flex flex-wrap items-center justify-center gap-3 font-pixel text-[10px] md:text-xs">
                            <div className="flex flex-col items-center gap-1.5 bg-[#1c2a4a] border-2 border-emerald-400 px-4 py-3 min-w-[110px]">
                                <span className="text-emerald-300">SKILLS</span>
                                <span className="text-white">× 2</span>
                            </div>
                            <span className="text-yellow-400 text-lg">+</span>
                            <div className="flex flex-col items-center gap-1.5 bg-[#1c2a4a] border-2 border-sky-400 px-4 py-3 min-w-[110px]">
                                <span className="text-sky-300">SEMESTER</span>
                                <span className="text-white">× 2</span>
                            </div>
                            <span className="text-yellow-400 text-lg">+</span>
                            <div className="flex flex-col items-center gap-1.5 bg-[#1c2a4a] border-2 border-pink-400 px-4 py-3 min-w-[110px]">
                                <span className="text-pink-300">QUESTS</span>
                                <span className="text-white">× 3</span>
                            </div>
                            <span className="text-yellow-400 text-lg">=</span>
                            <div className="flex flex-col items-center gap-1.5 bg-retro-black border-2 border-yellow-400 px-5 py-3 min-w-[110px]">
                                <span className="text-yellow-300">YOUR LV.</span>
                                <span className="text-white">?</span>
                            </div>
                        </div>

                        {/* Contoh perhitungan */}
                        <div className="border-t-2 border-dashed border-gray-700 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                                <span className="font-pixel text-[9px] text-gray-400 block mb-1.5">// CONTOH PERHITUNGAN</span>
                                Joice — Semester 4, menguasai 5 skill, sudah menyelesaikan 2 quest:
                                <br />
                                <span className="text-gray-200">(5 × 2) + (4 × 2) + (2 × 3) = 10 + 8 + 6</span>
                            </div>
                            <div className="font-pixel text-2xl text-yellow-300 bg-retro-black border-2 border-yellow-400 px-6 py-3 shrink-0">
                                LV.24
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: 10 PENJELASAN CLASS ROLES IT */}
                <section id="roles" className="scroll-mt-16 flex flex-col gap-6 text-left">
                    <div className="border-b-4 border-gray-700 pb-3">
                        <h2 className="font-pixel text-sm md:text-base text-yellow-300 mb-1">
                            [ 10 SOFTWARE ENGINEERING RPG CLASSES ]
                        </h2>
                        <p className="font-sans text-xs md:text-sm text-gray-300 mb-3">
                            Pelajari peran 10 kelas keahlian Software Engineering dalam ekosistem PartyUp!:
                        </p>
                        {/* Legenda warna kelompok — konsisten dengan warna karakter di PixelAvatar */}
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(GROUP_STYLES).map(([key, g]) => (
                                <div key={key} className="flex items-center gap-2 font-pixel text-[8px] text-gray-400">
                                    <span className={`w-2.5 h-2.5 ${g.dot}`} />
                                    {g.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rolesDetail.map((item, index) => {
                            const g = GROUP_STYLES[item.group];
                            return (
                                <div
                                    key={index}
                                    className={`bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex gap-4 items-start transition-colors ${g.border}`}
                                >
                                    <div className={`w-10 h-10 border-2 flex items-center justify-center font-pixel text-lg shrink-0 ${g.badgeBg}`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-pixel text-xs text-yellow-300 font-bold">{item.role}</h3>
                                            <span className={`w-1.5 h-1.5 rounded-full ${g.dot}`} title={g.label} />
                                        </div>
                                        <p className="font-sans text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* SECTION 4: FAQ ACCORDION + SEARCH */}
                <section id="faq" className="scroll-mt-16 bg-[#131f37] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-gray-700 pb-3">
                        <h2 className="font-pixel text-xs md:text-sm text-yellow-300">// FREQUENTLY ASKED QUESTIONS (FAQ)</h2>
                        <p className="font-sans text-xs text-gray-400 mt-1">Pertanyaan umum seputar penggunaan platform PartyUp!:</p>
                    </div>

                    {/* Search bar FAQ */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-pixel text-[8px] text-yellow-400">// SEARCH QUESTIONS</label>
                        <input
                            type="text"
                            placeholder="e.g. level, dispatch, register..."
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                            className="w-full md:w-1/2 font-sans text-xs p-2.5 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 placeholder-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => {
                                const isOpen = activeFaq === faq.q;
                                return (
                                    <div
                                        key={index}
                                        className="bg-[#1c2a4a] border-2 border-retro-black rounded overflow-hidden transition-colors hover:border-yellow-400/50"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(faq.q)}
                                            className="w-full p-4 text-left flex justify-between items-center gap-3 font-pixel text-[10px] text-white hover:text-yellow-300 cursor-pointer bg-transparent border-none"
                                        >
                                            <span>{faq.q}</span>
                                            <span className={`text-yellow-400 font-bold text-xs shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
                                        </button>

                                        <div
                                            className="grid transition-all duration-300 ease-in-out"
                                            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="p-4 border-t border-gray-700 bg-[#121b2d] font-sans text-xs text-gray-200 leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 font-pixel text-[10px] text-gray-400">
                                ? ? ? NO QUESTIONS MATCH "{faqSearch}"
                            </div>
                        )}
                    </div>
                </section>

                {/* CALL TO ACTION BOTTOM */}
                <section className="text-center py-4 flex flex-col items-center gap-4">
                    <p className="font-pixel text-xs text-yellow-300">READY TO START YOUR PARTY ADVENTURE?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/register">
                            <PixelButton variant="secondary" className="py-3 px-8 text-xs">
                                CREATE CHARACTER ✦
                            </PixelButton>
                        </Link>
                        <Link href="/board">
                            <PixelButton variant="green" className="py-3 px-8 text-xs">
                                GO TO QUEST BOARD ▶
                            </PixelButton>
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}