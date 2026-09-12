/**
 * Per-project cover artwork.
 *
 * Each scene is drawn as vector art rather than shipped as a bitmap: it stays
 * sharp at any density, weighs almost nothing, and — because it paints with
 * the site's own CSS variables — follows the light/dark theme instead of
 * sitting in a fixed-colour rectangle.
 *
 * Every cover is built on the same 600×384 stage with the same blueprint
 * frame, so the row reads as one set while each scene says what its project
 * actually is.
 */

/** One accent per project, used sparingly so the grid stays neutral. */
const ACCENTS = {
  "apna-pg": "#10b981",
  "nescafe-campus-canteen-kiosk": "#d97706",
  "competitive-app-analysis-10-laws-of-ux": "#e11d48",
  "kidd-safer-ride-for-kids": "#f59e0b",
  "campus-shoes-marketing-campaign": "#6366f1",
  "history-and-culture-map": "#0ea5e9",
};

const SURFACE = "var(--card)";
const LINE = "var(--border)";
const INK = "var(--muted-foreground)";

/* -------------------------------------------------------------------------- */
/* SCENES                                                                      */
/* -------------------------------------------------------------------------- */

/** Apna PG — a listings browser: search, verified listing, price breakdown. */
function ApnaPg({ accent }) {
  return (
    <g>
      <rect
        x="60"
        y="48"
        width="480"
        height="288"
        rx="14"
        fill={SURFACE}
        stroke={LINE}
      />
      {/* Chrome */}
      <path d="M60 78h480" stroke={LINE} />
      <circle cx="82" cy="63" r="4" fill={INK} opacity="0.35" />
      <circle cx="98" cy="63" r="4" fill={INK} opacity="0.35" />
      <circle cx="114" cy="63" r="4" fill={INK} opacity="0.35" />
      <rect
        x="140"
        y="55"
        width="240"
        height="16"
        rx="8"
        fill={INK}
        opacity="0.12"
      />
      <circle cx="152" cy="63" r="3.5" stroke={INK} fill="none" opacity="0.5" />
      <path d="m155 66 4 4" stroke={INK} opacity="0.5" strokeLinecap="round" />

      {/* Featured listing */}
      <rect
        x="84"
        y="102"
        width="204"
        height="210"
        rx="10"
        fill={INK}
        opacity="0.06"
      />
      <rect x="84" y="102" width="204" height="210" rx="10" stroke={LINE} fill="none" />
      <rect
        x="84"
        y="102"
        width="204"
        height="104"
        rx="10"
        fill={INK}
        opacity="0.1"
      />
      {/* Room glyph */}
      <path
        d="M148 172v-28l24-18 24 18v28"
        stroke={INK}
        strokeWidth="3"
        fill="none"
        opacity="0.45"
        strokeLinejoin="round"
      />
      <path d="M164 172v-16h16v16" stroke={INK} strokeWidth="3" fill="none" opacity="0.45" />
      {/* Verified pill */}
      <rect x="96" y="114" width="70" height="20" rx="10" fill={accent} opacity="0.18" />
      <path
        d="m106 124 3.5 3.5 6-7"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="120" y="121" width="38" height="6" rx="3" fill={accent} opacity="0.7" />

      <rect x="100" y="222" width="120" height="10" rx="5" fill={INK} opacity="0.45" />
      <rect x="100" y="242" width="80" height="8" rx="4" fill={INK} opacity="0.22" />
      {/* Price breakdown rows */}
      <path d="M100 266h172M100 286h172" stroke={LINE} />
      <rect x="100" y="272" width="54" height="7" rx="3.5" fill={INK} opacity="0.22" />
      <rect x="218" y="272" width="54" height="7" rx="3.5" fill={accent} opacity="0.6" />
      <rect x="100" y="292" width="44" height="7" rx="3.5" fill={INK} opacity="0.22" />
      <rect x="228" y="292" width="44" height="7" rx="3.5" fill={INK} opacity="0.35" />

      {/* Side results */}
      {[102, 174, 246].map((y) => (
        <g key={y}>
          <rect x="308" y={y} width="208" height="60" rx="10" stroke={LINE} fill="none" />
          <rect x="320" y={y + 12} width="36" height="36" rx="7" fill={INK} opacity="0.12" />
          <rect x="368" y={y + 18} width="94" height="8" rx="4" fill={INK} opacity="0.35" />
          <rect x="368" y={y + 34} width="60" height="7" rx="3.5" fill={INK} opacity="0.18" />
        </g>
      ))}
    </g>
  );
}

