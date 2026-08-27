import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { portfolioData } from '../data/portfolioData'
import '../styles/work.css'

const timelinePalette = [
  { color: '#7d6cf2', soft: '#edeaff' },
  { color: '#4f8dff', soft: '#e4efff' },
  { color: '#36bda1', soft: '#e4faf5' },
  { color: '#ff7f93', soft: '#ffe8ef' },
  { color: '#f1a64e', soft: '#fff3df' },
]

function SponsorModal({ sponsors, onClose }) {
  const hasInspired = sponsors.some(s => s.type === 'inspired')
  const hasSupport = sponsors.some(s => s.type === 'support')
  const [activeTab, setActiveTab] = useState(hasInspired ? 'inspired' : 'support')

  const tabs = []
  if (hasInspired) tabs.push({ key: 'inspired', label: 'Inspired By' })
  if (hasSupport) tabs.push({ key: 'support', label: 'Support By' })

  const filtered = sponsors.filter(s => s.type === activeTab)

  return (
    <div className="work-sponsor-overlay" onClick={onClose}>
      <div
        className="work-sponsor-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Sponsor details"
        onClick={event => event.stopPropagation()}
      >
        <button type="button" className="work-sponsor-modal-close" onClick={onClose} aria-label="Tutup">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        {tabs.length > 1 && (
          <div className="work-sponsor-tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                className={`work-sponsor-tab${activeTab === tab.key ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="work-sponsor-modal-list">
          {filtered.map((sponsor, i) => (
            <a
              key={`${activeTab}-${i}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-sponsor-modal-card"
            >
              <img src={sponsor.image} alt={sponsor.name || ''} loading="lazy" decoding="async" />
              <span>{sponsor.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function MediaImage({ src, alt }) {
  if (!src) return <span className="work-media-placeholder" aria-hidden="true" />
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={event => {
        event.currentTarget.style.display = 'none'
      }}
    />
  )
}

export default function WorkPage() {
  const experiences = useMemo(() => portfolioData.experiences, [])
  const [modalSponsors, setModalSponsors] = useState(null)

  useEffect(() => {
    document.title = 'Pengalaman Kerja — Mochammad Rachman Akbar Fahlevy'
  }, [])

  useEffect(() => {
    if (modalSponsors) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalSponsors])

  useEffect(() => {
    if (!modalSponsors) return
    function onKey(e) {
      if (e.key === 'Escape') setModalSponsors(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalSponsors])

  const openModal = useCallback((event, sponsors) => {
    event.stopPropagation()
    setModalSponsors(sponsors)
  }, [])

  const closeModal = useCallback(() => {
    setModalSponsors(null)
  }, [])

  return (
    <>
      <Navbar />
      <main className="work-page">
        <section className="work-hero">
          <div className="work-hero-inner">
            <p className="section-kicker">Work Journal</p>
            <h1>Pengalaman Kerja</h1>
          </div>
        </section>

        <section className="work-list">
          <div className="work-timeline" aria-hidden="true" />

          {experiences.map((item, index) => {
            const palette = timelinePalette[index % timelinePalette.length]
            const allSponsors = (item.sponsors || []).filter(s => s?.image && s?.url)
            const inspiredSponsors = allSponsors.filter(s => s.type === 'inspired')
            const supportSponsors = allSponsors.filter(s => s.type === 'support')
            const showIB = inspiredSponsors.length > 0
            const showSB = supportSponsors.length > 0
            const MAX_VISIBLE = 3
            const visibleIcons = [...inspiredSponsors, ...supportSponsors].slice(0, MAX_VISIBLE)
            const overflowCount = [...inspiredSponsors, ...supportSponsors].length - MAX_VISIBLE

            return (
              <article
                className={`work-article${item.url ? ' is-clickable' : ''}`}
                key={item.id}
                style={{ '--work-color': item.color || palette.color, '--work-soft': item.soft || palette.soft }}
              >
                <span className="work-dot" aria-hidden="true" />

                <div className="work-media">
                  <MediaImage src={item.coverImage} alt={item.coverAlt || item.title} />
                </div>

                <div className="work-copy">
                  <div className="work-main-copy">
                    <h2>{item.title}</h2>
                    <p className="work-role">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
                    <p className="work-summary">{item.summary}</p>
                  </div>

                  {allSponsors.length > 0 && (
                    <div className="work-sponsors">
                      <span className="work-sponsored-label">
                        {showIB && showSB ? 'IB / SB' : showIB ? 'IB' : 'SB'}
                      </span>
                      <button
                        type="button"
                        className="work-sponsor-bowl"
                        onClick={event => openModal(event, allSponsors)}
                        aria-label="Lihat sponsor"
                      >
                        {visibleIcons.map((sponsor, i) => (
                          <span
                            key={`${item.id}-icon-${i}`}
                            className={`work-sponsor-ball${i % 2 !== 0 ? ' work-sponsor-ball--up' : ''}`}
                            style={{ '--ball-delay': `${i * 60}ms` }}
                          >
                            <img src={sponsor.image} alt={sponsor.name || ''} loading="lazy" decoding="async" />
                          </span>
                        ))}
                        {overflowCount > 0 && (
                          <span className="work-sponsor-ball work-sponsor-ball--more">
                            <span className="work-sponsor-overflow">…{overflowCount}</span>
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      </main>

      {modalSponsors && (
        <SponsorModal sponsors={modalSponsors} onClose={closeModal} />
      )}

      <Footer />
    </>
  )
}
