/**
 * Global Notification Helper for PartyUp
 * Dispatches custom events to show retro pixel-styled toasts.
 */

export const notify = (message, type = "info", title = null, duration = 4000) => {
  if (typeof window === "undefined") return;

  const event = new CustomEvent("partyup-notification", {
    detail: {
      id: "toast-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      message: typeof message === "string" ? message : JSON.stringify(message),
      type: type || "info", // "success" | "error" | "warning" | "info"
      title,
      duration,
    },
  });
  window.dispatchEvent(event);
};

notify.success = (message, title = "SUCCESS // GUILD COMPLETE", duration = 4000) => {
  notify(message, "success", title, duration);
};

notify.error = (message, title = "ALERT // ACTION FAILED", duration = 4500) => {
  notify(message, "error", title, duration);
};

notify.warning = (message, title = "WARNING // ACCESS RESTRICTED", duration = 4000) => {
  notify(message, "warning", title, duration);
};

notify.info = (message, title = "GUILD NOTICE // DISPATCH", duration = 3500) => {
  notify(message, "info", title, duration);
};

export default notify;
