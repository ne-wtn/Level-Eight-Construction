import { motion, useReducedMotion } from 'motion/react'
import { SectionLabel } from '../ui/Section'

/** Consistent masthead for every page below the home page. */
export default function PageHero({ label, title, accent, lede, children }) {
  const reduced = useReducedMotion()
  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        }

  return (
    <section className="relative overflow-hidden bg-paper pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="shell relative">
        <motion.div {...rise(0)}>
          <SectionLabel>{label}</SectionLabel>
        </motion.div>

        <motion.h1 {...rise(0.08)} className="display-tight text-hero mt-6 max-w-4xl font-bold">
          {title} {accent && <span className="text-accent">{accent}</span>}
        </motion.h1>

        {lede && (
          <motion.p {...rise(0.16)} className="text-lead mt-7 max-w-2xl text-muted">
            {lede}
          </motion.p>
        )}

        {children && <motion.div {...rise(0.24)}>{children}</motion.div>}
      </div>
    </section>
  )
}
