import { values } from '../../data/site'
import { faqs } from '../../data/faqs'
import Section, { SectionHeading, SectionLabel } from '../ui/Section'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

/**
 * Split section: the argument on the left, the disclosure list on the right —
 * the values first, then the questions clients actually ask.
 */
export default function WhyUs() {
  const items = [
    ...values.map((v) => ({ id: v.id, title: v.title, body: v.body })),
    ...faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer })),
  ]

  return (
    <Section tone="paper">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>Why Level Eight</SectionLabel>
          <SectionHeading className="mt-5">
            Why clients keep the same team on the next build
          </SectionHeading>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted">
            No hidden scopes, no anonymous crews, no date that moves quietly. The things
            that go wrong on a build site are rarely technical — they are almost always
            about what someone did not say.
          </p>
          <Button to="/contact" size="lg" className="mt-9">
            Start your project
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </Section>
  )
}
