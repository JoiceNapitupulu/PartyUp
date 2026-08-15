"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import ProjectCard from "../../components/ProjectCard";
import projectsData from "../../data/projects.json";

export default function Board() {
  const router = useRouter();
  const [projects, setProjects] = useState(projectsData);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [user, setUser] = useState(null);

  // Create Quest Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("GEMASTIK 2026");
  const [newDescription, setNewDescription] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [newClass, setNewClass] = useState("Frontend Developer");

  // Jalankan efek sinkronisasi data lokal
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

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.looking_for.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesClass =
      selectedClass === "ALL" || project.looking_for.includes(selectedClass);

    const matchesCategory =
      selectedCategory === "ALL" || project.category.includes(selectedCategory);

    return matchesSearch && matchesClass && matchesCategory;
  });

  const handleCreateQuest = (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      alert("Please fill out all fields!");
      return;
    }

    const skillsArray = newSkills
      ? newSkills.split(",").map((s) => s.trim())
      : [];

    const newQuest = {
      project_id: `PRJ-00${projects.length + 1}`,
      title: newTitle,
      category: newCategory,
      looking_for: [...skillsArray, newClass],
      status: "Open",
      author: user ? user.user_id : "USR-001",
      description: newDescription,
      created_at: new Date().toISOString(),
    };

    const updatedProjects = [newQuest, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem("projectsList", JSON.stringify(updatedProjects));
    setIsModalOpen(false);

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewSkills("");
    setNewClass("Frontend Developer");
  };

  const categories = ["ALL", "GEMASTIK", "INVENTION", "College Project", "HackFest"];
  const classes = [
    "ALL",
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

  const handleDispatchClick = () => {
    if (!user) {
      alert("[RESTRICTED] YOU MUST LOG IN TO THE GUILD TO DISPATCH QUESTS!");
      router.push("/login");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <Header />

      <section
        className="relative w-full min-h-[380px] md:min-h-[460px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-24 md:pt-28"
        style={{ backgroundImage: "url('/bg3.gif')" }}
      >
        {/* Layer Overlay Dark Vignette untuk transisi sangat halus ke background gelap */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/80 via-black/50 to-[#0c1322] pointer-events-none z-0" />

        {/* Konten Hero Banner di Tengah — Teks Proporsional & Rapi */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center justify-center gap-4">
          <span className="font-pixel text-[9px] md:text-[11px] text-yellow-300 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            ✦ ADVENTURER GUILD BOARD ✦
          </span>

          <h1 className="font-pixel text-3xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
            [ GUILD QUEST BOARD ]
          </h1>

          <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Filter through active party quests or dispatch your own request to find comrades for <strong className="text-yellow-300 font-bold">GEMASTIK &amp; INVENTION 2026</strong>.
          </p>

          <div className="pt-2">
            <PixelButton
              variant="green"
              onClick={handleDispatchClick}
              className="py-3 px-8 text-xs md:text-sm shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              + DISPATCH QUEST
            </PixelButton>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-8 pb-16 flex flex-col gap-8">

        {/* Penjelasan singkat setelah banner */}
        <section className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 bg-[#0f1b30] border-l-4 border-yellow-400 px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-pixel text-[9px] text-yellow-400 whitespace-nowrap">// ABOUT THIS BOARD</span>
          <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
            This is the guild's open quest log — every card below is a real project from a fellow IT student looking for party members. Search by skill, filter by class or competition track, then join a quest or dispatch your own to start recruiting comrades.
          </p>
        </section>

        {/* Filter Toolbar Section Gelap */}
        <section className="bg-[#131f37] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-1/3 flex flex-col gap-1.5">
            <label className="font-pixel text-[8px] text-yellow-400">// SEARCH KEYWORDS</label>
            <input
              type="text"
              placeholder="e.g. Next.js, Figma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Class Filter */}
          <div className="w-full md:w-1/4 flex flex-col gap-1.5">
            <label className="font-pixel text-[8px] text-yellow-400">// REQUIRED CLASS</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none appearance-none cursor-pointer"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls} className="bg-[#1c2a4a] text-white">
                    {cls === "ALL" ? "All Classes" : cls.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-400">
                ▼
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-1/4 flex flex-col gap-1.5">
            <label className="font-pixel text-[8px] text-yellow-400">// QUEST TYPE</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#1c2a4a] text-white">
                    {cat === "ALL" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-400">
                ▼
              </div>
            </div>
          </div>
        </section>

        {/* Quests Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))
          ) : (
            <div className="col-span-full bg-[#131f37] border-4 border-retro-black p-12 text-center flex flex-col items-center justify-center gap-4">
              <span className="font-pixel text-xl text-yellow-400">? ? ?</span>
              <p className="font-pixel text-[10px] text-gray-300">
                NO ACTIVE QUESTS MATCH YOUR FILTERS.
              </p>
              <PixelButton
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setSelectedClass("ALL");
                  setSelectedCategory("ALL");
                }}
              >
                RESET FILTERS
              </PixelButton>
            </div>
          )}
        </section>

        {/* Modal Pop-Up: Dispatch Quest Gelap */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/80 p-4 backdrop-blur-sm">
            <div className="bg-[#121b2d] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white w-full max-w-lg p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 font-pixel text-xs text-red-400 hover:text-red-500 border-none bg-transparent cursor-pointer"
              >
                [X]
              </button>

              <h2 className="font-pixel text-xs text-yellow-400 border-b-2 border-gray-700 pb-2">
                [DISPATCH NEW QUEST]
              </h2>

              <form onSubmit={handleCreateQuest} className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-pixel text-[8px] text-yellow-400">QUEST TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ScholarSave Budgeting App"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none placeholder-gray-400"
                  />
                </div>

                {/* Category & Class */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-yellow-400">CATEGORY</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none cursor-pointer"
                    >
                      <option value="GEMASTIK 2026" className="bg-[#1c2a4a]">GEMASTIK 2026</option>
                      <option value="INVENTION 2026" className="bg-[#1c2a4a]">INVENTION 2026</option>
                      <option value="College Project" className="bg-[#1c2a4a]">College Project</option>
                      <option value="HackFest 2026" className="bg-[#1c2a4a]">HackFest 2026</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-yellow-400">REQUIRED CLASS</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none cursor-pointer"
                    >
                      <option value="Product Manager (PM)" className="bg-[#1c2a4a]">Product Manager (PM)</option>
                      <option value="Project / Scrum Master" className="bg-[#1c2a4a]">Project / Scrum Master</option>
                      <option value="UI/UX Designer" className="bg-[#1c2a4a]">UI/UX Designer</option>
                      <option value="UX Researcher" className="bg-[#1c2a4a]">UX Researcher</option>
                      <option value="Frontend Developer" className="bg-[#1c2a4a]">Frontend Developer</option>
                      <option value="Backend Developer" className="bg-[#1c2a4a]">Backend Developer</option>
                      <option value="Full-stack Developer" className="bg-[#1c2a4a]">Full-stack Developer</option>
                      <option value="Mobile App Developer" className="bg-[#1c2a4a]">Mobile App Developer</option>
                      <option value="QA (Quality Assurance) Engineer" className="bg-[#1c2a4a]">QA (Quality Assurance) Engineer</option>
                      <option value="DevOps Engineer" className="bg-[#1c2a4a]">DevOps Engineer</option>
                    </select>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-pixel text-[8px] text-yellow-400">
                    TECH STACK / SKILLS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js, Figma, Go"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none placeholder-gray-400"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-pixel text-[8px] text-yellow-400">QUEST DESCRIPTION</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the scope, goals, and who you want to team up with..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none resize-none placeholder-gray-400"
                  />
                </div>

                {/* Submit buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <PixelButton
                    variant="secondary"
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    CANCEL
                  </PixelButton>
                  <PixelButton variant="green" type="submit">
                    DISPATCH QUEST
                  </PixelButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}