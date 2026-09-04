"use client";

import React from "react";

export default function PixelAvatar({ role = "", size = "w-16 h-16" }) {
    const key = (role || "").toLowerCase();

    // Admin Panel, Quest Board) tetap memetakan role ke karakter yang sama.
    let category = "coder";
    if (key.includes("designer") || key.includes("researcher")) {
        category = "designer";
    } else if (key.includes("product") || key.includes("manager") || key.includes("scrum") || key.includes("hustler")) {
        category = "manager";
    } else if (key.includes("admin")) {
        category = "admin";
    }

    // Skin tone & fitur wajah anime dibuat konsisten di semua karakter —
    const SKIN = "#ffdcb0";
    const BLUSH = "#fca5a5";

    return (
        <svg
            viewBox="0 0 24 24"
            className={`${size} transition-transform duration-300 hover:scale-105`}
            style={{ imageRendering: "pixelated" }}
            fill="currentColor"
        >
            {category === "coder" && (
                <>
                    {/* Torso hoodie dengan shading 2-tone */}
                    <rect x="5" y="17" width="14" height="6" fill="#16a34a" />
                    <rect x="5" y="21" width="14" height="2" fill="#15803d" />
                    <rect x="4" y="17" width="2" height="5" fill="#166534" />
                    <rect x="18" y="17" width="2" height="5" fill="#166534" />
                    <rect x="10" y="17" width="4" height="1" fill="#facc15" />

                    {/* Leher & kepala */}
                    <rect x="10" y="14" width="4" height="3" fill={SKIN} />
                    <rect x="7" y="6" width="10" height="8" fill={SKIN} />

                    {/* Rambut acak-acakan gaya hacker (dengan aksen highlight hijau) */}
                    <rect x="6" y="3" width="12" height="3" fill="#1f2937" />
                    <rect x="6" y="6" width="2" height="3" fill="#1f2937" />
                    <rect x="16" y="6" width="2" height="3" fill="#1f2937" />
                    <rect x="8" y="2" width="2" height="2" fill="#1f2937" />
                    <rect x="14" y="2" width="2" height="2" fill="#1f2937" />
                    <rect x="11" y="2" width="2" height="1" fill="#22c55e" opacity="0.8" />

                    {/* Kacamata programmer memantulkan layar */}
                    <rect x="8" y="10" width="3" height="3" fill="none" stroke="#0e1726" strokeWidth="0.6" />
                    <rect x="13" y="10" width="3" height="3" fill="none" stroke="#0e1726" strokeWidth="0.6" />
                    <rect x="11" y="11" width="2" height="0.6" fill="#0e1726" />
                    <rect x="8.6" y="10.6" width="1" height="1" fill="#4ade80" opacity="0.9" />
                    <rect x="13.6" y="10.6" width="1" height="1" fill="#4ade80" opacity="0.9" />

                    {/* Pipi & senyum tipis */}
                    <rect x="8" y="13" width="1" height="1" fill={BLUSH} opacity="0.6" />
                    <rect x="15" y="13" width="1" height="1" fill={BLUSH} opacity="0.6" />
                    <rect x="11" y="13" width="2" height="0.8" fill="#c2410c" opacity="0.7" />

                    {/* Badge peran */}
                    <text x="12" y="21.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="2.6" fill="#dcfce7">{"</>"}</text>
                </>
            )}

            {/*  2. DESIGNER (UI/UX / Researcher - Twin-tail Pink) */}
            {category === "designer" && (
                <>
                    {/* Torso jaket kreatif dengan scarf cyan */}
                    <rect x="5" y="17" width="14" height="6" fill="#a855f7" />
                    <rect x="5" y="21" width="14" height="2" fill="#7e22ce" />
                    <rect x="4" y="17" width="2" height="5" fill="#6b21a8" />
                    <rect x="18" y="17" width="2" height="5" fill="#6b21a8" />
                    <rect x="9" y="16" width="6" height="2" fill="#06b6d4" />

                    {/* Leher & kepala */}
                    <rect x="10" y="14" width="4" height="3" fill={SKIN} />
                    <rect x="7" y="6" width="10" height="8" fill={SKIN} />

                    {/* Rambut twin-tail panjang dengan poni + highlight terang */}
                    <rect x="6" y="3" width="12" height="3" fill="#ec4899" />
                    <rect x="4" y="6" width="3" height="8" fill="#ec4899" />
                    <rect x="17" y="6" width="3" height="8" fill="#ec4899" />
                    <rect x="9" y="2" width="6" height="2" fill="#f9a8d4" />
                    <rect x="8" y="5" width="2" height="2" fill="#f472b6" />

                    {/* Mata besar bergaya anime, iris cyan cerah */}
                    <rect x="8" y="10" width="3" height="3" fill="#06b6d4" />
                    <rect x="13" y="10" width="3" height="3" fill="#06b6d4" />
                    <rect x="8.4" y="10.4" width="1.2" height="1.2" fill="white" opacity="0.95" />
                    <rect x="13.4" y="10.4" width="1.2" height="1.2" fill="white" opacity="0.95" />

                    {/* Pipi & senyum */}
                    <rect x="8" y="13" width="1.2" height="1" fill={BLUSH} opacity="0.7" />
                    <rect x="15" y="13" width="1.2" height="1" fill={BLUSH} opacity="0.7" />
                    <rect x="11" y="13" width="2" height="0.8" fill="#db2777" opacity="0.7" />

                    {/* Badge peran (kuas) */}
                    <rect x="11" y="19.5" width="2" height="2.5" fill="#fde68a" />
                    <rect x="11.4" y="17.8" width="1.2" height="1.8" fill="#7c3aed" />
                </>
            )}

            {/* 3. MANAGER (PM / Scrum Master - Blazer Emas-Biru)*/}
            {category === "manager" && (
                <>
                    {/* Torso blazer navy dengan dasi & epaulette emas */}
                    <rect x="5" y="17" width="14" height="6" fill="#1e3a8a" />
                    <rect x="5" y="21" width="14" height="2" fill="#1e293b" />
                    <rect x="4" y="17" width="2" height="2" fill="#facc15" />
                    <rect x="18" y="17" width="2" height="2" fill="#facc15" />
                    <rect x="11" y="17" width="2" height="5" fill="#eab308" />

                    {/* Leher & kepala */}
                    <rect x="10" y="14" width="4" height="3" fill={SKIN} />
                    <rect x="7" y="6" width="10" height="8" fill={SKIN} />

                    {/* Rambut rapi tersisir */}
                    <rect x="7" y="3" width="10" height="4" fill="#3b2f2f" />
                    <rect x="7" y="6" width="1.5" height="2" fill="#3b2f2f" />
                    <rect x="15.5" y="6" width="1.5" height="2" fill="#3b2f2f" />

                    {/* Mata percaya diri, iris keemasan */}
                    <rect x="8" y="10" width="3" height="2.6" fill="#eab308" />
                    <rect x="13" y="10" width="3" height="2.6" fill="#eab308" />
                    <rect x="8.4" y="10.3" width="1" height="1" fill="white" opacity="0.9" />
                    <rect x="13.4" y="10.3" width="1" height="1" fill="white" opacity="0.9" />

                    {/* Pipi & senyum tegas */}
                    <rect x="8" y="13" width="1" height="1" fill={BLUSH} opacity="0.5" />
                    <rect x="15" y="13" width="1" height="1" fill={BLUSH} opacity="0.5" />
                    <rect x="10.5" y="13" width="3" height="0.8" fill="#92400e" opacity="0.7" />

                    {/* Badge peran (bintang kepemimpinan) */}
                    <path d="M12 18.3l0.7 1.4 1.5 0.2-1.1 1 0.3 1.5-1.4-0.8-1.4 0.8 0.3-1.5-1.1-1 1.5-0.2z" fill="#facc15" />
                </>
            )}

            {/*  4. ADMIN OVERSEER (System Admin - Mahkota & Jubah Merah-Emas) */}
            {category === "admin" && (
                <>
                    {/* Torso jubah merah dengan garis trim emas */}
                    <rect x="5" y="17" width="14" height="6" fill="#b91c1c" />
                    <rect x="5" y="21" width="14" height="2" fill="#7f1d1d" />
                    <rect x="4" y="17" width="2" height="6" fill="#991b1b" />
                    <rect x="18" y="17" width="2" height="6" fill="#991b1b" />
                    <rect x="10" y="17" width="4" height="1" fill="#facc15" />
                    <rect x="9" y="20" width="6" height="0.8" fill="#facc15" opacity="0.8" />

                    {/* Leher & kepala */}
                    <rect x="10" y="14" width="4" height="3" fill={SKIN} />
                    <rect x="7" y="6" width="10" height="8" fill={SKIN} />

                    {/* Sisa rambut gelap yang mengintip dari bawah mahkota */}
                    <rect x="7" y="6" width="1.5" height="3" fill="#1f2937" />
                    <rect x="15.5" y="6" width="1.5" height="3" fill="#1f2937" />

                    {/* Mahkota emas dengan permata merah */}
                    <rect x="7" y="2" width="10" height="2" fill="#facc15" />
                    <rect x="6" y="1" width="1.5" height="2" fill="#facc15" />
                    <rect x="11.2" y="0.5" width="1.5" height="2.5" fill="#facc15" />
                    <rect x="16.5" y="1" width="1.5" height="2" fill="#facc15" />
                    <rect x="11" y="2.4" width="2" height="1.2" fill="#ef4444" />

                    {/* Mata berwibawa, iris merah tegas */}
                    <rect x="8" y="10" width="3" height="2.6" fill="#ef4444" />
                    <rect x="13" y="10" width="3" height="2.6" fill="#ef4444" />
                    <rect x="8.4" y="10.3" width="1" height="1" fill="white" opacity="0.9" />
                    <rect x="13.4" y="10.3" width="1" height="1" fill="white" opacity="0.9" />

                    {/* Pipi & ekspresi berwibawa */}
                    <rect x="8" y="13" width="1" height="1" fill={BLUSH} opacity="0.5" />
                    <rect x="15" y="13" width="1" height="1" fill={BLUSH} opacity="0.5" />
                    <rect x="10.5" y="13" width="3" height="0.8" fill="#7f1d1d" opacity="0.7" />

                    {/* Badge peran (permata overseer) */}
                    <path d="M12 18l1.6 1.6-1.6 1.6-1.6-1.6z" fill="#fde68a" />
                </>
            )}
        </svg>
    );
}