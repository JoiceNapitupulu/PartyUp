"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import Link from "next/link";
import { useLanguage } from "../../utils/lang";

const NAV_SECTIONS = [
    { id: "overview", labelID: "RINGKASAN", labelEN: "OVERVIEW", icon: "🌐" },
    { id: "level-system", labelID: "SISTEM LEVEL", labelEN: "LEVEL SYSTEM", icon: "⭐" },
    { id: "roles", labelID: "10 KELAS RPG", labelEN: "10 RPG CLASSES", icon: "⚔️" },
    { id: "walkthrough", labelID: "VIDEO PANDUAN", labelEN: "VIDEO DEMO", icon: "🎬" },
    { id: "faq", labelID: "FAQ & BANTUAN", labelEN: "FAQ & HELP", icon: "❓" },
];

export default function GuildGuide() {
    const { lang, t } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState("");
    const [selectedRoleGroup, setSelectedRoleGroup] = useState("ALL");
    const [activeNav, setActiveNav] = useState("overview");

    // Style badge kategori peran
    const groupStyles = useMemo(() => ({
        manager: {
            label: lang === "ID" ? "MANAJEMEN (2)" : "MANAGEMENT (2)",
            badge: "bg-yellow-400/20 text-yellow-300 border-yellow-400/50",
            dot: "bg-yellow-400",
        },
        designer: {
            label: lang === "ID" ? "DESAIN (2)" : "DESIGN (2)",
            badge: "bg-pink-400/20 text-pink-300 border-pink-400/50",
            dot: "bg-pink-400",
        },
        coder: {
            label: lang === "ID" ? "TEKNIKAL (6)" : "TECHNICAL (6)",
            badge: "bg-emerald-400/20 text-emerald-300 border-emerald-400/50",
            dot: "bg-emerald-400",
        },
    }), [lang]);

    // Daftar 10 Kelas RPG (Bahasa Indonesia Utama dengan Istilah IT Resmi)
    const rolesDetail = useMemo(() => [
        {
            role: "Product Manager (PM)",
            icon: "💼",
            group: "manager",
            desc: lang === "ID"
                ? "Menentukan visi produk, memprioritaskan backlog fitur, menyusun analisis kebutuhan pengguna, dan merumuskan strategi bisnis untuk kompetisi Gemastik maupun Invention."
                : "Defines product vision, prioritizes feature backlogs, conducts market sizing, and aligns business strategy for Gemastik / Invention competitions.",
            skills: ["Product Strategy", "Scrum / Agile", "Pitch Deck", "PRD"],
            targetDivision: "Gemastik: Pengembangan Bisnis & Perangkat Lunak",
        },
        {
            role: "Project / Scrum Master",
            icon: "⏱️",
            group: "manager",
            desc: lang === "ID"
                ? "Memfasilitasi alur kerja sprint Agile/Scrum tim, mengatasi hambatan teknis, memimpin evaluasi sprint, dan memastikan pencapaian target Quest selesai tepat waktu."
                : "Facilitates Agile/Scrum sprint workflows, removes team blockers, coordinates sprint retrospectives, and ensures quest milestones are delivered on time.",
            skills: ["Sprint Planning", "Jira / Trello", "Manajemen Risiko", "Dinamika Tim"],
            targetDivision: "Proyek Capstone & Hackathon Sprint",
        },
        {
            role: "UI/UX Designer",
            icon: "🎨",
            group: "designer",
            desc: lang === "ID"
                ? "Merancang alur navigasi pengguna (User Journey), wireframe, design system, dan prototipe high-fidelity yang memikat serta divalidasi dengan metrik uji kegunaan."
                : "Crafts intuitive user journeys, wireframes, design systems, and pixel-perfect high-fidelity prototypes validated with usability metrics.",
            skills: ["Figma", "Design Systems", "Prototyping", "Micro-Interactions"],
            targetDivision: "Gemastik: Desain Pengalaman Pengguna (UX)",
        },
        {
            role: "UX Researcher",
            icon: "🔍",
            group: "designer",
            desc: lang === "ID"
                ? "Melakukan wawancara mendalam dengan pengguna, menyusun peta empati, mendefinisikan persona mahasiswa, dan menguji kegunaan produk menggunakan metode SUS Scoring."
                : "Conducts deep user interviews, builds behavioral empathy maps, defines student personas, and executes usability testing (SUS & Usability Hub).",
            skills: ["Wawancara Pengguna", "SUS Scoring", "Pemetaan Persona", "A/B Testing"],
            targetDivision: "Gemastik: UX Design & Human-Computer Interaction",
        },
        {
            role: "Frontend Developer",
            icon: "💻",
            group: "coder",
            desc: lang === "ID"
                ? "Membangun antarmuka web interaktif yang responsif, mengelola arsitektur state management, dan mengoptimalkan performa halaman dengan Next.js, React, dan Tailwind CSS."
                : "Builds high-performance, responsive client interfaces, state management architectures, and smooth interactive animations with zero layout shift.",
            skills: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
            targetDivision: "Gemastik: Pengembangan Perangkat Lunak & Web",
        },
        {
            role: "Backend Developer",
            icon: "⚙️",
            group: "coder",
            desc: lang === "ID"
                ? "Merancang arsitektur server yang tangguh, skema basis data relasional/NoSQL, keamanan autentikasi token, dan layanan REST API atau GraphQL berlatensi rendah."
                : "Architects robust server infrastructure, database schemas, secure token authentications, and low-latency RESTful or GraphQL APIs.",
            skills: ["Node.js", "Golang", "PostgreSQL", "Docker", "REST API"],
            targetDivision: "Gemastik: Arsitektur Sistem & Rekayasa Server",
        },
        {
            role: "Full-stack Developer",
            icon: "🚀",
            group: "coder",
            desc: lang === "ID"
                ? "Menguasai sisi frontend dan backend secara terpadu, menghubungkan transaksi database yang kompleks dengan tampilan antarmuka pengguna secara end-to-end."
                : "Master of both client and server domains, seamlessly bridging complex database transactions with intuitive user interfaces end-to-end.",
            skills: ["Fullstack TS/JS", "Prisma ORM", "Next.js App Router", "Supabase"],
            targetDivision: "Invention 2026 & Hackathon Inovasi",
        },
        {
            role: "Mobile App Developer",
            icon: "📱",
            group: "coder",
            desc: lang === "ID"
                ? "Spesialis pembuat aplikasi mobile cross-platform untuk Android dan iOS menggunakan Flutter atau React Native, terintegrasi dengan sensor perangkat dan notifikasi lokal."
                : "Specializes in cross-platform mobile apps for Android and iOS, implementing native hardware APIs, offline storage, and push notifications.",
            skills: ["Flutter", "React Native", "Kotlin", "Firebase"],
            targetDivision: "Gemastik: Pengembangan Aplikasi Perangkat Bergerak",
        },
        {
            role: "QA (Quality Assurance) Engineer",
            icon: "🛡️",
            group: "coder",
            desc: lang === "ID"
                ? "Menjalankan skenario pengujian otomatis end-to-end, load testing beban server, dan verifikasi keamanan sistem untuk memastikan aplikasi bebas bug saat dinilai juri."
                : "Executes automated end-to-end test suites, stress testing, and vulnerability verification to ensure zero critical bugs before pitching to judges.",
            skills: ["Jest", "Cypress", "Postman", "Automated E2E Testing"],
            targetDivision: "Keandalan Perangkat Lunak & Gemastik",
        },
        {
            role: "DevOps Engineer",
            icon: "☁️",
            group: "coder",
            desc: lang === "ID"
                ? "Mengelola otomatisasi pipeline CI/CD, deployment cloud server (Vercel, AWS, Docker), konfigurasi kontainer, dan memantau stabilitas uptime sistem 24/7."
                : "Manages CI/CD automated deployment pipelines, cloud server orchestration, containerization, and 24/7 uptime monitoring telemetry.",
            skills: ["Docker", "GitHub Actions", "Vercel", "AWS / GCP"],
            targetDivision: "Infrastruktur Cloud & Server Kompetisi",
        },
    ], [lang]);

    // Daftar FAQ Bilingual (Bahasa Indonesia Utama)
    const faqs = useMemo(() => [
        {
            q: lang === "ID"
                ? "Apa itu PartyUp! dan untuk siapa platform ini dibuat?"
                : "What is PartyUp! and who is it designed for?",
            a: lang === "ID"
                ? "PartyUp! adalah platform pencarian rekan tim (matchmaking Party) dan micro-networking mahasiswa bertema RPG 8-bit yang dirancang khusus untuk mahasiswa IT, Desain, dan Bisnis di Indonesia. Platform ini mempermudah pembentukan tim lomba untuk GEMASTIK, INVENTION 2026, maupun proyek capstone kuliah."
                : "PartyUp! is an 8-bit RPG-themed student micro-networking and party matchmaking platform designed specifically for Indonesian IT students. It bridges the gap between coders, designers, and managers to easily form winning teams for GEMASTIK, INVENTION 2026, and university capstone projects.",
            tag: lang === "ID" ? "RINGKASAN" : "OVERVIEW",
        },
        {
            q: lang === "ID"
                ? "Bagaimana cara merekrut anggota tim untuk proyek lomba saya?"
                : "How do I recruit other students for my competition project?",
            a: lang === "ID"
                ? "Buka menu Papan Quest (/board), klik '+ TERBITKAN QUEST', isi judul proyek, target divisi kompetisi, dan slot peran yang dicari. Misi kamu akan langsung terdaftar di papan terbuka agar mahasiswa lain dapat melamar dengan portofolio terverifikasi!"
                : "Navigate to the QUEST BOARD (/board), click '+ DISPATCH QUEST', fill in your project title, target competition division, and open class slots. Your quest will immediately be listed for adventurers to apply with their verified portfolios!",
            tag: "QUEST BOARD",
        },
        {
            q: lang === "ID"
                ? "Bagaimana rating Level (LV.) karakter dihitung secara otomatis?"
                : "How is character level (LV.) automatically calculated?",
            a: lang === "ID"
                ? "Level karakter dihitung secara deterministik menggunakan rumus 3 pilar: Total Skill Terverifikasi (×2 poin) + Semester Akademik Saat Ini (×2 poin) + Quest Portofolio Selesai (×3 poin). Level akan bertambah otomatis secara real-time di seluruh sistem."
                : "Character LV. is dynamically computed using a fair 3-pillar formula: Total Verified Skills (×2 pts) + Current Academic Semester (×2 pts) + Completed Portfolio Quests (×3 pts). Level updates in real-time across the platform.",
            tag: "LEVEL SYSTEM",
        },
        {
            q: lang === "ID"
                ? "Bisakah saya merekrut langsung mahasiswa dari galeri portofolio mereka?"
                : "Can I directly invite a specific student from their showcase?",
            a: lang === "ID"
                ? "Tentu saja! Pada galeri Catatan Selesai (/showcase), klik tombol 'RECRUIT' pada kartu karya mahasiswa. Kamu dapat memilih Quest aktif yang kamu pimpin, menentukan peran yang ditawarkan, dan mengirimkan catatan undangan resmi."
                : "Yes! On the SHOWCASE gallery (/showcase), click 'RECRUIT' on any project card. You can select one of your open quests, assign a proposed party role, and transmit an invitation note directly to the creator.",
            tag: "SHOWCASE",
        },
        {
            q: lang === "ID"
                ? "Apa perbedaan antara Papan Quest, Catatan Selesai, dan Linimasa?"
                : "What is the difference between Quest Board, Showcase, and Timeline?",
            a: lang === "ID"
                ? "PAPAN QUEST (/board) digunakan untuk merekrut lowongan tim yang sedang membuka pendaftaran. CATATAN SELESAI (/showcase) adalah arsip portofolio karya mahasiswa yang telah selesai sebagai bukti keahlian nyata. LINIMASA (/timeline) adalah feed siaran harian untuk membagikan progres sprint koding dan interaksi komunitas."
                : "QUEST BOARD is for active recruitment of open team slots. SHOWCASE is a historical proof-of-work gallery of completed projects. TIMELINE is a real-time social activity feed for daily progress broadcasts and community chatter.",
            tag: lang === "ID" ? "FITUR" : "FEATURES",
        },
        {
            q: lang === "ID"
                ? "Apakah mahasiswa bisa mendaftar karakter baru tanpa akun bawaan?"
                : "Can regular students register without a pre-loaded mock account?",
            a: lang === "ID"
                ? "Sangat bisa! Buka halaman Pendaftaran (/register) untuk membuat karakter petualang baru, memilih peran kelas RPG utama, mengisi nama universitas dan jurusan, serta mulai mengumpulkan catatan pencapaian Quest."
                : "Absolutely! Head to the Register page (/register) to create a custom character, select your primary RPG class, specify your university, and start building your verified quest ledger.",
            tag: lang === "ID" ? "AKUN" : "ACCOUNT",
        },
    ], [lang]);

    // Deteksi section aktif saat scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of NAV_SECTIONS) {
                const el = document.getElementById(section.id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveNav(section.id);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleFaq = (question) => {
        setActiveFaq(activeFaq === question ? null : question);
    };

    const filteredFaqs = useMemo(() => {
        const q = faqSearch.toLowerCase().trim();
        if (!q) return faqs;
        return faqs.filter(
            (f) =>
                f.q.toLowerCase().includes(q) ||
                f.a.toLowerCase().includes(q) ||
                f.tag.toLowerCase().includes(q)
        );
    }, [faqSearch, faqs]);

    const filteredRoles = useMemo(() => {
        if (selectedRoleGroup === "ALL") return rolesDetail;
        return rolesDetail.filter((r) => r.group === selectedRoleGroup);
    }, [selectedRoleGroup, rolesDetail]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveNav(id);
        }
    };

    return (
        <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
            <Header />

            {/* ========================================================= */}
            {/* 1. BANNER HERO PANDUAN GUILD (min-h-[560px] Full-Bleed)   */}
            {/* ========================================================= */}
            <section
                className="relative w-full min-h-[480px] md:min-h-[560px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-28 md:pt-32"
                style={{ backgroundImage: "url('/faq.gif')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/85 via-black/60 to-[#0c1322] pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-35 z-0" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center flex flex-col items-center justify-center gap-4">
                    <div className="inline-flex items-center gap-2 bg-[#121b2d]/90 border-2 border-yellow-400 px-3.5 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
                        <span className="w-2 h-2 rounded-full bg-pixel-green animate-ping" />
                        <span className="font-pixel text-[8.5px] md:text-[10px] text-yellow-300 tracking-widest uppercase">
                            {lang === "ID" ? "✦ BUKU PANDUAN RESMI GUILD ✦" : "✦ OFFICIAL GUILD INSTRUCTION MANUAL ✦"}
                        </span>
                    </div>

                    <h1 className="font-pixel text-2xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
                        {lang === "ID" ? "[ PANDUAN PETUALANG GUILD ]" : "[ THE ADVENTURER'S CODEX ]"}
                    </h1>

                    <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {lang === "ID"
                            ? "Buku panduan resmi untuk menavigasi ekosistem PartyUp!, menguasai 10 Peran Kelas RPG Rekayasa Perangkat Lunak, menghitung rating Level karakter, dan merakit Party juara untuk GEMASTIK & INVENTION 2026."
                            : "Comprehensive knowledge manual to master the PartyUp! ecosystem, understand the 10 Software Engineering RPG Class Roles, calculate character ratings, and assemble championship hackathon parties for GEMASTIK & INVENTION 2026."}
                    </p>

                    {/* Quick Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 pt-3 w-full max-w-lg text-center">
                        <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-pixel text-xs md:text-sm text-yellow-400">10 CLASSES</p>
                            <p className="font-pixel text-[7px] text-gray-300 uppercase">{lang === "ID" ? "Peran Spesialis" : "Specialized Roles"}</p>
                        </div>
                        <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-pixel text-xs md:text-sm text-pixel-green">100% ADIL</p>
                            <p className="font-pixel text-[7px] text-gray-300 uppercase">{lang === "ID" ? "Formula Level" : "Level Formula"}</p>
                        </div>
                        <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-pixel text-xs md:text-sm text-cyan-300">DEMO VIDEO</p>
                            <p className="font-pixel text-[7px] text-gray-300 uppercase">{lang === "ID" ? "Panduan HD" : "Walkthrough"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. STICKY QUICK-NAV BAR (Navigasi Melayang)               */}
            {/* ========================================================= */}
            <nav className="sticky top-0 z-40 bg-[#0c1322]/95 backdrop-blur-md border-b-4 border-retro-black shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                <div className="max-w-5xl mx-auto px-4 flex justify-center gap-2 overflow-x-auto no-scrollbar py-2">
                    {NAV_SECTIONS.map((s) => {
                        const isActive = activeNav === s.id;
                        const label = lang === "ID" ? s.labelID : s.labelEN;
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => scrollToSection(s.id)}
                                className={`font-pixel text-[8.5px] md:text-[9.5px] px-3.5 py-2 rounded-lg border-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${isActive
                                        ? "bg-yellow-400 text-retro-black border-retro-black font-bold -translate-y-0.5"
                                        : "bg-[#142036] text-gray-300 border-retro-black hover:border-yellow-400 hover:text-white"
                                    }`}
                            >
                                <span>{s.icon}</span>
                                <span>{label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* ========================================================= */}
            {/* 3. MAIN CONTENT (5 MODUL PANDUAN LENGKAP)                 */}
            {/* ========================================================= */}
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 pt-10 pb-20 flex flex-col gap-16">

                {/* --------------------------------------------------------- */}
                {/* MODUL 1: APA ITU PARTYUP!? (Alur Kerja 3 Pilar Utama)     */}
                {/* --------------------------------------------------------- */}
                <section id="overview" className="scroll-mt-28 flex flex-col gap-5 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">
                                {lang === "ID" ? "// ARSITEKTUR SISTEM GUILD" : "// GUILD SYSTEM ARCHITECTURE"}
                            </span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                {lang === "ID" ? "APA ITU PARTYUP!?" : "WHAT IS PARTYUP!?"}
                            </h2>
                        </div>
                        <span className="font-pixel text-[7.5px] bg-[#1a253b] text-yellow-300 border border-retro-black px-2.5 py-1 rounded">
                            {lang === "ID" ? "ALUR KERJA MODULAR" : "MODULAR WORKFLOW"}
                        </span>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed">
                        {lang === "ID"
                            ? "PartyUp! adalah platform pencarian rekan tim (Party matchmaking) & micro-networking bernuansa RPG 8-bit yang dibuat khusus untuk mahasiswa IT & Desain di Indonesia. Platform ini mempermudah pembentukan tim kompetisi melalui verifikasi keahlian terpadu dalam 3 pilar utama:"
                            : "PartyUp! is an 8-bit RPG-themed micro-networking platform built to empower Indonesian IT and Design students to form high-performing hackathon parties. The platform eliminates random team matching by providing proof-of-skill verification across 3 core pillars:"}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                        {/* Kartu 1: Papan Quest */}
                        <div className="bg-[#121b2d] p-5 border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left hover:border-pixel-green transition-all rounded-2xl flex flex-col justify-between gap-3 group">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 bg-pixel-green/10 border-2 border-pixel-green flex items-center justify-center rounded-xl font-pixel text-sm text-pixel-green">
                                    ⚔️
                                </div>
                                <span className="font-pixel text-[10px] text-pixel-green font-bold group-hover:text-yellow-300 transition-colors">
                                    01. {lang === "ID" ? "PAPAN QUEST" : "QUEST BOARD"}
                                </span>
                                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                    {lang === "ID"
                                        ? "Pusat rekrutmen terbuka untuk mempublikasikan lowongan tim kompetisi, menetapkan kriteria peran kelas, dan menerima pelamar Party terverifikasi."
                                        : "Central recruitment marketplace to dispatch competition notices, set class requirements, and accept verified applicants."}
                                </p>
                            </div>
                            <Link href="/board" className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                                {lang === "ID" ? "JELAJAHI QUEST ➔" : "EXPLORE QUESTS ➔"}
                            </Link>
                        </div>

                        {/* Kartu 2: Catatan Selesai */}
                        <div className="bg-[#121b2d] p-5 border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left hover:border-yellow-400 transition-all rounded-2xl flex flex-col justify-between gap-3 group">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 bg-yellow-400/10 border-2 border-yellow-400 flex items-center justify-center rounded-xl font-pixel text-sm text-yellow-300">
                                    📜
                                </div>
                                <span className="font-pixel text-[10px] text-yellow-300 font-bold group-hover:text-white transition-colors">
                                    02. {lang === "ID" ? "CATATAN SELESAI" : "FINISHED LOGS"}
                                </span>
                                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                    {lang === "ID"
                                        ? "Arsip historis karya dan portofolio mahasiswa yang telah selesai sebagai bukti keahlian (Proof of Work) nyata lengkap dengan link repositori koding dan demo aplikasi."
                                        : "Historical archive of finished student works serving as tangible proof of skills with code repositories and live demos."}
                                </p>
                            </div>
                            <Link href="/showcase" className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                                {lang === "ID" ? "LIHAT SHOWCASE ➔" : "VIEW FINISHED LOGS ➔"}
                            </Link>
                        </div>

                        {/* Kartu 3: Linimasa Guild */}
                        <div className="bg-[#121b2d] p-5 border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left hover:border-sky-400 transition-all rounded-2xl flex flex-col justify-between gap-3 group">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 bg-sky-400/10 border-2 border-sky-400 flex items-center justify-center rounded-xl font-pixel text-sm text-sky-300">
                                    📡
                                </div>
                                <span className="font-pixel text-[10px] text-sky-300 font-bold group-hover:text-yellow-300 transition-colors">
                                    03. {lang === "ID" ? "LINIMASA GUILD" : "TIMELINE"}
                                </span>
                                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                    {lang === "ID"
                                        ? "Feed siaran sosial real-time untuk membagikan progres harian sprint koding, update capaian proyek, dan pencarian anggota Party kilat komunitas."
                                        : "Real-time micro-broadcast social feed for daily sprint logs, team progress updates, and community recruitment shoutouts."}
                                </p>
                            </div>
                            <Link href="/timeline" className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                                {lang === "ID" ? "CEK LINIMASA ➔" : "CHECK TIMELINE ➔"}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODUL 2: SISTEM LEVEL KARAKTER (Formula Transparan)       */}
                {/* --------------------------------------------------------- */}
                <section id="level-system" className="scroll-mt-28 flex flex-col gap-5 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">
                                {lang === "ID" ? "// ALGORITMA RATING KARAKTER" : "// CHARACTER RATING ALGORITHM"}
                            </span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                {lang === "ID" ? "KALKULASI LEVEL (LV.) KARAKTER" : "CHARACTER LEVEL (LV.) CALCULATION"}
                            </h2>
                        </div>
                        <span className="font-pixel text-[7.5px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded font-bold">
                            {lang === "ID" ? "DETERMINISTIK" : "DETERMINISTIC"}
                        </span>
                    </div>

                    <div className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 rounded-2xl flex flex-col gap-6">
                        <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed">
                            {lang === "ID"
                                ? "Setiap anggota petualang memperoleh rating Level karakter yang dihitung secara transparan dan otomatis berdasarkan jenjang semester, penguasaan skill, dan penyelesaian Quest portofolio:"
                                : "Every adventurer receives an automated character level rating calculated transparently from their academic stage, mastered skills, and finished portfolio quests:"}
                        </p>

                        {/* Balok Formula Visual */}
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 font-pixel text-[9px] md:text-xs">
                            <div className="flex flex-col items-center gap-1 bg-[#18233a] border-2 border-emerald-400/80 px-4 py-3 min-w-[115px] rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-emerald-300">{lang === "ID" ? "SKILL" : "SKILLS"}</span>
                                <span className="text-white font-bold">× 2 {lang === "ID" ? "POIN" : "PTS"}</span>
                                <span className="font-sans text-[9px] text-gray-400">{lang === "ID" ? "Total Keahlian" : "Total Techs"}</span>
                            </div>
                            <span className="text-yellow-400 text-xl font-bold">+</span>
                            <div className="flex flex-col items-center gap-1 bg-[#18233a] border-2 border-sky-400/80 px-4 py-3 min-w-[115px] rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-sky-300">SEMESTER</span>
                                <span className="text-white font-bold">× 2 {lang === "ID" ? "POIN" : "PTS"}</span>
                                <span className="font-sans text-[9px] text-gray-400">{lang === "ID" ? "Jenjang Kuliah" : "Academic Term"}</span>
                            </div>
                            <span className="text-yellow-400 text-xl font-bold">+</span>
                            <div className="flex flex-col items-center gap-1 bg-[#18233a] border-2 border-pink-400/80 px-4 py-3 min-w-[115px] rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-pink-300">QUESTS</span>
                                <span className="text-white font-bold">× 3 {lang === "ID" ? "POIN" : "PTS"}</span>
                                <span className="font-sans text-[9px] text-gray-400">{lang === "ID" ? "Karya Selesai" : "Completed Works"}</span>
                            </div>
                            <span className="text-yellow-400 text-xl font-bold">=</span>
                            <div className="flex flex-col items-center gap-1 bg-retro-black border-2 border-yellow-400 px-5 py-3 min-w-[125px] rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-yellow-300">LEVEL (LV.)</span>
                                <span className="text-white font-bold">{lang === "ID" ? "RATING" : "RATING"}</span>
                                <span className="font-sans text-[9px] text-pixel-green">{lang === "ID" ? "Real-time" : "Real-time"}</span>
                            </div>
                        </div>

                        {/* Kotak Contoh Perhitungan Nyata */}
                        <div className="bg-[#18233a] p-4 border-2 border-retro-black rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed text-left">
                                <span className="font-pixel text-[8px] text-yellow-400 block mb-1">
                                    {lang === "ID" ? "// SIMULASI RATING: SARAH (PRODUCT MANAGER)" : "// SIMULATION: SARAH (PRODUCT MANAGER)"}
                                </span>
                                {lang === "ID"
                                    ? "Semester 5 • 6 Skill Dikuasai • 3 Catatan Quest Selesai:"
                                    : "Semester 5 • 6 Mastered Skills • 3 Finished Logs:"}
                                <br />
                                <span className="font-mono text-yellow-300 text-xs font-bold">
                                    (6 Skill × 2) + (5 Sem × 2) + (3 Quest × 3) = 12 + 10 + 9
                                </span>
                            </div>
                            <div className="font-pixel text-xl text-yellow-300 bg-retro-black border-2 border-yellow-400 px-6 py-2.5 shrink-0 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                LV. 31
                            </div>
                        </div>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODUL 3: 10 KELAS REKAYASA PERANGKAT LUNAK (ROSTER)       */}
                {/* --------------------------------------------------------- */}
                <section id="roles" className="scroll-mt-28 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">
                                {lang === "ID" ? "// DIREKTORI KELAS GUILD" : "// GUILD CLASS ROSTER"}
                            </span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                {lang === "ID" ? "10 KELAS RPG REKAYASA PERANGKAT LUNAK" : "10 SOFTWARE ENGINEERING RPG CLASSES"}
                            </h2>
                        </div>

                        {/* Filter Kategori Peran */}
                        <div className="flex flex-wrap gap-1.5 font-pixel text-[8px]">
                            <button
                                type="button"
                                onClick={() => setSelectedRoleGroup("ALL")}
                                className={`px-3 py-1.5 border-2 rounded-lg transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${selectedRoleGroup === "ALL"
                                        ? "bg-yellow-400 text-retro-black border-retro-black font-bold -translate-y-0.5"
                                        : "bg-[#18233a] text-gray-300 border-retro-black hover:border-yellow-400"
                                    }`}
                            >
                                {lang === "ID" ? "SEMUA (10)" : "ALL (10)"}
                            </button>
                            {Object.entries(groupStyles).map(([key, g]) => (
                                <button
                                    type="button"
                                    key={key}
                                    onClick={() => setSelectedRoleGroup(key)}
                                    className={`px-3 py-1.5 border-2 rounded-lg transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${selectedRoleGroup === key
                                            ? "bg-yellow-400 text-retro-black border-retro-black font-bold -translate-y-0.5"
                                            : "bg-[#18233a] text-gray-300 border-retro-black hover:border-yellow-400"
                                        }`}
                                >
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid 10 Kartu Kelas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredRoles.map((item, index) => {
                            const g = groupStyles[item.group];
                            return (
                                <div
                                    key={index}
                                    className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between gap-3.5 hover:border-yellow-400 transition-all rounded-2xl text-left"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-12 h-12 bg-[#18233a] border-2 border-retro-black flex items-center justify-center font-pixel text-xl shrink-0 rounded-xl shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-pixel text-xs text-white font-bold truncate">
                                                    {item.role}
                                                </h3>
                                                <span className={`w-2.5 h-2.5 rounded-full ${g.dot}`} title={g.label} />
                                            </div>
                                            <span className={`font-pixel text-[7.5px] px-2 py-0.5 rounded border inline-block w-fit ${g.badge}`}>
                                                {g.label}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    <div className="border-t border-gray-700/60 pt-3 flex flex-col gap-2">
                                        <div className="flex flex-wrap gap-1">
                                            {item.skills.map((skill, i) => (
                                                <span key={i} className="font-pixel text-[7px] bg-[#1a253b] text-gray-200 px-2 py-0.5 border border-gray-600 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="font-sans text-[10px] text-yellow-400 font-bold">
                                            🎯 {lang === "ID" ? "Target Lomba:" : "Target Division:"} <span className="text-gray-300 font-normal">{item.targetDivision}</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODUL 4: VIDEO PANDUAN WALKTHROUGH RESMI                  */}
                {/* --------------------------------------------------------- */}
                <section id="walkthrough" className="scroll-mt-28 flex flex-col gap-4 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">
                                {lang === "ID" ? "// DEMO INTERAKTIF & ONBOARDING" : "// INTERACTIVE DEMO & ONBOARDING"}
                            </span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                {lang === "ID" ? "VIDEO PANDUAN RESMI GUILD" : "OFFICIAL GUILD VIDEO WALKTHROUGH"}
                            </h2>
                        </div>
                        <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2.5 py-1 border border-retro-black font-bold rounded">
                            ● {lang === "ID" ? "DEMO VIDEO HD" : "HD VIDEO DEMO"}
                        </span>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                        {lang === "ID"
                            ? "Tonton video panduan 1 menit di bawah ini untuk mempelajari cara menerbitkan Quest, mengevaluasi portofolio anggota, dan membentuk Party juara untuk GEMASTIK & INVENTION 2026."
                            : "Watch the official 1-minute video guide below to see how to dispatch quests, evaluate portfolio case studies, and form high-ranking parties for GEMASTIK & INVENTION 2026."}
                    </p>

                    <div className="relative aspect-video w-full border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-retro-black rounded-2xl mt-1">
                        <video
                            controls
                            loop
                            playsInline
                            poster="/computer.png"
                            className="w-full h-full object-cover"
                        >
                            <source src="/videos/faq.mp4" type="video/mp4" />
                            Browser Anda tidak mendukung pemutaran video.
                        </video>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODUL 5: FAQ & PENCARIAN JAWABAN REAL-TIME                */}
                {/* --------------------------------------------------------- */}
                <section id="faq" className="scroll-mt-28 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">
                                {lang === "ID" ? "// PERTANYAAN UMUM" : "// FREQUENTLY ASKED QUESTIONS"}
                            </span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                {lang === "ID" ? "DIREKTORI BANTUAN GUILD (FAQ)" : "GUILD ASSISTANCE DIRECTORY (FAQ)"}
                            </h2>
                        </div>
                        <span className="font-pixel text-[7.5px] bg-[#1a253b] text-gray-300 border border-retro-black px-2.5 py-1 rounded">
                            {filteredFaqs.length} {lang === "ID" ? "PERTANYAAN" : "QUERIES"}
                        </span>
                    </div>

                    {/* Search bar FAQ */}
                    <div className="flex flex-col gap-2">
                        <label className="font-pixel text-[8px] text-yellow-400">
                            {lang === "ID"
                                ? "// CARI BERDASARKAN KATA KUNCI (MISAL: LEVEL, GEMASTIK, REKRUT)"
                                : "// SEARCH BY KEYWORD (E.G., LEVEL, GEMASTIK, RECRUIT)"}
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={lang === "ID" ? "Cari jawaban pertanyaan FAQ..." : "Search FAQ answers..."}
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full md:w-2/3 font-sans text-xs p-3 pl-10 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 placeholder-gray-400 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            />
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">🔍</span>
                            {faqSearch && (
                                <button
                                    type="button"
                                    onClick={() => setFaqSearch("")}
                                    className="absolute right-3 md:right-[35%] top-1/2 -translate-y-1/2 font-pixel text-[8px] text-gray-400 hover:text-red-400"
                                >
                                    {lang === "ID" ? "HAPUS" : "CLEAR"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* List Akordeon FAQ */}
                    <div className="flex flex-col gap-3.5">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => {
                                const isOpen = activeFaq === faq.q;
                                return (
                                    <div
                                        key={index}
                                        className="bg-[#121b2d] border-4 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden transition-all hover:border-yellow-400/80"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(faq.q)}
                                            className="w-full p-4 md:p-5 text-left flex justify-between items-center gap-4 font-pixel text-[9.5px] md:text-[10.5px] text-white hover:text-yellow-300 cursor-pointer bg-transparent border-none"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="font-pixel text-[7.5px] bg-[#1a253b] text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded">
                                                    {faq.tag}
                                                </span>
                                                <span>{faq.q}</span>
                                            </div>
                                            <span
                                                className={`text-yellow-400 font-bold text-xs shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                    }`}
                                            >
                                                ▼
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="p-4 md:p-5 border-t-2 border-gray-700 bg-[#18233a] font-sans text-xs md:text-sm text-gray-200 leading-relaxed animate-in fade-in duration-150">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-10 bg-[#121b2d] border-4 border-retro-black rounded-2xl font-pixel text-xs text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                ? ? ? {lang === "ID" ? `TIDAK ADA PERTANYAAN SESUAI "${faqSearch}"` : `NO QUESTIONS MATCH "${faqSearch}"`}
                                <div className="pt-2">
                                    <button
                                        onClick={() => setFaqSearch("")}
                                        className="font-pixel text-[9px] text-yellow-300 underline cursor-pointer"
                                    >
                                        {lang === "ID" ? "RESET PENCARIAN" : "RESET SEARCH"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* BANNER AJAKAN BERTINDAK (CALL TO ACTION)                  */}
                {/* --------------------------------------------------------- */}
                <section className="text-center py-8 flex flex-col items-center gap-5 bg-[#121b2d] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8">
                    <span className="font-pixel text-[9px] text-pixel-green tracking-widest uppercase">
                        {lang === "ID" ? "✦ PENDAFTARAN GUILD TELAH DIBUKA ✦" : "✦ GUILD REGISTRATION OPEN ✦"}
                    </span>
                    <h2 className="font-pixel text-sm md:text-lg text-yellow-300">
                        {lang === "ID" ? "SIAP MERAKIT PARTY JUARA KAMU?" : "READY TO ASSEMBLE YOUR CHAMPIONSHIP PARTY?"}
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-gray-300 max-w-xl">
                        {lang === "ID"
                            ? "Daftarkan karakter mahasiswa kamu sekarang atau jelajahi lowongan tim kompetisi di Papan Quest."
                            : "Register your student character or browse open competition requests on the Quest Board today."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link href="/register">
                            <PixelButton variant="secondary" className="py-3 px-6 text-xs">
                                {lang === "ID" ? "BUAT KARAKTER ✦" : "CREATE CHARACTER ✦"}
                            </PixelButton>
                        </Link>
                        <Link href="/board">
                            <PixelButton variant="green" className="py-3 px-6 text-xs">
                                {lang === "ID" ? "KE PAPAN QUEST ▶" : "GO TO QUEST BOARD ▶"}
                            </PixelButton>
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}