import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { promises, site } from '../data/site'
import PageHero from '../components/sections/PageHero'
import ContactForm from '../features/contact/ContactForm'
import Reveal from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/Section'
import usePageTitle from '../hooks/usePageTitle'

export default function Contact() {
  usePageTitle(
    'Contact — Level Eight',
    'Start a conversation about your project. Free initial consultation, honest timelines, and a team that follows up.',
  )

  return (
    <>
      <PageHero
        label="Get in touch"
        title="Let's build something"
        accent="that lasts."
        lede="Whether it's a full institutional build, a renovation, or finishing work, tell us about your project and our team will follow up to discuss scope and timeline."
      />

      <section className="bg-paper pb-20 sm:pb-28 lg:pb-32">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal className="flex flex-col gap-8">
            <div>
              <SectionLabel>Direct</SectionLabel>
              <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
                <ContactRow icon={Mail} label="Email" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </ContactRow>
                <ContactRow icon={Phone} label="Phone" href={`tel:${site.contact.phoneHref}`}>
                  {site.contact.phone}
                </ContactRow>
                <ContactRow icon={MapPin} label="Based in">
                  {site.contact.addressLines.join(', ')}
                </ContactRow>
                <ContactRow icon={Clock} label="Hours">
                  {site.contact.hours}
                </ContactRow>
              </ul>

              {site.contact.isPlaceholder && (
                <p className="label mt-5 text-muted">
                  Placeholder contact details — to be replaced before launch.
                </p>
              )}
            </div>

            <div className="rounded-[1.75rem] bg-surface p-7 sm:p-8">
              <h2 className="label text-accent">What happens next</h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-start gap-3 text-[0.9375rem]">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-paper"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                We walk every site personally before quoting, so the first conversation is
                about scope and constraints — not a number pulled out of the air.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="sr-only">Start a conversation</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function ContactRow({ icon: Icon, label, href, children }) {
  const body = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="label block text-muted">{label}</span>
        <span className="mt-1 block text-[0.9375rem] break-words">{children}</span>
      </span>
    </>
  )

  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-center gap-4 py-5">
          {body}
        </a>
      ) : (
        <div className="group flex items-center gap-4 py-5">{body}</div>
      )}
    </li>
  )
}
