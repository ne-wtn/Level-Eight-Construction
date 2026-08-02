import { nav } from '../data/site'
import Button from '../components/ui/Button'
import { SectionLabel } from '../components/ui/Section'
import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found — Level Eight')

  return (
    <section className="relative overflow-hidden bg-paper pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div className="shell relative">
        <SectionLabel>Error 404</SectionLabel>

        <h1 className="display-tight text-hero mt-6 max-w-3xl font-bold">
          This one isn&rsquo;t on the <span className="text-accent">drawings.</span>
        </h1>

        <p className="text-lead mt-7 max-w-xl text-muted">
          The page you were looking for has moved or never existed. Everything else is
          still where it should be.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/" size="lg">
            Back to home
          </Button>
          <Button to="/contact" variant="outline" size="lg" arrow={false}>
            Contact us
          </Button>
        </div>

        <nav aria-label="All pages" className="mt-16 border-t border-line pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="label text-muted transition-colors duration-200 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
