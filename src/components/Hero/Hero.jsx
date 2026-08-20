import { memo, useEffect, useRef, useState } from 'react'
import { portfolioData } from '../../data/portfolioData'
import useRevealScope from '../../hooks/useRevealScope'
import LanyardCard from './LanyardCard'
import './Hero.css'

const heroDescription = 'Merancang produk digital yang ringan, jelas, dan fungsional dari ide hingga rilis dengan perhatian pada pengalaman pengguna.'

function Hero() {
  const sectionRef = useRef(null)
  const typingTimerRef = useRef(0)
  const [typedDescription, setTypedDescription] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  useRevealScope(sectionRef)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setTypedDescription(heroDescription)
      setTypingDone(true)
      return undefined
    }

    let index = 0
    const startTimer = window.setTimeout(() => {
      typingTimerRef.current = window.setInterval(() => {
        index += 1
        setTypedDescription(heroDescription.slice(0, index))
        if (index >= heroDescription.length) {
          window.clearInterval(typingTimerRef.current)
          typingTimerRef.current = 0
          setTypingDone(true)
        }
      }, 24)
    }, 520)

    return () => {
      window.clearTimeout(startTimer)
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="section hero" id="top">
      <div className="hero-media" style={{ backgroundImage: `url('${portfolioData.site.heroImage}')` }} aria-hidden="true" />
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-content reveal">
          <p className="eyebrow">Portfolio · Software Engineer</p>
          <h1 className="main-name">Mochammad Rachman<br />Akbar Fahlevy</h1>
          <p className={`hero-tagline hero-typewriter${typingDone ? ' is-complete' : ''}`} aria-label={heroDescription}>
            <span aria-hidden="true">{typedDescription}</span>
            <span className="typewriter-caret" aria-hidden="true" />
          </p>
          <div className="hero-actions">
            <a href="#proyek" className="btn btn-primary">Lihat Proyek</a>
            <a href="#kontak" className="btn btn-soft">Hubungi Saya</a>
          </div>
          <div className="hero-meta" aria-label="Ringkasan keahlian">
            <span>Web Development</span>
            <span>System Design</span>
            <span>UI Engineering</span>
          </div>
        </div>
        <LanyardCard />
      </div>
    </section>
  )
}

export default memo(Hero)
