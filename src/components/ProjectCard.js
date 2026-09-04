"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import usersData from "../data/users.json";
import PixelButton from "./PixelButton";
import PixelTechIcon from "./PixelTechIcon";
import PixelAvatar from "./PixelAvatar";
import { calculateUserLevel, getStoredUsers } from "../utils/auth";
import { useLanguage } from "../utils/lang";

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

const getDefaultBanner = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("gemastik")) return "/bg.png";
  if (cat.includes("invention")) return "/computer.png";
  return "/bg2.gif";
};

export default function ProjectCard({ project, showAuthor = true, onApply }) {
  if (!project) return null;

  const { lang } = useLanguage();
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState(usersData);

  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("currentUser");
        let activeUser = null;
        if (stored) {
          try {
            activeUser = JSON.parse(stored);
            setCurrentUser(activeUser);
          } catch (e) {
            console.error(e);
          }
        }
        setAllUsers(getStoredUsers());

        // Check if current user has already applied to this quest
        if (activeUser && project) {
          try {
            const rawApps = localStorage.getItem("quest_applications");
            const apps = rawApps ? JSON.parse(rawApps) : [];
            const hasApplied = apps.some(
              (a) =>
                a.applicant_id === activeUser.user_id &&
                a.project_id === project.project_id
            );
            setIsApplied(hasApplied);
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    loadUser();
    window.addEventListener("auth-change", loadUser);
    window.addEventListener("applications-change", loadUser);
    return () => {
      window.removeEventListener("auth-change", loadUser);
      window.removeEventListener("applications-change", loadUser);
    };
  }, [project]);

  const author = allUsers.find((u) => u.user_id === project?.author) || usersData.find((u) => u.user_id === project?.author);

  // Cek apakah user yang login adalah KETUA / PEMBUAT quest ini
  const isOwner = currentUser && (project.author === currentUser.user_id || project.leader_id === currentUser.user_id);

  const handleApply = (e) => {
    if (e) e.stopPropagation();

        if (!currentUser) {
      alert("[AKSES DITOLAK] KAMU HARUS BERGABUNG DENGAN GUILD (LOGIN) UNTUK IKUT PARTY!");
      router.push("/login");
      return;
    }

    if (isOwner) {
      alert("⚠️ KAMU ADALAH KETUA DARI MISI INI!");
      return;
    }

    if (isApplied) return;
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);

      if (typeof window !== "undefined") {
        try {
          const rawApps = localStorage.getItem("quest_applications");
          const apps = rawApps ? JSON.parse(rawApps) : [];
          const newApp = {
            id: `APP-${Date.now()}`,
            project_id: project.project_id,
            project_title: project.title,
            applicant_id: currentUser.user_id,
            applicant_name: currentUser.name,
            applicant_role: currentUser.role,
            author_id: author?.user_id,
            author_name: author?.name,
            applied_at: new Date().toISOString(),
            status: "Pending",
          };
          localStorage.setItem("quest_applications", JSON.stringify([...apps, newApp]));
          window.dispatchEvent(new Event("applications-change"));
        } catch (e) {
          console.error(e);
        }
      }

      if (onApply) {
        onApply(project, author);
      }
    }, 800);
  };

  const closeDetail = useCallback(() => {
    setIsDetailVisible(false);
    window.setTimeout(() => setIsDetailOpen(false), 260);
  }, []);

  useEffect(() => {
    if (isDetailOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => setIsDetailVisible(true));
      return () => {
        document.body.style.overflow = previousOverflow;
        cancelAnimationFrame(raf);
      };
    }
  }, [isDetailOpen]);

  useEffect(() => {
    if (!isDetailOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDetailOpen, closeDetail]);

  const isClosed = project?.status === "Filled";
  const lookingForList = Array.isArray(project?.looking_for) ? project.looking_for : [];

  const rolesRequired = lookingForList.filter((item) => roleNames.includes(item));
  const skillsRequired = lookingForList.filter((item) => !roleNames.includes(item));

  const getEligibility = (category, prj) => {
    if (prj?.eligibility) return prj.eligibility;
    const title = prj?.title?.toLowerCase() || project?.title?.toLowerCase() || "";
    if (prj?.project_id === "PRJ-001" || title.includes("scholarsave")) {
      return lang === "ID"
        ? "Khusus Mahasiswa Aktif Universitas Indonesia (UI) - S1/Vokasi Semua Jurusan"
        : "Restricted to Active Students of Universitas Indonesia (UI) - All Majors";
    }
    const cat = category?.toLowerCase() || "";
    if (cat.includes("gemastik") || cat.includes("invention") || cat.includes("hackathon")) {
      return lang === "ID"
        ? "Terbuka untuk Seluruh Mahasiswa IT / Desain / Bisnis se-Indonesia (Lintas Perguruan Tinggi)"
        : "All IT / Design / Business Students Nationwide (Cross-University Allowed)";
    }
    return lang === "ID"
      ? `Terbatas untuk Mahasiswa Internal Kampus Pembuat (${author?.university || "Universitas Indonesia"})`
      : `Restricted to Internal Students of Author's Guild (${author?.university || "Universitas Indonesia"})`;
  };

  const cardBanner = project?.image || getDefaultBanner(project?.category);

  return (
    <>
      {/* KARTU UTAMA */}
      <div
        onClick={() => setIsDetailOpen(true)}
        className={`bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 flex flex-col justify-between overflow-hidden group transition-all duration-300 cursor-pointer select-none ${project?.isVerified ? "ring-2 ring-amber-400/50" : ""
          } ${isClosed ? "opacity-70" : ""}`}
      >
        <div>
          {/* Banner Atas */}
          <div className="relative h-36 w-full border-b-4 border-retro-black overflow-hidden bg-retro-black">
            <Image
              src={cardBanner}
              alt={project?.title || "Quest"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121b2d] via-transparent to-black/40" />

            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between flex-wrap gap-1.5 z-10">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-pixel text-[8px] px-2 py-0.5 bg-navy-blue text-white border border-retro-black shadow-sm">
                  {project?.category}
                </span>
                                {project?.isVerified && (
                  <span className="font-pixel text-[7px] bg-yellow-400 text-retro-black px-1.5 py-0.5 border border-retro-black font-bold animate-pulse">
                    ★ TERVERIFIKASI
                  </span>
                )}
              </div>

              <span
                className={`font-pixel text-[7px] px-2 py-0.5 border border-retro-black uppercase ${isClosed ? "bg-gray-600 text-gray-200" : "bg-pixel-green text-retro-black font-bold animate-pulse"
                  }`}
              >
                {project?.status === "Open"
                  ? (lang === "ID" ? "● MISI DIBUKA" : "● OPEN QUEST")
                  : (lang === "ID" ? "■ TERISI" : "■ FILLED")}
              </span>
            </div>
          </div>

          {/* Konten Deskripsi */}
          <div className="p-4 flex flex-col gap-3 text-left">
            <h3 className="font-pixel text-xs leading-relaxed text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
              {project?.title}
            </h3>

            <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed">
              {project?.description}
            </p>

            <div className="mt-1">
              <p className="font-pixel text-[8px] text-yellow-400 mb-1.5">
                {lang === "ID" ? "// MENCARI PERAN:" : "// LOOKING FOR:"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {lookingForList.map((skill, index) => {
                  const isRole = roleNames.includes(skill);
                  return (
                    <span
                      key={index}
                      className={`flex items-center gap-1 font-pixel text-[7px] px-2 py-0.5 border ${isRole
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

        {/* Footer Kartu (DENGAN PROTEKSI KETUA TIM) */}
        <div className="p-4 pt-0">
          <div className="border-t border-gray-700/60 pt-3 flex items-center justify-between gap-3">
            {showAuthor && author ? (
              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 bg-retro-black border border-yellow-400 flex items-center justify-center rounded-full shrink-0 overflow-hidden shadow-sm">
                  <PixelAvatar role={author.role} size="w-full h-full" />
                </div>
                <div>
                  <p className="font-pixel text-[8px] text-white leading-tight font-bold">{author.name}</p>
                  <p className="font-sans text-[9px] text-gray-400 leading-none mt-0.5">
                    {author.major} • LV.{calculateUserLevel(author)}
                  </p>
                </div>
              </div>
            ) : (
              <div />
            )}

            {/* PROTEKSI TOMBOL KETUA TIM */}
            {isOwner ? (
              <span className="font-pixel text-[7.5px] bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 px-2.5 py-1 rounded font-bold">
                {lang === "ID" ? "★ KETUA TIM" : "★ YOUR QUEST"}
              </span>
            ) : (
              <PixelButton
                variant={isApplied ? "secondary" : isClosed ? "disabled" : "green"}
                disabled={isClosed || isApplying || isApplied}
                onClick={(e) => handleApply(e)}
                className="py-1 px-3 text-[8px] border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {isApplying
                  ? (lang === "ID" ? "MENGIRIM..." : "SENDING...")
                  : isApplied
                    ? (lang === "ID" ? "TERKIRIM ✓" : "APPLIED ✓")
                    : isClosed
                      ? (lang === "ID" ? "TERISI" : "FILLED")
                      : (lang === "ID" ? "GABUNG TIM" : "JOIN PARTY")}
              </PixelButton>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL MODAL EXPANDED */}
      {isDetailOpen && (
        <div
          className={`fixed inset-0 z-40 bg-[#0b1220] text-white overflow-y-auto pt-24 md:pt-28 transition-opacity duration-300 ease-out ${isDetailVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
            className={`transition-all duration-300 ease-out ${isDetailVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            {/* Top Bar Button */}
            <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-3 flex items-center justify-between">
                            <button
                type="button"
                onClick={closeDetail}
                className="font-pixel text-[9px] text-yellow-300 hover:text-yellow-400 bg-retro-black border-2 border-yellow-400 px-3 py-1.5 cursor-pointer shadow-sm"
              >
                [← KEMBALI KE PAPAN MISI]
              </button>
              <button
                type="button"
                onClick={closeDetail}
                className="font-pixel text-[9px] text-red-400 hover:text-red-300 bg-retro-black border-2 border-red-500 px-3 py-1.5 cursor-pointer shadow-sm"
              >
                [X] TUTUP
              </button>
            </div>

            {/* Hero Detail */}
            <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[560px] border-b-4 border-retro-black overflow-hidden bg-retro-black">
              <Image
                src={cardBanner}
                alt={project?.title || "Quest Detail"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />

              <div className="relative z-10 h-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col justify-center gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-pixel text-[9px] bg-navy-blue text-white px-2.5 py-1 border border-retro-black shadow">
                    {project?.category?.toUpperCase()}
                  </span>
                                    <span
                    className={`font-pixel text-[9px] px-2.5 py-1 border border-retro-black uppercase ${isClosed ? "bg-gray-600 text-white" : "bg-pixel-green text-retro-black font-bold animate-pulse"
                      }`}
                  >
                    {project?.status === "Open" ? "● MISI DIBUKA" : "■ TERISI"}
                  </span>
                </div>

                <h1 className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-yellow-300 drop-shadow-[0_4px_0px_rgba(0,0,0,1)] leading-tight max-w-2xl">
                  {project?.title}
                </h1>

                <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl line-clamp-3">
                  {project?.description}
                </p>

                                <div className="pt-1">
                  {isOwner ? (
                    <span className="font-pixel text-xs bg-yellow-400/20 text-yellow-300 border-2 border-yellow-400 px-6 py-2.5 rounded-lg inline-block font-bold">
                      ★ KAMU ADALAH KETUA MISI INI
                    </span>
                  ) : (
                    <PixelButton
                      variant={isApplied ? "secondary" : isClosed ? "disabled" : "green"}
                      disabled={isClosed || isApplying || isApplied}
                      onClick={(e) => handleApply(e)}
                      className="py-3 px-8 text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {isApplying ? "MENGIRIM..." : isApplied ? "TERKIRIM ✓" : isClosed ? "TERISI" : "GABUNG TIM ▶"}
                    </PixelButton>
                  )}
                </div>
              </div>
            </div>

            {/* Content Detail */}
            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-6 pb-24">
                            <div className="bg-[#121b2d] p-6 border-2 border-retro-black text-left flex flex-col gap-2">
                <span className="font-pixel text-[10px] text-yellow-400">// GAMBARAN MISI:</span>
                <p className="font-sans text-sm text-gray-200 leading-relaxed">{project?.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-[#121b2d] p-6 border-2 border-retro-black flex flex-col gap-3">
                  <span className="font-pixel text-[10px] text-yellow-400 block mb-1">// PERAN YANG DIBUTUHKAN:</span>
                  <div className="flex flex-col gap-2">
                    {rolesRequired.map((role, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#0b1220] p-3 border border-gray-700">
                        <span className="font-pixel text-[9px] text-pixel-green font-bold">+{role?.toUpperCase()}</span>
                        <span className="font-pixel text-[8px] bg-yellow-400 text-retro-black px-2 py-0.5 font-bold">1 SLOT TERSEDIA</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#121b2d] p-6 border-2 border-retro-black flex flex-col justify-between">
                  <div>
                    <span className="font-pixel text-[10px] text-yellow-400 block mb-2">// KRITERIA KELAYAKAN:</span>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">{getEligibility(project?.category, project)}</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="text-left bg-[#121b2d] p-6 border-2 border-retro-black">
                <span className="font-pixel text-[9px] text-gray-400 block mb-3">// TEKNOLOGI YANG DIBUTUHKAN:</span>
                <div className="flex flex-wrap gap-2.5">
                  {skillsRequired.map((tech, i) => (
                    <span key={i} className="flex items-center gap-2 font-pixel text-[9px] bg-[#0b1220] text-white px-3.5 py-2 border border-gray-600">
                      <PixelTechIcon tech={tech} size="w-4 h-4" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}