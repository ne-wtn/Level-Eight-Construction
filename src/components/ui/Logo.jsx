/**
 * The Level Eight mark: eight stacked strata stepping outward, the topmost in
 * accent. Reads as levels, as a structure, and as the number eight's stacked
 * geometry. Inherits `currentColor` so it works on paper and on ink.
 */
export function LogoMark({ className = 'h-7 w-7' }) {
  const bars = [8, 11, 14, 17, 20, 23, 26, 29]
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Level Eight"
      fill="none"
    >
      {bars.map((width, i) => (
        <rect
          key={width}
          x="1.5"
          y={1.4 + i * 3.8}
          width={width}
          height="2.6"
          rx="0.6"
          fill={i === 0 ? 'var(--color-accent)' : 'currentColor'}
        />
      ))}
    </svg>
  )
}

export function Wordmark({ className = '' }) {
  return (
    <span
      className={`display-wide text-[0.95rem] leading-none font-extrabold tracking-[0.14em] ${className}`}
    >
      LEVEL EIGHT
    </span>
  )
}

export default function Logo({ className = '', markClassName }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName ?? 'h-6 w-6 shrink-0'} />
      <Wordmark />
    </span>
  )
}
