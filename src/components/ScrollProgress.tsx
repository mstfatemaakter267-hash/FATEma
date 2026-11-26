interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#FB7185] transition-transform duration-75"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
