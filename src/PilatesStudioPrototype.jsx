import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const BRAND = {
  name: "Pilates With Kashan",
  initials: "PK",
  email: "Pilateswithkashan@gmail.com",
  instagram: "@pilateswithkashan",
};

const publicImage = (filename) => `${import.meta.env.BASE_URL}${filename}`;

const navItems = [
  { label: "Offers", id: "offers" },
  { label: "About", id: "about" },
  { label: "Classes", id: "classes" },
  { label: "Pricing", id: "pricing" },
  { label: "Blogs", id: "blogs" },
  { label: "FAQs", id: "faqs" },
  { label: "Contact", id: "contact" },
];

const offers = [
  {
    title: "First Mat Ritual",
    price: "£19",
    detail: "Intro mat class + welcome consultation",
    description:
      "A calm first session to understand your body, goals, and how you want Pilates to feel.",
    cta: "Claim intro offer",
  },
  {
    title: "Glow Week Pass",
    price: "£55",
    detail: "Unlimited mat classes for 7 days",
    description:
      "Explore mat Pilates, stretch, sculpt, and restorative flow before choosing your next step.",
    cta: "Start glow week",
  },
  {
    title: "Private Alignment",
    price: "£45",
    detail: "One-to-one mat Pilates session",
    description:
      "A personalised private session with calm pacing, tailored cues, and focused form correction.",
    cta: "Book private session",
  },
];

const classes = [
  {
    title: "Mat Pilates Flow",
    level: "All levels",
    duration: "50 min",
    mood: "Sculpt",
    description:
      "A graceful full-body mat session using breath, control, and precise movement to build length and strength.",
  },
  {
    title: "Morning Mat Ritual",
    level: "Beginner",
    duration: "40 min",
    mood: "Calm",
    description:
      "Slow, intentional mat Pilates designed to improve posture, mobility, and body awareness.",
  },
  {
    title: "Power Core Mat",
    level: "Intermediate",
    duration: "45 min",
    mood: "Energise",
    description:
      "A focused mat-based core and glute class with tempo changes, deep holds, and precise alignment cues.",
  },
  {
    title: "Restore + Stretch",
    level: "All levels",
    duration: "35 min",
    mood: "Recover",
    description:
      "A soothing mobility-led mat class for hips, spine, shoulders, and nervous-system reset.",
  },
  {
    title: "Reformer Pilates",
    level: "Coming soon",
    duration: "Launching soon",
    mood: "Coming Soon",
    description:
      "Reformer Pilates is not available just yet, but it is planned for the next phase of the studio experience.",
  },
];

const classImages = {
  "Mat Pilates Flow": publicImage("Image for 3rd border.png"),
  "Morning Mat Ritual": publicImage("Image for 4th broder.png"),
  "Power Core Mat": publicImage("Image for 5th border.png"),
  "Restore + Stretch": publicImage("Picture for 7th border.png"),
};

const plans = [
  {
    name: "Intro Ritual",
    price: "£39",
    detail: "3 classes in 14 days",
    features: [
      "Perfect for first-timers",
      "Mat Pilates access",
      "Welcome consultation",
      "Form foundations",
    ],
  },
  {
    name: "Studio Muse",
    price: "£129",
    detail: "8 mat classes monthly",
    features: [
      "Priority booking",
      "Monthly progress check",
      "Access to member offers",
      "Flexible class use",
    ],
    loved: true,
  },
  {
    name: "Unlimited Glow",
    price: "£189",
    detail: "Unlimited monthly mat classes",
    features: [
      "Unlimited mat classes",
      "Private class discounts",
      "Wellness event invites",
      "Priority waitlist access",
    ],
  },
];

const blogPosts = [
  {
    title: "Why mat Pilates is the perfect place to start",
    category: "Movement",
    readTime: "4 min read",
    excerpt:
      "A simple guide to breath, control, alignment, and why low-impact mat training can feel so powerful.",
  },
  {
    title: "The beginner guide to your first class",
    category: "Studio Guide",
    readTime: "5 min read",
    excerpt:
      "What to wear, what to expect, and how to feel comfortable stepping into your first Pilates session.",
  },
];

