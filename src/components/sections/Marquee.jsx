/**
 * Scrolling rule between sections. The track is duplicated and translated -50%,
 * so the loop is seamless. Purely decorative — hidden from assistive tech, and
 * the animation stops entirely under reduced-motion.
 */
export default function Marquee({
  items = [
    'Construction',
    'Renovation & Finishes',
    'Project Management',
    'Institutional Builds',
    'Fabrication',
  ],
  tone = 'ink',
}) {
  const tones = {
    ink: 'bg-ink text-paper',
    accent: 'bg-accent text-white',
  }
  const track = [...items, ...items]

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y border-ink-line py-5 ${tones[tone]}`}
    >
      <div className="flex w-max animate-[var(--animate-marquee)] motion-reduce:animate-none">
        {track.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 px-8">
            <span className="display-wide text-lg font-semibold tracking-tight whitespace-nowrap sm:text-xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
