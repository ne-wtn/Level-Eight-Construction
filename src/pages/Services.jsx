import { Check } from 'lucide-react'
import { services } from '../data/services'
import PageHero from '../components/sections/PageHero'
import ProcessSteps from '../components/sections/ProcessSteps'
import CTABand from '../components/sections/CTABand'
import Marquee from '../components/sections/Marquee'
import { SectionLabel } from '../components/ui/Section'
import Button from '../components/ui/Button'
import Photo from '../components/ui/Photo'
import Reveal from '../components/ui/Reveal'
import usePageTitle from '../hooks/usePageTitle'

export default function Services() {
  usePageTitle(
    'Services - Level Eight',
    'Construction, renovation and finishes, and full project management across Tanzania. What each service includes, what you receive, and who it suits.',
  )

  return (
    <>
      <PageHero
        label="What we do"
        title="Three services, one"
        accent="accountable team."
        lede="Every project gets the same documented, hands-on process regardless of scale. Below is exactly what each service covers, what you receive, and where it fits."
      >
        {/* Jump list — the breakdown below is long, so give people a way past it. */}
        <nav aria-label="Services" className="mt-10 flex flex-wrap gap-3">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="label rounded-full border border-ink/15 px-5 py-2.5 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
            >
              {service.number} — {service.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <Marquee />

      {services.map((service, i) => (
        <ServiceBreakdown key={service.id} service={service} flip={i % 2 === 1} index={i} />
      ))}

      <ProcessSteps tone="surface" />
      <CTABand />
    </>
  )
}

/**
 * One full service. Alternating sides stop three long sections from reading as
 * a stack of identical blocks; `scroll-mt` keeps the heading clear of the fixed
 * header when linked to by anchor.
 */
function ServiceBreakdown({ service, flip, index }) {
  const tone = index % 2 === 0 ? 'bg-paper' : 'bg-surface'

  return (
    <section id={service.id} className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${tone}`}>
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal className={flip ? 'lg:order-2' : ''}>
            <SectionLabel>Service {service.number}</SectionLabel>

            <h2 className="display-tight text-display mt-5 font-bold">{service.name}</h2>

            <p className="text-lead mt-6 max-w-xl">{service.summary}</p>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
              {service.scope}
            </p>

            <div className="mt-10">
              <h3 className="label text-accent">What&rsquo;s included</h3>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-ink text-paper"
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button to="/contact" className="mt-10">
              Discuss a {service.name.toLowerCase()} project
            </Button>
          </Reveal>

          <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
            <Photo
              photo={service.photo}
              ratio="4/3"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-[1.75rem]"
            />

            <div className="mt-5 rounded-[1.75rem] bg-ink p-7 text-paper sm:p-8">
              <h3 className="label text-accent">What you receive</h3>
              <ul className="mt-5 flex flex-col divide-y divide-ink-line">
                {service.deliverables.map((item) => (
                  <li key={item} className="py-3.5 text-[0.9375rem] leading-relaxed first:pt-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-ink-line pt-5 text-sm text-muted-dark">
                <span className="label text-paper">Best suited to</span>
                <br />
                {service.idealFor}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
