"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Ditambahkan untuk proteksi redirect
import usersData from "@/data/users.json";
import PixelButton from "./PixelButton";
import PixelTechIcon from "./PixelTechIcon";

export default function ProjectCard({ project, showAuthor = true, onApply }) {
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false); // State untuk kontrol pop-up detail
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Membaca status login secara aman di client-side
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    }
  }, []);

  // Find author details
  const author = usersData.find((u) => u.user_id === project.author);

  const handleApply = (e) => {
    if (e) e.stopPropagation(); // Mencegah terpicunya klik pembuka modal pada kartu utama

    // PROTEKSI: Jika belum login, paksa masuk halaman login
    if (!currentUser) {
      alert("[RESTRICTED] YOU MUST JOIN THE GUILD (LOG IN) TO APPLY FOR PARTIES!");
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

  return (
    <>
      {/* 1. KARTU UTAMA (Bisa diklik untuk melihat detail) */}
      <div
        onClick={() => setIsDetailOpen(true)}
        className={`bg-white pixel-border pixel-shadow p-5 flex flex-col justify-between gap-4 transition-transform hover:-translate-y-1 cursor-pointer select-none ${isClosed ? "opacity-75" : ""
          }`}
      >
        <div>
          {/* Category Header */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <span className="font-pixel text-[9px] px-2 py-1 bg-navy-blue text-white pixel-border-sm">
              {project.category}
            </span>
            <span
              className={`font-pixel text-[8px] px-2 py-1 pixel-border-sm uppercase ${isClosed
                  ? "bg-retro-gray text-retro-dark-gray"
                  : "bg-pixel-green text-retro-black animate-pulse"
                }`}
            >
              {project.status === "Open" ? "● OPEN QUEST" : "■ FILLED"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-pixel text-xs leading-relaxed text-retro-black mb-2 line-clamp-2 text-left">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-xs text-retro-dark-gray line-clamp-3 mb-4 leading-relaxed text-left">
            {project.description}
          </p>

          {/* Requirements */}
          <div className="mb-4 text-left">
            <p className="font-pixel text-[8px] text-navy-blue mb-2">LOOKING FOR:</p>
            <div className="flex flex-wrap gap-1.5">
              {project.looking_for.map((skill, index) => {
                const isRole = ["Hacker", "Hipster", "Hustler"].includes(skill);
                return (
                  <span
                    key={index}
                    className={`flex items-center gap-1.5 font-pixel text-[8px] px-2 py-1 pixel-border-sm ${isRole
                        ? "bg-pixel-green text-retro-black font-bold"
                        : "bg-retro-light-gray text-retro-black"
                      }`}
                  >
                    {/* Render logo animasi 8-bit jika bukan kartu role kelas */}
                    {!isRole && <PixelTechIcon tech={skill} size="w-3.5 h-3.5" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Author & Actions */}
        <div className="border-t-2 border-retro-light-gray pt-4 flex items-center justify-between gap-4">
          {showAuthor && author ? (
            <div className="flex items-center gap-2 text-left">
              <div className="w-7 h-7 bg-retro-light-gray border-2 border-retro-black flex items-center justify-center font-pixel text-[10px] text-navy-blue font-bold">
                {author.name[0]}
              </div>
              <div>
                <p className="font-pixel text-[8px] text-retro-black">{author.name}</p>
                <p className="font-sans text-[9px] text-retro-dark-gray leading-none mt-0.5">
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
            className="py-1 px-3 text-[9px] border-2"
          >
            {isApplying ? "SENDING..." : isApplied ? "APPLIED ✓" : isClosed ? "FILLED" : "JOIN PARTY"}
          </PixelButton>
        </div>
      </div>

      {/* 2. POP-UP DETAIL QUEST (MODAL 8-BIT INTERAKTIF) */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/60 p-4 backdrop-blur-sm">
          <div className="bg-retro-bg pixel-border pixel-shadow w-full max-w-lg p-6 flex flex-col gap-5 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Tombol Tutup [X] */}
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 right-4 font-pixel text-xs text-red-500 hover:text-red-600 border-none bg-transparent cursor-pointer"
            >
              [X]
            </button>

            <h2 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-gray pb-2 text-left">
              [QUEST DETAILS SHEET]
            </h2>

            {/* Informasi Utama */}
            <div className="space-y-4 text-left">
              <div>
                <span className="font-pixel text-[8px] bg-navy-blue text-white px-2 py-0.5 border border-retro-black">
                  {project.category}
                </span>
                <h3 className="font-pixel text-sm text-retro-black mt-2 leading-snug">{project.title}</h3>
              </div>

              {/* Deskripsi Proyek */}
              <div className="bg-white p-3 border-2 border-retro-black">
                <span className="font-pixel text-[8px] text-navy-blue block mb-1">// PROJECT OVERVIEW:</span>
                <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">{project.description}</p>
              </div>

              {/* Atribut Creator Role & Collabs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 border-2 border-retro-black">
                  <span className="font-pixel text-[8px] text-navy-blue block mb-1.5">// AUTHOR ROLE:</span>
                  <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2 py-0.5 border border-retro-black font-bold">
                    {author?.role?.toUpperCase() || "HACKER"}
                  </span>
                </div>
                <div className="bg-white p-3 border-2 border-retro-black">
                  <span className="font-pixel text-[8px] text-navy-blue block mb-1">// PARTY COLLABS:</span>
                  <p className="font-sans text-xs text-retro-dark-gray">
                    {project.looking_for?.length > 2 ? "✓ Multi-Class Party (Ramean)" : "✓ Solo Quest (Sendiri)"}
                  </p>
                </div>
              </div>

              {/* Requirement Tags */}
              <div>
                <span className="font-pixel text-[8px] text-retro-dark-gray block mb-1.5">LOOKING FOR SKILLS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.looking_for.map((item, i) => (
                    <span key={i} className="font-pixel text-[8px] bg-retro-light-gray text-retro-black px-2 py-1 border border-retro-black">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tombol Tautan Live Demo / Code */}
            <div className="flex justify-between items-center border-t-2 border-retro-light-gray pt-4">
              <div className="flex gap-4">
                <a href="https://github.com/prabogo/prabogo" target="_blank" rel="noreferrer" className="font-pixel text-[8px] text-navy-blue hover:text-navy-light hover:underline">
                  [SOURCE_CODE]
                </a>
                <a href="https://prabogo.com/" target="_blank" rel="noreferrer" className="font-pixel text-[8px] text-green-700 hover:text-green-600 hover:underline">
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