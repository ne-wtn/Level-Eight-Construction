import { values, site } from '../data/site'
import { photos } from '../data/images'
import PageHero from '../components/sections/PageHero'
import ProcessSteps from '../components/sections/ProcessSteps'
import Testimonials from '../components/sections/Testimonials'
import CTABand from '../components/sections/CTABand'
import Marquee from '../components/sections/Marquee'
import Section, { SectionHeading, SectionLabel } from '../components/ui/Section'
import Photo from '../components/ui/Photo'
import Reveal from '../components/ui/Reveal'
import usePageTitle from '../hooks/usePageTitle'

export default function About() {
  usePageTitle(
    'About — Level Eight',
    'Who Level Eight is, how we work, and the three commitments behind every build: honest communication, quality craftsmanship, and real accountability.',
  )

  return (
    <>
      <PageHero
        label="About us"
        title="Your vision,"
        accent="our expertise."
        lede={site.intro}
      />

      <Marquee />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading>
              Built on what happens between the drawings and the handover
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 text-[0.9375rem] leading-relaxed text-muted">
            <p>
              Level Eight takes on full institutional and commercial builds, residential
              renovations, and finishing work. The scale changes from project to project;
              the process does not.
            </p>
            <p>
              Most of what goes wrong on a construction project is not technical. It is a
              scope that was never written down, a date nobody committed to in writing, or
              a crew that cannot be identified when something needs fixing. We built the
              way we work around closing those gaps.
            </p>
            <p>
              That means real measurements and a documented scope before pricing. Personal
              site assessment before a single material is ordered. Branded crews who
              document their own work as it happens. And a final walkthrough you attend
              before anyone calls the project finished.
            </p>
          </Reveal>
        </div>

        {/* Two-frame band: the site, and the finished result. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-5">
          <Reveal className="sm:col-span-3">
            <Photo
              photo={photos.siteOverhead}
              ratio="16/10"
              sizes="(min-width: 640px) 60vw, 100vw"
              className="rounded-[1.75rem]"
            />
          </Reveal>
          {/* Stretched to match the taller frame beside it, so `ratio` is off
              and the height comes from the grid row instead. */}
          <Reveal delay={0.08} className="sm:col-span-2">
            <Photo
              photo={photos.corridor}
              ratio={null}
              sizes="(min-width: 640px) 40vw, 100vw"
              className="h-full min-h-56 rounded-[1.75rem]"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <Reveal className="max-w-2xl">
          <SectionLabel>Why Level Eight</SectionLabel>
          <SectionHeading className="mt-5">
            Three commitments, on every project
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-ink-line lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal
              key={value.id}
              delay={i * 0.08}
              className="bg-ink p-8 sm:p-9"
            >
              <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display-tight mt-6 text-2xl font-semibold">{value.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-dark">
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProcessSteps tone="surface" />
      <Testimonials />
      <CTABand />
    </>
  )
}
