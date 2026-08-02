import { motion, useReducedMotion } from 'motion/react'

/**
 * Scroll-triggered reveal. Returns a plain element when the OS asks for reduced
 * motion, so nothing animates and nothing starts hidden.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 22,
  className = '',
  children,
  ...props
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
