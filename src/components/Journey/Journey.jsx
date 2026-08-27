import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { portfolioData } from '../../data/portfolioData'
import useRevealScope from '../../hooks/useRevealScope'
import './Journey.css'

const LANDING_PAUSE = 620
const JUMP_DURATION = 820
const CYCLE_DURATION = LANDING_PAUSE + JUMP_DURATION
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const mod = (value, length) => ((value % length) + length) % length

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  const expanded = value.length === 3 ? value.split('').map(char => char + char).join('') : value
  const number = Number.parseInt(expanded, 16)
  return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 }
}

function mixColor(a, b, amount) {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  const t = clamp(amount, 0, 1)
  return `rgb(${Math.round(ca.r + (cb.r - ca.r) * t)},${Math.round(ca.g + (cb.g - ca.g) * t)},${Math.round(ca.b + (cb.b - ca.b) * t)})`
}

const StoryCard = memo(function StoryCard({ stage, index, onActivate, clone = false }) {
  const [source, setSource] = useState(stage.localImage || stage.image || '')
  const interactive = Boolean(stage.url) || stage.id === 'pt'

  const onError = useCallback(() => {
    if (stage.localImage && stage.image && source !== stage.image) setSource(stage.image)
  }, [stage.image, stage.localImage, source])

  return (
    <article
      className={`story-card${interactive ? ' has-action' : ''}${clone ? ' story-clone' : ''}`}
      data-stage-id={stage.id}
      style={{ '--stage-color': stage.color, '--stage-soft': stage.soft, '--stage-glow': stage.glow || stage.soft }}
      tabIndex={interactive && !clone ? 0 : -1}
      aria-hidden={clone || undefined}
      onClick={interactive && !clone ? () => onActivate(stage, index) : undefined}
      onKeyDown={interactive && !clone ? event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onActivate(stage, index)
        }
      } : undefined}
    >
      <span className="story-number">{String(index + 1).padStart(2, '0')}</span>
      <div className="story-media">
        <img src={source} alt={stage.title} loading="lazy" decoding="async" onError={onError} />
        <span className="story-media-tint" />
      </div>
      <div className="story-copy">
        <span className="story-label">{stage.label}</span>
        <h3>{stage.title}</h3>
        <p>{stage.desc}</p>
      </div>
      <span className="story-accent" />
    </article>
  )
})

