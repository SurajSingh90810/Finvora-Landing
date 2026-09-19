import React, { useState, useEffect, useRef } from "react";
import {
  Wallet,
  TrendingUp,
  Network,
  Briefcase,
  Gift,
  Users,
  Crown,
  ChevronRight,
  Activity,
  Shield,
  Zap,
  Layers,
  Lock,
  Menu,
  X,
  Globe,
  Gem,
  ArrowUpRight,
  CheckCircle,
  Sparkles,
  Flame,
  Diamond,
  Code,
  Database,
  Coins,
  HelpCircle,
  Plus,
  Minus,
  Repeat,
  Compass,
  UserPlus,
  ArrowDownUp,
  Building2,
  LineChart,
  ArrowDown,
  Workflow,
  Target,
  Clock,
  PieChart,
  BarChart,
  Share2,
  Unlock,
  Gauge,
  Fingerprint,
  Trophy,
  Key,
  Link,
  Timer,
  Box,
  Eye,
  Send,
} from "lucide-react";

// Adjust this path to match your project structure
import logoImg from "./assets/logo1.png";
import NavImg from "./assets/logo.png";
import { BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

// ═══════════════ UTILITY COMPONENTS ═══════════════

// ─── Enhanced Reveal on Scroll ───
const RevealOnScroll = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "scale" | "fade" | "rotate";
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up: "translateY(60px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    scale: "scale(0.85)",
    fade: "translateY(0)",
    rotate: "rotate(-5deg) translateY(30px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible
          ? "translate(0,0) scale(1) rotate(0)"
          : transforms[direction],
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(6px)",
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Glitch Text ───
const GlitchText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span className={`glitch-wrapper ${className}`} data-text={text}>
      {text}
    </span>
  );
};

// ─── Typewriter ───
const Typewriter = ({ texts }: { texts: string[] }) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    if (!isDeleting && charIndex < currentText.length) {
      const t = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
      return () => clearTimeout(t);
    } else if (!isDeleting && charIndex === currentText.length) {
      const t = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(t);
    } else if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
      return () => clearTimeout(t);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      <span className="w-[4px] h-[1em] bg-fuchsia-500 ml-2 animate-pulse inline-block shadow-[0_0_10px_#d946ef]" />
    </span>
  );
};

