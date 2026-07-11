"use client";

import React, { useState, useEffect, useRef } from "react";

const PixelDogIcon = ({ isOpen }) => (
    <svg
        viewBox="0 0 16 16"
        className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
        style={{ imageRendering: "pixelated" }}
        fill="none"
    >
        {/* Bulu Dasar Anjing (Putih Hangat / Cream) */}
        <path
            d="M5 2h1v1H5zm5 0h1v1h-1zm-6 1h8v1H4zm-1 1h10v1H3zm-1 1h12v1H2zm0 1h12v7H2zm1 7h10v1H3zm1 1h8v1H4z"
            fill="#FFFDF0"
        />

        {/* Telinga Bagian Dalam (Orange Lembut) */}
        <rect x="5" y="3" width="1" height="1" fill="#F97316" />
        <rect x="10" y="3" width="1" height="1" fill="#F97316" />

        {/* Bayangan Bulu Bawah (Abu-abu Hangat / Beige) */}
        <path
            d="M2 11h1v3H2zm1 2h1v1H3zm1 1h8v1H4zm8-1h1v-1h-1zm1-3h1v3h-1z"
            fill="#E2DFD2"
        />

        {/* Mata Hitam Bulat */}
        <rect x="4" y="6" width="2" height="1.5" fill="#1E1B4B" />
        <rect x="10" y="6" width="2" height="1.5" fill="#1E1B4B" />

        {/* Moncong & Hidung (Hitam & Ungu Tua) */}
        <path d="M7 7h2v2H7z" fill="#312E81" />
        <path d="M6 9h4v1H6zm1 1h2v1H7z" fill="#1E1B4B" />

        {/* Bintang Kuning Berkedip (Hanya muncul saat chat tertutup) */}
        {!isOpen && (
            <>
                {/* Bintang Besar kiri */}
                <path d="M1 5h1v1H1zm1-1h1v3H2zm1 1h1v1H3z" fill="#EAB308" className="animate-pulse" />
                {/* Bintang Kecil kanan atas */}
                <rect x="14" y="3" width="1" height="1" fill="#EAB308" className="animate-pulse" />
            </>
        )}
    </svg>
);

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Greetings, Adventurer! 🎮 I am your Guild Guide. Need help finding a Party or checking your Quest stats?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll ke pesan paling bawah
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { sender: "user", text: inputValue.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulasi respons bot RPG setelah 1 detik
        setTimeout(() => {
            let botResponse = "Beep boop! 👾 Adventure awaits! Try asking about 'quest', 'class', or 'admin'.";
            const text = userMessage.text.toLowerCase();

            if (text.includes("quest") || text.includes("board") || text.includes("misi")) {
                botResponse = "Check out the [QUEST BOARD] tab above to inspect dispatched guild missions and join active parties!";
            } else if (text.includes("class") || text.includes("role") || text.includes("kelas")) {
                botResponse = "IT Guild members are split into: Hacker (Developers 💻), Hipster (Designers 🎨), and Hustler (Business Strategists 💼).";
            } else if (text.includes("admin") || text.includes("dashboard")) {
                botResponse = "Log in as 'Grandmaster Admin' on the Guild Gatekeeper screen to unlock the Master System Admin Panel!";
            }

            setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
            {/* 1. Jendela Chatbot (Hanya muncul jika isOpen = true) */}
            <div
                className={`transition-all duration-300 ease-in-out origin-bottom-right ${isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-90 opacity-0 translate-y-10 pointer-events-none"
                    } mb-4 w-[350px] h-[450px] bg-white border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between`}
            >
                {/* Header Chatbot */}
                <div className="bg-retro-black p-3 flex justify-between items-center border-b-2 border-retro-black">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pixel-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pixel-green"></span>
                        </span>
                        <span className="font-pixel text-[10px] text-pixel-green tracking-wider">
                            GUILD_GUIDE.EXE
                        </span>
                    </div>
                    {/* Tombol Close [X] */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="font-pixel text-[10px] text-red-500 hover:text-red-400 select-none cursor-pointer"
                        suppressHydrationWarning
                    >
                        [X]
                    </button>
                </div>

                {/* Area Pesan Chat */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-retro-light-gray/40">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                }`}
                        >
                            <div
                                className={`p-2.5 border-2 border-retro-black text-xs leading-relaxed ${msg.sender === "user"
                                        ? "bg-navy-blue text-white rounded-br-none rounded-2xl"
                                        : "bg-white text-retro-black rounded-bl-none rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Animasi Mengetik Bot */}
                    {isTyping && (
                        <div className="mr-auto items-start max-w-[85%]">
                            <div className="p-2 border-2 border-dashed border-retro-black bg-white rounded-2xl rounded-bl-none font-pixel text-[8px] text-retro-dark-gray animate-pulse">
                                [TYPING...]
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Form Kirim Pesan */}
                <form onSubmit={handleSendMessage} className="p-3 border-t-2 border-retro-light-gray bg-white flex gap-2">
                    <input
                        type="text"
                        placeholder="Type command ('quest', 'class')..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 p-2 border-2 border-retro-black text-xs focus:outline-none focus:bg-retro-light-gray font-sans"
                        suppressHydrationWarning
                    />
                    <button
                        type="submit"
                        className="font-pixel text-[9px] px-3 bg-pixel-green text-retro-black border-2 border-retro-black hover:bg-pixel-green-dark active:translate-y-[1px] select-none cursor-pointer"
                        suppressHydrationWarning
                    >
                        SEND
                    </button>
                </form>
            </div>

            {/* 2. Tombol Pemicu Bulat Bergaya Anjing Putih RPG */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group h-16 w-16 rounded-full bg-retro-black border-4 border-white text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none cursor-pointer"
                suppressHydrationWarning
            >
                <PixelDogIcon isOpen={isOpen} />
            </button>
        </div>
    );
}