export default memo(function Journey() {
  const stages = portfolioData.stages
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const canvasRef = useRef(null)
  const startTimeRef = useRef(performance.now())
  const baseStageRef = useRef(0)
  const currentStageRef = useRef(0)
  const [currentStage, setCurrentStage] = useState(0)
  const [storyPosition, setStoryPosition] = useState(0)
  const [animateStory, setAnimateStory] = useState(true)
  const snapPendingRef = useRef(false)
  useRevealScope(sectionRef)

  const displayedStages = useMemo(() => [...stages, stages[0]], [stages])

  const applyStage = useCallback(index => {
    const next = mod(index, stages.length)
    if (next === currentStageRef.current) return
    const previous = currentStageRef.current
    currentStageRef.current = next
    setCurrentStage(next)
    if (previous === stages.length - 1 && next === 0) {
      snapPendingRef.current = true
      setAnimateStory(true)
      setStoryPosition(stages.length)
    } else {
      snapPendingRef.current = false
      setAnimateStory(true)
      setStoryPosition(next)
    }
  }, [stages.length])

  const selectStage = useCallback(index => {
    const next = mod(index, stages.length)
    baseStageRef.current = next
    startTimeRef.current = performance.now()
    if (next === currentStageRef.current) {
      setStoryPosition(next)
      return
    }
    applyStage(next)
  }, [applyStage, stages.length])

  const activateStage = useCallback((stage, index) => {
    if (stage.url) {
      if (stage.external) window.open(stage.url, '_blank', 'noopener,noreferrer')
      else navigate(stage.url)
      return
    }
    if (stage.id === 'pt') selectStage(index + 1)
  }, [navigate, selectStage])

  const handleTransitionEnd = useCallback(event => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !snapPendingRef.current) return
    snapPendingRef.current = false
    setAnimateStory(false)
    setStoryPosition(0)
    requestAnimationFrame(() => setAnimateStory(true))
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const canvas = canvasRef.current
    if (!viewport || !canvas) return undefined
    const ctx = canvas.getContext('2d')
    let width = 1
    let height = 1
    let frame = 0

    const resize = () => {
      const rect = viewport.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const nextWidth = Math.round(width * dpr)
      const nextHeight = Math.round(height * dpr)
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth
        canvas.height = nextHeight
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const roundedTopBar = (x, y, barWidth, barHeight, radius) => {
      const r = Math.min(radius, barWidth / 2, Math.max(0, barHeight))
      ctx.beginPath()
      ctx.moveTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.lineTo(x + barWidth - r, y)
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r)
      ctx.lineTo(x + barWidth, y + barHeight)
      ctx.lineTo(x, y + barHeight)
      ctx.closePath()
    }

    const drawBall = (x, landingY, radius, arcY, color, jumpProgress) => {
      const squash = jumpProgress > 0.84 ? Math.sin((jumpProgress - 0.84) / 0.16 * Math.PI) : 0
      const stretch = Math.sin(jumpProgress * Math.PI) * 0.08
      const scaleX = 1 + squash * 0.16 - stretch * 0.32
      const scaleY = 1 - squash * 0.16 + stretch
      ctx.save()
      ctx.translate(x, landingY - arcY - radius)
      ctx.scale(scaleX, scaleY)
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      const eyeY = -radius * 0.16
      const eyeGap = radius * 0.35
      const eyeR = Math.max(2.2, radius * 0.13)
      const pupilR = Math.max(1.1, radius * 0.055)
      ctx.fillStyle = 'rgba(255,255,255,.96)'
      ctx.beginPath()
      ctx.arc(-eyeGap, eyeY, eyeR, 0, Math.PI * 2)
      ctx.arc(eyeGap, eyeY, eyeR, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#27243a'
      ctx.beginPath()
      ctx.arc(-eyeGap + eyeR * 0.22, eyeY + eyeR * 0.12, pupilR, 0, Math.PI * 2)
      ctx.arc(eyeGap + eyeR * 0.22, eyeY + eyeR * 0.12, pupilR, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,.95)'
      ctx.lineWidth = Math.max(1.5, radius * 0.07)
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.arc(0, radius * 0.1, radius * 0.22, 0.18 * Math.PI, 0.82 * Math.PI)
      ctx.stroke()
      ctx.fillStyle = 'rgba(255,255,255,.25)'
      ctx.beginPath()
      ctx.arc(-radius * 0.56, radius * 0.08, radius * 0.13, 0, Math.PI * 2)
      ctx.arc(radius * 0.56, radius * 0.08, radius * 0.13, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    let visible = true
    let running = false

    const animate = time => {
      const elapsed = Math.max(0, time - startTimeRef.current)
      const completedSteps = Math.floor(elapsed / CYCLE_DURATION)
      const cycleTime = elapsed % CYCLE_DURATION
      const isJumping = cycleTime >= LANDING_PAUSE
      const jumpProgress = isJumping ? clamp((cycleTime - LANDING_PAUSE) / JUMP_DURATION, 0, 1) : 0
      const stageIndex = mod(baseStageRef.current + completedSteps, stages.length)
      const nextStageIndex = mod(stageIndex + 1, stages.length)
      if (currentStageRef.current !== stageIndex) applyStage(stageIndex)
      ctx.clearRect(0, 0, width, height)
      const stepPitch = clamp(width * 0.145, 50, 92)
      const gap = clamp(stepPitch * 0.125, 5, 10)
      const barWidth = stepPitch - gap
      const stepHeight = clamp(height * 0.11, 23, 42)
      const ballRadius = clamp(Math.min(width, height) * 0.058, 16, 26)
      const jumpHeight = clamp(height * 0.17, 34, 66)
      const barRadius = clamp(barWidth * 0.08, 3, 7)
      const landingX = width / 2 - barWidth / 2
      const landingY = height * 0.68
      const shiftX = jumpProgress * stepPitch
      const shiftY = jumpProgress * stepHeight

      for (let i = -7; i <= 10; i += 1) {
        const x = landingX + i * stepPitch - shiftX
        const y = landingY - i * stepHeight + shiftY
        const barHeight = height - y + height * 0.08
        if (barHeight <= 0 || x > width + barWidth || x + barWidth < -barWidth) continue
        const absoluteIndex = completedSteps + i
        const barStageIndex = mod(baseStageRef.current + absoluteIndex, stages.length)
        const stage = stages[barStageIndex]
        const isSteppedOn = i <= 0
        const distance = Math.abs((x + barWidth / 2) - width / 2)
        const alpha = clamp(1 - distance / (width * 0.95), 0.42, 1)
        const darkMode = document.body.classList.contains('theme-dark')
        roundedTopBar(x, y, barWidth, barHeight, barRadius)
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = isSteppedOn ? stage.color : (darkMode ? 'rgba(128,134,166,.12)' : 'rgba(112,108,132,.10)')
        if (darkMode && isSteppedOn) {
          ctx.shadowColor = stage.glow || stage.color
          ctx.shadowBlur = clamp(barWidth * 0.24, 8, 18)
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0
        }
        ctx.fill()
        ctx.restore()

        if (darkMode && isSteppedOn && barHeight > 10) {
          ctx.save()
          ctx.globalAlpha = alpha * 0.9
          const topGlow = ctx.createLinearGradient(x, y, x + barWidth, y)
          topGlow.addColorStop(0, 'rgba(255,255,255,.14)')
          topGlow.addColorStop(0.5, 'rgba(255,255,255,.62)')
          topGlow.addColorStop(1, 'rgba(255,255,255,.12)')
          ctx.fillStyle = topGlow
          ctx.fillRect(x + 3, y, Math.max(0, barWidth - 6), Math.min(2.2, barHeight))
          ctx.restore()
        }

        if (isSteppedOn && barHeight > 58) {
          ctx.save()
          roundedTopBar(x, y, barWidth, barHeight, barRadius)
          ctx.clip()
          ctx.globalAlpha = alpha * 0.98
          const fontSize = clamp(barWidth * 0.33, 14, 20)
          const safeTop = y + fontSize * 1.35
          const safeBottom = y + barHeight - fontSize * 1.35
          const preferredY = y + clamp(barHeight * 0.23, fontSize * 1.7, 70)
          const labelY = clamp(preferredY, safeTop, Math.max(safeTop, safeBottom))
          ctx.translate(x + barWidth / 2, labelY)
          ctx.rotate(Math.PI / 2)
          ctx.fillStyle = '#ffffff'
          ctx.font = `800 ${fontSize}px Sora, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          if (darkMode) {
            ctx.shadowColor = stage.glow || stage.color
            ctx.shadowBlur = 6
          }
          ctx.fillText(stage.label, 0, 0)
          ctx.restore()
        }
      }

      const arcY = isJumping ? 4 * jumpHeight * jumpProgress * (1 - jumpProgress) : 0
      const ballColor = isJumping ? mixColor(stages[stageIndex].color, stages[nextStageIndex].color, jumpProgress) : stages[stageIndex].color
      const ballGap = clamp(ballRadius * 0.32, 6, 10)
      drawBall(landingX + barWidth / 2, landingY - ballGap, ballRadius, arcY, ballColor, jumpProgress)
      if (visible) {
        frame = requestAnimationFrame(animate)
      } else {
        running = false
      }
    }

    const observer = new ResizeObserver(resize)
    observer.observe(viewport)

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      if (visible && !running) {
        running = true
        frame = requestAnimationFrame(animate)
      } else if (!visible) {
        running = false
        cancelAnimationFrame(frame)
      }
    }, { rootMargin: '250px' })
    visibilityObserver.observe(viewport)

    resize()
    running = true
    frame = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [applyStage, stages])

  const stage = stages[currentStage]

  return (
    <section ref={sectionRef} className="section journey" id="perjalanan">
      <div className="section-head reveal">
        <p className="section-kicker">MY JOURNEY</p>
        <h2 className="section-title">Pendidikan, Prestasi, dan Pengalaman</h2>
      </div>
      <div className="journey-grid reveal">
        <div
          ref={viewportRef}
          className="stairs-viewport"
          id="stairsViewport"
          style={{ '--stage-soft': stage.soft, '--stage-color': stage.color, '--stage-glow': stage.glow || stage.soft }}
        >
          <canvas ref={canvasRef} id="stairsCanvas" aria-label="Animasi bola melompat menaiki tangga perjalanan" />
        </div>
        <div className="story-panel">
          <div className="story-viewport">
            <div
              className="story-track"
              id="storyTrack"
              style={{ transform: `translateY(-${storyPosition * 100}%)`, transition: animateStory ? undefined : 'none' }}
              onTransitionEnd={handleTransitionEnd}
            >
              {displayedStages.map((item, index) => (
                <StoryCard
                  key={`${item.id}-${index}`}
                  stage={item}
                  index={index === stages.length ? 0 : index}
                  clone={index === stages.length}
                  onActivate={activateStage}
                />
              ))}
            </div>
          </div>
          <div className="story-controls">
            <span className="story-counter" id="storyCounter">{String(currentStage + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}</span>
            <div className="story-dots" id="storyDots">
              {stages.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`story-dot${index === currentStage ? ' is-active' : ''}`}
                  style={index === currentStage ? { background: item.color } : undefined}
                  aria-label={`Tampilkan ${item.label}`}
                  onClick={() => selectStage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
