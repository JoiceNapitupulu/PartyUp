"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Pika pika! ⚡ Salam, Petualang! Aku Pikachu, Resepsionis Guild kamu. Butuh bantuan cari Party atau cek statistik Misi?"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll ke pesan paling bawah
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Fungsi Kirim Pesan Menembak API Route Groq AI (/api/chat)
    const handleSendMessage = async (e, customText = null) => {
        if (e) e.preventDefault();
        const textToSend = customText || inputValue;
        if (!textToSend.trim() || isTyping) return;

        const userMessage = { sender: "user", text: textToSend.trim() };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        if (!customText) setInputValue("");
        setIsTyping(true);

        try {
            // Format riwayat pesan untuk API Groq
            const apiPayload = updatedMessages.map((m) => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiPayload }),
            });

            const data = await res.json();
            const botReply = data.text || "Pika pika! ⚡ Terjadi kesalahan sistem.";

            // Matikan indikator "thinking" sebelum mulai mengetik
            setIsTyping(false);

            // Efek mengetik huruf demi huruf secara modern
            setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < botReply.length) {
                    setMessages((prev) => {
                        const lastMsg = prev[prev.length - 1];
                        const updatedLastMsg = { ...lastMsg, text: botReply.slice(0, i + 1) };
                        return [...prev.slice(0, prev.length - 1), updatedLastMsg];
                    });
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 18); // Kecepatan ketik (18ms)

        } catch (error) {
            console.error("Chat error:", error);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Pika pika! ⚡ Koneksi ke Groq AI terputus." }
            ]);
        }
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
        <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end pointer-events-none selection:bg-yellow-400 selection:text-black">

            {/* 1. Jendela Chatbot */}
            <div
                className={`transition-all duration-300 ease-in-out origin-bottom-right ${isOpen
                        ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
                        : "scale-90 opacity-0 translate-y-10 pointer-events-none"
                    } mb-2 w-[360px] sm:w-[430px] h-[520px] max-h-[80vh] bg-[#121b2d] text-white border-4 border-retro-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden rounded-xl`}
            >
                {/* Header Chatbot */}
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
                                PIKACHUAI
                            </span>
                            <span className="font-pixel text-[7px] text-pixel-green">
                                ● GROQ_AI_LLAMA3
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="font-pixel text-[10px] text-red-400 hover:text-red-500 select-none cursor-pointer bg-transparent border-none px-2"
                        suppressHydrationWarning
                    >
                        [X] TUTUP
                    </button>
                </div>

                {/* Area Pesan Chat */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#0c1322]">

                    {/* CHIPS PERTANYAAN CEPAT */}
                    <div className="bg-[#121b2d] p-2.5 border-2 border-retro-black rounded text-left flex flex-col gap-1.5">
                        <span className="font-pixel text-[8px] text-yellow-400">// PERTANYAAN CEPAT:</span>
                        <div className="grid grid-cols-2 gap-1.5">
                            <button
                                type="button"
                                                                onClick={() => handleSendMessage(null, "Bagaimana cara gabung party?")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-yellow-300 border border-yellow-400/40 hover:border-yellow-400 text-left rounded cursor-pointer"
                            >
                                ⚔️ Gabung Party? ▶
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSendMessage(null, "What is Gemastik 2026?")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-sky-300 border border-sky-400/40 hover:border-sky-400 text-left rounded cursor-pointer"
                            >
                                📜 Gemastik 2026? ▶
                            </button>
                            <button
                                type="button"
                                                                onClick={() => handleSendMessage(null, "Jelaskan 10 Class Role")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-pixel-green border border-pixel-green/40 hover:border-pixel-green text-left rounded cursor-pointer"
                            >
                                🛡️ Info 10 Role ▶
                            </button>
                            <button
                                type="button"
                                                                onClick={() => handleSendMessage(null, "Cara akses Admin?")}
                                className="font-pixel text-[7px] p-1.5 bg-[#1c2a4a] text-red-300 border border-red-400/40 hover:border-red-400 text-left rounded cursor-pointer"
                            >
                                👑 Panel Admin ▶
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
                                        {copiedIndex === index ? "✓ DISALIN" : "📋 Salin"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Animasi Mengetik Groq AI */}
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
                                [PIKACHU SEDANG BERPIKIR...]
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Form Kirim Pesan */}
                <form onSubmit={handleSendMessage} className="p-3 border-t-2 border-retro-black bg-[#121b2d] flex gap-2 items-center shrink-0">
                    <input
                        type="text"
                        placeholder="Ketik perintah ('misi', 'kelas')..."
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
                        title={isTyping ? "Sedang memproses..." : "Kirim Pesan"}
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

            {/* 2. Tombol Pemicu Melayang - Pikachu GIF */}
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