const blogImages = [
  publicImage("Image for 8th border.png"),
  publicImage("Image for 9th border.png"),
];

const faqs = [
  {
    question: "Do I need experience before joining?",
    answer:
      "No. Intro mat sessions are designed for complete beginners. Kashan will guide your setup, form, and modifications throughout class.",
  },
  {
    question: "What should I bring to class?",
    answer:
      "Wear comfortable fitted clothing and bring water. Mats will be used for sessions, and you can bring your own mat if you prefer.",
  },
  {
    question: "How early should I arrive?",
    answer:
      "For your first class, arrive 10 minutes early so there is time to settle in, ask questions, and feel prepared.",
  },
  {
    question: "Do you offer reformer Pilates?",
    answer:
      "Reformer Pilates is coming soon. The studio is starting with mat Pilates first, then reformer sessions will be introduced as the next phase.",
  },
];

const testimonials = [
  "The experience feels calm and luxurious, but every session leaves me stronger.",
  "Kashan style is warm, precise, and confidence-building from the first class.",
  "I came for posture and stayed for the ritual. This is my favourite hour of the week.",
];

const smokeTests = [
  { name: "nav includes classes", pass: navItems.some((item) => item.id === "classes") },
  { name: "hero visual component exists", pass: typeof HeroStudioVisual === "function" },
  { name: "classes are selectable", pass: classes.length >= 4 },
  { name: "mat pilates is first class", pass: classes[0].title.includes("Mat Pilates") },
  { name: "reformer marked coming soon", pass: classes.some((item) => item.title.includes("Reformer") && item.level === "Coming soon") },
  { name: "offers available", pass: offers.length === 3 },
  { name: "faqs available", pass: faqs.length >= 4 },
  { name: "plans available", pass: plans.length === 3 },
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium transition hover:-translate-y-0.5 active:scale-95 " +
        className
      }
    >
      {children}
    </button>
  );
}

function SectionHeader({ eyebrow, title, copy, dark = false }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p
        className={
          "mb-4 text-xs uppercase tracking-[0.35em] " +
          (dark ? "text-[#d4a978]" : "text-[#9a6d4b]")
        }
      >
        {eyebrow}
      </p>
      <h2
        className={
          "font-serif text-5xl leading-tight tracking-tight md:text-6xl " +
          (dark ? "text-[#fff7ec]" : "text-[#2f2017]")
        }
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={
            "mx-auto mt-5 max-w-2xl text-base leading-8 " +
            (dark ? "text-[#e3c19d]" : "text-[#76543c]")
          }
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function useTilt(maxTilt = 8) {
  const ref = useRef(null);
  const handleMouseMove = (event) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * maxTilt;
    const rotateX = (0.5 - (event.clientY - rect.top) / rect.height) * maxTilt;
    element.style.transform =
      "perspective(900px) rotateX(" +
      rotateX +
      "deg) rotateY(" +
      rotateY +
      "deg) translateY(-8px)";
  };
  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

function TiltCard({ children, className = "", onClick, maxTilt = 8 }) {
  const tilt = useTilt(maxTilt);
  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className={
        "transition-transform duration-200 ease-out will-change-transform " + className
      }
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children, active = false, onClick }) {
  const activeClass = "border-[#4a2f1e] bg-[#4a2f1e] text-[#fff7ec] shadow-sm";
  const inactiveClass =
    "border-[#d7bea3] bg-[#fff7ec]/70 text-[#5a3b28] hover:border-[#8c6244]";
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-4 py-2 text-sm transition-all " +
        (active ? activeClass : inactiveClass)
      }
    >
      {children}
    </button>
  );
}

