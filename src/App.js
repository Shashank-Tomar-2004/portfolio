import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import chromeIcon from "./assets/chrome.svg";
import spotifyIcon from "./assets/spotify.svg";
import vscodeIcon from "./assets/vscode.svg";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  Bell,
  Bot,
  Brain,
  CalendarDays,
  Calculator,
  CheckCircle2,
  CloudSun,
  Code2,
  Crosshair,
  Download,
  ExternalLink,
  File,
  FileText,
  FolderOpen,
  Gamepad2,
  Github,
  Globe,
  Home,
  Linkedin,
  Mail,
  Maximize2,
  Minimize2,
  Monitor,
  Palette,
  Power,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sparkles,
  StickyNote,
  TerminalSquare,
  Trash2,
  User,
  Users,
  Volume1,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  X,
  Youtube,
} from "lucide-react";

const GSAP_URL = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
let gsapPromise = null;

const loadGsap = () => {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.gsap) return Promise.resolve(window.gsap);
  if (gsapPromise) return gsapPromise;
  gsapPromise = new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${GSAP_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.gsap || null), {
        once: true,
      });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = GSAP_URL;
    script.async = true;
    script.onload = () => resolve(window.gsap || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return gsapPromise;
};

const animateWithGsap = async (element, from, to) => {
  if (!element) return;
  const gsap = await loadGsap();
  if (!gsap) {
    Object.assign(element.style, from);
    requestAnimationFrame(() => {
      Object.assign(element.style, to);
    });
    return;
  }
  gsap.fromTo(element, from, to);
};

const useMediaQuery = (query) => {
  const getMatches = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

const normalizeUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes("localhost") || trimmed.includes(".")) {
    return `https://${trimmed}`;
  }
  return `https://www.google.com/search?igu=1&q=${encodeURIComponent(trimmed)}`;
};

const callGeminiAPI = async (prompt) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "AI request failed.");
    }
    return result.text;
  } catch (error) {
    return `I could not reach the AI service right now: ${error.message}`;
  }
};

const personalInfo = {
  name: "Shashank Tomar",
  email: "ambrosedean351@gmail.com",
  phone: "+91 8115868573",
  linkedin: "https://www.linkedin.com/in/iamshashanktomar",
  github: "https://github.com/shashank-tomar-2004",
  resume: "/Shashank_Tomar.pdf",
  intro:
    "CS student, mentor, competitive programmer, and practical builder who likes shipping interfaces that make technical depth easier to feel.",
};

const experiences = [
  {
    role: "Course Mentor Intern",
    company: "GeeksforGeeks",
    period: "Aug 2025 - Present",
    points: [
      "Teach DSA through live coding and structured doubt support.",
      "Worked with 350+ learners in guided problem-solving sessions.",
      "Turned hard concepts into repeatable teaching flows recruiters can trust.",
    ],
  },
  {
    role: "Mentor",
    company: "GirlScript Summer of Code",
    period: "May 2024 - Aug 2024",
    points: [
      "Improved contributor completion rates by 40% with better guidance.",
      "Unblocked contributors across onboarding, reviews, and architecture questions.",
      "Balanced code quality with community support and momentum.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "Frienducation",
    period: "Oct 2023 - Jan 2024",
    points: [
      "Supported DSA and competitive programming learners remotely.",
      "Raised contest participation and follow-through via post-contest debriefs.",
      "Helped students build confidence, not just solve one problem.",
    ],
  },
];

const achievements = [
  "ICPC Chennai Regionals qualifier",
  "Codeforces Expert",
  "CodeChef 4 star",
  "LeetCode Knight",
  "Meta Hacker Cup Round 2 qualifier",
];

const skills = [
  "Go",
  "Java",
  "C++",
  "React",
  "Linux",
  "DSA",
  "Mentoring",
  "GenAI workflows",
];

const projects = [
  {
    id: "algoradar",
    title: "AlgoRadar",
    description:
      "A platform to track algorithmic problem-solving progress and consistency for DSA preparation.",
    link: "https://github.com/shashank-tomar-2004/algoradar",
  },
  {
    id: "pokedex",
    title: "Pokedex Golang",
    description:
      "A Golang Pokedex with generated JSON data and clean search-oriented structure.",
    link: "https://github.com/shashank-tomar-2004/pokedex",
  },
  {
    id: "frienducation",
    title: "Hacktoberfest Contributions",
    description:
      "Algorithm and repository improvements contributed across open-source learning repos.",
    link: "https://github.com/Frienducation/DSA",
  },
];

const rawSourceUrls = {
  "src/App.js": "https://raw.githubusercontent.com/shashank-tomar-2004/portfolio-master/main/src/App.js",
  "public/index.html": "https://raw.githubusercontent.com/shashank-tomar-2004/portfolio-master/main/public/index.html",
  "package.json": "https://raw.githubusercontent.com/shashank-tomar-2004/portfolio-master/main/package.json",
};

const sourceCode = {
  "src/App.js": `export default function PortfolioOS() {
  return (
    <DesktopShell
      modes={["recruiter", "engineer", "explore"]}
      apps={apps}
      settings={sharedPreferences}
    />
  );
}`,
  "src/apps/Browser.jsx": `const BrowserApp = () => {
  const [address, setAddress] = useState("https://www.google.com/webhp?igu=1");
  const open = (value) => setAddress(normalizeUrl(value));

  return <iframe title="Browser" src={address} />;
};`,
  "src/apps/Settings.jsx": `const settings = {
  theme: "dark",
  surfaceMode: "opaque",
  brightness: 86,
  sound: true,
  dockMagnify: true,
};`,
  "src/apps/Weather.jsx": `fetch("https://api.open-meteo.com/v1/forecast")
  .then((response) => response.json())
  .then(renderLiveWeather);`,
  "src/games/Snake.jsx": `const nextHead = {
  x: (head.x + direction.x + gridSize) % gridSize,
  y: (head.y + direction.y + gridSize) % gridSize,
};`,
  "src/games/Memory.jsx": `const cards = icons.concat(icons).sort(() => Math.random() - 0.5);
const solved = selected.length === 2 && selected[0].value === selected[1].value;`,
};

const youtubeVideos = [
  {
    id: "2o9KfyPqQzY",
    title: "No Time to Caution",
    subtitle: "Interstellar soundtrack pick.",
  },
  {
    id: "_k-F-MMvQV4",
    title: "Fireship Meme",
    subtitle: "A short dev meme break.",
  },
  {
    id: "Y1J9_9-vNcU",
    title: "60 Overs of Hell",
    subtitle: "Highlights from the match.",
  },
];

const weatherCities = [
  { id: "lucknow", name: "Lucknow", lat: 26.8467, lon: 80.9462, tz: "Asia/Kolkata" },
  { id: "delhi", name: "Delhi", lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
];

const desktopPresets = {
  recruiter: {
    title: "Recruiter Mode",
    label: "Hiring Desk",
    subtitle: "Fast signal: resume, role fit, contact, and quick proof.",
    pinned: ["launcher", "resume", "browser", "about", "contact", "settings"],
  },
  engineer: {
    title: "Engineer Mode",
    label: "Dev Bench",
    subtitle: "Source, terminal, projects, rankings, and implementation signal.",
    pinned: ["launcher", "vscode", "terminal", "browser", "resume", "settings"],
  },
  explore: {
    title: "Explore Mode",
    label: "Full OS",
    subtitle: "Apps, media, browser, settings, and little playful extras.",
    pinned: [
      "launcher",
      "browser",
      "spotify",
      "youtube",
      "weather",
      "notes",
      "calendar",
      "snake",
      "memory",
      "reflex",
      "trash",
      "settings",
    ],
  },
};

const createSystemSound = () => {
  let context;
  return async (volume, muted) => {
    if (muted || volume <= 0) return false;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!context || context.state === "closed") {
      context = new AudioContextClass();
    }
    if (context.state === "suspended") {
      await context.resume();
    }
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, now);
    oscillator.frequency.linearRampToValueAtTime(760, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume / 140), now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.24);
    return true;
  };
};

const systemSound = createSystemSound();

const calculateExpression = (expression) => {
  if (!/^[\d+\-*/%.()\s]+$/.test(expression)) {
    throw new Error("Invalid expression");
  }
  const tokens = expression.match(/\d*\.?\d+|[+\-*/%()]/g) || [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };
  const values = [];
  const operators = [];

  const applyOperator = () => {
    const operator = operators.pop();
    const right = values.pop();
    const left = values.pop();
    if (left === undefined || right === undefined) {
      throw new Error("Invalid expression");
    }
    if (operator === "+") values.push(left + right);
    if (operator === "-") values.push(left - right);
    if (operator === "*") values.push(left * right);
    if (operator === "/") values.push(left / right);
    if (operator === "%") values.push(left % right);
  };

  tokens.forEach((token) => {
    if (!Number.isNaN(Number(token))) {
      values.push(Number(token));
      return;
    }
    if (token === "(") {
      operators.push(token);
      return;
    }
    if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        applyOperator();
      }
      operators.pop();
      return;
    }
    while (
      operators.length &&
      precedence[operators[operators.length - 1]] >= precedence[token]
    ) {
      applyOperator();
    }
    operators.push(token);
  });

  while (operators.length) {
    applyOperator();
  }
  if (values.length !== 1 || !Number.isFinite(values[0])) {
    throw new Error("Invalid expression");
  }
  return String(values[0]);
};

const brandAppIds = new Set(["browser", "spotify", "youtube", "vscode"]);

const appTheme = {
  about: "from-sky-400 to-blue-600",
  contact: "from-rose-400 to-pink-600",
  browser: "from-amber-300 to-orange-500",
  vscode: "from-blue-500 to-indigo-700",
  terminal: "from-emerald-400 to-green-700",
  resume: "from-yellow-300 to-amber-500",
  spotify: "from-green-400 to-emerald-700",
  youtube: "from-red-400 to-rose-600",
  weather: "from-cyan-400 to-sky-600",
  snake: "from-lime-400 to-emerald-700",
  calculator: "from-violet-400 to-purple-700",
  settings: "from-cyan-400 to-indigo-600",
  ai: "from-fuchsia-400 to-violet-700",
  launcher: "from-slate-300 to-slate-500",
  trash: "from-slate-400 to-slate-600",
};

const AppIcon = ({ icon, name, className = "w-6 h-6", imageClassName = className }) => {
  const [imageFailed, setImageFailed] = useState(false);
  if (typeof icon === "string" && !imageFailed) {
    return (
      <img
        src={icon}
        alt={name}
        className={imageClassName}
        onError={() => setImageFailed(true)}
      />
    );
  }
  const Icon = typeof icon === "string" ? Globe : icon;
  return <Icon className={className} aria-hidden="true" />;
};

const ThemedIcon = ({ app, size = "w-7 h-7" }) => (
  brandAppIds.has(app.id) ? (
    <div className={`flex h-full w-full items-center justify-center ${app.id === "spotify" ? "rounded-[18px] bg-black/70 shadow-[0_10px_24px_rgba(0,0,0,0.35)]" : ""}`}>
      <AppIcon
        icon={app.icon}
        name={app.name}
        className={`${size} text-white`}
        imageClassName={`${size} object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)]`}
      />
    </div>
  ) : (
    <div
      className={`w-full h-full rounded-[18px] bg-gradient-to-br ${
        appTheme[app.id] || "from-sky-400 to-blue-600"
      } flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.22)]`}
    >
      <AppIcon
        icon={app.icon}
        name={app.name}
        className={`${size} text-white`}
        imageClassName={`${size} object-contain`}
      />
    </div>
  )
);

const SectionCard = ({ title, eyebrow, children }) => (
  <section className="rounded-[28px] border border-white/10 bg-slate-950/82 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-[72px] sm:p-5">
    {eyebrow ? (
      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">
        {eyebrow}
      </p>
    ) : null}
    <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
    <div className="mt-3">{children}</div>
  </section>
);

