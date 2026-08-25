"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import PixelAvatar from "../../components/PixelAvatar";
import PixelTechIcon from "../../components/PixelTechIcon";
import usersData from "../../data/users.json";
import projectsData from "../../data/projects.json";
import { calculateUserLevel, getStoredUsers, getStoredProjects } from "../../utils/auth";
import { useLanguage, translations } from "../../utils/lang";

const getDefaultBanner = (name) => {
  const title = name?.toLowerCase() || "";
  if (title.includes("whoosh") || title.includes("ecosphere")) return "/bg.png";
  if (title.includes("sora") || title.includes("gocache")) return "/computer.png";
  return "/bg2.gif";
};

export default function Showcase() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);
  const [projects, setProjects] = useState(projectsData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [invitationStatus, setInvitationStatus] = useState("idle");

  // State untuk melihat detail tinjauan mendalam karya (Case Study Modal)
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUsers = getStoredUsers();
      setUsers(activeUsers);
      const activeProjects = getStoredProjects();
      setProjects(activeProjects);
      if (activeProjects[0]) {
        setSelectedProject(activeProjects[0].title);
      }
    }
  }, []);

  const allShowcases = [];
  users.forEach((user) => {
    if (user.portfolio) {
      user.portfolio.forEach((p) => {
        allShowcases.push({
          id: `${user.user_id}-${p.project_name.toLowerCase().replace(/\s+/g, "-")}`,
          project_name: p.project_name,
          description: p.description,
          role: p.role,
          tech_stack: p.tech_stack || ["Figma", "Tailwind CSS"],
          source_code: p.source_code || "https://github.com",
          demo_link: p.demo_link || "https://vercel.com",
          documentation_link: p.documentation_link || "",
          image: p.image || getDefaultBanner(p.project_name),
          user: user,
        });
      });
    }
  });

  const filteredShowcases = allShowcases.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.project_name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query) ||
      item.user.name.toLowerCase().includes(query)
    );
  });

  const handleSendInvite = (e) => {
    e.preventDefault();
    setInvitationStatus("sending");
    setTimeout(() => {
      setInvitationStatus("success");
    }, 1000);
  };

  const closeInviteModal = () => {
    setSelectedUser(null);
    setInvitationStatus("idle");
  };

  return (
    <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <Header />

      {/* 1. BANNER ATAS DIPERPANJANG KE BAWAH (min-h-[480px] md:min-h-[560px] py-20 md:py-24) */}
      <section
        className="relative w-full min-h-[480px] md:min-h-[560px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-32 md:pt-36"
        style={{ backgroundImage: "url('/bg4.gif')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/80 via-black/50 to-[#0c1322] pointer-events-none z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center justify-center gap-4">
          <span className="font-pixel text-[9px] md:text-[11px] text-yellow-300 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            ✦ HISTORICAL ARCHIVES ✦
          </span>

          <h1 className="font-pixel text-3xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
            [ {translations[lang]?.showcase || "ADVENTURER SHOWCASE GALLERY"} ]
          </h1>

          <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {translations[lang]?.profileDesc || "Browse historical quest logs and finished works completed by active guild members."}
          </p>

          <div className="w-full max-w-md pt-3">
            <input
              type="text"
              placeholder="Search works, classes, roles, or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-sans text-xs p-3.5 bg-[#1c2a4a]/90 text-white border-2 border-yellow-400 focus:outline-none placeholder-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm rounded-lg"
            />
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-10 pb-16 flex flex-col gap-8">

        {/* Informasi Ringkas */}
        <section className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 bg-[#0f1b30] border-l-4 border-yellow-400 px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-r-lg">
          <span className="font-pixel text-[9px] text-yellow-400 whitespace-nowrap">// RECRUITMENT HUB</span>
          <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
            Every showcase below represents verified past projects from student members. Click on any card to view detailed specifications, or click <strong className="text-yellow-300 font-bold">RECRUIT</strong> to invite them!
          </p>
        </section>

        {/* 2. GALLERY GRID - KARTU DENGAN SUDUT MELENGKUNG (rounded-2xl) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredShowcases.length > 0 ? (
            filteredShowcases.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveCaseStudy(item)}
                className="bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 overflow-hidden group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Banner Gambar Karya Atas */}
                  <div className="relative h-48 w-full border-b-4 border-retro-black overflow-hidden bg-retro-black">
                    <Image
                      src={item.image}
                      alt={item.project_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121b2d] via-transparent to-black/40" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="font-pixel text-[8px] bg-[#1e2d42] text-pixel-green border border-pixel-green/40 px-2.5 py-1 font-bold rounded">
                        {item.role?.toUpperCase()}
                      </span>
                      <span className="font-pixel text-[8px] text-yellow-400 font-bold drop-shadow">
                        ★ COMPLETED
                      </span>
                    </div>
                  </div>

                  {/* Informasi Detail Kartu */}
                  <div className="p-6 flex flex-col gap-3 text-left">
                    <h3 className="font-pixel text-xs md:text-sm text-white leading-relaxed font-bold group-hover:text-yellow-300 transition-colors">
                      {item.project_name}
                    </h3>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tech_stack.map((tech, i) => (
                        <span key={i} className="flex items-center gap-1.5 font-pixel text-[7.5px] bg-[#1a253b] text-gray-200 px-2.5 py-1 border border-gray-600/50 rounded">
                          <PixelTechIcon tech={tech} size="w-3.5 h-3.5" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Kartu */}
                <div className="p-6 pt-0">
                  <div className="border-t border-gray-700/60 pt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-9 h-9 bg-retro-black border-2 border-yellow-400 flex items-center justify-center rounded-full shrink-0 overflow-hidden shadow-sm">
                        <PixelAvatar role={item.user.role} size="w-full h-full" />
                      </div>
                      <div>
                        <p className="font-pixel text-[9px] text-white leading-none mb-1 font-bold">
                          {item.user.name}
                        </p>
                        <p className="font-sans text-[10px] text-gray-400 leading-none">
                          {item.user.role} • LV.{calculateUserLevel(item.user)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(item.user);
                      }}
                      className="font-pixel text-[9px] px-4 py-2 bg-green-500 hover:bg-green-600 border-2 border-retro-black text-white rounded font-bold active:translate-y-[1px] transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      RECRUIT
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#131f37] border-4 border-retro-black p-12 text-center flex flex-col items-center justify-center gap-4 rounded-2xl">
              <span className="font-pixel text-xl text-yellow-400">? ? ?</span>
              <p className="font-pixel text-[10px] text-gray-300">
                NO COMPLETED QUESTS MATCH YOUR FILTERS.
              </p>
              <PixelButton variant="secondary" onClick={() => setSearch("")}>
                CLEAR SEARCH
              </PixelButton>
            </div>
          )}
        </section>

        {/* 3. MODAL: PORTFOLIO CASE STUDY (TINJAUAN MENDALAM KARYA MESTI MEWAH) */}
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/85 p-4 backdrop-blur-md">
            <div className="bg-[#121b2d] border-4 border-retro-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full max-w-xl flex flex-col overflow-hidden relative max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-white rounded-2xl">

              {/* Gambar Atas */}
              <div className="relative h-52 w-full border-b-4 border-retro-black bg-retro-black shrink-0">
                <Image
                  src={activeCaseStudy.image}
                  alt={activeCaseStudy.project_name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121b2d] via-transparent to-black/60" />

                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="font-pixel text-[8px] bg-navy-blue text-white px-2.5 py-1 border border-retro-black shadow">
                    ★ HISTORICAL ARCHIVE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  className="absolute top-4 right-4 z-20 font-pixel text-[8px] text-red-400 hover:text-red-500 bg-retro-black/80 border-2 border-retro-black px-2.5 py-1 select-none cursor-pointer shadow-md"
                >
                  [X] CLOSE
                </button>
              </div>

              {/* Konten Utama Detail */}
              <div className="p-6 flex flex-col gap-5 text-left">
                <div>
                  <h3 className="font-pixel text-base text-yellow-300 leading-snug">{activeCaseStudy.project_name}</h3>
                  <p className="font-pixel text-[7.5px] text-gray-400 mt-1">// PORTFOLIO CASE STUDY SPECIFICATION</p>
                </div>

                <div className="bg-[#18233a] p-4 border-2 border-retro-black rounded-lg">
                  <span className="font-pixel text-[8.5px] text-yellow-400 block mb-1.5">// PROJECT DESCRIPTION &amp; GOALS:</span>
                  <p className="font-sans text-xs text-gray-200 leading-relaxed">{activeCaseStudy.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#18233a] p-3.5 border-2 border-retro-black rounded-lg">
                    <span className="font-pixel text-[8px] text-yellow-400 block mb-1.5">// CONTRIBUTOR ROLE:</span>
                    <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2.5 py-1 border border-retro-black font-bold">
                      {activeCaseStudy.role?.toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-[#18233a] p-3.5 border-2 border-retro-black rounded-lg">
                    <span className="font-pixel text-[8px] text-yellow-400 block mb-1.5">// CREATOR NAME:</span>
                    <p className="font-sans text-xs text-white font-bold">{activeCaseStudy.user.name} <span className="text-pixel-green font-pixel text-[8px]">(LV.{calculateUserLevel(activeCaseStudy.user)})</span></p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <span className="font-pixel text-[8px] text-gray-400 block mb-2">// TECHNOLOGY STACK INVENTORY:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeCaseStudy.tech_stack.map((tech, i) => (
                      <span key={i} className="flex items-center gap-2 font-pixel text-[8px] bg-[#18233a] text-gray-200 px-3 py-1.5 border border-gray-600 rounded">
                        <PixelTechIcon tech={tech} size="w-3.5 h-3.5" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tautan Luar & Tombol Rekrut */}
                <div className="flex justify-between items-center border-t-2 border-gray-700 pt-4 mt-2">
                  <div className="flex gap-4">
                    <a href={activeCaseStudy.source_code} target="_blank" rel="noreferrer" className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 transition-colors">
                      [SOURCE_CODE]
                    </a>
                    <a href={activeCaseStudy.demo_link} target="_blank" rel="noreferrer" className="font-pixel text-[8px] text-pixel-green hover:text-green-400 transition-colors">
                      [LIVE_DEMO]
                    </a>
                  </div>
                  <PixelButton
                    variant="green"
                    onClick={() => {
                      setActiveCaseStudy(null);
                      setSelectedUser(activeCaseStudy.user);
                    }}
                    className="py-2.5 px-5 text-[9px]"
                  >
                    RECRUIT CREATOR ▶
                  </PixelButton>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Modal: Invite Developer */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/80 p-4 backdrop-blur-sm">
            <div className="bg-[#121b2d] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white w-full max-w-sm p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150 rounded-2xl">
              <button
                type="button"
                onClick={closeInviteModal}
                className="absolute top-4 right-4 font-pixel text-xs text-red-400 hover:text-red-500 border-none bg-transparent cursor-pointer"
              >
                [X]
              </button>

              <h2 className="font-pixel text-xs text-yellow-400 border-b-2 border-gray-700 pb-2 text-left">
                [RECRUIT PARTY MEMBER]
              </h2>

              {invitationStatus === "idle" && (
                <form onSubmit={handleSendInvite} className="flex flex-col gap-4 text-left">
                  <p className="font-sans text-xs text-gray-200 leading-relaxed">
                    Invite <span className="font-bold text-white">{selectedUser.name}</span> (Class:{" "}
                    <span className="text-yellow-400 font-bold">{selectedUser.role}</span>) to join one of your active projects.
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-yellow-400">SELECT ACTIVE QUEST</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="font-sans text-xs p-2.5 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none cursor-pointer rounded-lg"
                    >
                      {projects.map((proj) => (
                        <option key={proj.project_id} value={proj.title} className="bg-[#1c2a4a]">
                          {proj.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <PixelButton variant="secondary" type="button" onClick={closeInviteModal}>
                      CANCEL
                    </PixelButton>
                    <PixelButton variant="green" type="submit">
                      SEND INVITATION
                    </PixelButton>
                  </div>
                </form>
              )}

              {invitationStatus === "sending" && (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-retro-black border-4 border-dashed border-yellow-400 animate-spin" />
                  <p className="font-pixel text-[10px] text-yellow-400">SENDING QUEST REQUEST...</p>
                </div>
              )}

              {invitationStatus === "success" && (
                <div className="py-4 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 bg-pixel-green text-retro-black border-4 border-retro-black flex items-center justify-center text-xl font-bold rounded-full">
                    ✓
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-pixel text-[10px] text-yellow-400">REQUEST TRANSMITTED!</p>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      Invitation to join <strong className="text-white">{selectedProject}</strong> sent to{" "}
                      <strong className="text-white">{selectedUser.name}</strong>. Wait for their response!
                    </p>
                  </div>
                  <PixelButton variant="navy" onClick={closeInviteModal} className="w-full">
                    DISMISS
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