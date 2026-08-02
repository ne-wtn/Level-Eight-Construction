import { photos } from './images'

/**
 * Gallery entries.
 *
 * Level Eight has not published named projects with clients, locations or dates,
 * so nothing here invents one. Each entry is built from the captions the company
 * uses for its own site photography ("Completed Structure", "Roofline Detail",
 * "Finished & Unfinished, Same Frame", the national hospital campus build).
 * Replace `title`/`caption`/`photo` per project once real case studies exist.
 */

export const categories = [
  'All',
  'Institutional',
  'Residential',
  'Renovation & Finishes',
  'Fabrication',
]

export const projects = [
  {
    id: 'full-site-context',
    title: 'Full Site Context',
    category: 'Institutional',
    caption: 'The whole footprint read in a single frame, deck poured and set out.',
    photo: photos.siteOverhead,
    featured: true,
    // Anchors the unfiltered gallery as a 2×2 tile. Only one project may carry
    // this — see ProjectGallery for why the count has to stay exact.
    hero: true,
  },
  {
    id: 'hospital-campus',
    title: 'National Hospital Campus',
    category: 'Institutional',
    caption: 'Inside a national hospital campus build — the largest scope we document end to end.',
    photo: photos.buildingWhite,
    featured: true,
  },
  {
    id: 'completed-structure',
    title: 'Completed Structure',
    category: 'Institutional',
    caption: 'The finished envelope, inspected and handed over to the people who use it.',
    photo: photos.buildingModern,
    featured: true,
  },
  {
    id: 'structure-before-skin',
    title: 'Structure Before Skin',
    category: 'Institutional',
    caption: 'What holds a building together, photographed before any finish goes near it.',
    photo: photos.towerStepped,
    featured: true,
  },
  {
    id: 'project-overview',
    title: 'Project Overview',
    category: 'Institutional',
    caption: 'Elevation and massing on a completed multi-storey build.',
    photo: photos.buildingUp,
  },
  {
    id: 'facade-detail',
    title: 'Facade Detail',
    category: 'Institutional',
    caption: 'Panel alignment across a curved elevation — the tolerance nobody notices when it is right.',
    photo: photos.facadeCurve,
  },
  {
    id: 'residential-handover',
    title: 'Residential Handover',
    category: 'Residential',
    caption: 'A private build walked through with the client before the keys change hands.',
    photo: photos.villaPool,
    featured: true,
  },
  {
    id: 'finished-home',
    title: 'Finished Home, Dusk',
    category: 'Residential',
    caption: 'Lights on, snags closed, the day a house stops being a site.',
    photo: photos.houseDusk,
  },
  {
    id: 'interior-complete',
    title: 'Interior, Complete',
    category: 'Residential',
    caption: 'Stair, glazing and floor levels meeting exactly where the drawings said they would.',
    photo: photos.interiorComplete,
  },
  {
    id: 'same-frame',
    title: 'Finished & Unfinished, Same Frame',
    category: 'Renovation & Finishes',
    caption: 'Two states of the same building, captured together — the honest version of a progress shot.',
    photo: photos.gutRenovation,
    featured: true,
  },
  {
    id: 'details-unseen',
    title: 'The Details Most People Never See',
    category: 'Renovation & Finishes',
    caption: 'Tile, trim and the joins that quietly decide whether a room reads finished.',
    photo: photos.tileDetail,
  },
  {
    id: 'transformation',
    title: 'Transformation, Same Real Space',
    category: 'Renovation & Finishes',
    caption: 'Before and after inside one room — same walls, rebuilt to a higher standard.',
    photo: photos.interiorWarm,
  },
  {
    id: 'roofline-detail',
    title: 'Roofline Detail',
    category: 'Fabrication',
    caption: 'Rafters set and checked by eye before the roof covering goes on.',
    photo: photos.timberFrame,
  },
  {
    id: 'weld-by-weld',
    title: 'Weld by Weld',
    category: 'Fabrication',
    caption: 'Hand-fabricated components, made to the measurement rather than to the nearest fit.',
    photo: photos.fabrication,
  },
  {
    id: 'measured-twice',
    title: 'Measured Twice, Built Once',
    category: 'Fabrication',
    caption: 'Fixings set out and verified on site, because a drawing is not a guarantee.',
    photo: photos.measuring,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
