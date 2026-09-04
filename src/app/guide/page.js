"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import Link from "next/link";
import { useLanguage } from "../../utils/lang";

const GROUP_STYLES = {
    manager: {
        label: "MANAGEMENT (2)",
        badge: "bg-yellow-400/20 text-yellow-300 border-yellow-400/50",
        border: "border-yellow-400/80 hover:border-yellow-400 bg-yellow-400/5",
        dot: "bg-yellow-400",
    },
    designer: {
        label: "DESIGN (2)",
        badge: "bg-pink-400/20 text-pink-300 border-pink-400/50",
        border: "border-pink-400/80 hover:border-pink-400 bg-pink-400/5",
        dot: "bg-pink-400",
    },
    coder: {
        label: "TECHNICAL (6)",
        badge: "bg-emerald-400/20 text-emerald-300 border-emerald-400/50",
        border: "border-emerald-400/80 hover:border-emerald-400 bg-emerald-400/5",
        dot: "bg-emerald-400",
    },
};

const rolesDetail = [
    {
        role: "Product Manager (PM)",
        icon: "💼",
        group: "manager",
        desc: "Defines product vision, prioritizes feature backlogs, conducts market sizing, and aligns business strategy for Gemastik / Invention competitions.",
        skills: ["Product Strategy", "Scrum / Agile", "Pitch Deck", "PRD"],
        targetDivision: "Gemastik: Business Plan & Software Development",
    },
    {
        role: "Project / Scrum Master",
        icon: "⏱️",
        group: "manager",
        desc: "Facilitates Agile/Scrum sprint workflows, removes team blockers, coordinates sprint retrospectives, and ensures quest milestones are delivered on time.",
        skills: ["Sprint Planning", "Jira / Trello", "Risk Mitigation", "Team Dynamics"],
        targetDivision: "College Final Projects & Hackathon Milestones",
    },
    {
        role: "UI/UX Designer",
        icon: "🎨",
        group: "designer",
        desc: "Crafts intuitive user journeys, wireframes, design systems, and pixel-perfect high-fidelity prototypes validated with usability metrics.",
        skills: ["Figma", "Design Systems", "Prototyping", "Micro-Interactions"],
        targetDivision: "Gemastik: UX Design & Web Design",
    },
    {
        role: "UX Researcher",
        icon: "🔍",
        group: "designer",
        desc: "Conducts deep user interviews, builds behavioral empathy maps, defines student personas, and executes usability testing (SUS & Usability Hub).",
        skills: ["User Interviews", "SUS Scoring", "Persona Mapping", "A/B Testing"],
        targetDivision: "Gemastik: UX Design & Human-Computer Interaction",
    },
    {
        role: "Frontend Developer",
        icon: "💻",
        group: "coder",
        desc: "Builds high-performance, responsive client interfaces, state management architectures, and smooth interactive animations with zero layout shift.",
        skills: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
        targetDivision: "Gemastik: Software Development & Web App",
    },
    {
        role: "Backend Developer",
        icon: "⚙️",
        group: "coder",
        desc: "Architects robust server infrastructure, database schemas, secure token authentications, and low-latency RESTful or GraphQL APIs.",
        skills: ["Node.js", "Golang", "PostgreSQL", "Docker", "REST API"],
        targetDivision: "Gemastik: Software Development & System Architecture",
    },
    {
        role: "Full-stack Developer",
        icon: "🚀",
        group: "coder",
        desc: "Master of both client and server domains, seamlessly bridging complex database transactions with intuitive user interfaces end-to-end.",
        skills: ["Fullstack JS/TS", "Prisma ORM", "Next.js App Router", "Supabase"],
        targetDivision: "Invention 2026 & Startup Hackathons",
    },
    {
        role: "Mobile App Developer",
        icon: "📱",
        group: "coder",
        desc: "Specializes in cross-platform mobile apps for Android and iOS, implementing native hardware APIs, offline storage, and push notifications.",
        skills: ["Flutter", "React Native", "Kotlin", "Firebase"],
        targetDivision: "Gemastik: Application Development & Mobile UX",
    },
    {
        role: "QA (Quality Assurance) Engineer",
        icon: "🛡️",
        group: "coder",
        desc: "Executes automated end-to-end test suites, stress testing, and vulnerability verification to ensure zero critical bugs before pitching to judges.",
        skills: ["Jest", "Cypress", "Postman", "Automated E2E Testing"],
        targetDivision: "Software Engineering Reliability & Gemastik",
    },
    {
        role: "DevOps Engineer",
        icon: "☁️",
        group: "coder",
        desc: "Manages CI/CD automated deployment pipelines, cloud server orchestration, containerization, and 24/7 uptime monitoring telemetry.",
        skills: ["Docker", "GitHub Actions", "Vercel", "AWS / GCP"],
        targetDivision: "Cloud Infrastructure & Competition Deployments",
    },
];