function HeroStudioVisual() {
  return (
    <svg className="absolute inset-0 h-full w-full scale-105 object-cover" viewBox="0 0 1086 1448" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d8b083" />
          <stop offset="0.55" stopColor="#8d633f" />
          <stop offset="1" stopColor="#351e12" />
        </linearGradient>
        <radialGradient id="light" cx="78%" cy="20%" r="75%">
          <stop stopColor="#fff7e6" stopOpacity="1" />
          <stop offset="0.4" stopColor="#e2b77f" stopOpacity="0.45" />
          <stop offset="1" stopColor="#351e12" stopOpacity="0" />
        </radialGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#200f08" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect width="1086" height="1448" fill="url(#wall)" />
      <rect width="1086" height="1448" fill="url(#light)" />
      <rect x="810" y="0" width="276" height="760" fill="#faead0" opacity="0.95" />
      <rect x="890" y="20" width="125" height="720" fill="#fff9ed" opacity="0.78" />
      <g opacity="0.36" stroke="#cda879" strokeWidth="8">
        <path d="M915 0v760M955 0v760M995 0v760M1035 0v760" />
      </g>
      <g filter="url(#shadow)">
        <path d="M640 910c-12-220-10-425 52-640" stroke="#301c10" strokeWidth="14" fill="none" />
        <g fill="none" stroke="#2f3d22" strokeWidth="10" strokeLinecap="round">
          <path d="M685 330c-82 30-142 92-182 186M700 350c76 34 128 94 160 180M665 460c-90 42-160 104-212 190M720 490c90 38 150 106 200 205M650 590c-75 35-130 88-170 158M735 610c76 34 135 88 180 160" />
        </g>
        <circle cx="665" cy="900" r="88" fill="#776345" />
      </g>
      <rect x="0" y="825" width="610" height="38" fill="#b07b4f" />
      <rect x="74" y="735" width="96" height="96" rx="45" fill="#513b2b" />
      <path d="M0 740c80-70 145-75 230-25" stroke="#d6b585" strokeWidth="6" fill="none" opacity="0.75" />
      <g filter="url(#shadow)">
        <rect x="-60" y="960" width="870" height="160" rx="35" fill="#2b1c13" opacity="0.65" />
        <rect x="250" y="900" width="500" height="88" rx="22" fill="#b78555" />
        <rect x="320" y="850" width="360" height="75" rx="18" fill="#23150e" opacity="0.75" />
        <rect x="-20" y="1100" width="1060" height="185" rx="45" fill="#b47b4d" />
        <rect x="390" y="1040" width="570" height="120" rx="25" fill="#23160f" opacity="0.78" />
        <path d="M40 1030h280M720 1000h300M510 930h430" stroke="#23160f" strokeWidth="12" opacity="0.8" />
      </g>
      <rect width="1086" height="1448" fill="#160f0b" opacity="0.06" />
    </svg>
  );
}