const CommandPaletteApp = ({ onOpenApp, onVisitorModeChange, toggleTheme }) => {
  const commands = [
    ["Open Resume", () => onOpenApp?.("resume")],
    ["Open Projects", () => onOpenApp?.("projects")],
    ["Open VS Code", () => onOpenApp?.("vscode")],
    ["Open Weather", () => onOpenApp?.("weather")],
    ["Switch To Recruiter", () => onVisitorModeChange("recruiter")],
    ["Switch To Engineer", () => onVisitorModeChange("engineer")],
    ["Toggle Theme", toggleTheme],
  ];
  return (
    <div className="h-full bg-slate-950 p-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Command Palette</p>
      <h1 className="mt-2 text-2xl font-bold">Quick actions</h1>
      <div className="mt-5 space-y-2">
        {commands.map(([label, action]) => (
          <button key={label} onClick={action} className="flex w-full items-center justify-between rounded-2xl bg-white/8 px-4 py-3 text-left hover:bg-cyan-400/12">
            <span>{label}</span>
            <span className="text-xs text-white/45">Run</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const NotificationsApp = ({ onOpenApp }) => (
  <div className="h-full bg-slate-950 p-5 text-white">
    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Notifications</p>
    <h1 className="mt-2 text-2xl font-bold">Portfolio activity</h1>
    <div className="mt-5 space-y-3">
      {[
        ["Resume ready", "PDF viewer and download are available.", "resume"],
        ["Projects separated", "Open the Projects app for focused proof.", "projects"],
        ["VS Code upgraded", "Curated files with GitHub raw fallback.", "vscode"],
      ].map(([title, body, id]) => (
        <button key={title} onClick={() => onOpenApp?.(id)} className="w-full rounded-2xl border border-white/10 bg-white/8 p-4 text-left hover:bg-white/12">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-white/65">{body}</p>
        </button>
      ))}
    </div>
  </div>
);

const OnboardingHint = ({ onDismiss }) => (
  <div className="absolute right-5 top-5 z-30 w-72 rounded-[28px] border border-cyan-300/25 bg-slate-950/92 p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Quick hint</p>
    <p className="mt-2 text-sm leading-6 text-white/75">Use Ctrl+Space for launcher, Esc to close panels, and drag taskbar icons to reorder them.</p>
    <button onClick={onDismiss} className="mt-3 rounded-xl bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950">Got it</button>
  </div>
);

const DesktopContextMenu = ({ point, onOpen, onSwitchMode, onLock, onClose }) => {
  if (!point) return null;
  const items = [
    ["Open Settings", () => onOpen("settings")],
    ["Open Commands", () => onOpen("commands")],
    ["Switch Recruiter", () => onSwitchMode("recruiter")],
    ["Switch Engineer", () => onSwitchMode("engineer")],
    ["Lock Screen", onLock],
  ];
  return (
    <div
      className="absolute z-50 w-56 rounded-[22px] border border-white/10 bg-slate-950 p-2 text-sm text-white shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
      style={{ left: point.x, top: point.y }}
      onMouseDown={(event) => event.stopPropagation()}
    >
      {items.map(([label, action]) => (
        <button
          key={label}
          onClick={() => {
            action();
            onClose();
          }}
          className="w-full rounded-2xl px-3 py-2 text-left hover:bg-white/10"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const LockOverlay = ({ onUnlock, onSwitchUser }) => (
  <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/82 text-white backdrop-blur-[30px]">
    <div className="w-full max-w-sm rounded-[32px] border border-white/10 bg-slate-950/90 p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-cyan-400 text-slate-950">
        <User className="h-10 w-10" />
      </div>
      <h2 className="mt-4 text-2xl font-bold">{personalInfo.name}</h2>
      <p className="mt-2 text-sm text-white/60">Portfolio OS is locked.</p>
      <div className="mt-5 flex gap-2">
        <button onClick={onUnlock} className="flex-1 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">Unlock</button>
        <button onClick={onSwitchUser} className="flex-1 rounded-2xl bg-white/10 px-4 py-3 font-semibold">Switch</button>
      </div>
    </div>
  </div>
);

const AboutApp = () => (
  <div className="h-full overflow-y-auto bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <div className="mx-auto max-w-5xl p-5 md:p-7 space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
          About
        </p>
        <h1 className="mt-3 text-4xl font-bold">{personalInfo.name}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {personalInfo.intro}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="mt-5 space-y-5">
            {experiences.map((item) => (
              <div
                key={`${item.company}-${item.role}`}
                className="border-l-2 border-cyan-500/70 pl-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{item.role}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.period}</p>
                </div>
                <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-300">
                  {item.company}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="text-2xl font-semibold">Achievements</h2>
            <div className="mt-4 space-y-3">
              {achievements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-black/20"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <div className="mt-4 space-y-4">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-black/20"
                >
                  <p className="font-semibold">{project.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsApp = () => (
  <div className="h-full overflow-y-auto bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
    <div className="mx-auto max-w-5xl">
      <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Projects</p>
      <h1 className="mt-2 text-3xl font-bold">Builds worth opening</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center justify-between gap-3">
              <Github className="h-5 w-5 text-cyan-500" />
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200">
                Open
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{project.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                index === 0 ? "DSA" : index === 1 ? "Go" : "Open Source",
                index === 0 ? "Tracking" : index === 1 ? "CLI/Data" : "Contribution",
                "GitHub",
              ].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const ResumeApp = () => (
  <div className="h-full bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white flex flex-col">
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-black/20">
      <div className="flex items-center gap-2 font-semibold">
        <FileText className="h-5 w-5 text-cyan-500" />
        Shashank_Tomar.pdf
      </div>
      <div className="flex gap-2">
        <a
          href={personalInfo.resume}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-3 py-2 text-sm dark:bg-white/10"
        >
          <ExternalLink className="h-4 w-4" />
          Open
        </a>
        <a
          href={personalInfo.resume}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-3 py-2 text-sm text-white"
        >
          <Download className="h-4 w-4" />
          Download
        </a>
      </div>
    </div>
    <iframe title="Resume" src={personalInfo.resume} className="h-full w-full border-0" />
  </div>
);

const ContactApp = () => (
  <div className="flex h-full items-center justify-center bg-slate-50 p-6 dark:bg-slate-900">
    <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
      <p className="text-sm uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
        Contact
      </p>
      <h2 className="mt-3 text-3xl font-bold">{personalInfo.name}</h2>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Open to internships, mentoring, developer-facing roles, and thoughtful product work.
      </p>
      <div className="mt-6 grid gap-3 text-left">
        {[
          ["Email", personalInfo.email, `mailto:${personalInfo.email}`],
          ["Phone", personalInfo.phone, `tel:${personalInfo.phone}`],
          ["LinkedIn", "iamshashanktomar", personalInfo.linkedin],
          ["GitHub", "shashank-tomar-2004", personalInfo.github],
        ].map(([label, value, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-black/20"
          >
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-medium">{value}</span>
          </a>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
);

const NotesApp = () => {
  const defaultNote = "Interview prep\n\n- Resume opened\n- Projects checked\n- VS Code proof reviewed";
  const [note, setNote] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-os-note") || defaultNote;
    } catch {
      return defaultNote;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-os-note", note);
    } catch {}
  }, [note]);
  return (
    <div className="flex h-full bg-[#f5e7bd] text-slate-900 dark:bg-slate-950 dark:text-white">
      <aside className="w-48 border-r border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs uppercase tracking-[0.24em] opacity-60">Notes</p>
        {["Interview", "Follow-up", "Ideas"].map((item) => (
          <div key={item} className="mt-3 rounded-2xl bg-white/55 p-3 text-sm font-semibold shadow-sm dark:bg-white/10">
            {item}
          </div>
        ))}
      </aside>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        className="m-5 flex-1 resize-none rounded-[28px] border border-black/10 bg-[#fff8dc] p-6 text-base leading-7 text-slate-900 shadow-inner outline-none dark:border-white/10 dark:bg-slate-900 dark:text-amber-50"
      />
    </div>
  );
};

const CalendarApp = () => {
  const today = new Date();
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  return (
    <div className="h-full bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Calendar</p>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="mt-2 text-4xl font-bold">{today.toLocaleDateString([], { month: "long", year: "numeric" })}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-300">{today.toLocaleDateString([], { weekday: "long", day: "numeric" })}</p>
          </div>
          <div className="rounded-2xl bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200">Portfolio review</div>
        </div>
        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => <p key={day} className="text-slate-400">{day}</p>)}
          {days.map((day) => (
            <div key={day} className={`rounded-2xl p-3 ${day === today.getDate() ? "bg-cyan-500 font-bold text-white" : "bg-slate-100 dark:bg-black/20"}`}>
              {day <= 31 ? day : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RecruiterChecklistApp = () => (
  <div className="h-full bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Recruiter Checklist</p>
      <h1 className="mt-2 text-3xl font-bold">Fast screening path</h1>
      <div className="mt-5 grid gap-3">
        {["Resume is one click away", "Projects are separated", "Contact links are ready", "VS Code has copyable proof", "AI Counselor can answer portfolio questions"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-black/20">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TrashApp = () => {
  const initialItems = [
    "oldresume.docx",
    "phpisagoodlang.docx",
    "meme_folder.zip",
    "internet_explorer_setup.exe",
  ];
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState("");

  return (
    <div className="flex h-full flex-col bg-slate-50 p-4 dark:bg-slate-900 dark:text-white">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
            Trash
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Recovered Bin</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!selected) return;
              setItems((current) => current.filter((item) => item !== selected));
              setSelected("");
            }}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white"
          >
            Restore
          </button>
          <button
            onClick={() => {
              setItems([]);
              setSelected("");
            }}
            className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white"
          >
            Empty
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto rounded-[24px] border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5">
        {items.length ? (
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ${
                  selected === item
                    ? "bg-cyan-50 text-slate-900 dark:bg-cyan-500/10 dark:text-white"
                    : "bg-slate-50 dark:bg-black/20"
                }`}
              >
                <Trash2 className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-500 dark:text-slate-400">
            <Trash2 className="h-16 w-16" />
            <p className="mt-3 text-sm">Trash is empty again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BrowserApp = () => {
  const defaultUrl = "https://www.google.com/webhp?igu=1";
  const [address, setAddress] = useState(defaultUrl);
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);
  const [history, setHistory] = useState([defaultUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const goToUrl = useCallback(
    (rawValue) => {
      const url = normalizeUrl(rawValue);
      if (!url) return;
      setCurrentUrl(url);
      setAddress(url);
      setHistory((current) => [...current.slice(0, historyIndex + 1), url]);
      setHistoryIndex((current) => current + 1);
    },
    [historyIndex]
  );

  const navigateHistory = (direction) => {
    const nextIndex = historyIndex + direction;
    if (nextIndex < 0 || nextIndex >= history.length) return;
    setHistoryIndex(nextIndex);
    setCurrentUrl(history[nextIndex]);
    setAddress(history[nextIndex]);
  };

  return (
    <div className="flex h-full flex-col bg-slate-100 dark:bg-slate-900">
      <div className="border-b border-slate-200 bg-white/85 p-3 dark:border-white/10 dark:bg-black/25">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigateHistory(-1)}
            className="rounded-xl bg-slate-100 p-2 dark:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigateHistory(1)}
            className="rounded-xl bg-slate-100 p-2 dark:bg-white/10"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentUrl((value) => value)}
            className="rounded-xl bg-slate-100 p-2 dark:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => goToUrl(defaultUrl)}
            className="rounded-xl bg-slate-100 p-2 dark:bg-white/10"
          >
            <Home className="h-4 w-4" />
          </button>
          <form
            className="flex min-w-[260px] flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5"
            onSubmit={(event) => {
              event.preventDefault();
              goToUrl(address);
            }}
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Paste any URL or search term"
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          <button
            onClick={() => goToUrl(address)}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white"
          >
            Go
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-slate-950">
        <iframe
          title="Portfolio Browser"
          src={currentUrl}
          className="h-full w-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
};

const VSCodeApp = () => {
  const [file, setFile] = useState(Object.keys(sourceCode)[0]);
  const [copied, setCopied] = useState(false);
  const [remoteCode, setRemoteCode] = useState({});
  const [status, setStatus] = useState("Curated fallback");
  const files = Object.keys(sourceCode);
  const currentCode = remoteCode[file] || sourceCode[file];

  useEffect(() => {
    let cancelled = false;
    const url = rawSourceUrls[file];
    if (!url || remoteCode[file]) {
      setStatus(remoteCode[file] ? "GitHub raw" : "Curated fallback");
      return undefined;
    }
    setStatus("Loading GitHub raw...");
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("raw unavailable");
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        setRemoteCode((current) => ({ ...current, [file]: text }));
        setStatus("GitHub raw");
      })
      .catch(() => {
        if (!cancelled) setStatus("Curated fallback");
      });
    return () => {
      cancelled = true;
    };
  }, [file, remoteCode]);

  const copyFile = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex h-full bg-[#1e1e1e] text-white">
      <div className="flex w-12 flex-col items-center gap-4 border-r border-white/10 bg-[#181818] py-4 text-slate-400">
        {[File, Search, Github, Settings].map((Icon, index) => (
          <Icon key={index} className={`h-5 w-5 ${index === 0 ? "text-white" : ""}`} />
        ))}
      </div>
      <aside className="w-64 border-r border-white/10 bg-[#252526] p-3">
        <p className="mb-3 text-xs uppercase tracking-[0.26em] text-slate-400">Portfolio OS</p>
        <div className="mb-3 rounded-lg bg-black/25 p-2 text-xs leading-5 text-slate-300">
          Curated project tree. Files are readable and copyable like a real code walkthrough.
        </div>
        <div className="space-y-1">
          {files.map((name) => (
            <button
              key={name}
              onClick={() => setFile(name)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                file === name ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <File className="h-4 w-4 text-cyan-300" />
              <span className="truncate">{name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => window.open(personalInfo.github, "_blank", "noopener,noreferrer")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          <Github className="h-4 w-4" />
          Open GitHub
        </button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex border-b border-white/10 bg-[#252526] text-xs">
          {files.slice(0, 3).map((name) => (
            <button key={name} onClick={() => setFile(name)} className={`border-r border-white/10 px-4 py-2 ${file === name ? "bg-[#1e1e1e] text-white" : "text-slate-400"}`}>
              {name.split("/").pop()}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-b border-white/10 bg-[#1e1e1e] px-4 py-2 text-xs text-slate-300">
          <div>
            <span className="text-slate-100">{file}</span>
            <span className="ml-3 text-slate-500">{currentCode.split("\n").length} lines</span>
            <span className="ml-3 rounded bg-cyan-400/10 px-2 py-0.5 text-cyan-200">{status}</span>
          </div>
          <button
            onClick={copyFile}
            className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/15"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5 font-mono text-sm leading-7 text-slate-200">
          <pre className="whitespace-pre-wrap">
            {currentCode.split("\n").map((line, index) => `${String(index + 1).padStart(3, " ")}  ${line}`).join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
};

const TerminalApp = () => {
  const [history, setHistory] = useState([
    { type: "text", value: "Welcome. Commands: help, about, projects, resume, hr, tech, contact, meme, ls, whoami, date, clear" },
  ]);
  const [input, setInput] = useState("");
  const handleCommand = async (rawValue) => {
    const command = rawValue.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setHistory([]);
      return;
    }
    const lines = [{ type: "text", value: `user@portfolio:~$ ${rawValue}` }];
    if (command === "help") {
      lines.push({ type: "text", value: "Available: about, projects, resume, hr, tech, contact, ai, meme, ls, whoami, date, clear" });
    } else if (command === "about") {
      lines.push({ type: "text", value: personalInfo.intro });
    } else if (command === "projects") {
      lines.push({ type: "text", value: projects.map((item) => `${item.title}: ${item.description}`).join("\n") });
    } else if (command === "resume") {
      lines.push({ type: "text", value: `${window.location.origin}${personalInfo.resume}` });
    } else if (command === "hr") {
      lines.push({ type: "text", value: "Mentoring, communication, competitive programming proof, and fast recruiter flow are the strongest screening signals." });
    } else if (command === "tech") {
      lines.push({ type: "text", value: "Go, Java, C++, React, DSA, and product-style interface execution show up across the portfolio." });
    } else if (command === "contact") {
      lines.push({ type: "text", value: `${personalInfo.email}\n${personalInfo.linkedin}\n${personalInfo.github}` });
    } else if (command === "ai") {
      lines.push({ type: "text", value: "Try the AI Counselor app for portfolio-specific Q&A." });
    } else if (command === "meme") {
      lines.push({ type: "text", value: "Fetching random meme..." });
      try {
        const response = await fetch("https://meme-api.com/gimme");
        const meme = await response.json();
        if (meme?.url) {
          lines.push({ type: "image", value: meme.url, title: meme.title || "Random meme" });
        } else {
          lines.push({ type: "text", value: "Meme API did not return an image this time." });
        }
      } catch {
        lines.push({ type: "text", value: "Meme fetch failed. The internet has chosen silence." });
      }
    } else if (command === "ls") {
      lines.push({ type: "text", value: "about  resume  projects  vscode  weather  games  trash" });
    } else if (command === "whoami") {
      lines.push({ type: "text", value: "visitor@portfolio-os" });
    } else if (command === "date") {
      lines.push({ type: "text", value: new Date().toString() });
    } else {
      lines.push({ type: "text", value: `Command not found: ${rawValue}` });
    }
    setHistory((current) => [...current, ...lines]);
  };

  return (
    <div className="flex h-full flex-col bg-[#11161d] p-3 font-mono text-sm text-slate-200">
      <div className="flex-1 overflow-auto space-y-1">
        {history.map((line, index) => (
          <div key={`${line.value}-${index}`} className="whitespace-pre-wrap leading-6">
            {line.type === "image" ? (
              <div className="my-3 max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img src={line.value} alt={line.title} className="max-h-72 w-full object-contain" />
                <p className="px-3 py-2 text-xs text-white/60">{line.title}</p>
              </div>
            ) : (
              line.value
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCommand(input);
          setInput("");
        }}
        className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3"
      >
        <span className="text-emerald-300">user@portfolio:~$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </form>
    </div>
  );
};

const SpotifyApp = () => (
  <iframe
    title="Spotify"
    src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
    className="h-full w-full border-0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  />
);

const YoutubeApp = () => {
  const [video, setVideo] = useState(youtubeVideos[0]);
  const [query, setQuery] = useState("");
  const [embedUrl, setEmbedUrl] = useState(`https://www.youtube.com/embed/${youtubeVideos[0].id}`);

  const loadVideo = (item) => {
    setVideo(item);
    setEmbedUrl(`https://www.youtube.com/embed/${item.id}`);
  };

  const searchYoutube = (value) => {
    const term = value.trim();
    if (!term) return;
    setVideo({
      id: term,
      title: `Search: ${term}`,
      subtitle: "YouTube search embed",
    });
    setEmbedUrl(`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(term)}`);
  };

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-950">
      <div className="flex-1 p-4">
        <div className="mb-3 flex items-center gap-2 rounded-[22px] border border-slate-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/5 dark:text-white">
          <Youtube className="h-4 w-4 text-red-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchYoutube(query);
              }
            }}
            placeholder="Search YouTube"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button
            onClick={() => searchYoutube(query)}
            className="rounded-xl bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
          >
            Search
          </button>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-black shadow-sm dark:border-white/10">
          <iframe
            title={video.title}
            src={embedUrl}
            className="aspect-video w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <aside className="w-80 overflow-y-auto border-l border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-black/25">
        <h3 className="text-lg font-semibold dark:text-white">YouTube</h3>
        <div className="mt-4 space-y-3">
          {youtubeVideos.map((item) => (
            <button
              key={item.id}
              onClick={() => loadVideo(item)}
              className={`w-full rounded-2xl border p-3 text-left ${
                item.id === video.id
                  ? "border-red-400 bg-red-50 dark:border-red-400/70 dark:bg-red-500/10"
                  : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
              }`}
            >
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
};

const WeatherApp = () => {
  const [city, setCity] = useState(weatherCities[0]);
  const [forecast, setForecast] = useState(null);
  const [status, setStatus] = useState("Loading weather...");
  const [query, setQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const loadWeather = async () => {
      setStatus("Loading weather...");
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code&hourly=temperature_2m&forecast_days=1&timezone=${city.tz}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json();
        if (cancelled) return;
        setForecast(data);
        setStatus("");
      } catch (error) {
        if (cancelled) return;
        setForecast(null);
        setStatus("Live weather is unavailable right now. The app is ready for browsers that allow the fetch.");
      }
    };
    loadWeather();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [city]);

  const searchCity = async () => {
    const term = query.trim();
    if (!term) return;
    setSearchStatus("Searching...");
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          term
        )}&count=1&language=en&format=json`
      );
      if (!response.ok) throw new Error("City search failed");
      const data = await response.json();
      const result = data.results?.[0];
      if (!result) {
        setSearchStatus("City not found");
        return;
      }
      setCity({
        id: `${result.name}-${result.latitude}-${result.longitude}`,
        name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ""}`,
        lat: result.latitude,
        lon: result.longitude,
        tz: result.timezone || "auto",
      });
      setSearchStatus("");
    } catch {
      setSearchStatus("Search unavailable");
    }
  };

  const temperature = forecast?.current?.temperature_2m;
  const feelsLike = forecast?.current?.apparent_temperature;
  const wind = forecast?.current?.wind_speed_10m;

  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),transparent_45%),linear-gradient(180deg,#08111f,#0f172a_58%,#111827)] p-6 text-white">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex gap-2 rounded-[22px] border border-white/10 bg-white/8 p-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") searchCity();
            }}
            placeholder="Search city"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-white/45"
          />
          <button
            onClick={searchCity}
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950"
          >
            Search
          </button>
        </div>
        {searchStatus ? <p className="text-sm text-white/60">{searchStatus}</p> : null}
        <div className="flex flex-wrap gap-2">
          {weatherCities.map((item) => (
            <button
              key={item.id}
              onClick={() => setCity(item)}
              className={`rounded-full px-4 py-2 text-sm ${
                city.id === item.id ? "bg-white text-slate-900" : "bg-white/10"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <SectionCard title={city.name} eyebrow="Weather">
          {forecast ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white/8 p-5">
                <p className="text-5xl font-bold">{Math.round(temperature)}°C</p>
                <p className="mt-2 text-sm text-white/70">Current temperature</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-5">
                <p className="text-3xl font-semibold">{Math.round(feelsLike)}°C</p>
                <p className="mt-2 text-sm text-white/70">Feels like</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-5">
                <p className="text-3xl font-semibold">{Math.round(wind)} km/h</p>
                <p className="mt-2 text-sm text-white/70">Wind speed</p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-6 text-white/75">{status}</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

const SnakeApp = () => {
  const gridSize = 14;
  const initialSnake = [
    { x: 6, y: 7 },
    { x: 5, y: 7 },
  ];
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 9, y: 7 });
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const onKeyDown = (event) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      if (map[event.key]) {
        event.preventDefault();
        setDirection(map[event.key]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setSnake((current) => {
        const head = current[0];
        const nextHead = {
          x: (head.x + direction.x + gridSize) % gridSize,
          y: (head.y + direction.y + gridSize) % gridSize,
        };
        if (current.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)) {
          setRunning(false);
          return current;
        }
        const nextSnake = [nextHead, ...current];
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore((value) => value + 1);
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
          return nextSnake;
        }
        nextSnake.pop();
        return nextSnake;
      });
    }, 180);
    return () => clearInterval(timer);
  }, [direction, food.x, food.y, running]);

  const reset = () => {
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    setFood({ x: 9, y: 7 });
    setScore(0);
    setRunning(true);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-[#07130f] p-6 text-white">
      <div className="flex w-full max-w-xl items-center justify-between rounded-2xl border border-lime-400/20 bg-black/30 px-4 py-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-lime-300/70">Snake</p>
          <p className="text-lg font-semibold">Score {score}</p>
        </div>
        <button
          onClick={reset}
          className="rounded-xl bg-lime-400 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Restart
        </button>
      </div>
      <div
        className="grid gap-1 rounded-[28px] border border-lime-400/20 bg-black/40 p-4"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={`${x}-${y}`}
              className={`h-5 w-5 rounded-[6px] ${
                isSnake ? "bg-lime-400" : isFood ? "bg-rose-400" : "bg-white/5"
              }`}
            />
          );
        })}
      </div>
      {!running ? (
        <p className="text-sm text-rose-300">Game over. Restart and try a tighter turn.</p>
      ) : (
        <p className="text-sm text-white/65">Use arrow keys. This one exists purely for recruiter morale.</p>
      )}
    </div>
  );
};

const MemoryApp = () => {
  const icons = ["React", "Go", "DSA", "AI", "UI", "OS"];
  const makeDeck = () =>
    icons
      .flatMap((value) => [value, value])
      .map((value, index) => ({ id: `${value}-${index}-${Math.random()}`, value }))
      .sort(() => Math.random() - 0.5);
  const [cards, setCards] = useState(makeDeck);
  const [picked, setPicked] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (picked.length !== 2) return undefined;
    const [first, second] = picked;
    setMoves((value) => value + 1);
    const timer = window.setTimeout(() => {
      if (first.value === second.value) {
        setMatched((current) => [...current, first.id, second.id]);
      }
      setPicked([]);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [picked]);

  const reset = () => {
    setCards(makeDeck());
    setPicked([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="flex h-full flex-col bg-[#101827] p-5 text-white">
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Memory</p>
          <p className="text-lg font-semibold">Moves {moves}</p>
        </div>
        <button onClick={reset} className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
          Restart
        </button>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-3">
        {cards.map((card) => {
          const visible = picked.some((item) => item.id === card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => {
                if (visible || picked.length === 2) return;
                setPicked((current) => [...current, card]);
              }}
              className={`rounded-2xl border text-lg font-bold transition-all ${
                visible
                  ? "border-cyan-300 bg-cyan-400 text-slate-950"
                  : "border-white/10 bg-white/8 text-white hover:bg-white/14"
              }`}
            >
              {visible ? card.value : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ReflexApp = () => {
  const [target, setTarget] = useState({ x: 42, y: 48 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const start = () => {
    setScore(0);
    setTimeLeft(20);
    setRunning(true);
    setTarget({ x: 42, y: 48 });
  };

  const hit = () => {
    if (!running) return;
    setScore((value) => value + 1);
    setTarget({
      x: 8 + Math.random() * 76,
      y: 12 + Math.random() * 68,
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#111827] p-5 text-white">
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-rose-200">Reflex</p>
          <p className="text-lg font-semibold">Score {score} · {timeLeft}s</p>
        </div>
        <button onClick={start} className="rounded-xl bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950">
          {running ? "Restart" : "Start"}
        </button>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-black/30">
        {running ? (
          <button
            onClick={hit}
            className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400 shadow-[0_0_30px_rgba(251,113,133,0.65)]"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            aria-label="Hit target"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-white/70">
            Hit the moving target as many times as possible in 20 seconds.
          </div>
        )}
      </div>
    </div>
  );
};

const CalculatorApp = () => {
  const [value, setValue] = useState("");
  const press = (token) => {
    if (token === "C") {
      setValue("");
      return;
    }
    if (token === "=") {
      try {
        setValue(calculateExpression(value.replace(/x/g, "*")));
      } catch {
        setValue("Error");
      }
      return;
    }
    setValue((current) => current + token);
  };
  const buttons = ["C", "%", "/", "x", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "0", ".", "="];
  return (
    <div className="flex h-full flex-col bg-slate-100 p-3 dark:bg-slate-900">
      <div className="mb-3 flex min-h-[120px] items-end justify-end rounded-[28px] bg-white p-4 text-right font-mono text-4xl shadow-sm dark:bg-white/5 dark:text-white">
        {value || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => press(button)}
            className={`rounded-2xl px-4 py-4 text-lg font-semibold ${
              ["/", "x", "-", "+", "="].includes(button)
                ? "bg-cyan-500 text-white"
                : button === "C" || button === "%"
                ? "bg-slate-300 text-slate-900 dark:bg-white/15 dark:text-white"
                : "bg-white text-slate-900 dark:bg-white/8 dark:text-white"
            } ${button === "0" ? "col-span-2" : ""}`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

const AICounselorApp = ({ uiPrefs }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ask me about Shashank's portfolio, projects, mentoring work, or role fit.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading || !uiPrefs.aiEnabled) return;
    const userText = input.trim();
    setMessages((current) => [...current, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);
    const context = JSON.stringify({ personalInfo, experiences, achievements, projects });
    const reply = await callGeminiAPI(`${context}\nUser question: ${userText}`);
    setMessages((current) => [...current, { role: "assistant", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {!uiPrefs.aiEnabled ? (
          <div className="rounded-2xl border border-amber-300/40 bg-amber-100/70 p-4 text-sm text-amber-900 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-100">
            AI is paused in Settings right now.
          </div>
        ) : null}
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "user"
                ? "ml-auto bg-cyan-500 text-white"
                : "bg-white text-slate-800 shadow-sm dark:bg-white/5 dark:text-slate-100"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading ? <div className="text-sm text-slate-500 dark:text-slate-400">Thinking...</div> : null}
      </div>
      <div className="border-t border-slate-200 p-3 dark:border-white/10">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about projects, roles, experience..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-medium text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const SettingsApp = ({
  theme,
  toggleTheme,
  visitorMode,
  onVisitorModeChange,
  uiPrefs,
  onUpdatePrefs,
  onLockNow,
  onPreviewSound,
}) => {
  const sections = ["Appearance", "Devices", "Desktop", "Security"];
  const [section, setSection] = useState("Appearance");
  const accentClasses = {
    cyan: "border-cyan-400 bg-cyan-500 text-white",
    emerald: "border-emerald-400 bg-emerald-500 text-white",
    rose: "border-rose-400 bg-rose-500 text-white",
    amber: "border-amber-300 bg-amber-400 text-slate-950",
  };
  const sectionIcons = {
    Appearance: Palette,
    Devices: Volume2,
    Desktop: Monitor,
    Security: Shield,
  };

  const ToggleRow = ({ title, description, value, onToggle }) => (
    <button
      type="button"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      aria-pressed={value}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-colors ${
        value
          ? "border-cyan-500 bg-cyan-100 text-slate-950 shadow-[inset_4px_0_0_rgba(6,182,212,1)] hover:bg-cyan-200/80 dark:border-cyan-300/65 dark:bg-slate-900 dark:text-white dark:shadow-[inset_4px_0_0_rgba(34,211,238,1)] dark:hover:bg-slate-800"
          : "border-slate-300 bg-white text-slate-950 hover:border-cyan-400 hover:bg-white dark:border-white/15 dark:bg-slate-950 dark:text-white dark:hover:border-cyan-300/60 dark:hover:bg-slate-900"
      }`}
    >
      <div>
        <p className="font-semibold">{title}</p>
        <p className={`mt-1 text-sm ${value ? "text-slate-600 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
          {description}
        </p>
      </div>
      <span
        className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          value
            ? "bg-cyan-600 text-white dark:bg-cyan-300 dark:text-slate-950"
            : "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300"
        }`}
      >
        {value ? <CheckCircle2 className="h-3 w-3" /> : <X className="h-3 w-3" />}
        {value ? "On" : "Off"}
      </span>
    </button>
  );

  return (
    <div className="flex h-full w-full bg-slate-100 dark:bg-slate-950">
      <aside className="w-52 border-r border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-black/20">
        <p className="mb-3 text-xs uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
          Settings
        </p>
        <div className="space-y-1">
          {sections.map((item) => (
            (() => {
              const Icon = sectionIcons[item];
              return (
                <button
                  key={item}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSection(item);
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm ${
                    section === item
                      ? "bg-cyan-500 text-white shadow-[inset_4px_0_0_rgba(255,255,255,0.45)]"
                      : "text-slate-700 hover:bg-cyan-50 dark:text-cyan-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${section === item ? "text-white" : "text-cyan-600 dark:text-cyan-300"}`} strokeWidth={2.4} />
                  {item}
                </button>
              );
            })()
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">
            {section}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Make the shell yours
          </h2>
        </div>

        {section === "Appearance" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <ToggleRow
              title="Dark mode"
              description="Switch between the daytime and cinematic shell."
              value={theme === "dark"}
              onToggle={toggleTheme}
            />
            <ToggleRow
              title="Wallpaper dim"
              description="Keep text readable without making dark mode overly washed out."
              value={uiPrefs.wallpaperDim}
              onToggle={() => onUpdatePrefs({ wallpaperDim: !uiPrefs.wallpaperDim })}
            />
            <ToggleRow
              title="Smooth transitions"
              description="Use slower palette fades when switching themes."
              value={uiPrefs.smoothTheme}
              onToggle={() => onUpdatePrefs({ smoothTheme: !uiPrefs.smoothTheme })}
            />
            <div className="rounded-2xl border border-slate-300 bg-white p-4 text-slate-950 dark:border-white/15 dark:bg-slate-950 dark:text-white">
              <p className="font-semibold dark:text-white">Menu surface</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Choose opaque when wallpaper/icons must not show behind menus.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  ["opaque", "Opaque"],
                  ["blur", "100% blur"],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() => onUpdatePrefs({ surfaceMode: mode })}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${
                      uiPrefs.surfaceMode === mode
                        ? "border-cyan-400 bg-cyan-500 text-white"
                        : "border-slate-300 bg-slate-50 text-slate-800 hover:border-cyan-400 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-slate-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white p-4 text-slate-950 dark:border-white/15 dark:bg-slate-950 dark:text-white">
              <p className="font-semibold dark:text-white">Accent</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["cyan", "emerald", "rose", "amber"].map((accent) => (
                  <button
                    key={accent}
                    onClick={() => onUpdatePrefs({ accent })}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold capitalize transition-colors ${
                      uiPrefs.accent === accent
                        ? accentClasses[accent]
                        : "border-slate-300 bg-slate-50 text-slate-700 hover:border-cyan-400 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-slate-900"
                    }`}
                  >
                    {accent}
                  </button>
                ))}
              </div>
              <div className={`mt-3 rounded-xl border px-3 py-2 text-sm font-semibold ${accentClasses[uiPrefs.accent]}`}>
                Active accent: {uiPrefs.accent}
              </div>
            </div>
          </div>
        ) : null}

        {section === "Devices" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <ToggleRow
              title="Wi-Fi"
              description="Toggle connected shell mode for the system tray and control center."
              value={uiPrefs.wifiEnabled}
              onToggle={() => onUpdatePrefs({ wifiEnabled: !uiPrefs.wifiEnabled })}
            />
            <ToggleRow
              title="Sound cues"
              description="Enable UI chimes for system interactions."
              value={uiPrefs.soundEnabled}
              onToggle={() => onUpdatePrefs({ soundEnabled: !uiPrefs.soundEnabled })}
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold dark:text-white">Brightness</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Dim or brighten the full desktop overlay.
                  </p>
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {uiPrefs.brightness}%
                </span>
              </div>
              <input
                type="range"
                min="45"
                max="100"
                value={uiPrefs.brightness}
                onChange={(event) =>
                  onUpdatePrefs({ brightness: Number(event.target.value) })
                }
                className="mt-4 w-full accent-cyan-500"
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold dark:text-white">Volume</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Master volume for UI previews and taskbar controls.
                  </p>
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {uiPrefs.volume}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={uiPrefs.volume}
                onChange={(event) => onUpdatePrefs({ volume: Number(event.target.value) })}
                className="mt-4 w-full accent-cyan-500"
              />
              <button
                onClick={onPreviewSound}
                className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white"
              >
                Test sound
              </button>
            </div>
          </div>
        ) : null}

        {section === "Desktop" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <ToggleRow
              title="Dock magnification"
              description="Make taskbar icons swell on hover like a more animated desktop."
              value={uiPrefs.dockMagnify}
              onToggle={() => onUpdatePrefs({ dockMagnify: !uiPrefs.dockMagnify })}
            />
            <ToggleRow
              title="Floating chips"
              description="Show ambient labels in the themed desktop backgrounds."
              value={uiPrefs.floatingChips}
              onToggle={() => onUpdatePrefs({ floatingChips: !uiPrefs.floatingChips })}
            />
            <ToggleRow
              title="24-hour clock"
              description="Switch tray time between 24-hour and 12-hour formats."
              value={uiPrefs.use24HourClock}
              onToggle={() => onUpdatePrefs({ use24HourClock: !uiPrefs.use24HourClock })}
            />
            <ToggleRow
              title="Desktop hints"
              description="Show small helper cues inside the current mode."
              value={uiPrefs.tipsEnabled}
              onToggle={() => onUpdatePrefs({ tipsEnabled: !uiPrefs.tipsEnabled })}
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5 lg:col-span-2">
              <p className="font-semibold dark:text-white">Visitor mode</p>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {Object.entries(desktopPresets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => onVisitorModeChange(key)}
                    className={`rounded-2xl border p-4 text-left transition-colors ${
                      visitorMode === key
                        ? "border-cyan-400 bg-cyan-50 shadow-[inset_0_4px_0_rgba(6,182,212,0.75)] dark:bg-cyan-500/10"
                        : "border-slate-200 bg-slate-50 hover:border-cyan-300 hover:bg-cyan-50/60 dark:border-white/10 dark:bg-black/20 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold dark:text-white">{preset.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        visitorMode === key
                          ? "bg-cyan-600 text-white dark:bg-cyan-300 dark:text-slate-950"
                          : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                      }`}>
                        {visitorMode === key ? "Active" : "Open"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{preset.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {section === "Security" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <ToggleRow
              title="AI counselor"
              description="Pause or enable AI-driven portfolio Q&A."
              value={uiPrefs.aiEnabled}
              onToggle={() => onUpdatePrefs({ aiEnabled: !uiPrefs.aiEnabled })}
            />
            <ToggleRow
              title="Motion system"
              description="Keep launcher, panel, and window animations active."
              value={uiPrefs.motionEnabled}
              onToggle={() => onUpdatePrefs({ motionEnabled: !uiPrefs.motionEnabled })}
            />
            <button
              onClick={onLockNow}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left dark:border-white/10 dark:bg-white/5"
            >
              <p className="font-semibold dark:text-white">Switch user</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Return to the visitor mode chooser and close all windows.
              </p>
            </button>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-white/5">
              <p className="font-semibold dark:text-white">System note</p>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Browser navigation, control-center toggles, sound preview, brightness, dock magnification, and mode switching are all live now.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const RecruiterDesktop = ({ onOpen }) => {
  return (
    <div className="absolute inset-0 overflow-hidden px-6 pb-24 pt-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.2),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_78%_80%,rgba(251,113,133,0.12),transparent_24%)]" />
      <div className="relative ml-36 grid max-w-[820px] grid-cols-[1.15fr_0.85fr] gap-4">
        <SectionCard title={personalInfo.name} eyebrow="Hiring Desk">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["350+", "students"],
              ["40%", "completion lift"],
              ["CF Expert", "rank"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/12 p-4">
                <p className="text-2xl font-bold text-emerald-300">{value}</p>
                <p className="mt-1 text-xs text-white/80">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-black/35 p-4">
            <p className="text-sm font-semibold text-emerald-200">Best quick fit</p>
            <p className="mt-2 text-sm leading-6 text-white/90">
              SDE intern, DSA mentor, and DevRel-style roles where proof, teaching, and communication matter.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => onOpen("resume")} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950">
              Open Resume
            </button>
            <button onClick={() => onOpen("contact")} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">
              Contact
            </button>
            <button onClick={() => onOpen("browser")} className="rounded-xl bg-white/12 px-4 py-2 text-sm font-medium text-white">
              Open Browser
            </button>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Short Proof" eyebrow="Signals">
            {["GFG mentor", "GSSoC +40%", "ICPC regionalist", "open-source ready"].map((item) => (
              <div key={item} className="mb-2 flex items-center gap-2 text-sm text-white/90">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {item}
              </div>
            ))}
          </SectionCard>
          <SectionCard title="Open More" eyebrow="Launch">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["projects", FolderOpen, "Projects"],
                ["ai", Bot, "AI"],
                ["resume", FileText, "Resume"],
                ["contact", Mail, "Mail"],
              ].map(([id, Icon, label]) => (
                <button
                  key={id}
                  onClick={() => onOpen(id)}
                  className="rounded-2xl bg-white/10 p-3 text-left hover:bg-cyan-400/12"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <p className="mt-2 text-sm">{label}</p>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

const EngineerDesktop = ({ onOpen, uiPrefs }) => (
  <div className="absolute inset-0 overflow-hidden px-6 pb-24 pt-6">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.28),transparent_24%),radial-gradient(circle_at_78%_28%,rgba(168,85,247,0.22),transparent_24%),radial-gradient(circle_at_60%_82%,rgba(34,197,94,0.16),transparent_24%)]" />
    <div className="relative ml-32 grid max-w-4xl grid-cols-[1.25fr_0.75fr] gap-4">
      <SectionCard title="Interactive Proof Lab" eyebrow="Engineering Cockpit">
        <div className="grid grid-cols-4 gap-3">
          {[
            ["Go", "backend"],
            ["Java/C++", "DSA"],
            ["CF Expert", "rank"],
            ["React", "ui systems"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-white/8 p-4">
              <p className="text-2xl font-bold">{value}</p>
              <p className="mt-1 text-xs text-white/60">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-green-400/20 bg-black/35 p-4 font-mono text-sm text-green-300">
          <pre>{`$ portfolio inspect
mode: engineer
stack: React, Go, DSA, interactive product thinking
focus: proof over slogans`}</pre>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => onOpen("vscode")}
            className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white"
          >
            Open VS Code
          </button>
          <button
            onClick={() => onOpen("terminal")}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950"
          >
            Open Terminal
          </button>
          <button
            onClick={() => onOpen("browser")}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white"
          >
            Open Browser
          </button>
        </div>
      </SectionCard>
      <div className="space-y-4">
        <SectionCard title="Runtime" eyebrow="Signals">
          {["build passing", "responsive shell", "browser paste fixed", "settings live"].map((item) => (
            <div key={item} className="mb-2 flex items-center gap-2 text-sm text-white/75">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {item}
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Quick apps" eyebrow="Launch">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["resume", FileText, "Resume"],
              ["weather", CloudSun, "Weather"],
              ["youtube", Youtube, "YouTube"],
              ["snake", Gamepad2, "Snake"],
            ].map(([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => onOpen(id)}
                className="rounded-2xl bg-white/8 p-3 text-left"
              >
                <Icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-2 text-sm">{label}</p>
              </button>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  </div>
);

const ExploreDesktop = ({ onOpen, uiPrefs }) => (
  <div className="absolute inset-0 overflow-hidden px-6 pb-24 pt-6">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(251,191,36,0.2),transparent_22%),radial-gradient(circle_at_82%_28%,rgba(244,63,94,0.18),transparent_24%),radial-gradient(circle_at_62%_82%,rgba(59,130,246,0.18),transparent_26%)]" />
    <section className="absolute right-8 top-10 w-[420px] rounded-[22px] border border-white/16 bg-slate-950/84 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-[72px]">
      <p className="text-sm uppercase tracking-[0.28em] text-amber-200">Explore Mode</p>
      <h2 className="mt-2 text-2xl font-bold">Full OS Playground</h2>
      <p className="mt-2 text-sm leading-6 text-white/72">
        Browser, media, quick tools, working settings, and a couple of extra apps so the desktop feels like a real environment, not a single demo window.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["browser", Globe, "Browser"],
          ["spotify", Sparkles, "Spotify"],
          ["youtube", Youtube, "YouTube"],
          ["weather", CloudSun, "Weather"],
          ["snake", Gamepad2, "Snake"],
          ["memory", Brain, "Memory"],
          ["reflex", Crosshair, "Reflex"],
          ["ai", Bot, "AI"],
        ].map(([id, Icon, label]) => (
          <button
            key={id}
            onClick={() => onOpen(id)}
            className="rounded-xl border border-white/10 bg-white/8 p-3 text-left hover:bg-white/12"
          >
            <Icon className="h-5 w-5 text-amber-200" />
            <p className="mt-2 text-sm">{label}</p>
          </button>
        ))}
      </div>
    </section>
  </div>
);

const ModeDesktopLayer = ({ visitorMode, onOpen, theme, uiPrefs }) => {
  if (visitorMode === "recruiter") return <RecruiterDesktop onOpen={onOpen} theme={theme} />;
  if (visitorMode === "engineer") return <EngineerDesktop onOpen={onOpen} uiPrefs={uiPrefs} />;
  return <ExploreDesktop onOpen={onOpen} uiPrefs={uiPrefs} />;
};

const DesktopIcon = ({ app, onOpen, compact = false }) => (
  <button
    onClick={() => onOpen(app.id)}
    title={`${app.name}${app.badge ? ` · ${app.badge}` : ""}`}
    className={`group relative flex flex-col items-center justify-center gap-2 rounded-2xl text-xs font-medium text-white transition-all hover:bg-white/10 ${
      compact ? "h-20 w-20" : "h-24 w-24"
    }`}
  >
    {app.badge ? (
      <span className="absolute right-2 top-1 rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-slate-950">
        {app.badge}
      </span>
    ) : null}
    <div className={compact ? "h-10 w-10" : "h-12 w-12"}>
      <ThemedIcon app={app} size={brandAppIds.has(app.id) ? (compact ? "w-8 h-8" : "w-10 h-10") : (compact ? "w-6 h-6" : "w-7 h-7")} />
    </div>
    <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.44)] text-center">{app.name}</span>
  </button>
);

const NowPlayingWidget = ({ onOpen }) => (
  <button
    onClick={() => onOpen("spotify")}
    className="absolute bottom-24 right-5 z-20 flex w-64 items-center gap-3 rounded-[28px] border border-white/10 bg-slate-950/84 p-3 text-left text-white shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-[72px]"
  >
    <div className="h-11 w-11 rounded-2xl bg-black p-2">
      <img src={spotifyIcon} alt="Spotify" className="h-full w-full object-contain" />
    </div>
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Now Playing</p>
      <p className="truncate text-sm font-semibold">Focus playlist</p>
      <p className="truncate text-xs text-white/60">Open Spotify</p>
    </div>
  </button>
);

const DesktopWindow = ({
  instance,
  appMap,
  theme,
  toggleTheme,
  visitorMode,
  onVisitorModeChange,
  uiPrefs,
  onUpdatePrefs,
  onPreviewSound,
  onFocus,
  onMinimize,
  onClose,
  onToggleMaximize,
  onLockNow,
  onRememberLayout,
  onOpenApp,
  onSnapPreview,
}) => {
  const app = appMap[instance.id];
  const defaultSizes = {
    browser: { width: 980, height: 700 },
    about: { width: 980, height: 720 },
    settings: { width: 980, height: 720 },
    vscode: { width: 960, height: 680 },
    terminal: { width: 780, height: 540 },
    youtube: { width: 920, height: 640 },
    spotify: { width: 430, height: 610 },
    snake: { width: 560, height: 640 },
    calculator: { width: 360, height: 560 },
    weather: { width: 780, height: 560 },
    notes: { width: 520, height: 560 },
    calendar: { width: 560, height: 620 },
    checklist: { width: 680, height: 560 },
    commands: { width: 520, height: 560 },
    notifications: { width: 520, height: 560 },
    default: { width: 840, height: 620 },
  };
  const baseSize = defaultSizes[instance.id] || defaultSizes.default;
  const windowRef = useRef(null);
  const dragRef = useRef(null);
  const [position, setPosition] = useState({
    x: instance.layout?.position?.x ?? Math.max(32, window.innerWidth / 2 - baseSize.width / 2),
    y: instance.layout?.position?.y ?? Math.max(24, window.innerHeight / 2 - baseSize.height / 2 - 10),
  });
  const [size, setSize] = useState({
    width: instance.layout?.size?.width ?? Math.min(baseSize.width, window.innerWidth - 80),
    height: instance.layout?.size?.height ?? Math.min(baseSize.height, window.innerHeight - 120),
  });
  const layoutRef = useRef({ position, size });
  useEffect(() => {
    layoutRef.current = { position, size };
  }, [position, size]);

  useLayoutEffect(() => {
    if (!uiPrefs.motionEnabled || instance.isMinimized) return;
    animateWithGsap(
      windowRef.current,
      { opacity: 0, y: 26, scale: 0.96, transformOrigin: "center bottom" },
      { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out" }
    );
  }, [instance.id, instance.isMinimized, uiPrefs.motionEnabled]);

  useEffect(() => {
    const handle = dragRef.current;
    if (!handle || instance.isMaximized) return undefined;
    const onMouseDown = (event) => {
      if (event.target.closest("button")) return;
      onFocus(instance.id);
      const startX = event.clientX;
      const startY = event.clientY;
      const startPosition = { ...layoutRef.current.position };
      const startSize = { ...layoutRef.current.size };
      const onMove = (moveEvent) => {
        const nextPosition = {
          x: startPosition.x + moveEvent.clientX - startX,
          y: Math.max(12, startPosition.y + moveEvent.clientY - startY),
        };
        setPosition(nextPosition);
        if (nextPosition.x < 28) {
          onSnapPreview({ left: 12, top: 12, width: Math.floor(window.innerWidth / 2) - 24, height: window.innerHeight - 110 });
        } else if (nextPosition.x + startSize.width > window.innerWidth - 28) {
          onSnapPreview({ left: Math.floor(window.innerWidth / 2) + 12, top: 12, width: Math.floor(window.innerWidth / 2) - 36, height: window.innerHeight - 110 });
        } else if (nextPosition.y < 24) {
          onSnapPreview({ left: 24, top: 12, width: window.innerWidth - 48, height: window.innerHeight - 110 });
        } else {
          onSnapPreview(null);
        }
      };
      const onUp = () => {
        const current = layoutRef.current;
        let snapped = current;
        if (current.position.x < 28) {
          snapped = {
            position: { x: 12, y: 12 },
            size: { width: Math.floor(window.innerWidth / 2) - 24, height: window.innerHeight - 110 },
          };
        } else if (current.position.x + current.size.width > window.innerWidth - 28) {
          snapped = {
            position: { x: Math.floor(window.innerWidth / 2) + 12, y: 12 },
            size: { width: Math.floor(window.innerWidth / 2) - 36, height: window.innerHeight - 110 },
          };
        } else if (current.position.y < 24) {
          snapped = {
            position: { x: 24, y: 12 },
            size: { width: window.innerWidth - 48, height: window.innerHeight - 110 },
          };
        }
        setPosition(snapped.position);
        setSize(snapped.size);
        onSnapPreview(null);
        layoutRef.current = snapped;
        onRememberLayout(instance.id, layoutRef.current);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };
    handle.addEventListener("mousedown", onMouseDown);
    return () => handle.removeEventListener("mousedown", onMouseDown);
  }, [instance.id, instance.isMaximized, onFocus, onRememberLayout, onSnapPreview]);

  const startResize = (event, direction) => {
    event.stopPropagation();
    onFocus(instance.id);
    const startX = event.clientX;
    const startY = event.clientY;
    const startPosition = { ...position };
    const startSize = { ...size };
    const onMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const nextPosition = { ...startPosition };
      const nextSize = { ...startSize };
      if (direction.includes("e")) nextSize.width = Math.max(320, startSize.width + deltaX);
      if (direction.includes("s")) nextSize.height = Math.max(280, startSize.height + deltaY);
      if (direction.includes("w")) {
        const width = Math.max(320, startSize.width - deltaX);
        nextPosition.x = startPosition.x + startSize.width - width;
        nextSize.width = width;
      }
      if (direction.includes("n")) {
        const height = Math.max(280, startSize.height - deltaY);
        nextPosition.y = startPosition.y + startSize.height - height;
        nextSize.height = height;
      }
      setPosition(nextPosition);
      setSize(nextSize);
    };
    const onUp = () => {
      onRememberLayout(instance.id, layoutRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  if (!app) return null;
  const Component = app.component;
  const frameStyle = instance.isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100% - 4.5rem)",
      }
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col overflow-hidden border bg-white shadow-[0_28px_90px_rgba(0,0,0,0.38)] dark:bg-[#020617] ${
        instance.isMaximized ? "rounded-none" : "rounded-[40px]"
      } ${theme === "dark" ? "border-white/10" : "border-slate-200/90"}`}
      style={{ ...frameStyle, zIndex: instance.zIndex, display: instance.isMinimized ? "none" : "flex" }}
      onMouseDown={() => onFocus(instance.id)}
    >
      <div
        ref={dragRef}
        className={`flex h-11 items-center justify-between border-b px-3 ${
          instance.isMaximized ? "" : "cursor-move"
        } ${theme === "dark" ? "border-white/10 bg-[#020617] text-white" : "border-slate-200 bg-white text-slate-900"}`}
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-6">
            <ThemedIcon app={app} size={brandAppIds.has(app.id) ? "w-5 h-5" : "w-4 h-4"} />
          </div>
          <span className="text-sm font-semibold">{app.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {app.id !== "ai" ? (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onOpenApp?.("ai");
              }}
              title="Ask AI about this app"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
            >
              <Bot className="h-3 w-3" />
            </button>
          ) : null}
          <button
            onClick={(event) => {
              event.stopPropagation();
              onMinimize(instance.id);
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-black"
          >
            <Minimize2 className="h-3 w-3" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onToggleMaximize(instance.id);
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-black"
          >
            <Maximize2 className="h-3 w-3" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onClose(instance.id);
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-black"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Component
          theme={theme}
          toggleTheme={toggleTheme}
          visitorMode={visitorMode}
          onVisitorModeChange={onVisitorModeChange}
          uiPrefs={uiPrefs}
          onUpdatePrefs={onUpdatePrefs}
          onLockNow={onLockNow}
          onPreviewSound={onPreviewSound}
          onOpenApp={onOpenApp}
        />
      </div>
      {!instance.isMaximized
        ? [
            ["n", "left-4 right-4 top-0 h-1 cursor-ns-resize"],
            ["s", "bottom-0 left-4 right-4 h-1 cursor-ns-resize"],
            ["e", "right-0 top-4 bottom-4 w-1 cursor-ew-resize"],
            ["w", "left-0 top-4 bottom-4 w-1 cursor-ew-resize"],
            ["ne", "right-0 top-0 h-4 w-4 cursor-nesw-resize"],
            ["nw", "left-0 top-0 h-4 w-4 cursor-nwse-resize"],
            ["se", "bottom-0 right-0 h-4 w-4 cursor-nwse-resize"],
            ["sw", "bottom-0 left-0 h-4 w-4 cursor-nesw-resize"],
          ].map(([direction, className]) => (
            <button
              key={direction}
              type="button"
              aria-label={`Resize ${app.name}`}
              onMouseDown={(event) => startResize(event, direction)}
              className={`absolute ${className}`}
            />
          ))
        : null}
    </div>
  );
};

const ControlCenter = ({
  open,
  uiPrefs,
  visitorMode,
  onUpdatePrefs,
  onPreviewSound,
  onVisitorModeChange,
  onLockNow,
  onToggleTheme,
  onPowerOff,
  onLock,
}) => {
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    if (!open || !uiPrefs.motionEnabled) return;
    animateWithGsap(
      panelRef.current,
      { opacity: 0, y: 18, scale: 0.98, transformOrigin: "bottom right" },
      { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }
    );
  }, [open, uiPrefs.motionEnabled]);

  if (!open) return null;
  return (
    <div
      ref={panelRef}
      onMouseDown={(event) => event.stopPropagation()}
      className={`absolute bottom-20 right-4 z-50 max-h-[calc(100vh-6rem)] w-[300px] overflow-y-auto rounded-[22px] border border-white/10 p-3 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] ${
        uiPrefs.surfaceMode === "blur"
          ? "bg-slate-950/90 backdrop-blur-[180px]"
          : "bg-slate-950"
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onUpdatePrefs({ wifiEnabled: !uiPrefs.wifiEnabled })}
          className={`rounded-xl p-3 text-left ${uiPrefs.wifiEnabled ? "bg-cyan-500 text-white" : "bg-white/8"}`}
        >
          {uiPrefs.wifiEnabled ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
          <p className="mt-2 font-semibold">Wi-Fi</p>
          <p className="mt-1 text-xs opacity-80">{uiPrefs.wifiEnabled ? "Connected" : "Offline"}</p>
        </button>
        <button
          onClick={() => onUpdatePrefs({ soundEnabled: !uiPrefs.soundEnabled })}
          className={`rounded-xl p-3 text-left ${uiPrefs.soundEnabled ? "bg-emerald-500 text-slate-950" : "bg-white/8"}`}
        >
          {uiPrefs.soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          <p className="mt-2 font-semibold">Sound</p>
          <p className="mt-1 text-xs opacity-80">{uiPrefs.soundEnabled ? "Enabled" : "Muted"}</p>
        </button>
      </div>
      <div className="mt-3 rounded-xl bg-white/8 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Brightness</p>
          <span className="text-sm text-white/70">{uiPrefs.brightness}%</span>
        </div>
        <input
          type="range"
          min="45"
          max="100"
          value={uiPrefs.brightness}
          onChange={(event) => onUpdatePrefs({ brightness: Number(event.target.value) })}
          className="mt-3 w-full accent-cyan-400"
        />
      </div>
      <div className="mt-2 rounded-xl bg-white/8 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Volume</p>
          <button
            onClick={onPreviewSound}
            className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-100"
          >
            Test
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={uiPrefs.volume}
          onChange={(event) => onUpdatePrefs({ volume: Number(event.target.value) })}
          className="mt-3 w-full accent-cyan-400"
        />
      </div>
      <div className="mt-2 rounded-xl bg-white/8 p-3">
        <p className="text-sm font-semibold">Switch viewer</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {Object.entries(desktopPresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => onVisitorModeChange(key)}
              className={`rounded-xl px-3 py-2 text-xs transition-colors ${
                key === visitorMode
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-white/8 hover:bg-white/12"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onToggleTheme}
        className="mt-2 flex w-full items-center justify-between rounded-xl bg-white/8 px-3 py-2.5 text-sm"
      >
        <span>Theme</span>
        <span className="text-white/70">{uiPrefs.themeMode === "dark" ? "Dark" : "Light"}</span>
      </button>
      <button
        onClick={onLock}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400/18 px-3 py-2.5 text-sm text-cyan-100"
      >
        <Shield className="h-4 w-4" />
        Lock screen
      </button>
      <button
        onClick={onPowerOff}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/18 px-3 py-2.5 text-sm text-rose-100"
      >
        <Power className="h-4 w-4" />
        Power off
      </button>
      <button
        onClick={onLockNow}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-sm"
      >
        <Users className="h-4 w-4" />
        Switch user
      </button>
    </div>
  );
};

const LauncherMenu = ({ open, apps, onOpenApp, uiPrefs }) => {
  const menuRef = useRef(null);
  const [query, setQuery] = useState("");

  useLayoutEffect(() => {
    if (!open || !uiPrefs.motionEnabled) return;
    animateWithGsap(
      menuRef.current,
      { opacity: 0, y: 26, scale: 0.98, transformOrigin: "bottom center" },
      { opacity: 1, y: 0, scale: 1, duration: 0.36, ease: "power3.out" }
    );
  }, [open, uiPrefs.motionEnabled]);

  if (!open) return null;
  const shortcutMap = {
    cv: "resume",
    resume: "resume",
    github: "projects",
    project: "projects",
    projects: "projects",
    mail: "contact",
    email: "contact",
    weather: "weather",
    code: "vscode",
    notes: "notes",
  };
  const shortcutId = shortcutMap[query.trim().toLowerCase()];
  const filteredApps = apps
    .filter((app) => app.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div
      ref={menuRef}
      onMouseDown={(event) => event.stopPropagation()}
      className={`absolute bottom-20 left-6 z-50 flex max-h-[calc(100vh-7rem)] w-[460px] flex-col rounded-[32px] border border-white/10 p-5 text-white shadow-[0_34px_100px_rgba(0,0,0,0.48)] ${
        uiPrefs.surfaceMode === "blur"
          ? "bg-slate-950/90 backdrop-blur-[180px]"
          : "bg-slate-950"
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3">
        <Search className="h-4 w-4 text-white/60" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search apps"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
        />
      </div>
      {shortcutId ? (
        <button
          onClick={() => onOpenApp(shortcutId)}
          className="mt-3 w-full rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-left text-sm text-cyan-100"
        >
          Shortcut: open {apps.find((app) => app.id === shortcutId)?.name}
        </button>
      ) : null}
      <div className="mt-5 grid min-h-0 grid-cols-4 gap-3 overflow-y-auto pr-1">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className="rounded-2xl p-3 text-center transition-colors hover:bg-white/10"
          >
            <div className="mx-auto h-12 w-12">
              <ThemedIcon app={app} size={brandAppIds.has(app.id) ? "w-9 h-9" : "w-6 h-6"} />
            </div>
            <p className="mt-2 text-xs text-white/85">{app.name}</p>
          </button>
        ))}
      </div>
      {!filteredApps.length ? (
        <p className="mt-4 text-sm text-white/60">No apps match that search.</p>
      ) : null}
    </div>
  );
};

const DesktopTaskbar = ({
  openWindows,
  appList,
  pinnedIds,
  onOpenApp,
  onToggleLauncher,
  launcherOpen,
  onToggleControls,
  controlsOpen,
  uiPrefs,
}) => {
  const [time, setTime] = useState(new Date());
  const [orderedIds, setOrderedIds] = useState(pinnedIds);
  const dragId = useRef(null);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => setOrderedIds(pinnedIds), [pinnedIds]);

  const pinnedApps = orderedIds
    .map((id) => appList.find((app) => app.id === id))
    .filter(Boolean);

  return (
    <div
      onMouseDown={(event) => event.stopPropagation()}
      className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-[24px] border border-white/10 bg-slate-950/82 px-3 py-2 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
    >
      <button
        onClick={onToggleLauncher}
        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all ${
          launcherOpen ? "bg-white/18" : "hover:bg-white/10"
        }`}
      >
        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-[4px] bg-cyan-200" />
          ))}
        </div>
      </button>
      <div className="flex items-end gap-2">
        {pinnedApps.map((app) => {
          const isOpen = openWindows.some((item) => item.id === app.id && !item.isMinimized);
          return (
            <button
              key={app.id}
              draggable
              onDragStart={() => {
                dragId.current = app.id;
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                const from = dragId.current;
                if (!from || from === app.id) return;
                setOrderedIds((current) => {
                  const next = current.filter((id) => id !== from);
                  next.splice(next.indexOf(app.id), 0, from);
                  return next;
                });
              }}
              onClick={() => onOpenApp(app.id)}
              title={app.name}
              className={`group relative flex items-end justify-center rounded-2xl p-1.5 transition-all ${
                uiPrefs.dockMagnify ? "hover:-translate-y-2 hover:scale-[1.18]" : "hover:bg-white/10"
              }`}
            >
              <span className="pointer-events-none absolute -top-8 scale-95 rounded-lg bg-slate-950 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
                {app.name}
              </span>
              <div className={`${uiPrefs.dockMagnify ? "h-11 w-11" : "h-10 w-10"} transition-all`}>
                <ThemedIcon app={app} size={brandAppIds.has(app.id) ? "w-8 h-8" : "w-5 h-5"} />
              </div>
              {isOpen ? (
                <span className="absolute -bottom-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              ) : null}
            </button>
          );
        })}
      </div>
      <button
        onClick={onToggleControls}
        className={`flex items-center gap-3 rounded-[18px] px-3 py-2 transition-colors ${
          controlsOpen ? "bg-white/14" : "bg-black/20 hover:bg-white/10"
        }`}
      >
        {uiPrefs.wifiEnabled ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4 text-rose-300" />}
        {uiPrefs.soundEnabled && uiPrefs.volume > 0 ? (
          uiPrefs.volume < 45 ? <Volume1 className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
        <Battery className="h-4 w-4" />
        <span className="text-sm font-medium">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !uiPrefs.use24HourClock,
          })}
        </span>
      </button>
    </div>
  );
};

const VisitorModeScreen = ({ onSelect, theme }) => (
  <div className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden p-5 text-white">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          theme === "light"
            ? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400"
            : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400"
        })`,
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(16,185,129,0.18),transparent_24%),rgba(0,0,0,0.68)]" />
    <div className="relative w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between rounded-[34px] border border-white/10 bg-slate-950/76 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur-[90px]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
            <Monitor className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Portfolio OS Login</p>
            <p className="font-semibold">{personalInfo.name}</p>
          </div>
        </div>
        <div className="hidden rounded-full bg-white/8 px-4 py-2 text-sm text-white/70 md:block">
          Pick a workspace
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {Object.entries(desktopPresets).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="group min-h-[300px] rounded-[36px] border border-white/10 bg-slate-950/76 p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-[90px] transition-transform hover:-translate-y-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.26em] text-cyan-200">{preset.label}</p>
                  <div className="rounded-2xl bg-white/10 p-3 text-cyan-200">
                    {key === "recruiter" ? <Users className="h-6 w-6" /> : key === "engineer" ? <Code2 className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
                  </div>
                </div>
                <h2 className="mt-5 text-3xl font-semibold">{preset.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{preset.subtitle}</p>
              </div>
              <div className="mt-8 rounded-[22px] border border-white/10 bg-white/8 p-3 text-sm text-white/75 group-hover:bg-cyan-400 group-hover:text-slate-950">
                Enter workspace
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const MobileAppView = ({ app, onClose, sharedProps }) => {
  const Component = app.component;
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-slate-100 dark:bg-slate-950">
      <div className="flex h-12 items-center justify-between border-b border-slate-200 px-3 dark:border-white/10">
        <button onClick={onClose}>
          <ArrowLeft className="h-5 w-5 text-slate-900 dark:text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6">
            <ThemedIcon app={app} size="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{app.name}</span>
        </div>
        <span className="w-5" />
      </div>
      <div className="flex-1 overflow-hidden">
        <Component {...sharedProps} />
      </div>
    </div>
  );
};

const MobileUI = ({ appList, sharedProps }) => {
  const [activeAppId, setActiveAppId] = useState(null);
  const activeApp = appList.find((app) => app.id === activeAppId);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.28),transparent_32%),linear-gradient(180deg,#07111d,#0f172a_60%,#111827)]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-10 items-center justify-between px-4 text-sm font-medium text-white">
          <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <Battery className="h-4 w-4" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-4 content-start gap-y-7 px-4 pt-8">
          {appList.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveAppId(app.id)}
              className="flex flex-col items-center gap-2 text-xs text-white"
            >
              <div className="h-16 w-16 rounded-[22px] bg-black/25 p-2">
                <ThemedIcon app={app} size="w-7 h-7" />
              </div>
              <span className="text-center">{app.name}</span>
            </button>
          ))}
        </div>
        {activeApp ? (
          <MobileAppView
            app={activeApp}
            onClose={() => setActiveAppId(null)}
            sharedProps={sharedProps}
          />
        ) : null}
      </div>
    </div>
  );
};

const DesktopUI = ({
  appList,
  appMap,
  theme,
  toggleTheme,
  visitorMode,
  onVisitorModeChange,
  uiPrefs,
  onUpdatePrefs,
  onPreviewSound,
  onLockNow,
  onPowerOff,
}) => {
  const [windows, setWindows] = useState([]);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [locked, setLocked] = useState(false);
  const [snapPreview, setSnapPreview] = useState(null);
  const [showHint, setShowHint] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-os-hint-seen") !== "true";
    } catch {
      return true;
    }
  });
  const [windowLayouts, setWindowLayouts] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("portfolio-os-window-layouts") || "{}");
    } catch {
      return {};
    }
  });
  const closeTimeouts = useRef({});
  const preset = desktopPresets[visitorMode] || desktopPresets.explore;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey && event.code === "Space") {
        event.preventDefault();
        setLauncherOpen((current) => !current);
        setControlsOpen(false);
      }
      if (event.key === "Escape") {
        setLauncherOpen(false);
        setControlsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const bringToFront = useCallback((id) => {
    setWindows((current) => {
      const topZ = Math.max(20, ...current.map((item) => item.zIndex || 0)) + 1;
      return current.map((item) =>
        item.id === id ? { ...item, zIndex: topZ, isMinimized: false } : item
      );
    });
  }, []);

  const openApp = useCallback(
    (id) => {
      setLauncherOpen(false);
      setControlsOpen(false);
      setWindows((current) => {
        const existing = current.find((item) => item.id === id);
        const topZ = Math.max(20, ...current.map((item) => item.zIndex || 0)) + 1;
        if (existing) {
          return current.map((item) =>
            item.id === id ? { ...item, zIndex: topZ, isMinimized: false } : item
          );
        }
        return [
          ...current,
          {
            id,
            zIndex: topZ,
            isMinimized: false,
            isMaximized: false,
            isClosing: false,
            layout: windowLayouts[id],
          },
        ];
      });
      if (uiPrefs.soundEnabled) {
        onPreviewSound();
      }
    },
    [onPreviewSound, uiPrefs.soundEnabled, windowLayouts]
  );

  const rememberWindowLayout = useCallback((id, layout) => {
    setWindowLayouts((current) => {
      const next = { ...current, [id]: layout };
      try {
        window.localStorage.setItem("portfolio-os-window-layouts", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const closeApp = useCallback(
    (id) => {
      setWindows((current) =>
        current.map((item) => (item.id === id ? { ...item, isClosing: true } : item))
      );
      const node = document.querySelector(`[data-window-id="${id}"]`);
      if (node && uiPrefs.motionEnabled) {
        animateWithGsap(
          node,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: 28, scale: 0.96, duration: 0.25, ease: "power2.in" }
        );
      }
      window.clearTimeout(closeTimeouts.current[id]);
      closeTimeouts.current[id] = window.setTimeout(() => {
        setWindows((current) => current.filter((item) => item.id !== id));
      }, uiPrefs.motionEnabled ? 220 : 0);
    },
    [uiPrefs.motionEnabled]
  );

  const minimizeApp = (id) => {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, isMinimized: true } : item))
    );
  };

  const toggleMaximize = (id) => {
    setWindows((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isMaximized: !item.isMaximized } : item
      )
    );
  };

  const desktopApps = appList.filter((app) => !["launcher"].includes(app.id));
  const leftRailApps =
    visitorMode === "recruiter"
      ? desktopApps.filter((app) => ["resume", "contact", "checklist", "about", "projects", "commands"].includes(app.id))
      : visitorMode === "engineer"
      ? desktopApps.filter((app) => ["vscode", "terminal", "browser", "projects", "resume", "settings"].includes(app.id))
      : desktopApps.filter((app) => ["about", "projects", "browser", "spotify", "weather", "notes", "calendar", "commands", "notifications", "snake", "memory", "reflex", "trash", "settings"].includes(app.id));

  return (
    <div
      className="relative h-full w-full"
      onContextMenu={(event) => {
        event.preventDefault();
        const menuWidth = 224;
        const menuHeight = 238;
        setContextMenu({
          x: Math.max(8, Math.min(event.clientX, window.innerWidth - menuWidth - 8)),
          y: Math.max(8, Math.min(event.clientY, window.innerHeight - menuHeight - 8)),
        });
      }}
      onMouseDown={() => {
        setLauncherOpen(false);
        setControlsOpen(false);
        setContextMenu(null);
      }}
    >
      <ModeDesktopLayer
        visitorMode={visitorMode}
        onOpen={openApp}
        theme={theme}
        uiPrefs={uiPrefs}
      />
      {snapPreview ? (
        <div
          className="pointer-events-none fixed z-[35] rounded-[38px] border border-cyan-200/80 bg-cyan-300/18 shadow-[0_0_55px_rgba(34,211,238,0.35)]"
          style={snapPreview}
        />
      ) : null}
      {visitorMode === "explore" && uiPrefs.floatingChips ? (
        <>
          <NowPlayingWidget onOpen={openApp} />
        </>
      ) : null}
      {showHint ? (
        <OnboardingHint
          onDismiss={() => {
            setShowHint(false);
            try {
              window.localStorage.setItem("portfolio-os-hint-seen", "true");
            } catch {}
          }}
        />
      ) : null}
      <DesktopContextMenu
        point={contextMenu}
        onOpen={openApp}
        onSwitchMode={onVisitorModeChange}
        onLock={() => setLocked(true)}
        onClose={() => setContextMenu(null)}
      />
      {locked ? (
        <LockOverlay
          onUnlock={() => setLocked(false)}
          onSwitchUser={() => {
            setLocked(false);
            onLockNow();
          }}
        />
      ) : null}

      <div
        className={`absolute top-5 z-20 flex h-[calc(100%-7rem)] flex-col content-start px-2 ${
          visitorMode === "recruiter"
            ? "left-4 flex-nowrap gap-y-1"
            : visitorMode === "engineer"
            ? "right-4 flex-wrap items-end gap-y-1"
            : "left-4 flex-wrap gap-y-1"
        }`}
      >
        {leftRailApps.map((app) => (
          <DesktopIcon key={app.id} app={app} onOpen={openApp} compact={visitorMode === "recruiter"} />
        ))}
      </div>

      {windows.map((instance) => (
        <div
          key={instance.id}
          data-window-id={instance.id}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <DesktopWindow
            instance={instance}
            appMap={appMap}
            theme={theme}
            toggleTheme={toggleTheme}
            visitorMode={visitorMode}
            onVisitorModeChange={onVisitorModeChange}
            uiPrefs={uiPrefs}
            onUpdatePrefs={onUpdatePrefs}
            onPreviewSound={onPreviewSound}
            onFocus={bringToFront}
            onMinimize={minimizeApp}
            onClose={closeApp}
            onToggleMaximize={toggleMaximize}
            onLockNow={onLockNow}
            onRememberLayout={rememberWindowLayout}
            onOpenApp={openApp}
            onSnapPreview={setSnapPreview}
          />
        </div>
      ))}

      <LauncherMenu
        open={launcherOpen}
        apps={desktopApps}
        onOpenApp={openApp}
        uiPrefs={uiPrefs}
      />
      <ControlCenter
        open={controlsOpen}
        uiPrefs={uiPrefs}
        visitorMode={visitorMode}
        onUpdatePrefs={onUpdatePrefs}
        onPreviewSound={onPreviewSound}
        onVisitorModeChange={onVisitorModeChange}
        onLockNow={onLockNow}
        onToggleTheme={toggleTheme}
        onPowerOff={onPowerOff}
        onLock={() => setLocked(true)}
      />
      <DesktopTaskbar
        openWindows={windows}
        appList={appList}
        pinnedIds={preset.pinned}
        onOpenApp={openApp}
        onToggleLauncher={() => {
          setLauncherOpen((current) => !current);
          setControlsOpen(false);
        }}
        launcherOpen={launcherOpen}
        onToggleControls={() => {
          setControlsOpen((current) => !current);
          setLauncherOpen(false);
        }}
        controlsOpen={controlsOpen}
        uiPrefs={uiPrefs}
        onPreviewSound={onPreviewSound}
        onUpdatePrefs={onUpdatePrefs}
      />
    </div>
  );
};

const BootScreen = ({ onBooted }) => {
  useEffect(() => {
    const timer = window.setTimeout(onBooted, 1400);
    return () => window.clearTimeout(timer);
  }, [onBooted]);
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#060b11] text-white">
      <div className="h-20 w-20 rounded-[28px] border border-cyan-300/20 bg-white/5 p-5">
        <Monitor className="h-full w-full text-cyan-300" />
      </div>
      <p className="mt-5 text-lg">Portfolio OS</p>
      <div className="mt-5 h-1.5 w-60 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
      </div>
    </div>
  );
};

const PowerOffScreen = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-slate-500">
    It is now safe to close the window.
  </div>
);

const apps = [
  { id: "about", name: "About Me", icon: User, component: AboutApp },
  { id: "contact", name: "Contact", icon: Mail, component: ContactApp, badge: "Mail" },
  { id: "commands", name: "Commands", icon: Search, component: CommandPaletteApp },
  { id: "notifications", name: "Notifications", icon: Bell, component: NotificationsApp },
  { id: "browser", name: "Chrome", icon: chromeIcon, component: BrowserApp },
  { id: "vscode", name: "VS Code", icon: vscodeIcon, component: VSCodeApp },
  { id: "terminal", name: "Terminal", icon: TerminalSquare, component: TerminalApp },
  { id: "projects", name: "Projects", icon: FolderOpen, component: ProjectsApp, badge: "Work" },
  { id: "resume", name: "Resume", icon: FileText, component: ResumeApp, badge: "CV" },
  { id: "checklist", name: "Checklist", icon: CheckCircle2, component: RecruiterChecklistApp, badge: "HR" },
  { id: "notes", name: "Notes", icon: StickyNote, component: NotesApp },
  { id: "calendar", name: "Calendar", icon: CalendarDays, component: CalendarApp },
  { id: "spotify", name: "Spotify", icon: spotifyIcon, component: SpotifyApp },
  { id: "youtube", name: "YouTube", icon: Youtube, component: YoutubeApp },
  { id: "weather", name: "Weather", icon: CloudSun, component: WeatherApp },
  { id: "snake", name: "Snake", icon: Gamepad2, component: SnakeApp, badge: "Game" },
  { id: "memory", name: "Memory", icon: Brain, component: MemoryApp, badge: "Game" },
  { id: "reflex", name: "Reflex", icon: Crosshair, component: ReflexApp, badge: "Game" },
  { id: "calculator", name: "Calculator", icon: Calculator, component: CalculatorApp },
  { id: "settings", name: "Settings", icon: Settings, component: SettingsApp },
  { id: "ai", name: "AI Counselor", icon: Bot, component: AICounselorApp },
  { id: "trash", name: "Trash", icon: Trash2, component: TrashApp },
];

const defaultUiPrefs = {
  accent: "cyan",
  brightness: 86,
  wifiEnabled: true,
  soundEnabled: true,
  volume: 62,
  wallpaperDim: true,
  floatingChips: true,
  use24HourClock: true,
  tipsEnabled: true,
  aiEnabled: true,
  motionEnabled: true,
  smoothTheme: true,
  dockMagnify: true,
  surfaceMode: "opaque",
  themeMode: "dark",
};

export default function App() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [booting, setBooting] = useState(true);
  const [poweredOff, setPoweredOff] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [visitorMode, setVisitorMode] = useState(null);
  const [uiPrefs, setUiPrefs] = useState(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-os-settings");
      return saved ? { ...defaultUiPrefs, ...JSON.parse(saved) } : defaultUiPrefs;
    } catch {
      return defaultUiPrefs;
    }
  });

  const appMap = useMemo(
    () =>
      apps.reduce((map, app) => {
        map[app.id] = app;
        return map;
      }, {}),
    []
  );

  useEffect(() => {
    const effectiveTheme = uiPrefs.themeMode || theme;
    document.body.classList.toggle("dark", effectiveTheme === "dark");
    document.body.classList.add("shell-transition");
    document.documentElement.style.colorScheme = effectiveTheme;
  }, [theme, uiPrefs.themeMode]);

  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-os-settings", JSON.stringify(uiPrefs));
    } catch {
      // Ignore storage failures in private or restricted browsing modes.
    }
  }, [uiPrefs]);

  const updateUiPrefs = (patch) => {
    setUiPrefs((current) => ({ ...current, ...patch }));
  };

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
    setUiPrefs((current) => ({
      ...current,
      themeMode: current.themeMode === "dark" ? "light" : "dark",
    }));
  }, []);

  const previewSound = useCallback(async () => {
    await systemSound(uiPrefs.volume, !uiPrefs.soundEnabled);
  }, [uiPrefs.soundEnabled, uiPrefs.volume]);

  const effectiveTheme = uiPrefs.themeMode || theme;
  const sharedProps = {
    theme: effectiveTheme,
    toggleTheme,
    visitorMode,
    onVisitorModeChange: setVisitorMode,
    uiPrefs,
    onUpdatePrefs: updateUiPrefs,
    onLockNow: () => setVisitorMode(null),
    onPreviewSound: previewSound,
  };
  const wallpaperUrl =
    effectiveTheme === "dark"
      ? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600"
      : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600";

  if (booting && !isMobile) return <BootScreen onBooted={() => setBooting(false)} />;
  if (poweredOff) return <PowerOffScreen />;
  if (!visitorMode) return <VisitorModeScreen onSelect={setVisitorMode} theme={effectiveTheme} />;

  return (
    <div className={`h-screen w-screen overflow-hidden bg-black ${uiPrefs.smoothTheme ? "duration-500" : "duration-200"}`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      />
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          uiPrefs.wallpaperDim
            ? effectiveTheme === "dark"
              ? "bg-black/36"
              : "bg-black/16"
            : effectiveTheme === "dark"
            ? "bg-black/12"
            : "bg-transparent"
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%)]" />
      <div
        className="relative z-10 h-full w-full"
        style={{ filter: `brightness(${uiPrefs.brightness}%)` }}
      >
        {isMobile ? (
          <MobileUI appList={apps} sharedProps={sharedProps} />
        ) : (
          <DesktopUI
            appList={apps}
            appMap={appMap}
            theme={effectiveTheme}
            toggleTheme={toggleTheme}
            visitorMode={visitorMode}
            onVisitorModeChange={setVisitorMode}
            uiPrefs={uiPrefs}
            onUpdatePrefs={updateUiPrefs}
            onPreviewSound={previewSound}
            onLockNow={() => setVisitorMode(null)}
            onPowerOff={() => setPoweredOff(true)}
          />
        )}
      </div>
    </div>
  );
}
