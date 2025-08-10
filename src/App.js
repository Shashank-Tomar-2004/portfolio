/*
 * =================================================================
 * FILE: App.js (Zorin OS Portfolio) - STAGE 8.1: DEFINITIVE FIX
 * =================================================================
 *
 * This version corrects the layout regressions from the previous
 * attempt and properly implements the separate, native mobile UI.
 *
 * Key Upgrades:
 * - DESKTOP UI RESTORED: The desktop layout is returned to its
 *   fully functional state with a visible taskbar.
 * - TRUE MOBILE UI IMPLEMENTED: The app now correctly renders a
 *   completely separate UI on mobile, with a top status bar,
 *   app grid, and full-screen app navigation.
 *
 * =================================================================
 */
import React, { useState, useEffect, useRef } from "react";

// Import Icon libraries
import {
  Wifi,
  Volume2,
  Battery,
  Star,
  ChevronsRight,
  Code,
  Linkedin,
  Github,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  X,
  Bot,
  Sparkles,
  Award,
  File,
  Folder,
  Mail,
  User,
  Briefcase,
  Trophy,
  BookOpen,
  Trash2,
  RotateCcw,
  Code2,
  TerminalSquare,
  Calculator,
  Settings,
  Power,
  Menu,
  ArrowLeft,
} from "lucide-react";

// =================================================================
// RESPONSIVE UTILITY HOOK
// =================================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

// =================================================================
// DATA & SOURCE CODE
// =================================================================
const personalInfo = {
  name: "Shashank Tomar",
  email: "ambrosedean351@gmail.com",
  linkedin: "https://www.linkedin.com/in/iamshashanktomar",
  github: "https://github.com/shashank-tomar-2004",
  phone: "+91 8115868573",
  avatar: "https://avatarfiles.alphacoders.com/374/thumb-1920-374337.png",
  intro: [
    "A Graduate Student currently pursuing Computer Science, with a strong foundation in software development and competitive programming.",
    "I enjoy building awesome software that solves practical problems and I have a keen interest in Generative AI.",
    "When I'm not coding, I'm probably watching movies and series—especially sci-fi and anything on a Nolan level.",
  ],
};
const education = [
  {
    degree: "Bachelor of Technology, Computer Science and Engineering",
    institution: "Gautam Buddha University",
    duration: "2022 - 2026",
    location: "Greater Noida, India",
    score: "CGPA: 7.52",
  },
  {
    degree: "XII (PCM with Computer Science)",
    institution: "City Montessori School (CMS)",
    duration: "2020 - 2022",
    location: "Lucknow, India",
    score: "Percentage: 89.5%",
  },
  {
    degree: "X (Science, Maths, Computer Applications)",
    institution: "City Montessori School (CMS)",
    duration: "2019 - 2020",
    location: "Lucknow, India",
    score: "Percentage: 92.4%",
  },
];
const experiences = [
  {
    role: "Course Mentor Intern (DSA)",
    company: "GeeksforGeeks",
    duration: "August 2025 - Present",
    location: "SKIT Jaipur (Onsite)",
    points: [
      "Currently mentoring students in Data Structures and Algorithms.",
      "Assisting in doubt resolution and providing guidance on competitive programming concepts.",
      "Contributing to the learning experience of aspiring developers.",
    ],
  },
  {
    role: "Mentor",
    company: "Girlscript Summer of Code",
    duration: "May 2024 - August 2024",
    location: "Remote",
    points: [
      "Mentored developers on complex Golang concepts, improving project completion rates by 40%.",
      "Developed and optimized the Gofr project using Gin-Gonic, enhancing performance and scalability.",
      "Streamlined strategic guidance for contributors, achieving a 35% increase in project efficiency and enhancing team performance by 30%.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "Frienducation",
    duration: "October 2023 - January 2024",
    location: "Remote",
    points: [
      "Delivered in-depth explanations of Competitive Programming & DSA, advancing students' skills by 30%.",
      "Increased participation in coding competitions by 50% within a semester.",
      "Incremented participant success rates by 70% through post-contest debriefs.",
    ],
  },
];
const achievements = [
  {
    platform: "Meta Hackercup",
    rank: "Round 2 Qualifier",
    link: "https://drive.google.com/file/d/1i1xY247K-s4I7twjmE-tB1cK8mabgbZg/view?usp=drivesdk",
    icon: <Star className="w-5 h-5 text-yellow-400" />,
  },
  {
    platform: "ICPC Chennai Regionals",
    rank: "Onsite Round Qualifier",
    link: "https://drive.google.com/file/d/1EiT1SlfT-WRTHgouEZUtIdYBhm2T3voh/view?usp=drivesdk",
    icon: <Award className="w-5 h-5 text-blue-400" />,
  },
  {
    platform: "LeetCode",
    rank: "Knight (Top 3.7%) ",
    link: "http://leetcode.com/u/ambrosedean351",
    icon: <Code className="w-5 h-5 text-orange-400" />,
  },
  {
    platform: "CodeChef",
    rank: "4 Stars (Top 3.5%)",
    link: "https://www.codechef.com/users/thetomar9",
    icon: <Star className="w-5 h-5 text-yellow-400" />,
  },
  {
    platform: "Codeforces",
    rank: "Expert (Top 5%)",
    link: "https://codeforces.com/profile/deadpool_wolverine",
    icon: <ChevronsRight className="w-5 h-5 text-red-500" />,
  },
];
const skills = [
  "GoLang",
  "Git",
  "Linux",
  "GenAI",
  "C++",
  "Java",
  "Problem Solving",
  "Algorithms",
];
const projects = [
  {
    id: "pokedex",
    title: "Pokedex Golang",
    description:
      "Built a comprehensive Pokedex in Golang, using Bulbapedia.com to generate JSON files for data.",
    tech: ["Golang", "Gin-Gonic", "Gorilla Mux"],
    link: "https://github.com/shashank-tomar-2004/pokedex",
  },
  {
    id: "hacktoberfest",
    title: "Hacktoberfest '23 Contributions",
    description:
      "Contributed to Frienducation's Hacktoberfest Repository by optimizing various algorithms.",
    tech: ["C++", "Java", "Algorithms"],
    link: "https://github.com/Frienducation/DSA",
  },
];
const sourceCode = {
  "App.js": `// You are looking at this file right now!`,
  "api/gemini.js": `// Secure serverless function code`,
  "README.md": `// Project README file`,
};

// SECURE API CALL FUNCTION
const callGeminiAPI = async (prompt) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "An unknown error occurred.");
    }
    return result.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `An error occurred: ${error.message}`;
  }
};

