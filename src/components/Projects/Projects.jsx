import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { portfolioData } from '../../data/portfolioData'
import useRevealScope from '../../hooks/useRevealScope'
import './Projects.css'


const googleIcon = domain => `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(`https://${domain}`)}`

const technologyIcons = {
  html: { label: 'HTML', domain: 'html.spec.whatwg.org' },
  css: { label: 'CSS', domain: 'www.w3.org' },
  javascript: { label: 'JavaScript', domain: 'www.javascript.com' },
  typescript: { label: 'TypeScript', domain: 'www.typescriptlang.org' },
  react: { label: 'React', domain: 'react.dev' },
  'react.js': { label: 'React', domain: 'react.dev' },
  reactjs: { label: 'React', domain: 'react.dev' },
  vue: { label: 'Vue', domain: 'vuejs.org' },
  'vue.js': { label: 'Vue', domain: 'vuejs.org' },
  angular: { label: 'Angular', domain: 'angular.dev' },
  laravel: { label: 'Laravel', domain: 'laravel.com' },
  php: { label: 'PHP', domain: 'www.php.net' },
  node: { label: 'Node.js', domain: 'nodejs.org' },
  'node.js': { label: 'Node.js', domain: 'nodejs.org' },
  nodejs: { label: 'Node.js', domain: 'nodejs.org' },
  next: { label: 'Next.js', domain: 'nextjs.org' },
  'next.js': { label: 'Next.js', domain: 'nextjs.org' },
  nextjs: { label: 'Next.js', domain: 'nextjs.org' },
  mysql: { label: 'MySQL', domain: 'www.mysql.com' },
  postgresql: { label: 'PostgreSQL', domain: 'www.postgresql.org' },
  flutter: { label: 'Flutter', domain: 'flutter.dev' },
  dart: { label: 'Dart', domain: 'dart.dev' },
  python: { label: 'Python', domain: 'www.python.org' },
  java: { label: 'Java', domain: 'www.java.com' },
  'three.js': { label: 'Three.js', domain: 'threejs.org' },
  threejs: { label: 'Three.js', domain: 'threejs.org' },
  gsap: { label: 'GSAP', domain: 'gsap.com' },
  tailwind: { label: 'Tailwind CSS', domain: 'tailwindcss.com' },
  'tailwind css': { label: 'Tailwind CSS', domain: 'tailwindcss.com' },
}

const resolveTechnologyIcons = technologies => {
  const seen = new Set()
  return (technologies || []).reduce((items, technology) => {
    const key = String(technology).trim().toLowerCase()
    const match = technologyIcons[key]
    if (!match || seen.has(match.label)) return items
    seen.add(match.label)
    items.push({ ...match, src: googleIcon(match.domain) })
    return items
  }, [])
}

const ProjectCard = memo(function ProjectCard({ project, onClick, span }) {
  const fallback = project.image || ''
  const [source, setSource] = useState(project.localImage || fallback)
  const icons = useMemo(() => resolveTechnologyIcons(project.technologies), [project.technologies])
  const href = project.url || '#'

  const onError = useCallback(() => {
    if (source !== fallback && fallback) setSource(fallback)
  }, [fallback, source])

  return (
    <a
      className="project-card"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--project-span': span }}
      onClick={event => onClick(event, project)}
      onDragStart={event => event.preventDefault()}
      aria-label={`Buka project ${project.title}`}
    >
      <div className="project-image-wrap">
        <img src={source} alt={project.title} loading="lazy" decoding="async" draggable="false" onError={onError} />
        {icons.length > 0 && (
          <div className="project-tech-icons" aria-label="Teknologi yang digunakan">
            {icons.map(icon => (
              <span className="project-tech-icon" key={icon.label} title={icon.label}>
                <img src={icon.src} alt={icon.label} loading="lazy" decoding="async" draggable="false" />
              </span>
            ))}
          </div>
        )}
        <div className="project-meta">
          <p className="project-tag">{project.tag}</p>
          <h3 className="project-title">{project.title}</h3>
        </div>
      </div>
    </a>
  )
})

