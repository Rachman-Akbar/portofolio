import { useCallback, useEffect, useMemo } from 'react'
import { Link } from 'react-router'
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

export default function WorkPage() {
  const experiences = useMemo(() => portfolioData.experiences, [])

  useEffect(() => {
    document.title = 'Pengalaman Kerja — Mochammad Rachman Akbar Fahlevy'
  }, [])

  const openExperience = useCallback(item => {
    const target = item.url?.trim()
    if (!target) return
    window.open(target, '_blank', 'noopener,noreferrer')
  }, [])

  const handleCardKeyDown = useCallback((event, item) => {
    if (event.target.closest('a')) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openExperience(item)
    }
  }, [openExperience])

  return (
    <>
      <Navbar />
      <main className="work-page">
        <section className="work-hero">
          <div className="work-hero-inner">
            <p className="section-kicker">Work Journal</p>
            <h1>Pengalaman Kerja</h1>
            <p>Kumpulan pengalaman, tanggung jawab, proses pengembangan, dan pembelajaran yang dapat kamu kelola langsung melalui portfolioData.js.</p>
            <Link to="/#perjalanan" className="work-back">← Kembali ke portofolio</Link>
          </div>
        </section>

        <section className="work-list">
          <div className="work-timeline" aria-hidden="true" />

          {experiences.map((item, index) => {
            const palette = timelinePalette[index % timelinePalette.length]
            const sponsors = (item.sponsors || []).filter(sponsor => sponsor?.image && sponsor?.url)

            return (
              <article
                className={`work-article${item.url ? ' is-clickable' : ''}`}
                key={item.id}
                role={item.url ? 'link' : undefined}
                tabIndex={item.url ? 0 : undefined}
                onClick={item.url ? () => openExperience(item) : undefined}
                onKeyDown={item.url ? event => handleCardKeyDown(event, item) : undefined}
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

                  {sponsors.length ? (
                    <div className="work-sponsors" aria-label="Support by">
                      <span className="work-sponsored-label">Support by</span>
                      <div className="work-sponsor-grid">
                        {sponsors.map((sponsor, sponsorIndex) => (
                          <a
                            key={`${item.id}-${sponsorIndex}-${sponsor.url}`}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={event => event.stopPropagation()}
                            onKeyDown={event => event.stopPropagation()}
                            aria-label="Buka sponsor"
                          >
                            <img src={sponsor.image} alt="" loading="lazy" decoding="async" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}
        </section>
      </main>
      <Footer />
    </>
  )
}
