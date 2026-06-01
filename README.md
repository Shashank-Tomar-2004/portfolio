# Portfolio OS

Interactive desktop-style portfolio for Shashank Tomar. The site opens like an operating system and lets visitors choose the workspace that fits their goal: recruiter screening, engineering proof, or full exploration.

Live site: https://shashank-tomar.vercel.app/

## What It Does

- Mode chooser landing screen with Recruiter, Engineer, and Explore workspaces.
- Desktop shell with draggable/resizable windows, taskbar, launcher, control center, and persistent settings.
- Recruiter mode for quick resume/contact/project signal.
- Engineer mode with VS Code, terminal, browser, and project proof.
- Explore mode with media, weather, games, notes, calendar, notifications, and OS-like extras.
- Mobile layout with app grid and full-screen app views.

## Apps

- About Me
- Resume PDF viewer
- Contact
- Projects
- Recruiter Checklist
- VS Code-style project explorer with copyable source snippets and GitHub raw fallback
- Terminal
- Chrome-style browser
- Settings
- AI Counselor
- Spotify
- YouTube
- Live weather search
- Notes
- Calendar
- Notifications
- Commands
- Calculator
- Trash
- Snake
- Memory
- Reflex

## OS Features

- Light/dark mode
- Opaque or heavy-blur menu surfaces
- Brightness and volume controls
- Wi-Fi and sound toggles
- Dock magnification
- Taskbar icon tooltips
- Drag-to-reorder taskbar icons
- Ctrl+Space launcher shortcut
- Esc closes launcher/control center
- Persistent settings via `localStorage`
- Persistent notes
- Persistent window position memory
- First-visit onboarding hint
- Now Playing and system-status widgets
- Desktop right-click context menu
- Lock screen with unlock/switch-user flow
- Edge snapping for dragged windows
- Per-window AI shortcut in the titlebar
- Softer rounded surfaces and less aggressive borders

## Tech Stack

- React
- Tailwind CSS
- Lucide React
- GSAP loaded at runtime for shell/window motion
- Open-Meteo API for weather
- Vercel/serverless API route for Gemini-backed AI responses

## Local Setup

```bash
npm install
npm start
```

The app runs at `http://localhost:3000` by default.

For AI features, create `.env.local`:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

## Build

```bash
npm run build
```

## Deployment

This project is ready for Vercel.

Set this environment variable in Vercel if using AI:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

## Notes

The VS Code app intentionally shows a curated project tree instead of dumping every file. It attempts to fetch raw GitHub files first and falls back to local curated snippets, which keeps the portfolio fast, readable, and interview-friendly.
