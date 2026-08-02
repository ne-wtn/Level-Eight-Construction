import { process } from '../../data/services'
import Section, { SectionHeading, SectionLabel } from '../ui/Section'
import Reveal from '../ui/Reveal'

/**
 * The four-step process, set as a drawing sheet: tracked-out numerals on a
 * ruled column, so it reads as a schedule rather than four generic cards.
 */
export default function ProcessSteps({ tone = 'paper' }) {
  return (
    <Section tone={tone}>
      <Reveal className="max-w-2xl">
        <SectionLabel>Our process</SectionLabel>
        <SectionHeading className="mt-5">
          From first walkthrough to final handover
        </SectionHeading>
      </Reveal>

      <ol className="mt-14 border-t border-line">
        {process.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 0.06}
            className="group grid gap-4 border-b border-line py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
          >
            <span className="label text-accent sm:col-span-1">{step.number}</span>

            <h3 className="display-tight text-2xl font-semibold sm:col-span-4 sm:text-[1.75rem]">
              {step.title}
            </h3>

            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:col-span-7">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
