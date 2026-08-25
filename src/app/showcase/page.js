"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import PixelAvatar from "../../components/PixelAvatar";
import usersData from "../../data/users.json";
import projectsData from "../../data/projects.json";
import { calculateUserLevel, getStoredUsers, getStoredProjects } from "../../utils/auth";

export default function Showcase() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);
  const [projects, setProjects] = useState(projectsData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(projectsData[0]?.title || "");
  const [invitationStatus, setInvitationStatus] = useState("idle");

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

  // Flat list of all portfolio items across all users
  const allShowcases = [];
  users.forEach((user) => {
    if (user.portfolio) {
      user.portfolio.forEach((p) => {
        allShowcases.push({
          id: `${user.user_id}-${p.project_name.toLowerCase().replace(/\s+/g, "-")}`,
          project_name: p.project_name,
          description: p.description,
          role: p.role,
          user: user,
        });
      });
    }
  });

  // Filter showcases
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

      <section
        className="relative w-full min-h-[400px] md:min-h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-24 md:pt-28"
        style={{ backgroundImage: "url('/bg4.gif')" }} // Bisa diganti ke /showcase-bg.gif atau /bg3.gif
      >
        {/* Layer Overlay Dark Vignette untuk transisi sangat halus */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/80 via-black/50 to-[#0c1322] pointer-events-none z-0" />

        {/* Konten Hero Banner di Tengah — Proporsi Sama Persis Seperti Board */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center justify-center gap-4">
          <span className="font-pixel text-[9px] md:text-[11px] text-yellow-300 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            ✦ HISTORICAL ARCHIVES ✦
          </span>

          <h1 className="font-pixel text-3xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
            [ ADVENTURER SHOWCASE GALLERY ]
          </h1>

          <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Browse historical quest logs and finished works completed by active guild members. Recruit them for your party!
          </p>

          {/* Search Bar di Dalam Banner */}
          <div className="w-full max-w-md pt-2">
            <input
              type="text"
              placeholder="Search works, classes, roles, or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-sans text-xs p-3 bg-[#1c2a4a]/90 text-white border-2 border-yellow-400 focus:outline-none placeholder-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-8 pb-16 flex flex-col gap-8">

        {/* Informasi Ringkas */}
        <section className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 bg-[#0f1b30] border-l-4 border-yellow-400 px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-pixel text-[9px] text-yellow-400 whitespace-nowrap">// RECRUITMENT HUB</span>
          <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
            Every showcase below represents verified past projects from student members. Click <strong className="text-yellow-300 font-bold">RECRUIT</strong> on any creator card to invite them directly to your party!
          </p>
        </section>

        {/* Timeline Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShowcases.length > 0 ? (
            filteredShowcases.map((item) => (
              <div
                key={item.id}
                className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 p-6 flex flex-col justify-between gap-6 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex flex-col gap-3 text-left">
                  {/* Decorative Banner Tag */}
                  <div className="flex items-center justify-between border-b-2 border-gray-700/60 pb-2">
                    <span className="font-pixel text-[8px] text-yellow-400">
                      ★ HISTORICAL ARCHIVE
                    </span>
                    <span className="font-pixel text-[8px] px-2 py-0.5 bg-[#1e2d42] text-pixel-green border border-pixel-green/40 font-bold">
                      {item.role}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="font-pixel text-xs text-white leading-relaxed font-bold">
                    {item.project_name}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Developer Profile Info & Recruit Button */}
                <div className="border-t-2 border-gray-700/60 pt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-left">
                    <div className="w-8 h-8 bg-retro-black border border-yellow-400 flex items-center justify-center rounded-full shrink-0 overflow-hidden shadow-sm">
                      <PixelAvatar role={item.user.role} size="w-full h-full" />
                    </div>
                    <div>
                      <p className="font-pixel text-[8px] text-white leading-none mb-1 font-bold">
                        {item.user.name}
                      </p>
                      <p className="font-sans text-[9px] text-gray-400 leading-none">
                        {item.user.role} • LV.{calculateUserLevel(item.user)}
                      </p>
                    </div>
                  </div>

                  <PixelButton
                    variant="green"
                    onClick={() => setSelectedUser(item.user)}
                    className="py-1 px-3 text-[9px] border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    RECRUIT
                  </PixelButton>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#131f37] border-4 border-retro-black p-12 text-center flex flex-col items-center justify-center gap-4">
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

        {/* Modal: Invite Developer */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/80 p-4 backdrop-blur-sm">
            <div className="bg-[#121b2d] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white w-full max-w-sm p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150">
              <button
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
                      className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none cursor-pointer"
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
                  <div className="w-10 h-10 bg-pixel-green text-retro-black border-4 border-retro-black flex items-center justify-center text-xl font-bold">
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