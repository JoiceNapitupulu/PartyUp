"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function Board() {
  // 2. Perapian: Mengelompokkan seluruh deklarasi state di bagian paling atas
  const [projects, setProjects] = useState(projectsData);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [user, setUser] = useState(null); // State user aktif

  // Create Quest Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("GEMASTIK 2026");
  const [newDescription, setNewDescription] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [newClass, setNewClass] = useState("Hacker");

  // Jalankan efek sinkronisasi data lokal saat halaman dibuka
  useEffect(() => {
    // 1. Membaca database misi ter-update dari Admin (localStorage)
    const localProjects = localStorage.getItem("projectsList");
    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      setProjects(projectsData);
      localStorage.setItem("projectsList", JSON.stringify(projectsData));
    }

    // 2. Membaca siapa user yang sedang aktif login untuk pengirim misi (author)
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
      author: user ? user.user_id : "USR-001", // Menggunakan ID user yang sedang login aktif secara dinamis!
      description: newDescription,
      created_at: new Date().toISOString(),
    };

    const updatedProjects = [newQuest, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem("projectsList", JSON.stringify(updatedProjects)); // Sinkronisasikan ke database lokal
    setIsModalOpen(false);

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewSkills("");
    setNewClass("Hacker");
  };

  const categories = ["ALL", "GEMASTIK", "INVENTION", "College Project", "HackFest"];
  const classes = ["ALL", "Hacker", "Hipster", "Hustler"];

  return (
    <>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12 flex flex-col gap-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-retro-black pb-6">
          <div>
            <h1 className="font-pixel text-xl text-retro-black mb-2">
              [GUILD QUEST BOARD]
            </h1>
            <p className="font-sans text-sm text-retro-dark-gray">
              Filter through active party quests or dispatch your own request to find comrades.
            </p>
          </div>
          <PixelButton variant="green" onClick={() => setIsModalOpen(true)}>
            + DISPATCH QUEST
          </PixelButton>
        </div>

        {/* Filter Toolbar */}
        <section className="bg-retro-light-gray pixel-border p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-1/3 flex flex-col gap-1.5">
            <label className="font-pixel text-[8px] text-navy-blue">SEARCH KEYWORDS</label>
            <input
              type="text"
              placeholder="e.g. Next.js, Figma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
            />
          </div>

          {/* Class Filter */}
          <div className="w-full md:w-1/4 flex flex-col gap-1.5">
            <label className="font-pixel text-[8px] text-navy-blue">REQUIRED CLASS</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none appearance-none cursor-pointer"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls === "ALL" ? "All Classes" : cls.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-retro-black">
                ▼
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-1/4 flex flex-col gap-1.5">
            <label className="font-pixel text-[8px] text-navy-blue">QUEST TYPE</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "ALL" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-retro-black">
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
            <div className="col-span-full bg-white pixel-border p-12 text-center flex flex-col items-center justify-center gap-4">
              <span className="font-pixel text-xl text-retro-dark-gray">? ? ?</span>
              <p className="font-pixel text-[10px] text-retro-dark-gray">
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

        {/* Modal: Dispatch Quest */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-black/50 p-4">
            <div className="bg-retro-bg pixel-border pixel-shadow w-full max-w-lg p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 font-pixel text-xs text-retro-black hover:text-red-600 border-none bg-transparent cursor-pointer"
              >
                [X]
              </button>

              <h2 className="font-pixel text-xs text-navy-blue border-b-2 border-retro-gray pb-2">
                [DISPATCH NEW QUEST]
              </h2>

              <form onSubmit={handleCreateQuest} className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-pixel text-[8px] text-retro-black">QUEST TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ScholarSave Budgeting App"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
                  />
                </div>

                {/* Category & Class */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-retro-black">CATEGORY</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none cursor-pointer"
                    >
                      <option value="GEMASTIK 2026">GEMASTIK 2026</option>
                      <option value="INVENTION 2026">INVENTION 2026</option>
                      <option value="College Project">College Project</option>
                      <option value="HackFest 2026">HackFest 2026</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-pixel text-[8px] text-retro-black">REQUIRED CLASS</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none cursor-pointer"
                    >
                      <option value="Hacker">Hacker (Dev)</option>
                      <option value="Hipster">Hipster (Designer)</option>
                      <option value="Hustler">Hustler (Biz/PM)</option>
                    </select>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-pixel text-[8px] text-retro-black">
                    TECH STACK / SKILLS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js, Figma, Go"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-pixel text-[8px] text-retro-black">QUEST DESCRIPTION</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the scope, goals, and who you want to team up with..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none resize-none"
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
    </>
  );
}