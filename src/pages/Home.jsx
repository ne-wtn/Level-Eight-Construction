import Hero from '../components/sections/Hero'
import Marquee from '../components/sections/Marquee'
import AboutIntro from '../components/sections/AboutIntro'
import ServicesGrid from '../components/sections/ServicesGrid'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import ProcessSteps from '../components/sections/ProcessSteps'
import WhyUs from '../components/sections/WhyUs'
import Testimonials from '../components/sections/Testimonials'
import CTABand from '../components/sections/CTABand'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle('Level Eight — Construction, Renovation & Project Management')

  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <ServicesGrid />
      <FeaturedProjects />
      <ProcessSteps tone="surface" />
      <WhyUs />
      <Testimonials />
      <CTABand />
    </>
  )
}
