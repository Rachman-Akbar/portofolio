import { memo, useCallback, useEffect, useMemo, useState } from 'react'
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

const MemoMediaImage = memo(MediaImage)

const WorkItem = memo(function WorkItem({ item, palette, onOpen }) {
  const allSponsors = useMemo(() => (item.sponsors || []).filter(s => s?.image && s?.url), [item])
  const showIB = allSponsors.some(s => s.type === 'inspired')
  const showSB = allSponsors.some(s => s.type === 'support')

  return (
    <a
      className={`work-article${item.url ? ' is-clickable' : ''}`}
      href={item.url || undefined}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--work-color': item.color || palette.color, '--work-soft': item.soft || palette.soft }}
    >
      <span className="work-dot" aria-hidden="true" />

      <div className="work-media">
        <MemoMediaImage src={item.coverImage} alt={item.coverAlt || item.title} />
      </div>

      <div className="work-copy">
        <div className="work-main-copy">
          <h2>{item.title}</h2>
          <p className="work-role">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
          <p className="work-summary">{item.summary}</p>
        </div>

        {allSponsors.length > 0 && (
          <div className="work-sponsors">
            <button
              type="button"
              className="work-sponsor-button"
              onClick={event => onOpen(event, allSponsors, item.color || palette.color)}
              aria-label="Lihat Sponsor / Inspired By"
            >
              <span className="work-sponsored-label">
                {showIB && showSB ? 'Support / Inspired By' : showIB ? 'Inspired By' : 'Support By'}
              </span>
              <span className="work-sponsored-count">{allSponsors.length}</span>
            </button>
          </div>
        )}
      </div>
    </a>
  )
})

const SponsorModal = memo(function SponsorModal({ sponsors, color, onClose }) {
  const hasInspired = sponsors.some(s => s.type === 'inspired')
  const hasSupport = sponsors.some(s => s.type === 'support')
  const title = hasInspired && hasSupport ? 'Inspired By / Support By' : hasInspired ? 'Inspired By' : 'Support By'
  const filtered = sponsors.filter(s => s?.image && s?.url)

  return (
    <div className="work-sponsor-overlay" onClick={onClose}>
      <div
        className="work-sponsor-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ '--work-color': color }}
        onClick={event => event.stopPropagation()}
      >
        <button type="button" className="work-sponsor-modal-close" onClick={onClose} aria-label="Tutup">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        <h2 className="work-sponsor-modal-title">{title}</h2>

        <div className="work-sponsor-modal-list">
          {filtered.map((sponsor, i) => (
            <a
              key={`${sponsor.name}-${i}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-sponsor-modal-card"
            >
              <img src={sponsor.image} alt={sponsor.name || ''} loading="lazy" decoding="async" />
              <span className="work-sponsor-modal-name">{sponsor.name}</span>
              <span className="work-sponsor-modal-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
})

export default function WorkPage() {
  const experiences = useMemo(() => portfolioData.experiences, [])
  const items = useMemo(
    () => [...experiences].reverse().map((item, index) => ({
      item,
      palette: timelinePalette[index % timelinePalette.length],
      key: item.id,
    })),
    [experiences],
  )
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

  const openModal = useCallback((event, sponsors, color) => {
    event.preventDefault()
    event.stopPropagation()
    setModalSponsors({ sponsors, color })
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

          {items.map(({ item, palette, key }) => (
            <WorkItem key={`${key}-${palette.color}`} item={item} palette={palette} onOpen={openModal} />
          ))}
        </section>
      </main>

      {modalSponsors && (
        <SponsorModal sponsors={modalSponsors.sponsors} color={modalSponsors.color} onClose={closeModal} />
      )}

      <Footer />
    </>
  )
}
