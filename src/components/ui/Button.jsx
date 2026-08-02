import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium ' +
  'transition-[background-color,color,transform] duration-300 ease-out active:translate-y-px ' +
  'disabled:pointer-events-none disabled:opacity-55'

const variants = {
  primary: 'bg-ink text-paper hover:bg-accent',
  accent: 'bg-accent text-white hover:bg-ink',
  paper: 'bg-paper text-ink hover:bg-accent hover:text-white',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  ghostDark: 'border border-white/20 text-paper hover:bg-paper hover:text-ink',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-[0.9375rem]',
  lg: 'px-8 py-4 text-base',
}

/**
 * The site's one button. The arrow nudges on hover — the only motion, so it
 * still reads as deliberate rather than decorative.
 */
export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  const Tag = as ?? 'button'
  return (
    <Tag className={classes} {...props}>
      {content}
    </Tag>
  )
}

/**
 * The square arrow tile that seats into a notched card's corner. Rendered as a
 * span by default because it usually sits inside a larger link — nesting two
 * interactive elements would break keyboard navigation.
 */
export function ArrowTile({ tone = 'ink', className = '', as: Tag = 'span', ...props }) {
  const tones = {
    ink: 'bg-ink text-paper group-hover:bg-accent',
    accent: 'bg-accent text-white group-hover:bg-ink',
    paper: 'bg-paper text-ink group-hover:bg-accent group-hover:text-white',
  }
  return (
    <Tag
      aria-hidden={Tag === 'span' ? 'true' : undefined}
      className={`grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-300 sm:h-16 sm:w-16 ${tones[tone]} ${className}`}
      {...props}
    >
      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
    </Tag>
  )
}
