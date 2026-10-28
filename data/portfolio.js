/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * Every section of the site reads from this file. Edit here - never in the
 * components - and the whole site updates.
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
    "UI/UX Designer and M.Des student with a Computer Engineering background. I turn user research into simple, intuitive interfaces - from user flows and wireframes through to polished, responsive UI.",
  /** Full professional summary, used in the About section and SEO description. */
  summary:
    "UI/UX Designer and M.Des student with a Computer Engineering background, skilled in user research, user flows, wireframing, prototyping, and UI design. Experienced in designing user-centered digital experiences using Figma and translating research insights into simple, intuitive interfaces.",
  summarySecondary:
    "I currently work on projects spanning travel, culture, transportation, and accommodation - each one starting with real user problems and ending in an interface that gets out of the way.",
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
 * resume - paste your profile URLs in and they will show up everywhere
 * (hero, contact, footer) at once.
 */
export const socials = [
  { id: "github", label: "GitHub", url: "" }, // TODO: add your GitHub profile URL
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/devparmar17/",
  },
  {
    id: "behance",
    label: "Behance",
    url: "https://www.behance.net/devparmar28",
  },
  { id: "email", label: "Email", url: `mailto:${contact.email}` },
];

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* -------------------------------------------------------------------------- */
/* ABOUT - the icon tile grid                                                  */
/* -------------------------------------------------------------------------- */

export const aboutHeading = {
  lineOne: "Designing with",
  lineTwo: "Empathy & Clarity.",
};