function HeroImageFrame({ children }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#2f2017] p-8">
      <HeroStudioVisual />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2f2017]/0 via-[#2f2017]/5 to-[#2f2017]/55" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function PilatesStudioPrototype() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMood, setActiveMood] = useState("All");
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Studio Muse");
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(offers[0].title);
  const [messageSent, setMessageSent] = useState(false);

  const moods = useMemo(() => ["All", ...new Set(classes.map((item) => item.mood))], []);
  const filteredClasses = useMemo(
    () => (activeMood === "All" ? classes : classes.filter((item) => item.mood === activeMood)),
    [activeMood],
  );

  return (
    <main className="min-h-screen scroll-smooth overflow-hidden bg-[#160f0b] text-[#2f2017]">
      <div className="hidden" data-testid="smoke-tests">
        {smokeTests.map((test) => (
          <span key={test.name} data-pass={test.pass ? "true" : "false"}>
            {test.name}
          </span>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 opacity-90">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#b57945]/25 blur-3xl" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#6f3f26]/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-[#d9ad79]/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[#f5d8b4]/10 bg-[#160f0b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e8c294] text-[#26160e] shadow-lg shadow-black/20">
              {BRAND.initials}
            </div>
            <div>
              <p className="font-serif text-xl tracking-tight text-[#fff7ec]">{BRAND.name}</p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4a978]">Mat Pilates Studio</p>
            </div>
          </button>
          <nav className="hidden items-center gap-7 text-sm text-[#ead0b1] md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => scrollToSection("booking")}
            className="hidden bg-[#e8c294] text-[#26160e] hover:bg-[#f3d7b6] md:inline-flex"
          >
            Book now
          </Button>
          <button className="text-[#fff7ec] md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mb-5 rounded-3xl border border-[#f5d8b4]/10 bg-[#24160f] p-5 shadow-xl md:hidden"
          >
            <div className="grid gap-4 text-sm text-[#ead0b1]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToSection(item.id);
                  }}
                  className="text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </header>

      <section
        id="home"
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24"
      >
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5d8b4]/20 bg-[#fff1df]/10 px-4 py-2 text-sm text-[#f6d8b3] shadow-sm backdrop-blur">
            ✦ Candlelit Pilates, calm strength, and precise form
          </div>
          <h1 className="max-w-3xl font-serif text-6xl leading-[0.95] tracking-tight text-[#fff7ec] md:text-8xl">
            Mat Pilates that feels calm, strong, and beautifully personal.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#e3c19d]">
            {BRAND.name} is a warm luxury Pilates experience inspired by golden light, soft architecture, and
            intentional movement.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => scrollToSection("offers")}
              className="bg-[#e8c294] text-[#26160e] hover:bg-[#f3d7b6]"
            >
              View intro offers <span className="ml-2">→</span>
            </Button>
            <Button
              onClick={() => scrollToSection("about")}
              className="border border-[#e8c294]/40 bg-transparent text-[#fff7ec] hover:bg-[#fff7ec]/10"
            >
              Explore the studio
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#d7ae82]">
            <div>
              <strong className="block text-2xl text-[#fff7ec]">1:1</strong> Private support
            </div>
            <div>
              <strong className="block text-2xl text-[#fff7ec]">All</strong> Levels welcome
            </div>
            <div>
              <strong className="block text-2xl text-[#fff7ec]">Calm</strong> Luxury feel
            </div>
          </div>
        </motion.div>

        <TiltCard maxTilt={12} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-t-[9rem] rounded-b-[3rem] border border-[#f5d8b4]/20 bg-[#2c1b12] shadow-2xl shadow-black/40">
            <HeroImageFrame>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-full flex-col justify-between rounded-t-[7rem] rounded-b-[2rem] border border-[#ffe2bc]/30 bg-transparent p-7"
              >
                <div className="w-fit rounded-full bg-[#fff7ec]/90 px-4 py-2 text-sm text-[#4a2f1e] shadow-sm">
                  Todays Ritual
                </div>
                <div>
                  <div className="mb-5 grid h-40 w-40 place-items-center rounded-full border border-[#ffe2bc]/60 bg-[#fff7ec]/20 text-center text-[#fff7ec] shadow-inner">
                    <p className="text-3xl">♡</p>
                    <p className="font-serif text-2xl">Breathe</p>
                  </div>
                  <h2 className="font-serif text-5xl leading-tight text-[#fff7ec] drop-shadow-lg">
                    Mat Pilates Flow at 10:30
                  </h2>
                  <p className="mt-4 max-w-sm text-[#f3d7b6] drop-shadow">
                    Low-impact mat strength, elegant sequencing, and guided alignment.
                  </p>
                </div>
              </motion.div>
            </HeroImageFrame>
          </div>
          <div className="absolute -bottom-16 -left-4 max-w-xs rounded-[2rem] border border-[#fff0dc]/30 bg-[#fff7ec]/90 p-5 shadow-xl backdrop-blur md:-left-10">
            <div className="mb-3 flex gap-1 text-[#9b642f]">★★★★★</div>
            <p className="text-sm leading-6 text-[#5a3b28]">
              Calm, precise, and genuinely confidence-building from the first session.
            </p>
          </div>
        </TiltCard>
      </section>

      <section id="offers" className="relative z-10 bg-[#fff7ec] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Offers"
            title="Introductory rituals designed to welcome you in."
            copy="Select one, then continue into booking."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer) => {
              const active = selectedOffer === offer.title;
              const activeClass = active
                ? "border-[#4a2f1e] bg-[#4a2f1e] text-[#fff7ec] shadow-2xl shadow-[#4a2f1e]/20"
                : "border-[#ead2b7] bg-white text-[#2f2017] hover:border-[#b57945]";
              return (
                <TiltCard key={offer.title} onClick={() => setSelectedOffer(offer.title)} className="cursor-pointer">
                  <div
                    className={
                      "h-full rounded-t-[5rem] rounded-b-[2rem] border p-7 text-left shadow-sm transition-all " +
                      activeClass
                    }
                  >
                    <p className={"mb-8 text-sm " + (active ? "text-[#e8c294]" : "text-[#9a6d4b]")}>
                      {offer.detail}
                    </p>
                    <h3 className="font-serif text-4xl">{offer.title}</h3>
                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-serif text-5xl">{offer.price}</span>
                      <span className={active ? "pb-2 text-[#e8c294]" : "pb-2 text-[#9a6d4b]"}>from</span>
                    </div>
                    <p className={"mt-5 leading-7 " + (active ? "text-[#f3d7b6]" : "text-[#76543c]")}>
                      {offer.description}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                      {offer.cta} <span>›</span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 bg-[#f2dfc7] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <TiltCard maxTilt={10}>
            <div className="overflow-hidden rounded-t-[8rem] rounded-b-[2.5rem] border-[10px] border-[#7a4328] bg-[#7a4328] shadow-2xl shadow-[#4a2f1e]/20">
              <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-t-[6.5rem] rounded-b-[1.8rem] p-7 text-[#fff7ec]">
                <img
                  src={publicImage("Image for 1st border.png")}
                  alt="Warm boutique Pilates studio interior"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70" />
                <div className="relative z-10 w-fit rounded-full bg-[#fff7ec]/90 px-4 py-2 text-sm text-[#4a2f1e] shadow-sm">
                  About Kashan
                </div>
                <div className="relative z-10">
                  <p className="max-w-sm font-serif text-5xl leading-tight">Warm light. Soft curves. Quiet strength.</p>
                  <p className="mt-5 max-w-sm text-[#ffe7c5]">
                    A personal Pilates experience created for mindful movement, elegant form, and restorative focus.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#9a6d4b]">About</p>
            <h2 className="font-serif text-5xl leading-tight tracking-tight text-[#2f2017] md:text-6xl">
              A boutique Pilates expereince with a luxury feeling.
            </h2>
            <p className="mt-6 text-lg leading-9 text-[#76543c]">
              {BRAND.name} is designed for people who want movement to feel intentional, beautiful, and deeply personal.
              Every class begins with precise mat Pilates technique, mindful movement, and a calming studio-inspired environment.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                ["Personal attention", "More clarity, more confidence."],
                ["Elegant coaching", "Clear cues and modifications."],
                ["Luxury rituals", "Movement that feels restorative."],
              ].map(([title, copy]) => (
                <TiltCard key={title} maxTilt={5}>
                  <div className="rounded-3xl bg-[#fff7ec]/70 p-5 shadow-sm">
                    <p className="font-serif text-2xl text-[#2f2017]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#76543c]">{copy}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
            <Button
              onClick={() => scrollToSection("contact")}
              className="mt-9 bg-[#4a2f1e] text-[#fff7ec] hover:bg-[#6f442b]"
            >
              Contact Kashan
            </Button>
          </div>
        </div>
      </section>

      <section id="classes" className="relative z-10 bg-[#fff7ec] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9a6d4b]">Class finder</p>
              <h2 className="font-serif text-5xl tracking-tight text-[#2f2017] md:text-6xl">Choose your energy.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <Pill key={mood} active={activeMood === mood} onClick={() => setActiveMood(mood)}>
                  {mood}
                </Pill>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4">
              {filteredClasses.map((classItem) => {
                const selected = selectedClass.title === classItem.title;
                const selectedClassName = selected
                  ? "border-[#4a2f1e] bg-[#4a2f1e] text-[#fff7ec] shadow-xl shadow-[#4a2f1e]/10"
                  : "border-[#ead2b7] bg-white hover:bg-[#fbeddc]";
                return (
                  <TiltCard
                    key={classItem.title}
                    maxTilt={5}
                    onClick={() => setSelectedClass(classItem)}
                    className="cursor-pointer"
                  >
                    <div className={"rounded-[2rem] border p-6 text-left transition-all " + selectedClassName}>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-serif text-3xl">{classItem.title}</h3>
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs">{classItem.mood}</span>
                      </div>
                      <p className={"mt-3 text-sm " + (selected ? "text-[#f3d7b6]" : "text-[#9a6d4b]")}>
                        {classItem.level} • {classItem.duration}
                      </p>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
            <TiltCard maxTilt={7}>
              <div className="rounded-[2.5rem] border border-[#ead2b7] bg-white p-8 shadow-xl shadow-[#4a2f1e]/5 md:p-10">
                <div className="relative mb-8 flex h-64 items-end overflow-hidden rounded-t-[6rem] rounded-b-[2rem] bg-gradient-to-br from-[#6f442b] via-[#d4a978] to-[#2f2017] p-6">
                  <img
                    src={classImages[selectedClass.title] || classImages["Mat Pilates Flow"]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
                  <div className="relative z-10 rounded-3xl bg-[#fff7ec]/90 p-5 shadow-sm backdrop-blur">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#9a6d4b]">Featured class</p>
                    <h3 className="mt-2 font-serif text-4xl text-[#2f2017]">{selectedClass.title}</h3>
                  </div>
                </div>
                <p className="text-lg leading-8 text-[#76543c]">{selectedClass.description}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[selectedClass.level, selectedClass.duration, selectedClass.mood].map((item) => (
                    <div key={item} className="rounded-2xl bg-[#f6e6d3] px-4 py-4 text-center text-sm text-[#76543c]">
                      {item}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => scrollToSection("booking")}
                  className="mt-8 bg-[#4a2f1e] text-[#fff7ec] hover:bg-[#6f442b]"
                >
                  Reserve this class
                </Button>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 bg-[#160f0b] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple plans, elevated rituals."
            copy="Choose the plan that supports your rhythm, then book your next session."
            dark
          />
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const active = selectedPlan === plan.name;
              const planClass = active
                ? "border-[#e8c294] bg-[#e8c294] text-[#26160e] shadow-2xl shadow-[#e8c294]/20"
                : "border-[#f5d8b4]/15 bg-[#fff7ec]/10 text-[#fff7ec] hover:bg-[#fff7ec]/20";
              return (
                <TiltCard key={plan.name} onClick={() => setSelectedPlan(plan.name)} className="cursor-pointer" maxTilt={10}>
                  <div className={"relative h-full rounded-[2.5rem] border p-7 text-left shadow-sm transition-all " + planClass}>
                    {plan.loved ? (
                      <div
                        className={
                          "absolute right-6 top-6 rounded-full px-3 py-1 text-xs " +
                          (active ? "bg-[#26160e] text-[#fff7ec]" : "bg-[#e8c294] text-[#26160e]")
                        }
                      >
                        Most loved
                      </div>
                    ) : null}
                    <h3 className="font-serif text-3xl">{plan.name}</h3>
                    <div className="mt-8 flex items-end gap-2">
                      <span className="font-serif text-6xl">{plan.price}</span>
                      <span className={active ? "pb-2 text-[#6f442b]" : "pb-2 text-[#d4a978]"}>/mo</span>
                    </div>
                    <p className={"mt-3 " + (active ? "text-[#6f442b]" : "text-[#e3c19d]")}>{plan.detail}</p>
                    <div className="mt-8 grid gap-4">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-sm">
                          <span
                            className={
                              "grid h-6 w-6 place-items-center rounded-full " +
                              (active ? "bg-[#26160e] text-[#fff7ec]" : "bg-[#e8c294] text-[#26160e]")
                            }
                          >
                            ✓
                          </span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blogs" className="relative z-10 bg-[#f2dfc7] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Blogs"
            title="Journal notes for mindful movement."
            copy="Explore movement tips, studio updates, and guidance for your Pilates practice."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <TiltCard key={post.title} className="cursor-pointer" maxTilt={8}>
                <div className="group overflow-hidden rounded-[2.5rem] border border-white/60 bg-[#fff7ec] text-left shadow-sm transition hover:shadow-xl hover:shadow-[#4a2f1e]/10">
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#4a2f1e] via-[#b57945] to-[#f0d2ad] p-5">
                    {blogImages[index] ? (
                      <img
                        src={blogImages[index]}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                    ) : null}
                    <div className="relative z-10 flex h-full items-end rounded-[2rem] border border-[#ffe2bc]/30 bg-[#fff7ec]/10 p-5">
                      <p className="font-serif text-5xl text-[#fff7ec]">0{index + 1}</p>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#9a6d4b]">
                      {post.category} • {post.readTime}
                    </p>
                    <h3 className="font-serif text-3xl leading-tight text-[#2f2017]">{post.title}</h3>
                    <p className="mt-4 leading-7 text-[#76543c]">{post.excerpt}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4a2f1e]">
                      Read article <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="relative z-10 bg-[#fff7ec] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#9a6d4b]">FAQs</p>
            <h2 className="font-serif text-5xl leading-tight tracking-tight text-[#2f2017] md:text-6xl">
              Questions, answered calmly.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#76543c]">
              Find calm, simple answers before your first class.
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              className="mt-8 bg-[#4a2f1e] text-[#fff7ec] hover:bg-[#6f442b]"
            >
              Ask another question
            </Button>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <TiltCard key={faq.question} maxTilt={4}>
                  <div className="rounded-[2rem] border border-[#ead2b7] bg-white p-2 shadow-sm">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 rounded-[1.5rem] px-5 py-5 text-left"
                    >
                      <span className="font-serif text-2xl text-[#2f2017]">{faq.question}</span>
                      <span className={"text-xl text-[#9a6d4b] transition " + (isOpen ? "rotate-180" : "")}>⌄</span>
                    </button>
                    {isOpen ? (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-5 pb-6 leading-8 text-[#76543c]"
                      >
                        {faq.answer}
                      </motion.p>
                    ) : null}
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="booking" className="relative z-10 bg-[#f2dfc7] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[3rem] border border-white/70 bg-[#fff7ec]/70 p-6 shadow-xl shadow-[#4a2f1e]/5 backdrop-blur lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="rounded-[2.5rem] bg-[#4a2f1e] p-8 text-[#fff7ec]">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#e8c294]">Interactive booking</p>
            <h2 className="font-serif text-5xl tracking-tight">Book in three soft steps.</h2>
            <p className="mt-5 leading-8 text-[#f3d7b6]">
              This prototype shows how the booking journey could feel before connecting it to a real scheduler.
            </p>
            <div className="mt-8 grid gap-3">
              {["Choose class", "Pick time", "Confirm ritual"].map((step, index) => (
                <button
                  key={step}
                  onClick={() => setBookingStep(index + 1)}
                  className={
                    "flex items-center justify-between rounded-2xl px-5 py-4 text-left transition " +
                    (bookingStep === index + 1
                      ? "bg-[#e8c294] text-[#26160e]"
                      : "bg-[#fff7ec]/10 text-[#f3d7b6]")
                  }
                >
                  <span>{step}</span>
                  <span className="text-sm opacity-70">0{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <TiltCard maxTilt={6}>
            <div className="rounded-[2.5rem] bg-white p-8 shadow-inner">
              <div className="mb-7 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f6e6d3] text-[#4a2f1e]">◷</div>
                <div>
                  <p className="font-serif text-2xl text-[#2f2017]">Step {bookingStep}</p>
                  <p className="text-sm text-[#9a6d4b]">Your first visit, made simple</p>
                </div>
              </div>
              {bookingStep === 1 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3">
                  {classes.slice(0, 3).map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setSelectedClass(item)}
                      className="rounded-2xl border border-[#ead2b7] p-5 text-left transition hover:bg-[#fff7ec]"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-2xl text-[#2f2017]">{item.title}</h4>
                        <span className="text-sm text-[#9a6d4b]">{item.duration}</span>
                      </div>
                      <p className="mt-2 text-sm text-[#9a6d4b]">{item.level}</p>
                    </button>
                  ))}
                </motion.div>
              ) : null}
              {bookingStep === 2 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {["08:00", "10:30", "12:15", "17:30", "18:45", "19:30"].map((time, index) => (
                    <button
                      key={time}
                      className={
                        "rounded-2xl border p-5 text-center " +
                        (index === 1
                          ? "border-[#4a2f1e] bg-[#4a2f1e] text-[#fff7ec]"
                          : "border-[#ead2b7] bg-[#fff7ec] text-[#76543c]")
                      }
                    >
                      {time}
                    </button>
                  ))}
                </motion.div>
              ) : null}
              {bookingStep === 3 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[2rem] bg-[#fff7ec] p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#9a6d4b]">Reservation preview</p>
                  <h4 className="mt-3 font-serif text-4xl text-[#2f2017]">{selectedClass.title}</h4>
                  <p className="mt-3 text-[#76543c]">
                    Tomorrow at 10:30 • {selectedClass.duration} • {BRAND.name}
                  </p>
                  <Button className="mt-7 bg-[#4a2f1e] text-[#fff7ec] hover:bg-[#6f442b]">Confirm booking</Button>
                </motion.div>
              ) : null}
            </div>
          </TiltCard>
        </div>
      </section>

      <section id="contact" className="relative z-10 bg-[#160f0b] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#d4a978]">Contact</p>
            <h2 className="font-serif text-5xl leading-tight tracking-tight text-[#fff7ec] md:text-6xl">
              Connect with Kashan.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#e3c19d]">
              Use the enquiry form, send an email, or connect on Instagram to ask about sessions, pricing, or private
              bookings.
            </p>
            <div className="mt-9 grid gap-4 text-[#f3d7b6]">
              <div className="flex items-center gap-3">
                <span className="text-[#e8c294]">✉</span> {BRAND.email}
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-[#e8c294] text-[9px] font-bold text-[#e8c294]">
                  IG
                </span>{" "}
                {BRAND.instagram}
              </div>
            </div>
          </div>
          <TiltCard maxTilt={7}>
            <div className="rounded-[2.5rem] border border-[#f5d8b4]/15 bg-[#fff7ec] p-7 shadow-2xl shadow-black/20 md:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="rounded-2xl border border-[#ead2b7] bg-white px-5 py-4 outline-none focus:border-[#4a2f1e]"
                  placeholder="First name"
                />
                <input
                  className="rounded-2xl border border-[#ead2b7] bg-white px-5 py-4 outline-none focus:border-[#4a2f1e]"
                  placeholder="Email address"
                />
              </div>
              <select className="mt-4 w-full rounded-2xl border border-[#ead2b7] bg-white px-5 py-4 text-[#76543c] outline-none focus:border-[#4a2f1e]">
                <option>Interested in...</option>
                <option>Intro offer</option>
                <option>Pricing and memberships</option>
                <option>Private sessions</option>
                <option>General question</option>
              </select>
              <textarea
                className="mt-4 min-h-36 w-full rounded-2xl border border-[#ead2b7] bg-white px-5 py-4 outline-none focus:border-[#4a2f1e]"
                placeholder="Tell Kashan what you are looking for"
              />
              <Button
                onClick={() => setMessageSent(true)}
                className="mt-5 w-full bg-[#4a2f1e] text-[#fff7ec] hover:bg-[#6f442b]"
              >
                {messageSent ? "Message preview sent" : "Send enquiry"}
              </Button>
              {messageSent ? (
                <p className="mt-4 text-center text-sm text-[#76543c]">
                  Prototype interaction: this can later connect to {BRAND.email} or a booking system.
                </p>
              ) : null}
            </div>
          </TiltCard>
        </div>
      </section>

      <section className="relative z-10 bg-[#fff7ec] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {testimonials.map((quote, index) => (
            <TiltCard key={quote} maxTilt={6}>
              <div className="rounded-[2rem] border border-[#ead2b7] bg-white p-7 shadow-sm">
                <div className="mb-5 flex gap-1 text-[#9b642f]">★★★★★</div>
                <p className="leading-7 text-[#76543c]">{quote}</p>
                <p className="mt-6 text-sm text-[#9a6d4b]">Client {index + 1}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <footer className="relative z-10 bg-[#160f0b] px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 rounded-[2rem] border border-[#f5d8b4]/15 bg-[#24160f] p-8 text-[#fff7ec] md:flex-row md:items-center">
          <button onClick={() => scrollToSection("home")} className="text-left">
            <p className="font-serif text-3xl">{BRAND.name}</p>
            <p className="mt-2 text-sm text-[#d4a978]">Beautiful movement, calmly designed.</p>
          </button>
          <div className="flex flex-wrap gap-4 text-sm text-[#e3c19d]">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="hover:text-white">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
