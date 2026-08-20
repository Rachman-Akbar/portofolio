import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'

const StarIntro = lazy(() => import('../components/StarIntro/StarIntro'))
const Journey = lazy(() => import('../components/Journey/Journey'))
const Projects = lazy(() => import('../components/Projects/Projects'))
const Contact = lazy(() => import('../components/Contact/Contact'))
const Footer = lazy(() => import('../components/Footer/Footer'))

function SectionFallback() {
  return <div className="min-h-[22vh] w-full" aria-hidden="true" />
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}><StarIntro /></Suspense>
      <Navbar />
      <main className="w-full">
        <Hero />
        <Suspense fallback={<SectionFallback />}><Journey /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  )
}
