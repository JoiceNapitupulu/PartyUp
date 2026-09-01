"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import ProjectCard from "../../components/ProjectCard";
import PixelAvatar from "../../components/PixelAvatar";
import PixelTechIcon from "../../components/PixelTechIcon";
import PortfolioModal from "../../components/PortfolioModal";
import usersData from "../../data/users.json";
import projectsData from "../../data/projects.json";
import { calculateUserLevel } from "../../utils/auth";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview"); // overview, projects, board, skills
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(usersData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projects, setProjects] = useState(projectsData);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      // 1. Membaca database user ter-update dari Admin
      const storedUsersList = localStorage.getItem("usersList");
      const activeUsersList = storedUsersList ? JSON.parse(storedUsersList) : usersData;
      setAllUsers(activeUsersList);

      const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
      const stored = localStorage.getItem("currentUser");

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const synced = activeUsersList.find((u) => u.user_id === parsed.user_id) || parsed;

          // PROTEKSI AKUN: Jika akun di-ban oleh Admin, paksa log out instan!
          if (synced.isBanned) {
            localStorage.setItem("isLoggedOut", "true");
            localStorage.removeItem("currentUser");
            window.dispatchEvent(new Event("auth-change"));
            alert("[SECURITY] YOUR CHARACTER ACCOUNT HAS BEEN BANNED BY THE GRANDMASTER!");
            window.location.href = "/login";
            return;
          }

          setUser(synced);
          return;
        } catch (e) {
          console.error(e);
        }
      }

      if (isLoggedOut) {
        window.location.href = "/login";
        return;
      } else {
        setUser(activeUsersList[0]);
      }
    };

    loadUser();

    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

  // Dropdown handler untuk menukar profile secara instan
  const handleProfileSwitch = (userId) => {
    const selected = allUsers.find((u) => u.user_id === userId);
    if (selected) {
      if (selected.isBanned) {
        alert("[RESTRICTED] This character account is currently BANNED!");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(selected));
      setUser(selected);
      window.dispatchEvent(new Event("auth-change"));
    }
  };

  useEffect(() => {
    const localProjects = localStorage.getItem("projectsList");
    if (localProjects) {
      try {
        setProjects(JSON.parse(localProjects));
      } catch (e) {
        setProjects(projectsData);
      }
    } else {
      setProjects(projectsData);
      localStorage.setItem("projectsList", JSON.stringify(projectsData));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0c1322] flex items-center justify-center font-pixel text-xs text-yellow-300">
        [LOADING STAT SHEETS...]
      </div>
    );
  }

  // Filter project yang diposting oleh user ini
  const userProjects = projects.filter((p) => p.author === user.user_id);

  // Statistik kelas RPG
  const roleStats = {
    "Product Manager (PM)": { CODE: 10, DESIGN: 60, BUSINESS: 95, CHARISMA: 90 },
    "Project / Scrum Master": { CODE: 20, DESIGN: 30, BUSINESS: 90, CHARISMA: 95 },
    "UI/UX Designer": { CODE: 45, DESIGN: 95, BUSINESS: 40, CHARISMA: 75 },
    "UX Researcher": { CODE: 15, DESIGN: 85, BUSINESS: 60, CHARISMA: 85 },
    "Frontend Developer": { CODE: 85, DESIGN: 75, BUSINESS: 10, CHARISMA: 50 },
    "Backend Developer": { CODE: 95, DESIGN: 10, BUSINESS: 10, CHARISMA: 45 },
    "Full-stack Developer": { CODE: 90, DESIGN: 50, BUSINESS: 30, CHARISMA: 55 },
    "Mobile App Developer": { CODE: 85, DESIGN: 50, BUSINESS: 20, CHARISMA: 50 },
    "QA (Quality Assurance) Engineer": { CODE: 75, DESIGN: 20, BUSINESS: 30, CHARISMA: 60 },
    "DevOps Engineer": { CODE: 90, DESIGN: 10, BUSINESS: 20, CHARISMA: 50 },
    Admin: { CODE: 99, DESIGN: 99, BUSINESS: 99, CHARISMA: 99 },
  };

  const activeStats = roleStats[user.role] || { CODE: 50, DESIGN: 50, BUSINESS: 50, CHARISMA: 50 };

  const tabs = [
    { id: "overview", name: "OVERVIEW" },
    { id: "projects", name: "FINISHED LOGS" },
    { id: "board", name: "ACTIVE QUESTS" },
    { id: "skills", name: "SKILLS & INVENTORY" },
  ];

  return (
    <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16 flex flex-col gap-8">

        {/* Top Control Header: Dropdown & Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-gray-700 pb-6">
          <div>
            <h1 className="font-pixel text-xl text-yellow-300 mb-2">
              [GUILD MEMBER SHEET]
            </h1>
            <p className="font-sans text-sm text-gray-300">
              Inspect student stats, active quests, and completed historical achievements.
            </p>
          </div>

          {/* Profile Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] text-yellow-400">// SWITCH PROFILE:</span>
            <div className="relative">
              <select
                value={user.user_id}
                onChange={(e) => handleProfileSwitch(e.target.value)}
                className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none appearance-none pr-8 cursor-pointer"
              >
                {allUsers.map((u) => (
                  <option key={u.user_id} value={u.user_id} className="bg-[#1c2a4a] text-white">
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Profile Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Kolom Kiri: Detail Profile Card */}
          <div className="lg:col-span-4 bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-6 items-center text-center">

            {/* Avatar block RPG Manusia Piksel Dinamis */}
            <div className="w-28 h-28 bg-retro-black border-4 border-yellow-400 flex items-center justify-center relative shadow-lg">
              <PixelAvatar role={user.role} size="w-24 h-24" />
              <div className="absolute -bottom-2.5 right-1 bg-pixel-green text-retro-black font-pixel text-[8px] px-2 py-0.5 border border-retro-black shadow-md font-bold">
                LV.{calculateUserLevel(user)}
              </div>
            </div>

            {/* User Details */}
            <div className="flex flex-col gap-1.5 w-full text-center">
              <h2 className="font-pixel text-base text-white font-bold">{user.name}</h2>
              <span className="font-pixel text-[8px] px-2.5 py-1 bg-navy-blue text-white border border-yellow-400 mx-auto w-fit font-bold">
                CLASS: {user.role?.toUpperCase()}
              </span>
              <p className="font-sans text-xs text-yellow-300 mt-2 font-semibold">
                {user.university}
              </p>
              <p className="font-sans text-xs text-gray-400 leading-none">
                {user.major} • Semester {user.semester || 4}
              </p>
            </div>

            {/* Bio */}
            <div className="w-full border-t border-gray-700/60 pt-4 text-left">
              <span className="font-pixel text-[8px] text-yellow-400 block mb-2">// GUILD ALIAS BIO</span>
              <p className="font-sans text-xs text-gray-300 leading-relaxed italic bg-[#18233a] p-3 border border-gray-700">
                "{user.bio || "No bio written yet."}"
              </p>
            </div>

            {/* Quick Actions */}
            <div className="w-full border-t border-gray-700/60 pt-4 flex flex-col gap-2">
              <span className="font-pixel text-[8px] text-yellow-400 block text-left mb-1">// GUILD ACTIONS</span>

              {isEditMode ? (
                <div className="p-3 border-2 border-dashed border-pixel-green bg-[#18233a] text-left font-sans text-xs text-pixel-green leading-tight">
                  [SYSTEM] Creative path active. Post a team quest on the board to level up!
                </div>
              ) : (
                <PixelButton
                  variant="green"
                  className="w-full py-2 text-[9px] border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => setIsEditMode(true)}
                >
                  ACTIVATE CREATIVE PATH
                </PixelButton>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Dynamic Sub-Navigation Tabs & Views */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Sub-Navigation Tabs */}
            <div className="flex border-4 border-retro-black bg-[#131f37] p-1.5 gap-2 flex-wrap rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-pixel text-[9px] px-4 py-2 border-2 cursor-pointer transition-all select-none ${isActive
                      ? "bg-navy-blue text-white border-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-transparent text-gray-300 border-transparent hover:border-gray-600 hover:text-white"
                      }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels Container */}
            <div className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 min-h-[380px]">

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6 text-left">
                  <h3 className="font-pixel text-xs text-yellow-300 border-b border-gray-700 pb-2 mb-1">
                    [CLASS ATTRIBUTES &amp; STATISTICS]
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stat Items */}
                    <div className="flex flex-col gap-4">
                      {Object.entries(activeStats).map(([stat, val]) => (
                        <div key={stat} className="flex flex-col gap-1">
                          <div className="flex justify-between font-pixel text-[8px] text-gray-200">
                            <span>{stat}</span>
                            <span className="text-yellow-400 font-bold">{val}/100</span>
                          </div>
                          <div className="h-4 bg-[#18233a] border-2 border-retro-black p-0.5">
                            <div
                              className="h-full bg-pixel-green border border-black transition-all duration-300"
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Class Passive Detail */}
                    <div className="bg-[#18233a] border-2 border-dashed border-gray-600 p-4 flex flex-col gap-3 justify-center">
                      <span className="font-pixel text-[8px] text-yellow-400">// CLASS PASSIVES</span>
                      <div className="flex flex-col gap-2 font-sans text-xs text-gray-300 leading-normal">
                        <p>
                          <strong className="text-pixel-green">✓ Synergizer:</strong> Increases party matching success rate by +15% when matching with other classes.
                        </p>
                        <p>
                          <strong className="text-pixel-green">✓ Digital Learning Badge:</strong> Earned by completing 1+ community hackathon quests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Projects */}
              {activeTab === "projects" && (
                <div className="flex flex-col gap-4 text-left">
                  <h3 className="font-pixel text-xs text-yellow-300 border-b border-gray-700 pb-2 mb-1">
                    [PORTFOLIO &amp; FINISHED WORK LOGS]
                  </h3>

                  {user.portfolio && user.portfolio.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.portfolio.map((p, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedPortfolio(p)}
                          className="bg-[#18233a] border-2 border-retro-black p-4 flex flex-col gap-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 hover:-translate-y-1 transition-all cursor-pointer group text-left relative"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-pixel text-[8px] text-pixel-green bg-[#121b2d] border border-pixel-green/40 px-2 py-0.5 w-fit font-bold rounded">
                              {p.role}
                            </span>
                            <span className="font-pixel text-[7.5px] text-yellow-300 group-hover:text-yellow-400 font-bold">
                              ★ VIEW CASE STUDY ➔
                            </span>
                          </div>
                          <h4 className="font-pixel text-[11px] text-white mt-1 font-bold group-hover:text-yellow-300 transition-colors">
                            {p.project_name}
                          </h4>
                          <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                          <div className="mt-2 pt-2 border-t border-gray-700/60 flex items-center justify-between">
                            <span className="font-pixel text-[7.5px] text-gray-400">STATUS: PRODUCTION READY</span>
                            <span className="font-pixel text-[7.5px] text-pixel-green">FIGMA PROTOTYPE READY ↗</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                      <span className="font-pixel text-xs text-gray-400">NO HISTORICAL WORK</span>
                      <p className="font-sans text-xs text-gray-400 max-w-xs">
                        Create custom completed items to build up your adventurer profile rating.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Project Board */}
              {activeTab === "board" && (
                <div className="flex flex-col gap-4 text-left">
                  <h3 className="font-pixel text-xs text-yellow-300 border-b border-gray-700 pb-2 mb-1">
                    [YOUR ACTIVE DISPATCHED QUESTS]
                  </h3>

                  {userProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userProjects.map((project) => (
                        <ProjectCard
                          key={project.project_id}
                          project={project}
                          showAuthor={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                      <span className="font-pixel text-xs text-gray-400">NO ACTIVE QUESTS DETECTED</span>
                      <p className="font-sans text-xs text-gray-400 max-w-xs leading-normal">
                        You have not posted any active teammate quests looking for party members yet.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Skills dengan Ikon Tech Stack Animasi (PixelTechIcon) */}
              {activeTab === "skills" && (
                <div className="flex flex-col gap-4 text-left">
                  <h3 className="font-pixel text-xs text-yellow-300 border-b border-gray-700 pb-2 mb-1">
                    [SKILL INVENTORY BADGES]
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {(user.skills || []).map((skill, index) => (
                      <div
                        key={index}
                        className="bg-[#18233a] border-2 border-retro-black p-3.5 flex flex-col gap-2 min-w-[130px] items-center justify-center text-center shadow-md hover:border-yellow-400 transition-colors"
                      >
                        {/* Ikon Tech Stack Animasi Presisi */}
                        <div className="w-10 h-10 rounded-full bg-[#121b2d] border border-gray-600 flex items-center justify-center">
                          <PixelTechIcon tech={skill} size="w-6 h-6" />
                        </div>
                        <span className="font-pixel text-[8px] text-white font-bold">{skill}</span>
                        <span className="font-pixel text-[7px] text-pixel-green font-bold">MASTERED</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {selectedPortfolio && (
        <PortfolioModal
          project={selectedPortfolio}
          user={user}
          onClose={() => setSelectedPortfolio(null)}
        />
      )}

      <Footer />
    </div>
  );
}