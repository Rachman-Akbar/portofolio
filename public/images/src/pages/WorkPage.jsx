import { useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { portfolioData } from '../data/portfolioData'
import '../styles/work.css'


const googleFavicon = url => {
  try {
    const parsed = new URL(url)
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(parsed.origin)}`
  } catch {
    return 'https://www.google.com/s2/favicons?sz=128&domain_url=https%3A%2F%2Fwww.google.com'
  }
}

const supportCatalog = {
  laravel: 'https://laravel.com',
  javascript: 'https://www.javascript.com',
  mysql: 'https://www.mysql.com',
  react: 'https://react.dev',
  api: 'https://www.postman.com',
  'ui engineering': 'https://www.figma.com',
  'three.js': 'https://threejs.org',
  gsap: 'https://gsap.com',
}

const defaultSupportPool = [
  'https://www.google.com',
  'https://github.com',
  'https://vercel.com',
  'https://developer.mozilla.org',
]

const resolveSupportBy = item => {
  const explicit = (item.sponsors || []).map(sponsor => ({
    ...sponsor,
    image: sponsor.image || (sponsor.url ? googleFavicon(sponsor.url) : ''),
  })).filter(sponsor => sponsor.image)
  if (explicit.length) return explicit

  const automatic = (item.technologies || [])
    .map(technology => supportCatalog[String(technology).trim().toLowerCase()])
    .filter(Boolean)
    .filter((url, index, array) => array.indexOf(url) === index)
    .slice(0, 3)
    .map(url => ({ url, image: googleFavicon(url) }))

  if (automatic.length) return automatic

  const offset = Number(item.id || 0) % defaultSupportPool.length
  return [0, 1, 2].map(step => {
    const url = defaultSupportPool[(offset + step) % defaultSupportPool.length]
    return { url, image: googleFavicon(url) }
  })
}

const timelinePalette = [
  { color: '#7d6cf2', soft: '#edeaff' },
  { color: '#4f8dff', soft: '#e4efff' },
  { color: '#36bda1', soft: '#e4faf5' },
  { color: '#ff7f93', soft: '#ffe8ef' },
  { color: '#f1a64e', soft: '#fff3df' },
]

function MediaImage({ src, alt }) {
  if (!src) return <span className="work-media-placeholder" aria-hidden="true" />
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={event => { event.currentTarget.style.display = 'none' }} />
}

export default function WorkPage() {
  const experiences = useMemo(() => portfolioData.experiences, [])

  useEffect(() => {
    document.title = 'Pengalaman Kerja — Mochammad Rachman Akbar Fahlevy'
  }, [])

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
            const sponsors = resolveSupportBy(item)
            return (
              <article
                className="work-article"
                key={item.id}
                style={{ '--work-color': item.color || palette.color, '--work-soft': item.soft || palette.soft }}
              >
                <span className="work-dot" aria-hidden="true" />
                <div className="work-media">
                  <MediaImage src={item.coverImage} alt={item.coverAlt || item.title} />
                </div>
                <div className="work-copy">
                  <h2>{item.title}</h2>
                  <p className="work-role">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
                  <p className="work-summary">{item.summary}</p>
                  <div className="work-body">{item.body?.map(text => <p key={text}>{text}</p>)}</div>
                  <div className="work-bottom-row">
                    <div className="work-tech">{item.technologies?.map(text => <span key={text}>{text}</span>)}</div>
                    {sponsors.length ? (
                      <div className="work-sponsors" aria-label="Sponsor">
                        <span className="work-sponsored-label">Support by</span>
                        <div className="work-sponsor-grid">
                          {sponsors.map(sponsor => sponsor.url ? (
                            <a key={`${item.id}-${sponsor.url}-${sponsor.image}`} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                              <img src={sponsor.image} alt="Sponsor" loading="lazy" decoding="async" />
                            </a>
                          ) : (
                            <span key={`${item.id}-${sponsor.image}`}>
                              <img src={sponsor.image} alt="Sponsor" loading="lazy" decoding="async" />
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
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
