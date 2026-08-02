import { Link } from 'react-router-dom'
import { ArrowTile } from './Button'

const tones = {
  surface: { card: 'bg-surface text-ink', tile: 'ink' },
  accent: { card: 'bg-accent text-white', tile: 'ink' },
  ink: { card: 'bg-ink-soft text-paper', tile: 'accent' },
  paper: { card: 'bg-paper text-ink', tile: 'ink' },
}

/**
 * The signature card: a large-radius block with an arrow tile seated into the
 * bottom-right corner. The tile wears a thick ring of whatever colour sits
 * behind the card (`--notch-bg`), which reads as a bite cut out of the corner.
 *
 * Callers must set `--notch-bg` via the `notchBg` prop to match the section
 * background, or the ring will show as a visible halo.
 */
export default function NotchCard({
  to,
  href,
  tone = 'surface',
  notchBg = 'var(--color-paper)',
  showArrow = true,
  className = '',
  bodyClassName = 'p-7 sm:p-9',
  children,
  ...props
}) {
  const { card, tile } = tones[tone]
  const interactive = Boolean(to || href)

  const inner = (
    <>
      <div className={bodyClassName}>{children}</div>
      {showArrow && (
        <ArrowTile
          tone={tile}
          className="notch-action"
          // The ring is drawn in the surrounding colour to fake the cut corner.
          style={{ '--notch-bg': notchBg }}
        />
      )}
    </>
  )

  const classes =
    `notch-host group block overflow-visible rounded-[1.75rem] ${card} ` +
    `transition-transform duration-500 ease-[var(--ease-out-expo)] ` +
    `${interactive ? 'hover:-translate-y-1 motion-reduce:hover:translate-y-0' : ''} ` +
    `${showArrow ? 'pb-4 pr-4 sm:pb-6 sm:pr-6' : ''} ${className}`

  const style = { '--notch-bg': notchBg }

  if (to) {
    return (
      <Link to={to} className={classes} style={style} {...props}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} style={style} {...props}>
        {inner}
      </a>
    )
  }
  return (
    <div className={classes} style={style} {...props}>
      {inner}
    </div>
  )
}
