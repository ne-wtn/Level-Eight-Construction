import { photos } from './images'

/**
 * The three services Level Eight offers. `summary` is the company's own wording;
 * `scope`, `includes` and `deliverables` expand that into the detailed breakdown
 * shown on /services.
 */
export const services = [
  {
    id: 'construction',
    number: '01',
    name: 'Construction',
    summary:
      'Full-scale residential and institutional builds, managed with precision from the first survey to the last inspection.',
    scope:
      'We take buildings from a surveyed plot to a signed-off structure. Institutional campuses, commercial shells, and private residential builds all run through the same documented process — the scale changes, the standard does not.',
    photo: photos.columnsRebar,
    includes: [
      'Site survey, setting out, and ground works',
      'Reinforced concrete frames, columns, and slabs',
      'Masonry, roofing, and building envelope',
      'Structural steel and on-site fabrication',
      'Services first-fix coordinated with the frame',
      'Statutory inspections booked and attended',
    ],
    deliverables: [
      'Documented scope before a single material is ordered',
      'Progress photography from the crew doing the work',
      'A structure inspected at every stage, not only at handover',
    ],
    idealFor: 'Institutional campuses, commercial shells, and full residential builds.',
  },
  {
    id: 'renovation',
    number: '02',
    name: 'Renovation & Finishes',
    summary:
      "Transforming existing structures while respecting what's there and rebuilding it to a higher standard.",
    scope:
      'Working inside a building that already exists is a different discipline to building from nothing. We open up carefully, find out what is actually behind the wall, and rebuild it properly — rather than covering the problem with a finish.',
    photo: photos.gutRenovation,
    includes: [
      'Condition survey and strip-out planning',
      'Structural alterations, openings, and making good',
      'Replastering, screeding, and substrate preparation',
      'Tiling, joinery, and internal finishes',
      'Doors, ironmongery, and fixed fittings',
      'Painting, decoration, and snagging to completion',
    ],
    deliverables: [
      'An honest condition report before pricing the work',
      'A clean, protected site while your building stays in use',
      'A snag list closed out with you, not filed away',
    ],
    idealFor: 'Occupied buildings, tired interiors, and phased upgrade programmes.',
  },
  {
    id: 'project-management',
    number: '03',
    name: 'Project Management',
    summary:
      "Honest timelines, clear communication, and a team that treats every site like it's their own.",
    scope:
      'Full project management: planning, documentation, on-site construction, and a final walkthrough before we consider anything complete. One team accountable for the whole thing, so there is nobody left to point at when a date slips.',
    photo: photos.drawings,
    includes: [
      'Programme, sequencing, and realistic milestone dates',
      'Budget tracking with variations agreed in writing',
      'Procurement and subcontractor coordination',
      'Personal site inspections at every stage',
      'Single point of contact for the whole project',
      'Handover pack and final walkthrough',
    ],
    deliverables: [
      'A programme you were shown before it was committed to',
      'Written updates while the work is happening',
      'A walkthrough you attend before we call it finished',
    ],
    idealFor: 'Clients running multiple trades, or anyone who wants one accountable team.',
  },
]

/** The four-step delivery process, in Level Eight's own words. */
export const process = [
  {
    number: '01',
    title: 'Planning & Documentation',
    body: 'Every project starts with real measurements, real drawings, and a documented scope.',
  },
  {
    number: '02',
    title: 'Site Assessment',
    body: 'Our team walks every site personally before a single material is ordered.',
  },
  {
    number: '03',
    title: 'Construction & Craft',
    body: 'Fabrication, structure, and finishing, built by hand and checked by eye.',
  },
  {
    number: '04',
    title: 'Final Walkthrough',
    body: "We don't consider a project finished until you've walked it with us.",
  },
]
