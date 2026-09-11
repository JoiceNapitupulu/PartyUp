import { supabase } from '../utils/supabase';
import { getStoredUsers, getStoredProjects } from '../utils/auth';

// Ambil Data Mahasiswa 

export async function fetchAllProfiles() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("profiles").select("*");
            if (!error && data && data.length > 0) {
                localStorage.setItem("usersList", JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("Supabase offline, using local fallback.");
        }
    }
    return getStoredUsers();
}

// 2. Ambil Data Quest (Quests)
export async function fetchAllQuests() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("quests").select("*");
            if (!error && data && data.length > 0) {
                localStorage.setItem("projectsList", JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("Supabase offline, using local fallback.");
        }
    }
    return getStoredProjects();
}

// 3. Simpan Quest Baru
export async function createNewQuest(newQuest) {
    // Simpan ke LocalStorage seketika
    const currentList = getStoredProjects();
    const updated = [newQuest, ...currentList];
    localStorage.setItem("projectsList", JSON.stringify(updated));

    // Simpan ke Supabase di background
    if (supabase) {
        try {
            await supabase.from("quests").insert([newQuest]);
        } catch (e) {
            console.error("Failed to sync new quest to Supabase", e);
        }
    }
    return updated;
}

// 4. Kirim Undangan Rekrutmen (Invitations)
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

// 5. Kirim Lamaran Quest (Applications)
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