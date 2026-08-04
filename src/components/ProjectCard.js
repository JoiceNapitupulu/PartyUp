"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import usersData from "@/data/users.json";
import PixelButton from "./PixelButton";
import PixelTechIcon from "./PixelTechIcon";

const roleNames = [
  "Product Manager (PM)",
  "Project / Scrum Master",
  "UI/UX Designer",
  "UX Researcher",
  "Frontend Developer",
  "Backend Developer",
  "Full-stack Developer",
  "Mobile App Developer",
  "QA (Quality Assurance) Engineer",
  "DevOps Engineer"
];

// Helper Banner Default ala Codedex jika proyek belum memiliki gambar khusus
const getDefaultBanner = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("gemastik")) return "/bg.png";
  if (cat.includes("invention")) return "/computer.png";
  return "/bg2.gif";
};

export default function ProjectCard({ project, showAuthor = true, onApply }) {
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    }
  }, []);

  const author = usersData.find((u) => u.user_id === project.author);

  const handleApply = (e) => {
    if (e) e.stopPropagation();

    if (!currentUser) {
      alert("[RESTRICTED] YOU MUST JOIN THE GUILD (LOG IN) TO JOIN PARTIES!");
      router.push("/login");
      return;
    }

    if (isApplied) return;
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
      if (onApply) {
        onApply(project, author);
      }
    }, 800);
  };

  const isClosed = project.status === "Filled";

  const rolesRequired = project.looking_for.filter((item) =>
    roleNames.includes(item)
  );

  const skillsRequired = project.looking_for.filter((item) =>
    !roleNames.includes(item)
  );

  const getEligibility = (category) => {
    const cat = category?.toLowerCase() || "";
    if (
      cat.includes("gemastik") ||
      cat.includes("invention") ||
      cat.includes("hackathon") ||
      cat.includes("hackfest")
    ) {
      return "All IT / Design / Business Students Nationwide (UI, ITB, UGM, Binus, UNAIR, etc.)";
    }
    return `Restricted to Internal Students of Author's Guild (${author?.university || "Same University"})`;
  };

  // Banner Gambar Kartu (Bisa dari project.image atau default)
  const cardBanner = project.image || getDefaultBanner(project.category);

  return (
    <>
      {/* 1. KARTU UTAMA GAYA CODÉDEX DARK THEME */}
      <div
        onClick={() => setIsDetailOpen(true)}
        className={`bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 flex flex-col justify-between overflow-hidden group transition-all duration-200 cursor-pointer select-none ${
          project.isVerified ? "ring-2 ring-amber-400/50" : ""
        } ${isClosed ? "opacity-70" : ""}`}
      >
        <div>
          {/* A. GAMBAR BANNER PIXEL ATAS (SEPERTI GAMBAR CODÉDEX) */}
          <div className="relative h-36 w-full border-b-4 border-retro-black overflow-hidden bg-retro-black">
            <Image
              src={cardBanner}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121b2d] via-transparent to-black/40" />

            {/* Badges Mengambang di Atas Gambar */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between flex-wrap gap-1.5 z-10">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-pixel text-[8px] px-2 py-0.5 bg-navy-blue text-white border border-retro-black shadow-sm">
                  {project.category}
                </span>
                {project.isVerified && (
                  <span className="font-pixel text-[7px] bg-yellow-400 text-retro-black px-1.5 py-0.5 border border-retro-black font-bold animate-pulse">
                    ★ VERIFIED
                  </span>
                )}
              </div>

              <span
                className={`font-pixel text-[7px] px-2 py-0.5 border border-retro-black uppercase ${
                  isClosed
                    ? "bg-gray-600 text-gray-200"
                    : "bg-pixel-green text-retro-black font-bold animate-pulse"
                }`}
              >
                {project.status === "Open" ? "● OPEN QUEST" : "■ FILLED"}
              </span>
            </div>
          </div>

          {/* B. KONTEN DESKRIPSI KARTU GELAP */}
          <div className="p-4 flex flex-col gap-3 text-left">
            {/* Title */}
            <h3 className="font-pixel text-xs leading-relaxed text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Requirements (Roles & Skills Badges Gelap) */}
            <div className="mt-1">
              <p className="font-pixel text-[8px] text-yellow-400 mb-1.5">// LOOKING FOR:</p>
              <div className="flex flex-wrap gap-1.5">
                {project.looking_for.map((skill, index) => {
                  const isRole = roleNames.includes(skill);
                  return (
                    <span
                      key={index}
                      className={`flex items-center gap-1 font-pixel text-[7px] px-2 py-0.5 border ${
                        isRole
                          ? "bg-[#1e2d42] text-pixel-green border-pixel-green/40 font-bold"
                          : "bg-[#182236] text-gray-200 border-gray-600/40"
                      }`}
                    >
                      {!isRole && <PixelTechIcon tech={skill} size="w-3 h-3" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* C. FOOTER KARTU: AUTHOR INFO & BUTTON */}
        <div className="p-4 pt-0">
          <div className="border-t border-gray-700/60 pt-3 flex items-center justify-between gap-3">
            {showAuthor && author ? (
              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 bg-retro-black border border-yellow-400 flex items-center justify-center font-pixel text-[9px] text-yellow-300 font-bold">
                  {author.name[0]}
                </div>
                <div>
                  <p className="font-pixel text-[8px] text-white leading-tight">{author.name}</p>
                  <p className="font-sans text-[9px] text-gray-400 leading-none mt-0.5">
                    {author.major}
                  </p>
                </div>
              </div>
            ) : (
              <div />
            )}

            <PixelButton
              variant={isApplied ? "secondary" : isClosed ? "disabled" : "green"}
              disabled={isClosed || isApplying || isApplied}
              onClick={(e) => handleApply(e)}
              className="py-1 px-3 text-[8px] border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {isApplying ? "SENDING..." : isApplied ? "APPLIED ✓" : isClosed ? "FILLED" : "JOIN PARTY"}
            </PixelButton>
          </div>
        </div>
      </div>

      {/* 2. POP-UP DETAIL QUEST MODAL (TETAP SAMA) */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/80 p-4 backdrop-blur-sm">
          <div className="bg-[#121b2d] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg p-6 flex flex-col gap-4 relative max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-white">
            {/* Tombol Tutup [X] */}
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 right-4 font-pixel text-xs text-red-400 hover:text-red-500 border-none bg-transparent cursor-pointer"
            >
              [X]
            </button>

            <h2 className="font-pixel text-xs text-yellow-400 border-b-2 border-gray-700 pb-2 text-left">
              [QUEST SPECIFICATION SHEET]
            </h2>

            {/* Informasi Utama */}
            <div className="space-y-4 text-left">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-pixel text-[8px] bg-navy-blue text-white px-2 py-0.5 border border-retro-black">
                    {project.category?.toUpperCase()}
                  </span>
                  {project.isVerified && (
                    <span className="font-pixel text-[8px] bg-yellow-400 text-retro-black px-1.5 py-0.5 border border-retro-black font-bold animate-pulse">
                      ★ GUILD VERIFIED QUEST
                    </span>
                  )}
                </div>
                <h3 className="font-pixel text-sm text-white mt-2 leading-snug">{project.title}</h3>
              </div>

              {/* Project Overview */}
              <div className="bg-[#1a253b] p-3 border-2 border-retro-black">
                <span className="font-pixel text-[8px] text-yellow-400 block mb-1">// QUEST OVERVIEW:</span>
                <p className="font-sans text-xs text-gray-200 leading-relaxed">{project.description}</p>
              </div>

              {/* Roles Required & Eligibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a253b] p-3 border-2 border-retro-black">
                  <span className="font-pixel text-[8px] text-yellow-400 block mb-2">// ROLES REQUIRED (PARTY SIZE):</span>
                  <div className="flex flex-col gap-2">
                    {rolesRequired.map((role, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2 py-0.5 border border-retro-black font-bold">
                          {role?.toUpperCase()}
                        </span>
                        <span className="font-pixel text-[8px] text-gray-300">
                          x1 MEMBER
                        </span>
                      </div>
                    ))}
                    {rolesRequired.length === 0 && (
                      <span className="font-sans text-xs text-gray-400">Party is full!</span>
                    )}
                  </div>
                </div>

                <div className="bg-[#1a253b] p-3 border-2 border-retro-black flex flex-col justify-between">
                  <div>
                    <span className="font-pixel text-[8px] text-yellow-400 block mb-1.5">// ELIGIBILITY CRITERIA:</span>
                    <p className="font-sans text-[11px] text-gray-300 leading-tight">
                      {getEligibility(project.category)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <span className="font-pixel text-[8px] text-gray-400 block mb-1.5">REQUIRED TECHNOLOGY INVENTORY:</span>
                <div className="flex flex-wrap gap-1.5">
                  {skillsRequired.map((tech, i) => (
                    <span key={i} className="flex items-center gap-1.5 font-pixel text-[8px] bg-[#1a253b] text-gray-200 px-2.5 py-1 border border-gray-600">
                      <PixelTechIcon tech={tech} size="w-3.5 h-3.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creator Info */}
              <div className="bg-[#1a253b] p-3 border-2 border-retro-black flex items-center justify-between">
                <div className="text-left">
                  <span className="font-pixel text-[8px] text-gray-400 block mb-1">DISPATCHED BY:</span>
                  <p className="font-pixel text-[9px] text-white font-bold">{author?.name || "Unknown Adventurer"}</p>
                  <p className="font-sans text-[9px] text-gray-400">{author?.university} • {author?.major}</p>
                </div>
                <span className="font-pixel text-[8px] bg-navy-blue text-white px-2 py-1 border border-retro-black">
                  ROLE: {author?.role?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Links & Apply Button */}
            <div className="flex justify-between items-center border-t-2 border-gray-700 pt-4">
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-pixel text-[8px] text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  [SOURCE_CODE]
                </a>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-pixel text-[8px] text-pixel-green hover:text-green-400 transition-colors"
                >
                  [LIVE_DEMO]
                </a>
              </div>
              <PixelButton
                variant={isApplied ? "secondary" : isClosed ? "disabled" : "green"}
                disabled={isClosed || isApplying || isApplied}
                onClick={(e) => handleApply(e)}
                className="py-2 px-4 text-[9px]"
              >
                {isApplying ? "SENDING..." : isApplied ? "APPLIED ✓" : isClosed ? "FILLED" : "JOIN PARTY"}
              </PixelButton>
            </div>

          </div>
        </div>
      )}
    </>
  );
}