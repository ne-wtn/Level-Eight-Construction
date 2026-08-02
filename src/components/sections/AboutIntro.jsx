import { photos } from '../../data/images'
import Section, { SectionHeading, SectionLabel } from '../ui/Section'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'

export default function AboutIntro() {
  return (
    <Section tone="surface">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionLabel>About us</SectionLabel>
          <SectionHeading className="mt-5">
            The details that don&rsquo;t show up in a photo, but show up in the result
          </SectionHeading>
          <div className="mt-7 flex flex-col gap-5 text-[0.9375rem] leading-relaxed text-muted">
            <p>
              Level Eight builds institutional and residential structures across Tanzania —
              full builds, renovations, and the finishing work that decides whether a space
              actually feels finished.
            </p>
            <p>
              Every project starts with real measurements and a documented scope, and ends
              with a walkthrough you attend in person. In between, our crews work in
              branded, identifiable gear and document their own process as it happens, not
              only at handover.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/about">More about Level Eight</Button>
            <Button to="/projects" variant="outline" arrow={false}>
              View projects
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <Photo
            photo={photos.crewLookingUp}
            ratio="5/4"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-[1.75rem]"
          />
          {/* Overlapping quote block breaks the image edge rather than sitting
              politely beside it. */}
          <div className="relative -mt-12 ml-6 mr-6 rounded-[1.5rem] bg-ink p-6 text-paper sm:-mt-16 sm:ml-10 sm:mr-12 sm:p-8">
            <p className="display-tight text-lg leading-snug font-medium sm:text-xl">
              &ldquo;We don&rsquo;t consider a project finished until you&rsquo;ve walked it
              with us.&rdquo;
            </p>
            <p className="label mt-4 text-accent">Level Eight &mdash; final walkthrough</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