const faqs = [
    {
        q: "What is PartyUp! and who is it designed for?",
        a: "PartyUp! is an 8-bit RPG-themed student micro-networking and party matchmaking platform designed specifically for Indonesian IT students. It bridges the gap between coders, designers, and managers to easily form winning teams for GEMASTIK, INVENTION 2026, and university capstone projects.",
        tag: "OVERVIEW",
    },
    {
        q: "How do I recruit other students for my competition project?",
        a: "Navigate to the QUEST BOARD (/board), click '+ DISPATCH QUEST', fill in your project title, target competition division, and open class slots. Your quest will immediately be listed for adventurers to apply with their verified portfolios!",
        tag: "QUEST BOARD",
    },
    {
        q: "How is character level (LV.) automatically calculated?",
        a: "Character LV. is dynamically computed using a fair 3-pillar formula: Total Verified Skills (×2 pts) + Current Academic Semester (×2 pts) + Completed Portfolio Quests (×3 pts). Level updates in real-time across the platform.",
        tag: "LEVEL SYSTEM",
    },
    {
        q: "Can I directly invite a specific student from their showcase?",
        a: "Yes! On the SHOWCASE gallery (/showcase), click 'RECRUIT' on any project card. You can select one of your open quests, assign a proposed party role, and transmit an invitation note directly to the creator.",
        tag: "SHOWCASE",
    },
    {
        q: "What is the difference between Quest Board, Showcase, and Profile Tabs?",
        a: "QUEST BOARD is for active recruitment of open team slots across the guild. In your Profile (/profile), the FINISHED LOGS tab lists your completed historical case studies, while the ACTIVE QUESTS tab displays the open recruitment quests you have dispatched.",
        tag: "FEATURES",
    },
    {
        q: "Can regular students register without a pre-loaded mock account?",
        a: "Absolutely! Head to the Register page (/register) to create a custom character, select your primary RPG class, specify your university, and start building your verified quest ledger.",
        tag: "ACCOUNT",
    },
];

const NAV_SECTIONS = [
    { id: "overview", label: "OVERVIEW", icon: "🌐" },
    { id: "level-system", label: "LEVEL SYSTEM", icon: "⭐" },
    { id: "roles", label: "10 RPG CLASSES", icon: "⚔️" },
    { id: "walkthrough", label: "VIDEO DEMO", icon: "🎬" },
    { id: "faq", label: "FAQ & HELP", icon: "❓" },
];

