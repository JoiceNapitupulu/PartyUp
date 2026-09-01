"use client";

import { useState, useEffect } from "react";

// Kamus Terjemahan Global Komplit Lomba (EN / ID)
export const translations = {
    EN: {
        // 1. GLOBAL HEADER & FOOTER
        questBoard: "ACTIVE QUESTS",
        showcase: "FINISHED LOGS",
        timeline: "TIMELINE",
        guide: "GUIDE",
        quiz: "QUIZ",
        adminControl: "ADMIN CONTROL",
        exit: "[EXIT]",
        loginBtn: "LOG IN",
        signUpBtn: "SIGN UP",
        sysStatus: "SYSTEM STATUS: ONLINE",
        version: "VERSION: 2.0.0-PRO",
        rights: "ALL RIGHTS RESERVED.",
        buildingSmarter: "Building Smarter Communities Through Digital Learning.",
        announcementPrefix: "👑 GUILD BROADCAST: ",

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
        guildQuestBoard: "[GUILD ACTIVE QUESTS]",
        boardDesc: "Filter through active party quests or dispatch your own request to find comrades.",
        dispatchQuestBtn: "+ DISPATCH QUEST",
        searchLabel: "SEARCH KEYWORDS",
        classLabel: "REQUIRED CLASS",
        typeLabel: "QUEST TYPE",
        allClasses: "All Classes",
        allCategories: "All Categories",
        noActiveQuest: "NO ACTIVE QUESTS MATCH YOUR FILTERS.",
        resetFilter: "RESET FILTERS",
        verifiedBadge: "★ GUILD VERIFIED",

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
        projectsTab: "FINISHED LOGS",
        boardTab: "ACTIVE QUESTS",
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
        adminDesc: "Directly syncs to Active Quests and Member Profiles in real-time.",
        adminRoleLabel: "ROLE: GRAND_MASTER",
        totalRegistered: "TOTAL REGISTERED",
        liveBoardQuests: "LIVE BOARD QUESTS",
        bannedAccounts: "BANNED ACCOUNTS",
        systemEngine: "SYSTEM ENGINE",
        adventurerDirectory: "ADVENTURER DIRECTORY MODERATION",
        assignClassRole: "ASSIGN CLASS ROLE:",
        lockedClass: "[LOCKED IN MASTER CLASS]",
        loginAsBtn: "[LOGIN AS]",
        banBtn: "BLOCK",
        unbanBtn: "UNBLOCK",
        guildQuestAudit: "GUILD QUEST AUDIT BOARD",
        deleteQuestBtn: "[DELETE QUEST]",
        verifyQuestBtn: "[★ VERIFY]",
        unverifyQuestBtn: "[UNVERIFY]"
    },
    ID: {
        // 1. GLOBAL HEADER & FOOTER
        questBoard: "MISI PAPAN AKTIF",
        showcase: "CATATAN PROYEK SELESAI",
        timeline: "LINIMASA",
        guide: "PANDUAN",
        quiz: "KUIS RPG",
        adminControl: "KONTROL ADMIN",
        exit: "[KELUAR]",
        loginBtn: "MASUK",
        signUpBtn: "DAFTAR",
        sysStatus: "STATUS SISTEM: ONLINE",
        version: "VERSI: 2.0.0-PRO",
        rights: "HAK CIPTA DILINDUNGI.",
        buildingSmarter: "Membangun Komunitas Cerdas Melalui Pembelajaran Digital.",
        announcementPrefix: "👑 BROADCAST GUILD: ",

        // 2. LANDING PAGE (HOME)
        heroTitle: "RAKIT TIM IT TERKUATMU!",
        heroDesc: "Platform mabar pencarian rekan tim paling seru buat mahasiswa IT. Cari teman koding, ikuti hackathon, dan naikkan level keahlianmu bareng-bareng!",
        browseQuests: "JELAJAHI MISI AKTIF",
        enterGuild: "MASUK KE GUILD",

        // 3. LOGIN PAGE
        gatekeeper: "[GERBANG GUILD]",
        loginDesc: "Masukkan kredensial mahasiswa kamu untuk masuk ke Quest Hub.",
        usernameLabel: "NAMA PETUALANG / USERNAME",
        passwordLabel: "KUNCI KEAMANAN / PASSWORD",
        warningPrefix: "PERINGATAN: ",
        quickStart: "MASUK CEPAT (PROFIL AKUN AKADEMIK)",
        newAdventurer: "Petualang baru?",
        createCharLink: "BUAT KARAKTER BARU >",

        // 4. REGISTER PAGE (CHARACTER CREATION)
        charCreation: "[LOKASI BUAT KARAKTER]",
        registerDesc: "Bergabunglah dengan Guild. Sesuaikan profil mahasiswa, pilih kelas RPG favoritmu, dan bersiaplah bertualang.",
        charDetails: "DETAIL KARAKTER",
        realName: "NAMA LENGKAP",
        guildUniversity: "GUILD (UNIVERSITAS / KAMPUS)",
        prodiMajor: "PROGRAM STUDI / JURUSAN",
        skillInventory: "INVENTORI SKILL (PISAHKAN DENGAN KOMA)",
        charBio: "BIO PETUALANG",
        selectClass: "PILIH KELAS RPG",
        classBaseStats: "STATISTIK DASAR KELAS",
        spawnCharBtn: "TERBITKAN KARAKTER",

        // 5. QUEST BOARD PAGE
        guildQuestBoard: "[ MISI PAPAN AKTIF ]",
        boardDesc: "Filter misi-misi aktif untuk mabar tim, atau buat postingan kamu sendiri untuk cari teman tim lomba.",
        dispatchQuestBtn: "+ TERBITKAN MISI",
        searchLabel: "CARI KATA KUNCI",
        classLabel: "KELAS DIPERLUKAN",
        typeLabel: "KATEGORI MISI",
        allClasses: "Semua Kelas",
        allCategories: "Semua Kategori",
        noActiveQuest: "TIDAK ADA MISI YANG COCOK DENGAN PENCARIAN.",
        resetFilter: "RESET FILTER",
        verifiedBadge: "★ TERVERIFIKASI GUILD",

        // 6. QUEST DETAILS MODAL (POP-UP)
        questSpec: "[LEMBAR SPESIFIKASI MISI]",
        questOverview: "// GAMBARAN MISI:",
        targetComp: "// TARGET LOMBA / KAPSTON:",
        coreFramework: "// TEKNOLOGI UTAMA:",
        rolesRequired: "// SLOT TIM DIPERLUKAN:",
        partyCollabs: "// STATUS KOLABORASI:",
        eligibility: "// KRITERIA ANGGOTA:",
        dispatchedBy: "DITERBITKAN OLEH:",
        roleLabel: "PERAN:",
        applyPartyBtn: "GABUNG TIM",
        applying: "MENGIRIM...",
        applied: "TERKIRIM ✓",
        filled: "PENUH",

        // 7. PROFILE PAGE (MEMBER SHEET)
        memberSheet: "[LEMBAR PROFIL ANGGOTA]",
        profileDesc: "Pantau statistik level, misi aktif diterbitkan, dan portofolio proyek selesai.",
        switchProfile: "GANTI PROFIL AKUN:",
        overviewTab: "RINGKASAN",
        projectsTab: "CATATAN SELESAI",
        boardTab: "MISI AKTIF",
        skillsTab: "SKILL & INVENTORI",
        guildAliasBio: "BIO ALIAS GUILD",
        guildActions: "AKSI GUILD",
        activateCreativeBtn: "AKTIFKAN JALUR KREATIF",
        activeQuests: "[MISI AKTIF DITERBITKAN]",
        noActiveQuestsDetected: "BELUM ADA MISI AKTIF DITERBITKAN",
        historicalLogs: "[PORTOFOLIO & KARYA SELESAI]",
        noHistoricalWork: "BELUM ADA PORTOFOLIO SELESAI",
        skillsBadges: "[LENCANA SKILL TERKUASAI]",
        classAttributes: "[ATRIBUT & STATISTIK KELAS]",

        // 8. ADMIN DASHBOARD
        adminConsole: "[KONSOL GUILD MASTER]",
        adminDesc: "Tersinkronisasi langsung ke Misi Papan Aktif dan Profil Anggota secara real-time.",
        adminRoleLabel: "PERAN: GUILD_MASTER",
        totalRegistered: "TOTAL ANGGOTA TERDAFTAR",
        liveBoardQuests: "MISI PAPAN AKTIF",
        bannedAccounts: "AKUN DIBLOKIR",
        systemEngine: "SISTEM UTAMA",
        adventurerDirectory: "MODERASI DIREKTORI MAHASISWA",
        assignClassRole: "UBAH PERAN KELAS:",
        lockedClass: "[TERKUNCI DI KELAS MASTER]",
        loginAsBtn: "[MASUK SEBAGAI]",
        banBtn: "BLOKIR",
        unbanBtn: "PULIHKAN",
        guildQuestAudit: "AUDIT PAPAN MISI GUILD",
        deleteQuestBtn: "[HAPUS MISI]",
        verifyQuestBtn: "[★ VERIFIKASI]",
        unverifyQuestBtn: "[BATALKAN VERIFIKASI]"
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