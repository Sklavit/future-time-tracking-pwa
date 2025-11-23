let activeCategory = null;
let startTime = null;
let timerInterval = null;
let logs = JSON.parse(localStorage.getItem("logs") || "[]");

// Persist active tracking state to localStorage
function saveActiveState() {
  if (activeCategory && startTime) {
    localStorage.setItem("activeState", JSON.stringify({
      category: activeCategory,
      startTime: startTime
    }));
  } else {
    localStorage.removeItem("activeState");
  }
}

// Restore active tracking state from localStorage
function restoreActiveState() {
  const saved = localStorage.getItem("activeState");
  if (saved) {
    try {
      const state = JSON.parse(saved);
      if (state.category && state.startTime) {
        activeCategory = state.category;
        startTime = state.startTime;
        document.getElementById("active-category").textContent = activeCategory;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateElapsed, 1000);
        updateElapsed();
      }
    } catch (e) {
      localStorage.removeItem("activeState");
    }
  }
}

function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function startCategory(category) {
  const now = Date.now();

  // End previous interval
  if (activeCategory && startTime) {
    logs.push({
      category: activeCategory,
      start: startTime,
      end: now,
      durationSec: Math.floor((now - startTime) / 1000)
    });
    localStorage.setItem("logs", JSON.stringify(logs));
  }

  // If Stop button clicked, just stop tracking
  if (category === "Stop") {
    activeCategory = null;
    startTime = null;
    document.getElementById("active-category").textContent = "None";
    document.getElementById("elapsed").textContent = "00:00:00";
    if (timerInterval) clearInterval(timerInterval);
    saveActiveState();
    return;
  }

  // Start new
  activeCategory = category;
  startTime = now;
  document.getElementById("active-category").textContent = category;

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateElapsed, 1000);
  updateElapsed();
  saveActiveState();
}

function updateElapsed() {
  if (!startTime) return;
  const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("elapsed").textContent = formatTime(elapsedSec);
}

function exportLogs() {
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "time-logs.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll("#categories button").forEach(btn =>
  btn.addEventListener("click", () => startCategory(btn.dataset.category))
);
document.getElementById("export").addEventListener("click", exportLogs);

// Restore state on page load
restoreActiveState();

// Handle iOS app lifecycle - save state when app goes to background
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveActiveState();
  } else if (document.visibilityState === "visible") {
    // Restore and restart timer when returning to app
    restoreActiveState();
  }
});

// Handle iOS Safari's bfcache (back-forward cache)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    restoreActiveState();
  }
});

// Save state before page unload (helps with iOS termination)
window.addEventListener("pagehide", () => {
  saveActiveState();
});