export default function GuildGuide() {
    const { lang, t } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState("");
    const [selectedRoleGroup, setSelectedRoleGroup] = useState("ALL");
    const [activeNav, setActiveNav] = useState("overview");

    const navSections = useMemo(() => [
        { id: "overview", label: lang === "ID" ? "RINGKASAN" : "OVERVIEW", icon: "🌐" },
        { id: "level-system", label: lang === "ID" ? "SISTEM LEVEL" : "LEVEL SYSTEM", icon: "⭐" },
        { id: "roles", label: lang === "ID" ? "10 KELAS RPG" : "10 RPG CLASSES", icon: "⚔️" },
        { id: "walkthrough", label: lang === "ID" ? "DEMO VIDEO" : "VIDEO DEMO", icon: "🎬" },
        { id: "faq", label: lang === "ID" ? "FAQ & BANTUAN" : "FAQ & HELP", icon: "❓" },
    ], [lang]);

    const toggleFaq = (question) => {
        setActiveFaq(activeFaq === question ? null : question);
    };

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

    const filteredFaqs = useMemo(() => {
        const q = faqSearch.toLowerCase().trim();
        if (!q) return faqs;
        return faqs.filter(
            (f) =>
                f.q.toLowerCase().includes(q) ||
                f.a.toLowerCase().includes(q) ||
                f.tag.toLowerCase().includes(q)
        );
    }, [faqSearch]);

    const filteredRoles = useMemo(() => {
        if (selectedRoleGroup === "ALL") return rolesDetail;
        return rolesDetail.filter((r) => r.group === selectedRoleGroup);
    }, [selectedRoleGroup]);

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
            {/* 1. BANNER HERO GUILD GUIDE (min-h-[560px] Full-Bleed)     */}
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
                        {lang === "ID" ? "[ PANDUAN PETUALANG ]" : "[ THE ADVENTURER'S CODEX ]"}
                    </h1>

                    <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {lang === "ID"
                            ? "Buku panduan lengkap untuk memahami ekosistem PartyUp!, mengenal 10 Peran Kelas RPG Rekayasa Perangkat Lunak, menghitung peringkat karakter, dan merakit tim juara hackathon GEMASTIK & INVENTION 2026."
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
                            <p className="font-pixel text-[7px] text-gray-300 uppercase">{lang === "ID" ? "Rumus Level" : "Level Formula"}</p>
                        </div>
                        <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-pixel text-xs md:text-sm text-cyan-300">VIDEO HD</p>
                            <p className="font-pixel text-[7px] text-gray-300 uppercase">{lang === "ID" ? "Walkthrough" : "Walkthrough"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. STICKY QUICK-NAV BAR (Fixed Top Navigation)            */}
            {/* ========================================================= */}
            <nav className="sticky top-0 z-40 bg-[#0c1322]/95 backdrop-blur-md border-b-4 border-retro-black shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                <div className="max-w-5xl mx-auto px-4 flex justify-center gap-2 overflow-x-auto no-scrollbar py-2">
                    {navSections.map((s) => {
                        const isActive = activeNav === s.id;
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
                                <span>{s.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* ========================================================= */}
            {/* 3. MAIN CONTENT (5 MODUL UTAMA DENGAN TAMPILAN LAPANG)    */}
            {/* ========================================================= */}
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 pt-10 pb-20 flex flex-col gap-16">

                {/* --------------------------------------------------------- */}
                {/* MODULE 1: WHAT IS PARTYUP!? (3-Card Workflow System)      */}
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
                            ? "PartyUp! adalah platform pencarian rekan tim & micro-networking bernuansa RPG 8-bit yang dibuat khusus untuk mahasiswa IT & Desain di Indonesia. Platform ini mempermudah pencarian rekan tim hackathon melalui verifikasi keahlian terpadu dalam 3 pilar utama:"
                            : "PartyUp! is an 8-bit RPG-themed micro-networking platform built to empower Indonesian IT and Design students to form high-performing hackathon parties. The platform eliminates random team matching by providing proof-of-skill verification across 3 core pillars:"}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                        {/* Card 1 */}
                        <div className="bg-[#121b2d] p-5 border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left hover:border-pixel-green transition-all rounded-2xl flex flex-col justify-between gap-3 group">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 bg-pixel-green/10 border-2 border-pixel-green flex items-center justify-center rounded-xl font-pixel text-sm text-pixel-green">
                                    ⚔️
                                </div>
                                <span className="font-pixel text-[10px] text-pixel-green font-bold group-hover:text-yellow-300 transition-colors">
                                    01. {lang === "ID" ? "MISI PAPAN AKTIF" : "ACTIVE QUESTS"}
                                </span>
                                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                    {lang === "ID"
                                        ? "Pusat rekrutmen terbuka untuk menerbitkan informasi lomba, kriteria peran kelas, dan menerima pelamar tim terverifikasi."
                                        : "Central recruitment marketplace to dispatch competition notices, set class requirements, and accept verified applicants."}
                                </p>
                            </div>
                            <Link href="/board" className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                                {lang === "ID" ? "JELAJAHI MISI ➔" : "EXPLORE QUESTS ➔"}
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#121b2d] p-5 border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left hover:border-yellow-400 transition-all rounded-2xl flex flex-col justify-between gap-3 group">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 bg-yellow-400/10 border-2 border-yellow-400 flex items-center justify-center rounded-xl font-pixel text-sm text-yellow-300">
                                    📜
                                </div>
                                <span className="font-pixel text-[10px] text-yellow-300 font-bold group-hover:text-white transition-colors">
                                    02. {lang === "ID" ? "CATATAN PROYEK SELESAI" : "FINISHED LOGS"}
                                </span>
                                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                    {lang === "ID"
                                        ? "Arsip karya mahasiswa yang telah selesai sebagai bukti otentik kemampuan koding dengan link repository GitHub dan live demo."
                                        : "Historical archive of finished student works serving as tangible proof of skills with code repositories and live demos."}
                                </p>
                            </div>
                            <Link href="/showcase" className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                                {lang === "ID" ? "LIHAT PROYEK SELESAI ➔" : "VIEW FINISHED LOGS ➔"}
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#121b2d] p-5 border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left hover:border-sky-400 transition-all rounded-2xl flex flex-col justify-between gap-3 group">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 bg-sky-400/10 border-2 border-sky-400 flex items-center justify-center rounded-xl font-pixel text-sm text-sky-300">
                                    📡
                                </div>
                                <span className="font-pixel text-[10px] text-sky-300 font-bold group-hover:text-yellow-300 transition-colors">
                                    03. {lang === "ID" ? "LINIMASA SPRINT" : "TIMELINE"}
                                </span>
                                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                                    {lang === "ID"
                                        ? "Feed siaran sosial real-time untuk log kemajuan harian sprint, update progres tim, dan info rekrutmen kilat komunitas."
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
                {/* MODULE 2: CHARACTER LEVEL SYSTEM (Transparent Formula)    */}
                {/* --------------------------------------------------------- */}
                <section id="level-system" className="scroll-mt-28 flex flex-col gap-5 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">// CHARACTER RATING ALGORITHM</span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                CHARACTER LEVEL (LV.) CALCULATION
                            </h2>
                        </div>
                        <span className="font-pixel text-[7.5px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded">
                            DETERMINISTIC
                        </span>
                    </div>

                    <div className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 rounded-2xl flex flex-col gap-6">
                        <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed">
                            Every adventurer receives an automated character level rating calculated transparently from their academic stage, mastered skills, and finished portfolio quests:
                        </p>

                        {/* Formula Blocks */}
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 font-pixel text-[9px] md:text-xs">
                            <div className="flex flex-col items-center gap-1 bg-[#18233a] border-2 border-emerald-400/80 px-4 py-3 min-w-[115px] rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-emerald-300">SKILLS</span>
                                <span className="text-white font-bold">× 2 PTS</span>
                                <span className="font-sans text-[9px] text-gray-400">Total Techs</span>
                            </div>
                            <span className="text-yellow-400 text-xl font-bold">+</span>
                            <div className="flex flex-col items-center gap-1 bg-[#18233a] border-2 border-sky-400/80 px-4 py-3 min-w-[115px] rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-sky-300">SEMESTER</span>
                                <span className="text-white font-bold">× 2 PTS</span>
                                <span className="font-sans text-[9px] text-gray-400">Academic Term</span>
                            </div>
                            <span className="text-yellow-400 text-xl font-bold">+</span>
                            <div className="flex flex-col items-center gap-1 bg-[#18233a] border-2 border-pink-400/80 px-4 py-3 min-w-[115px] rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-pink-300">QUESTS</span>
                                <span className="text-white font-bold">× 3 PTS</span>
                                <span className="font-sans text-[9px] text-gray-400">Completed Works</span>
                            </div>
                            <span className="text-yellow-400 text-xl font-bold">=</span>
                            <div className="flex flex-col items-center gap-1 bg-retro-black border-2 border-yellow-400 px-5 py-3 min-w-[125px] rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-yellow-300">YOUR LV.</span>
                                <span className="text-white font-bold">RATING</span>
                                <span className="font-sans text-[9px] text-pixel-green">Real-time</span>
                            </div>
                        </div>

                        {/* Real Calculation Breakdown Box */}
                        <div className="bg-[#18233a] p-4 border-2 border-retro-black rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed text-left">
                                <span className="font-pixel text-[8px] text-yellow-400 block mb-1">// SIMULATION: SARAH (PRODUCT MANAGER)</span>
                                Semester 5 • 6 Mastered Skills • 3 Finished Logs:
                                <br />
                                <span className="font-mono text-yellow-300 text-xs font-bold">
                                    (6 Skills × 2) + (5 Sem × 2) + (3 Quests × 3) = 12 + 10 + 9
                                </span>
                            </div>
                            <div className="font-pixel text-xl text-yellow-300 bg-retro-black border-2 border-yellow-400 px-6 py-2.5 shrink-0 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                LV. 31
                            </div>
                        </div>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODULE 3: 10 SOFTWARE ENGINEERING CLASSES WITH TABS       */}
                {/* --------------------------------------------------------- */}
                <section id="roles" className="scroll-mt-28 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">// GUILD CLASS ROSTER</span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                10 SOFTWARE ENGINEERING RPG CLASSES
                            </h2>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-1.5 font-pixel text-[8px]">
                            <button
                                type="button"
                                onClick={() => setSelectedRoleGroup("ALL")}
                                className={`px-3 py-1.5 border-2 rounded-lg transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${selectedRoleGroup === "ALL"
                                        ? "bg-yellow-400 text-retro-black border-retro-black font-bold -translate-y-0.5"
                                        : "bg-[#18233a] text-gray-300 border-retro-black hover:border-yellow-400"
                                    }`}
                            >
                                ALL (10)
                            </button>
                            {Object.entries(GROUP_STYLES).map(([key, g]) => (
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

                    {/* Grid 10 Class Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredRoles.map((item, index) => {
                            const g = GROUP_STYLES[item.group];
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

                                    {/* Skills & Division Tags */}
                                    <div className="border-t border-gray-700/60 pt-3 flex flex-col gap-2">
                                        <div className="flex flex-wrap gap-1">
                                            {item.skills.map((skill, i) => (
                                                <span key={i} className="font-pixel text-[7px] bg-[#1a253b] text-gray-200 px-2 py-0.5 border border-gray-600 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="font-sans text-[10px] text-yellow-400 font-bold">
                                            🎯 Target: <span className="text-gray-300 font-normal">{item.targetDivision}</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODULE 4: OFFICIAL GUILD VIDEO WALKTHROUGH                */}
                {/* --------------------------------------------------------- */}
                <section id="walkthrough" className="scroll-mt-28 flex flex-col gap-4 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">// INTERACTIVE DEMO & ONBOARDING</span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                OFFICIAL GUILD VIDEO WALKTHROUGH
                            </h2>
                        </div>
                        <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2.5 py-1 border border-retro-black font-bold rounded">
                            ● HD VIDEO DEMO
                        </span>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                        Watch the official 1-minute video guide below to see how to dispatch quests, evaluate portfolio case studies, and form high-ranking parties for <strong className="text-yellow-300">GEMASTIK &amp; INVENTION 2026</strong>.
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
                            Your browser does not support video playback.
                        </video>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* MODULE 5: FAQ ACCORDION + REAL-TIME SEARCH ENGINE         */}
                {/* --------------------------------------------------------- */}
                <section id="faq" className="scroll-mt-28 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between">
                        <div>
                            <span className="font-pixel text-[8.5px] text-yellow-400 uppercase block mb-1">// FREQUENTLY ASKED QUESTIONS</span>
                            <h2 className="font-pixel text-sm md:text-lg text-white">
                                GUILD ASSISTANCE DIRECTORY (FAQ)
                            </h2>
                        </div>
                        <span className="font-pixel text-[7.5px] bg-[#1a253b] text-gray-300 border border-retro-black px-2.5 py-1 rounded">
                            {filteredFaqs.length} QUERIES
                        </span>
                    </div>

                    {/* Search bar FAQ */}
                    <div className="flex flex-col gap-2">
                        <label className="font-pixel text-[8px] text-yellow-400">// SEARCH BY KEYWORD (E.G., LEVEL, GEMASTIK, RECRUIT)</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search FAQ answers..."
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
                                    CLEAR
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Accordion List */}
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
                                ? ? ? NO QUESTIONS MATCH "{faqSearch}"
                                <div className="pt-2">
                                    <button
                                        onClick={() => setFaqSearch("")}
                                        className="font-pixel text-[9px] text-yellow-300 underline cursor-pointer"
                                    >
                                        RESET SEARCH
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* CALL TO ACTION FOOTER BANNER                              */}
                {/* --------------------------------------------------------- */}
                <section className="text-center py-8 flex flex-col items-center gap-5 bg-[#121b2d] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8">
                    <span className="font-pixel text-[9px] text-pixel-green tracking-widest uppercase">
                        {lang === "ID" ? "✦ PENDAFTARAN GUILD DIBUKA ✦" : "✦ GUILD REGISTRATION OPEN ✦"}
                    </span>
                    <h2 className="font-pixel text-sm md:text-lg text-yellow-300">
                        {lang === "ID" ? "SIAP RAKIT TIM JUARA KAMU?" : "READY TO ASSEMBLE YOUR CHAMPIONSHIP PARTY?"}
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-gray-300 max-w-xl">
                        {lang === "ID"
                            ? "Daftarkan karakter mahasiswa kamu atau jelajahi lowongan tim lomba di Misi Aktif sekarang."
                            : "Register your student character or browse open competition requests on Active Quests today."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link href="/register">
                            <PixelButton variant="secondary" className="py-3 px-6 text-xs">
                                {lang === "ID" ? "BUAT KARAKTER ✦" : "CREATE CHARACTER ✦"}
                            </PixelButton>
                        </Link>
                        <Link href="/board">
                            <PixelButton variant="green" className="py-3 px-6 text-xs">
                                {lang === "ID" ? "KE MISI AKTIF ▶" : "GO TO ACTIVE QUESTS ▶"}
                            </PixelButton>
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}