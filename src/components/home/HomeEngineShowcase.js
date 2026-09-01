"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../utils/lang";

export default function HomeEngineShowcase() {
    const { lang } = useLanguage();
    
    // EFEK TEKS KETIK SATU PER SATU (WORKSTATION TITLE)
    const fullWorkspaceTitle = lang === "ID"
        ? "RUANG KERJA PEMROGRAMAN RETRO REAL-TIME"
        : "REAL-TIME RETRO PROGRAMMING WORKSPACE";
    const [typedWorkspaceTitle, setTypedWorkspaceTitle] = useState("");

    useEffect(() => {
        let index = 0;
        setTypedWorkspaceTitle("");
        const typingTimer = setInterval(() => {
            if (index < fullWorkspaceTitle.length) {
                setTypedWorkspaceTitle(fullWorkspaceTitle.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingTimer);
            }
        }, 70);

        return () => clearInterval(typingTimer);
    }, [lang, fullWorkspaceTitle]);

    return (
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-16">
            <div className="bg-[#13222e] border-4 border-retro-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-left flex flex-col gap-4">
                    <span className="font-pixel text-[9px] text-yellow-400 bg-retro-black px-2 py-1 w-fit border border-retro-black">
                        {lang === "ID" ? "// MESIN MATCHMAKING CANGGIH" : "// ADVANCED MATCHMAKING ENGINE"}
                    </span>
                    <h2 className="font-pixel text-lg md:text-xl text-white leading-relaxed min-h-[50px] flex items-center">
                        <span>
                            {typedWorkspaceTitle}
                            <span className="animate-pulse text-yellow-400 font-bold">|</span>
                        </span>
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                        {lang === "ID"
                            ? "PartyUp! menghubungkan mahasiswa koding langsung dengan desainer dan product manager. Rakit tim lomba terkuat dengan 10 peran kelas IT modern."
                            : "PartyUp! connects student programmers directly with designers and product managers. Build high-performing hackathon parties equipped with 10 modern IT class roles."}
                    </p>
                </div>

                <div className="w-full lg:w-[420px] aspect-video relative border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <Image
                        src="/computer.png"
                        alt="Retro Coding Terminal Setup"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}