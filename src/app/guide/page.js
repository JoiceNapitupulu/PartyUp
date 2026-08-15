"use client";

import React, { useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import Link from "next/link";

const GROUP_STYLES = {
    manager: {
        label: "MANAGEMENT (2)",
        border: "border-yellow-400/80 hover:border-yellow-400 bg-yellow-400/10 text-yellow-300",
        dot: "bg-yellow-400",
    },
    designer: {
        label: "DESIGN (2)",
        border: "border-pink-400/80 hover:border-pink-400 bg-pink-400/10 text-pink-300",
        dot: "bg-pink-400",
    },
    coder: {
        label: "TECHNICAL (6)",
        border: "border-emerald-400/80 hover:border-emerald-400 bg-emerald-400/10 text-emerald-300",
        dot: "bg-emerald-400",
    },
};

const rolesDetail = [
    { role: "Product Manager (PM)", icon: "💼", group: "manager", desc: "Defines product vision, analyzes user needs, and aligns business strategy for Gemastik / Invention competitions." },
    { role: "Project / Scrum Master", icon: "⏱️", group: "manager", desc: "Facilitates Agile/Scrum sprint workflows, removes team blockers, and ensures quest milestones are delivered on time." },
    { role: "UI/UX Designer", icon: "🎨", group: "designer", desc: "Crafts intuitive user flows, wireframes, and pixel-perfect high-fidelity interfaces with seamless aesthetics." },
    { role: "UX Researcher", icon: "🔍", group: "designer", desc: "Conducts deep user interviews, validates product hypotheses, and performs usability testing across student personas." },
    { role: "Frontend Developer", icon: "💻", group: "coder", desc: "Builds responsive, interactive client interfaces and animations using React, Next.js, and Tailwind CSS." },
    { role: "Backend Developer", icon: "⚙️", group: "coder", desc: "Architects robust server infrastructure, database schemas, secure REST APIs, and core business logic." },
    { role: "Full-stack Developer", icon: "🚀", group: "coder", desc: "Master of both frontend and backend domains, building complete end-to-end scalable web applications." },
    { role: "Mobile App Developer", icon: "📱", group: "coder", desc: "Specializes in native cross-platform mobile apps for Android/iOS using Flutter, React Native, Kotlin, or Swift." },
    { role: "QA (Quality Assurance) Engineer", icon: "🛡️", group: "coder", desc: "Executes automated test suites, load testing, and system verification to ensure zero critical bugs before pitching." },
    { role: "DevOps Engineer", icon: "☁️", group: "coder", desc: "Manages CI/CD deployment pipelines, cloud server orchestration (Vercel, AWS, Docker), and system monitoring." },
];

const faqs = [
    {
        q: "What is PartyUp! and who is it designed for?",
        a: "PartyUp! is an 8-bit RPG-themed student micro-networking & team matchmaking platform designed for Indonesian IT students to easily recruit party members for GEMASTIK, INVENTION 2026, and college projects.",
    },
    {
        q: "How do I recruit other students for my team project?",
        a: "Navigate to the QUEST BOARD (/board), click '+ DISPATCH QUEST', fill in your project title, target competition, and open class slots. Your quest will immediately be listed for other adventurers to apply!",
    },
    {
        q: "How is character level (LV.) calculated?",
        a: "Character LV. is automatically computed from 3 real metrics: Total skills mastered (×2 pts), current academic semester (×2 pts), and completed portfolio quests (×3 pts).",
    },
    {
        q: "Can regular students register without a pre-loaded mock account?",
        a: "Yes! Simply head to the Register page (/register) to create a brand new character, set your university, major, and select your primary RPG class.",
    },
    {
        q: "What is the difference between QUEST BOARD, SHOWCASE, and TIMELINE?",
        a: "QUEST BOARD is for active party recruitment. SHOWCASE is a historical portfolio gallery of finished works (proof of skill). TIMELINE is a real-time social feed for daily progress updates and chatter.",
    },
];

const NAV_SECTIONS = [
    { id: "overview", label: "OVERVIEW" },
    { id: "level-system", label: "LEVEL SYSTEM" },
    { id: "roles", label: "10 CLASSES" },
    { id: "walkthrough", label: "VIDEO GUIDE" },
    { id: "faq", label: "FAQ" },
];

export default function GuildGuide() {
    const [activeFaq, setActiveFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState("");
    const [selectedRoleGroup, setSelectedRoleGroup] = useState("ALL");

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

    const filteredRoles = useMemo(() => {
        if (selectedRoleGroup === "ALL") return rolesDetail;
        return rolesDetail.filter((r) => r.group === selectedRoleGroup);
    }, [selectedRoleGroup]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
            <Header />

            {/* ========================================================= */}
            {/* BANNER HERO GUILD GUIDE — Ukuran Panjang & Tingginya Pas   */}
            {/* ========================================================= */}
            <section
                className="relative w-full min-h-[480px] md:min-h-[580px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-32 md:pt-36"
                style={{ backgroundImage: "url('/faq.gif')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/80 via-black/50 to-[#0c1322] pointer-events-none z-0" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center justify-center gap-4">
                    <span className="font-pixel text-[9px] md:text-[11px] text-yellow-300 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        ✦ GUILD INSTRUCTION MANUAL ✦
                    </span>

                    <h1 className="font-pixel text-3xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
                        [ THE ADVENTURER&apos;S CODEX ]
                    </h1>

                    <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        Official guide manual on navigating PartyUp!, mastering 10 Software Engineering RPG Class Roles, and forming winning hackathon parties for <strong className="text-yellow-300 font-bold">GEMASTIK &amp; INVENTION 2026</strong>.
                    </p>
                </div>
            </section>

            {/* STICKY QUICK-NAV — Jump cepat antar section */}
            <nav className="sticky top-0 z-30 bg-[#0c1322]/95 backdrop-blur-md border-b-4 border-retro-black shadow-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {NAV_SECTIONS.map((s) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => scrollToSection(s.id)}
                            className="font-pixel text-[9px] md:text-[10px] text-gray-300 hover:text-yellow-300 whitespace-nowrap px-4 py-3 border-b-2 border-transparent hover:border-yellow-400 transition-colors cursor-pointer bg-transparent"
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 pt-10 pb-16 flex flex-col gap-16">

                {/* SECTION 1: WHAT IS PARTYUP!? */}
                <section id="overview" className="scroll-mt-32 flex flex-col gap-4 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3">
                        <span className="font-pixel text-[9px] text-yellow-400 uppercase block mb-1">// GUILD SYSTEM ARCHITECTURE</span>
                        <h2 className="font-pixel text-sm md:text-base text-white">
                            WHAT IS PARTYUP!?
                        </h2>
                    </div>

                    <p className="font-sans text-sm text-gray-200 leading-relaxed">
                        PartyUp! is an 8-bit RPG-themed student team matchmaking &amp; micro-networking platform designed to empower Indonesian IT students to form high-performing hackathon and competition parties based on verified skill sets.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="bg-[#121b2d] p-5 border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left hover:border-pixel-green transition-colors rounded">
                            <span className="font-pixel text-[9px] text-pixel-green font-bold block mb-1.5">01. QUEST BOARD</span>
                            <p className="font-sans text-xs text-gray-300 leading-relaxed">Central hub to dispatch competition requests and recruit party members.</p>
                        </div>
                        <div className="bg-[#121b2d] p-5 border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left hover:border-yellow-300 transition-colors rounded">
                            <span className="font-pixel text-[9px] text-yellow-300 font-bold block mb-1.5">02. SHOWCASE</span>
                            <p className="font-sans text-xs text-gray-300 leading-relaxed">Historical portfolio gallery highlighting finished student works as proof of skill.</p>
                        </div>
                        <div className="bg-[#121b2d] p-5 border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left hover:border-sky-300 transition-colors rounded">
                            <span className="font-pixel text-[9px] text-sky-300 font-bold block mb-1.5">03. TIMELINE</span>
                            <p className="font-sans text-xs text-gray-300 leading-relaxed">Real-time social feeds for progress broadcasts and community chatter.</p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: CHARACTER LEVEL SYSTEM */}
                <section id="level-system" className="scroll-mt-32 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3">
                        <span className="font-pixel text-[9px] text-yellow-400 uppercase block mb-1">// CHARACTER RATING METRICS</span>
                        <h2 className="font-pixel text-sm md:text-base text-white">
                            CHARACTER LEVEL (LV.) CALCULATION
                        </h2>
                    </div>

                    <div className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 rounded flex flex-col gap-6">
                        {/* Visual Formula */}
                        <div className="flex flex-wrap items-center justify-center gap-3 font-pixel text-[10px] md:text-xs">
                            <div className="flex flex-col items-center gap-1.5 bg-[#18233a] border-2 border-emerald-400/80 px-4 py-3 min-w-[110px] rounded">
                                <span className="text-emerald-300">SKILLS</span>
                                <span className="text-white font-bold">× 2 PTS</span>
                            </div>
                            <span className="text-yellow-400 text-lg font-bold">+</span>
                            <div className="flex flex-col items-center gap-1.5 bg-[#18233a] border-2 border-sky-400/80 px-4 py-3 min-w-[110px] rounded">
                                <span className="text-sky-300">SEMESTER</span>
                                <span className="text-white font-bold">× 2 PTS</span>
                            </div>
                            <span className="text-yellow-400 text-lg font-bold">+</span>
                            <div className="flex flex-col items-center gap-1.5 bg-[#18233a] border-2 border-pink-400/80 px-4 py-3 min-w-[110px] rounded">
                                <span className="text-pink-300">QUESTS</span>
                                <span className="text-white font-bold">× 3 PTS</span>
                            </div>
                            <span className="text-yellow-400 text-lg font-bold">=</span>
                            <div className="flex flex-col items-center gap-1.5 bg-retro-black border-2 border-yellow-400 px-5 py-3 min-w-[110px] rounded">
                                <span className="text-yellow-300">YOUR LV.</span>
                                <span className="text-white font-bold">RATING</span>
                            </div>
                        </div>

                        {/* Example Calculation */}
                        <div className="border-t border-gray-700/80 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed text-left">
                                <span className="font-pixel text-[8px] text-yellow-400 block mb-1">// REAL CALCULATION EXAMPLE</span>
                                Joice — Semester 4, 5 Skills Mastered, 2 Completed Quests:
                                <br />
                                <span className="text-white font-mono">(5 × 2) + (4 × 2) + (2 × 3) = 10 + 8 + 6</span>
                            </div>
                            <div className="font-pixel text-xl text-yellow-300 bg-retro-black border-2 border-yellow-400 px-6 py-2.5 shrink-0 rounded shadow-md">
                                LV. 24
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: 10 SOFTWARE ENGINEERING CLASSES (INTERAKSI TAB RINGKAS) */}
                <section id="roles" className="scroll-mt-32 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <span className="font-pixel text-[9px] text-yellow-400 uppercase block mb-1">// GUILD CLASS DIRECTORY</span>
                            <h2 className="font-pixel text-sm md:text-base text-white">
                                10 SOFTWARE ENGINEERING CLASSES
                            </h2>
                        </div>

                        {/* Tab Filter Kelompok Role — Mencegah tampilan memanjang membosankan */}
                        <div className="flex flex-wrap gap-1.5 font-pixel text-[8px]">
                            <button
                                type="button"
                                onClick={() => setSelectedRoleGroup("ALL")}
                                className={`px-3 py-1.5 border-2 rounded transition-colors cursor-pointer ${selectedRoleGroup === "ALL"
                                        ? "bg-yellow-400 text-retro-black border-yellow-400 font-bold"
                                        : "bg-[#18233a] text-gray-300 border-gray-700 hover:border-gray-500"
                                    }`}
                            >
                                ALL (10)
                            </button>
                            {Object.entries(GROUP_STYLES).map(([key, g]) => (
                                <button
                                    type="button"
                                    key={key}
                                    onClick={() => setSelectedRoleGroup(key)}
                                    className={`px-3 py-1.5 border-2 rounded transition-colors cursor-pointer ${selectedRoleGroup === key
                                            ? `${g.border} font-bold`
                                            : "bg-[#18233a] text-gray-300 border-gray-700 hover:border-gray-500"
                                        }`}
                                >
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid Kartu Role Compact & Modern */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredRoles.map((item, index) => {
                            const g = GROUP_STYLES[item.group];
                            return (
                                <div
                                    key={index}
                                    className="bg-[#121b2d] border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex gap-4 items-start hover:border-yellow-400 transition-colors rounded"
                                >
                                    <div className="w-10 h-10 bg-[#18233a] border border-gray-600 flex items-center justify-center font-pixel text-lg shrink-0 rounded">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-1 text-left">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-pixel text-xs text-yellow-300 font-bold">{item.role}</h3>
                                            <span className={`w-2 h-2 rounded-full ${g.dot}`} title={g.label} />
                                        </div>
                                        <p className="font-sans text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* SECTION 4: OFFICIAL GUILD VIDEO WALKTHROUGH */}
                <section id="walkthrough" className="scroll-mt-32 flex flex-col gap-4 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3 flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <span className="font-pixel text-[9px] text-yellow-400 uppercase block mb-1">// INTERACTIVE DEMO</span>
                            <h2 className="font-pixel text-sm md:text-base text-white">
                                OFFICIAL GUILD VIDEO WALKTHROUGH
                            </h2>
                        </div>
                        <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2.5 py-1 border border-retro-black font-bold">
                            ● HD VIDEO DEMO
                        </span>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                        Watch the official video guide below to learn how to create your character, dispatch quests, and build high-performing parties for <strong className="text-yellow-300">GEMASTIK &amp; INVENTION 2026</strong>.
                    </p>

                    <div className="relative aspect-video w-full border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-retro-black rounded mt-1">
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

                {/* SECTION 5: FAQ ACCORDION + SEARCH */}
                <section id="faq" className="scroll-mt-32 flex flex-col gap-6 text-left">
                    <div className="border-b-2 border-yellow-400/80 pb-3">
                        <span className="font-pixel text-[9px] text-yellow-400 uppercase block mb-1">// QUICK ANSWERS</span>
                        <h2 className="font-pixel text-sm md:text-base text-white">
                            FREQUENTLY ASKED QUESTIONS (FAQ)
                        </h2>
                    </div>

                    {/* Search bar FAQ */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-pixel text-[8px] text-yellow-400">// SEARCH FAQ KEYWORDS</label>
                        <input
                            type="text"
                            placeholder="e.g. level, admin, quest, gemastik..."
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                            className="w-full md:w-1/2 font-sans text-xs p-2.5 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 placeholder-gray-400 rounded"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => {
                                const isOpen = activeFaq === faq.q;
                                return (
                                    <div
                                        key={index}
                                        className="bg-[#121b2d] border-2 border-retro-black rounded overflow-hidden transition-colors hover:border-yellow-400/60"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(faq.q)}
                                            className="w-full p-4 text-left flex justify-between items-center gap-3 font-pixel text-[10px] text-white hover:text-yellow-300 cursor-pointer bg-transparent border-none"
                                        >
                                            <span>{faq.q}</span>
                                            <span className={`text-yellow-400 font-bold text-xs shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
                                        </button>

                                        {isOpen && (
                                            <div className="p-4 border-t border-gray-700 bg-[#18233a] font-sans text-xs text-gray-200 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        )}
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
                <section className="text-center py-6 flex flex-col items-center gap-4 bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded p-6">
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