/** Nescafé — a canteen self-service kiosk mid-order. */
function Nescafe({ accent }) {
  return (
    <g>
      {/* Kiosk body */}
      <rect x="196" y="26" width="208" height="332" rx="18" fill={SURFACE} stroke={LINE} />
      <rect x="210" y="40" width="180" height="304" rx="10" fill={INK} opacity="0.05" />

      {/* Brand bar */}
      <rect x="210" y="40" width="180" height="42" rx="10" fill={accent} opacity="0.16" />
      <rect x="226" y="56" width="76" height="10" rx="5" fill={accent} opacity="0.85" />
      <circle cx="372" cy="61" r="8" stroke={accent} fill="none" opacity="0.6" />

      {/* Steam */}
      <path
        d="M288 104c-6-8 6-12 0-20M306 104c-6-8 6-12 0-20"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Hero cup */}
      <path
        d="M266 118h62v34a31 31 0 0 1-31 31 31 31 0 0 1-31-31z"
        fill={accent}
        opacity="0.22"
      />
      <path
        d="M266 118h62v34a31 31 0 0 1-31 31 31 31 0 0 1-31-31z"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M328 126h10a13 13 0 0 1 0 26h-10"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
      />

      {/* Menu grid */}
      {[
        [226, 200],
        [310, 200],
        [226, 258],
        [310, 258],
      ].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x}
            y={y}
            width="64"
            height="46"
            rx="9"
            fill={i === 0 ? accent : INK}
            opacity={i === 0 ? 0.16 : 0.07}
          />
          <rect
            x={x}
            y={y}
            width="64"
            height="46"
            rx="9"
            stroke={i === 0 ? accent : LINE}
            fill="none"
            opacity={i === 0 ? 0.55 : 1}
          />
          <path
            d={`M${x + 22} ${y + 16}h20v11a10 10 0 0 1-20 0z`}
            stroke={i === 0 ? accent : INK}
            strokeWidth="2"
            fill="none"
            opacity={i === 0 ? 0.8 : 0.4}
          />
          <rect
            x={x + 18}
            y={y + 34}
            width="28"
            height="5"
            rx="2.5"
            fill={INK}
            opacity="0.25"
          />
        </g>
      ))}

      {/* Order CTA */}
      <rect x="226" y="318" width="148" height="16" rx="8" fill={accent} opacity="0.8" />
    </g>
  );
}

/** 10 Laws of UX — three streaming apps annotated side by side. */
function UxLaws({ accent }) {
  const phones = [78, 234, 390];
  return (
    <g>
      {phones.map((x, i) => (
        <g key={x}>
          {/* Annotation index */}
          <circle cx={x + 66} cy="34" r="13" fill={accent} opacity="0.16" />
          <rect x={x + 60} y="30" width="12" height="7" rx="3.5" fill={accent} opacity="0.8" />
          <path d={`M${x + 66} 47v13`} stroke={accent} opacity="0.35" strokeDasharray="3 3" />

          {/* Phone */}
          <rect x={x} y="62" width="132" height="272" rx="16" fill={SURFACE} stroke={LINE} />
          <rect x={x + 8} y="74" width="116" height="248" rx="10" fill={INK} opacity="0.05" />
          <rect x={x + 52} y="68" width="28" height="4" rx="2" fill={INK} opacity="0.3" />

          {/* Hero tile */}
          <rect
            x={x + 16}
            y="86"
            width="100"
            height="72"
            rx="8"
            fill={i === 1 ? accent : INK}
            opacity={i === 1 ? 0.2 : 0.12}
          />
          <path
            d={`M${x + 58} 112l16 10-16 10z`}
            fill={i === 1 ? accent : INK}
            opacity={i === 1 ? 0.75 : 0.35}
          />

          {/* Rows of thumbnails */}
          {[172, 232].map((ry) => (
            <g key={ry}>
              <rect x={x + 16} y={ry} width="40" height="7" rx="3.5" fill={INK} opacity="0.28" />
              {[0, 1, 2].map((c) => (
                <rect
                  key={c}
                  x={x + 16 + c * 36}
                  y={ry + 14}
                  width="30"
                  height="40"
                  rx="6"
                  fill={INK}
                  opacity="0.1"
                />
              ))}
            </g>
          ))}

          {/* Tab bar */}
          <path d={`M${x + 8} 302h116`} stroke={LINE} />
          {[0, 1, 2].map((t) => (
            <circle
              key={t}
              cx={x + 30 + t * 36}
              cy="313"
              r="4"
              fill={t === 0 ? accent : INK}
              opacity={t === 0 ? 0.8 : 0.25}
            />
          ))}
        </g>
      ))}

      {/* Comparison measure line */}
      <path
        d="M144 350h312"
        stroke={accent}
        opacity="0.35"
        strokeDasharray="4 4"
      />
      <path d="M144 345v10M456 345v10" stroke={accent} opacity="0.5" />
    </g>
  );
}