export default function Projects() {
  const projects = portfolioData.projects
  const gridProjects = useMemo(() => projects.length % 2 === 0 ? projects : [...projects, projects[0]], [projects])
  const sectionRef = useRef(null)
  const marqueeRef = useRef(null)
  const trackRef = useRef(null)
  const loopWidthRef = useRef(0)
  const loopStartRef = useRef(0)
  const adjustingRef = useRef(false)
  const draggedRef = useRef(false)
  const dragRef = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: 0, pointerId: null })
  useRevealScope(sectionRef)

  const groups = useMemo(() => [0, 1, 2], [])
  const brickSpans = useMemo(() => [7, 6, 7, 6, 7, 7], [])

  const normalizeLoop = useCallback(() => {
    const marquee = marqueeRef.current
    if (!marquee || adjustingRef.current || !loopWidthRef.current) return
    let next = marquee.scrollLeft
    let changed = false
    const min = loopStartRef.current - loopWidthRef.current * 0.5
    const max = loopStartRef.current + loopWidthRef.current * 0.5
    while (next < min) {
      next += loopWidthRef.current
      changed = true
    }
    while (next > max) {
      next -= loopWidthRef.current
      changed = true
    }
    if (!changed) return
    adjustingRef.current = true
    const oldBehavior = marquee.style.scrollBehavior
    marquee.style.scrollBehavior = 'auto'
    marquee.scrollLeft = next
    marquee.style.scrollBehavior = oldBehavior
    requestAnimationFrame(() => { adjustingRef.current = false })
  }, [])

  const syncLoop = useCallback((reset = false) => {
    const marquee = marqueeRef.current
    const track = trackRef.current
    if (!marquee || !track) return
    const items = Array.from(track.children)
    if (items.length < 3) return
    const width = items[2].offsetLeft - items[1].offsetLeft
    const start = items[1].offsetLeft
    if (!width) return
    const oldWidth = loopWidthRef.current || width
    const oldStart = loopStartRef.current || start
    const relative = oldWidth ? (marquee.scrollLeft - oldStart) / oldWidth : 0
    loopWidthRef.current = width
    loopStartRef.current = start
    adjustingRef.current = true
    const oldBehavior = marquee.style.scrollBehavior
    marquee.style.scrollBehavior = 'auto'
    marquee.scrollLeft = reset ? start : start + relative * width
    marquee.style.scrollBehavior = oldBehavior
    requestAnimationFrame(() => { adjustingRef.current = false })
  }, [])

  useLayoutEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return undefined
    const frame = requestAnimationFrame(() => syncLoop(true))
    const observer = new ResizeObserver(() => syncLoop(false))
    observer.observe(marquee)
    marquee.addEventListener('scroll', normalizeLoop, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      marquee.removeEventListener('scroll', normalizeLoop)
    }
  }, [normalizeLoop, syncLoop])

  const handleProjectClick = useCallback((event, project) => {
    if (draggedRef.current || !project.url) {
      event.preventDefault()
      event.stopPropagation()
    }
  }, [])

  const pointerDown = useCallback(event => {
    if (event.pointerType !== 'mouse') return
    const marquee = marqueeRef.current
    if (!marquee) return
    dragRef.current = { dragging: true, startX: event.clientX, startScrollLeft: marquee.scrollLeft, moved: 0, pointerId: event.pointerId, captured: false }
    draggedRef.current = false
  }, [])

  const pointerMove = useCallback(event => {
    const marquee = marqueeRef.current
    const drag = dragRef.current
    if (!marquee || !drag.dragging) return
    const delta = event.clientX - drag.startX
    drag.moved = Math.max(drag.moved, Math.abs(delta))
    if (drag.moved > 5) {
      draggedRef.current = true
      marquee.classList.add('is-dragging')
      if (!drag.captured) {
        marquee.setPointerCapture(event.pointerId)
        drag.captured = true
      }
    }
    if (!draggedRef.current) return
    marquee.scrollLeft = drag.startScrollLeft - delta
    normalizeLoop()
  }, [normalizeLoop])

  const pointerStop = useCallback(event => {
    const marquee = marqueeRef.current
    const drag = dragRef.current
    if (!marquee || !drag.dragging) return
    drag.dragging = false
    marquee.classList.remove('is-dragging')
    if (drag.captured && marquee.hasPointerCapture(event.pointerId)) marquee.releasePointerCapture(event.pointerId)
    setTimeout(() => { draggedRef.current = false }, 120)
  }, [])

  return (
    <section ref={sectionRef} className="section projects" id="proyek">
      <div className="section-head reveal projects-head">
        <p className="section-kicker">MY PROJECTS</p>
        <h2 className="section-title">Proyek Saya</h2>
      </div>
      <div
        ref={marqueeRef}
        className="project-marquee reveal"
        id="projectMarquee"
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerStop}
        onPointerCancel={pointerStop}
      >
        <div ref={trackRef} className="project-track" id="projectTrack">
          {groups.map(group => (
            <div className="project-group" key={group}>
              {gridProjects.map((project, index) => (
                <ProjectCard key={`${group}-${project.slug}-${index}`} project={project} onClick={handleProjectClick} span={brickSpans[index % brickSpans.length]} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
