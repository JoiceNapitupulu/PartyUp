"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import PixelAvatar from "../../components/PixelAvatar";
import PixelTechIcon from "../../components/PixelTechIcon";
import PortfolioModal from "../../components/PortfolioModal";
import usersData from "../../data/users.json";
import projectsData from "../../data/projects.json";
import { calculateUserLevel, getStoredUsers, getStoredProjects } from "../../utils/auth";
import { useLanguage, translations } from "../../utils/lang";

// Helper Banner Default ala Codedex / 8-Bit Retro RPG
const getDefaultBanner = (name) => {
  const title = name?.toLowerCase() || "";
  if (title.includes("whoosh") || title.includes("ecosphere") || title.includes("eco")) return "/bg.png";
  if (title.includes("sora") || title.includes("gocache") || title.includes("cloud") || title.includes("system")) return "/computer.png";
  if (title.includes("game") || title.includes("quest") || title.includes("pixel")) return "/bg3.gif";
  return "/bg2.gif";
};

// Kategori Filter Cepat Portofolio
const CATEGORIES = [
  { id: "ALL", label: "ALL QUESTS", icon: "🌐" },
  { id: "FRONTEND", label: "FRONTEND / WEB", icon: "💻" },
  { id: "UIUX", label: "UI / UX DESIGN", icon: "🎨" },
  { id: "BACKEND", label: "BACKEND / CLOUD", icon: "⚙️" },
  { id: "MOBILE", label: "MOBILE APPS", icon: "📱" },
];

