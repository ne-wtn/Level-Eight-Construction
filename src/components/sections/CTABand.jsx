import { Check } from 'lucide-react'
import { promises } from '../../data/site'
import { photos } from '../../data/images'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'

/**
 * Closing call to action. The headline splits across two weights — the second
 * line set wide and in accent — so it lands as a statement rather than a banner.
 */
export default function CTABand() {
  return (
    <section className="bg-paper pb-20 sm:pb-28 lg:pb-32">
      <div className="shell">
        <div className="grid overflow-hidden rounded-[2rem] bg-surface lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1 lg:p-14">
            <Reveal>
              <h2 className="display-tight text-display font-bold">
                Ready to build
                <br />
                <span className="display-wide text-accent">what lasts?</span>
              </h2>
              <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Whether it&rsquo;s a full institutional build, a renovation, or finishing
                work, tell us about your project and our team will follow up to discuss
                scope and timeline.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-center gap-3 text-[0.9375rem]">
                    <span
                      aria-hidden="true"
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>

              <Button to="/contact" size="lg" className="mt-10 self-start">
                Start a conversation
              </Button>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            {/* Fills the row height set by the copy column beside it. */}
            <Photo
              photo={photos.columnsRebar}
              ratio={null}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full min-h-72"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
