/**
 * Fixed, full-height vertical rails marking the edges of the content column,
 * with a soft light "beam" running down each one and crosshairs at the
 * viewport corners. Sits above the content but never catches a pointer.
 */
export default function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-20 flex justify-center"
    >
      <div className="relative w-full max-w-7xl h-full">
        {/* Rails */}
        <div className="absolute top-0 left-0 w-px h-full bg-border/40" />
        <div className="absolute top-0 right-0 w-px h-full bg-border/40" />

        {/* Beams */}
        <div className="absolute top-0 left-0 w-px h-full overflow-hidden">
          <div className="w-full h-32 bg-linear-to-b from-transparent via-primary/50 to-transparent" />
        </div>
        <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
          <div className="w-full h-32 bg-linear-to-b from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Corner crosshairs */}
        {[
          "top-0 left-0",
          "top-0 right-0",
          "bottom-0 left-0",
          "bottom-0 right-0",
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos}`}>
            <span className="absolute -translate-x-1/2 -translate-y-1/2 block w-2 h-px bg-muted-foreground/40" />
            <span className="absolute -translate-x-1/2 -translate-y-1/2 block h-2 w-px bg-muted-foreground/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
