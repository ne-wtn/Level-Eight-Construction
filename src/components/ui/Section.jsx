/**
 * Section scaffolding: the label eyebrow, the display heading, and the shell
 * that keeps every page on the same measure.
 */

export function SectionLabel({ children, tone = 'accent', className = '' }) {
  const tones = {
    accent: 'text-accent',
    muted: 'text-muted',
    paper: 'text-muted-dark',
  }
  return (
    <span className={`label inline-flex items-center gap-2.5 ${tones[tone]} ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  )
}

export function SectionHeading({ as: Tag = 'h2', size = 'display', className = '', children }) {
  const sizes = {
    display: 'text-display',
    title: 'text-title',
  }
  return (
    <Tag className={`display-tight ${sizes[size]} ${className}`}>{children}</Tag>
  )
}

export function Shell({ className = '', children }) {
  return <div className={`shell ${className}`}>{children}</div>
}

export default function Section({
  id,
  tone = 'paper',
  className = '',
  innerClassName = '',
  children,
}) {
  const tones = {
    paper: 'bg-paper text-ink',
    surface: 'bg-surface text-ink',
    ink: 'bg-ink text-paper',
    none: '',
  }
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 lg:py-32 ${className}`}>
      <div className={`shell ${innerClassName}`}>{children}</div>
    </section>
  )
}
