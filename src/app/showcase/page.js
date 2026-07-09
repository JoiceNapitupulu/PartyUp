"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import usersData from "@/data/users.json";
import projectsData from "@/data/projects.json";

export default function Showcase() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(projectsData[0].title);
  const [invitationStatus, setInvitationStatus] = useState("idle"); // idle, sending, success

  // Flat list of all portfolio items across all users
  const allShowcases = [];
  usersData.forEach((user) => {
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
    <>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-12 flex flex-col gap-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-retro-black pb-6">
          <div>
            <h1 className="font-pixel text-xl text-retro-black mb-2">
              [ADVENTURER SHOWCASE GALLERY]
            </h1>
            <p className="font-sans text-sm text-retro-dark-gray">
              Browse historical quest logs and finished works completed by active guild members. Recruit them for your party.
            </p>
          </div>
          {/* Search bar */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search works, classes, roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Timeline Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShowcases.length > 0 ? (
            filteredShowcases.map((item) => (
              <div
                key={item.id}
                className="bg-white pixel-border pixel-shadow p-6 flex flex-col justify-between gap-6 hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-3">
                  {/* Decorative Banner Tag */}
                  <div className="flex items-center justify-between border-b-2 border-retro-light-gray pb-2">
                    <span className="font-pixel text-[8px] text-navy-blue">
                      ★ HISTORICAL ARCHIVE
                    </span>
                    <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-retro-light-gray text-retro-black pixel-border-sm">
                      {item.role}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="font-pixel text-xs text-retro-black leading-relaxed">
                    {item.project_name}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Developer Profile Info & Recruit Button */}
                <div className="border-t-2 border-retro-light-gray pt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-navy-blue text-white flex items-center justify-center font-pixel text-xs font-bold border border-retro-black">
                      {item.user.name[0]}
                    </div>
                    <div>
                      <p className="font-pixel text-[8px] text-retro-black leading-none mb-1">
                        {item.user.name}
                      </p>
                      <p className="font-sans text-[9px] text-retro-dark-gray leading-none">
                        {item.user.role} • LV.{item.user.skills.length + (item.user.semester || 1)}
                      </p>
                    </div>
                  </div>

                  <PixelButton
                    variant="green"
                    onClick={() => setSelectedUser(item.user)}
                    className="py-1 px-3 text-[9px] border-2"
                  >
                    RECRUIT
                  </PixelButton>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white pixel-border p-12 text-center flex flex-col items-center justify-center gap-4">
              <span className="font-pixel text-xl text-retro-dark-gray">? ? ?</span>
              <p className="font-pixel text-[10px] text-retro-dark-gray">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/50 p-4">
            <div className="bg-retro-bg pixel-border pixel-shadow w-full max-w-sm p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={closeInviteModal}
                className="absolute top-4 right-4 font-pixel text-xs text-retro-black hover:text-red-600 border-none bg-transparent cursor-pointer"
              >
                [X]
              </button>

              <h2 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-gray pb-2">
                [RECRUIT PARTY MEMBER]
              </h2>

              {invitationStatus === "idle" && (
                <form onSubmit={handleSendInvite} className="flex flex-col gap-4">
                  <p className="font-sans text-xs text-retro-black leading-relaxed">
                    Invite <span className="font-bold">{selectedUser.name}</span> (Class:{" "}
                    <span className="text-navy-blue font-bold">{selectedUser.role}</span>) to join one of your active projects.
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-retro-black">SELECT ACTIVE QUEST</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none cursor-pointer"
                    >
                      {projectsData.map((proj) => (
                        <option key={proj.project_id} value={proj.title}>
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
                  <div className="w-8 h-8 bg-retro-gray border-4 border-dashed border-navy-blue animate-spin" />
                  <p className="font-pixel text-[10px] text-retro-black">SENDING QUEST REQUEST...</p>
                </div>
              )}

              {invitationStatus === "success" && (
                <div className="py-4 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 bg-pixel-green border-4 border-retro-black flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-pixel text-[10px] text-retro-black">REQUEST TRANSMITTED!</p>
                    <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">
                      Invitation to join <strong>{selectedProject}</strong> sent to{" "}
                      <strong>{selectedUser.name}</strong>. Wait for their response!
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
    </>
  );
}
