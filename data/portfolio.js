/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * Every section of the site reads from this file. Edit here — never in the
 * components — and the whole site updates.
 *
 * Fields left as an empty string ("") are intentionally blank: the components
 * detect them and hide the related UI. Fill one in and the UI appears
 * automatically. Look for the `TODO` comments for the handful of things that
 * were not on the resume.
 */

/**
 * Canonical origin, used for canonical tags, Open Graph and the sitemap.
 *
 * Resolves automatically: set NEXT_PUBLIC_SITE_URL once you have a custom
 * domain, otherwise Vercel supplies the production URL at build time, and
 * local dev falls back to localhost. No editing required to deploy.
 */
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

/* -------------------------------------------------------------------------- */
/* PROFILE                                                                     */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Dev Parmar",
  nameUpper: "DEV PARMAR",
  initials: "DP",
  /** Role exactly as it appears on the resume. */
  role: "UI/UX Designer",
  /** Headline shown in the hero and in SEO metadata. */
  headline: "UI/UX Designer & Frontend Developer",
  eyebrow: "Portfolio",
  /** Short hero intro, condensed from the resume summary. */
  intro:
    "UI/UX Designer and M.Des student with a Computer Engineering background. I turn user research into simple, intuitive interfaces — from user flows and wireframes through to polished, responsive UI.",
  /** Full professional summary, used in the About section and SEO description. */
  summary:
    "UI/UX Designer and M.Des student with a Computer Engineering background, skilled in user research, user flows, wireframing, prototyping, and UI design. Experienced in designing user-centered digital experiences using Figma and translating research insights into simple, intuitive interfaces.",
  summarySecondary:
    "I currently work on projects spanning travel, culture, transportation, and accommodation — each one starting with real user problems and ending in an interface that gets out of the way.",
  /**
   * Cut-out photo shown in the hero. Generate it from the original with
   * `node scripts/prepare-photo.mjs "<photo.png>"`.
   */
  photo: "/images/profile.png",
  resume: "/Dev-Parmar-Resume.pdf",
};

/* -------------------------------------------------------------------------- */
/* CONTACT + SOCIAL                                                            */
/* -------------------------------------------------------------------------- */

export const contact = {
  email: "devparmar3030@gmail.com",
  phone: "+91 91577 37101",
  phoneHref: "+919157737101",
};

/**
 * `url: ""` hides the icon entirely. GitHub and Behance were not on the
 * resume — paste your profile URLs in and they will show up everywhere
 * (hero, contact, footer) at once.
 */
export const socials = [
  { id: "github", label: "GitHub", url: "" }, // TODO: add your GitHub profile URL
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/devparmar17/",
  },
  { id: "behance", label: "Behance", url: "" }, // TODO: add your Behance profile URL
  { id: "email", label: "Email", url: `mailto:${contact.email}` },
];

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* -------------------------------------------------------------------------- */
/* ABOUT — the icon tile grid                                                  */
/* -------------------------------------------------------------------------- */

export const aboutHeading = {
  lineOne: "Designing with",
  lineTwo: "Empathy & Clarity.",
};

/** `icon` maps to a glyph in components/ui/TechIcon.jsx */
export const coreTools = [
  { name: "Figma", icon: "figma" },
  { name: "User Research", icon: "research" },
  { name: "Wireframing", icon: "wireframe" },
  { name: "Prototyping", icon: "prototype" },
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Python", icon: "python" },
  { name: "VS Code", icon: "vscode" },
  { name: "Visual Studio", icon: "visualstudio" },
  { name: "Claude", icon: "claude" },
  { name: "Google Gemini", icon: "gemini" },
];

/**
 * The skills that pass through the hero bubble above Dev's photo, one at a time.
 *
 * Every skill listed anywhere in the portfolio appears here exactly once.
 * `mode` sets what the hero shows while that stage's skills appear: "think"
 * (Thinking, with design doodles) for research and design, "build"
 * (Computing, with code panels) for code and tooling. `icon` maps to a glyph
 * in components/ui/TechIcon.jsx, and its brand colour tints the scene.
 */
