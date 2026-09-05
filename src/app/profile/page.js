"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { useLanguage } from "../../utils/lang";

const INITIAL_PARTY_INVITATIONS = [
  {
    id: "inv-init-1",
    sender_id: "USR-001",
    sender_name: "Joice",
    receiver_id: "USR-002",
    receiver_name: "Alex",
    project_title: "ScholarSave - Financial Planner",
    proposed_role: "Frontend Developer",
    note: "We need your React & full-stack expertise to build the frontend dashboard for ScholarSave!",
    created_at: "2026-08-25T10:00:00.000Z",
    status: "Pending",
  },
  {
    id: "inv-init-2",
    sender_id: "USR-003",
    sender_name: "Sarah",
    receiver_id: "USR-001",
    receiver_name: "Joice",
    project_title: "EduQuest - Gamified Flashcards",
    proposed_role: "UI/UX Designer",
    note: "Your retro design system on Figma is amazing! Would love to have you design EduQuest.",
    created_at: "2026-08-26T14:30:00.000Z",
    status: "Pending",
  },
];

export default function Profile() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview"); // overview, projects, board, skills, invites
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(usersData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projects, setProjects] = useState(projectsData);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  // States untuk Party Invitations & Quest Applications
  const [invitations, setInvitations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [invitationFilter, setInvitationFilter] = useState("incoming"); // incoming | outgoing | applications

  const loadInvitationsAndApps = () => {
    if (typeof window !== "undefined") {
      try {
        const rawInvites = localStorage.getItem("party_invitations");
        let parsedInvites = rawInvites ? JSON.parse(rawInvites) : null;
        if (!parsedInvites || parsedInvites.length === 0) {
          parsedInvites = INITIAL_PARTY_INVITATIONS;
          localStorage.setItem("party_invitations", JSON.stringify(INITIAL_PARTY_INVITATIONS));
        }
        setInvitations(parsedInvites);

        const rawApps = localStorage.getItem("quest_applications");
        setApplications(rawApps ? JSON.parse(rawApps) : []);
      } catch (e) {
        console.error(e);
      }
    }
  };

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

      // Tidak ada sesi aktif → redirect ke halaman login
      window.location.href = "/login";
    };

    loadUser();
    loadInvitationsAndApps();

    window.addEventListener("auth-change", loadUser);
    window.addEventListener("invitations-change", loadInvitationsAndApps);
    window.addEventListener("applications-change", loadInvitationsAndApps);

    return () => {
      window.removeEventListener("auth-change", loadUser);
      window.removeEventListener("invitations-change", loadInvitationsAndApps);
      window.removeEventListener("applications-change", loadInvitationsAndApps);
    };
  }, []);



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

  // Handler Accept Recruitment Invite
  const handleAcceptInvite = (inviteId) => {
    if (!user) return;
    const updated = invitations.map((inv) => {
      if (inv.id === inviteId) {
        return { ...inv, status: "Accepted" };
      }
      return inv;
    });
    setInvitations(updated);
    localStorage.setItem("party_invitations", JSON.stringify(updated));

    // Beri EXP / Level Up Reward untuk user
    const updatedUser = {
      ...user,
      semester: (user.semester || 4) + 1,
    };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsersList = allUsers.map((u) => (u.user_id === updatedUser.user_id ? updatedUser : u));
    setAllUsers(updatedUsersList);
    localStorage.setItem("usersList", JSON.stringify(updatedUsersList));

    window.dispatchEvent(new Event("auth-change"));
    window.dispatchEvent(new Event("invitations-change"));
    alert("🎉 PARTY FORMED! You accepted the quest invitation. Level increased!");
  };

  // Handler Decline Recruitment Invite
  const handleDeclineInvite = (inviteId) => {
    const updated = invitations.map((inv) => {
      if (inv.id === inviteId) {
        return { ...inv, status: "Declined" };
      }
      return inv;
    });
    setInvitations(updated);
    localStorage.setItem("party_invitations", JSON.stringify(updated));
    window.dispatchEvent(new Event("invitations-change"));
  };

  // Handler Cancel Sent Invite
  const handleCancelInvite = (inviteId) => {
    const updated = invitations.filter((inv) => inv.id !== inviteId);
    setInvitations(updated);
    localStorage.setItem("party_invitations", JSON.stringify(updated));
    window.dispatchEvent(new Event("invitations-change"));
  };

  // Handler Approve Quest Application
  const handleApproveApplication = (appId) => {
    const updated = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, status: "Approved" };
      }
      return app;
    });
    setApplications(updated);
    localStorage.setItem("quest_applications", JSON.stringify(updated));
    window.dispatchEvent(new Event("applications-change"));
    alert("✓ APPLICANT RECRUITED INTO YOUR PARTY!");
  };

  // Handler Reject Quest Application
  const handleRejectApplication = (appId) => {
    const updated = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, status: "Rejected" };
      }
      return app;
    });
    setApplications(updated);
    localStorage.setItem("quest_applications", JSON.stringify(updated));
    window.dispatchEvent(new Event("applications-change"));
  };

  // Normalisasi seluruh invitation untuk kompatibilitas nama field
  const normalizedInvitations = useMemo(() => {
    return invitations.map((inv) => {
      const sId = inv.sender_id || inv.from_user_id || "USR-001";
      const rId = inv.receiver_id || inv.to_user_id || "";
      const sName = inv.sender_name || inv.from_user || "Guild Leader";
      const rName = inv.receiver_name || inv.to_user || "Adventurer";
      const rawStatus = (inv.status || "Pending").toLowerCase();
      const normStatus = rawStatus === "accepted" ? "Accepted" : rawStatus === "declined" ? "Declined" : "Pending";

      return {
        ...inv,
        sender_id: sId,
        sender_name: sName,
        receiver_id: rId,
        receiver_name: rName,
        proposed_role: inv.proposed_role || inv.assigned_role || "Core Contributor",
        project_title: inv.project_title || "Active Quest",
        note: inv.note || "",
        status: normStatus,
      };
    });
  }, [invitations]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0c1322] flex items-center justify-center font-pixel text-xs text-yellow-300">
        [LOADING STAT SHEETS...]
      </div>
    );
  }

  // Filter project yang diposting oleh user ini
  const userProjects = projects.filter((p) => p.author === user.user_id);

  // Filter invitations untuk user ini
  const myIncomingInvites = normalizedInvitations.filter((i) => i.receiver_id === user.user_id);
  const myPendingIncoming = myIncomingInvites.filter((i) => i.status === "Pending");
  const myOutgoingInvites = normalizedInvitations.filter((i) => i.sender_id === user.user_id);
  const incomingApplications = applications.filter((a) => a.author_id === user.user_id);

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
    { id: "overview", name: t("overviewTab") },
    { id: "projects", name: t("projectsTab") },
    { id: "board", name: t("boardTab") },
    { id: "skills", name: t("skillsTab") },
    {
      id: "invites",
      name: (
        <span className="flex items-center gap-1.5">
          {t("invitesTab") || "PARTY INVITES"}
          {myPendingIncoming.length > 0 && (
            <span className="bg-red-500 text-white font-pixel text-[7px] px-1.5 py-0.2 rounded-full animate-pulse">
              {myPendingIncoming.length}
            </span>
          )}
        </span>
      ),
    },
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

          {/* Status Badge: ID User yang sedang login */}
          <div className="flex items-center gap-2.5 bg-[#121b2d] border-2 border-retro-black px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="w-2.5 h-2.5 rounded-full bg-pixel-green animate-pulse inline-block" />
            <div className="flex flex-col text-left">
              <span className="font-pixel text-[7.5px] text-pixel-green font-bold">STATUS: ONLINE</span>
              <span className="font-sans text-[10px] text-gray-300">
                ID: <strong className="text-white font-mono">{user.user_id}</strong>
              </span>
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

              {/* Tab 5: Party Invites & Recruitment Management */}
              {activeTab === "invites" && (
                <div className="flex flex-col gap-5 text-left">
                  <div className="flex items-center justify-between border-b border-gray-700 pb-3 flex-wrap gap-2">
                    <h3 className="font-pixel text-xs text-yellow-300">
                      [PARTY RECRUITMENT &amp; SQUAD LOGS]
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInvitationFilter("incoming")}
                        className={`font-pixel text-[8px] px-3 py-1 border transition-all cursor-pointer rounded ${invitationFilter === "incoming"
                            ? "bg-pixel-green text-retro-black border-retro-black font-bold"
                            : "bg-[#18233a] text-gray-300 border-gray-600 hover:text-white"
                          }`}
                      >
                        📥 INCOMING ({myIncomingInvites.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvitationFilter("outgoing")}
                        className={`font-pixel text-[8px] px-3 py-1 border transition-all cursor-pointer rounded ${invitationFilter === "outgoing"
                            ? "bg-yellow-400 text-retro-black border-retro-black font-bold"
                            : "bg-[#18233a] text-gray-300 border-gray-600 hover:text-white"
                          }`}
                      >
                        📤 SENT ({myOutgoingInvites.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvitationFilter("applications")}
                        className={`font-pixel text-[8px] px-3 py-1 border transition-all cursor-pointer rounded ${invitationFilter === "applications"
                            ? "bg-sky-400 text-retro-black border-retro-black font-bold"
                            : "bg-[#18233a] text-gray-300 border-gray-600 hover:text-white"
                          }`}
                      >
                        ⚔️ APPLICANTS ({incomingApplications.length})
                      </button>
                    </div>
                  </div>

                  {/* VIEW 1: INCOMING INVITATIONS */}
                  {invitationFilter === "incoming" && (
                    <div className="flex flex-col gap-3">
                      {myIncomingInvites.length > 0 ? (
                        myIncomingInvites.map((inv) => {
                          const sender = allUsers.find((u) => u.user_id === inv.sender_id);
                          return (
                            <div
                              key={inv.id}
                              className="bg-[#18233a] border-2 border-retro-black p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-retro-black border border-yellow-400 rounded-full overflow-hidden shrink-0 mt-0.5">
                                  <PixelAvatar role={sender?.role || "Member"} size="w-full h-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-pixel text-[9px] text-yellow-300 font-bold">
                                      {inv.sender_name}
                                    </span>
                                    <span className="font-sans text-[10px] text-gray-300">
                                      recruited you for:
                                    </span>
                                    <span className="font-pixel text-[8.5px] bg-[#121b2d] text-pixel-green px-2 py-0.5 border border-pixel-green/40 rounded font-bold">
                                      {inv.project_title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <span>Proposed Role: <strong className="text-white">{inv.proposed_role}</strong></span>
                                    <span>•</span>
                                    <span className="italic text-gray-400">"{inv.note || "No message provided."}"</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {inv.status === "Pending" ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleAcceptInvite(inv.id)}
                                      className="font-pixel text-[8px] py-1.5 px-3 bg-pixel-green text-retro-black font-bold border border-retro-black hover:bg-emerald-400 cursor-pointer rounded shadow-sm"
                                    >
                                      ACCEPT ✓
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeclineInvite(inv.id)}
                                      className="font-pixel text-[8px] py-1.5 px-3 bg-red-600 text-white font-bold border border-retro-black hover:bg-red-500 cursor-pointer rounded shadow-sm"
                                    >
                                      DECLINE ✗
                                    </button>
                                  </>
                                ) : (
                                  <span
                                    className={`font-pixel text-[7.5px] px-2.5 py-1 rounded border font-bold ${inv.status === "Accepted"
                                        ? "bg-pixel-green/20 text-pixel-green border-pixel-green"
                                        : "bg-red-500/20 text-red-400 border-red-500"
                                      }`}
                                  >
                                    STATUS: {inv.status?.toUpperCase()}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📭</span>
                          <p className="font-pixel text-xs text-gray-400">NO INCOMING PARTY INVITATIONS</p>
                          <p className="font-sans text-xs text-gray-400 max-w-sm">
                            Showcase your portfolio in Finished Logs to get invited by other quest leaders!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* VIEW 2: SENT OUTGOING INVITATIONS */}
                  {invitationFilter === "outgoing" && (
                    <div className="flex flex-col gap-3">
                      {myOutgoingInvites.length > 0 ? (
                        myOutgoingInvites.map((inv) => {
                          const receiver = allUsers.find((u) => u.user_id === inv.receiver_id);
                          return (
                            <div
                              key={inv.id}
                              className="bg-[#18233a] border-2 border-retro-black p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-retro-black border border-yellow-400 rounded-full overflow-hidden shrink-0 mt-0.5">
                                  <PixelAvatar role={receiver?.role || "Member"} size="w-full h-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-sans text-[10px] text-gray-300">You invited:</span>
                                    <span className="font-pixel text-[9px] text-yellow-300 font-bold">
                                      {inv.receiver_name}
                                    </span>
                                    <span className="font-sans text-[10px] text-gray-300">to join</span>
                                    <span className="font-pixel text-[8.5px] bg-[#121b2d] text-pixel-green px-2 py-0.5 border border-pixel-green/40 rounded font-bold">
                                      {inv.project_title}
                                    </span>
                                  </div>
                                  <p className="font-sans text-xs text-gray-400">
                                    Assigned Role: <strong className="text-gray-200">{inv.proposed_role}</strong>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`font-pixel text-[7.5px] px-2.5 py-1 rounded border font-bold ${inv.status === "Accepted"
                                      ? "bg-pixel-green/20 text-pixel-green border-pixel-green"
                                      : inv.status === "Declined"
                                        ? "bg-red-500/20 text-red-400 border-red-500"
                                        : "bg-yellow-400/20 text-yellow-300 border-yellow-400 animate-pulse"
                                    }`}
                                >
                                  {inv.status === "Pending" ? "PENDING RESPONSE ⏳" : `STATUS: ${inv.status?.toUpperCase()}`}
                                </span>
                                {inv.status === "Pending" && (
                                  <button
                                    type="button"
                                    onClick={() => handleCancelInvite(inv.id)}
                                    className="font-pixel text-[7.5px] py-1 px-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 border border-retro-black cursor-pointer rounded"
                                  >
                                    CANCEL
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">⚔️</span>
                          <p className="font-pixel text-xs text-gray-400">NO SENT INVITATIONS</p>
                          <p className="font-sans text-xs text-gray-400 max-w-sm">
                            Head over to Finished Logs (Showcase) to scout talented students and recruit them into your active quests.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* VIEW 3: INCOMING QUEST APPLICATIONS */}
                  {invitationFilter === "applications" && (
                    <div className="flex flex-col gap-3">
                      {incomingApplications.length > 0 ? (
                        incomingApplications.map((app) => (
                          <div
                            key={app.id}
                            className="bg-[#18233a] border-2 border-retro-black p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-retro-black border border-yellow-400 rounded-full overflow-hidden shrink-0 mt-0.5">
                                <PixelAvatar role={app.applicant_role || "Member"} size="w-full h-full" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-pixel text-[9px] text-white font-bold">
                                    {app.applicant_name}
                                  </span>
                                  <span className="font-sans text-[10px] text-gray-300">applied to join:</span>
                                  <span className="font-pixel text-[8.5px] bg-[#121b2d] text-yellow-300 px-2 py-0.5 border border-yellow-400/40 rounded font-bold">
                                    {app.project_title}
                                  </span>
                                </div>
                                <p className="font-sans text-xs text-gray-400">
                                  Applicant Class: <strong className="text-pixel-green">{app.applicant_role}</strong>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {app.status === "Pending" ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleApproveApplication(app.id)}
                                    className="font-pixel text-[8px] py-1.5 px-3 bg-pixel-green text-retro-black font-bold border border-retro-black hover:bg-emerald-400 cursor-pointer rounded shadow-sm"
                                  >
                                    APPROVE ✓
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRejectApplication(app.id)}
                                    className="font-pixel text-[8px] py-1.5 px-3 bg-red-600 text-white font-bold border border-retro-black hover:bg-red-500 cursor-pointer rounded shadow-sm"
                                  >
                                    REJECT ✗
                                  </button>
                                </>
                              ) : (
                                <span
                                  className={`font-pixel text-[7.5px] px-2.5 py-1 rounded border font-bold ${app.status === "Approved"
                                      ? "bg-pixel-green/20 text-pixel-green border-pixel-green"
                                      : "bg-red-500/20 text-red-400 border-red-500"
                                    }`}
                                >
                                  STATUS: {app.status?.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">🛡️</span>
                          <p className="font-pixel text-xs text-gray-400">NO PENDING APPLICANTS</p>
                          <p className="font-sans text-xs text-gray-400 max-w-sm">
                            When other adventurers click "JOIN PARTY" on your quest board cards, their requests will appear here.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
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