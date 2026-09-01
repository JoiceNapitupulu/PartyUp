"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PixelButton from "./PixelButton";
import PixelTechIcon from "./PixelTechIcon";
import PixelAvatar from "./PixelAvatar";

export default function PortfolioModal({ project, user, onClose, onRecruit }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, problem_solution, business, branding, prototype

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  const isSora = project.project_name?.toLowerCase().includes("sora");
  const figmaLink = project.figma_link || "https://www.figma.com/proto/9YcaCf0sZvmT2HfLinBQIp/Sora-kelompok-10?node-id=893-2&t=eplPbHhDeGCm985G-1";

  // Data detail khusus Sora (berdasarkan dokumen case study Figma)
  const soraData = {
    title: "Sora (Samosir E-Boat)",
    subtitle: "Digitalizing Lake Toba's Water Transportation",
    tagline: "\"Your Freedom, On the Water\"",
    description:
      "Sora (Samosir E-Boat) is a mobile application platform designed to provide tourists with a seamless, practical, and transparent way to book and pay for water transportation in the Samosir region of Lake Toba. Inspired by the \"sounds\" of nature—waves, wind, and the laughter of adventurers—Sora acts as a digital bridge between travelers and local boat operators.",
    overviewSummary:
      "The Samosir E-Boat application is a versatile mobile solution that transforms the traditional boat-hailing process into a modern digital experience. It aims to empower tourists to plan their trips with price certainty while helping local boat associations manage their schedules and revenue more efficiently.",
    deliverables: [
      { label: "UI Components", value: "30+" },
      { label: "Development Timeline", value: "8 Weeks" },
      { label: "Mobile Screens", value: "40+" },
      { label: "Quality Score", value: "98/100 (S-RANK)" }
    ],
    problems: [
      {
        num: "01",
        title: "Manual & Inefficient Booking",
        desc: "Tourists must physically visit docks and wait in long lines without knowing if a boat is available."
      },
      {
        num: "02",
        title: "Lack of Price Transparency",
        desc: "Hard to compare prices between different operators, leading to potential price uncertainty or \"tourist traps\"."
      },
      {
        num: "03",
        title: "Cash-Only Dependency",
        desc: "Relying on physical cash is inconvenient for modern travelers and prone to calculation errors or fraud."
      },
      {
        num: "04",
        title: "Information Scarcity",
        desc: "No real-time data regarding boat capacity, current location, or estimated arrival times."
      }
    ],
    solutions: [
      {
        num: "01",
        title: "Seamless Mobile Booking",
        desc: "A dedicated platform to book various types of watercraft (Jetski, Banana Boat, Speed Boat) anytime, anywhere."
      },
      {
        num: "02",
        title: "Integrated Digital Payments",
        desc: "Secure, cashless transactions via QRIS and major E-wallets like OVO, Dana, and GoPay."
      },
      {
        num: "03",
        title: "Real-time GPS Tracking",
        desc: "Allows users to monitor the boat's live location and status, reducing frustration and wait times."
      },
      {
        num: "04",
        title: "Transparent Price & Capacity",
        desc: "Real-time updates on available seats and dynamic pricing based on market conditions."
      },
      {
        num: "05",
        title: "Multi-language Accessibility",
        desc: "Support for both Indonesian and English to accommodate international tourists."
      }
    ],
    businessStrategy: [
      {
        num: "01",
        title: "Commission Model",
        desc: "A 15% service fee from every successful transaction, ensuring a win-win partnership with local boat owners."
      },
      {
        num: "02",
        title: "Dynamic Pricing",
        desc: "Intelligent price fluctuations based on peak seasons, weather conditions, and real-time demand to maximize revenue."
      },
      {
        num: "03",
        title: "Customer Loyalty",
        desc: "A tiered membership system (Basic to Platinum) that rewards frequent users with booking discounts and priority support."
      }
    ],
    branding: [
      {
        num: "01",
        title: "The Name",
        desc: "\"Sora\" represents a \"call to adventure\" and honors the rhythmic sounds of Lake Toba."
      },
      {
        num: "02",
        title: "The Logo",
        desc: "A unique Logotype/Wordmark that incorporates traditional Batak script, blending modern exploration with deep-rooted cultural heritage."
      },
      {
        num: "03",
        title: "Tagline",
        desc: "\"Your Freedom On The Water\" — describing the feeling of liberty and ease that customers experience through the service."
      }
    ],
    styleGuide: {
      colors: [
        { name: "Deep Navy", hex: "#0C2D6B" },
        { name: "Ocean Blue", hex: "#2980B9" },
        { name: "Light Sky", hex: "#E1F0FA" },
        { name: "Neutral Slate", hex: "#E5EBF1" }
      ],
      typography: "Arial (Navbar & Buttons 11px), Tagline (24px Melodrame / 8px Helvetica Rounded)",
      components: "Minimalist clean input fields, stateful action buttons (Inactive, Default, Hover, Active)"
    },
    techStack: ["Figma", "UI/UX", "Prototyping", "Design System", "User Research"]
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0c1322] border-4 border-retro-black rounded-2xl w-full max-w-3xl h-[90vh] max-h-[760px] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative text-white overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* A. TITLE BAR RETRO WINDOW */}
        <div className="bg-[#18233a] border-b-4 border-retro-black px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-3 h-3 bg-red-500 border border-retro-black rounded-full inline-block shrink-0" />
            <span className="w-3 h-3 bg-yellow-400 border border-retro-black rounded-full inline-block shrink-0" />
            <span className="w-3 h-3 bg-green-500 border border-retro-black rounded-full inline-block shrink-0" />
            <span className="font-pixel text-[9px] md:text-[10px] text-yellow-300 ml-2 tracking-wider truncate">
              // CASE STUDY: {project.project_name?.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-pixel text-[9px] text-red-400 hover:text-white bg-[#0c1322] hover:bg-red-600 border-2 border-retro-black px-3 py-1 cursor-pointer rounded transition-colors shrink-0"
          >
            ✕ CLOSE [ESC]
          </button>
        </div>

        {/* B. HERO BANNER */}
        <div className="relative h-36 md:h-44 w-full border-b-4 border-retro-black bg-[#10192c] shrink-0 overflow-hidden">
          <Image
            src={project.image || "/computer.png"}
            alt={project.project_name}
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-[#0c1322]/60 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[8px] bg-pixel-green text-retro-black px-2.5 py-0.5 border border-retro-black font-bold rounded">
                {project.role || "UI/UX Designer"}
              </span>
              <span className="font-pixel text-[8px] bg-yellow-400 text-retro-black px-2.5 py-0.5 border border-retro-black font-bold rounded">
                ★ S-RANK
              </span>
            </div>
            <a
              href={figmaLink}
              target="_blank"
              rel="noreferrer"
              className="font-pixel text-[8px] bg-[#1a2b4c] hover:bg-yellow-400 hover:text-retro-black text-yellow-300 px-3 py-1 border-2 border-retro-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>🎨 FIGMA PROTOTYPE</span>
              <span>↗</span>
            </a>
          </div>

          {/* Title & Tagline in Banner */}
          <div className="absolute bottom-3 left-4 right-4 z-10 text-left">
            <h1 className="font-pixel text-lg md:text-xl text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              {isSora ? soraData.title : project.project_name}
            </h1>
            <p className="font-sans text-xs text-gray-200 italic mt-0.5">
              {isSora ? soraData.subtitle : project.description}
            </p>
          </div>
        </div>

        {/* C. NAVIGATION TABS */}
        {isSora && (
          <div className="bg-[#121c30] border-b-2 border-retro-black px-4 py-2 flex flex-wrap gap-2 shrink-0">
            {[
              { id: "overview", label: "OVERVIEW" },
              { id: "problem_solution", label: "PROBLEMS & SOLUTIONS" },
              { id: "business", label: "BUSINESS STRATEGY" },
              { id: "branding", label: "BRANDING & STYLE" },
              { id: "prototype", label: "PROTOTYPE ↗" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`font-pixel text-[8.5px] px-3 py-1.5 rounded-lg border-2 border-retro-black cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-retro-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-[#1a2744] text-gray-300 hover:bg-[#25375c]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* D. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-6 text-left overscroll-contain">

          {/* TAB 1: OVERVIEW */}
          {(!isSora || activeTab === "overview") && (
            <div className="flex flex-col gap-5">
              {/* Executive Summary */}
              <div className="bg-[#141e33] p-4 border-2 border-retro-black rounded-xl shadow-sm">
                <span className="font-pixel text-[8.5px] text-yellow-400 block mb-2">// EXECUTIVE SUMMARY & CONCEPT</span>
                <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed">
                  {isSora ? soraData.description : project.description}
                </p>
              </div>

              {/* Deliverable Metrics (Grid) */}
              {isSora && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {soraData.deliverables.map((item, idx) => (
                    <div key={idx} className="bg-[#182540] p-3 border-2 border-retro-black rounded-xl">
                      <p className="font-pixel text-[7.5px] text-gray-400">{item.label.toUpperCase()}</p>
                      <p className="font-pixel text-xs text-pixel-green mt-1 font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Project Overview */}
              {isSora && (
                <div className="bg-[#141e33] p-4 border-2 border-retro-black rounded-xl">
                  <span className="font-pixel text-[8.5px] text-yellow-400 block mb-2">// PROJECT OVERVIEW & SCOPE</span>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed">
                    {soraData.overviewSummary}
                  </p>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div>
                <span className="font-pixel text-[8px] text-gray-400 block mb-2 uppercase">// APPLIED DESIGN & TECH STACK:</span>
                <div className="flex flex-wrap gap-2">
                  {(isSora ? soraData.techStack : (project.tech_stack || ["Figma", "UI/UX", "Prototyping"])).map((tech, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 font-pixel text-[8px] bg-[#1c2c4d] text-gray-200 px-3 py-1.5 border border-gray-600 rounded-lg"
                    >
                      <PixelTechIcon tech={tech} size="w-3.5 h-3.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROBLEMS & SOLUTIONS */}
          {isSora && activeTab === "problem_solution" && (
            <div className="flex flex-col gap-6">
              {/* Problem Statement */}
              <div className="flex flex-col gap-3">
                <span className="font-pixel text-[9px] text-red-400 border-b border-gray-700 pb-1">
                  [!] PROBLEM STATEMENT
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {soraData.problems.map((p) => (
                    <div key={p.num} className="bg-[#162035] border-2 border-retro-black p-3.5 rounded-xl flex gap-3">
                      <span className="font-pixel text-xs text-red-400 bg-red-950/60 border border-red-800/60 h-7 w-7 rounded flex items-center justify-center shrink-0 font-bold">
                        {p.num}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-pixel text-[9.5px] text-white font-bold">{p.title}</h4>
                        <p className="font-sans text-xs text-gray-300 mt-1 leading-snug">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Statement */}
              <div className="flex flex-col gap-3">
                <span className="font-pixel text-[9px] text-pixel-green border-b border-gray-700 pb-1">
                  [✓] SOLUTION STATEMENT & FEATURES
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {soraData.solutions.map((s) => (
                    <div key={s.num} className="bg-[#162035] border-2 border-retro-black p-3.5 rounded-xl flex gap-3">
                      <span className="font-pixel text-xs text-pixel-green bg-green-950/60 border border-green-800/60 h-7 w-7 rounded flex items-center justify-center shrink-0 font-bold">
                        {s.num}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-pixel text-[9.5px] text-white font-bold">{s.title}</h4>
                        <p className="font-sans text-xs text-gray-300 mt-1 leading-snug">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BUSINESS STRATEGY */}
          {isSora && activeTab === "business" && (
            <div className="flex flex-col gap-4">
              <span className="font-pixel text-[9px] text-yellow-300 border-b border-gray-700 pb-1">
                [$] BUSINESS & REVENUE STRATEGY
              </span>
              <div className="grid grid-cols-1 gap-3.5">
                {soraData.businessStrategy.map((item) => (
                  <div key={item.num} className="bg-[#142138] border-2 border-retro-black p-4 rounded-xl flex items-start gap-4 shadow-sm">
                    <span className="font-pixel text-sm text-yellow-400 bg-[#0c1424] border-2 border-yellow-400/50 px-3 py-1.5 rounded-lg shrink-0 font-bold">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-pixel text-xs text-yellow-300 font-bold">{item.title}</h4>
                      <p className="font-sans text-xs md:text-sm text-gray-200 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BRANDING & STYLE GUIDE */}
          {isSora && activeTab === "branding" && (
            <div className="flex flex-col gap-6">
              {/* Branding & Visual Identity */}
              <div className="flex flex-col gap-3">
                <span className="font-pixel text-[9px] text-cyan-300 border-b border-gray-700 pb-1">
                  [🎨] BRANDING & VISUAL IDENTITY
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {soraData.branding.map((b) => (
                    <div key={b.num} className="bg-[#142036] border-2 border-retro-black p-3.5 rounded-xl flex flex-col gap-1.5">
                      <span className="font-pixel text-[8px] text-cyan-400">{b.num}. {b.title.toUpperCase()}</span>
                      <p className="font-sans text-xs text-gray-200 leading-snug">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* UI Style Guide */}
              <div className="flex flex-col gap-3">
                <span className="font-pixel text-[9px] text-yellow-300 border-b border-gray-700 pb-1">
                  [📐] UI STYLE GUIDE & SYSTEM SPECIFICATION
                </span>

                {/* Color Palette */}
                <div className="bg-[#142036] border-2 border-retro-black p-4 rounded-xl flex flex-col gap-3">
                  <span className="font-pixel text-[8px] text-gray-300">// COLOUR PALETTE</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {soraData.styleGuide.colors.map((c, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <div
                          className="h-10 w-full rounded border border-white/20 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-pixel text-[8px] text-white font-bold">{c.name}</span>
                        <span className="font-mono text-[9px] text-gray-400">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography & Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#142036] border-2 border-retro-black p-3.5 rounded-xl">
                    <span className="font-pixel text-[8px] text-gray-300 block mb-1.5">// TYPOGRAPHY</span>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {soraData.styleGuide.typography}
                    </p>
                  </div>
                  <div className="bg-[#142036] border-2 border-retro-black p-3.5 rounded-xl">
                    <span className="font-pixel text-[8px] text-gray-300 block mb-1.5">// UI COMPONENTS & FIELDS</span>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {soraData.styleGuide.components}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FIGMA PROTOTYPE */}
          {activeTab === "prototype" && (
            <div className="flex flex-col items-center justify-center py-6 gap-5 text-center">
              <div className="bg-[#14223b] border-4 border-retro-black p-6 rounded-2xl max-w-lg w-full flex flex-col items-center gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-4xl">🎨</span>
                <h3 className="font-pixel text-sm text-yellow-300 font-bold">
                  SORA (SAMOSIR E-BOAT) INTERACTIVE FIGMA PROTOTYPE
                </h3>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Click below to open and interact with the full high-fidelity mobile prototype and slide presentation deck directly on Figma.
                </p>
                <a
                  href={figmaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full font-pixel text-xs py-3 px-6 bg-pixel-green hover:bg-green-400 border-2 border-retro-black text-retro-black font-bold rounded-xl active:translate-y-[1px] transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                  <span>🚀 LAUNCH FIGMA PROTOTYPE DEPLOYMENT</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* E. FOOTER BAR */}
        <div className="bg-[#121c30] border-t-4 border-retro-black px-5 py-3 flex items-center justify-between shrink-0">
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-retro-black border border-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                <PixelAvatar role={user.role} size="w-full h-full" />
              </div>
              <span className="font-pixel text-[8.5px] text-gray-300">
                Created by: <strong className="text-yellow-300">{user.name || "Joice"}</strong> ({user.role})
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <a
              href={figmaLink}
              target="_blank"
              rel="noreferrer"
              className="font-pixel text-[8.5px] bg-pixel-green text-retro-black font-bold px-3 py-2 border-2 border-retro-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-400 transition-all flex items-center gap-1"
            >
              <span>FIGMA DEPLOY LINK ↗</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="font-pixel text-[8.5px] bg-[#1a2744] hover:bg-[#25375c] text-white px-3 py-2 border-2 border-retro-black rounded-lg cursor-pointer transition-all"
            >
              BACK TO PROFILE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
