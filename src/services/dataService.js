import { supabase } from "../utils/supabase";
import { getStoredUsers, getStoredProjects } from "../utils/auth";

// 1. MODUL MAHASISWA & PROFIL (PROFILES)
export async function fetchAllProfiles() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("profiles").select("*");
            if (!error && data && data.length > 0) {
                localStorage.setItem("usersList", JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("Supabase offline, using local users fallback.");
        }
    }
    return getStoredUsers();
}

// 2. MODUL PAPAN QUEST (QUESTS)
export async function fetchAllQuests() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("quests").select("*");
            if (!error && data && data.length > 0) {
                localStorage.setItem("projectsList", JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("Supabase offline, using local quests fallback.");
        }
    }
    return getStoredProjects();
}

export async function createNewQuest(newQuest) {
    // 1. Simpan ke LocalStorage seketika (0ms)
    const currentList = getStoredProjects();
    const updated = [newQuest, ...currentList];
    localStorage.setItem("projectsList", JSON.stringify(updated));

    // 2. Kirim ke Supabase Cloud
    if (supabase) {
        try {
            await supabase.from("quests").insert([newQuest]);
        } catch (e) {
            console.error("Failed to sync new quest to Supabase", e);
        }
    }
    return updated;
}

// 3. MODUL REKRUTMEN TIM (PARTY INVITATIONS)
export async function fetchAllInvitations() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("party_invitations").select("*");
            if (!error && data) {
                localStorage.setItem("party_invitations", JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("Supabase offline, using local invitations fallback.");
        }
    }
    return JSON.parse(localStorage.getItem("party_invitations") || "[]");
}

export async function sendPartyInvitation(invitation) {
    const currentInvites = JSON.parse(localStorage.getItem("party_invitations") || "[]");
    const updated = [...currentInvites, invitation];
    localStorage.setItem("party_invitations", JSON.stringify(updated));

    if (supabase) {
        try {
            await supabase.from("party_invitations").insert([invitation]);
        } catch (e) {
            console.error("Failed to sync invitation to Supabase", e);
        }
    }
    return updated;
}

export async function updateInvitationStatus(inviteId, newStatus) {
    const currentInvites = JSON.parse(localStorage.getItem("party_invitations") || "[]");
    const updated = currentInvites.map((inv) =>
        inv.id === inviteId ? { ...inv, status: newStatus } : inv
    );
    localStorage.setItem("party_invitations", JSON.stringify(updated));

    if (supabase) {
        try {
            await supabase
                .from("party_invitations")
                .update({ status: newStatus })
                .eq("id", inviteId);
        } catch (e) {
            console.error("Failed to update invitation status on Supabase", e);
        }
    }
    return updated;
}

// 4. MODUL LAMARAN GABUNG TIM (QUEST APPLICATIONS)
export async function fetchAllApplications() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("quest_applications").select("*");
            if (!error && data) {
                localStorage.setItem("quest_applications", JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("Supabase offline, using local applications fallback.");
        }
    }
    return JSON.parse(localStorage.getItem("quest_applications") || "[]");
}

export async function sendQuestApplication(application) {
    const currentApps = JSON.parse(localStorage.getItem("quest_applications") || "[]");
    const updated = [...currentApps, application];
    localStorage.setItem("quest_applications", JSON.stringify(updated));

    if (supabase) {
        try {
            await supabase.from("quest_applications").insert([application]);
        } catch (e) {
            console.error("Failed to sync application to Supabase", e);
        }
    }
    return updated;
}

export async function updateApplicationStatus(appId, newStatus) {
    const currentApps = JSON.parse(localStorage.getItem("quest_applications") || "[]");
    const updated = currentApps.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
    );
    localStorage.setItem("quest_applications", JSON.stringify(updated));

    if (supabase) {
        try {
            await supabase
                .from("quest_applications")
                .update({ status: newStatus })
                .eq("id", appId);
        } catch (e) {
            console.error("Failed to update application status on Supabase", e);
        }
    }
    return updated;
}