export const workflow = [
  {
    id: "think",
    label: "Think",
    verb: "I think",
    mode: "think",
    caption: "Understanding people before pixels.",
    skills: [
      { name: "User Research", icon: "research" },
      { name: "Usability Testing", icon: "usability" },
      { name: "User Flows", icon: "flow" },
    ],
  },
  {
    id: "design",
    label: "Design",
    verb: "I design",
    mode: "think",
    caption: "Shaping ideas into interfaces.",
    skills: [
      { name: "Wireframing", icon: "wireframe" },
      { name: "Prototyping", icon: "prototype" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    id: "code",
    label: "Code",
    verb: "I code",
    mode: "build",
    caption: "Turning designs into working code.",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "C++", icon: "cpp" },
    ],
  },
  {
    id: "build",
    label: "Build",
    verb: "I build",
    mode: "build",
    caption: "Shipping with modern tools and AI.",
    skills: [
      { name: "VS Code", icon: "vscode" },
      { name: "Visual Studio", icon: "visualstudio" },
      { name: "Claude", icon: "claude" },
      { name: "Google Gemini", icon: "gemini" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* SKILLS — grouped exactly as on the resume, plus AI tooling                  */
/* -------------------------------------------------------------------------- */

/**
 * `itemIcons` is optional — where an item has a glyph, the badge shows it and
 * picks up that brand's hover colour.
 */
export const skillGroups = [
  {
    title: "UX Design",
    icon: "prototype",
    description: "Research-led process, from first interview to final flow.",
    items: [
      "User Research",
      "User Flows",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
    ],
    itemIcons: {
      "User Research": "research",
      Wireframing: "wireframe",
      Prototyping: "prototype",
    },
  },
  {
    title: "Frontend",
    icon: "html",
    description: "Translating designs into responsive, accessible markup.",
    items: ["HTML", "CSS", "JavaScript"],
    itemIcons: { HTML: "html", CSS: "css", JavaScript: "javascript" },
  },
  {
    title: "Programming",
    icon: "python",
    description: "An engineering foundation behind the design work.",
    items: ["Python", "C++", "JavaScript"],
    itemIcons: { Python: "python", "C++": "cpp", JavaScript: "javascript" },
  },
  {
    title: "Tools",
    icon: "figma",
    description: "The day-to-day toolkit for design and build.",
    items: ["Figma", "VS Code", "Visual Studio"],
    itemIcons: {
      Figma: "figma",
      "VS Code": "vscode",
      "Visual Studio": "visualstudio",
    },
  },
  {
    title: "AI Tools",
    icon: "claude",
    description: "AI woven into research, synthesis, and day-to-day build work.",
    items: ["Claude", "Google Gemini"],
    itemIcons: { Claude: "claude", "Google Gemini": "gemini" },
  },
];

/* -------------------------------------------------------------------------- */
/* EXPERIENCE                                                                  */
/* -------------------------------------------------------------------------- */

export const experience = [
  {
    role: "UI/UX & Web Development Intern",
    company: "WR Team",
    location: "Bhuj-Kutch, India",
    period: "January 2025 — June 2025",
    description:
      "Designed and built responsive web interfaces, pairing UI/UX principles with hands-on frontend development.",
    points: [
      "Designed responsive web interfaces using HTML, CSS, and JavaScript, creating user-focused layouts with an emphasis on usability, responsiveness, and visual consistency.",
      "Applied core UI/UX principles and responsive design practices to improve website interfaces and deliver better user experiences.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
  },
];

/* -------------------------------------------------------------------------- */
/* PROJECTS                                                                    */
/* -------------------------------------------------------------------------- */

export const projectFilters = ["All", "Live Apps", "Case Studies"];

/**
 * Project shape
 * -------------
 * `type`        "live" for a working application, "case-study" for UX/design
 *               work. Drives the call to action — nothing else.
 * `liveUrl`     Real, working URL only. Blank hides the "Live App" button.
 * `behanceUrl`  Real Behance gallery URL. When present, "View Case Study ↗"
 *               opens it; when blank, that button opens the in-site detail
 *               view instead.
 * `cover`       Card artwork. Blank falls back to the blueprint plate.
 * `full`        Full case-study board shown inside the detail view.
 * `stages`      Process stages listed in the detail view.
 * `description` Optional. Left blank where the real copy isn't known yet —
 *               the card simply omits the paragraph.
 *
 * There is deliberately no `github` field — repository links are not shown
 * anywhere in this portfolio.
 *
 * ---------------------------------------------------------------------------
 * ADDING A PROJECT — copy this block, fill in what you know, delete the rest.
 * Only `slug`, `title`, `type` and `icon` are required.
 * ---------------------------------------------------------------------------
 *
 *   {
 *     slug: "unique-kebab-case-id",
 *     title: "Project Name",
 *     subtitle: "Short descriptor",
 *     type: "case-study",              // or "live"
 *     role: "UX Research / UI Design",
 *     category: "UX Research • Case Study",
 *     featured: false,
 *     status: "",                      // e.g. "Ongoing"
 *     icon: "home",                    // a key from components/ui/TechIcon.jsx
 *     cover: "",                       // "/images/projects/name-cover.webp"
 *     full: "",                        // "/images/projects/name-full.jpg"
 *     fullWidth: 1400,
 *     fullHeight: 0,
 *     fullAlt: "",
 *     description: "",
 *     points: [],
 *     stages: [],
 *     tech: [],
 *     liveUrl: "",
 *     behanceUrl: "https://www.behance.net/gallery/...",
 *   },
 *
 * Available icon keys: home, bus, map, coffee, play, shoe, figma, research,
 * wireframe, prototype, html, css, javascript, python, cpp, vscode,
 * visualstudio, git, react, nextjs, tailwind, framer, lucide, claude, gemini.
 */
export const projects = [
  {
    slug: "apna-pg",
    title: "Apna PG",
    subtitle: "PG-Finding Platform",
    type: "live",
    role: "Working Product / Live Application",
    category: "UX Research • Product Design • Live App",
    featured: true,
    status: "",
    icon: "home",
    cover: "",
    full: "",
    description:
      "A transparent way to find paying-guest accommodation. I ran user research to surface the real pain points in the PG search process, then designed flows around verified listings, honest reviews, and clear cost breakdowns.",
    points: [
      "Conducted user research and identified key pain points in the PG (paying-guest) accommodation search process.",
      "Created user flows and wireframes for a transparent PG-finding solution featuring verified listings, reviews, and cost breakdowns.",
    ],
    stages: ["User Research", "Pain Points", "User Flows", "Wireframes", "UI"],
    tech: ["User Research", "User Flows", "Wireframing", "Figma"],
    contribution: "Research · Flows · Wireframes",
    liveUrl: "https://pg-finder-booking.vercel.app/",
    behanceUrl:
      "https://www.behance.net/gallery/255609371/APNA-PG-UIUX-Case-Study",
  },
  {
    slug: "nescafe-campus-canteen-kiosk",
    title: "Nescafé",
    subtitle: "Redesigning the Nescafé Campus Experience",
    type: "case-study",
    role: "UX Research / UX Design",
    category: "UX Research • UI/UX Design • Case Study",
    featured: true,
    status: "",
    icon: "coffee",
    // Blank so the vector cover art renders. Point this at a screenshot
    // (e.g. "/images/projects/nescafe-cover.webp") to override it.
    cover: "",
    full: "/images/projects/nescafe-full.jpg",
    // Dimensions of the optimised board, produced by
    // `node scripts/prepare-case-studies.mjs`.
    fullWidth: 1400,
    fullHeight: 29552,
    fullAlt:
      "NESCAFÉ Campus Canteen Kiosk case study board — problem framing, observations, user personas, comparison tables, service blueprint, user flow, wireframes and final UI screens.",
    description:
      "A self-service kiosk concept for a campus canteen, worked end to end — from framing the problem and observing real ordering behaviour through to a complete set of UI screens.",
    points: [
      "Framed the problem around campus canteen ordering and captured first-hand observations of how people queue and order.",
      "Built user personas and comparison tables, then mapped the experience as a service blueprint and user flow.",
      "Translated the flow into wireframes and a final kiosk UI.",
    ],
    stages: [
      "Problem Framing",
      "Observations",
      "User Personas",
      "Comparison Tables",
      "Service Blueprint",
      "User Flow",
      "Wireframes",
      "Final UI",
    ],
    tech: [
      "User Research",
      "Personas",
      "Service Blueprint",
      "User Flows",
      "Wireframing",
      "UI Design",
      "Figma",
    ],
    contribution: "Research · UX · UI",
    liveUrl: "",
    behanceUrl:
      "https://www.behance.net/gallery/252366823/Redesigning-the-Nescaf-Campus-Experience",
  },
  {
    slug: "competitive-app-analysis-10-laws-of-ux",
    title: "Competitive App Analysis — 10 Laws of UX",
    subtitle: "Streaming Apps Compared",
    type: "case-study",
    role: "UX Research / Competitive Analysis",
    category: "UX Research • Competitive Analysis • 10 Laws of UX",
    featured: true,
    status: "",
    icon: "play",
    cover: "",
    full: "/images/projects/ux-laws-full.jpg",
    fullWidth: 1400,
    fullHeight: 16513,
    fullAlt:
      "Competitive app analysis board comparing JioHotstar, SonyLIV and Netflix screen by screen against each of the 10 Laws of UX.",
    description:
      "A screen-by-screen teardown of three streaming apps — JioHotstar, SonyLIV and Netflix — measured against each of the 10 Laws of UX, with side-by-side UI comparisons and the observations behind each verdict.",
    points: [
      "Compared JioHotstar, SonyLIV and Netflix interface by interface across ten established UX principles.",
      "Documented how each app applies — or misses — each law, supported by annotated screen comparisons.",
    ],
    stagesLabel: "The 10 Laws analysed",
    stages: [
      "Fitts's Law",
      "Miller's Law",
      "Jakob's Law",
      "Hick's Law",
      "Tesler's Law",
      "Doherty Threshold",
      "Weber's Law",
      "Von Restorff Effect",
      "Peak-End Rule",
      "Aesthetic-Usability Effect",
    ],
    tech: [
      "Competitive Analysis",
      "Heuristic Evaluation",
      "UX Principles",
      "UI Comparison",
      "Figma",
    ],
    contribution: "Research · Analysis",
    liveUrl: "",
    behanceUrl: "",
  },
  {
    slug: "kidd-safer-ride-for-kids",
    title: "Kid Cab Booking App",
    subtitle: "A Safer Ride for Kids",
    type: "case-study",
    role: "UX/UI Design",
    category: "UX Research • UI/UX Design • Case Study",
    featured: false,
    status: "",
    icon: "bus",
    cover: "",
    full: "",
    description:
      "A booking app built around one question: can a parent trust this ride? Live tracking and driver verification sit at the centre of the experience, keeping the interface calm and the safety signals loud.",
    points: [
      "Designed and developed a safe, user-friendly kids transportation app centered on secure travel.",
      "Built features for live tracking and driver verification to increase parent trust and safety.",
    ],
    stages: ["Concept", "UI Design", "Prototyping", "Build"],
    tech: ["UI Design", "Prototyping", "Figma", "Frontend"],
    contribution: "Design · Prototype · Build",
    liveUrl: "",
    behanceUrl:
      "https://www.behance.net/gallery/254733255/A-Safer-Ride-for-Kids-UXUI-Case-Study",
  },
  {
    slug: "campus-shoes-marketing-campaign",
    title: "Campus Shoes",
    subtitle: "Marketing Campaign",
    type: "case-study",
    role: "Marketing Campaign",
    category: "Marketing Campaign",
    featured: false,
    status: "",
    icon: "shoe",
    cover: "",
    full: "",
    // Left blank on purpose — the campaign copy wasn't supplied, and the
    // Behance gallery is the real content. Fill these in any time.
    description: "",
    points: [],
    stages: [],
    tech: [],
    contribution: "",
    liveUrl: "",
    behanceUrl:
      "https://www.behance.net/gallery/252861599/Campus-Shoes-Campus-Shoes-Marketing-Campaign",
  },
  {
    slug: "history-and-culture-map",
    title: "History & Culture Map",
    subtitle: "Heritage Travel App",
    type: "case-study",
    role: "UX Research / UX Design",
    category: "UX Design • Travel • Ongoing",
    featured: false,
    status: "Ongoing",
    icon: "map",
    cover: "",
    full: "",
    description:
      "A map-based travel app that folds navigation, historical context, and nearby heritage sites into one exploratory journey — so discovering a place and understanding it happen in the same gesture.",
    points: [
      "Designing a map-based travel app combining navigation, historical information, and nearby heritage sites.",
      "Integrating cultural discovery features into one seamless, exploratory user experience.",
    ],
    stages: ["Research", "User Flows", "Prototyping"],
    tech: ["UX Design", "User Flows", "Prototyping", "Figma"],
    contribution: "Research · UX · UI",
    liveUrl: "",
    behanceUrl: "",
  },
];

/* -------------------------------------------------------------------------- */
/* EDUCATION                                                                   */
/* -------------------------------------------------------------------------- */

/** `location` was not on the resume — fill it in and it will render. */
export const education = [
  {
    degree: "Master of Design (M.Des)",
    institution: "Indus University",
    location: "", // TODO: add campus location if you want it shown
    period: "2026 — 2027",
    score: "CGPA 9.17",
    current: true,
    note: "Design research, interaction design, and product thinking.",
  },
  {
    degree: "Bachelor of Technology, Computer Engineering",
    institution: "Marwadi University",
    location: "", // TODO: add campus location if you want it shown
    period: "2025",
    score: "CGPA 5.33",
    current: false,
    note: "The engineering foundation behind how I approach design problems.",
  },
];

/* -------------------------------------------------------------------------- */
/* CERTIFICATIONS                                                              */
/* -------------------------------------------------------------------------- */

/**
 * `date` and `url` were not on the resume. Leave blank to hide the
 * "Issued …" line and the "Verify" link respectively.
 * `brand` keys into lib/brandColors.js for the hover colour.
 */
export const certifications = [
  {
    title: "Google UX Design",
    issuer: "Google",
    brand: "google",
    monogram: "GOOG",
    date: "",
    url: "",
  },
  {
    title: "IBM UI/UX Designer",
    issuer: "IBM",
    brand: "ibm",
    monogram: "IBM",
    date: "",
    url: "",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    brand: "google",
    monogram: "GOOG",
    date: "",
    url: "",
  },
  {
    title: "Google Prompting Essentials",
    issuer: "Google",
    brand: "google",
    monogram: "GOOG",
    date: "",
    url: "",
  },
  {
    title: "Programming for Everybody (Python)",
    issuer: "University of Michigan (Coursera)",
    brand: "coursera",
    monogram: "UMICH",
    date: "",
    url: "",
  },
];

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

export const footerTagline =
  "UI/UX Designer & Frontend Developer building user-centered digital experiences.";
