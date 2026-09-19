"use client";

import React, { useState, useEffect, useCallback } from "react";

const TYPE_CONFIG = {
  success: {
    badge: "✓",
    icon: "🎉",
    defaultTitle: "GUILD VICTORY // MISSION COMPLETE",
    borderColor: "border-pixel-green",
    accentBg: "bg-emerald-950/80",
    iconBorder: "border-emerald-500",
    barColor: "bg-pixel-green",
    titleColor: "text-pixel-green",
    indicatorColor: "bg-pixel-green",
  },
  error: {
    badge: "✕",
    icon: "☠️",
    defaultTitle: "CRITICAL ALERT // ACTION FAILED",
    borderColor: "border-red-500",
    accentBg: "bg-red-950/80",
    iconBorder: "border-red-500",
    barColor: "bg-red-500",
    titleColor: "text-red-400",
    indicatorColor: "bg-red-500",
  },
  warning: {
    badge: "!",
    icon: "⚠️",
    defaultTitle: "ACCESS DENIED // RESTRICTED",
    borderColor: "border-yellow-400",
    accentBg: "bg-yellow-950/80",
    iconBorder: "border-yellow-400",
    barColor: "bg-yellow-400",
    titleColor: "text-yellow-300",
    indicatorColor: "bg-yellow-400",
  },
  info: {
    badge: "i",
    icon: "📜",
    defaultTitle: "GUILD DISPATCH // NOTICE",
    borderColor: "border-cyan-400",
    accentBg: "bg-cyan-950/80",
    iconBorder: "border-cyan-400",
    barColor: "bg-cyan-400",
    titleColor: "text-cyan-300",
    indicatorColor: "bg-cyan-400",
  },
};

export default function RetroNotification() {
  const [toasts, setToasts] = useState([]);

  // Hapus toast berdasarkan ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Tambah toast baru
  const addToast = useCallback((toastData) => {
    const id = toastData.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const duration = toastData.duration || 4000;
    const type = toastData.type && TYPE_CONFIG[toastData.type] ? toastData.type : "info";
    const title = toastData.title || TYPE_CONFIG[type].defaultTitle;

    const newToast = {
      ...toastData,
      id,
      type,
      title,
      duration,
      createdAt: Date.now(),
    };

    setToasts((prev) => [newToast, ...prev.slice(0, 3)]); // Maksimal 4 notif bersamaan
  }, []);

  useEffect(() => {
    // 1. Dengarkan custom event 'partyup-notification'
    const handleNotificationEvent = (e) => {
      if (e.detail) {
        addToast(e.detail);
      }
    };
    window.addEventListener("partyup-notification", handleNotificationEvent);

    // 2. Intercept window.alert bawaan browser agar otomatis berubah jadi Retro Toast seragam
    const originalAlert = window.alert;
    window.alert = (message) => {
      const msgStr = typeof message === "string" ? message : JSON.stringify(message);

      let detectedType = "info";
      let detectedTitle = "GUILD DISPATCH // NOTICE";

      if (
        msgStr.includes("🎉") ||
        msgStr.includes("BERHASIL") ||
        msgStr.includes("SUCCESS") ||
        msgStr.includes("TERBENTUK")
      ) {
        detectedType = "success";
        detectedTitle = "PARTY FORMED // LEVEL UP!";
      } else if (
        msgStr.includes("⚠️") ||
        msgStr.includes("DENIED") ||
        msgStr.includes("DITOLAK") ||
        msgStr.includes("RESTRICTED")
      ) {
        detectedType = "warning";
        detectedTitle = "ACCESS WARNING // NOTICE";
      } else if (
        msgStr.includes("BANNED") ||
        msgStr.includes("SECURITY") ||
        msgStr.includes("FAILED") ||
        msgStr.includes("ERROR")
      ) {
        detectedType = "error";
        detectedTitle = "SECURITY ALERT // ACTION BLOCKED";
      }

      addToast({
        message: msgStr,
        type: detectedType,
        title: detectedTitle,
        duration: 4500,
      });
    };

    return () => {
      window.removeEventListener("partyup-notification", handleNotificationEvent);
      window.alert = originalAlert;
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed top-5 right-5 z-[999999] flex flex-col gap-3 pointer-events-none max-w-sm sm:max-w-md w-full px-3 sm:px-0 select-none"
    >
      {toasts.map((toast) => {
        const config = TYPE_CONFIG[toast.type] || TYPE_CONFIG.info;

        return (
          <SingleToast
            key={toast.id}
            toast={toast}
            config={config}
            onClose={() => removeToast(toast.id)}
          />
        );
      })}
    </aside>
  );
}

function SingleToast({ toast, config, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  return (
    <div
      role="alert"
      className="pointer-events-auto bg-[#0f172a]/95 backdrop-blur-md border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden text-white transition-all duration-300 transform animate-in slide-in-from-top-4 fade-in hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
    >
      {/* 1. RETRO TOP TITLE BAR */}
      <div className="bg-[#182338] border-b-4 border-retro-black px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full ${config.indicatorColor} animate-ping`} />
          <span className={`font-pixel text-[8px] sm:text-[8.5px] ${config.titleColor} tracking-wider uppercase truncate`}>
            // {toast.title}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="font-pixel text-[8px] text-gray-400 hover:text-white bg-[#142036] hover:bg-[#1e2f50] border-2 border-retro-black px-1.5 py-0.5 rounded cursor-pointer transition-colors active:translate-y-[1px]"
        >
          ✕ [ESC]
        </button>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="p-4 flex items-start gap-3.5">
        {/* Retro Icon Container */}
        <div
          className={`w-10 h-10 rounded-xl ${config.accentBg} border-2 ${config.iconBorder} flex items-center justify-center text-xl shrink-0 shadow-inner`}
        >
          {config.icon}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0 pt-0.5">
          <p className="font-sans text-xs text-gray-100 font-medium leading-relaxed break-words">
            {toast.message}
          </p>
        </div>
      </div>

      {/* 3. RETRO TIMER PROGRESS BAR */}
      <div className="w-full bg-[#142036] h-1.5 overflow-hidden">
        <div
          className={`h-full ${config.barColor} transition-all ease-linear`}
          style={{
            animation: `shrinkWidth ${toast.duration}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
