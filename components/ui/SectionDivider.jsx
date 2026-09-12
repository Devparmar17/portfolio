/**
 * The crosshatch gutter that separates two sections: a repeating "+" grid,
 * faded out at the top and bottom, bounded by the column rails.
 *
 * `patternId` must be unique per instance — SVG pattern ids are global.
 */
export default function SectionDivider({ patternId }) {
  return (
    <div
      aria-hidden="true"
      className="w-full h-24 relative shrink-0 pointer-events-none flex items-center justify-center"
    >
      <div className="absolute inset-0 w-full max-w-7xl mx-auto h-full border-x border-border/40" />

      <div className="absolute inset-0 fade-mask-y">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 12 10 L 12 14 M 10 12 L 14 12"
                className="stroke-muted-foreground/20"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
    </div>
  );
}
