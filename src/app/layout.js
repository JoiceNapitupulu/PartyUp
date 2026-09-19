import { Press_Start_2P, Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot"; // Impor komponen chatbot melayang baru
import RetroNotification from "../components/RetroNotification"; // Notifikasi Retro RPG Global

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "PartyUp! - Retro RPG Teammate Finder",
  description: "Form the ultimate party (team) for hackathons, competitions, and college projects using our 8-bit retro Quest Board.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-retro-bg text-retro-black min-h-screen flex flex-col selection:bg-pixel-green selection:text-retro-black">
        {children}

        {/* Notifikasi Retro RPG Global */}
        <RetroNotification />

        {/* Chatbot Melayang Global */}
        <Chatbot />
      </body>
    </html>
  );
}