// =================================================================
// OS-THEMED APP COMPONENTS (shared logic)
// =================================================================
const AboutSection = () => (
  <div className="p-4 md:p-6 text-center flex flex-col items-center">
    {" "}
    <img
      src={personalInfo.avatar}
      alt="Shashank Tomar"
      className="w-28 h-28 rounded-full border-4 border-indigo-400 mb-4"
    />{" "}
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
      Hi, I'm {personalInfo.name}
    </h2>{" "}
    <p className="text-indigo-600 dark:text-indigo-400 text-2xl font-semibold mb-6">
      I'm a CS Grad Student!
    </p>{" "}
    <div className="space-y-3 text-gray-700 dark:text-gray-300 max-w-2xl text-left">
      {" "}
      {personalInfo.intro.map((point, i) => (
        <p key={i}>
          <span className="text-xl mr-2">👋</span> {point}
        </p>
      ))}{" "}
    </div>{" "}
  </div>
);
const EducationSection = () => (
  <div className="p-4 md:p-6">
    {" "}
    <h3 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">
      Education
    </h3>{" "}
    <div className="space-y-6">
      {" "}
      {education.map((edu, i) => (
        <div key={i}>
          {" "}
          <p className="font-semibold text-lg">{edu.degree}</p>{" "}
          <p className="text-indigo-600 dark:text-indigo-400">
            {edu.institution}
          </p>{" "}
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
            {" "}
            <span>
              {edu.duration} | {edu.location}
            </span>{" "}
            <span className="font-medium">{edu.score}</span>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>{" "}
  </div>
);
const SkillsSection = () => (
  <div className="p-4 md:p-6">
    {" "}
    <h3 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">
      Skills
    </h3>{" "}
    <div className="flex flex-wrap gap-3">
      {" "}
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
        >
          {skill}
        </span>
      ))}{" "}
    </div>{" "}
    <h3 className="font-bold text-2xl mt-6 mb-4 text-gray-900 dark:text-white">
      Achievements
    </h3>{" "}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {" "}
      {achievements.map((ach, index) => (
        <a
          href={ach.link}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {" "}
          {ach.icon}{" "}
          <div>
            {" "}
            <p className="font-medium">{ach.platform}</p>{" "}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {ach.rank}
            </p>{" "}
          </div>{" "}
        </a>
      ))}{" "}
    </div>{" "}
  </div>
);
const ProjectsSection = () => {
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState({});
  const generateSummary = async (project) => {
    setLoading((prev) => ({ ...prev, [project.id]: true }));
    const prompt = `Generate a professional, one-paragraph summary for a software project titled "${project.title}". The description is: "${project.description}"`;
    const summary = await callGeminiAPI(prompt);
    setSummaries((prev) => ({ ...prev, [project.id]: summary }));
    setLoading((prev) => ({ ...prev, [project.id]: false }));
  };
  return (
    <div className="p-4 md:p-6">
      {" "}
      <h3 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">
        Projects
      </h3>{" "}
      <div className="space-y-4">
        {" "}
        {projects.map((project) => (
          <div key={project.id} className="border-b dark:border-gray-700 pb-4">
            {" "}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {project.title}
            </a>{" "}
            <p className="text-sm text-gray-600 dark:text-gray-300 my-1">
              {project.description}
            </p>{" "}
            <div className="flex flex-wrap gap-2 mt-2">
              {" "}
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >
                  {t}
                </span>
              ))}{" "}
            </div>{" "}
            <div className="mt-3">
              {" "}
              <button
                onClick={() => generateSummary(project)}
                disabled={loading[project.id]}
                className="text-sm inline-flex items-center font-medium text-purple-600 dark:text-purple-400 hover:underline disabled:opacity-50"
              >
                {" "}
                <Sparkles className="w-4 h-4 mr-1" />{" "}
                {loading[project.id] ? "Generating..." : "Analyse Project"}{" "}
              </button>{" "}
            </div>{" "}
            {summaries[project.id] && (
              <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md text-sm">
                {" "}
                <p className="font-semibold mb-1 text-purple-700 dark:text-purple-400">
                  ✨ AI Summary:
                </p>{" "}
                <p>{summaries[project.id]}</p>{" "}
              </div>
            )}{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
const ExperienceSection = () => (
  <div className="p-4 md:p-6">
    {" "}
    <h3 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">
      Experience
    </h3>{" "}
    <div className="space-y-6">
      {" "}
      {experiences.map((exp, index) => (
        <div key={index} className="border-l-4 border-indigo-500 pl-4">
          {" "}
          <h4 className="text-lg font-semibold">{exp.role}</h4>{" "}
          <p className="font-medium text-indigo-600 dark:text-indigo-400">
            {exp.company}
          </p>{" "}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {exp.duration} | {exp.location}
          </p>{" "}
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
            {" "}
            {exp.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}{" "}
          </ul>{" "}
        </div>
      ))}{" "}
    </div>{" "}
  </div>
);

const AboutApp = ({ isMobile, isSidebarOpen, onSidebarToggle }) => {
  const [activeSection, setActiveSection] = useState("about");
  const sections = {
    about: { label: "About Me", icon: User, component: AboutSection },
    education: {
      label: "Education",
      icon: BookOpen,
      component: EducationSection,
    },
    skills: {
      label: "Skills & Achievements",
      icon: Trophy,
      component: SkillsSection,
    },
    experience: {
      label: "Experience",
      icon: Briefcase,
      component: ExperienceSection,
    },
    projects: { label: "Projects", icon: Code2, component: ProjectsSection },
  };
  const ActiveComponent = sections[activeSection].component;
  const sidebarClass = isMobile
    ? isSidebarOpen
      ? "translate-x-0"
      : "-translate-x-full"
    : "";
  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 relative overflow-hidden">
      <div
        className={`absolute md:relative z-20 w-56 bg-gray-100 dark:bg-gray-900 h-full p-4 border-r dark:border-gray-700 flex flex-col transition-transform transform ${sidebarClass}`}
      >
        {Object.entries(sections).map(([key, { label, icon: Icon }]) => (
          <button
            key={key}
            onClick={() => {
              setActiveSection(key);
              if (isMobile && onSidebarToggle) onSidebarToggle();
            }}
            className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeSection === key
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700/50"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </div>
    </div>
  );
};
const VSCodeApp = ({ isMobile, isSidebarOpen }) => {
  const [activeFile, setActiveFile] = useState("App.js");
  const sidebarClass = isMobile
    ? isSidebarOpen
      ? "translate-x-0"
      : "-translate-x-full"
    : "";
  return (
    <div className="bg-[#1e1e1e] h-full text-white font-mono text-sm flex flex-col">
      {" "}
      <div className="flex-grow flex relative overflow-hidden">
        {" "}
        <div
          className={`absolute md:relative z-20 w-48 bg-[#252526] h-full p-2 flex-shrink-0 flex flex-col transition-transform transform ${sidebarClass}`}
        >
          {" "}
          <h3 className="text-xs uppercase text-gray-400 tracking-wider mb-2 px-2">
            Explorer
          </h3>{" "}
          <div className="space-y-1">
            {Object.keys(sourceCode).map((file) => (
              <button
                key={file}
                onClick={() => setActiveFile(file)}
                className={`w-full text-left text-sm px-2 py-1 rounded flex items-center gap-2 ${
                  activeFile === file ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"
                } transition-colors`}
              >
                <File className="w-4 h-4 text-blue-400" /> {file}
              </button>
            ))}
          </div>{" "}
        </div>{" "}
        <div className="flex-grow flex flex-col">
          {" "}
          <div className="bg-[#252526] flex-shrink-0">
            {" "}
            <div className="bg-[#37373d] inline-flex items-center px-4 py-2 w-full md:w-auto border-t-2 border-blue-500">
              {" "}
              <File className="w-4 h-4 text-blue-400 mr-2" /> {activeFile}{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex-grow p-4 overflow-auto bg-[#1e1e1e]">
            {" "}
            <pre>
              <code>{sourceCode[activeFile]}</code>
            </pre>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="h-8 bg-[#1e1e1e] border-t border-gray-700 items-center px-4 text-xs gap-4 hidden md:flex">
        <span>PROBLEMS</span>
        <span>OUTPUT</span>
        <span className="border-b-2 border-blue-500">TERMINAL</span>
      </div>{" "}
    </div>
  );
};
const AICounselorApp = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! Ask me anything about Shashank's skills or career path.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    const resumeContext = `This is the resume of Shashank Tomar: ${JSON.stringify(
      personalInfo
    )}, Experience: ${JSON.stringify(experiences)}, Projects: ${JSON.stringify(
      projects
    )}. Based on this, answer the user's query.`;
    const prompt = `${resumeContext}\n\nUser Query: "${input}"`;
    const aiResponse = await callGeminiAPI(prompt);
    setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col h-full text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50">
      {" "}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {" "}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {" "}
            {msg.role === "ai" && (
              <Bot className="w-6 h-6 flex-shrink-0 text-blue-500" />
            )}{" "}
            <div
              className={`p-3 rounded-lg max-w-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-700 rounded-bl-none"
              }`}
            >
              {" "}
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>{" "}
            </div>{" "}
            {msg.role === "user" && (
              <User className="w-6 h-6 flex-shrink-0 text-gray-500" />
            )}{" "}
          </div>
        ))}{" "}
        {isLoading && (
          <div className="text-center text-sm text-gray-500 animate-pulse">
            AI is thinking...
          </div>
        )}{" "}
        <div ref={chatEndRef} />{" "}
      </div>{" "}
      <div className="p-2 border-t dark:border-gray-700">
        {" "}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          {" "}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Shashank..."
            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />{" "}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
const TerminalApp = () => {
  const [history, setHistory] = useState([
    { type: "output", text: "Welcome! Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const handleCommand = async (cmd) => {
    let newHistory = [...history, { type: "input", text: cmd }];
    let output = "";
    if (cmd === "help") {
      output = "Available commands: about, projects, contact, meme, ls, clear";
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd === "ls") {
      output = apps
        .map((app) => app.name.toLowerCase().replace(/ /g, "_"))
        .join("   ");
    } else if (cmd === "meme") {
      setHistory((h) => [
        ...h,
        { type: "input", text: cmd },
        { type: "output", text: "Fetching a meme..." },
      ]);
      try {
        const response = await fetch(
          "https://meme-api.com/gimme/wholesomememes"
        );
        const data = await response.json();
        output = data.url;
      } catch (error) {
        output = "Error fetching meme. Please try again.";
      }
    } else {
      output = `Command not found: ${cmd}.`;
    }
    setHistory((h) => {
      const lastCommand = h[h.length - 1];
      if (lastCommand && lastCommand.text === "Fetching a meme...") {
        const updatedHistory = [...h];
        updatedHistory[h.length - 1] = {
          type: output.startsWith("http") ? "image" : "output",
          text: output,
        };
        return updatedHistory;
      }
      return [
        ...newHistory,
        { type: output.startsWith("http") ? "image" : "output", text: output },
      ];
    });
  };
  return (
    <div
      className="p-2 bg-[#1d1f21] h-full text-[#c5c8c6] font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {" "}
      <div className="overflow-y-auto h-full">
        {" "}
        {history.map((line, i) => (
          <div key={i}>
            {" "}
            {line.type === "input" && (
              <div>
                <span className="text-green-400">user@portfolio:~$</span>{" "}
                {line.text}
              </div>
            )}{" "}
            {line.type === "output" && (
              <div className="whitespace-pre-wrap">{line.text}</div>
            )}{" "}
            {line.type === "image" && (
              <img
                src={line.text}
                alt="meme"
                className="max-w-xs my-2 rounded-md"
              />
            )}{" "}
          </div>
        ))}{" "}
        <div className="flex gap-2">
          {" "}
          <span className="text-green-400">user@portfolio:~$</span>{" "}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
                setInput("");
              }
            }}
            className="bg-transparent border-none outline-none text-white w-full"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
const TrashApp = () => {
  const initialItems = [
    { id: 1, name: "old_resume.docx", icon: File },
    { id: 2, name: "php_is_a_good_language.txt", icon: File },
    { id: 3, name: "internet_explorer.exe", icon: Code },
  ];
  const [trashItems, setTrashItems] = useState(initialItems);
  const [selected, setSelected] = useState(null);
  const handleEmpty = () => setTrashItems([]);
  const handleRestore = () => {
    if (selected !== null) {
      setTrashItems(trashItems.filter((item) => item.id !== selected));
      setSelected(null);
    }
  };
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 h-full flex flex-col text-gray-800 dark:text-gray-200">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={handleRestore}
          disabled={!selected}
          className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm disabled:opacity-50"
        >
          {" "}
          <RotateCcw className="w-4 h-4" /> Restore
        </button>
        <button
          onClick={handleEmpty}
          className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-md text-sm"
        >
          <Trash2 className="w-4 h-4" /> Empty Trash
        </button>
      </div>
      <div className="flex-grow border rounded-lg p-2 dark:border-gray-600">
        {trashItems.length > 0 ? (
          <ul className="space-y-1">
            {trashItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                  selected === item.id
                    ? "bg-blue-500/20"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-6 h-6 text-gray-500" />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Trash2 className="w-24 h-24" />
            <p>Trash is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};
const ChromeApp = () => (
  <iframe
    src="https://www.google.com/webhp?igu=1"
    title="Chrome"
    className="w-full h-full border-none"
  ></iframe>
);
const CalculatorApp = () => {
  const [input, setInput] = useState("");
  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input.replace(/x/g, "*")).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };
  const buttons = [
    "C",
    "%",
    "/",
    "x",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "0",
    ".",
    "=",
  ];
  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-800 h-full flex flex-col">
      <div className="bg-white dark:bg-gray-700 text-right text-3xl font-mono p-4 rounded-lg mb-2 text-gray-800 dark:text-gray-200 flex-grow overflow-x-auto flex items-end justify-end">
        {input || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={`p-4 text-lg rounded-lg ${
              ["/", "x", "-", "+", "="].includes(btn)
                ? "bg-orange-500 text-white"
                : btn === "C" || btn === "%"
                ? "bg-gray-400 dark:bg-gray-500"
                : "bg-gray-200 dark:bg-gray-600"
            } hover:bg-opacity-80 transition-all ${
              btn === "0" ? "col-span-2" : ""
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
const SpotifyApp = () => (
  <iframe
    title="Spotify Playlist"
    className="w-full h-full border-none"
    src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>
);
const SettingsApp = ({ theme, toggleTheme }) => (
  <div className="p-4 text-gray-800 dark:text-gray-200">
    {" "}
    <h2 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-300">
      Settings
    </h2>{" "}
    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
      {" "}
      <div className="flex items-center gap-2">
        {" "}
        {theme === "light" ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-blue-300" />
        )}{" "}
        <span>Appearance</span>
      </div>{" "}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm"
      >
        <span>{theme === "light" ? "Light" : "Dark"}</span>
      </button>{" "}
    </div>{" "}
  </div>
);
const ContactApp = () => (
  <div className="p-4 text-gray-800 dark:text-gray-200 text-center flex flex-col items-center justify-center h-full">
    {" "}
    <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-300">
      Get In Touch
    </h2>{" "}
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      I'm open to new opportunities.
    </p>{" "}
    <a
      href={`mailto:${personalInfo.email}`}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors mb-4"
    >
      {" "}
      Say Hello{" "}
    </a>{" "}
    <div className="flex gap-4">
      {" "}
      <a
        href={personalInfo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <Linkedin />
      </a>{" "}
      <a
        href={personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
      >
        <Github />
      </a>{" "}
    </div>{" "}
  </div>
);

// =================================================================
// MAIN OS COMPONENTS
// =================================================================
const ZorinIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="#4285F4"
      strokeWidth="2"
      strokeLinejoin="round"
    />{" "}
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285F4" />{" "}
    <path d="M2 17L12 12V22L2 17Z" fill="#4285F4" />{" "}
  </svg>
);
const BootScreen = ({ onBooted }) => {
  useEffect(() => {
    const timer = setTimeout(onBooted, 1500);
    return () => clearTimeout(timer);
  }, [onBooted]);
  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
      <ZorinIcon className="w-24 h-24 text-white animate-pulse" />
      <p className="text-white text-lg mt-4 font-sans">
        Starting Zorin OS Portfolio...
      </p>
    </div>
  );
};
const PowerOffScreen = () => (
  <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
    <p className="text-gray-500 text-lg font-sans">
      It is now safe to close the window.
    </p>
  </div>
);
const LockScreen = ({ onUnlock, theme }) => (
  <div
    onClick={onUnlock}
    className="absolute inset-0 bg-cover bg-center z-50 flex flex-col items-center justify-center text-white cursor-pointer"
    style={{
      backgroundImage: `url(${
        theme === "light"
          ? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
          : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"
      })`,
    }}
  >
    {" "}
    <div className="bg-black/30 backdrop-blur-md p-8 rounded-2xl text-center">
      {" "}
      <h1 className="text-5xl md:text-7xl font-bold">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h1>{" "}
      <p className="text-xl md:text-2xl">
        {new Date().toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>{" "}
      <p className="mt-8 text-lg animate-pulse">Click to Unlock</p>{" "}
    </div>{" "}
  </div>
);

const apps = [
  {
    id: "about",
    name: "About Me",
    icon: User,
    component: AboutApp,
    hasSidebar: true,
  },
  { id: "contact", name: "Contact Me", icon: Mail, component: ContactApp },
  {
    id: "chrome",
    name: "Chrome",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    component: ChromeApp,
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png",
    component: VSCodeApp,
    hasSidebar: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: TerminalSquare,
    component: TerminalApp,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png",
    component: SpotifyApp,
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: Calculator,
    component: CalculatorApp,
  },
  { id: "trash", name: "Trash", icon: Trash2, component: TrashApp },
  { id: "settings", name: "Settings", icon: Settings, component: SettingsApp },
  {
    id: "ai_counselor",
    name: "AI Counselor",
    icon: Bot,
    component: AICounselorApp,
  },
];

// ================== DESKTOP UI ==================
const DesktopUI = ({ theme, handleLock, handlePowerOff }) => {
  const [openApps, setOpenApps] = useState([]);
  const openOrFocusApp = (appId) => {
    setOpenApps((currentApps) => {
      const appIndex = currentApps.findIndex((app) => app.id === appId);
      const maxZ =
        Math.max(10, ...currentApps.map((app) => app.zIndex || 0)) + 1;
      if (appIndex === -1) {
        return [
          ...currentApps,
          { id: appId, zIndex: maxZ, isMinimized: false, isMaximized: false },
        ];
      }
      return currentApps.map((app) =>
        app.id === appId
          ? { ...app, zIndex: maxZ, isMinimized: false }
          : { ...app, zIndex: app.zIndex > 10 ? app.zIndex - 1 : app.zIndex }
      );
    });
  };
  const closeApp = (appId) =>
    setOpenApps((currentApps) => currentApps.filter((app) => app.id !== appId));
  const minimizeApp = (appId) =>
    setOpenApps((currentApps) =>
      currentApps.map((app) =>
        app.id === appId ? { ...app, isMinimized: true } : app
      )
    );
  const maximizeApp = (appId, isMaximized) =>
    setOpenApps((currentApps) =>
      currentApps.map((app) =>
        app.id === appId ? { ...app, isMaximized } : app
      )
    );
  return (
    <div className="h-screen w-screen relative">
      <main className="h-full">
        <div className="p-4 h-full flex flex-col flex-wrap content-start gap-y-2">
          {apps.map((app) => (
            <DesktopIcon key={app.id} app={app} onOpen={openOrFocusApp} />
          ))}
        </div>
        {openApps.map((app) => (
          <DesktopWindow
            key={app.id}
            app={app}
            onClose={closeApp}
            onMinimize={minimizeApp}
            onMaximize={maximizeApp}
            onFocus={openOrFocusApp}
          />
        ))}
      </main>
      <footer className="absolute bottom-0 left-0 right-0 h-14 z-40">
        <DesktopTaskbar
          openApps={openApps}
          onFocus={openOrFocusApp}
          onLock={handleLock}
        />
      </footer>
    </div>
  );
};
const DesktopWindow = ({ app, onClose, onMinimize, onMaximize, onFocus }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const handleMaximize = () => {
    setIsMaximized((m) => !m);
    onMaximize(app.id, !isMaximized);
  };
  const [position, dragRef] = useDraggable(app.id, onFocus, isMaximized);
  const appInfo = apps.find((a) => a.id === app.id);
  if (!appInfo) return null;
  const AppComponent = appInfo.component;
  const windowSize =
    {
      calculator: "w-[300px] h-[450px]",
      spotify: "w-[400px] h-[580px]",
      about: "w-[900px] h-[600px]",
      default: "w-[800px] h-[600px]",
    }[app.id] || "w-[800px] h-[600px]";
  return (
    <div
      style={{
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        zIndex: app.zIndex,
        display: app.isMinimized ? "none" : "flex",
      }}
      className={`absolute ${
        isMaximized
          ? "w-full h-[calc(100%-3.5rem)] rounded-none"
          : `${windowSize} rounded-lg`
      } bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-300/50 dark:border-gray-600/50 shadow-2xl flex-col overflow-hidden`}
      onClick={() => onFocus(app.id)}
    >
      {" "}
      <div
        ref={dragRef}
        className={`h-8 rounded-t-lg flex items-center justify-between px-2 ${
          isMaximized ? "" : "cursor-move"
        } bg-gray-200/80 dark:bg-gray-900/80 flex-shrink-0 border-b dark:border-gray-700/50`}
      >
        {" "}
        <div className="flex items-center gap-2">
          {" "}
          {typeof appInfo.icon === "string" ? (
            <img src={appInfo.icon} alt={appInfo.name} className="w-4 h-4" />
          ) : (
            <appInfo.icon className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          )}
          <span className="text-xs font-semibold">{appInfo.name}</span>
        </div>{" "}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(app.id);
            }}
            className="w-5 h-5 flex items-center justify-center bg-yellow-400 rounded-full hover:bg-yellow-500"
          >
            <Minimize2 className="w-3 h-3 text-black/50" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
            className="w-5 h-5 flex items-center justify-center bg-green-400 rounded-full hover:bg-green-500"
          >
            <Maximize2 className="w-3 h-3 text-black/50" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(app.id);
            }}
            className="w-5 h-5 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600"
          >
            <X className="w-3 h-3 text-black/50" />
          </button>
        </div>
      </div>{" "}
      <div className="flex-grow overflow-hidden">
        <AppComponent isMobile={false} />
      </div>
    </div>
  );
};
const DesktopIcon = ({ app, onOpen }) => (
  <button
    onClick={() => onOpen(app.id)}
    className="flex flex-col items-center justify-center gap-1 text-white text-xs font-medium w-24 h-24 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:bg-white/20 transition-colors"
  >
    {" "}
    <div className="w-12 h-12 flex items-center justify-center">
      {typeof app.icon === "string" ? (
        <img
          src={app.icon}
          alt={app.name}
          className="w-full h-full object-contain"
        />
      ) : (
        <app.icon className="w-10 h-10 text-white drop-shadow-lg" />
      )}
    </div>{" "}
    <span className="drop-shadow-lg text-center">{app.name}</span>{" "}
  </button>
);
const DesktopTaskbar = ({ openApps, onFocus, onLock }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const taskbarApps = apps.filter((app) =>
    ["chrome", "vscode", "terminal", "about", "settings"].includes(app.id)
  );
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-auto h-14 bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl flex items-center justify-between px-3 shadow-lg border-black/10 dark:border-white/10 text-white">
      {" "}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onLock(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <Power className="w-5 h-5 text-blue-400" />
        </button>
      </div>{" "}
      <div className="flex items-center gap-1">
        {" "}
        {taskbarApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onFocus(app.id)}
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-white/10 relative p-1"
          >
            {" "}
            {typeof app.icon === "string" ? (
              <img
                src={app.icon}
                alt={app.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <app.icon className="w-6 h-6" />
            )}{" "}
            {openApps.some(
              (openApp) => openApp.id === app.id && !openApp.isMinimized
            ) && (
              <span className="absolute bottom-0 w-1 h-1 bg-blue-500 rounded-full"></span>
            )}{" "}
          </button>
        ))}{" "}
      </div>{" "}
      <div className="flex items-center gap-3 text-xs px-3 py-1 bg-black/20 rounded-lg">
        {" "}
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};

// ================== MOBILE UI ==================
const MobileUI = ({ theme, toggleTheme, handleLock }) => {
  const [activeApp, setActiveApp] = useState(null);
  return (
    <div className="h-screen w-screen flex flex-col">
      <MobileTopBar theme={theme} onLock={handleLock} />
      <div className="flex-grow overflow-y-auto">
        <MobileHomeScreen onOpen={setActiveApp} />
      </div>
      {activeApp && (
        <MobileAppView
          appId={activeApp}
          onClose={() => setActiveApp(null)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
};
const MobileTopBar = ({ theme, onLock }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className={`w-full h-8 px-4 flex-shrink-0 flex justify-between items-center bg-black/20 backdrop-blur-sm text-sm font-semibold ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <span>
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      <div className="flex items-center gap-2">
        <Wifi size={16} />
        <Battery size={16} />
        <button onClick={() => onLock(true)}>
          <Power size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};
const MobileAppIcon = ({ app, onOpen }) => (
  <button
    onClick={() => onOpen(app.id)}
    className="flex flex-col items-center justify-center gap-1.5 text-white text-sm font-medium"
  >
    {" "}
    <div className="w-16 h-16 flex items-center justify-center bg-black/20 rounded-2xl">
      {typeof app.icon === "string" ? (
        <img
          src={app.icon}
          alt={app.name}
          className="w-10 h-10 object-contain"
        />
      ) : (
        <app.icon className="w-10 h-10 text-white drop-shadow-lg" />
      )}
    </div>{" "}
    <span className="drop-shadow-lg text-center">{app.name}</span>{" "}
  </button>
);
const MobileHomeScreen = ({ onOpen }) => (
  <div className="p-4 grid grid-cols-4 gap-y-6">
    {apps.map((app) => (
      <MobileAppIcon key={app.id} app={app} onOpen={onOpen} />
    ))}
  </div>
);
const MobileAppView = ({ appId, onClose, theme, toggleTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const appInfo = apps.find((a) => a.id === appId);
  if (!appInfo) return null;
  const AppComponent = appInfo.component;
  return (
    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 z-30 flex flex-col animate-slide-in">
      {" "}
      <header className="h-12 flex-shrink-0 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
        {" "}
        <button onClick={onClose} className="p-2">
          <ArrowLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>{" "}
        <div className="flex items-center gap-2">
          {" "}
          {typeof appInfo.icon === "string" ? (
            <img src={appInfo.icon} alt={appInfo.name} className="w-6 h-6" />
          ) : (
            <appInfo.icon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          )}{" "}
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {appInfo.name}
          </h2>{" "}
        </div>{" "}
        <div className="w-8">
          {" "}
          {appInfo.hasSidebar && (
            <button onClick={() => setIsSidebarOpen((o) => !o)} className="p-1">
              {" "}
              <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />{" "}
            </button>
          )}{" "}
        </div>{" "}
      </header>{" "}
      <main className="flex-grow overflow-y-auto">
        {" "}
        <AppComponent
          theme={theme}
          toggleTheme={toggleTheme}
          isMobile={true}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(false)}
        />{" "}
      </main>{" "}
    </div>
  );
};

// =======================================================
// Main App Component
// =======================================================
export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const handleBoot = () => setIsBooting(false);
  const handleLock = () => setIsLocked(true);
  const handleUnlock = () => setIsLocked(false);
  const handlePowerOff = () => setIsPoweredOff(true);
  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  const wallpaperUrl =
    theme === "light"
      ? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";

  const sharedBackground = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
    </>
  );

  if (isBooting && !isMobile) return <BootScreen onBooted={handleBoot} />;
  if (isPoweredOff) return <PowerOffScreen />;
  if (isLocked) return <LockScreen onUnlock={handleUnlock} theme={theme} />;

  return (
    <div className="h-screen w-screen bg-black font-sans overflow-hidden">
      {sharedBackground}
      <div className="relative z-10 h-full w-full">
        {isMobile ? (
          <MobileUI
            theme={theme}
            toggleTheme={toggleTheme}
            handleLock={handleLock}
          />
        ) : (
          <DesktopUI
            theme={theme}
            handleLock={handleLock}
            handlePowerOff={handlePowerOff}
          />
        )}
      </div>
    </div>
  );
}
