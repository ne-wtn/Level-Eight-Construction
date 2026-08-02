import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../../data/site'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Condense the bar once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes the drawer.
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock the page behind the open drawer, and let Esc dismiss it.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const linkClass = ({ isActive }) =>
    `relative py-1 text-[0.9375rem] transition-colors duration-200 ${
      isActive ? 'text-ink' : 'text-muted hover:text-ink'
    } after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="shell">
          <div
            className={`flex items-center justify-between gap-6 rounded-full border px-5 py-3 transition-all duration-500 ease-[var(--ease-out-expo)] sm:px-6 ${
              scrolled
                ? 'border-line bg-paper/85 shadow-[0_8px_30px_-12px_rgba(11,11,12,0.18)] backdrop-blur-xl'
                : 'border-transparent bg-transparent'
            }`}
          >
            <Link to="/" className="shrink-0" aria-label={`${site.name} — home`}>
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Wrapped rather than given `hidden sm:inline-flex`: Button's own
                  base class sets `inline-flex`, and the two display utilities
                  collide unpredictably depending on stylesheet order. */}
              <span className="hidden sm:block">
              <Button to="/contact" size="sm">
                Get in Touch
              </Button>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen drawer. Kept mounted-on-open only, so nothing focusable
          sits behind the page when it is closed. */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-90 flex flex-col bg-ink text-paper lg:hidden"
        >
          <div className="shell flex items-center justify-between py-4">
            <Logo className="text-paper" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              autoFocus
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.to} className="border-b border-white/10 last:border-0">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-5 ${isActive ? 'text-accent' : 'text-paper'}`
                    }
                  >
                    <span className="label text-muted-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="display-tight text-3xl font-semibold sm:text-4xl">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shell pb-10">
            <Button to="/contact" variant="accent" size="lg" className="w-full">
              Start a conversation
            </Button>
            <p className="label mt-6 text-muted-dark">{site.tagline}</p>
          </div>
        </div>
      )}
    </>
  )
}
