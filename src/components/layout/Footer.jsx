import { Link } from 'react-router-dom'
import { site, nav } from '../../data/site'
import { services } from '../../data/services'
import Logo from '../ui/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="grain relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="blueprint-dark absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="grain-layer opacity-20" />

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="text-paper" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-dark">
              {site.tagline}: building institutional and residential structures with honesty
              and craft, across {site.region}.
            </p>
          </div>

          <FooterCol title="Explore">
            {nav.map((item) => (
              <FooterLink key={item.to} to={item.to}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((service) => (
              <FooterLink key={service.id} to={`/services#${service.id}`}>
                {service.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-[0.9375rem] text-muted-dark transition-colors duration-200 hover:text-paper"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="text-[0.9375rem] text-muted-dark transition-colors duration-200 hover:text-paper"
              >
                {site.contact.phone}
              </a>
            </li>
            <li className="text-[0.9375rem] text-muted-dark">
              {site.contact.addressLines.join(', ')}
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-ink-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-muted-dark">
            © {year} {site.name} — All rights reserved
          </p>
          <ul className="flex flex-wrap items-center gap-6">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="label text-muted-dark transition-colors duration-200 hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h2 className="label text-accent">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-[0.9375rem] text-muted-dark transition-colors duration-200 hover:text-paper"
      >
        {children}
      </Link>
    </li>
  )
}
