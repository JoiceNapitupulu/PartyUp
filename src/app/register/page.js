"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import userData from "../../data/users.json";
import PixelAvatar from "../../components/PixelAvatar";
import { usersData } from "../../utils/auth";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("Universitas Indonesia");
  const [major, setMajor] = useState("Informatics");
  const [selectedRole, setSelectedRole] = useState("Full-stack Developer");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  // Teks ucapan mascot Pikachu (mengikuti gaya halaman Login)
  const fullSpeechText = "Create your adventurer profile~";
  const [displayedSpeech, setDisplayedSpeech] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedSpeech("");
    const typingTimer = setInterval(() => {
      if (index < fullSpeechText.length) {
        setDisplayedSpeech(fullSpeechText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 40); // Kecepatan ketik (40ms per huruf)

    return () => clearInterval(typingTimer);
  }, []);

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

      // Menyusun objek user baru sesuai struktur database dummy Anda
      const newUser = {
        user_id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim(),
        password: password.trim() || `${name.trim().toLowerCase()}123`,
        semester: 3,
        university,
        major,
        role: selectedRole, // Menyimpan pilihan kelas RPG
        skills: skillsArray,
        bio: bio || `Ready for adventure. Seeking party members for next level coding.`,
        portfolio: [],
      };

      // 1. Simpan ke currentUser (Sesi Login Aktif)
      localStorage.setItem("isLoggedOut", "false");
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // 2. SINKRONISASI: Masukkan ke database lokal usersList agar dideteksi Admin & Dropdown Swapper
      const localUsers = localStorage.getItem("usersList");
      const activeUsersList = localUsers ? JSON.parse(localUsers) : usersData;

      // Mencegah duplikasi ID jika ada tabrakan random
      if (!activeUsersList.find(u => u.user_id === newUser.user_id)) {
        const updatedList = [...activeUsersList, newUser];
        localStorage.setItem("usersList", JSON.stringify(updatedList));
      }

      window.dispatchEvent(new Event("auth-change")); // Update header secara instan
      router.push("/profile");
    } catch (err) {
      console.error("Registration failed:", err);
      router.push("/profile");
    }
  };

  const roles = [
    {
      name: "Product Manager (PM)",
      desc: "Menentukan arah produk, menganalisis kebutuhan pengguna, serta menyusun prioritas pengerjaan.",
      stats: { Code: 10, Design: 60, Business: 95 }
    },
    {
      name: "Project / Scrum Master",
      desc: "Memastikan kelancaran proses kerja tim dengan metodologi Agile/Scrum dan mengatur jadwal sprint.",
      stats: { Code: 20, Design: 30, Business: 90 }
    },
    {
      name: "UI/UX Designer",
      desc: "Merancang alur penggunaan aplikasi (user flow), membuat wireframe, hingga tampilan visual yang intuitif.",
      stats: { Code: 45, Design: 95, Business: 40 }
    },
    {
      name: "UX Researcher",
      desc: "Melakukan riset mendalam untuk memahami perilaku, kebutuhan, dan kendala pengguna.",
      stats: { Code: 15, Design: 85, Business: 60 }
    },
    {
      name: "Frontend Developer",
      desc: "Membangun bagian antarmuka aplikasi (tampilan layar, tombol, animasi) menggunakan React/Next.js.",
      stats: { Code: 85, Design: 75, Business: 10 }
    },
    {
      name: "Backend Developer",
      desc: "Mengurus dapur aplikasi: database, logika bisnis, keamanan server, dan pembuatan API.",
      stats: { Code: 95, Design: 10, Business: 10 }
    },
    {
      name: "Full-stack Developer",
      desc: "Menguasai frontend sekaligus backend untuk menangani pembuatan aplikasi secara menyeluruh.",
      stats: { Code: 90, Design: 50, Business: 30 }
    },
    {
      name: "Mobile App Developer",
      desc: "Fokus khusus membuat aplikasi mobile Android/iOS menggunakan Kotlin, Swift, atau Flutter.",
      stats: { Code: 85, Design: 50, Business: 20 }
    },
    {
      name: "QA (Quality Assurance) Engineer",
      desc: "Menguji aplikasi secara menyeluruh untuk menemukan bug dan kesalahan sebelum diluncurkan.",
      stats: { Code: 75, Design: 20, Business: 30 }
    },
    {
      name: "DevOps Engineer",
      desc: "Mengatur infrastruktur server, keamanan sistem, dan otomatisasi deployment (CI/CD).",
      stats: { Code: 90, Design: 10, Business: 20 }
    }
  ];

  const activeRole = roles.find((r) => r.name === selectedRole);

  return (
    <div className="min-h-screen w-full bg-[#08091a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none selection:bg-yellow-400 selection:text-black">

      {/* Background Pixel Stars & GIF Latar Belakang (sama seperti halaman Login) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70 z-0 pointer-events-none"
        style={{ backgroundImage: "url('/bglogin.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08091a]/80 via-transparent to-[#08091a] z-0 pointer-events-none" />

      {/* Tombol Escape Kembali ke Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 font-pixel text-[9px] text-white hover:text-yellow-300 flex items-center gap-2 transition-colors border-2 border-retro-black px-3 py-1.5 bg-[#121b2d] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
      >
        [← ESCAPE TO TOWN]
      </Link>

      <div className="max-w-4xl w-full flex flex-col items-center gap-3 relative z-10 my-8">

        {/* Container Maskot & Speech Bubble Pikachu (sama seperti halaman Login) */}
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-24 h-24 shrink-0">
            <Image
              src="/Pikachu.gif"
              alt="Pikachu Mascot"
              fill
              unoptimized
              className="object-contain drop-shadow-[2px_4px_0px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="relative bg-white text-retro-black font-pixel text-[10px] md:text-[11px] py-3 px-4 border-2 border-retro-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[260px] h-[48px] flex items-center justify-start text-left shrink-0">
            <span>
              {displayedSpeech}
              <span className="animate-pulse font-bold text-yellow-500">|</span>
            </span>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          </div>
        </div>

        {/* CHARACTER CREATION WHITE CARD CONTAINER (GAYA CODÉDEX, sama seperti Login) */}
        <div className="w-full bg-white text-retro-black border-4 border-retro-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5 text-left">

          <div className="border-b border-slate-200 pb-3">
            <h1 className="font-pixel text-sm text-retro-black mb-1">
              [CHARACTER CREATION SCREEN]
            </h1>
            <p className="font-sans text-xs text-gray-500">
              Join the Guild. Customize your student credentials, choose your class, and prepare to party up.
            </p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Kolom Kiri: Detail Karakter (input restyle senada dengan Login) */}
            <div className="flex flex-col gap-3">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[8px] text-gray-600">ADVENTURER NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Enter character name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none"
                />
              </div>

              {/* Security Key / Password */}
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[8px] text-gray-600">SECURITY KEY (PASSWORD)</label>
                <input
                  type="password"
                  placeholder="e.g. hero123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none"
                />
              </div>

              {/* University & Prodi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-pixel text-[8px] text-gray-600">GUILD (UNIVERSITY)</label>
                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none cursor-pointer"
                  >
                    <option value="Universitas Indonesia">Universitas Indonesia</option>
                    <option value="ITB">ITB</option>
                    <option value="UGM">UGM</option>
                    <option value="Binus University">Binus University</option>
                    <option value="Universitas Airlangga">Universitas Airlangga</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-pixel text-[8px] text-gray-600">PRODI (MAJOR)</label>
                  <select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none cursor-pointer"
                  >
                    <option value="Informatics">Informatics</option>
                    <option value="Information Systems">Information Systems</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Management">Business Management</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[8px] text-gray-600">
                  SKILL INVENTORY (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, Figma, Go, Python"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[8px] text-gray-600">CHARACTER BIO</label>
                <textarea
                  rows={3}
                  placeholder="Introduce yourself to potential party leaders..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="font-sans text-xs p-2.5 bg-slate-50 border-2 border-slate-300 rounded-lg focus:border-retro-black focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Kolom Kanan: Filter Class Modern (grid chip, tidak memanjang) + Stats + Submit */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-pixel text-[8px] text-gray-600">SELECT RPG CLASS</label>

                {/* Grid chip modern menggantikan list memanjang */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {roles.map((role) => {
                    const isSelected = selectedRole === role.name;
                    return (
                      <button
                        type="button"
                        key={role.name}
                        onClick={() => setSelectedRole(role.name)}
                        className={`font-pixel text-[7px] leading-tight text-center px-1.5 py-2.5 border-2 rounded-lg cursor-pointer select-none transition-all ${
                          isSelected
                            ? "bg-navy-blue border-retro-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]"
                            : "bg-slate-50 border-slate-300 text-retro-black hover:border-retro-black hover:bg-slate-100"
                        }`}
                      >
                        {role.name.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                {/* Deskripsi singkat class terpilih, muncul dinamis di bawah grid */}
                {activeRole && (
                  <p className="font-sans text-[10.5px] text-gray-500 leading-relaxed bg-slate-50 border-2 border-slate-200 rounded-lg p-2.5 mt-1">
                    {activeRole.desc}
                  </p>
                )}
              </div>

              {/* Stat Viewer Panel */}
              <div className="bg-retro-black text-white rounded-lg p-4 flex flex-col gap-2.5">
                <h2 className="font-pixel text-[8px] text-pixel-green border-b border-pixel-green/30 pb-2 mb-0.5">
                  CLASS BASE STATISTICS
                </h2>

                <div className="flex flex-col gap-2">
                  {activeRole &&
                    Object.entries(activeRole.stats).map(([stat, val]) => (
                      <div key={stat} className="flex flex-col gap-0.5">
                        <div className="flex justify-between font-pixel text-[7px]">
                          <span>{stat.toUpperCase()}</span>
                          <span>{val}/100</span>
                        </div>
                        <div className="h-3 bg-[#111] border border-slate-700 rounded p-0.5">
                          <div
                            className="h-full bg-pixel-green rounded transition-all duration-300"
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tombol Primary Spawn Character */}
              <button
                type="submit"
                className="w-full font-pixel text-xs py-3 bg-navy-blue hover:bg-navy-light text-white font-bold border-2 border-retro-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-[1px] transition-all mt-1"
              >
                Spawn Character ▶
              </button>
            </div>
          </form> {/* <-- TAG FORM DITUTUP DI SINI */}

          {/* Sign In Link (DIPINDAHKAN KE LUAR FORM AGAR 100% BISA DIKLIK) */}
          <div className="text-center border-t border-slate-200 pt-3 relative z-20">
            <p className="font-sans text-xs text-gray-500">
              Already have a character?{" "}
              <Link 
                href="/login" 
                className="font-pixel text-[9px] text-navy-blue font-bold hover:underline pl-1 cursor-pointer relative z-20 inline-block"
              >
                Log in &gt;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}