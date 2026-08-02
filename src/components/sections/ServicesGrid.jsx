import { services } from '../../data/services'
import Section, { SectionHeading, SectionLabel } from '../ui/Section'
import NotchCard from '../ui/NotchCard'
import Reveal from '../ui/Reveal'

/**
 * Three service cards. The first is accent-filled, echoing the template's
 * emphasis on the lead offering; the rest sit on surface grey.
 */
export default function ServicesGrid() {
  return (
    <Section id="services" tone="paper">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel>What we do</SectionLabel>
          <SectionHeading className="mt-5 max-w-lg">
            Every project, treated with the same care
          </SectionHeading>
        </div>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          From foundation to final walkthrough — three services, one accountable team, and
          the same documented process regardless of scale.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08}>
            <NotchCard
              to={`/services#${service.id}`}
              tone={i === 0 ? 'accent' : 'surface'}
              className="h-full"
              bodyClassName="flex h-full flex-col p-7 sm:p-8"
            >
              <span
                className={`label ${i === 0 ? 'text-white/70' : 'text-accent'}`}
              >
                {service.number}
              </span>

              <h3 className="display-tight mt-6 text-2xl font-semibold sm:text-[1.75rem]">
                {service.name}
              </h3>

              <p
                className={`mt-4 max-w-xs text-[0.9375rem] leading-relaxed ${
                  i === 0 ? 'text-white/85' : 'text-muted'
                }`}
              >
                {service.summary}
              </p>

              <span
                className={`mt-auto pt-10 text-sm underline underline-offset-4 ${
                  i === 0 ? 'text-white' : 'text-ink'
                }`}
              >
                Learn more
              </span>
            </NotchCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
