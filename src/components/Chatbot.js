"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Greetings, Adventurer! 🎮 I am Pikachu, your Guild Receptionist. Need help finding a Party or checking your Quest stats?"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll ke pesan paling bawah
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const processCommand = (userInput) => {
        const text = userInput.toLowerCase();
        let botResponse = "Pika pika! ⚡ Adventure awaits! Try asking about 'quest', 'class', or 'admin'.";

        if (text.includes("quest") || text.includes("board") || text.includes("misi") || text.includes("party")) {
            botResponse = "Check out the [QUEST BOARD] tab above to inspect dispatched guild missions and join active parties!";
        } else if (text.includes("gemastik") || text.includes("invention") || text.includes("2026")) {
            botResponse = "GEMASTIK & INVENTION 2026 are premier nationwide IT competitions! Form your 3-member student parties on the Quest Board now.";
        } else if (text.includes("class") || text.includes("role") || text.includes("kelas")) {
            botResponse = "IT Guild members are split into 10 Roles: Full-stack, UI/UX, PM, Mobile Dev, QA, DevOps, and more!";
        } else if (text.includes("admin") || text.includes("dashboard")) {
            botResponse = "Log in as 'Admin' on the Guild Gatekeeper screen to unlock the Master System Admin Panel!";
        }

        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
        setIsTyping(false);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { sender: "user", text: inputValue.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            processCommand(userMessage.text);
        }, 800);
    };

    const handleQuickPrompt = (questionText) => {
        const userMessage = { sender: "user", text: questionText };
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
            processCommand(questionText);
        }, 800);
    };

    const handleCopyText = async (text, idx) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(idx);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Clipboard copy failed:", err);
        }
    };

    return (
        /* PEMBUNGKUS LUAR DIBERI pointer-events-none AGAR TIDAK PERNAH MENUTUPI KLIK MOUSE DI WEB */
        <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end pointer-events-none selection:bg-yellow-400 selection:text-black">

            {/* 1. Jendela Chatbot (Diberi pointer-events-auto saat terbuka) */}
            <div
                className={`transition-all duration-300 ease-in-out origin-bottom-right ${isOpen
                        ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
                        : "scale-90 opacity-0 translate-y-10 pointer-events-none"
                    } mb-2 w-[92vw] sm:w-[480px] md:w-[520px] h-[520px] max-h-[80vh] bg-[#121b2d] text-white border-4 border-retro-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden rounded-xl`}
            >
                {/* Header Chatbot - Receptionist Desk */}
                <div className="bg-retro-black p-3 flex justify-between items-center border-b-2 border-retro-black shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7 shrink-0">
                            <Image
                                src="/cursors/pikachu.gif"
                                alt="Pikachu Guide"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-pixel text-[9px] text-yellow-300 font-bold tracking-wider">
                                PIKACHU RECEPTIONIST
                            </span>
                            <span className="font-pixel text-[7px] text-pixel-green">
                                ● GUILD_GUIDE.EXE ONLINE
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="font-pixel text-[10px] text-red-400 hover:text-red-500 select-none cursor-pointer bg-transparent border-none px-2"
                        suppressHydrationWarning
                    >
                        [X]
                    </button>
                </div>

                {/* Area Pesan Chat */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#0c1322]">

                    {/* CHIPS PERTANYAAN CEPAT */}
                    <div className="bg-[#121b2d] p-2.5 border-2 border-retro-black rounded text-left flex flex-col gap-1.5">
                        <span className="font-pixel text-[8px] text-yellow-400">// QUICK QUESTIONS:</span>
                        <div className="grid grid-cols-2 gap-1.5">
                            <button
                                type="button"
                                onClick={() => handleQuickPrompt("How to join a party?")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-yellow-300 border border-yellow-400/40 hover:border-yellow-400 text-left rounded cursor-pointer"
                            >
                                ⚔️ Join Party? ▶
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickPrompt("What is Gemastik 2026?")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-sky-300 border border-sky-400/40 hover:border-sky-400 text-left rounded cursor-pointer"
                            >
                                📜 Gemastik 2026? ▶
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickPrompt("Explain 10 Class Roles")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-pixel-green border border-pixel-green/40 hover:border-pixel-green text-left rounded cursor-pointer"
                            >
                                🛡️ 10 Roles Info ▶
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickPrompt("How to access Admin?")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-red-300 border border-red-400/40 hover:border-red-400 text-left rounded cursor-pointer"
                            >
                                👑 Admin Panel ▶
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-1 max-w-[88%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                }`}
                        >
                            <div
                                className={`flex gap-2 items-end ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                {msg.sender === "bot" && (
                                    <div className="relative w-7 h-7 shrink-0 mb-0.5">
                                        <Image
                                            src="/cursors/pikachu.gif"
                                            alt="Pikachu"
                                            fill
                                            unoptimized
                                            className="object-contain drop-shadow"
                                        />
                                    </div>
                                )}

                                <div
                                    className={`p-2.5 border-2 border-retro-black text-xs leading-relaxed text-left ${msg.sender === "user"
                                            ? "bg-navy-blue text-white rounded-2xl rounded-br-none"
                                            : "bg-[#1c2a4a] text-white rounded-2xl rounded-bl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>

                            {msg.sender === "bot" && (
                                <div className="flex gap-2 ml-9 font-pixel text-[7px] text-gray-400">
                                    <button
                                        type="button"
                                        onClick={() => handleCopyText(msg.text, index)}
                                        className="hover:text-yellow-300 border border-gray-700 bg-retro-black/60 px-1.5 py-0.5 rounded cursor-pointer"
                                    >
                                        {copiedIndex === index ? "✓ COPIED" : "📋 Copy"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="mr-auto flex items-end gap-2 max-w-[85%]">
                            <div className="relative w-7 h-7 shrink-0 mb-0.5">
                                <Image
                                    src="/cursors/pikachu.gif"
                                    alt="Pikachu Typing"
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </div>
                            <div className="p-2 border-2 border-dashed border-yellow-400 bg-[#1c2a4a] text-white rounded-2xl rounded-bl-none font-pixel text-[8px] text-yellow-300 animate-pulse">
                                [PIKACHU IS TYPING...]
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Form Kirim Pesan */}
                <form onSubmit={handleSendMessage} className="p-3 border-t-2 border-retro-black bg-[#121b2d] flex gap-2 items-center shrink-0">
                    <input
                        type="text"
                        placeholder="Type command ('quest', 'class')..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 p-2 bg-[#1c2a4a] text-white border-2 border-retro-black text-xs focus:outline-none placeholder-gray-400 font-sans rounded"
                        suppressHydrationWarning
                    />

                    <button
                        type="submit"
                        disabled={!inputValue.trim() && !isTyping}
                        className={`w-9 h-9 border-2 border-retro-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0 rounded ${isTyping
                                ? "bg-emerald-600 text-white animate-pulse"
                                : "bg-pixel-green text-retro-black hover:bg-pixel-green-dark"
                            } disabled:opacity-40 disabled:cursor-not-allowed`}
                        title={isTyping ? "Generating..." : "Send Message"}
                        suppressHydrationWarning
                    >
                        {isTyping ? (
                            <div className="w-3.5 h-3.5 bg-white border border-black rounded-sm" />
                        ) : (
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current font-bold">
                                <path d="M12 4l-8 8h6v8h4v-8h6z" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>

            {/* 2. Tombol Pemicu Melayang - Pikachu GIF (Diberi pointer-events-auto) */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="relative w-16 h-16 shrink-0 select-none cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 bg-transparent border-none p-0 focus:outline-none pointer-events-auto"
                    suppressHydrationWarning
                >
                    <Image
                        src="/cursors/pikachu.gif"
                        alt="Pikachu Chatbot"
                        fill
                        unoptimized
                        className="object-contain drop-shadow-[2px_4px_0px_rgba(0,0,0,0.9)]"
                    />
                </button>
            )}
        </div>
    );
}