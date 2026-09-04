"use client";

import React, { useEffect } from "react";

export default function ConfirmModal({
    isOpen,
        title = "KONFIRMASI AKSI",
    message = "Apakah kamu yakin ingin melanjutkan aksi ini?",
    confirmText = "HAPUS",
    cancelText = "BATAL",
    onConfirm,
    onCancel,
    variant = "danger",
}) {
    // 🔒 Kunci scroll body utama & aktifkan tombol keyboard ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onCancel?.();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            onClick={onCancel} // Klik area luar untuk membatalkan
            className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm select-none transition-opacity duration-200"
        >
            <div
                onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat area dalam diklik
                className="bg-[#0f172a] border-4 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white w-full max-w-md flex flex-col rounded-2xl overflow-hidden text-left relative animate-in zoom-in-95 duration-150"
            >{/* A. RETRO WINDOW TITLE BAR (Bersih Tanpa Warna-Warni) */}
                <div className="bg-[#182338] border-b-4 border-retro-black px-4 py-2.5 flex items-center justify-between shrink-0">
                    <span className="font-pixel text-[8.5px] text-pixel-green tracking-wider uppercase">
        // {title}
                    </span>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="font-pixel text-[8px] text-gray-400 hover:text-white bg-[#142036] hover:bg-[#1e2f50] border-2 border-retro-black px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                        ✕ [KELUAR]
                    </button>
                </div>

                {/* B. MODAL CONTENT BODY */}
                <div className="p-5 md:p-6 flex flex-col gap-4">

                    {/* Kotak Pesan Peringatan Retro */}
                    <div className="flex items-start gap-3.5 bg-[#182338] p-4 border-2 border-retro-black rounded-xl">
                        <div className="w-9 h-9 rounded-xl bg-red-950/70 border-2 border-red-500/50 flex items-center justify-center text-base shrink-0 shadow-inner">
                            ⚠️
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                                                        <span className="font-pixel text-[8px] text-red-400 font-bold uppercase tracking-wider">
                                PERINGATAN
                            </span>
                            <p className="font-sans text-xs text-gray-200 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons (Ergonomis & Rapih) */}
                    <div className="flex justify-end items-center gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="font-pixel text-[8.5px] py-2 px-4 bg-[#1c2a4a] hover:bg-[#253860] border-2 border-retro-black text-gray-300 hover:text-white rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] transition-all"
                        >
                            {cancelText}
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className={`font-pixel text-[8.5px] py-2 px-5 border-2 border-retro-black font-bold cursor-pointer rounded-lg active:translate-y-[1px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${variant === "danger"
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-pixel-green hover:bg-green-500 text-retro-black"
                                }`}
                        >
                            {confirmText} ➔
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}