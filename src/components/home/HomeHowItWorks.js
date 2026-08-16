"use client";

export default function HomeHowItWorks() {
    return (
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-12 flex flex-col gap-8">
            <h2 className="font-pixel text-sm md:text-base text-white text-center md:text-left tracking-wider">
                [ HOW THE ADVENTURE WORKS ]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#172a3a] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
                    <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                        01
                    </div>
                    <h3 className="font-pixel text-xs text-yellow-400 mt-2">CHOOSE CLASS ROLE</h3>
                    <p className="font-sans text-xs text-gray-200 leading-relaxed">
                        Select your primary 8-bit role from 10 specialized classes: Full-stack, UI/UX, PM, Mobile Developer, QA, or DevOps Engineer.
                    </p>
                </div>

                <div className="bg-[#172a3a] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
                    <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                        02
                    </div>
                    <h3 className="font-pixel text-xs text-yellow-400 mt-2">DISPATCH A QUEST</h3>
                    <p className="font-sans text-xs text-gray-200 leading-relaxed">
                        Post a quest specifying target competitions (e.g. GEMASTIK, INVENTION 2026), project scope, required skills, and party slots.
                    </p>
                </div>

                <div className="bg-[#172a3a] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-3 relative text-left">
                    <div className="absolute -top-4 -left-2 bg-yellow-400 text-retro-black font-pixel text-xs px-2.5 py-1 font-bold border-2 border-retro-black">
                        03
                    </div>
                    <h3 className="font-pixel text-xs text-yellow-400 mt-2">FORM THE PARTY</h3>
                    <p className="font-sans text-xs text-gray-200 leading-relaxed">
                        Trigger instant matchmaking, review student showcase portfolios, send invitations, and conquer the quest leaderboards!
                    </p>
                </div>
            </div>
        </section>
    );
}