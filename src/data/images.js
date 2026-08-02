/**
 * Every photograph on the site is referenced from this one file.
 *
 * These are curated Unsplash CDN photographs standing in for Level Eight's own
 * site photography. To go live with real assets, either swap the `photo-…` ids
 * below or change `src()` to point at locally hosted files — no component needs
 * to change.
 */

const UNSPLASH = 'https://images.unsplash.com/photo-'

/** Build a single, sensibly compressed URL for a given intrinsic width. */
export function src(id, width = 1400) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=72`
}

/** Responsive candidates so phones never download a 1600px hero. */
export function srcSet(id, widths = [640, 960, 1400, 1920]) {
  return widths.map((w) => `${src(id, w)} ${w}w`).join(', ')
}

/**
 * Named plates. `alt` lives beside the id so every usage inherits a real
 * description rather than an empty or duplicated alt attribute.
 */
export const photos = {
  heroSite: {
    id: '1504307651254-35680f356dfd',
    alt: 'Level Eight crew working across a reinforced concrete deck, rebar and formwork laid out around them',
  },
  crewLookingUp: {
    id: '1516216628859-9bccecab13ca',
    alt: 'Construction crew in hard hats photographed from below against an open sky',
  },
  columnsRebar: {
    id: '1531834685032-c34bf0d84c77',
    alt: 'Steel reinforcement cages being tied into vertical columns on an active site',
  },
  siteOverhead: {
    id: '1541888946425-d81bb19240f5',
    alt: 'Overhead view of a full construction footprint with the crew lined along a freshly poured slab',
  },
  drawings: {
    id: '1503387762-592deb58ef4e',
    alt: 'Hands marking up rolled construction drawings with a set square and pencil',
  },
  gutRenovation: {
    id: '1517581177682-a085bb7ffb15',
    alt: 'Interior stripped back to brick and stud during a renovation, opening framed out',
  },
  tileDetail: {
    id: '1523413651479-597eb2da0ad6',
    alt: 'Close view of finished subway tile work meeting a brushed tap fitting',
  },
  interiorComplete: {
    id: '1600566753086-00f18fb6b3ea',
    alt: 'Completed open-plan living space with timber stair and full-height glazing',
  },
  interiorWarm: {
    id: '1600607687939-ce8a6c25118c',
    alt: 'Finished interior with timber wall panelling and built-in joinery',
  },
  timberFrame: {
    id: '1587582423116-ec07293f0395',
    alt: 'Carpenter working along a timber roof frame against a clear sky',
  },
  fabrication: {
    id: '1558618666-fcd25c85cd64',
    alt: 'Metalworker machining a steel component by hand in the fabrication shop',
  },
  measuring: {
    id: '1621905251189-08b45d6a269e',
    alt: 'Worker in a hard hat fixing and checking a fitting against a wall',
  },
  facadeCurve: {
    id: '1493397212122-2b85dda8106b',
    alt: 'Sweeping panelled facade of a completed institutional building',
  },
  towerStepped: {
    id: '1460574283810-2aab119d8511',
    alt: 'Stepped concrete structure rising against an overcast sky before finishes',
  },
  buildingWhite: {
    id: '1479839672679-a46483c0e7c8',
    alt: 'Corner elevation of a completed white institutional building',
  },
  buildingModern: {
    id: '1487958449943-2429e8be8625',
    alt: 'Completed civic building with glazed frontage and angular roof',
  },
  buildingUp: {
    id: '1541976590-713941681591',
    alt: 'Multi-storey residential block seen from ground level looking up the elevation',
  },
  villaPool: {
    id: '1512917774080-9991f1c4c750',
    alt: 'Completed residential build with terrace and pool at handover',
  },
  houseDusk: {
    id: '1568605114967-8130f3a36994',
    alt: 'Finished family home photographed at dusk with interior lights on',
  },
  corridor: {
    id: '1497366216548-37526070297c',
    alt: 'Empty finished corridor inside a completed institutional facility',
  },
}
