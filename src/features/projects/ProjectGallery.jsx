import { useMemo, useState } from 'react'
import { categories, projects } from '../../data/projects'
import Photo from '../../components/ui/Photo'
import Lightbox from '../../components/ui/Lightbox'
import Reveal from '../../components/ui/Reveal'
import { Maximize2 } from 'lucide-react'

/**
 * Filterable gallery.
 *
 * Strictly aligned 3-column grid, every tile 4:3, plus one 2×2 hero tile in the
 * unfiltered view. The counts are chosen so both states tile exactly with no
 * holes: 15 projects = 1 hero (2×2, taking two cells of rows 1–2) + 14 uniform
 * tiles, and each individual category holds a multiple of three. Mixed aspect
 * ratios were tried first and left ragged gaps between rows.
 *
 * The hero span is dropped while a filter is active, so a short result set can
 * never strand an empty cell.
 */
export default function ProjectGallery() {
  const [active, setActive] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  const counts = useMemo(() => {
    const map = { All: projects.length }
    for (const project of projects) {
      map[project.category] = (map[project.category] ?? 0) + 1
    }
    return map
  }, [])

  const selectCategory = (category) => {
    setActive(category)
    setOpenIndex(null) // indices belong to the filtered list, so reset on change
  }

  return (
    <>
      <div className="shell pb-20 sm:pb-28 lg:pb-32">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2.5 border-b border-line pb-8"
        >
          {categories.map((category) => {
            const isActive = active === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                aria-pressed={isActive}
                className={`label flex items-center gap-2 rounded-full border px-5 py-2.5 transition-colors duration-300 ${
                  isActive
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/15 text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {category}
                <span className={isActive ? 'text-accent' : 'text-line'}>
                  {counts[category] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Announce the result count for screen-reader users after filtering. */}
        <p aria-live="polite" className="label mt-6 text-muted">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {active !== 'All' && ` in ${active}`}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => {
            const isHero = project.hero && active === 'All'
            return (
            <Reveal
              key={project.id}
              delay={Math.min(i, 6) * 0.05}
              className={isHero ? 'sm:col-span-2 sm:row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] text-left"
              >
                {/* The hero tile fills the 2×2 area it was given, so it takes
                    its height from the grid rather than an aspect ratio. */}
                <Photo
                  photo={project.photo}
                  ratio={isHero ? null : '4/3'}
                  width={isHero ? 1600 : 1000}
                  sizes={
                    isHero
                      ? '(min-width: 640px) 67vw, 100vw'
                      : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                  }
                  className={isHero ? 'h-full min-h-64' : ''}
                  imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                />

                {/* Caption plate rises on hover; on touch it is simply always
                    visible because there is no hover to wait for. The scrim has
                    to survive pale images (tile, render-white facades), hence
                    the near-opaque base. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent"
                />

                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <span className="min-w-0">
                    <span className="label block text-accent">{project.category}</span>
                    <span
                      className={`display-tight mt-2 block font-semibold text-paper ${
                        isHero ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                      }`}
                    >
                      {project.title}
                    </span>
                    <span className="mt-1.5 block max-w-[46ch] text-sm leading-relaxed text-paper/75 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100">
                      {project.caption}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </span>

                <span className="sr-only">View {project.title} full size</span>
              </button>
            </Reveal>
            )
          })}
        </div>
      </div>

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={setOpenIndex}
      />
    </>
  )
}
