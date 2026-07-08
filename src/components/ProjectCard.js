"use client";

import React, { useState } from "react";
import usersData from "@/data/users.json";
import PixelButton from "./PixelButton";

export default function ProjectCard({ project, showAuthor = true, onApply }) {
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Find author details
  const author = usersData.find((u) => u.user_id === project.author);

  const handleApply = () => {
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
    <div className={`bg-white pixel-border pixel-shadow p-5 flex flex-col justify-between gap-4 transition-transform hover:-translate-y-1 ${isClosed ? "opacity-75" : ""}`}>
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className="font-pixel text-[9px] px-2 py-1 bg-navy-blue text-white pixel-border-sm">
            {project.category}
          </span>
          <span
            className={`font-pixel text-[8px] px-2 py-1 pixel-border-sm uppercase ${
              isClosed
                ? "bg-retro-gray text-retro-dark-gray"
                : "bg-pixel-green text-retro-black animate-pulse"
            }`}
          >
            {project.status === "Open" ? "● OPEN QUEST" : "■ FILLED"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-pixel text-xs leading-relaxed text-retro-black mb-2 line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-retro-dark-gray line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Requirements */}
        <div className="mb-4">
          <p className="font-pixel text-[8px] text-navy-blue mb-2">LOOKING FOR:</p>
          <div className="flex flex-wrap gap-1.5">
            {project.looking_for.map((skill, index) => {
              const isRole = ["Hacker", "Hipster", "Hustler"].includes(skill);
              return (
                <span
                  key={index}
                  className={`font-pixel text-[8px] px-2 py-0.5 pixel-border-sm ${
                    isRole
                      ? "bg-pixel-green text-retro-black font-bold"
                      : "bg-retro-light-gray text-retro-black"
                  }`}
                >
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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-retro-light-gray border-2 border-retro-black flex items-center justify-center font-pixel text-[10px] text-navy-blue font-bold">
              {author.name[0]}
            </div>
            <div>
              <p className="font-pixel text-[8px] text-retro-black">{author.name}</p>
              <p className="font-sans text-[9px] text-retro-dark-gray leading-none">
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
          onClick={handleApply}
          className="py-1 px-3 text-[9px] border-2"
        >
          {isApplying ? "SENDING..." : isApplied ? "APPLIED ✓" : isClosed ? "FILLED" : "JOIN PARTY"}
        </PixelButton>
      </div>
    </div>
  );
}
