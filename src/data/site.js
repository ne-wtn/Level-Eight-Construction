/**
 * Company-level facts and navigation.
 *
 * Copy here is taken from Level Eight's own material. Anything the company has
 * not published yet is marked PLACEHOLDER and listed in the README so it can be
 * replaced before launch — nothing below should be treated as verified fact
 * unless it is unmarked.
 */

export const site = {
  name: 'Level Eight',
  wordmark: 'LEVEL EIGHT',
  tagline: 'Your Vision, Our Expertise',
  headline: 'Building the structures a community depends on',
  region: 'Tanzania',
  intro:
    'Level Eight delivers full-scale residential and institutional construction, renovation and finishes, and hands-on project management across Tanzania — documented from the first survey to the final walkthrough.',

  // PLACEHOLDER — Level Eight has not published contact details publicly.
  // Replace all four before launch.
  contact: {
    email: 'hello@leveleight.co.tz',
    phone: '+255 000 000 000',
    phoneHref: '+255000000000',
    addressLines: ['Dar es Salaam', 'Tanzania'],
    hours: 'Mon–Fri, 08:00 – 17:00 EAT',
    isPlaceholder: true,
  },

  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

/** The three commitments that replace the usual invented "500+ projects" stats. */
export const values = [
  {
    id: 'communication',
    title: 'Honest Communication',
    body: 'Clear scopes, real timelines, and a team that tells you the truth about your project before, during, and after.',
  },
  {
    id: 'craft',
    title: 'Quality Craftsmanship',
    body: 'Every detail, down to the weld on a gate hinge, treated with the same precision as the finished facade.',
  },
  {
    id: 'accountability',
    title: 'Real Accountability',
    body: 'Branded, identifiable crews on every site, documenting the work as it happens, not just at handover.',
  },
]

/** Short proof points used in the hero strip and the contact page. */
export const promises = [
  'Free initial project consultation',
  'Honest, documented timelines',
  'Real, branded crews on every site',
]
