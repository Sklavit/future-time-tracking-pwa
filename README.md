⏱️ Time Tracker PWA

A lightweight, privacy-first time tracker that runs entirely in your browser — no accounts, no servers, no data collection.
Designed for people who want to track how they spend time with one-tap category switching.

🚀 Features

Instant category switching:
Tap a category button — the previous timer stops, and a new one starts automatically.
Perfect for task-focused or context-switching workflows.

Live elapsed-time display:
See how long you’ve been in the current category in real time.

Offline-first & serverless:
Works fully offline once installed. All data stays on your device using localStorage.

Automatic daily summaries:
View total time spent per category each day.

Simple histogram analytics:
Visualize the last 7 days of activity for any category.

Data ownership:
Export all logs as JSON (for backup or analysis in Excel/Numbers).

🛠️ How It Works

Tap a category (e.g. Work, Study, Break).
The app ends the previous timer and starts a new one instantly.

Elapsed time updates every second.

Logs are stored locally (timestamp, category, duration).

Daily summary and histogram update automatically.

📱 Installation (iPhone / iPad / Desktop)

Open the hosted page in Safari (or any browser supporting PWAs).

Tap Share → Add to Home Screen.

Launch it from your Home Screen — it runs like a native app, even offline.

(You can host it yourself on GitHub Pages or any static HTTPS server.)

💾 Data Storage

All time logs are stored in the browser’s localStorage.
No information leaves your device. Clearing browser data will remove all records.

🧩 Tech Stack

HTML5, CSS, JavaScript

PWA standard (manifest + service worker)

Canvas API for histogram rendering

LocalStorage for persistence

📊 Example Use Cases

Personal productivity tracking

Study or work session logging

Habit or project time budgeting

Context switching analytics (e.g. coding vs meetings)

🧠 Roadmap Ideas

CSV export

Daily automatic rollover

Category editing & custom colors

Optional data sync (Google Drive / Dropbox)

Enhanced charts with zoom & filters

🪶 License

MIT License — use, modify, and share freely.
