import { usersData } from "../data/users.js";
import { projectsData } from "../data/projects.js";

export { usersData, projectsData };

// 10 Official Software Engineering RPG Class Roles
export const OFFICIAL_ROLES = [
  "Product Manager (PM)",
  "Project / Scrum Master",
  "UI/UX Designer",
  "UX Researcher",
  "Frontend Developer",
  "Backend Developer",
  "Full-stack Developer",
  "Mobile App Developer",
  "QA (Quality Assurance) Engineer",
  "DevOps Engineer"
];

// Standard Dynamic Level Calculation Formula (Blueprint Section 3)
// Level (LV.) = (Total Mastered Skills × 2) + (Semester × 2) + (Completed Quests × 3)
export function calculateUserLevel(user) {
  if (!user) return 1;
  if (user.role?.toLowerCase() === "admin" || user.user_id === "USR-000") {
    return 99;
  }
  const skillsCount = Array.isArray(user.skills) ? user.skills.length : 0;
  const semester = Number(user.semester) || 1;
  const portfolioCount = Array.isArray(user.portfolio) ? user.portfolio.length : 0;
  const bonusXp = Number(user.bonusXp) || 0;

  const baseLevel = (skillsCount * 2) + (semester * 2) + (portfolioCount * 3) + Math.floor(bonusXp / 100);
  return Math.max(1, baseLevel);
}

// Dispatch simulated auth state change to sync client-side layouts safely
export function triggerAuthChange() {
  if (typeof window !== "undefined") {
    try {
      const event = new Event("auth-change");
      window.dispatchEvent(event);
    } catch (e) {
      // Fallback for older browsers or sandboxed user agents
      try {
        const event = document.createEvent("Event");
        event.initEvent("auth-change", true, true);
        window.dispatchEvent(event);
      } catch (err) {
        console.error("Failed to dispatch auth-change event", err);
      }
    }
  }
}

// Safely retrieve the current active user from storage, defaulting to USR-001 (Joice)
export function getCurrentUser() {
  if (typeof window === "undefined") {
    return usersData[0];
  }
  try {
    const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
    if (isLoggedOut) {
      return null;
    }
    const stored = localStorage.getItem("currentUser");
    if (stored === "none") {
      return null;
    }
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read currentUser from localStorage", e);
  }
  return usersData[0]; // Fallback to Joice
}

// Safely persist user credentials in localStorage and broadcast layout update event
export function setCurrentUser(user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("isLoggedOut", "false");
    localStorage.setItem("currentUser", JSON.stringify(user));
  } catch (e) {
    console.error("Failed to write currentUser to localStorage", e);
  }
  triggerAuthChange();
}

// Safely terminate active user session and broadcast state change
export function logoutUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("isLoggedOut", "true");
    localStorage.removeItem("currentUser");
  } catch (e) {
    console.error("Failed to remove currentUser from localStorage", e);
  }
  triggerAuthChange();
}

// Safely retrieve full users list from localStorage or fallback to mock database
export function getStoredUsers() {
  if (typeof window === "undefined") return usersData;
  try {
    const stored = localStorage.getItem("usersList");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read usersList from localStorage", e);
  }
  return usersData;
}

// Safely retrieve full projects list from localStorage or fallback to mock database
export function getStoredProjects() {
  if (typeof window === "undefined") return projectsData;
  try {
    const stored = localStorage.getItem("projectsList");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read projectsList from localStorage", e);
  }
  return projectsData;
}

