import { motion, useReducedMotion } from 'motion/react'
import { site, values } from '../../data/site'
import { photos } from '../../data/images'
import Button from '../ui/Button'
import Photo from '../ui/Photo'

/**
 * Asymmetric hero: the headline breaks across a 12-column grid while the site
 * photograph runs off the right edge. The three commitments sit on the baseline
 * where a template would normally park invented statistics.
 */
export default function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
        }

  return (
    <section className="relative overflow-hidden bg-paper pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />

      <div className="shell relative">
        <motion.p {...rise(0)} className="label text-accent">
          {site.tagline}
        </motion.p>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.h1 {...rise(0.08)} className="display-tight text-hero font-bold">
              Building the
              <br />
              structures a
              <br />
              <span className="text-accent">community</span> depends on
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className="text-lead mt-8 max-w-xl text-muted"
            >
              {site.intro}
            </motion.p>

            <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap items-center gap-4">
              <Button to="/contact" size="lg">
                Get a free consultation
              </Button>
              <Button to="/projects" variant="outline" size="lg" arrow={false}>
                See recent work
              </Button>
            </motion.div>
          </div>

          {/* Photograph bleeds past the shell on large screens so the composition
              is not a tidy centred box. */}
          <motion.div
            {...rise(0.16)}
            className="relative lg:col-span-5 lg:-mr-[max(0px,calc((100vw-84rem)/2+2.5rem))]"
          >
            <Photo
              photo={photos.heroSite}
              ratio="4/5"
              priority
              width={1200}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full rounded-[1.75rem] lg:rounded-r-none"
            />
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-ink/85 px-4 py-2 backdrop-blur-sm">
              <p className="label text-paper">On site · {site.region}</p>
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.34)}
          className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-line sm:mt-20 sm:grid-cols-3"
        >
          {values.map((value) => (
            <div key={value.id} className="bg-paper p-6 sm:p-7">
              <dt className="display-tight text-lg font-semibold sm:text-xl">{value.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{value.body}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