// ─── Split Flap Text ───
const SplitReveal = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-3 md:mr-5 align-bottom"
        >
          <span
            className="inline-block"
            style={{
              transform: isVisible
                ? "translateY(0) rotateX(0)"
                : "translateY(100%) rotateX(-90deg)",
              opacity: isVisible ? 1 : 0,
              transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              transformOrigin: "bottom",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

// ─── Thick UI Card ───
const ThickCard = ({
  children,
  themeColor = "#d946ef",
  shape = "default",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  themeColor?: string;
  shape?: "default" | "polygon-1" | "polygon-2" | "capsule-l" | "capsule-r";
  className?: string;
  delay?: number;
}) => {
  const shapeClass = {
    default: "rounded-2xl",
    "polygon-1":
      "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl",
    "polygon-2":
      "rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl",
    "capsule-l": "rounded-l-[3rem] rounded-r-2xl",
    "capsule-r": "rounded-r-[3rem] rounded-l-2xl",
  }[shape];

  return (
    <RevealOnScroll direction="up" delay={delay} className="h-full">
      <div
        className={`thick-card relative bg-[#12141a] border-2 ${shapeClass} h-full transition-all duration-500 hover:-translate-x-1 hover:-translate-y-1 group ${className}`}
        style={
          {
            "--theme-color": themeColor,
            borderColor: `${themeColor}30`,
            boxShadow: `6px 6px 0 ${themeColor}30`,
          } as React.CSSProperties
        }
      >
        <div
          className={`absolute top-0 right-0 w-3 h-3 ${shapeClass}`}
          style={{
            backgroundColor: themeColor,
            opacity: 0.6,
            filter: "blur(4px)",
          }}
        />
        <div className="relative z-10 p-6 md:p-8 h-full">{children}</div>
      </div>
    </RevealOnScroll>
  );
};

// ─── Icon Box ───
const IconBox = ({
  color,
  size = "md",
  icon,
}: {
  icon: React.ReactNode;
  color: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClass = {
    sm: "w-10 h-10 p-2",
    md: "w-14 h-14 p-3",
    lg: "w-16 h-16 p-4",
  }[size];
  return (
    <div
      className={`${sizeClass} bg-[#1a1d24] border-2 rounded-xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500 shrink-0 relative overflow-hidden group`}
      style={
        {
          borderColor: color,
          boxShadow: `4px 4px 0 ${color}`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-20 bg-current transition-opacity group-hover:opacity-30"
        style={{ color }}
      />
      <div className="relative z-10" style={{ color }}>
        {icon}
      </div>
    </div>
  );
};

// ─── FAQ Accordion Item ───
const FAQItem = ({
  q,
  a,
  delay = 0,
}: {
  q: string;
  a: string;
  delay?: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <RevealOnScroll direction="up" delay={delay}>
      <div
        className={`bg-[#12141a] border-2 rounded-2xl overflow-hidden transition-all duration-500 ${
          open
            ? "border-fuchsia-500/50 shadow-[4px_4px_0_rgba(217,70,239,0.2)]"
            : "border-zinc-800 hover:border-zinc-700"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left group"
        >
          <div className="flex items-center gap-4 w-full">
            <div
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${
                open
                  ? "bg-fuchsia-500/10 border-fuchsia-500 rotate-90"
                  : "bg-[#1a1d24] border-zinc-700 group-hover:border-fuchsia-500/50"
              }`}
            >
              {open ? (
                <Minus size={18} className="text-fuchsia-400" />
              ) : (
                <Plus size={18} className="text-zinc-400" />
              )}
            </div>
            <span className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
              {q}
            </span>
          </div>
        </button>
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: open ? "500px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div className="px-5 md:px-6 pb-6 pl-[4.75rem] md:pl-[5.25rem] text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 text-left">
            {a}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ═══════════════ DATA ═══════════════

const CONCEPT_LEVEL_INCOME = [
  {
    level: "Shallow Levels",
    directs: "Minimal Network",
    minId: "Entry Tier",
    roi: "Maximum Yield",
  },
  {
    level: "Mid-Depth Levels",
    directs: "Growing Network",
    minId: "Standard Tier",
    roi: "High Yield",
  },
  {
    level: "Deep Levels",
    directs: "Established Network",
    minId: "Premium Tier",
    roi: "Steady Yield",
  },
  {
    level: "Maximum Depth",
    directs: "Extensive Network",
    minId: "Elite Tier",
    roi: "Sustained Yield",
  },
];

const CONCEPT_PHASES = [
  {
    phase: "Genesis Phase",
    amount: "Initial Tranche",
    buy: "Highest Ratio",
    lp: "Max LP Split",
  },
  {
    phase: "Early Adoption",
    amount: "Growth Tranche",
    buy: "High Ratio",
    lp: "Balanced Split",
  },
  {
    phase: "Mid Phase",
    amount: "Expansion Tranche",
    buy: "Moderate Ratio",
    lp: "Standard Split",
  },
  {
    phase: "Final Phase",
    amount: "Final Tranche",
    buy: "Lowest Ratio",
    lp: "Minimal LP Split",
  },
];

const INCOME_STREAMS = [
  {
    icon: <Activity />,
    color: "#06b6d4",
    title: "Base Yield Stream",
    subtitle: "Continuous Passive Flow",
    desc: "Consistent daily yield accrual generated purely from your committed capital. Fully automated by smart contract logic — no manual intervention required.",
    rules: [
      { text: "Counts toward capacity cap", icon: <Target size={12} /> },
      { text: "Accrues continuously", icon: <Clock size={12} /> },
      { text: "Rate varies by booster tier", icon: <Gauge size={12} /> },
    ],
    shape: "polygon-1" as const,
  },
  {
    icon: <UserPlus />,
    color: "#10b981",
    title: "Direct Amplification",
    subtitle: "Referral Commission Layer",
    desc: "Earn structural commission on every direct integration you bring into the ecosystem. Instant activation upon meeting minimum entry threshold.",
    rules: [
      { text: "Requires active commitment", icon: <Key size={12} /> },
      { text: "Applied on direct volume", icon: <BarChart size={12} /> },
      { text: "Contributes to capacity", icon: <PieChart size={12} /> },
    ],
    shape: "polygon-2" as const,
  },
  {
    icon: <Network />,
    color: "#84cc16",
    title: "Deep Network Yield",
    subtitle: "Multi-Tier Depth Rewards",
    desc: "Structural earnings across your extended network depth. Deeper levels unlock more sustained yields as your network scales organically.",
    rules: [
      { text: "Requires tier progression", icon: <Share2 size={12} /> },
      { text: "Scales with depth", icon: <Layers size={12} /> },
      { text: "Governed by qualification", icon: <Lock size={12} /> },
    ],
    shape: "capsule-l" as const,
  },
  {
    icon: <Briefcase />,
    color: "#8b5cf6",
    title: "Achiever Salary",
    subtitle: "Milestone Recurring Payout",
    desc: "Recurring salary payouts activated by hitting specific business milestones. Retroactive activation from qualification date ensures no rewards are lost.",
    rules: [
      { text: "Milestone-based unlock", icon: <Trophy size={12} /> },
      { text: "Retroactive payments", icon: <Timer size={12} /> },
      { text: "Counts toward cap", icon: <Database size={12} /> },
    ],
    shape: "capsule-r" as const,
  },
  {
    icon: <Gift />,
    color: "#d946ef",
    title: "Uncapped Rewards",
    subtitle: "Bonus Beyond All Limits",
    desc: "Special milestone-driven bonuses that completely bypass all standard earnings caps. Pure incentive for ecosystem contribution and growth.",
    rules: [
      { text: "Bypasses all caps", icon: <Unlock size={12} /> },
      { text: "Milestone-driven", icon: <Trophy size={12} /> },
      { text: "Zero deduction", icon: <Shield size={12} /> },
    ],
    shape: "polygon-1" as const,
  },
];

// Social Media Links Config
const SOCIAL_LINKS = [
  {
    name: "Telegram",
    url: "https://t.me/+vKqESaexwxs1MDFk",
    icon: <Send size={20} />,
    color: "#0088cc",
    desc: "Join our official chat group",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/finv_ora?stkn=MXNlMWlzaGt3c2I0aA%3D%3D&utm_source=qr",
    icon: <BsInstagram size={20} />,
    color: "#e1306c",
    desc: "Get visual updates & stories",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/people/Finvora-Finvora/pfbid0NLCuQW3GZfpmjufjhFeNjqHo7qVLwr2SA8mFUxxxGyBZUUi2gSagjqmTLyCZ4i9Jl/?mibextid=wwXIfr&rdid=afcm2UB8EPHqQ8Zc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FCCgCQxiV%2F%3Fmibextid%3DwwXIfr",
    icon: <FaFacebook size={20} />,
    color: "#1877f2",
    desc: "Connect with our global page",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@FINVORA-v6g",
    icon: <BsYoutube size={20} />,
    color: "#ff0000",
    desc: "Watch guides & explainers",
  },

  {
    name: "X.com",
    url: "https://x.com/finvora09b?s=11",
    icon: <BsTwitterX size={20} />,
    color: "#1085e6",
    desc: "Watch guides & explainers",
  },
];

// ═══════════════ MAIN LANDING COMPONENT ═══════════════

const Landing: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = [
        "hero",
        "about",
        "how-it-works",
        "features",
        "roi",
        "levels",
        "income-streams",
        "partner-pool",
        "tokenomics",
        "security",
        "faq",
      ];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 250) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "how-it-works", label: "How" },
    { id: "features", label: "Features" },
    { id: "income-streams", label: "Income" },
    { id: "tokenomics", label: "Tokens" },
  ];

  return (
    <>
      <div className="min-h-screen bg-thick-pattern font-sora text-zinc-100 overflow-x-hidden selection:bg-fuchsia-500/30 relative">
        <div className="fixed inset-0 noise-overlay pointer-events-none z-[100]" />
        <div className="fixed top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/15 blur-[140px] pointer-events-none z-0 float-y" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/15 blur-[140px] pointer-events-none z-0 float-x" />

        {/* ═══════════════ NAVBAR ═══════════════ */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass py-3" : "bg-transparent py-5"}`}
        >
          <div className="max-w-[85rem] mx-auto px-4 md:px-8 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection("hero")}
            >
              <img
                src={NavImg}
                alt="FMVONG Logo"
                className="w-[140px] sm:w-[200px] md:w-[300px] h-[40px] sm:h-[50px] md:h-[80px] object-contain"
              />
            </div>

            <div className="hidden xl:flex items-center gap-1 bg-[#12141a] border-2 border-zinc-800 rounded-2xl px-2 py-2 shadow-[3px_3px_0_#27272a]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-[#0a0b0e] bg-fuchsia-400 shadow-[2px_2px_0_#a21caf]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://dapp.finvora.live/"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center gap-1 sm:gap-2 bg-fuchsia-500 text-[#0f1115] font-bold text-[10px] sm:text-xs uppercase tracking-widest px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl border-2 border-fuchsia-300"
                style={{ ["--btn-shadow" as any]: "#a21caf" }}
              >
                Launch App{" "}
                <ArrowUpRight
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  strokeWidth={3}
                />
              </a>
              <button
                className="xl:hidden p-2 sm:p-3 rounded-xl bg-[#1a1d24] border-2 border-fuchsia-500 shadow-[3px_3px_0_#d946ef] text-fuchsia-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="xl:hidden absolute top-full left-0 right-0 nav-glass border-t-2 border-fuchsia-500/30 p-4 space-y-2 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-center px-5 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all border-2 ${
                    activeSection === link.id
                      ? "text-[#0a0b0e] bg-fuchsia-400 border-fuchsia-300 shadow-[3px_3px_0_#a21caf]"
                      : "text-zinc-400 border-transparent hover:border-zinc-700"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1a1d24] border-2 border-zinc-800 rounded-xl transition-all hover:-translate-y-1"
                    style={{
                      borderColor: `${social.color}40`,
                      color: social.color,
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-16 overflow-hidden"
        >
          {/* Advanced Layered Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Base grid with radial fade mask */}
            <div
              className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.08)_1px,transparent_1px)] bg-[size:44px_44px] pan-grid"
              style={{
                maskImage:
                  "radial-gradient(ellipse 65% 55% at 50% 35%, black 15%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 65% 55% at 50% 35%, black 15%, transparent 78%)",
              }}
            />

            {/* Aurora gradient blobs */}
            <div className="absolute top-[-15%] left-[8%] w-[36vw] h-[36vw] rounded-full bg-fuchsia-600/20 blur-[120px] aurora-drift" />
            <div className="absolute bottom-[-18%] right-[4%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/15 blur-[130px] aurora-drift-reverse" />
            <div
              className="absolute top-[28%] right-[18%] w-[18vw] h-[18vw] rounded-full bg-yellow-500/10 blur-[100px] aurora-drift"
              style={{ animationDelay: "-4s" }}
            />

            {/* Network mesh - connecting nodes with flowing data lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-50"
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
            >
              <line
                x1="120"
                y1="150"
                x2="380"
                y2="300"
                stroke="#d946ef"
                strokeWidth="1"
                className="dash-flow"
              />
              <line
                x1="380"
                y1="300"
                x2="200"
                y2="520"
                stroke="#06b6d4"
                strokeWidth="1"
                className="dash-flow"
                style={{ animationDelay: "-1s" }}
              />
              <line
                x1="380"
                y1="300"
                x2="620"
                y2="220"
                stroke="#84cc16"
                strokeWidth="1"
                className="dash-flow"
                style={{ animationDelay: "-2.2s" }}
              />
              <line
                x1="1080"
                y1="110"
                x2="1300"
                y2="330"
                stroke="#06b6d4"
                strokeWidth="1"
                className="dash-flow"
                style={{ animationDelay: "-1.6s" }}
              />
              <line
                x1="1300"
                y1="330"
                x2="1160"
                y2="570"
                stroke="#d946ef"
                strokeWidth="1"
                className="dash-flow"
                style={{ animationDelay: "-0.5s" }}
              />
              <line
                x1="900"
                y1="700"
                x2="1160"
                y2="570"
                stroke="#eab308"
                strokeWidth="1"
                className="dash-flow"
                style={{ animationDelay: "-1.4s" }}
              />
              <line
                x1="900"
                y1="700"
                x2="680"
                y2="760"
                stroke="#84cc16"
                strokeWidth="1"
                className="dash-flow"
                style={{ animationDelay: "-2.8s" }}
              />
              {[
                [120, 150, "#d946ef"],
                [380, 300, "#06b6d4"],
                [200, 520, "#d946ef"],
                [620, 220, "#84cc16"],
                [1080, 110, "#06b6d4"],
                [1300, 330, "#d946ef"],
                [1160, 570, "#eab308"],
                [900, 700, "#84cc16"],
                [680, 760, "#06b6d4"],
              ].map(([cx, cy, c], i) => (
                <circle
                  key={i}
                  cx={cx as number}
                  cy={cy as number}
                  r="4"
                  fill={c as string}
                  className="node-pulse"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              ))}
            </svg>

            {/* Drifting outline geometric shapes */}
            <div className="hidden sm:block absolute top-[15%] left-[6%] w-8 h-8 border-2 border-cyan-500/30 rotate-45 shape-drift" />
            <div
              className="hidden sm:block absolute top-[64%] left-[11%] w-10 h-10 rounded-full border-2 border-fuchsia-500/20 shape-drift-alt"
              style={{ animationDelay: "-3s" }}
            />
            <div
              className="hidden sm:block absolute top-[20%] right-[9%] w-6 h-6 border-2 border-yellow-500/30 shape-drift"
              style={{ animationDelay: "-5s" }}
            />
            <div
              className="hidden sm:block absolute bottom-[16%] right-[15%] w-9 h-9 border-2 border-emerald-500/20 rotate-12 shape-drift-alt"
              style={{ animationDelay: "-2s" }}
            />
            <Diamond
              className="hidden md:block absolute top-[42%] left-[3%] text-fuchsia-500/25 shape-drift"
              size={20}
              style={{ animationDelay: "-4s" }}
            />
            <Diamond
              className="hidden md:block absolute bottom-[10%] right-[6%] text-cyan-500/25 shape-drift-alt"
              size={16}
              style={{ animationDelay: "-6s" }}
            />

            {/* Floating drifting icon chips */}
            <Coins
              className="hidden md:block absolute top-[11%] right-[30%] text-yellow-500/20 float-y"
              size={26}
              style={{ animationDelay: "-1s" }}
            />
            <Lock
              className="hidden md:block absolute bottom-[20%] left-[24%] text-cyan-500/20 float-x"
              size={22}
              style={{ animationDelay: "-2s" }}
            />
            <TrendingUp
              className="hidden md:block absolute top-[52%] right-[7%] text-emerald-500/20 float-y"
              size={24}
              style={{ animationDelay: "-3s" }}
            />
            <Wallet
              className="hidden md:block absolute top-[8%] left-[32%] text-fuchsia-500/20 float-x"
              size={22}
              style={{ animationDelay: "-2.5s" }}
            />

            {/* Scan line sweep */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="scan-line" />
            </div>

            {/* Floating particles */}
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className="particle-dot"
                style={{
                  left: `${(i * 41 + 7) % 100}%`,
                  top: `${(i * 57 + 13) % 100}%`,
                  animationDelay: `${i * 0.45}s`,
                  animationDuration: `${6 + (i % 5)}s`,
                  opacity: 0.15 + (i % 4) * 0.08,
                  background:
                    i % 3 === 0
                      ? "#06b6d4"
                      : i % 3 === 1
                        ? "#d946ef"
                        : "#eab308",
                  boxShadow: `0 0 6px ${i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#d946ef" : "#eab308"}`,
                }}
              />
            ))}

            {/* HUD corner brackets */}
            <div className="hidden md:block absolute top-24 left-6 w-14 h-14 border-t-2 border-l-2 border-fuchsia-500/30" />
            <div className="hidden md:block absolute top-24 right-6 w-14 h-14 border-t-2 border-r-2 border-cyan-500/30" />
            <div className="hidden md:block absolute bottom-10 left-6 w-14 h-14 border-b-2 border-l-2 border-cyan-500/30" />
            <div className="hidden md:block absolute bottom-10 right-6 w-14 h-14 border-b-2 border-r-2 border-fuchsia-500/30" />
          </div>

          <div className="max-w-[85rem] mx-auto relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
              {/* ─── LEFT: Text Content ─── */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-space font-black uppercase tracking-tighter leading-[0.95] mb-6">
                  <div className="mb-1">
                    <SplitReveal text="Unlock The" className="text-white" />
                  </div>
                  <div className="mb-1">
                    <RevealOnScroll direction="scale" delay={500}>
                      <GlitchText text="TRUE POWER" className="shimmer-text" />
                    </RevealOnScroll>
                  </div>
                  <div>
                    <SplitReveal text="of DeFi" className="text-zinc-500" />
                  </div>
                </h1>

                <RevealOnScroll direction="fade" delay={700}>
                  <div className="text-sm md:text-base lg:text-lg font-space font-medium text-fuchsia-100/70 mb-8 h-[2em] flex items-center justify-center lg:justify-start tracking-widest text-center lg:text-left">
                    <Typewriter
                      texts={[
                        "A Decentralized Logic Infrastructure",
                        "Continuous Yield Generation Protocol",
                        "Deep Network Income Structures",
                        "Immutable Algorithmic Distribution",
                      ]}
                    />
                  </div>
                </RevealOnScroll>

                <RevealOnScroll direction="up" delay={900}>
                  <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed font-light">
                    Enter an ecosystem of{" "}
                    <strong className="text-white">compounding returns</strong>,
                    multi-tier rewards, performance boosters, and exclusive
                    treasury access — architected on immutable code that
                    operates 24/7 without human intervention.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll direction="fade" delay={1300}>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-6">
                    {[
                      {
                        label: "Yield Streams",
                        value: "5+",
                        icon: <ArrowDownUp />,
                        color: "#06b6d4",
                      },
                      {
                        label: "Booster Tiers",
                        value: "4×",
                        icon: <Zap />,
                        color: "#eab308",
                      },
                      {
                        label: "Chain Type",
                        value: "EVM",
                        icon: <Shield />,
                        color: "#d946ef",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left"
                      >
                        <div
                          className="w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 relative overflow-hidden"
                          style={
                            {
                              borderColor: item.color,
                              color: item.color,
                              boxShadow: `3px 3px 0 ${item.color}40`,
                            } as React.CSSProperties
                          }
                        >
                          <div className="absolute inset-0 opacity-10 bg-current" />
                          {React.cloneElement(item.icon, {
                            size: 18,
                            strokeWidth: 2.5,
                          })}
                        </div>
                        <div>
                          <div className="text-lg font-space font-black text-white leading-none">
                            {item.value}
                          </div>
                          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>

              {/* ─── RIGHT: Logo Showcase Console ─── */}
              <RevealOnScroll direction="right" delay={400}>
                <div className="relative mx-auto max-w-sm lg:max-w-none w-full">
                  {/* Orbiting badges around the whole card */}
                  <div className="hidden md:flex absolute -top-6 -left-6 w-14 h-14 bg-[#1a1d24] border-2 border-emerald-500 rounded-2xl items-center justify-center shadow-[4px_4px_0_#10b981] float-y z-20">
                    <Shield
                      className="text-emerald-400"
                      size={22}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="hidden md:flex absolute -bottom-7 -right-4 w-16 h-16 bg-[#1a1d24] border-2 border-yellow-500 rounded-2xl items-center justify-center shadow-[4px_4px_0_#eab308] float-x z-20">
                    <Zap
                      className="text-yellow-400"
                      size={24}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div
                    className="hidden md:flex absolute top-1/2 -right-7 w-12 h-12 bg-[#1a1d24] border-2 border-cyan-500 rounded-full items-center justify-center shadow-[3px_3px_0_#06b6d4] float-y z-20"
                    style={{ animationDelay: "-2s" }}
                  >
                    <Network
                      className="text-cyan-400"
                      size={18}
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Main console card */}
                  <div className="console-glow relative bg-[#0e0f13] border-2 border-fuchsia-500/40 rounded-[1.75rem] overflow-hidden w-full max-w-[280px] sm:max-w-none mx-auto">
                    {/* Window bar */}
                    <div className="flex items-center justify-between px-5 py-4 border-b-2 border-zinc-800/80 bg-[#12141a]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 flex items-center justify-center">
                          <X size={8} className="text-black opacity-50" />
                        </span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 flex items-center justify-center">
                          <Minus size={8} className="text-black opacity-50" />
                        </span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 flex items-center justify-center">
                          <ChevronRight
                            size={8}
                            className="text-black opacity-50"
                          />
                        </span>
                      </div>

                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </div>
                    </div>

                    <div className="p-4 sm:p-8 space-y-7">
                      {/* ── Logo Radar Showcase ── */}
                      <div className="relative w-full flex items-center justify-center py-4">
                        <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center">
                          {/* Expanding radar rings */}
                          <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/25 radar-ping" />
                          <div
                            className="absolute inset-0 rounded-full border-2 border-cyan-500/25 radar-ping"
                            style={{ animationDelay: "-1.5s" }}
                          />
                          <div
                            className="absolute inset-0 rounded-full border-2 border-yellow-500/15 radar-ping"
                            style={{ animationDelay: "-3s" }}
                          />

                          {/* Rotating dashed rings */}
                          <div className="absolute inset-3 rounded-full border-2 border-dashed border-fuchsia-500/30 spin-slow" />
                          <div className="absolute inset-9 rounded-full border border-dashed border-cyan-500/30 spin-slow-reverse" />

                          <div className="absolute w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full bg-fuchsia-500/20 blur-[60px]" />

                          <div className="relative z-10 top-2 w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-[#12141a] border-2 border-fuchsia-500/60 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.25)] logo-float overflow-hidden p-3">
                            <img
                              src={logoImg}
                              alt="FMVONG Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Footer status */}
                      <div className="flex items-center justify-between pt-5 border-t border-zinc-800/60">
                        <span className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          <Lock size={12} className="text-fuchsia-400" />{" "}
                          Non-Custodial
                        </span>
                        <span className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                          <CheckCircle size={12} /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ═══════════════ MARQUEE TICKER ═══════════════ */}
        <section className="relative py-6 border-y-2 border-fuchsia-500/20 overflow-hidden bg-[#0a0b0e]">
          <div className="flex marquee-track">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-16 px-8">
                {[
                  { text: "DYNAMIC YIELD", icon: <Activity /> },
                  { text: "SECURED ON-CHAIN", icon: <Shield /> },
                  { text: "AUTOMATED PAYOUTS", icon: <Zap /> },
                  { text: "PARTNER TREASURY", icon: <Crown /> },
                  { text: "MULTI-TIER INCOME", icon: <Network /> },
                  { text: "IMMUTABLE PROTOCOL", icon: <Lock /> },
                  { text: "COMMUNITY GOVERNED", icon: <Users /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <span className="text-fuchsia-400">
                      {React.cloneElement(item.icon, {
                        size: 20,
                        strokeWidth: 2.5,
                      })}
                    </span>
                    <span className="text-lg md:text-2xl font-space font-black text-white uppercase tracking-widest">
                      {item.text}
                    </span>
                    <Diamond size={14} className="text-cyan-400 rotate-45" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ BUSINESS EXPLANATION DEEP DIVE (NEW CARD UI) ═══════════════ */}
        <section
          id="about"
          className="relative py-24 md:py-32 px-4 bg-[#050608] border-b-2 border-zinc-800/50"
        >
          <div className="max-w-[85rem] mx-auto">
            {/* Header */}
            <RevealOnScroll direction="up">
              <div className="mb-12 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-indigo-500 shadow-[3px_3px_0_#6366f1] px-4 py-2 rounded-full mb-6">
                  <LineChart size={14} className="text-indigo-400" />
                  <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    Protocol Deep Dive
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-space font-black text-white uppercase tracking-tight leading-none mb-6">
                  The <span className="text-indigo-400">Paradigm Shift</span>
                </h2>
              </div>
            </RevealOnScroll>

            {/* Executive Summary Hero Card */}
            <RevealOnScroll direction="scale" duration={0.8} delay={100}>
              <div className="bg-[#12141a] border-2 border-indigo-500 rounded-[2rem] p-6 md:p-12 shadow-[8px_8px_0_#6366f1] relative overflow-hidden mb-20 group transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0_#6366f1]">
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/15 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                  {/* Left Column: Text & Badges */}
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-space font-black text-white uppercase tracking-tight mb-6 leading-[1.1]">
                      Redefining <br className="hidden lg:block" />{" "}
                      <span className="text-indigo-400">
                        Value Distribution
                      </span>
                    </h3>
                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
                      FMVONG represents the next evolution in Decentralized
                      Finance (DeFi). By merging algorithmic yield generation
                      with multi-tiered network marketing built entirely on
                      immutable smart contracts, the protocol removes the
                      middlemen, redirecting{" "}
                      <strong className="text-white">
                        100% of value acquisition
                      </strong>{" "}
                      directly back to the community.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full">
                      <span className="flex items-center gap-2 bg-[#0a0b0e] border border-indigo-500/30 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-400">
                        <Lock size={14} /> 100% On-Chain
                      </span>
                      <span className="flex items-center gap-2 bg-[#0a0b0e] border border-indigo-500/30 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-400">
                        <Users size={14} /> Community Owned
                      </span>
                      <span className="flex items-center gap-2 bg-[#0a0b0e] border border-indigo-500/30 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-400">
                        <Shield size={14} /> Zero Middlemen
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Visual Data Flow UI */}
                  <div className="bg-[#0a0b0e] border-2 border-zinc-800 rounded-2xl p-6 md:p-8 relative shadow-inner w-full max-w-md mx-auto lg:max-w-none">
                    <div className="absolute -top-3 -right-3">
                      <span className="bg-indigo-500 text-[#0a0b0e] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-indigo-300 shadow-[2px_2px_0_#4338ca] flex items-center gap-1">
                        <Activity size={10} /> Live Architecture
                      </span>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Source */}
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 bg-[#12141a] p-4 rounded-xl border-2 border-zinc-800/80">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <TrendingUp size={16} />
                          </div>
                          <span className="text-xs md:text-sm text-white uppercase tracking-widest font-bold">
                            Total Yield Generated
                          </span>
                        </div>
                        <span className="text-indigo-400 font-space font-black text-xl">
                          100%
                        </span>
                      </div>

                      {/* Flow Arrow */}
                      <div className="flex justify-center -my-2 relative z-10">
                        <div className="bg-[#0a0b0e] p-1 border-2 border-zinc-800 rounded-full">
                          <ArrowDown size={18} className="text-zinc-500" />
                        </div>
                      </div>

                      {/* Smart Contract Hub */}
                      <div className="flex justify-center items-center bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/30 border-dashed text-center">
                        <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold flex items-center gap-2">
                          <Code size={12} /> Trustless Smart Contract Split
                        </span>
                      </div>

                      {/* Flow Arrow */}
                      <div className="flex justify-center -my-2 relative z-10">
                        <div className="bg-[#0a0b0e] p-1 border-2 border-zinc-800 rounded-full">
                          <ArrowDown size={18} className="text-zinc-500" />
                        </div>
                      </div>

                      {/* Distribution */}
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1 bg-emerald-500/5 p-4 rounded-xl border-2 border-emerald-500/30 text-center hover:bg-emerald-500/10 transition-colors flex flex-col items-center">
                          <span className="text-[10px] text-emerald-400 uppercase tracking-widest block mb-1 font-bold flex items-center justify-center gap-1">
                            <Network size={10} /> Network & Community
                          </span>
                          <span className="text-emerald-400 font-space font-black text-2xl">
                            95%
                          </span>
                        </div>
                        <div className="flex-1 bg-amber-500/5 p-4 rounded-xl border-2 border-amber-500/30 text-center hover:bg-amber-500/10 transition-colors flex flex-col items-center">
                          <span className="text-[10px] text-amber-400 uppercase tracking-widest block mb-1 font-bold flex items-center justify-center gap-1">
                            <Box size={10} /> Treasury & Liquidity
                          </span>
                          <span className="text-amber-400 font-space font-black text-2xl">
                            5%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
              {[
                {
                  icon: <Building2 />,
                  color: "#f43f5e",
                  title: "Breaking Traditional Finance",
                  desc: "Traditional financial systems (TradFi) and centralized exchanges rely on heavy corporate overhead, extracting the vast majority of generated yields for themselves. FMVONG operates with zero corporate entity. The code is the law, executing peer-to-peer logic instantly and distributing yield transparently.",
                },
                {
                  icon: <Repeat />,
                  color: "#06b6d4",
                  title: "The TVL Flywheel Mechanism",
                  desc: "Total Value Locked (TVL) is the lifeblood of any DeFi protocol. Instead of relying on unsustainable 'ponzinomics', FMVONG utilizes extraction taxes, mandatory capacity resets, and re-commitments. Once a user hits their earning limit, they must re-engage, pumping fresh liquidity into the ecosystem.",
                },
                {
                  icon: <Workflow />,
                  color: "#10b981",
                  title: "Proof-of-Networking (PoN)",
                  desc: "Customer Acquisition Cost (CAC) is traditionally paid to ad agencies and tech monopolies. FMVONG turns this model upside down. It redirects marketing capital directly to users who grow the ecosystem. The multi-tier structure ensures you are mathematically rewarded for the depth of your network.",
                },
                {
                  icon: <Flame />,
                  color: "#eab308",
                  title: "Deflationary Architecture",
                  desc: "A major flaw in early Web3 yield farms was hyperinflationary tokens. FMVONG combats this with a rigid global token ceiling, dynamic burn mechanisms triggered by ecosystem taxes, and structured liquidity phases that prevent massive sell-offs and preserve long-term participant value.",
                },
              ].map((pillar, idx) => (
                <RevealOnScroll key={idx} direction="up" delay={idx * 150}>
                  <div className="bg-[#12141a] border-2 border-zinc-800 rounded-2xl p-6 md:p-10 h-full hover:border-indigo-500/50 transition-colors group relative overflow-hidden flex flex-col items-center text-center md:items-start md:text-left">
                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity blur-[40px] rounded-full"
                      style={{ backgroundColor: pillar.color }}
                    />
                    <div
                      className="absolute top-4 right-4 text-zinc-800 opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: pillar.color }}
                    >
                      <Link size={20} />
                    </div>
                    <div className="relative z-10 w-full flex flex-col items-center md:items-start">
                      <div className="mb-6 flex justify-center md:justify-start w-full">
                        <IconBox
                          icon={pillar.icon}
                          color={pillar.color}
                          size="md"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-4">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS SECTION ═══════════════ */}
        <section id="how-it-works" className="relative py-24 md:py-32 px-4">
          <div className="max-w-[85rem] mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-cyan-500 shadow-[3px_3px_0_#06b6d4] px-4 py-2 rounded-full mb-6">
                  <Compass size={14} className="text-cyan-400" />
                  <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    User Journey
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-black text-white uppercase tracking-tight leading-none">
                  How It <span className="text-cyan-400">Works</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto mt-6">
                  From wallet activation to sustained yield extraction — every
                  step is transparent, decentralized, and controlled entirely by
                  immutable smart contract logic.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {[
                {
                  step: "01",
                  icon: <Wallet />,
                  title: "Connect",
                  desc: "Link your Web3 wallet with a single click. Non-custodial — you retain full control of your assets.",
                  color: "#06b6d4",
                },
                {
                  step: "02",
                  icon: <Coins />,
                  title: "Commit",
                  desc: "Deposit your commitment amount. Instantly activates your yield generation on-chain.",
                  color: "#10b981",
                },
                {
                  step: "03",
                  icon: <Activity />,
                  title: "Accrue",
                  desc: "Your yield accrues continuously at your active booster rate. All calculations are transparent.",
                  color: "#eab308",
                },
                {
                  step: "04",
                  icon: <ArrowDownUp />,
                  title: "Extract",
                  desc: "Perform periodic extractions of accrued yield directly to your connected wallet.",
                  color: "#d946ef",
                },
                {
                  step: "05",
                  icon: <Repeat />,
                  title: "Compound",
                  desc: "Re-engage to reset capacity limits and unlock enhanced booster tiers for accelerated yield.",
                  color: "#f59e0b",
                },
              ].map((item, i) => (
                <RevealOnScroll key={i} direction="up" delay={i * 120}>
                  <div className="relative h-full">
                    <div
                      className="bg-[#12141a] border-2 border-zinc-800 rounded-2xl p-6 h-full hover:-translate-y-2 transition-all duration-500 hover:border-opacity-100 relative overflow-hidden group flex flex-col items-center text-center md:items-start md:text-left"
                      style={
                        {
                          borderColor: `${item.color}40`,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity"
                        style={{ backgroundColor: item.color }}
                      />
                      <div
                        className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300"
                        style={{ color: item.color }}
                      >
                        {item.icon}
                      </div>

                      <div className="relative z-10 w-full flex flex-col items-center md:items-start">
                        <div className="flex items-center justify-center md:justify-between w-full mb-4 gap-4">
                          <IconBox
                            icon={item.icon}
                            color={item.color}
                            size="sm"
                          />
                          <span
                            className="text-3xl font-space font-black text-transparent"
                            style={{ WebkitTextStroke: `1px ${item.color}80` }}
                          >
                            {item.step}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-3">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    {/* Connector Arrow */}
                    {i < 4 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#0a0b0e] border-2 border-zinc-700 flex items-center justify-center">
                          <ChevronRight
                            size={16}
                            className="text-fuchsia-400"
                            strokeWidth={3}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FEATURES SECTION ═══════════════ */}
        <section id="features" className="relative py-24 md:py-32 px-4">
          <div className="max-w-[85rem] mx-auto">
            <RevealOnScroll direction="fade">
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between text-center md:text-left gap-6 mb-16 md:mb-20">
                <div className="flex flex-col items-center md:items-start w-full">
                  <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-fuchsia-500 shadow-[3px_3px_0_#d946ef] px-4 py-2 rounded-full mb-6">
                    <Sparkles size={14} className="text-fuchsia-400" />
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                      Core Architecture
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-black text-white uppercase tracking-tight leading-none">
                    <SplitReveal text="Built For Scale" />
                  </h2>
                </div>
                <p className="text-sm md:text-base text-zinc-500 max-w-md font-light w-full">
                  A comprehensive DeFi infrastructure combining dynamic yield
                  generation, extensive networking, sustainable tokenomics, and
                  multi-tier incentives — all governed by trustless, audited
                  smart contracts.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <Activity />,
                  title: "Dynamic Base Yield",
                  desc: "Generate continuous returns based on protocol performance, compounding automatically via smart contracts.",
                  benefits: [
                    { text: "24/7 auto-accrual", icon: <Clock size={12} /> },
                    {
                      text: "No manual claiming lockups",
                      icon: <Unlock size={12} />,
                    },
                    {
                      text: "Fully verifiable on-chain",
                      icon: <Eye size={12} />,
                    },
                  ],
                  color: "#06b6d4",
                  shape: "polygon-1",
                },
                {
                  icon: <Network />,
                  title: "Deep Network Income",
                  desc: "Unlock structural earnings spanning across an extensive multi-tier network. Build and benefit passively.",
                  benefits: [
                    {
                      text: "Multi-generation depth",
                      icon: <Layers size={12} />,
                    },
                    {
                      text: "Progressive unlock levels",
                      icon: <Share2 size={12} />,
                    },
                    {
                      text: "Community-driven growth",
                      icon: <Users size={12} />,
                    },
                  ],
                  color: "#84cc16",
                  shape: "polygon-2",
                },
                {
                  icon: <Zap />,
                  title: "Performance Boosters",
                  desc: "Accelerate your yield velocity and expand your earnings limit by hitting structured growth milestones.",
                  benefits: [
                    {
                      text: "Permanent tier upgrades",
                      icon: <Target size={12} />,
                    },
                    {
                      text: "Enhanced rate multipliers",
                      icon: <Gauge size={12} />,
                    },
                    {
                      text: "Extended capacity limits",
                      icon: <Database size={12} />,
                    },
                  ],
                  color: "#eab308",
                  shape: "capsule-l",
                },
                {
                  icon: <Crown />,
                  title: "Elite Partner Pool",
                  desc: "Gain access to a highly restricted liquidity pool designed for premium contributors with dividend shares.",
                  benefits: [
                    {
                      text: "Strictly limited spots",
                      icon: <Lock size={12} />,
                    },
                    {
                      text: "Perpetual dividend flow",
                      icon: <Coins size={12} />,
                    },
                    {
                      text: "Governance participation",
                      icon: <Users size={12} />,
                    },
                  ],
                  color: "#f59e0b",
                  shape: "capsule-r",
                },
                {
                  icon: <Gift />,
                  title: "Uncapped Rewards",
                  desc: "Attain milestone-driven bonuses that bypass standard limits, directly incentivizing active ecosystem growth.",
                  benefits: [
                    {
                      text: "Zero capacity impact",
                      icon: <Shield size={12} />,
                    },
                    { text: "Pure bonus income", icon: <Diamond size={12} /> },
                    { text: "Milestone triggers", icon: <Trophy size={12} /> },
                  ],
                  color: "#d946ef",
                  shape: "polygon-1",
                },
                {
                  icon: <Shield />,
                  title: "Immutable Protocol",
                  desc: "Operate entirely trustless. Your allocations and earnings are dictated strictly by audited, decentralized code.",
                  benefits: [
                    { text: "Non-upgradable logic", icon: <Key size={12} /> },
                    {
                      text: "Full smart contract audit",
                      icon: <CheckCircle size={12} />,
                    },
                    {
                      text: "On-chain transparency",
                      icon: <Fingerprint size={12} />,
                    },
                  ],
                  color: "#10b981",
                  shape: "polygon-2",
                },
              ].map((feature, i) => (
                <ThickCard
                  key={i}
                  themeColor={feature.color}
                  shape={feature.shape as any}
                  delay={i * 100}
                >
                  <div className="flex flex-col h-full relative z-10 items-center text-center md:items-start md:text-left w-full">
                    <div className="mb-6 flex justify-center md:justify-start w-full">
                      <IconBox
                        icon={feature.icon}
                        color={feature.color}
                        size="md"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest mb-4 w-full">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5 w-full">
                      {feature.desc}
                    </p>

                    <div className="mt-auto space-y-2 pt-4 border-t border-zinc-800/50 w-full">
                      {feature.benefits.map((b, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-300 w-full"
                        >
                          <span style={{ color: feature.color }}>{b.icon}</span>
                          <span>{b.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ThickCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ NETWORK / LEVELS ═══════════════ */}
        <section id="levels" className="relative py-24 md:py-32 px-4">
          <div className="max-w-[85rem] mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-lime-500 shadow-[3px_3px_0_#84cc16] px-4 py-2 rounded-full mb-6">
                  <Network size={14} className="text-lime-400" />
                  <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    Multi-Tier Integration
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-black text-white uppercase tracking-tight leading-none">
                  Network <span className="text-lime-400">Expansion</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto mt-6">
                  Earn structural returns across all levels of your network.
                  Progressive depth unlocks deeper rewards through a carefully
                  engineered scaling curve.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <ThickCard themeColor="#84cc16" shape="capsule-l" delay={100}>
                  <div className="overflow-x-auto scrollbar-hide w-full">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-4 pb-4 mb-4 border-b-2 border-zinc-800 text-left">
                        {[
                          { h: "Depth Scope", i: <Layers size={12} /> },
                          { h: "Network Req", i: <Network size={12} /> },
                          { h: "Tier Req", i: <Crown size={12} /> },
                          { h: "Yield Power", i: <Zap size={12} /> },
                        ].map((col, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-bold text-lime-400 uppercase tracking-widest flex items-center gap-1 ${i === 3 ? "justify-end text-right" : ""}`}
                          >
                            {col.i} {col.h}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {CONCEPT_LEVEL_INCOME.map((row, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-4 items-center p-4 rounded-xl border-2 border-zinc-800/50 bg-[#0a0b0e] hover:border-lime-500/50 hover:bg-lime-500/5 hover:translate-x-1 transition-all duration-300 relative group text-left"
                          >
                            <span className="text-xs md:text-sm font-space font-bold text-white">
                              {row.level}
                            </span>
                            <span className="text-[10px] md:text-xs font-medium text-zinc-400">
                              {row.directs}
                            </span>
                            <span className="text-[10px] md:text-xs font-medium text-zinc-400">
                              {row.minId}
                            </span>
                            <span className="text-xs md:text-sm font-space font-bold text-lime-400 text-right">
                              {row.roi}
                            </span>
                            <div className="absolute right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                              <Network size={24} className="text-lime-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ThickCard>
              </div>

              <ThickCard themeColor="#84cc16" shape="polygon-2" delay={300}>
                <div className="flex flex-col items-center text-center md:items-start md:text-left h-full relative z-10 w-full">
                  <div className="mb-4 flex justify-center md:justify-start w-full">
                    <IconBox icon={<Layers />} color="#84cc16" size="md" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest mb-3 w-full">
                    Depth Mechanics
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 w-full">
                    Network yield is distributed structurally through
                    depth-scoped tiers. The deeper your network extends, the
                    broader your yield surface becomes.
                  </p>
                  <div className="space-y-3 w-full">
                    {[
                      {
                        label: "Progressive Unlocks",
                        desc: "Each depth requires qualification",
                        icon: <Unlock size={14} className="text-lime-400" />,
                      },
                      {
                        label: "Structural Yield",
                        desc: "Distributed by algorithm",
                        icon: <Share2 size={14} className="text-lime-400" />,
                      },
                      {
                        label: "Capacity-Aware",
                        desc: "All contributes to your cap",
                        icon: <Database size={14} className="text-lime-400" />,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-[#0a0b0e] border border-zinc-800/50 rounded-xl p-3 hover:border-lime-500/30 transition-colors flex flex-col md:flex-row items-center md:items-start gap-3 w-full"
                      >
                        <div className="mt-0.5">{item.icon}</div>
                        <div>
                          <div className="text-[10px] font-bold text-lime-400 uppercase tracking-widest mb-1 text-center md:text-left">
                            {item.label}
                          </div>
                          <div className="text-xs text-zinc-400 text-center md:text-left">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ThickCard>
            </div>

            <RevealOnScroll direction="up" delay={500}>
              <div className="mt-8 bg-[#12141a] border-2 border-fuchsia-500/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center text-center md:text-left gap-6 shadow-[6px_6px_0_rgba(217,70,239,0.2)] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-fuchsia-500/10 blur-[60px] rounded-full pointer-events-none" />
                <IconBox icon={<Users />} color="#d946ef" size="lg" />
                <div className="relative z-10 flex-1 flex flex-col items-center md:items-start w-full">
                  <h3 className="text-lg md:text-2xl font-bold text-white uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2 w-full">
                    Direct Amplification Strategy
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-3 w-full">
                    Secure an immediate structural bonus on all direct
                    integrations. This mechanism operates independently of depth
                    mechanics and provides instant yield amplification for
                    active community builders.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3 w-full">
                    {[
                      { tag: "Instant Activation", icon: <Zap size={10} /> },
                      {
                        tag: "Direct Volume Based",
                        icon: <BarChart size={10} />,
                      },
                      {
                        tag: "Capacity Contribution",
                        icon: <Database size={10} />,
                      },
                      {
                        tag: "Compounds With Network",
                        icon: <Share2 size={10} />,
                      },
                    ].map((item, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/30 px-2.5 py-1 rounded-lg uppercase tracking-widest"
                      >
                        {item.icon} {item.tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══════════════ INCOME STREAMS SECTION ═══════════════ */}
        <section id="income-streams" className="relative py-24 md:py-32 px-4">
          <div className="max-w-[85rem] mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-emerald-500 shadow-[3px_3px_0_#10b981] px-4 py-2 rounded-full mb-6">
                  <ArrowDownUp size={14} className="text-emerald-400" />
                  <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    Revenue Architecture
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-black text-white uppercase tracking-tight leading-none">
                  Income <span className="text-emerald-400">Streams</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto mt-6">
                  Five distinct yield channels, each engineered for specific
                  participation patterns. Combine multiple streams to maximize
                  your total ecosystem returns.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {INCOME_STREAMS.map((stream, i) => (
                <ThickCard
                  key={i}
                  themeColor={stream.color}
                  shape={stream.shape}
                  delay={i * 120}
                >
                  <div className="flex flex-col h-full relative z-10 items-center text-center md:items-start md:text-left w-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-5 w-full">
                      <div className="flex justify-center md:justify-start w-full md:w-auto">
                        <IconBox
                          icon={stream.icon}
                          color={stream.color}
                          size="md"
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <div
                          className="text-[10px] font-bold uppercase tracking-widest mb-1"
                          style={{ color: stream.color }}
                        >
                          {stream.subtitle}
                        </div>
                        <h3 className="text-lg font-space font-black text-white uppercase leading-tight">
                          {stream.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 w-full">
                      {stream.desc}
                    </p>

                    <div className="mt-auto pt-4 border-t-2 border-zinc-800/50 space-y-2 w-full flex flex-col items-center md:items-start">
                      <div
                        className="text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-1.5 w-full"
                        style={{ color: stream.color }}
                      >
                        <Lock size={10} /> Rules
                      </div>
                      {stream.rules.map((rule, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-center md:justify-start gap-2 text-[11px] text-zinc-300 w-full"
                        >
                          <span style={{ color: stream.color }}>
                            {rule.icon}
                          </span>
                          {rule.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </ThickCard>
              ))}

              <RevealOnScroll
                direction="up"
                delay={INCOME_STREAMS.length * 120}
                className="h-full"
              >
                <div className="h-full bg-gradient-to-br from-fuchsia-500/10 via-[#12141a] to-cyan-500/10 border-2 border-fuchsia-500/50 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0_rgba(217,70,239,0.2)] flex flex-col justify-center items-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15)_0%,transparent_70%)] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10 flex flex-col items-center">
                    <Sparkles
                      className="text-fuchsia-400 w-8 h-8 mx-auto mb-4"
                      strokeWidth={2}
                    />
                    <div className="text-6xl md:text-7xl font-space font-black shimmer-text mb-3">
                      5+
                    </div>
                    <div className="text-sm md:text-base font-bold text-white uppercase tracking-widest mb-2">
                      Compound Streams
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                      Activate multiple channels simultaneously to build a
                      diversified, resilient yield portfolio.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ═══════════════ TOKENOMICS ═══════════════ */}
        <section id="tokenomics" className="relative py-24 md:py-32 px-4">
          <div className="max-w-[85rem] mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-fuchsia-500 shadow-[3px_3px_0_#d946ef] px-4 py-2 rounded-full mb-6">
                  <Gem size={14} className="text-fuchsia-400" />
                  <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    Asset Architecture
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-black text-white uppercase tracking-tight leading-none">
                  <span className="text-fuchsia-400">Token</span>omics
                </h2>
                <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto mt-6">
                  A rigidly capped supply mechanism distributed across
                  structured tranches to ensure controlled liquidity generation
                  and long-term value preservation.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  label: "Global Ceiling",
                  title: "Deflationary Supply",
                  icon: <Globe />,
                  color: "#d946ef",
                  desc: "Fixed maximum with no inflation",
                },
                {
                  label: "Foundation",
                  title: "Initial Liquidity",
                  icon: <Lock />,
                  color: "#06b6d4",
                  desc: "Bootstrap phase liquidity pool",
                },
                {
                  label: "Distribution",
                  title: "Community Treasury",
                  icon: <Users />,
                  color: "#10b981",
                  desc: "Reserved for participants",
                },
              ].map((item, i) => (
                <ThickCard
                  key={i}
                  themeColor={item.color}
                  shape={["polygon-1", "capsule-l", "polygon-2"][i] as any}
                  delay={i * 150}
                >
                  <div className="text-center flex flex-col items-center w-full">
                    <div className="mx-auto w-fit mb-6">
                      <IconBox icon={item.icon} color={item.color} size="lg" />
                    </div>
                    <div className="text-lg md:text-2xl font-space font-black text-white mb-2 uppercase leading-tight w-full">
                      {item.title}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 w-full">
                      {item.label}
                    </div>
                    <p className="text-xs text-zinc-400 w-full">{item.desc}</p>
                  </div>
                </ThickCard>
              ))}
            </div>

            <ThickCard
              themeColor="#d946ef"
              shape="default"
              delay={300}
              className="mb-8"
            >
              <div className="mb-8 pb-6 border-b-2 border-zinc-800 flex flex-col items-center text-center md:items-start md:text-left w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest flex items-center justify-center md:justify-start gap-3 w-full">
                  <IconBox icon={<Layers />} color="#d946ef" size="sm" />
                  Liquidity Generation Phases
                </h3>
                <p className="text-xs text-zinc-500 mt-3 uppercase tracking-widest w-full">
                  Structured progression of fixed tranches with progressive
                  acquisition ratios.
                </p>
              </div>

              <div className="overflow-x-auto scrollbar-hide w-full">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-4 pb-4 border-b-2 border-zinc-800/50 mb-4 text-left">
                    {[
                      { h: "Phase", i: <Clock size={12} /> },
                      { h: "Scale", i: <Target size={12} /> },
                      { h: "Acquisition", i: <Fingerprint size={12} /> },
                      { h: "Split", i: <PieChart size={12} /> },
                    ].map((col, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest flex items-center gap-1.5"
                      >
                        {col.i} {col.h}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {CONCEPT_PHASES.map((phase, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-4 p-4 rounded-xl border-2 border-zinc-800/50 bg-[#0a0b0e] hover:border-fuchsia-500/50 hover:translate-x-1 transition-all text-left"
                      >
                        <span className="text-sm font-space font-bold text-fuchsia-400">
                          {phase.phase}
                        </span>
                        <span className="text-xs font-space font-medium text-zinc-300">
                          {phase.amount}
                        </span>
                        <span className="text-xs font-space font-bold text-white">
                          {phase.buy}
                        </span>
                        <span className="text-[10px] font-medium text-zinc-400">
                          {phase.lp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ThickCard>

            <RevealOnScroll direction="up" delay={400}>
              <div className="bg-[#12141a] border-2 border-fuchsia-500/30 rounded-3xl p-6 md:p-10 shadow-[6px_6px_0_rgba(217,70,239,0.15)] relative overflow-hidden flex flex-col items-center">
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none text-fuchsia-500">
                  <Coins size={200} />
                </div>
                <div className="text-center mb-8 relative z-10 w-full">
                  <div className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-[0.2em] mb-3">
                    Utility Framework
                  </div>
                  <h3 className="text-2xl md:text-3xl font-space font-black text-white uppercase tracking-tight">
                    Token Functions
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 w-full">
                  {[
                    {
                      icon: <Coins />,
                      title: "Yield Distribution",
                      desc: "Native asset for all reward payouts",
                    },
                    {
                      icon: <Database />,
                      title: "Liquidity Backing",
                      desc: "Backs LP reserves for stability",
                    },
                    {
                      icon: <Zap />,
                      title: "Booster Rewards",
                      desc: "Distributed on tier progressions",
                    },
                    {
                      icon: <Crown />,
                      title: "Treasury Dividends",
                      desc: "Partner Pool distribution asset",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#0a0b0e] border border-fuchsia-500/20 rounded-2xl p-5 hover:border-fuchsia-500/50 hover:-translate-y-1 transition-all flex flex-col items-center text-center md:items-start md:text-left justify-between w-full"
                    >
                      <div className="text-fuchsia-400 mb-3 bg-fuchsia-500/10 p-2 w-fit rounded-lg mx-auto md:mx-0">
                        {React.cloneElement(item.icon, {
                          size: 20,
                          strokeWidth: 2,
                        })}
                      </div>
                      <div className="w-full">
                        <div className="text-sm font-bold text-white uppercase tracking-widest mb-2 w-full">
                          {item.title}
                        </div>
                        <div className="text-xs text-zinc-500 w-full">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══════════════ FAQ SECTION ═══════════════ */}
        <section id="faq" className="relative py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-[#1a1d24] border-2 border-fuchsia-500 shadow-[3px_3px_0_#d946ef] px-4 py-2 rounded-full mb-6">
                  <HelpCircle size={14} className="text-fuchsia-400" />
                  <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    Common Questions
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-black text-white uppercase tracking-tight leading-none">
                  Frequent <span className="text-fuchsia-400">Queries</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto mt-6">
                  Everything you need to know about participating in the
                  protocol.
                </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-4">
              {[
                {
                  q: "How does the yield generation work?",
                  a: "Yield is generated algorithmically by the protocol's smart contracts based on your commitment amount, your active booster tier, and time elapsed since your last extraction. All calculations are transparent, on-chain, and verifiable by anyone.",
                },
                {
                  q: "What is the difference between capped and uncapped income?",
                  a: "Capped income (base yield, direct amplification, network yield, salary) contributes toward your maximum earning capacity. Once you reach your cap, capped streams pause. Uncapped rewards, however, bypass all limits and continue to distribute regardless of your capacity.",
                },
                {
                  q: "How do Booster Tiers work?",
                  a: "Booster Tiers permanently upgrade your protocol parameters when you meet specific criteria (self commitment + direct network + total volume). Once qualified, your yield rate and capacity multiplier are enhanced for the lifetime of your position.",
                },
                {
                  q: "Can I lose my initial commitment?",
                  a: "The protocol operates entirely on transparent smart contract logic. Your commitment interacts with immutable code — there is no centralized entity managing funds. All risks and mechanisms are visible on-chain before you commit.",
                },
                {
                  q: "What happens when I reach my earnings cap?",
                  a: "Once your cumulative capped earnings reach your capacity limit (commitment × cap multiplier), those streams pause. You can re-engage by making a new commitment which resets your capacity and gives your upline a referral bonus.",
                },
              ].map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} delay={i * 80} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="border-t-2 border-zinc-800 pt-16 pb-12 px-4 relative z-10 bg-[#090a0f]">
          <div className="max-w-[85rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12 w-full">
              {/* Brand and Description */}
              <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-6">
                  <img
                    src={logoImg}
                    alt="FMVONG Logo"
                    className="w-[120px] h-[120px] object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-md mb-5 font-light w-full">
                  A decentralized logic infrastructure featuring dynamic
                  baseline yields, deep structural incentives, conditional
                  boosters, and highly constrained treasury access. Managed
                  completely via immutable code.
                </p>
                <div className="inline-flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full mx-auto md:mx-0 w-fit">
                  <Shield size={12} /> Algorithmic Verification
                </div>
              </div>

              {/* Protocol Hub Nav */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
                <h4 className="text-xs font-bold text-fuchsia-400 uppercase tracking-[0.2em] mb-6 w-full">
                  Protocol Hub
                </h4>
                <ul className="space-y-3.5 flex flex-col items-center md:items-start w-full">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className="w-full md:w-auto text-center md:text-left"
                    >
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider font-medium flex items-center justify-center md:justify-start gap-2 group w-full md:w-auto"
                      >
                        <ChevronRight
                          size={12}
                          className="text-fuchsia-400 group-hover:translate-x-1 transition-transform"
                        />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Channels / Community Section */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6 w-full">
                  Connect Community
                </h4>
                <p className="text-xs text-zinc-500 mb-5 leading-relaxed font-light">
                  Join our verified media platforms to track on-chain network
                  updates, announcements, and guides.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full">
                  {SOCIAL_LINKS.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 bg-[#12141a] border border-zinc-800 rounded-xl hover:-translate-y-1 transition-all duration-300 group"
                      style={
                        {
                          "--hover-color": social.color,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        className="p-1.5 rounded-lg bg-[#1a1d24] group-hover:scale-110 transition-transform"
                        style={{ color: social.color }}
                      >
                        {social.icon}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider transition-colors">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom copyright statement */}
            <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
                © {new Date().getFullYear()} FINVORA / FMVONG. ALL RIGHT
                RESERVED.
              </span>
              <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <Globe size={10} className="text-zinc-600" /> MULTI-CHAIN
                COMPATIBLE EVM
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
