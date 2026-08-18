import { usersData } from "../data/users.js";
import { projectsData } from "../data/projects.js";

export { usersData, projectsData };

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
    localStorage.setItem("currentUser", "none");
  } catch (e) {
    console.error("Failed to remove currentUser from localStorage", e);
  }
  triggerAuthChange();
}
