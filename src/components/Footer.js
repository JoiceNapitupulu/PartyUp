import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-retro-black text-retro-gray border-t-4 border-retro-black py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Theme */}
        <div className="text-center md:text-left">
          <div className="font-pixel text-base text-pixel-green mb-2">
            PARTYUP!
          </div>
          <p className="font-sans text-xs max-w-sm text-retro-gray/80 leading-relaxed">
            Building Smarter Communities Through Digital Learning. Designed for
            INVENTION 2026 - Web Design Competition.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 sm:gap-8 flex-wrap justify-center">
          <Link
            href="/board"
            className="font-pixel text-[9px] hover:text-pixel-green transition-colors"
          >
            QUESTS
          </Link>
          <Link
            href="/showcase"
            className="font-pixel text-[9px] hover:text-pixel-green transition-colors"
          >
            SHOWCASE
          </Link>
          <Link
            href="/following"
            className="font-pixel text-[9px] hover:text-pixel-green transition-colors"
          >
            TIMELINE
          </Link>
        </div>

        {/* System Info */}
        <div className="text-center md:text-right font-pixel text-[8px] text-retro-dark-gray leading-loose">
          <p>SYSTEM STATUS: ONLINE</p>
          <p>VERSION: 1.0.0-PRO</p>
          <p className="mt-1 text-retro-gray/50">
            © 2026 PARTYUP!. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
