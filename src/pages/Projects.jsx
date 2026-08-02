import PageHero from '../components/sections/PageHero'
import ProjectGallery from '../features/projects/ProjectGallery'
import CTABand from '../components/sections/CTABand'
import Marquee from '../components/sections/Marquee'
import usePageTitle from '../hooks/usePageTitle'

export default function Projects() {
  usePageTitle(
    'Projects — Level Eight',
    'A gallery of institutional, residential, renovation and fabrication work by Level Eight, photographed on active and completed sites across Tanzania.',
  )

  return (
    <>
      <PageHero
        label="Recent work"
        title="Projects underway"
        accent="and completed."
        lede="Real photographs from real sites — no stock footage, no staging. Select a category to filter, or open any frame to see it full size."
      />

      <Marquee tone="accent" items={['Institutional', 'Residential', 'Renovation & Finishes', 'Fabrication']} />

      <div className="pt-16 sm:pt-20">
        <ProjectGallery />
      </div>

      <CTABand />
    </>
  )
}
