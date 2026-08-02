import { Star } from 'lucide-react'
import { testimonials, testimonialsDisclaimer } from '../../data/testimonials'
import Section, { SectionHeading, SectionLabel } from '../ui/Section'
import Reveal from '../ui/Reveal'
import { site } from '../../data/site'

/**
 * Reviews are attributed by initials only, so a monogram tile stands in for a
 * portrait. A stock headshot here would imply a real person's face against a
 * quote the company itself flags as a placeholder.
 */
export default function Testimonials() {
  return (
    <Section tone="surface">
      <Reveal className="max-w-2xl">
        <SectionLabel>What our clients say</SectionLabel>
        <SectionHeading className="mt-5">
          Trusted by clients across {site.region}
        </SectionHeading>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal
            key={item.id}
            delay={i * 0.08}
            className="flex flex-col rounded-[1.75rem] bg-paper p-7 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1" role="img" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                ))}
              </div>
              <span className="label text-line" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <blockquote className="display-tight mt-7 flex-1 text-lg leading-snug font-medium sm:text-xl">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-3.5 border-t border-line pt-6">
              <span
                aria-hidden="true"
                className="label grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-paper"
              >
                {item.author.replace(/[^A-Z]/g, '').slice(0, 2)}
              </span>
              <span className="text-sm font-medium">{item.author}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <p className="label mt-8 text-muted">{testimonialsDisclaimer}</p>
    </Section>
  )
}
