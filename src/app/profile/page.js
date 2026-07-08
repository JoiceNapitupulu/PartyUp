"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import ProjectCard from "@/components/ProjectCard";
import usersData from "@/data/users.json";
import projectsData from "@/data/projects.json";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview"); // overview, projects, board, skills
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(usersData);

  useEffect(() => {
    // Load currentUser from localStorage or default to USR-001 (Joice)
    const loadUser = () => {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Sync with possibly updated users list
          const synced = usersData.find((u) => u.user_id === parsed.user_id) || parsed;
          setUser(synced);
          return;
        } catch (e) {
          console.error(e);
        }
      }
      setUser(usersData[0]);
    };

    loadUser();

    window.addEventListener("auth-change", loadUser);
    return () => window.removeEventListener("auth-change", loadUser);
  }, []);

  // Dropdown handler to swap current user profile
  const handleProfileSwitch = (userId) => {
    const selected = usersData.find((u) => u.user_id === userId);
    if (selected) {
      localStorage.setItem("currentUser", JSON.stringify(selected));
      setUser(selected);
      window.dispatchEvent(new Event("auth-change"));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-retro-bg flex items-center justify-center font-pixel text-xs text-retro-black">
        [LOADING STAT SHEETS...]
      </div>
    );
  }

  // Filter projects authored by this user
  const userProjects = projectsData.filter((p) => p.author === user.user_id);

  // Stats mapped for roles
  const roleStats = {
    Hacker: { CODE: 95, DESIGN: 30, BUSINESS: 10, CHARISMA: 50 },
    Hipster: { CODE: 40, DESIGN: 95, BUSINESS: 40, CHARISMA: 75 },
    Hustler: { CODE: 10, DESIGN: 40, BUSINESS: 95, CHARISMA: 90 },
  };

  const activeStats = roleStats[user.role] || { CODE: 50, DESIGN: 50, BUSINESS: 50, CHARISMA: 50 };

  const tabs = [
    { id: "overview", name: "OVERVIEW" },
    { id: "projects", name: "PROJECTS" },
    { id: "board", name: "PROJECT BOARD" },
    { id: "skills", name: "SKILLS & INVENTORY" },
  ];

  return (
    <>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 py-10 flex flex-col gap-8">
        
        {/* Top Control Header: Dropdown & Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-retro-black pb-6">
          <div>
            <h1 className="font-pixel text-xl text-retro-black mb-2">
              [GUILD MEMBER SHEET]
            </h1>
            <p className="font-sans text-sm text-retro-dark-gray">
              Inspect student stats, active quests, and completed historical achievements.
            </p>
          </div>

          {/* Profile Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] text-navy-blue">SWITCH PROFILE:</span>
            <div className="relative">
              <select
                value={user.user_id}
                onChange={(e) => handleProfileSwitch(e.target.value)}
                className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none appearance-none pr-8 cursor-pointer"
              >
                {allUsers.map((u) => (
                  <option key={u.user_id} value={u.user_id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-retro-black">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Detail Profile Card */}
          <div className="lg:col-span-4 bg-white pixel-border pixel-shadow p-6 flex flex-col gap-6 items-center text-center">
            
            {/* Avatar block */}
            <div className="w-24 h-24 bg-retro-gray border-4 border-retro-black flex items-center justify-center font-pixel text-4xl text-navy-blue font-bold shadow-inner relative">
              {user.name[0]}
              <div className="absolute -bottom-2 right-2 bg-pixel-green text-retro-black font-pixel text-[8px] px-1.5 py-0.5 pixel-border-sm">
                LV.{user.skills.length + (user.semester || 1)}
              </div>
            </div>

            {/* User Details */}
            <div className="flex flex-col gap-1 w-full">
              <h2 className="font-pixel text-base text-retro-black">{user.name}</h2>
              <span className="font-pixel text-[9px] px-2 py-0.5 bg-navy-blue text-white pixel-border-sm mx-auto w-fit">
                CLASS: {user.role.toUpperCase()}
              </span>
              <p className="font-sans text-xs text-retro-dark-gray mt-2 font-semibold">
                {user.university}
              </p>
              <p className="font-sans text-xs text-retro-dark-gray leading-none">
                {user.major} • Semester {user.semester || 4}
              </p>
            </div>

            {/* Bio */}
            <div className="w-full border-t-2 border-retro-light-gray pt-4 text-left">
              <span className="font-pixel text-[8px] text-navy-blue block mb-2">GUILD ALIAS BIO</span>
              <p className="font-sans text-xs text-retro-dark-gray leading-relaxed italic">
                "{user.bio}"
              </p>
            </div>

            {/* Quick Actions */}
            <div className="w-full border-t-2 border-retro-light-gray pt-4 flex flex-col gap-2">
              <span className="font-pixel text-[8px] text-navy-blue block text-left mb-1">GUILD ACTIONS</span>
              <PixelButton variant="green" className="w-full py-1.5 text-[9px] border-2" onClick={() => alert("Ready to set up your team! Create a project in the Quest Board tab.")}>
                EDIT CREATIVE PATH
              </PixelButton>
            </div>
          </div>

          {/* Right Column: Dynamic Sub-Navigation Tabs & Views */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Sub-Navigation Tabs */}
            <div className="flex border-b-4 border-retro-black bg-retro-light-gray pixel-border p-1 gap-2 flex-wrap">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-pixel text-[9px] px-3.5 py-2 border-2 cursor-pointer transition-all select-none ${
                      isActive
                        ? "bg-retro-black text-white border-retro-black translate-x-[1px] translate-y-[1px]"
                        : "bg-transparent text-retro-black border-transparent hover:border-retro-black hover:bg-white"
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="bg-white pixel-border pixel-shadow p-6 min-h-[350px]">
              
              {/* Tab 1: Overview (Base statistics bars) */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  <h3 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-2">
                    [CLASS ATTRIBUTES & STATISTICS]
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stat items */}
                    <div className="flex flex-col gap-4">
                      {Object.entries(activeStats).map(([stat, val]) => (
                        <div key={stat} className="flex flex-col gap-1">
                          <div className="flex justify-between font-pixel text-[8px] text-retro-black">
                            <span>{stat}</span>
                            <span>{val}/100</span>
                          </div>
                          <div className="h-4 bg-retro-light-gray border-2 border-retro-black p-0.5">
                            <div
                              className="h-full bg-pixel-green border border-black"
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Class passive detail */}
                    <div className="bg-retro-light-gray border-4 border-dashed border-retro-gray p-4 flex flex-col gap-3 justify-center">
                      <span className="font-pixel text-[8px] text-navy-blue">CLASS PASSIVES</span>
                      <div className="flex flex-col gap-2 font-sans text-xs text-retro-dark-gray leading-normal">
                        <p>
                          <strong>✓ Synergizer:</strong> Increases party matching success rate by +15% when matching with other classes.
                        </p>
                        <p>
                          <strong>✓ Digital Learning Badge:</strong> Earned by completing 1+ community hackathon quests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Projects (Portfolio completed list) */}
              {activeTab === "projects" && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-2">
                    [PORTFOLIO & FINISHED WORK LOGS]
                  </h3>

                  {user.portfolio && user.portfolio.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.portfolio.map((p, index) => (
                        <div key={index} className="bg-retro-light-gray pixel-border p-4 flex flex-col gap-2">
                          <span className="font-pixel text-[8px] text-navy-blue bg-white border border-retro-black px-1.5 py-0.5 w-fit">
                            {p.role}
                          </span>
                          <h4 className="font-pixel text-[10px] text-retro-black mt-1">
                            {p.project_name}
                          </h4>
                          <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                      <span className="font-pixel text-xs text-retro-dark-gray">NO HISTORICAL WORK</span>
                      <p className="font-sans text-xs text-retro-dark-gray max-w-xs">
                        Create custom completed items to build up your adventurer profile rating.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Project Board (Dispatched active quests) */}
              {activeTab === "board" && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-2">
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
                      <span className="font-pixel text-xs text-retro-dark-gray">NO ACTIVE QUESTS DETECTED</span>
                      <p className="font-sans text-xs text-retro-dark-gray max-w-xs leading-normal">
                        You have not posted any active teammate quests looking for party members yet.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Skills (Skill matrix checklist) */}
              {activeTab === "skills" && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-2">
                    [SKILL INVENTORY BADGES]
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {user.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-retro-light-gray pixel-border p-3 flex flex-col gap-2 min-w-[120px] items-center justify-center text-center"
                      >
                        {/* Shield icon placeholder */}
                        <div className="w-8 h-8 rounded-full bg-navy-blue text-white flex items-center justify-center font-bold font-pixel text-[10px]">
                          {skill[0]}
                        </div>
                        <span className="font-pixel text-[8px] text-retro-black">{skill}</span>
                        <span className="font-pixel text-[7px] text-pixel-green-dark">MASTERED</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