/** Kid Cab — live route tracking with a verified driver sheet. */
function KidCab({ accent }) {
  return (
    <g>
      {/* Map field */}
      <rect x="40" y="32" width="336" height="320" rx="14" fill={INK} opacity="0.06" />
      <rect x="40" y="32" width="336" height="320" rx="14" stroke={LINE} fill="none" />
      <path
        d="M40 120h336M40 232h336M148 32v320M268 32v320"
        stroke={LINE}
        opacity="0.7"
      />

      {/* Route */}
      <path
        d="M96 300c48 0 40-70 88-70s52-96 104-96"
        stroke={accent}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Origin */}
      <circle cx="96" cy="300" r="9" fill={SURFACE} stroke={accent} strokeWidth="3" />
      {/* Destination pin */}
      <path
        d="M288 134c0-11 9-20 20-20s20 9 20 20c0 15-20 34-20 34s-20-19-20-34z"
        fill={accent}
        opacity="0.22"
      />
      <path
        d="M288 134c0-11 9-20 20-20s20 9 20 20c0 15-20 34-20 34s-20-19-20-34z"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="308" cy="133" r="6" fill={accent} />

      {/* Vehicle marker mid-route */}
      <circle cx="184" cy="230" r="22" fill={accent} opacity="0.14" />
      <circle cx="184" cy="230" r="14" fill={SURFACE} stroke={accent} strokeWidth="2.5" />
      <rect x="175" y="224" width="18" height="10" rx="3" fill={accent} />
      <circle cx="179" cy="236" r="2.5" fill={accent} />
      <circle cx="189" cy="236" r="2.5" fill={accent} />

      {/* Driver sheet */}
      <rect x="336" y="120" width="224" height="144" rx="14" fill={SURFACE} stroke={LINE} />
      <rect x="356" y="142" width="44" height="44" rx="12" fill={INK} opacity="0.12" />
      <circle cx="378" cy="158" r="7" stroke={INK} fill="none" opacity="0.5" strokeWidth="2" />
      <path d="M366 178a12 12 0 0 1 24 0" stroke={INK} fill="none" opacity="0.5" strokeWidth="2" />

      <rect x="414" y="146" width="96" height="9" rx="4.5" fill={INK} opacity="0.4" />
      <rect x="414" y="164" width="64" height="7" rx="3.5" fill={INK} opacity="0.2" />

      {/* Verified row */}
      <rect x="356" y="204" width="184" height="34" rx="9" fill={accent} opacity="0.14" />
      <path
        d="m372 220 5 5 9-11"
        stroke={accent}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="396" y="217" width="84" height="8" rx="4" fill={accent} opacity="0.7" />

      {/* Live dot */}
      <circle cx="528" cy="150" r="10" fill={accent} opacity="0.18" />
      <circle cx="528" cy="150" r="5" fill={accent} />
    </g>
  );
}

/** Campus Shoes — a campaign set: key poster plus social crops. */
function CampusShoes({ accent }) {
  return (
    <g>
      {/* Key visual */}
      <rect x="52" y="44" width="252" height="296" rx="14" fill={SURFACE} stroke={LINE} />
      <rect x="52" y="44" width="252" height="296" rx="14" fill={accent} opacity="0.08" />

      {/* Sneaker */}
      <path
        d="M96 224v-34h26l30-30 22 22 44 16c24 9 48 12 48 30v12z"
        fill={accent}
        opacity="0.22"
      />
      <path
        d="M96 224v-34h26l30-30 22 22 44 16c24 9 48 12 48 30v12z"
        stroke={accent}
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M96 224h170v10a12 12 0 0 1-12 12H108a12 12 0 0 1-12-12z" fill={accent} opacity="0.5" />
      <path
        d="m150 190 14 14M168 174l14 14"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Campaign type */}
      <rect x="80" y="272" width="140" height="14" rx="7" fill={INK} opacity="0.45" />
      <rect x="80" y="296" width="96" height="9" rx="4.5" fill={INK} opacity="0.22" />
      <rect x="80" y="76" width="56" height="18" rx="9" fill={accent} opacity="0.85" />

      {/* Social crops */}
      {[44, 160, 276].map((y, i) => (
        <g key={y}>
          <rect x="328" y={y} width="220" height="100" rx="12" stroke={LINE} fill="none" />
          <rect
            x="328"
            y={y}
            width="220"
            height="100"
            rx="12"
            fill={INK}
            opacity={i === 0 ? 0.1 : 0.05}
          />
          <path
            d={`M356 ${y + 68}v-14h12l14-14 10 10 20 7c11 4 22 6 22 14v4z`}
            fill={accent}
            opacity={i === 0 ? 0.55 : 0.3}
          />
          <rect x="440" y={y + 34} width="84" height="8" rx="4" fill={INK} opacity="0.3" />
          <rect x="440" y={y + 52} width="56" height="7" rx="3.5" fill={INK} opacity="0.18" />
        </g>
      ))}
    </g>
  );
}

