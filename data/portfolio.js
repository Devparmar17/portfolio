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
  { id: "behance", label: "Behance", url: "https://www.behance.net/devparmar28" },
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
 * visualstudio, git, react, nextjs, tailwind, framer, lucide, claude, gemini.
 */
export const projects = [
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
        tools: ["Figma", "Surveys", "Interviews", "Empathy Mapping", "Wireframing"],
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
            opportunity: "Cashless fast payment, seating availability indicator",
          },
          {
            stage: "Wait for Food",
            feeling: "Impatient, checking phone",
            pain: "No order tracking, overcrowded and unclear pickup",
            opportunity: "Order tracking screen, notifications, separate waiting zone",
          },
          {
            stage: "Finish & Leave",
            feeling: "Satisfied but rushed",
            pain: "Overflowing dustbins, time pressure, cleanup inconvenience",
            opportunity: "Smart dustbin placement, loyalty points for repeat users",
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
          tags: ["Lunch break", "Order confusion", "Long queue", "Out of stock"],
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
              caption: "Browse by category, with the order and total always in view.",
            },
            {
              src: "/images/projects/nescafe-ui-pay.webp",
              width: 1400,
              height: 600,
              alt: "Kiosk checkout screens showing an itemised order, UPI and pay-at-counter options, and a QR confirmation.",
              caption: "Checkout: itemised order, UPI or pay at counter, QR to confirm.",
            },
            {
              src: "/images/projects/nescafe-ui-shop.webp",
              width: 1400,
              height: 1040,
              alt: "Shopkeeper app screens: live orders queue, sales dashboard with today's total and trend, and inventory management with stock toggles.",
              caption: "The stall side: live orders, a sales dashboard, and stock control.",
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
    slug: "competitive-app-analysis-10-laws-of-ux",
    title: "Competitive App Analysis - 10 Laws of UX",
    subtitle: "Streaming Apps Compared",
    type: "case-study",
    role: "UX Research / Competitive Analysis",
    timeline: "3 months",
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
      "A screen-by-screen teardown of three streaming apps - JioHotstar, SonyLIV and Netflix - measured against each of the 10 Laws of UX, with side-by-side UI comparisons and the observations behind each verdict.",
    points: [
      "Compared JioHotstar, SonyLIV and Netflix interface by interface across ten established UX principles.",
      "Documented how each app applies - or misses - each law, supported by annotated screen comparisons.",
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
    timeline: "3 months",
    category: "UX Research • UI/UX Design • Case Study",
    featured: false,
    status: "",
    icon: "bus",
    cover: "",
    full: "/images/projects/kid-cab-full.jpg",
    fullWidth: 1400,
    fullHeight: 22205,
    fullAlt:
      "Uber App For Kids case study board - project overview, design process, problem statement, competitive analysis, primary research, personas, empathy mapping, information architecture, user flow and final screens.",
    description:
      "A booking app built around one question: can a parent trust this ride? Live tracking and driver verification sit at the centre of the experience, keeping the interface calm and the safety signals loud.",
    points: [
      "Designed and developed a safe, user-friendly kids transportation app centered on secure travel.",
      "Built features for live tracking and driver verification to increase parent trust and safety.",
    ],
    stages: ["Concept", "UI Design", "Prototyping", "Build"],
    tech: ["UI Design", "Prototyping", "Figma", "Frontend"],
    contribution: "Design · Prototype · Build",
    /**
     * Taken from the uploaded "Uber App For Kids" board: the problem
     * statement, the 30-response survey numbers, both personas and the
     * annotated screens are all the board's own.
     */
    caseStudy: {
      overview: {
        goal: "A ride-booking app a child can actually use, with the control and visibility a parent needs to allow it.",
        role: "UX/UI Design",
        timeline: "3 months",
        tools: ["Figma", "Surveys", "Empathy Mapping", "Wireframing"],
      },
      chapters: [
        {
          kind: "problem",
          label: "The Problem",
          title: "Ride apps are not built for children",
          body: "Children face problems using transport booking apps because the UI is not simple, navigation is confusing, and there is too much unnecessary information. They struggle to understand the app, track their ride, and get important details. There is a need for a simple, easy-to-use, child-friendly app with parental control for safe booking and clear tracking.",
        },
        {
          kind: "quote",
          label: "The Brief",
          quote:
            "This project designs a child-friendly ride-booking app to solve issues like complex UI, confusing navigation, and lack of safety in existing apps. It focuses on simple design, clear tracking, and parental controls, ensuring easy use for children while providing safety, trust, and real-time monitoring features for parents.",
          tags: ["Discover", "Define", "Design", "Develop", "Deliver"],
        },
        {
          kind: "personas",
          label: "Who It Is For",
          title: "A child and a parent, on the same ride",
          personas: [
            {
              name: "Yug Parmar",
              role: "11 - 6th standard",
              meta: "Goals: book a ride easily, track it clearly, feel safe",
              pains: [
                "Confusing app interface",
                "Too many options and buttons",
                "Hard to understand instructions",
                "Cannot track the ride properly",
              ],
              needs: [
                "Simple UI - big buttons, less text",
                "Clear instructions",
                "Easy tracking system",
              ],
            },
            {
              name: "Mitali Parmar",
              role: "36 - mother",
              meta: "Goals: ensure safety, track in real time, get alerts",
              pains: [
                "Lack of trust in transport apps",
                "No proper tracking updates",
                "Hard to control the child's bookings",
                "Safety concerns",
              ],
              needs: [
                "Real-time GPS tracking",
                "Notifications for pickup and drop",
                "Parental control features",
                "Emergency contact system",
              ],
            },
          ],
        },
        {
          kind: "solution",
          label: "The Solution",
          title: "Simple for the child, accountable to the parent",
          body: "The child gets a screen with almost nothing on it. The parent gets the OTP, the tracking and the payment. Neither has to use the other's version.",
          bullets: [
            "Pick a ride by picture and price, not by menu",
            "Search by typing or by voice",
            "A security OTP the parent confirms before the ride starts",
            "SOS and call-parent on every screen during the ride",
            "Live tracking from school to home",
            "Payment only the parent can approve",
            "Ride confirmation sent to both of them",
          ],
        },
        {
          kind: "screens",
          label: "The Screens",
          title: "Kid Cab",
          shots: [
            {
              src: "/images/projects/kid-ui-home.webp",
              width: 1400,
              height: 1423,
              tab: "Choose a ride",
              alt: "Home screen titled Pick Your Ride with a search field and cards for Red Cab, Auto Rickshaw, Bike Ride and Big Van, each showing price and seats.",
              caption: "One screen, four choices, each with its price and seat count.",
            },
            {
              src: "/images/projects/kid-ui-track.webp",
              width: 1400,
              height: 1254,
              tab: "Verify & track",
              alt: "Booking status screen showing a four-digit security OTP and driver details, a live map tracking the ride with SOS and Call Parent buttons, and the parent's authorise-and-start-ride screen.",
              caption: "The OTP goes to the parent; the child sees the driver and the map.",
            },
            {
              src: "/images/projects/kid-ui-done.webp",
              width: 1400,
              height: 1220,
              tab: "Arrive & pay",
              alt: "Arrival screen showing the route and fare summary with an approve-and-pay action, and a ride-completed screen reading You've Arrived with a rating prompt and payment confirmed by parent.",
              caption: "Only the parent pays; both of them get the confirmation.",
            },
          ],
        },
      ],
      /** From the 30-response survey on the board. Counts, not percentages. */
      insights: [
        {
          label: "20 of 30 have used a cab",
          body: "Most children surveyed had already ridden in an Uber or Ola, so the app is not introducing the idea, only the independence.",
        },
        {
          label: "13 of 30 travel alone",
          body: "Nearly half already make journeys without an adult, which is exactly where the safety gap sits.",
        },
        {
          label: "Tracking beats everything",
          body: "Asked what matters most in the app, real-time tracking took 13 of 30 - ahead of easy booking (7), safety features (6) and cost (4).",
        },
        {
          label: "Pay per ride, not monthly",
          body: "Parents preferred paying per ride (13) over a subscription (7), a prepaid wallet (5) or cash (5).",
        },
      ],
      features: [
        {
          title: "Pick by picture",
          body: "Red cab, auto, bike or van - chosen visually, with the price on the card.",
        },
        {
          title: "Security OTP",
          body: "A four-digit code the parent authorises before the ride can start.",
        },
        {
          title: "Live tracking",
          body: "The route from school to home, visible to both child and parent.",
        },
        {
          title: "SOS and call parent",
          body: "Both reachable on the ride screen without leaving it.",
        },
        {
          title: "Parent-only payment",
          body: "The fare summary is approved by the parent, never by the child.",
        },
      ],
      outcome: {
        decisions: [
          "Split the product in two: the child books, the parent authorises.",
          "Put safety controls on the ride screen itself rather than in a menu.",
          "Lead the interface with pictures and price, since the audience is eleven.",
        ],
        impact: [
          "Parent-confirmed OTP should close the gap the survey found around trust.",
          "Live tracking answers the feature parents ranked highest.",
          "A simplified booking screen should reduce the confusion the personas describe.",
        ],
        learnings: [
          "The child and the parent want opposite things - simplicity and control - and the design has to serve both without compromising either.",
          "Competitive analysis of YouTube Kids and Netflix Kids showed the pattern: a strong parent setup is what makes a kids mode trustworthy.",
        ],
      },
    },
    liveUrl: "",
    behanceUrl:
      "https://www.behance.net/gallery/254733255/A-Safer-Ride-for-Kids-UXUI-Case-Study",
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