/** `icon` maps to a glyph in components/ui/TechIcon.jsx */
export const coreTools = [
  { name: "User Research", icon: "research" },
  { name: "User Flows", icon: "flow" },
  { name: "Wireframing", icon: "wireframe" },
  { name: "Prototyping", icon: "prototype" },
  { name: "Usability Testing", icon: "usability" },
  { name: "Figma", icon: "figma" },
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "JavaScript", icon: "javascript" },
  { name: "VS Code", icon: "vscode" },
  { name: "Claude", icon: "claude" },
  { name: "Vibe Coding", icon: "vibe" },
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
      { name: "Vibe Coding", icon: "vibe" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* SKILLS - grouped exactly as on the resume, plus AI tooling                  */
/* -------------------------------------------------------------------------- */

/**
 * `itemIcons` is optional - where an item has a glyph, the badge shows it and
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
    description:
      "AI woven into research, synthesis, and day-to-day build work.",
    items: ["Claude", "Vibe Coding"],
    itemIcons: { Claude: "claude", "Vibe Coding": "vibe" },
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
    period: "January 2025 - June 2025",
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

export const projectFilters = ["All", "MVP Apps", "Case Studies"];

/**
 * Project shape
 * -------------
 * `type`        "live" for a working application, "case-study" for UX/design
 *               work. Drives the call to action - nothing else.
 * `liveUrl`     Real, working URL only. Blank hides the "MVP App" button.
 * `behanceUrl`  Real Behance gallery URL. When present, "View Case Study ↗"
 *               opens it; when blank, that button opens the in-site detail
 *               view instead.
 * `cover`       Card artwork. Blank falls back to the blueprint plate.
 * `full`        Full case-study board shown inside the detail view.
 * `stages`      Process stages listed in the detail view.
 * `description` Optional. Left blank where the real copy isn't known yet -
 *               the card simply omits the paragraph.
 *
 * There is deliberately no `github` field - repository links are not shown
 * anywhere in this portfolio.
 *
 * ---------------------------------------------------------------------------
 * ADDING A PROJECT - copy this block, fill in what you know, delete the rest.
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
 * visualstudio, git, react, nextjs, tailwind, framer, lucide, claude, vibe.
 */
export const projects = [
  {
    slug: "virasa-heritage-ai",
    title: "Virasa",
    subtitle: "Heritage AI",
    type: "live",
    role: "UX Research / UI Design",
    timeline: "3 months",
    category: "UX Research • Product Design • MVP App",
    featured: true,
    status: "",
    icon: "map",
    cover: "",
    description:
      "A heritage guide for Indian cities, built on the finding that travellers juggle Google Maps, Search, YouTube and Instagram to understand one place. Thirty-four screens carry someone from discovery to an audio story, an AI guide and a walking route, in one app.",
    points: [
      "Ran a fifteen-question bilingual survey, then built affinity maps, two personas, empathy maps and a six-stage journey map to locate where the travel experience actually breaks.",
      "Plotted every idea on an impact-effort matrix and shipped the high-impact, low-effort end first: nearby discovery, short histories and audio stories ahead of AR and VR.",
      "Designed and built a working 34-screen prototype, starting with Ahmedabad's old city and opening out to Jaipur, Varanasi, Hampi and Kolkata.",
    ],
    stagesLabel: "Screens in the flow",
    stages: [
      "UI foundations",
      "Welcome & personalise",
      "Home & search",
      "Map navigation",
      "Place detail",
      "Audio story",
      "AI Lens",
      "Heritage walk",
      "AR time travel",
      "Play & learn",
      "Heritage passport",
      "Saved & offline",
    ],
    tech: [
      "User Research",
      "Affinity Mapping",
      "Journey Mapping",
      "Figma",
      "Prototyping",
    ],
    contribution: "Research · Flows · UI · Prototype",
    /**
     * From the MAP research board and the live prototype. The problem
     * statement, design opportunity, nine insights, both personas and the
     * six-stage journey map are the board's own.
     */
    caseStudy: {
      overview: {
        goal: "Put navigation, nearby discovery, history and culture in one place, so understanding where you are standing does not require four apps.",
        role: "UX Research / UI Design",
        timeline: "3 months",
        tools: [
          "Figma",
          "FigJam",
          "Survey",
          "Affinity Mapping",
          "Empathy Mapping",
          "Journey Mapping",
        ],
      },
      chapters: [
        {
          kind: "problem",
          label: "The Problem",
          title: "The story of a place is scattered across four apps",
          body: "Travellers who want to explore historical and cultural places struggle to discover, navigate, and understand them because information is scattered across multiple apps such as Google Maps, Google Search, YouTube, and Instagram. This makes trip planning time-consuming and cultural information difficult to access while traveling.",
        },
        {
          kind: "quote",
          label: "The Design Opportunity",
          quote:
            "How might we create a simple, location-based travel experience that helps travellers discover hidden cultural places, navigate to them, and learn their history through short, engaging, and personalized content - all in one app?",
          tags: [
            "Survey",
            "Affinity Mapping",
            "Personas",
            "Journey Map",
            "Impact / Effort",
          ],
        },
        {
          kind: "personas",
          label: "Who It Is For",
          title: "The young explorer and the cultural traveller",
          personas: [
            {
              name: "Darshan Shah",
              role: "23 - student in Ahmedabad, weekend trips with friends",
              meta: "High tech confidence - explores independently",
              pains: [
                "Switching between many apps is frustrating",
                "Historical information is often too long and difficult to understand",
                "It is difficult to imagine how a place looked in the past",
                "Hidden historical places are difficult to discover",
                "YouTube has too much information, making the right video hard to find",
              ],
              needs: [
                "One app for travel, history and culture",
                "Short and simple historical stories",
                "A past versus present view of the same place",
                "An AI guide that explains through conversation",
                "Audio stories for hands-free learning while walking",
                "Games, quizzes and badges at historical locations",
              ],
            },
            {
              name: "Amit Patel",
              role: "35 - Vadodara, travels with his family",
              meta: "Limited vacation time, so the trip has to be planned",
              pains: [
                "Information is spread across different platforms",
                "It takes time to compare different places",
                "Historical information is sometimes too detailed",
                "Local transportation can be confusing",
                "Authentic food recommendations are difficult to trust",
              ],
              needs: [
                "Complete trip planning in one place",
                "Family-friendly recommendations",
                "Easy historical and cultural information",
                "Reliable local food suggestions",
                "Simple transportation guidance",
              ],
            },
          ],
        },
        {
          kind: "solution",
          label: "The Solution",
          title: "One place that answers where, how and why",
          body: "Every insight pointed at the same gap: people do not lack information, they lack it in one place, in a form short enough to read while standing in front of the thing it describes.",
          bullets: [
            "Smart navigation to the site, then short histories once you arrive",
            "An audio tour that starts narrating on arrival, hands-free",
            "An AI guide that answers questions in conversation, in multiple languages",
            "Nearby and hidden-place discovery, so nothing is missed by accident",
            "Offline maps and content, because connectivity fails at the sites themselves",
          ],
        },
      ],
      insights: [
        {
          title: "Too many apps and platforms",
          body: "Maps for navigation, Google for history, YouTube for video. Switching between them makes the experience confusing and time-consuming.",
        },
        {
          title: "Missing nearby places",
          body: "People do not know what is close by, so they miss historical and cultural attractions they would have wanted to see.",
        },
        {
          title: "Personalised trip planning",
          body: "Interests, budgets and available time differ, so general plans do not fit. People save places on Maps, take screenshots and write notes by hand.",
        },
        {
          title: "Easy historical information",
          body: "History arrives as long articles or information boards. Attention is lost when it is too long or complicated.",
        },
        {
          title: "Interest in AI and AR",
          body: "People find AI guides and AR experiences engaging, and want to ask questions rather than read.",
        },
        {
          title: "Language problems",
          body: "Local languages, signs and historical information can be unreadable. Translation apps and asking local people are the current workarounds.",
        },
        {
          title: "Poor internet connection",
          body: "Connectivity is weak at many heritage sites, so maps and guides have to work offline.",
        },
      ],
      journey: {
        label: "From first curiosity to a saved memory",
        stages: [
          {
            stage: "Discover",
            feeling: "Curious - looking for what is nearby",
            pain: "Hidden places are difficult to find",
            opportunity: "Nearby and hidden-place discovery",
          },
          {
            stage: "Plan",
            feeling: "Excited - building a trip",
            pain: "Planning takes time",
            opportunity: "Personalised itinerary",
          },
          {
            stage: "Explore",
            feeling: "Slightly confused - on the way there",
            pain: "Navigation and transport can be confusing",
            opportunity: "Simple landmark-based navigation",
          },
          {
            stage: "Learn",
            feeling: "Interested - standing in front of it",
            pain: "Information can be too long",
            opportunity: "Short, simple storytelling",
          },
          {
            stage: "Experience",
            feeling: "Engaged - history becomes interesting",
            pain: "Few interactive experiences",
            opportunity: "AI, AR, games and quizzes",
          },
          {
            stage: "Complete",
            feeling: "Satisfied - wanting to remember it",
            pain: "Information ends up scattered again",
            opportunity: "Saved trips, badges and photos",
          },
        ],
      },
      features: [
        {
          title: "Smart navigation",
          body: "Routes to historical and cultural sites, planned around the places rather than only the roads.",
        },
        {
          title: "Audio tour guide",
          body: "Narration starts automatically on arrival, available in multiple languages, so the phone can stay in a pocket.",
        },
        {
          title: "AI tour guide",
          body: "Answers questions about the landmark in front of you, recommends nearby places, and adapts the explanation for adults, children or enthusiasts.",
        },
        {
          title: "AI Lens and AR",
          body: "Point the camera at a monument to read it, and see how the same place looked at another point in its history.",
        },
        {
          title: "Play and learn",
          body: "Quizzes, games and a heritage passport, so a visit leaves something behind besides photographs.",
        },
        {
          title: "Offline content",
          body: "Maps and guides saved for the sites where the signal gives out.",
        },
      ],
      outcome: {
        decisions: [
          "Build the high-impact, low-effort corner of the matrix first - nearby discovery, short histories and audio - and treat VR and 3D as later work.",
          "Lead with one city in depth rather than many thinly, so Ahmedabad's old city carries the first release.",
          "Set place names in their own scripts, with Noto Sans for Devanagari, Gujarati, Tamil and Bengali alongside the Latin type.",
        ],
        impact: [
          "One app covering navigation, history and discovery should remove the app-switching the research found at the centre of the problem.",
          "Audio narration on arrival should let people look at the place rather than at a screen.",
          "Offline content should hold up at the sites where connectivity does not.",
        ],
        learnings: [
          "People did not ask for more information. They asked for less of it, at the right moment.",
          "The impact-effort matrix settled arguments that discussion could not - AR was wanted by everyone and affordable by no one, so it waited.",
        ],
      },
    },
    liveUrl: "https://virasa-puce.vercel.app/",
    behanceUrl: "",
  },
  {
    slug: "unigo-campus-carpool",
    title: "UniGo",
    subtitle: "Campus Carpooling",
    type: "live",
    role: "UX Research / UI Design",
    timeline: "3 months",
    category: "UX Research • Product Design • MVP App",
    featured: true,
    status: "",
    icon: "bus",
    cover: "",
    description:
      "Carpooling closed to one campus. UniGo connects Indus University students, faculty and staff who already travel the same roads at the same times, using the university's own email domain as the door that keeps strangers out.",
    points: [
      "Researched the commute from the driver's side - a faculty member making the same trip five or six days a week with empty seats - through an empathy map and a six-stage journey map.",
      "Turned the trust problem into the product's first screen: sign-in is gated to @indusuni.ac.in, with a six-digit emailed code or an enrolment / employee ID as the second route in.",
      "Mapped the full task flow from publishing a ride through pickup, cost split and rating, then built it as a working prototype.",
    ],
    stagesLabel: "Flow",
    stages: [
      "Verify with university ID",
      "Offer or find a ride",
      "Route matching",
      "Confirm pickup",
      "Live trip",
      "Cost split & rating",
    ],
    tech: [
      "User Research",
      "Empathy Mapping",
      "Journey Mapping",
      "Figma",
      "Prototyping",
    ],
    contribution: "Research · Flows · UI · Prototype",
    /**
     * From the college car-pooling research board and the live prototype.
     * The problem statement, persona, empathy map, journey map and feature
     * table are the board's own. The affinity-mapping sections of that board
     * carry stickies from several named contributors.
     */
    caseStudy: {
      overview: {
        goal: "Let people who already share a route and a timetable share the car, without either side having to trust a stranger.",
        role: "UX Research / UI Design",
        timeline: "3 months",
        tools: [
          "Figma",
          "FigJam",
          "Affinity Mapping",
          "Empathy Mapping",
          "Journey Mapping",
          "Task Flow",
        ],
      },
      chapters: [
        {
          kind: "problem",
          label: "The Problem",
          title: "The seats are empty and nobody can find each other",
          body: "University students, faculty, staff, and other members often face difficulties finding people who travel on the same or nearby routes. Since there is no dedicated platform to connect university members who have a vehicle and are willing to share a ride, people may spend more money on transportation, travel alone, or face difficulties finding convenient transport.",
        },
        {
          kind: "quote",
          label: "What The Driver Said",
          quote:
            "I drive to campus every day anyway - why not share the empty seats? I only want to ride with people from our university. I can't take long detours to pick someone up.",
          tags: [
            "Affinity Mapping",
            "Empathy Map",
            "Persona",
            "Journey Map",
            "Task Flow",
          ],
        },
        {
          kind: "personas",
          label: "Who It Is For",
          title: "The driver with three empty seats",
          personas: [
            {
              name: "Ketan Mehta",
              role: "38 - faculty member, drives ISKCON Cross Road to the university",
              meta: "5-6 days a week - ride provider",
              pains: [
                "Uncomfortable letting strangers into his car",
                "Frustrated when riders are late or cancel at the last minute",
                "Stressed about reaching class late because of pickups",
                "Awkward asking students to share costs",
                "Cannot take long detours to collect someone",
              ],
              needs: [
                "Verified passengers from his own university",
                "Routes and timings that match his, not approximately",
                "A cost split that happens without him having to ask",
                "To know how many minutes a pickup adds before agreeing to it",
                "Reliability, so the same people can travel together repeatedly",
              ],
            },
          ],
        },
        {
          kind: "solution",
          label: "The Solution",
          title: "Verify first, then match on route and timetable",
          body: "Every pain point in the journey map resolves to the same two questions: is this person really from my university, and are they really going my way? The product answers both before anyone gets in a car.",
          bullets: [
            "College ID verification - only a valid university email or ID gets in",
            "Route matching for overlapping journeys, not identical pickup points",
            "Class-timetable matching, so rides are suggested around lectures",
            "A daily routine set once instead of a ride posted every morning",
            "Automatic fuel and fare splitting, so nobody has to ask",
          ],
        },
      ],
      journey: {
        label: "From empty seats to a daily routine",
        stages: [
          {
            stage: "Need a Ride Partner",
            feeling: "Interested but unsure",
            pain: "Does not want strangers in his car",
            opportunity: "Show the benefits of carpooling",
          },
          {
            stage: "Search for Partner",
            feeling: "Curious",
            pain: "Difficult to find people with the same route and timing",
            opportunity: "Match users on route and timing",
          },
          {
            stage: "Check & Compare",
            feeling: "Concerned",
            pain: "Lack of trust and unclear passenger information",
            opportunity: "Verified profiles and clear user information",
          },
          {
            stage: "Confirm Ride",
            feeling: "Relieved",
            pain: "Fear of cancellation or late arrival",
            opportunity: "Confirmation, reminders and a cancellation policy",
          },
          {
            stage: "Daily Travel",
            feeling: "Comfortable",
            pain: "Route changes, delays or pickup confusion",
            opportunity: "Live location, a clear pickup point, easy contact",
          },
          {
            stage: "After the Ride",
            feeling: "Satisfied",
            pain: "Repeatedly finding reliable passengers is difficult",
            opportunity: "Ratings, repeat carpools and trusted-user features",
          },
        ],
      },
      features: [
        {
          title: "College ID verification",
          body: "Only students, faculty and staff with a valid college email or ID can join.",
        },
        {
          title: "Route matching",
          body: "Matches people whose routes overlap, instead of requiring the exact same pickup location.",
        },
        {
          title: "Class-timetable matching",
          body: "Riders enter their college schedule and the app suggests rides around their class and work timings.",
        },
        {
          title: "Daily ride routine",
          body: "Set a standing trip once rather than creating the same ride every morning.",
        },
        {
          title: "Pickup along my route",
          body: "The driver sees whether a pickup needs a detour, and how many extra minutes it costs, before accepting.",
        },
        {
          title: "Campus safety and SOS",
          body: "During an active ride, either side can reach a trusted contact or campus security quickly.",
        },
        {
          title: "Women-preferred pool",
          body: "Women can choose to see and request rides with women from the college community.",
        },
        {
          title: "Fuel and fare split",
          body: "The cost is divided automatically at the end of the ride, so nobody has to raise it.",
        },
      ],
      outcome: {
        decisions: [
          "Make verification the first screen rather than a setting, because distrust was the pain point blocking every later stage.",
          "Match on overlapping corridors instead of identical pickup points, since the driver's hard limit was the length of the detour.",
          "Automate the cost split, because the research found asking for money was socially awkward rather than financially difficult.",
        ],
        impact: [
          "A closed campus pool should remove the stranger problem that stops drivers offering seats at all.",
          "Timetable-aware matching should turn a one-off ride into a standing arrangement.",
          "Automatic splitting should keep the money conversation out of a daily shared commute.",
        ],
        learnings: [
          "The blocker was never the seats. It was that neither side could tell who the other person was.",
          "Designing from the driver's side first surfaced constraints - detour length, lecture times, the awkwardness of asking for fuel money - that a rider-first view would have missed.",
        ],
      },
    },
    liveUrl: "https://indusunigo.vercel.app/",
    behanceUrl: "",
  },
  {
    slug: "nescafe-campus-canteen-kiosk",
    title: "Nescafé",
    subtitle: "Redesigning the Nescafé Campus Experience",
    type: "case-study",
    role: "UX Research / UX Design",
    timeline: "3 months",
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
      "NESCAFÉ Campus Canteen Kiosk case study board - problem framing, observations, user personas, comparison tables, service blueprint, user flow, wireframes and final UI screens.",
    description:
      "A self-service kiosk concept for a campus canteen, worked end to end - from framing the problem and observing real ordering behaviour through to a complete set of UI screens.",
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
    /**
     * Condensed walkthrough shown by the animated case-study view. Every
     * string here is taken from the board itself - problem statement,
     * observation quote, interview findings and both personas are verbatim.
     * Nothing is written for the portfolio.
     */
    caseStudy: {
      /**
       * Goal, role and tools come from the board and the project record.
       * `timeline` is deliberately null: the board does not state one, and a
       * case study is not the place to guess at dates.
       */
      overview: {
        goal: "Reduce peak-hour queues at a campus Nescafé by moving ordering and pickup onto a self-service kiosk.",
        role: "UX Research / UX Design",
        timeline: null,
        tools: ["Figma", "User Research", "Personas", "Service Blueprint"],
      },
      /** The four interview findings, in the board's own shorthand. */
      insights: [
        {
          label: "Lunch break",
          body: "The rush concentrates into the short break between classes.",
        },
        {
          label: "Order confusion",
          body: "Orders blur together when many customers order at once.",
        },
        {
          label: "Long queue",
          body: "Waiting during rush time is what irritates customers most.",
        },
        {
          label: "Out of stock",
          body: "Maggie, coffee and snacks run out with no warning on the menu.",
        },
      ],
      /**
       * The eight-stage journey as mapped on the board. (The board's two
       * tables carry swapped headings - these rows are the student's day,
       * so they are labelled by their content.)
       */
      journey: {
        label: "The student's journey",
        stages: [
          {
            stage: "Hunger Trigger",
            feeling: "Feeling hungry - should I go now or later?",
            pain: "Short break time",
            opportunity: "Live food-availability alerts at meal times",
          },
          {
            stage: "Decide to Eat",
            feeling: "Imagining the food; Nescafé is nearby",
            pain: "Confusion in choosing what to eat",
            opportunity: "Digital menu, combo offers, price comparison",
          },
          {
            stage: "Travel to Canteen",
            feeling: "Excited and rushed",
            pain: "Takes time to reach the canteen",
            opportunity: "Directional signage with estimated walking time",
          },
          {
            stage: "Arrive & Queue",
            feeling: "How long will I wait? What should I order?",
            pain: "No queue system, chaotic ordering",
            opportunity: "Token system, digital queue display, more counters",
          },
          {
            stage: "Place Order",
            feeling: "Uncertain - the item I wanted is unavailable",
            pain: "Unclear menu, staff miscommunication",
            opportunity: "QR ordering and a kiosk that shows real availability",
          },
          {
            stage: "Pay",
            feeling: "Relieved, now waiting",
            pain: "Limited seating, payment delays",
            opportunity:
              "Cashless fast payment, seating availability indicator",
          },
          {
            stage: "Wait for Food",
            feeling: "Impatient, checking phone",
            pain: "No order tracking, overcrowded and unclear pickup",
            opportunity:
              "Order tracking screen, notifications, separate waiting zone",
          },
          {
            stage: "Finish & Leave",
            feeling: "Satisfied but rushed",
            pain: "Overflowing dustbins, time pressure, cleanup inconvenience",
            opportunity:
              "Smart dustbin placement, loyalty points for repeat users",
          },
        ],
      },
      /** Drawn from the board's DFV (desirability / feasibility / viability). */
      features: [
        {
          title: "Digital token queue",
          body: "A token system with a display replaces the single service window.",
        },
        {
          title: "Digital menu board",
          body: "A clear menu speeds up decisions and shows what is actually available.",
        },
        {
          title: "Popular item tracking",
          body: "Surfacing popular items builds trust and improves stock planning.",
        },
        {
          title: "Loyalty & coupons",
          body: "Loyalty points and digital coupons bring repeat customers into slow hours.",
        },
        {
          title: "Inventory tracking",
          body: "Real-time stock reduces losses and prevents out-of-stock surprises.",
        },
      ],
      /**
       * Expectations the board itself argues for under viability - written as
       * expected impact, not measured results. No metrics are claimed.
       */
      outcome: {
        decisions: [
          "Start small: a digital menu plus a token system first.",
          "Design for both sides of the counter, not just the customer.",
          "Keep inventory visible so unavailable items never reach the order screen.",
        ],
        impact: [
          "A loyalty system should increase repeat customers.",
          "Digital coupons should lift sales in slow hours.",
          "Popular-item tracking should improve stock planning.",
          "Inventory tracking should reduce losses.",
        ],
        learnings: [
          "The queue is a service-design problem before it is an interface problem.",
          "The stall owner's pain points shaped the product as much as the student's.",
        ],
      },
      chapters: [
        {
          kind: "problem",
          label: "The Problem",
          title: "Peak-hour queues at the campus Nescafé",
          body: "Students experience long queues and overcrowding at Nescafé outlets during peak campus hours due to slow manual ordering, limited staff handling high demand, and inefficient service flow causing delays and frustration.",
        },
        {
          kind: "quote",
          label: "What I Observed",
          quote:
            "During class breaks, students gather at campus canteens, especially Nescafe, a popular social spot. Its prime location, Maggie, coffee, and shaded space attract groups. Easy menu access and interactive elements enhance experience. However, limited seating, single service window, and stock shortages affect convenience. It serves as a lively student hangout.",
          tags: [
            "Lunch break",
            "Order confusion",
            "Long queue",
            "Out of stock",
          ],
        },
        {
          kind: "personas",
          label: "Who It Is For",
          title: "Two sides of the same counter",
          personas: [
            {
              name: "Ramila Patel",
              role: "Stall owner - Nescafe Hut",
              meta: "Daily estimated ₹3,000 - ₹5,000",
              pains: [
                "Sudden crowd rush during lunch break",
                "No queue management system",
                "Order confusion when many customers order together",
                "UPI delays or payment confirmation issues",
                "Manual inventory checking and end-of-day sales counting",
              ],
              needs: [
                "Digital token system to manage queues",
                "Live order display screen",
                "Pre-order system to prepare items earlier",
                "Real-time inventory tracking",
                "Automatic payment confirmation",
              ],
            },
            {
              name: "Rahul Shah",
              role: "College student",
              meta: "Budget ₹100 per day",
              pains: [
                "Slow serving during rush hours",
                "Long queues at lunch time",
                "Order confusion when many people order",
                "Items often out of stock (Maggie, coffee, snacks)",
                "Limited space to wait",
              ],
              needs: [
                "Pre-order option to save time",
                "Token system with display",
                "Clear digital menu showing what is available",
                "Fast service during rush hours",
              ],
            },
          ],
        },
        {
          kind: "solution",
          label: "The Solution",
          title: "A self-service kiosk on both sides of the counter",
          body: "A smart self-service kiosk for a campus environment, designed to streamline ordering and pickup so the queue stops forming in the first place.",
          bullets: [
            "Digital token queue replaces the single service window",
            "Live order display so nobody has to ask what is ready",
            "Pre-ordering lets the stall start preparing before the break",
            "Real-time inventory hides what is out of stock before it is ordered",
            "Automatic payment confirmation removes the UPI wait",
          ],
        },
        {
          kind: "screens",
          label: "The Screens",
          title: "Ordering kiosk",
          shots: [
            {
              src: "/images/projects/nescafe-ui-order.webp",
              width: 1400,
              height: 700,
              alt: "Three kiosk ordering screens: coffee, sandwich and Maggie categories with a running order panel and total.",
              caption:
                "Browse by category, with the order and total always in view.",
            },
            {
              src: "/images/projects/nescafe-ui-pay.webp",
              width: 1400,
              height: 600,
              alt: "Kiosk checkout screens showing an itemised order, UPI and pay-at-counter options, and a QR confirmation.",
              caption:
                "Checkout: itemised order, UPI or pay at counter, QR to confirm.",
            },
            {
              src: "/images/projects/nescafe-ui-shop.webp",
              width: 1400,
              height: 1040,
              alt: "Shopkeeper app screens: live orders queue, sales dashboard with today's total and trend, and inventory management with stock toggles.",
              caption:
                "The stall side: live orders, a sales dashboard, and stock control.",
            },
          ],
        },
      ],
    },
    liveUrl: "",
    behanceUrl:
      "https://www.behance.net/gallery/252366823/Redesigning-the-Nescaf-Campus-Experience",
  },
  {
    slug: "apna-pg",
    title: "Apna PG",
    subtitle: "PG-Finding Platform",
    type: "live",
    role: "Working Product / Live Application",
    timeline: "3 months",
    category: "UX Research • Product Design • MVP App",
    featured: true,
    status: "",
    icon: "home",
    cover: "",
    full: "/images/projects/apna-pg-full.jpg",
    fullWidth: 785,
    fullHeight: 32768,
    fullAlt:
      "APNA PG case study board - project overview, problem statement, stakeholders, design process, timeline, secondary and primary research, personas, empathy map, journey map, card sorting, user flows, design system and final screens.",
    description:
      "A transparent way to find paying-guest accommodation. I ran user research to surface the real pain points in the PG search process, then designed flows around verified listings, honest reviews, and clear cost breakdowns.",
    points: [
      "Conducted user research and identified key pain points in the PG (paying-guest) accommodation search process.",
      "Created user flows and wireframes for a transparent PG-finding solution featuring verified listings, reviews, and cost breakdowns.",
    ],
    stages: ["User Research", "Pain Points", "User Flows", "Wireframes", "UI"],
    tech: ["User Research", "User Flows", "Wireframing", "Figma"],
    contribution: "Research · Flows · Wireframes",
    /**
     * Taken from the uploaded APNA PG board: the problem statement, the five
     * primary-research findings (percentages included), both personas, the
     * five-stage journey map and the final screens are all the board's own.
     */
    caseStudy: {
      overview: {
        goal: "Make finding a paying-guest room transparent: real listings, the full cost up front, and enough proof of the place to decide without a broker.",
        role: "UX Research / UI Design",
        timeline: "3 months",
        tools: [
          "Figma",
          "Surveys",
          "Interviews",
          "Empathy Mapping",
          "Wireframing",
        ],
      },
      chapters: [
        {
          kind: "problem",
          label: "The Problem",
          title: "Finding a PG in a new city is guesswork",
          body: "Finding a PG in a new state can be hard due to high rent, poor facilities, safety issues, hidden charges, and sharing problems with strangers who have different habits or food preferences.",
        },
        {
          kind: "quote",
          label: "What I Set Out To Do",
          quote:
            "Truly understanding the everyday struggles of students and professionals, like high rent, unhealthy food, and safety concerns, and creating solutions that directly ease those pain points.",
          tags: ["Discover", "Empathize", "Define", "Ideate", "Design & Test"],
        },
        {
          kind: "personas",
          label: "Who It Is For",
          title: "Two residents, two budgets",
          personas: [
            {
              name: "Avasar Savalia",
              role: "21 - lives in a 2-sharing PG near Bopal",
              meta: "Rent around Rs 14,000 - stayed 8 months",
              pains: [
                "Wrong rent information",
                "Lack of transparency about extra charges",
              ],
              needs: [
                "Furnished room",
                "Reliable Wi-Fi",
                "Strong security",
                "24/7 water supply",
                "Near to office",
              ],
            },
            {
              name: "Dhruvil",
              role: "20 - student, found his PG through brokers",
              meta: "Budget Rs 12,000 - Rs 15,000 a month",
              pains: [
                "Often spends more than the planned budget",
                "Meal timings were not informed clearly",
                "Food preferences not considered",
                "Hard to trust a PG without proper visuals or proof",
              ],
              needs: [
                "Clear PG options within budget range",
                "Offers and discounts to reduce cost",
                "Proper security system",
                "360 degree room tour to decide faster",
                "Nearby transport facilities",
              ],
            },
          ],
        },
        {
          kind: "solution",
          label: "The Solution",
          title: "Answer the questions a broker currently answers",
          body: "Every opportunity in the journey map points the same way: show what is really there, and show what it really costs, before anyone pays a deposit.",
          bullets: [
            "Verified listings with real photos and resident reviews",
            "360 degree room tours, the feature 96% of respondents asked for",
            "The full cost shown up front, including what is and is not included",
            "Clear house rules and contracts before the deposit, not after",
            "Service guarantees and maintenance tracking once moved in",
            "Fast answers and simple refunds on the way out",
          ],
        },
        {
          kind: "screens",
          label: "The Screens",
          title: "Apna PG",
          shots: [
            {
              src: "/images/projects/apna-ui-onboarding.webp",
              width: 785,
              height: 485,
              tab: "Onboarding",
              alt: "Apna PG splash screen and two onboarding screens reading 'Find your best stay with Apna PG' with a Let's Explore button.",
              caption: "Splash and onboarding.",
            },
            {
              src: "/images/projects/apna-ui-auth.webp",
              width: 785,
              height: 480,
              tab: "Sign in",
              alt: "Login screen with email and password, a four-digit phone verification screen, and a create-account form.",
              caption: "Login, phone verification, and account creation.",
            },
            {
              src: "/images/projects/apna-ui-browse.webp",
              width: 785,
              height: 535,
              tab: "Browse",
              alt: "Home screen with featured stays and a map, a notifications screen showing rent and maintenance alerts, and a filtered listing view with prices per month.",
              caption: "Finding a stay: search, alerts, and filtered listings.",
            },
          ],
        },
      ],
      /** Primary research. The percentages are the board's, not estimates. */
      insights: [
        {
          label: "80% live in a PG",
          body: "Most respondents currently live in a PG, so the survey reflects real residents rather than prospective ones.",
        },
        {
          label: "86% hit fake ads",
          body: "Fake advertisements and misleading information are the most reported problem when searching for a PG.",
        },
        {
          label: "Rent leads the pain",
          body: "High rent is the biggest challenge, followed by fake ads, safety, hidden charges, food quality and roommate problems.",
        },
        {
          label: "96% want a 360 tour",
          body: "A 360 degree room tour would help them trust and choose a PG faster - transparency beats persuasion.",
        },
      ],
      journey: {
        label: "From arriving in the city to moving out",
        stages: [
          {
            stage: "Arrival in City",
            feeling: "Confused - searching for a PG",
            pain: "Misleading information",
            opportunity: "Verified listings, real photos, user reviews",
          },
          {
            stage: "Viewing / Shortlisting",
            feeling: "Easy and done fast - visiting PGs",
            pain: "Hidden charges, false promises",
            opportunity: "Show all costs up front",
          },
          {
            stage: "Finalizing / Moving In",
            feeling: "Nervous - paying the deposit",
            pain: "Unexpected costs, unclear rules",
            opportunity: "A list of what is included, and clear rules",
          },
          {
            stage: "Daily Living",
            feeling: "Disappointed, frustrated",
            pain: "Poor food, unclean rooms, Wi-Fi and safety",
            opportunity: "Service guarantees and maintenance",
          },
          {
            stage: "Long-Term / Exit",
            feeling: "Angry, helpless",
            pain: "No help, and hard to get money back",
            opportunity: "Fast answers, simple refunds",
          },
        ],
      },
      features: [
        {
          title: "Verified listings",
          body: "Listings are verified, so what is advertised is what exists.",
        },
        {
          title: "Honest reviews",
          body: "Reviews from people who actually stayed, rather than marketing copy.",
        },
        {
          title: "Clear cost breakdowns",
          body: "The full cost is broken down up front, with no charges surfacing later.",
        },
        {
          title: "360 degree room tours",
          body: "See the actual room before travelling to it, or before paying for it.",
        },
        {
          title: "Support and maintenance",
          body: "Raise a ticket, track a complaint, and reach emergency contacts from the app.",
        },
      ],
      outcome: {
        decisions: [
          "Lead with proof - photos, tours and reviews - because trust is the thing that is missing.",
          "Put the whole cost on the listing, since hidden charges were the most common complaint.",
          "Carry the experience past move-in, where the journey map showed the sharpest drop in mood.",
        ],
        impact: [
          "Verified listings should cut the wasted visits caused by fake ads.",
          "Up-front costs should reduce the budget overruns the secondary research describes.",
          "A 360 degree tour should shorten the time it takes to commit to a room.",
        ],
        learnings: [
          "Residents did not ask for more listings - they asked to believe the ones they saw.",
          "The worst moments came after moving in, not while searching.",
        ],
      },
    },
    liveUrl: "https://pg-finder-booking.vercel.app/",
    behanceUrl:
      "https://www.behance.net/gallery/255609371/APNA-PG-UIUX-Case-Study",
  },
];

/* -------------------------------------------------------------------------- */
/* EDUCATION                                                                   */
/* -------------------------------------------------------------------------- */

/** `location` was not on the resume - fill it in and it will render. */
export const education = [
  {
    degree: "Master of Design (M.Des)",
    institution: "Indus University",
    location: "", // TODO: add campus location if you want it shown
    period: "2026 - 2027",
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
    url: "https://coursera.org/share/12dfae26c9dfe8614fd07a22e324f557",
  },
  {
    title: "IBM UI/UX Designer",
    issuer: "IBM",
    brand: "ibm",
    monogram: "IBM",
    date: "",
    url: "https://coursera.org/share/63627a06353379e2e9f31a79c5164a1f",
  },
  {
    title: "Generative AI: Introduction and Applications",
    issuer: "IBM",
    brand: "ibm",
    monogram: "IBM",
    date: "",
    url: "https://coursera.org/share/676efed9dc9f82d01ff50e021e7e9963",
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
    url: "https://coursera.org/share/f6e461e2ec98e9c270d810215e30e911",
  },
  {
    title: "Programming for Everybody (Python)",
    issuer: "University of Michigan (Coursera)",
    brand: "coursera",
    monogram: "UMICH",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/verify/UAJUTN9AA5ZT",
  },
];

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

export const footerTagline =
  "UI/UX Designer & Frontend Developer building user-centered digital experiences.";
