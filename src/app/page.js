"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeHero from "../components/home/HomeHero";
import HomeEngineShowcase from "../components/home/HomeEngineShowcase";
import HomeStats from "../components/home/HomeStats";
import HomeProgression from "../components/home/HomeProgression";
import HomeMatchmaking from "../components/home/HomeMatchmaking";
import HomeHowItWorks from "../components/home/HomeHowItWorks";
import HomeFeaturedQuests from "../components/home/HomeFeaturedQuests";

export default function Home() {
  return (
    <div className="bg-[#1a2f3b] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">

      <style jsx global>{`
        /* Animasi Daun Melayang Berguguran (dipakai di HomeHero) */
        @keyframes leafFalling {
          0% {
            transform: translate(0px, -20px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translate(100px, 80vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Animasi Floating (dipakai di HomeHero, HomeProgression, HomeMatchmaking) */
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-float-gentle {
          animation: floatGentle 4s ease-in-out infinite;
        }

        .leaf-particle {
          position: absolute;
          pointer-events: none;
          z-index: 5;
          animation: leafFalling 8s linear infinite;
        }

        /* Animasi Judul "Coding Adventure" (dipakai di HomeHero): bernapas
           halus + berpendar emas, dengan mikro pergeseran letter-spacing
           supaya terasa "hidup" tanpa mengganggu keterbacaan */
        @keyframes titleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.65)) drop-shadow(0 6px 0px rgba(0,0,0,1));
            transform: translateY(0px) scale(1);
            letter-spacing: 0.01em;
          }
          50% {
            filter: drop-shadow(0 0 26px rgba(250, 204, 21, 0.95)) drop-shadow(0 6px 0px rgba(0,0,0,1));
            transform: translateY(-5px) scale(1.015);
            letter-spacing: 0.02em;
          }
        }
        .animate-title-glow {
          animation: titleGlow 3.4s ease-in-out infinite;
          will-change: transform, filter;
        }

        /* Animasi lencana XP kecil yang "pop" masuk satu-satu — dipertahankan
           dari kode asli walau belum dipakai di section manapun saat ini,
           supaya siap pakai kapan saja tanpa perlu nambah CSS baru lagi */
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: popIn 0.5s ease-out both;
        }

        /* Hormati preferensi pengguna yang sensitif terhadap gerakan */
        @media (prefers-reduced-motion: reduce) {
          .animate-title-glow {
            animation: none;
            filter: drop-shadow(0 0 14px rgba(250, 204, 21, 0.8)) drop-shadow(0 6px 0px rgba(0,0,0,1));
          }
          .animate-pop-in {
            animation: none;
          }
        }
      `}</style>

      {/* Header Utama */}
      <Header />

      <main className="flex-1 w-full mx-auto flex flex-col">
        <HomeHero />
        <HomeEngineShowcase />
        <HomeStats />
        <HomeProgression />
        <HomeMatchmaking />
        <HomeHowItWorks />
        <HomeFeaturedQuests />
      </main>

      {/* Footer Utama */}
      <Footer />
    </div>
  );
}