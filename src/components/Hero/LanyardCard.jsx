import { memo, useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { portfolioData } from '../../data/portfolioData'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function LanyardCard() {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const cardRef = useRef(null)
  const materialRef = useRef(null)
  const initialDark = document.body.classList.contains('theme-dark') || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  const themeRef = useRef(initialDark)
  const manualThemeRef = useRef(false)
  const [isDark, setIsDark] = useState(initialDark)

  const toggleTheme = useCallback(() => {
    manualThemeRef.current = true
    setIsDark(previous => {
      const next = !previous
      themeRef.current = next
      return next
    })
  }, [])


  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return undefined
    const syncSystemTheme = event => {
      if (manualThemeRef.current) return
      themeRef.current = event.matches
      setIsDark(event.matches)
    }
    media.addEventListener?.('change', syncSystemTheme)
    return () => media.removeEventListener?.('change', syncSystemTheme)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0f1220' : '#f8f7ff')
    if (materialRef.current) {
      materialRef.current.rope.color.set(isDark ? 0xb9b3ff : 0x6f61f5)
      materialRef.current.rope.emissive.set(isDark ? 0x4037a8 : 0x211b58)
      materialRef.current.rope.emissiveIntensity = isDark ? 0.75 : 0.18
      materialRef.current.clasp.color.set(isDark ? 0xf0f2fb : 0xb8b7c1)
    }
  }, [isDark])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    const card = cardRef.current
    const nav = document.getElementById('nav')
    if (!wrapper || !canvas || !card || !nav) return undefined

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 30)
    camera.position.z = 10

    const ambient = new THREE.AmbientLight(0xffffff, 1.7)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25)
    keyLight.position.set(3, 5, 7)
    scene.add(ambient, keyLight)

    const ropeMaterial = new THREE.MeshStandardMaterial({
      color: themeRef.current ? 0xb9b3ff : 0x6f61f5,
      emissive: themeRef.current ? 0x4037a8 : 0x211b58,
      emissiveIntensity: themeRef.current ? 0.75 : 0.18,
      roughness: 0.4,
      metalness: 0.03,
    })
    const claspMaterial = new THREE.MeshStandardMaterial({
      color: themeRef.current ? 0xf0f2fb : 0xb8b7c1,
      roughness: 0.28,
      metalness: 0.78,
    })
    materialRef.current = { rope: ropeMaterial, clasp: claspMaterial }

    const segmentGeometry = new THREE.CylinderGeometry(1, 1, 1, 10, 1, false)
    const ropeSegments = Array.from({ length: 30 }, () => {
      const mesh = new THREE.Mesh(segmentGeometry, ropeMaterial)
      scene.add(mesh)
      return mesh
    })
    const claspGeometry = new THREE.BoxGeometry(24, 9, 5)
    const clasp = new THREE.Mesh(claspGeometry, claspMaterial)
    scene.add(clasp)

    const yAxis = new THREE.Vector3(0, 1, 0)
    const direction = new THREE.Vector3()
    const midpoint = new THREE.Vector3()
    const startPoint = new THREE.Vector3()
    const endPoint = new THREE.Vector3()

    let canvasWidth = 620
    let canvasHeight = 560
    let anchorGap = 160
    let cardTop = 92
    let dragging = false
    let pointerId = null
    let startX = 0
    let startY = 0
    let originX = 0
    let originY = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let vx = 0
    let vy = 0
    let maxPull = 0
    let frame = 0
    let syncFrame = 0

    const worldPoint = (px, py) => new THREE.Vector3(px - canvasWidth / 2, canvasHeight / 2 - py, 0)

    const updateCard = () => {
      const rotateZ = clamp(x * 0.035, -6.5, 6.5)
      const rotateY = clamp(x * 0.045, -8, 8)
      const rotateX = clamp(-y * 0.02, -4, 3)
      card.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    }

    const updateRope = () => {
      const anchorX = canvasWidth / 2
      const anchorY = 4
      const endX = canvasWidth / 2 + x
      const endY = anchorGap + cardTop + y + 4
      const distanceY = Math.max(72, endY - anchorY)
      const sag = clamp(Math.abs(x) * 0.28 + Math.max(0, y) * 0.08, 8, 54)
      const curve = new THREE.CatmullRomCurve3([
        worldPoint(anchorX, anchorY),
        worldPoint(anchorX + x * 0.06, anchorY + distanceY * 0.24),
        worldPoint(anchorX + x * 0.36, anchorY + distanceY * 0.54 + sag),
        worldPoint(anchorX + x * 0.78, anchorY + distanceY * 0.8),
        worldPoint(endX, endY),
      ], false, 'catmullrom', 0.52)

      const points = curve.getPoints(ropeSegments.length)
      ropeSegments.forEach((segment, index) => {
        startPoint.copy(points[index])
        endPoint.copy(points[index + 1])
        direction.subVectors(endPoint, startPoint)
        const length = Math.max(0.01, direction.length())
        midpoint.addVectors(startPoint, endPoint).multiplyScalar(0.5)
        segment.position.copy(midpoint)
        segment.quaternion.setFromUnitVectors(yAxis, direction.normalize())
        segment.scale.set(3.5, length, 3.5)
      })

      clasp.position.copy(worldPoint(endX, endY + 5))
      const tangent = curve.getTangent(1)
      clasp.rotation.z = Math.atan2(tangent.y, tangent.x) - Math.PI / 2
    }

    const syncCanvasGeometry = () => {
      const wrapperRect = wrapper.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      anchorGap = Math.max(18, wrapperRect.top - navRect.bottom + 4)
      cardTop = Math.round(wrapperRect.width * 0.42)
      canvasWidth = Math.min(Math.max(wrapperRect.width * 3.5, 520), Math.max(320, viewportWidth - 16))
      canvasHeight = Math.min(Math.max(anchorGap + cardTop + 250, 420), Math.max(420, viewportHeight * 1.05))
      wrapper.style.setProperty('--lanyard-canvas-top', `${-anchorGap}px`)
      wrapper.style.setProperty('--lanyard-anchor-top', `${-anchorGap}px`)
      wrapper.style.setProperty('--lanyard-canvas-width', `${canvasWidth}px`)
      wrapper.style.setProperty('--lanyard-canvas-height', `${canvasHeight}px`)
      wrapper.style.setProperty('--lanyard-card-top', `${cardTop}px`)
      renderer.setSize(canvasWidth, canvasHeight, false)
      camera.left = -canvasWidth / 2
      camera.right = canvasWidth / 2
      camera.top = canvasHeight / 2
      camera.bottom = -canvasHeight / 2
      camera.updateProjectionMatrix()
      updateCard()
      updateRope()
      renderer.render(scene, camera)
    }

    const pointerDown = event => {
      dragging = true
      pointerId = event.pointerId
      startX = event.clientX
      startY = event.clientY
      originX = x
      originY = y
      maxPull = 0
      targetX = x
      targetY = y
      vx = 0
      vy = 0
      card.setPointerCapture(pointerId)
      card.classList.add('is-dragging')
      startRender()
      event.preventDefault()
    }

    const pointerMove = event => {
      if (!dragging || event.pointerId !== pointerId) return
      targetX = clamp(originX + (event.clientX - startX) * 0.42, -72, 72)
      targetY = clamp(originY + event.clientY - startY, -10, 190)
      maxPull = Math.max(maxPull, Math.max(0, targetY))
      startRender()
      event.preventDefault()
    }

    const release = event => {
      if (!dragging) return
      dragging = false
      card.classList.remove('is-dragging')
      const successfulPull = maxPull >= 96
      targetX = 0
      targetY = 0
      if (pointerId !== null && card.hasPointerCapture(pointerId)) card.releasePointerCapture(pointerId)
      pointerId = null
      if (successfulPull) toggleTheme()
      event?.preventDefault()
    }

    card.addEventListener('pointerdown', pointerDown)
    card.addEventListener('pointermove', pointerMove)
    card.addEventListener('pointerup', release)
    card.addEventListener('pointercancel', release)

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    let visible = true
    let running = false

    const render = () => {
      const stiffness = dragging ? 0.28 : 0.095
      const damping = dragging ? 0.62 : 0.86
      vx = (vx + (targetX - x) * stiffness) * damping
      vy = (vy + (targetY - y) * stiffness) * damping
      x += vx
      y += vy

      if (!dragging && Math.abs(x) < 0.02 && Math.abs(y) < 0.02 && Math.abs(vx) < 0.02 && Math.abs(vy) < 0.02) {
        x = 0
        y = 0
        vx = 0
        vy = 0
      }

      updateCard()
      updateRope()
      renderer.render(scene, camera)

      const isMoving = dragging || Math.abs(x) > 0.02 || Math.abs(y) > 0.02 || Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02
      if (isMoving && visible && !reducedMotion) {
        frame = requestAnimationFrame(render)
      } else {
        running = false
      }
    }

    const startRender = () => {
      if (running || !visible || reducedMotion) return
      running = true
      frame = requestAnimationFrame(render)
    }

    const scheduleSync = () => {
      cancelAnimationFrame(syncFrame)
      syncFrame = requestAnimationFrame(syncCanvasGeometry)
    }

    const observer = new ResizeObserver(scheduleSync)
    observer.observe(wrapper)
    observer.observe(nav)
    window.addEventListener('resize', scheduleSync, { passive: true })
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.visualViewport?.addEventListener('resize', scheduleSync, { passive: true })

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      if (visible) {
        startRender()
      } else {
        running = false
        cancelAnimationFrame(frame)
      }
    }, { rootMargin: '200px' })
    visibilityObserver.observe(wrapper)

    syncCanvasGeometry()
    wrapper.classList.add('three-ready')
    startRender()

    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('resize', scheduleSync)
      window.removeEventListener('scroll', scheduleSync)
      window.visualViewport?.removeEventListener('resize', scheduleSync)
      card.removeEventListener('pointerdown', pointerDown)
      card.removeEventListener('pointermove', pointerMove)
      card.removeEventListener('pointerup', release)
      card.removeEventListener('pointercancel', release)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(syncFrame)
      ropeSegments.forEach(segment => scene.remove(segment))
      segmentGeometry.dispose()
      claspGeometry.dispose()
      ropeMaterial.dispose()
      claspMaterial.dispose()
      renderer.dispose()
      materialRef.current = null
    }
  }, [toggleTheme])

  return (
    <div ref={wrapperRef} className="id-card-wrapper reveal">
      <canvas ref={canvasRef} id="lanyardCanvas" className="lanyard-canvas" aria-hidden="true" />
      <span className="lanyard-anchor-dot" aria-hidden="true" />
      <span className="lanyard-fallback" aria-hidden="true">
        <span className="lanyard-strap" />
        <span className="lanyard-clasp" />
      </span>
      <div
        ref={cardRef}
        className="lanyard-card-shell"
        role="button"
        tabIndex={0}
        aria-label="Tarik kartu identitas untuk mengganti mode tampilan"
      >
        <span className="id-card id-card-image-only" id="idCard">
          <img
            className="id-card-full-image"
            src={portfolioData.site.idCardImage || portfolioData.site.heroImage}
            alt="Akbar Fahlevy"
            loading="eager"
            decoding="async"
            draggable="false"
          />
        </span>
        <span className="lanyard-pull-cue" aria-hidden="true">
          <span>Tarik ke bawah</span>
          <i className="fa-solid fa-arrow-down" />
        </span>
      </div>
    </div>
  )
}

export default memo(LanyardCard)