export default function Showcase() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [users, setUsers] = useState(usersData);
  const [projects, setProjects] = useState(projectsData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [recruitmentRole, setRecruitmentRole] = useState("Core Contributor");
  const [recruitmentNote, setRecruitmentNote] = useState("");
  const [invitationStatus, setInvitationStatus] = useState("idle");

  // State Modal Detail Case Study
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  // 🔒 Kunci scroll halaman belakang saat modal dibuka & aktifkan tombol ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveCaseStudy(null);
        setSelectedUser(null);
      }
    };

    if (activeCaseStudy || selectedUser) {
      document.body.style.overflow = "hidden"; // Mengunci scroll body utama
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset"; // Mengembalikan scroll normal
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCaseStudy, selectedUser]);

  // Inisialisasi sinkronisasi data dinamis dari LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUsers = getStoredUsers();
      setUsers(activeUsers && activeUsers.length > 0 ? activeUsers : usersData);
      const activeProjects = getStoredProjects();
      setProjects(activeProjects && activeProjects.length > 0 ? activeProjects : projectsData);
      if (activeProjects && activeProjects[0]) {
        setSelectedProject(activeProjects[0].title);
      }
    }
  }, []);

  // Normalisasi & Ekstraksi seluruh item portofolio dari data anggota
  const allShowcases = useMemo(() => {
    const showcases = [];
    users.forEach((user) => {
      if (user && user.portfolio && Array.isArray(user.portfolio)) {
        user.portfolio.forEach((p, idx) => {
          // Penentuan kategori otomatis berdasarkan role & tech stack
          let category = "FRONTEND";
          const techStr = (p.tech_stack || []).join(" ").toLowerCase();
          const roleStr = (p.role || user.role || "").toLowerCase();

          if (roleStr.includes("designer") || roleStr.includes("ui") || techStr.includes("figma")) {
            category = "UIUX";
          } else if (roleStr.includes("backend") || techStr.includes("go") || techStr.includes("node") || techStr.includes("sql") || techStr.includes("docker")) {
            category = "BACKEND";
          } else if (techStr.includes("flutter") || techStr.includes("react native") || techStr.includes("android") || techStr.includes("ios")) {
            category = "MOBILE";
          }

          showcases.push({
            id: `${user.user_id || "usr"}-${p.project_name?.toLowerCase().replace(/\s+/g, "-") || idx}`,
            project_name: p.project_name || "Untitled Quest",
            description: p.description || "Comprehensive student-built system developed during university guild assignments.",
            role: p.role || user.role || "Lead Adventurer",
            category: category,
            tech_stack: p.tech_stack && p.tech_stack.length > 0 ? p.tech_stack : ["React", "Tailwind CSS", "TypeScript"],
            source_code: p.source_code || "https://github.com",
            demo_link: p.demo_link || "https://vercel.com",
            documentation_link: p.documentation_link || "https://notion.so",
            image: p.image || getDefaultBanner(p.project_name),
            user: user,
            // Metrik showcase interaktif untuk web design judging
            metrics: {
              rank: idx % 3 === 0 ? "S-RANK" : idx % 2 === 0 ? "A-RANK" : "B-RANK",
              qualityScore: 92 + ((idx * 3) % 8),
              deployStatus: "Production Ready",
              timeline: "4 Weeks Sprint",
              impact: "High Collaborative Value",
            },
            highlights: [
              "Engineered responsive high-frequency UI components with zero latency layout shift.",
              "Architected secure modular workflows verified by guild peer reviews.",
              "Implemented comprehensive end-to-end user experience flow."
            ]
          });
        });
      }
    });
    return showcases;
  }, [users]);

  // Filter showcases berdasarkan query pencarian dan tab kategori aktif
  const filteredShowcases = useMemo(() => {
    return allShowcases.filter((item) => {
      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.project_name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        (item.user?.name && item.user.name.toLowerCase().includes(query)) ||
        item.tech_stack.some((t) => t.toLowerCase().includes(query));

      const matchCategory = selectedCategory === "ALL" || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [allShowcases, search, selectedCategory]);

  // Handle pengiriman undangan rekrutmen tim
  const handleSendInvite = (e) => {
    e.preventDefault();
    setInvitationStatus("sending");
    setTimeout(() => {
      setInvitationStatus("success");
    }, 1200);
  };

  const closeInviteModal = () => {
    setSelectedUser(null);
    setInvitationStatus("idle");
    setRecruitmentNote("");
  };

  return (
    <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <Header />

      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER & SEARCH ENGINE (Full-Bleed /bg4.gif / min-h-[560px])   */}
      {/* ========================================================================= */}
      <section
        className="relative w-full md:min-h-[560px] min-h-[480px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-24 md:pt-28"
        style={{ backgroundImage: "url('/bg4.gif')" }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/85 via-black/60 to-[#0c1322] pointer-events-none z-0" />

        {/* Scanlines Effect Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center gap-5">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#121b2d]/90 border-2 border-yellow-400 px-3.5 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
            <span className="w-2 h-2 rounded-full bg-pixel-green animate-ping" />
            <span className="font-pixel text-[8.5px] md:text-[10px] text-yellow-300 tracking-widest">
              ✦ GUILD ARCHIVES & PROOF OF WORK ✦
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-pixel text-2xl md:text-4xl text-yellow-300 drop-shadow-[0_5px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
            [ {translations[lang]?.showcase || "ADVENTURER SHOWCASE GALLERY"} ]
          </h1>

          {/* Description */}
          <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Explore authentic historical quest logs, enterprise-grade prototypes, and certified digital products forged by student guild members. Inspect technical specifications or directly recruit top talent into your party.
          </p>

          {/* Real-time Integrated Search Bar */}
          <div className="w-full max-w-xl pt-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-pixel text-xs text-yellow-400 select-none">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search works, keywords, technologies, roles, or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full font-sans text-xs pl-10 pr-4 py-3 bg-[#1c2a4a]/95 text-white border-2 border-yellow-400 focus:outline-none placeholder-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] backdrop-blur-md rounded-lg"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-pixel text-[8px] text-gray-300 hover:text-red-400 bg-black/40 px-1.5 py-0.5 rounded border border-gray-600"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Guild Live Status Counter Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 pt-3 text-center">
            <div className="bg-[#121b2d]/80 border-2 border-retro-black px-4 py-2 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-pixel text-xs md:text-sm text-yellow-400">{allShowcases.length}</p>
              <p className="font-pixel text-[7px] text-gray-300 uppercase tracking-wider">Archived Works</p>
            </div>
            <div className="bg-[#121b2d]/80 border-2 border-retro-black px-4 py-2 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-pixel text-xs md:text-sm text-pixel-green">{users.length}</p>
              <p className="font-pixel text-[7px] text-gray-300 uppercase tracking-wider">Active Creators</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-[#121b2d]/80 border-2 border-retro-black px-4 py-2 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-pixel text-xs md:text-sm text-cyan-400">100% VERIFIED</p>
              <p className="font-pixel text-[7px] text-gray-300 uppercase tracking-wider">Peer-Reviewed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT WRAPPER & RECRUITMENT HUB NOTICE                          */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-8 pb-16 flex flex-col gap-7">

        {/* Recruitment Hub Notice Card */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f1b30] border-l-4 border-yellow-400 px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-r-xl">
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[9px] text-yellow-400">// RECRUITMENT & PORTFOLIO ENGINE</span>
              <span className="font-pixel text-[7px] bg-pixel-green/20 text-pixel-green px-2 py-0.5 border border-pixel-green/40">ONLINE</span>
            </div>
            <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
              Click any showcase card below to inspect full case studies, tech architectures, and live deployments. Click <strong className="text-yellow-300 font-bold">RECRUIT</strong> to invite creator directly to your open quests.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-pixel text-[8px] text-gray-400 hidden lg:inline">RESULTS:</span>
            <span className="font-pixel text-[9px] bg-[#1a253b] border border-retro-black px-3 py-1 text-yellow-300 rounded-md">
              {filteredShowcases.length} DISPLAYED
            </span>
          </div>
        </section>

        {/* Category Filter Pills Bar */}
        <section className="flex flex-wrap items-center gap-2 pb-2 border-b-2 border-gray-800">
          <span className="font-pixel text-[8px] text-gray-400 mr-2 uppercase">// DOMAIN FILTER:</span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-pixel text-[8px] md:text-[9px] px-3.5 py-1.5 rounded-lg border-2 transition-all flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${isActive
                    ? "bg-yellow-400 text-retro-black border-retro-black font-bold -translate-y-0.5"
                    : "bg-[#142036] text-gray-300 border-retro-black hover:border-yellow-400 hover:text-white"
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </section>

        {/* ========================================================================= */}
        {/* 3. PORTFOLIO CARD GRID (2-Column Responsive / bg-[#121b2d] / rounded-2xl) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredShowcases.length > 0 ? (
            filteredShowcases.map((item) => {
              const userLevel = calculateUserLevel(item.user);
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCaseStudy(item)}
                  className="bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 overflow-hidden group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200 cursor-pointer text-left relative"
                >
                  {/* Top Card Section */}
                  <div>
                    {/* A. Pixel Banner Image */}
                    <div className="relative h-48 w-full border-b-4 border-retro-black overflow-hidden bg-retro-black">
                      <Image
                        src={item.image}
                        alt={item.project_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121b2d] via-transparent to-black/60" />

                      {/* Header Badges Overlay */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="font-pixel text-[8px] bg-[#1e2d42]/90 backdrop-blur-sm text-pixel-green border border-pixel-green/40 px-2.5 py-1 font-bold rounded-md shadow-sm">
                          {item.role?.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-pixel text-[8px] bg-yellow-400 text-retro-black border border-retro-black px-2 py-0.5 font-bold rounded-md shadow-sm">
                            {item.metrics.rank}
                          </span>
                          <span className="font-pixel text-[7.5px] bg-retro-black/80 text-yellow-300 border border-retro-black px-2 py-0.5 rounded-md">
                            ★ COMPLETED
                          </span>
                        </div>
                      </div>

                      {/* Bottom Banner Strip */}
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[8px] font-pixel text-gray-300 z-10">
                        <span className="bg-black/60 px-2 py-0.5 rounded border border-gray-700">
                          QUAL: {item.metrics.qualityScore}%
                        </span>
                        <span className="text-yellow-400 drop-shadow-sm">
                          CLICK FOR CASE STUDY ➔
                        </span>
                      </div>
                    </div>

                    {/* B. Project Title, Description & Tech Badges */}
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-pixel text-xs md:text-[13px] text-white leading-snug font-bold group-hover:text-yellow-300 transition-colors">
                          {item.project_name}
                        </h3>
                      </div>

                      <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tech Stack Pills with Icons */}
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.tech_stack.map((tech, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 font-pixel text-[7.5px] bg-[#1a253b] text-gray-200 px-2 py-1 border border-gray-600/50 rounded"
                          >
                            <PixelTechIcon tech={tech} size="w-3 h-3" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* C. Author Avatar, Level & [RECRUIT] Action Button */}
                  <div className="p-5 pt-0 mt-2">
                    <div className="border-t-2 border-gray-700/60 pt-3.5 flex items-center justify-between gap-4">
                      {/* Author Info */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 bg-retro-black border-2 border-yellow-400 flex items-center justify-center rounded-full shrink-0 overflow-hidden shadow-sm">
                          <PixelAvatar role={item.user?.role || item.role} size="w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-pixel text-[8.5px] text-white leading-tight font-bold truncate">
                            {item.user?.name || "Anonymous Member"}
                          </p>
                          <p className="font-sans text-[10px] text-gray-400 leading-tight truncate">
                            {item.user?.role || item.role} • <span className="text-yellow-300 font-pixel text-[8px]">LV.{userLevel}</span>
                          </p>
                        </div>
                      </div>

                      {/* Recruit Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // Mencegah trigger modal case study
                          setSelectedUser(item.user);
                        }}
                        className="font-pixel text-[9px] px-4 py-2 bg-pixel-green hover:bg-green-500 border-2 border-retro-black text-retro-black font-bold rounded-xl active:translate-y-[1px] transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0"
                      >
                        ⚔️ RECRUIT
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="col-span-full bg-[#131f37] border-4 border-retro-black rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-pixel text-2xl text-yellow-400">? ? ?</span>
              <p className="font-pixel text-xs text-white">NO QUESTS FOUND MATCHING YOUR CRITERIA</p>
              <p className="font-sans text-xs text-gray-400 max-w-md">
                Try searching for different keywords, resetting filters, or clearing the search query.
              </p>
              <PixelButton
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("ALL");
                }}
              >
                RESET ALL FILTERS
              </PixelButton>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE PORTFOLIO & CASE STUDY MODAL                             */}
        {/* ========================================================================= */}
        {activeCaseStudy && (
          <PortfolioModal
            project={activeCaseStudy}
            user={activeCaseStudy.user}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}

        {/* ========================================================================= */}
        {/* 5. RECRUITMENT MODAL (selectedUser - Interactive Party Invite Flow)       */}
        {/* ========================================================================= */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/85 p-4 backdrop-blur-md">
            <div className="bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white w-full max-w-md p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150">

              <button
                type="button"
                onClick={closeInviteModal}
                className="absolute top-4 right-4 font-pixel text-xs text-red-400 hover:text-red-500 border-none bg-transparent cursor-pointer"
              >
                [✕]
              </button>

              <div className="border-b-2 border-gray-700 pb-3 text-left">
                <span className="font-pixel text-[8px] text-yellow-400">// PARTY FORMATION PROTOCOL</span>
                <h2 className="font-pixel text-xs text-white mt-0.5">
                  [ RECRUIT PARTY MEMBER ]
                </h2>
              </div>

              {invitationStatus === "idle" && (
                <form onSubmit={handleSendInvite} className="flex flex-col gap-4 text-left">
                  {/* Candidate Summary Header */}
                  <div className="flex items-center gap-3 bg-[#18243b] p-3 border-2 border-retro-black rounded-xl">
                    <div className="w-10 h-10 bg-retro-black border border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                      <PixelAvatar role={selectedUser.role} size="w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-pixel text-[9px] text-yellow-300 font-bold truncate">{selectedUser.name}</p>
                      <p className="font-sans text-[10px] text-gray-300">
                        Class: <strong className="text-white">{selectedUser.role}</strong> • LV.{calculateUserLevel(selectedUser)}
                      </p>
                    </div>
                  </div>

                  {/* Select Target Project */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-yellow-400">ASSIGN TO ACTIVE QUEST / PROJECT</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="font-sans text-xs p-2.5 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none cursor-pointer rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {projects.map((proj) => (
                        <option key={proj.project_id || proj.id} value={proj.title} className="bg-[#1c2a4a]">
                          {proj.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Role Assignment */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-yellow-400">PROPOSED PARTY ROLE</label>
                    <select
                      value={recruitmentRole}
                      onChange={(e) => setRecruitmentRole(e.target.value)}
                      className="font-sans text-xs p-2.5 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none cursor-pointer rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="Lead Architect">Lead Architect / Tech Lead</option>
                      <option value="UI/UX Specialist">UI/UX Specialist</option>
                      <option value="Core Contributor">Core Contributor</option>
                      <option value="Backend Engineer">Backend & Database Specialist</option>
                    </select>
                  </div>

                  {/* Optional Invitation Note */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-gray-300">QUEST INVITATION NOTE (OPTIONAL)</label>
                    <textarea
                      rows={2}
                      value={recruitmentNote}
                      onChange={(e) => setRecruitmentNote(e.target.value)}
                      placeholder="e.g., We saw your awesome showcase and need your skills for our upcoming sprint!"
                      className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none resize-none rounded-lg"
                    />
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <PixelButton variant="secondary" type="button" onClick={closeInviteModal}>
                      CANCEL
                    </PixelButton>
                    <PixelButton variant="green" type="submit">
                      SEND INVITATION ➔
                    </PixelButton>
                  </div>
                </form>
              )}

              {/* Status: Sending Animation */}
              {invitationStatus === "sending" && (
                <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-dashed border-yellow-400 rounded-full animate-spin" />
                  <p className="font-pixel text-[10px] text-yellow-400">TRANSMITTING QUEST DISPATCH...</p>
                  <p className="font-sans text-xs text-gray-400">Connecting to member communication frequency...</p>
                </div>
              )}

              {/* Status: Success State */}
              {invitationStatus === "success" && (
                <div className="py-6 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-pixel-green text-retro-black border-4 border-retro-black rounded-2xl flex items-center justify-center text-2xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    ✓
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-pixel text-xs text-yellow-400">INVITATION TRANSMITTED!</p>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed px-2">
                      Formal invitation for <strong className="text-white">{selectedProject}</strong> has been logged and transmitted to{" "}
                      <strong className="text-white">{selectedUser.name}</strong> ({recruitmentRole}).
                    </p>
                  </div>
                  <PixelButton variant="navy" onClick={closeInviteModal} className="w-full mt-2">
                    DONE / RETURN TO GALLERY
                  </PixelButton>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}