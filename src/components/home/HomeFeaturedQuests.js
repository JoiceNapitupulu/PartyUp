"use client";

import Link from "next/link";
import PixelButton from "../../components/PixelButton";
import ProjectCard from "../../components/ProjectCard";
import projectsData from "../../data/projects.json";
import { useLanguage } from "../../utils/lang";

export default function HomeFeaturedQuests() {
    const { lang } = useLanguage();
    
    // Ambil 3 proyek terbuka teratas untuk featured quests
    const featuredProjects = projectsData
        .filter((p) => p.status === "Open")
        .slice(0, 3);

    return (
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 mb-16 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="font-pixel text-sm md:text-base text-white text-left">
                    {lang === "ID" ? "[ MISI AKTIF UNGGULAN ]" : "[ FEATURED ACTIVE QUESTS ]"}
                </h2>
                <Link href="/board">
                    <PixelButton variant="secondary" className="text-[9px] py-2 px-4 border-2">
                        {lang === "ID" ? "LIHAT SEMUA MISI ▶" : "VIEW ALL QUESTS ▶"}
                    </PixelButton>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                    <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
        </section>
    );
}