/** History & Culture Map — heritage pins over a contoured map. */
function HistoryMap({ accent }) {
  return (
    <g>
      <rect x="36" y="30" width="528" height="324" rx="14" fill={INK} opacity="0.05" />
      <rect x="36" y="30" width="528" height="324" rx="14" stroke={LINE} fill="none" />

      {/* Contours */}
      <path
        d="M36 244c92-6 110-74 200-74s126 52 196 44 112-44 132-52"
        stroke={LINE}
        fill="none"
      />
      <path
        d="M36 296c104-4 118-54 208-54s134 40 204 32 96-30 116-38"
        stroke={LINE}
        fill="none"
        opacity="0.7"
      />
      <path
        d="M36 190c80-10 96-56 176-56s122 42 186 36 126-42 166-52"
        stroke={LINE}
        fill="none"
        opacity="0.5"
      />

      {/* Exploration path */}
      <path
        d="M124 288c62-18 60-96 132-104s110 42 176 16"
        stroke={accent}
        strokeWidth="3"
        strokeDasharray="8 7"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Secondary pins */}
      {[
        [124, 288],
        [432, 200],
      ].map(([cx, cy]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="13" fill={accent} opacity="0.14" />
          <circle cx={cx} cy={cy} r="6" fill={SURFACE} stroke={accent} strokeWidth="2.5" />
        </g>
      ))}

      {/* Primary heritage pin */}
      <path
        d="M256 172c0-14 11-25 25-25s25 11 25 25c0 19-25 42-25 42s-25-23-25-42z"
        fill={accent}
        opacity="0.2"
      />
      <path
        d="M256 172c0-14 11-25 25-25s25 11 25 25c0 19-25 42-25 42s-25-23-25-42z"
        stroke={accent}
        strokeWidth="3"
        fill="none"
      />
      {/* Monument glyph inside the pin */}
      <path
        d="M270 180v-12l11-8 11 8v12z"
        fill={accent}
        opacity="0.85"
      />

      {/* Place card */}
      <rect x="330" y="238" width="212" height="94" rx="12" fill={SURFACE} stroke={LINE} />
      <rect x="348" y="256" width="52" height="52" rx="10" fill={INK} opacity="0.12" />
      <path
        d="M360 294v-18l14-10 14 10v18z"
        stroke={INK}
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <rect x="416" y="262" width="104" height="9" rx="4.5" fill={INK} opacity="0.4" />
      <rect x="416" y="280" width="72" height="7" rx="3.5" fill={INK} opacity="0.2" />
      <rect x="416" y="296" width="44" height="7" rx="3.5" fill={accent} opacity="0.6" />
    </g>
  );
}

const SCENES = {
  "apna-pg": ApnaPg,
  "nescafe-campus-canteen-kiosk": Nescafe,
  "competitive-app-analysis-10-laws-of-ux": UxLaws,
  "kidd-safer-ride-for-kids": KidCab,
  "campus-shoes-marketing-campaign": CampusShoes,
  "history-and-culture-map": HistoryMap,
};

/* -------------------------------------------------------------------------- */

export default function ProjectCover({ slug, className }) {
  const Scene = SCENES[slug];
  if (!Scene) return null;

  const accent = ACCENTS[slug] ?? "var(--primary)";
  // Pattern ids are document-global, so key them to the project.
  const dotsId = `cover-dots-${slug}`;

  return (
    <svg
      viewBox="0 0 600 384"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={dotsId}
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="1" fill={INK} opacity="0.22" />
        </pattern>
      </defs>

      <rect width="600" height="384" fill={`url(#${dotsId})`} />

      <g strokeWidth="1.5" strokeLinecap="round">
        <Scene accent={accent} />
      </g>
    </svg>
  );
}
