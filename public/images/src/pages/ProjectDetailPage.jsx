import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { portfolioData } from '../data/portfolioData'
import '../styles/project-detail.css'

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = useMemo(() => portfolioData.projects.find(item => item.slug === slug), [slug])
  const fallbackImage = project?.image || ''
  const [source, setSource] = useState(project?.localImage || fallbackImage)

  useEffect(() => {
    setSource(project?.localImage || project?.image || '')
    document.title = project ? `${project.title} — Mochammad Rachman Akbar Fahlevy` : 'Project Detail — Mochammad Rachman Akbar Fahlevy'
  }, [project])

  const onImageError = useCallback(() => {
    if (source !== fallbackImage && fallbackImage) setSource(fallbackImage)
  }, [fallbackImage, source])

  if (!project) {
    return (
      <>
        <Navbar />
        <section className="empty-project">
          <div><h1>Project belum ditemukan.</h1><Link to="/#proyek">Kembali ke daftar proyek</Link></div>
        </section>
      </>
    )
  }

  const details = Array.isArray(project.body) && project.body.length
    ? project.body
    : [project.desc || 'Detail project dapat kamu lengkapi langsung dari portfolioData.js.']

  return (
    <>
      <Navbar />
      <main className="detail-main">
        <section className="detail-hero">
          <div className="detail-copy">
            <p className="detail-tag">{project.tag}</p>
            <h1 className="detail-title">{project.title}</h1>
            <p className="detail-desc">{project.desc || ''}</p>
            <Link to="/#proyek" className="detail-back-link">← Kembali ke proyek</Link>
          </div>
          <figure className="detail-image" style={{ '--detail-ratio': project.ratio || '4 / 5' }}>
            <img src={source} alt={project.title} loading="eager" decoding="async" onError={onImageError} />
          </figure>
        </section>
        <article className="detail-body">
          <p className="detail-article-kicker">Project Story</p>
          <h2>Tentang project</h2>
          {details.map(item => <p key={item}>{item}</p>)}
          {project.technologies?.length ? (
            <div className="detail-tech" aria-label="Teknologi yang digunakan">
              {project.technologies.map(item => <span key={item}>{item}</span>)}
            </div>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  )
}
