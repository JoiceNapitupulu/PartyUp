"use client";

import { useState, useEffect } from "react";

// Kamus Terjemahan Global Komplit Lomba (EN / ID)
export const translations = {
    EN: {
        // 1. GLOBAL HEADER & FOOTER
        questBoard: "QUEST BOARD",
        showcase: "SHOWCASE",
        timeline: "TIMELINE",
        guide: "GUIDE",
        adminControl: "ADMIN CONTROL",
        exit: "[EXIT]",
        loginBtn: "LOG IN",
        signUpBtn: "SIGN UP",
        sysStatus: "SYSTEM STATUS: ONLINE",
        version: "VERSION: 1.0.0-PRO",
        rights: "ALL RIGHTS RESERVED.",
        buildingSmarter: "Building Smarter Communities Through Digital Learning.",

        // 2. LANDING PAGE (HOME)
        heroTitle: "FORM THE ULTIMATE IT PARTY!",
        heroDesc: "The ultimate matchmaking platform for IT students. Form study groups, join hackathons, and level up your software engineering skills together.",
        browseQuests: "BROWSE ACTIVE QUESTS",
        enterGuild: "ENTER THE GUILD",

        // 3. LOGIN PAGE
        gatekeeper: "[GUILD GATEKEEPER]",
        loginDesc: "Enter your student credentials to log into the Quest Hub.",
        usernameLabel: "ADVENTURER NAME / USERNAME",
        passwordLabel: "SECURITY KEY / PASSWORD",
        warningPrefix: "WARNING: ",
        quickStart: "QUICK START (LOAD MOCK DB ADVENTURERS)",
        newAdventurer: "New adventurer?",
        createCharLink: "CREATE CHARACTER >",

        // 4. REGISTER PAGE (CHARACTER CREATION)
        charCreation: "[CHARACTER CREATION SCREEN]",
        registerDesc: "Join the Guild. Customize your student credentials, choose your class, and prepare to party up.",
        charDetails: "CHARACTER DETAILS",
        realName: "REAL NAME",
        guildUniversity: "GUILD (UNIVERSITY)",
        prodiMajor: "PRODI (MAJOR)",
        skillInventory: "SKILL INVENTORY (COMMA SEPARATED)",
        charBio: "CHARACTER BIO",
        selectClass: "SELECT RPG CLASS",
        classBaseStats: "CLASS BASE STATISTICS",
        spawnCharBtn: "SPAWN CHARACTER",

        // 5. QUEST BOARD PAGE
        guildQuestBoard: "[GUILD QUEST BOARD]",
        boardDesc: "Filter through active party quests or dispatch your own request to find comrades.",
        dispatchQuestBtn: "+ DISPATCH QUEST",
        searchLabel: "SEARCH KEYWORDS",
        classLabel: "REQUIRED CLASS",
        typeLabel: "QUEST TYPE",
        allClasses: "All Classes",
        allCategories: "All Categories",
        noActiveQuest: "NO ACTIVE QUESTS MATCH YOUR FILTERS.",
        resetFilter: "RESET FILTERS",

        // 6. QUEST DETAILS MODAL (POP-UP)
        questSpec: "[QUEST SPECIFICATION SHEET]",
        questOverview: "// QUEST OVERVIEW:",
        targetComp: "// TARGET COMPETITION:",
        coreFramework: "// CORE FRAMEWORK:",
        rolesRequired: "// ROLES REQUIRED (PARTY SIZE):",
        partyCollabs: "// PARTY COLLABS:",
        eligibility: "// ELIGIBILITY CRITERIA:",
        dispatchedBy: "DISPATCHED BY:",
        roleLabel: "ROLE:",
        applyPartyBtn: "JOIN PARTY",
        applying: "SENDING...",
        applied: "APPLIED ✓",
        filled: "FILLED",

        // 7. PROFILE PAGE (MEMBER SHEET)
        memberSheet: "[GUILD MEMBER SHEET]",
        profileDesc: "Inspect student stats, active quests, and completed historical achievements.",
        switchProfile: "SWITCH PROFILE:",
        overviewTab: "OVERVIEW",
        projectsTab: "PROJECTS",
        boardTab: "PROJECT BOARD",
        skillsTab: "SKILLS & INVENTORY",
        guildAliasBio: "GUILD ALIAS BIO",
        guildActions: "GUILD ACTIONS",
        activateCreativeBtn: "ACTIVATE CREATIVE PATH",
        activeQuests: "[YOUR ACTIVE DISPATCHED QUESTS]",
        noActiveQuestsDetected: "NO ACTIVE QUESTS DETECTED",
        historicalLogs: "[PORTFOLIO & FINISHED WORK LOGS]",
        noHistoricalWork: "NO HISTORICAL WORK LOGS DETECTED",
        skillsBadges: "[SKILL INVENTORY BADGES]",
        classAttributes: "[CLASS ATTRIBUTES & STATISTICS]",

        // 8. ADMIN DASHBOARD
        adminConsole: "[GRAND MASTER CONSOLE]",
        adminDesc: "Directly syncs to Quest Board and Member Profiles in real-time.",
        adminRoleLabel: "ROLE: GRAND_MASTER",
        totalRegistered: "TOTAL REGISTERED",
        liveBoardQuests: "LIVE BOARD QUESTS",
        bannedAccounts: "BANNED ACCOUNTS",
        systemEngine: "SYSTEM ENGINE",
        adventurerDirectory: "ADVENTURER DIRECTORY MODERATION",
        assignClassRole: "ASSIGN CLASS ROLE:",
        lockedClass: "[LOCKED IN MASTER CLASS]",
        loginAsBtn: "[LOGIN AS]",
        banBtn: "BLOKIR",
        unbanBtn: "PULIHKAN",
        guildQuestAudit: "GUILD QUEST AUDIT BOARD",
        deleteQuestBtn: "[DELETE QUEST]"
    },
    ID: {
        // 1. GLOBAL HEADER & FOOTER
        questBoard: "PAPAN MISI",
        showcase: "PAMERAN KARYA",
        timeline: "LINIMASA",
        guide: "PANDUAN",
        adminControl: "KONTROL ADMIN",
        exit: "[EKSIT]",
        loginBtn: "MASUK",
        signUpBtn: "DAFTAR",
        sysStatus: "STATUS SISTEM: AKTIF",
        version: "VERSI: 1.0.0-PRO",
        rights: "HAK CIPTA DILINDUNGI.",
        buildingSmarter: "Membangun Komunitas Cerdas Melalui Pembelajaran Digital.",

        // 2. LANDING PAGE (HOME)
        heroTitle: "BENTUK TIM IT TERKUATMU!",
        heroDesc: "Platform kolaborasi pencarian tim terbaik khusus mahasiswa teknologi. Bentuk tim belajar, ikuti hackathon, dan naikkan level keahlian koding Anda bersama.",
        browseQuests: "JELAJAHI MISI AKTIF",
        enterGuild: "MASUK KEDALAM GUILD",

        // 3. LOGIN PAGE
        gatekeeper: "[PENJAGA GERBANG GUILD]",
        loginDesc: "Masukkan kredensial mahasiswa Anda untuk masuk ke Quest Hub.",
        usernameLabel: "NAMA PETUALANG / USERNAME",
        passwordLabel: "KUNCI KEAMANAN / PASSWORD",
        warningPrefix: "PERINGATAN: ",
        quickStart: "MASUK INSTAN (PROFIL UJI COBA KAMPUS)",
        newAdventurer: "Petualang baru?",
        createCharLink: "BUAT KARAKTER BARU >",

        // 4. REGISTER PAGE (CHARACTER CREATION)
        charCreation: "[LAYAR PENCIPTAAN KARAKTER]",
        registerDesc: "Bergabunglah dengan Guild. Sesuaikan kredensial Anda, pilih kelas, dan bersiaplah bertualang.",
        charDetails: "DETAIL KARAKTER",
        realName: "NAMA ASLI",
        guildUniversity: "GUILD (UNIVERSITAS)",
        prodiMajor: "PRODI (JURUSAN)",
        skillInventory: "DAFTAR SKILL (PISAHKAN DENGAN KOMA)",
        charBio: "BIO KARAKTER",
        selectClass: "PILIH KELAS RPG",
        classBaseStats: "STATISTIK DASAR KELAS",
        spawnCharBtn: "BUAT KARAKTER",

        // 5. QUEST BOARD PAGE
        guildQuestBoard: "[PAPAN MISI GUILD]",
        boardDesc: "Saring misi-misi aktif untuk bergabung dengan tim, atau terbitkan misi Anda sendiri untuk mencari kawan.",
        dispatchQuestBtn: "+ TERBITKAN MISI",
        searchLabel: "CARI KATA KUNCI",
        classLabel: "KELAS DIPERLUKAN",
        typeLabel: "JENIS MISI",
        allClasses: "Semua Kelas",
        allCategories: "Semua Kategori",
        noActiveQuest: "TIDAK ADA MISI YANG COCOK DENGAN FILTER SENSOR.",
        resetFilter: "RESET FILTER",

        // 6. QUEST DETAILS MODAL (POP-UP)
        questSpec: "[LEMBAR SPESIFIKASI MISI]",
        questOverview: "// GAMBARAN PROYEK:",
        targetComp: "// TARGET KOMPETISI:",
        coreFramework: "// TEKNOLOGI UTAMA:",
        rolesRequired: "// PERAN DIPERLUKAN (UKURAN TIM):",
        partyCollabs: "// STATUS KOLABORASI:",
        eligibility: "// KRITERIA KELAYAKAN:",
        dispatchedBy: "DITERBITKAN OLEH:",
        roleLabel: "PERAN:",
        applyPartyBtn: "GABUNG TIM",
        applying: "MENGIRIM...",
        applied: "DILAMAR ✓",
        filled: "TERISI",

        // 7. PROFILE PAGE (MEMBER SHEET)
        memberSheet: "[LEMBAR DATA ANGGOTA]",
        profileDesc: "Periksa statistik mahasiswa, misi aktif, dan catatan portofolio masa lalu.",
        switchProfile: "GANTI PROFIL:",
        overviewTab: "RINGKASAN",
        projectsTab: "KARYA SELESAI",
        boardTab: "PAPAN PROYEK",
        skillsTab: "SKILL & INVENTORI",
        guildAliasBio: "BIO ALIAS GUILD",
        guildActions: "AKSI GUILD",
        activateCreativeBtn: "AKTIFKAN CREATIVE PATH",
        activeQuests: "[MISI AKTIF YANG ANDA TERBITKAN]",
        noActiveQuestsDetected: "TIDAK ADA MISI AKTIF YANG TERDETEKSI",
        historicalLogs: "[PORTFOLIO & CATATAN PROYEK SELESAI]",
        noHistoricalWork: "BELUM ADA CATATAN PROYEK SELESAI",
        skillsBadges: "[LENCANA SKILL INVENTORI]",
        classAttributes: "[ATRIBUT & STATISTIK KELAS]",

        // 8. ADMIN DASHBOARD
        adminConsole: "[KONSOL GUILD MASTER]",
        adminDesc: "Tersinkronisasi langsung ke Papan Misi dan Profil Anggota secara real-time.",
        adminRoleLabel: "PERAN: GUILD_MASTER",
        totalRegistered: "TOTAL ANGGOTA TERDAFTAR",
        liveBoardQuests: "MISI PAPAN AKTIF",
        bannedAccounts: "AKUN DIBLOKIR",
        systemEngine: "SISTEM UTAMA",
        adventurerDirectory: "MODERASI DIREKTORI MAHASISWA",
        assignClassRole: "UBAH PERAN KELAS:",
        lockedClass: "[TERKUNCI DI KELAS MASTER]",
        loginAsBtn: "[LOGIN SEBAGAI]",
        banBtn: "BLOKIR",
        unbanBtn: "PULIHKAN",
        guildQuestAudit: "AUDIT PAPAN MISI GUILD",
        deleteQuestBtn: "[HAPUS MISI]"
    }
};

// 1. Membaca bahasa aktif secara aman di client-side
export const getLanguage = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("language") || "EN";
    }
    return "EN";
};

// 2. Fungsi Penerjemah Pintar t(key)
export const t = (key) => {
    const currentLang = getLanguage();
    if (translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    if (translations["EN"] && translations["EN"][key]) {
        return translations["EN"][key];
    }
    return key;
};

// 3. Custom Hook useLanguage()
export function useLanguage() {
    const [lang, setLang] = useState("EN");

    useEffect(() => {
        const handleLangChange = () => {
            setLang(getLanguage());
        };
        handleLangChange();

        window.addEventListener("language-change", handleLangChange);
        return () => window.removeEventListener("language-change", handleLangChange);
    }, []);

    return {
        lang,
        t: (key) => t(key),
    };
}