"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("Universitas Indonesia");
  const [major, setMajor] = useState("Informatics");
  const [selectedRole, setSelectedRole] = useState("Hacker");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a character name!");
      return;
    }

    try {
      const skillsArray = skills
        ? skills.split(",").map((s) => s.trim())
        : ["Next.js", "Figma"];

      // Formulate new mock user
      const newUser = {
        user_id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim(),
        semester: 3,
        university,
        major,
        role: selectedRole,
        skills: skillsArray,
        bio: bio || `Ready for adventure. Seeking party members for next level coding.`,
        portfolio: [],
      };

      localStorage.setItem("currentUser", JSON.stringify(newUser));
      // Trigger header update
      window.dispatchEvent(new Event("auth-change"));
      window.location.href = "/profile";
    } catch (err) {
      console.error("Registration failed:", err);
      // Direct redirect fallback
      window.location.href = "/profile";
    }
  };

  const roles = [
    {
      name: "Hacker",
      desc: "Software developer, backend architect, or algorithms expert. Translates ideas into code.",
      stats: { Code: 95, Design: 30, Business: 10 },
      color: "border-green-500 text-green-700 bg-green-50",
    },
    {
      name: "Hipster",
      desc: "UI/UX designer, brand expert, or frontend visualist. Creates pixel-perfect experiences.",
      stats: { Code: 40, Design: 95, Business: 40 },
      color: "border-blue-500 text-blue-700 bg-blue-50",
    },
    {
      name: "Hustler",
      desc: "Product manager, business analyst, or presenter. Pitches the team's vision.",
      stats: { Code: 10, Design: 40, Business: 95 },
      color: "border-yellow-500 text-yellow-700 bg-yellow-50",
    },
  ];

  return (
    <>
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 md:px-12 py-10 flex flex-col gap-8">
        <div className="text-center border-b-4 border-retro-black pb-6">
          <h1 className="font-pixel text-xl text-retro-black mb-2">
            [CHARACTER CREATION SCREEN]
          </h1>
          <p className="font-sans text-sm text-retro-dark-gray">
            Join the Guild. Customize your student credentials, choose your class, and prepare to party up.
          </p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 bg-white pixel-border pixel-shadow p-6 flex flex-col gap-5">
            <h2 className="font-pixel text-[10px] text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-2">
              CHARACTER DETAILS
            </h2>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-pixel text-[8px] text-retro-black">ADVENTURER NAME</label>
              <input
                type="text"
                required
                placeholder="Enter character name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
              />
            </div>

            {/* University & Prodi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-pixel text-[8px] text-retro-black">GUILD (UNIVERSITY)</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none cursor-pointer"
                >
                  <option value="Universitas Indonesia">Universitas Indonesia</option>
                  <option value="Institut Teknologi Bandung">ITB</option>
                  <option value="Universitas Gadjah Mada">UGM</option>
                  <option value="Binus University">Binus University</option>
                  <option value="Universitas Airlangga">Universitas Airlangga</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-pixel text-[8px] text-retro-black">PRODI (MAJOR)</label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none cursor-pointer"
                >
                  <option value="Informatics">Informatics</option>
                  <option value="Information Systems">Information Systems</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Management">Business Management</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1.5">
              <label className="font-pixel text-[8px] text-retro-black">
                SKILL INVENTORY (COMMA SEPARATED)
              </label>
              <input
                type="text"
                placeholder="e.g. Next.js, Figma, Go, Python"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="font-pixel text-[8px] text-retro-black">CHARACTER BIO</label>
              <textarea
                rows={3}
                placeholder="Introduce yourself to potential party leaders..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Right Column: Class Selection & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Class Cards list */}
            <div className="bg-white pixel-border pixel-shadow p-6 flex flex-col gap-4">
              <h2 className="font-pixel text-[10px] text-navy-blue border-b-2 border-retro-light-gray pb-2 mb-1">
                SELECT RPG CLASS
              </h2>

              <div className="flex flex-col gap-3">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.name;
                  return (
                    <div
                      key={role.name}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedRole(role.name);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedRole(role.name);
                        }
                      }}
                      className={`text-left p-3.5 border-4 cursor-pointer select-none transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? "border-retro-black bg-retro-light-gray translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          : "border-transparent bg-white hover:border-retro-light-gray hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-pixel text-xs text-retro-black">{role.name.toUpperCase()}</span>
                        {isSelected && (
                          <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-1.5 py-0.5 border border-retro-black">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[11px] text-retro-dark-gray leading-tight">
                        {role.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stat Viewer Panel */}
            <div className="bg-retro-black text-white pixel-border pixel-shadow-navy p-6 flex flex-col gap-4">
              <h2 className="font-pixel text-[9px] text-pixel-green border-b border-pixel-green/30 pb-2 mb-1">
                CLASS BASE STATISTICS
              </h2>

              <div className="flex flex-col gap-3">
                {roles
                  .find((r) => r.name === selectedRole)
                  ?.stats &&
                  Object.entries(
                    roles.find((r) => r.name === selectedRole).stats
                  ).map(([stat, val]) => (
                    <div key={stat} className="flex flex-col gap-1">
                      <div className="flex justify-between font-pixel text-[8px]">
                        <span>{stat.toUpperCase()}</span>
                        <span>{val}/100</span>
                      </div>
                      {/* Pixel Progress Bar */}
                      <div className="h-4 bg-[#111] border border-retro-dark-gray p-0.5">
                        <div
                          className="h-full bg-pixel-green border border-black transition-all duration-300"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <button
                type="submit"
                className="mt-2 font-pixel text-[11px] py-3.5 px-4 bg-pixel-green border-4 border-white text-retro-black font-bold select-none cursor-pointer hover:bg-pixel-green-dark active:translate-x-[2px] active:translate-y-[2px] transition-all text-center"
              >
                SPAWN CHARACTER
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
