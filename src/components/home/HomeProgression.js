"use client";

import Image from "next/image";

export default function HomeProgression() {
    return (
        <section className="max-w-6xl w-full mx-auto px-4 md:px-6 my-16 flex flex-col lg:flex-row items-center gap-12">

            {/* TEKS SEBELAH KIRI */}
            <div className="flex-1 text-left flex flex-col gap-4">
                <span className="font-pixel text-[10px] text-yellow-400 bg-retro-black px-3 py-1.5 w-fit border border-retro-black">
          // PROGRESSION SYSTEM
                </span>
                <h2 className="font-pixel text-xl md:text-3xl text-white leading-relaxed">
                    Level up your team
                </h2>
                <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-lg">
                    Bentuk party-mu, kumpulkan XP dari tiap quest yang diselesaikan, dan koleksi lencana pencapaian saat kamu berkolaborasi lintas role. Sistem matchmaking kami bikin cari tim impian buat GEMASTIK &amp; INVENTION 2026 jadi semenyenangkan menyelesaikan quest berikutnya.
                </p>
            </div>

            {/* SEBELAH KANAN: TEAM.GIF LEBIH NYATA & IKON LEBIH BESAR */}
            <div className="w-full lg:w-[460px] relative pt-16">

                {/* Karakter Pixel Diperbesar di Atas */}
                <div className="absolute top-2 left-6 flex items-center gap-4 z-10 animate-float-gentle">
                    <div className="w-24 h-24 relative">
                        <Image
                            src="/cursors/2pc.gif"
                            alt="Character 1"
                            fill
                            unoptimized
                            className="object-contain drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
                        />
                    </div>
                </div>

                {/* Container Gambar Lebih Bersih & Nyata (Tanpa kotak hitam kaku) */}
                <div className="bg-[#111e28] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-3.5 relative flex flex-col gap-3">

                    <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-inner bg-black">
                        <Image
                            src="/cursors/team.gif"
                            alt="Team Campfire"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>

                    <div className="flex justify-between w-full items-center px-2 pb-1">
                        <span className="font-pixel text-[10px] text-yellow-300 tracking-wider">PARTYUP!</span>
                    </div>

                </div>
            </div>
        </section>
    );
}