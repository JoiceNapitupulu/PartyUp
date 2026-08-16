"use client";

import { useEffect, useState } from "react";

export default function HomeStats() {
    // EFEK ANGKA BERTAMBAH CEPAT (COUNT-UP ANIMATION)
    const [heroesCount, setHeroesCount] = useState(0);
    const [questsCount, setQuestsCount] = useState(0);
    const [matchRateCount, setMatchRateCount] = useState(0);

    useEffect(() => {
        const duration = 3000; // Total waktu hitungan cepat
        const steps = 40;
        const intervalTime = duration / steps;

        let step = 0;
        const countTimer = setInterval(() => {
            step++;
            const progress = step / steps;

            setHeroesCount(Math.min(342, Math.floor(342 * progress)));
            setQuestsCount(Math.min(1208, Math.floor(1208 * progress)));
            setMatchRateCount(Math.min(94, Math.floor(94 * progress)));

            if (step >= steps) {
                clearInterval(countTimer);
            }
        }, intervalTime);

        return () => clearInterval(countTimer);
    }, []);

    return (
        <section className="max-w-6xl w-full mx-auto px-4 relative z-20 my-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-retro-black text-white p-6 border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                {/* Hero Count */}
                <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-yellow-400/30">
                    <span className="font-pixel text-xs text-yellow-400 mb-1">ACTIVE PARTY HEROES</span>
                    <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                        {heroesCount.toLocaleString()}+
                    </span>
                </div>

                {/* Quests Count */}
                <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-pixel-green/30">
                    <span className="font-pixel text-xs text-pixel-green mb-1">QUESTS COMPLETED</span>
                    <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                        {questsCount.toLocaleString()}+
                    </span>
                </div>

                {/* Match Rate Count */}
                <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-sky-400/30">
                    <span className="font-pixel text-xs text-sky-400 mb-1">GUILD MATCH RATE</span>
                    <span className="font-pixel text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                        {matchRateCount}%
                    </span>
                </div>

            </div>
        </section>
    );
}