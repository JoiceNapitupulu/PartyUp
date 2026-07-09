import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function Home() {
  // Get top 3 active projects
  const featuredProjects = projectsData
    .filter((p) => p.status === "Open")
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-12 flex flex-col gap-16">
        
        {/* HERO SECTION: Retro Terminal Workspace */}
        <section className="bg-retro-light-gray pixel-border pixel-shadow p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-blue text-white font-pixel text-[10px] w-fit pixel-border-sm">
              [SYSTEM_ONLINE]
            </div>
            
            <h1 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-retro-black leading-normal md:leading-relaxed">
              POST A QUEST.<br />
              <span className="text-navy-blue">FORM YOUR PARTY.</span>
            </h1>

            <p className="font-sans text-sm md:text-base text-retro-dark-gray leading-relaxed max-w-lg">
              The ultimate 8-bit workspace companion for IT students. Match with Hacker, Hipster, and Hustler classes to form high-performing teams for hackathons, GEMASTIK, and college quests.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/board">
                <PixelButton variant="green">BROWSE QUESTS</PixelButton>
              </Link>
              <Link href="/register">
                <PixelButton variant="navy">POST A QUEST</PixelButton>
              </Link>
            </div>
          </div>

          {/* CRT Monitor Simulator */}
          <div className="w-full lg:w-[420px] bg-retro-gray pixel-border p-4 pixel-shadow-navy flex flex-col gap-3">
            {/* Monitor Top Controls */}
            <div className="flex justify-between items-center px-1">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
              </div>
              <div className="font-pixel text-[7px] text-retro-dark-gray">CRT-5000 MONITOR</div>
            </div>

            {/* Glowing Screen */}
            <div className="relative overflow-hidden bg-[#071330] pixel-border-sm p-4 h-56 flex flex-col justify-between font-pixel text-[10px] text-pixel-green shadow-inner">
              {/* Scanlines Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10" />
              
              <div className="flex flex-col gap-2 z-0 leading-relaxed">
                <p className="text-white">PARTYUP! OS v1.0.0</p>
                <p className="text-retro-dark-gray">Initializing connection...</p>
                <p className="text-pixel-green">✓ Network protocol loaded</p>
                <p className="text-pixel-green">✓ Found 5 active guild members</p>
                <p className="text-pixel-green">✓ Found 4 open quest boards</p>
                <p className="mt-2 text-yellow-400">&gt; Looking for Hacker class...</p>
              </div>

              <div className="flex justify-between items-end z-0">
                <span className="animate-pulse font-bold text-white">&gt; RUN MATCHMAKING_</span>
                <span className="text-[8px] bg-pixel-green text-[#071330] px-1 font-bold">100% MATCH</span>
              </div>
            </div>

            {/* Monitor Dial Knob Controls */}
            <div className="flex justify-between items-center px-2 py-1 bg-retro-light-gray border-t border-retro-gray">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-retro-gray border-2 border-retro-black" />
                <div className="w-4 h-4 rounded-full bg-retro-gray border-2 border-retro-black" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-pixel text-[8px] text-retro-black">PWR</span>
                <div className="w-2 h-2 bg-pixel-green border border-black animate-ping" />
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS BOARD: RPG HUD Style */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-retro-black text-white p-6 pixel-border pixel-shadow-green">
          <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-pixel-green/30">
            <span className="font-pixel text-xs text-pixel-green mb-1">ACTIVE PARTY HEROES</span>
            <span className="font-pixel text-xl text-white font-bold">342</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-pixel-green/30">
            <span className="font-pixel text-xs text-yellow-400 mb-1">QUESTS COMPLETED</span>
            <span className="font-pixel text-xl text-white font-bold">1,208</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-pixel-green/30">
            <span className="font-pixel text-xs text-sky-400 mb-1">GUILD MATCH RATE</span>
            <span className="font-pixel text-xl text-white font-bold">94%</span>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="flex flex-col gap-8">
          <h2 className="font-pixel text-sm md:text-base text-retro-black text-center md:text-left">
            [HOW THE SYSTEM WORKS]
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white pixel-border pixel-shadow p-6 flex flex-col gap-3 relative">
              <div className="absolute -top-4 -left-2 bg-navy-blue text-white font-pixel text-xs px-2 py-1 pixel-border-sm">
                01
              </div>
              <h3 className="font-pixel text-xs text-navy-blue mt-2">CHOOSE CLASS</h3>
              <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">
                Register your profile and select your primary RPG class: **Hacker** (Dev), **Hipster** (Designer), or **Hustler** (Biz/PM). Tell the guild your tech stack!
              </p>
            </div>

            <div className="bg-white pixel-border pixel-shadow p-6 flex flex-col gap-3 relative">
              <div className="absolute -top-4 -left-2 bg-navy-blue text-white font-pixel text-xs px-2 py-1 pixel-border-sm">
                02
              </div>
              <h3 className="font-pixel text-xs text-navy-blue mt-2">POST A QUEST</h3>
              <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">
                Competition or college homework? Post a quest outlining requirements, scope, target event (e.g. GEMASTIK, INVENTION 2026), and required party members.
              </p>
            </div>

            <div className="bg-white pixel-border pixel-shadow p-6 flex flex-col gap-3 relative">
              <div className="absolute -top-4 -left-2 bg-navy-blue text-white font-pixel text-xs px-2 py-1 pixel-border-sm">
                03
              </div>
              <h3 className="font-pixel text-xs text-navy-blue mt-2">FORM THE PARTY</h3>
              <p className="font-sans text-xs text-retro-dark-gray leading-relaxed">
                Browse candidates, trigger instant matchmaking matching, send party invitations, and collaborate to conquer the project leaderboard.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED ACTIVE QUESTS */}
        <section className="flex flex-col gap-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-pixel text-sm md:text-base text-retro-black">
              [ACTIVE GUILD QUESTS]
            </h2>
            <Link href="/board">
              <PixelButton variant="secondary" className="text-[9px] py-1.5 px-3 border-2">
                VIEW ALL QUESTS &gt;
              </PixelButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
