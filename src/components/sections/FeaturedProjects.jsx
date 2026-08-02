import { Link } from 'react-router-dom'
import { featuredProjects } from '../../data/projects'
import { SectionHeading, SectionLabel } from '../ui/Section'
import { ArrowTile } from '../ui/Button'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'

/**
 * The dark band. Inverted card treatment on ink, with the notch ring drawn in
 * the section's own colour so the corner still reads as cut.
 */
export default function FeaturedProjects() {
  return (
    <section className="bg-paper pb-20 sm:pb-28 lg:pb-32">
      <div className="shell">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-ink px-5 py-16 text-paper sm:px-10 sm:py-20 lg:px-14">
          <div aria-hidden="true" className="blueprint-dark absolute inset-0 opacity-50" />
          <div aria-hidden="true" className="grain-layer opacity-25" />

          <div className="relative">
            <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>Recent work</SectionLabel>
                <SectionHeading className="mt-5 max-w-xl">
                  Projects underway and completed
                </SectionHeading>
              </div>
              <Button to="/projects" variant="ghostDark" className="shrink-0" arrow={false}>
                View full gallery
              </Button>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.slice(0, 6).map((project, i) => (
                <Reveal key={project.id} delay={i * 0.06}>
                  <Link
                    to="/projects"
                    className="notch-host group block h-full rounded-[1.5rem] bg-ink-soft pr-4 pb-4 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                    style={{ '--notch-bg': 'var(--color-ink)' }}
                  >
                    <Photo
                      photo={project.photo}
                      ratio="4/3"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="rounded-[1.25rem] rounded-br-none"
                      imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                    />
                    {/* Right padding clears the arrow tile seated in the
                        corner, so the caption never runs underneath it. */}
                    <div className="p-6 pr-20 sm:pr-24">
                      <p className="label text-accent">{project.category}</p>
                      <h3 className="display-tight mt-3 text-xl font-semibold">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-dark">
                        {project.caption}
                      </p>
                    </div>
                    <ArrowTile
                      tone="accent"
                      className="notch-action"
                      style={{ '--notch-bg': 'var(--color-ink)' }}
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
