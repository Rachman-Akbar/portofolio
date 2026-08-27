import { memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StarIntro.css'

gsap.registerPlugin(ScrollTrigger)

function createFacetedStarGeometry(points = 5, outerRadius = 2.25, innerRadius = 0.95, depth = 0.72) {
  const perimeter = []
  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : innerRadius
    const angle = -Math.PI / 2 + (index * Math.PI) / points
    perimeter.push([Math.cos(angle) * radius, Math.sin(angle) * radius])
  }

  const vertices = []
  for (let index = 0; index < perimeter.length; index += 1) {
    const next = (index + 1) % perimeter.length
    const [x1, y1] = perimeter[index]
    const [x2, y2] = perimeter[next]
    vertices.push(0, 0, depth, x1, y1, 0, x2, y2, 0)
    vertices.push(0, 0, -depth, x2, y2, 0, x1, y1, 0)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.computeVertexNormals()
  geometry.center()
  return geometry
}

export default memo(function StarIntro() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const cueRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return undefined

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 190)
    camera.position.set(0, 0, 18)

    const ambient = new THREE.AmbientLight(0xfff8d2, 1.8)
    const key = new THREE.DirectionalLight(0xffe56e, 2.8)
    const fill = new THREE.DirectionalLight(0xffffff, 1.4)
    const rim = new THREE.DirectionalLight(0xffb832, 1.65)
    key.position.set(4, 6, 8)
    fill.position.set(-4, 2, 6)
    rim.position.set(-3, -3, 4)
    scene.add(ambient, key, fill, rim)

    const palette = [0xff6f91, 0x8d7cff, 0x4f9dff, 0x39c9a7, 0xffc84f, 0xff8f5a]
    const clouds = []
    const geometries = []
    const materials = []

    palette.forEach((color, colorIndex) => {
      const count = 250
      const positions = new Float32Array(count * 3)
      for (let index = 0; index < count; index += 1) {
        const i3 = index * 3
        const angle = Math.random() * Math.PI * 2
        const radius = 0.9 + Math.pow(Math.random(), 0.72) * 23
        positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2.8
        positions[i3 + 1] = Math.sin(angle) * radius * 0.62 + (Math.random() - 0.5) * 3.2
        positions[i3 + 2] = 4 - Math.random() * 118 - colorIndex * 1.2
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({
        color,
        size: 0.1 + colorIndex * 0.004,
        transparent: true,
        opacity: 0.68,
        sizeAttenuation: true,
        depthWrite: false,
      })
      const points = new THREE.Points(geometry, material)
      points.rotation.z = colorIndex * 0.14
      scene.add(points)
      clouds.push(points)
      geometries.push(geometry)
      materials.push(material)
    })

    const haloGeometry = new THREE.TorusGeometry(5.8, 0.014, 8, 220)
    const haloMaterial = new THREE.MeshBasicMaterial({ color: 0xffd84d, transparent: true, opacity: 0.18 })
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    halo.rotation.x = Math.PI * 0.42
    halo.rotation.y = Math.PI * 0.16
    scene.add(halo)

    const starGeometry = createFacetedStarGeometry()
    const starMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffd84d,
      emissive: 0x6a4700,
      emissiveIntensity: 0.42,
      roughness: 0.27,
      metalness: 0.12,
      clearcoat: 0.74,
      clearcoatRoughness: 0.2,
      flatShading: true,
    })
    const star = new THREE.Mesh(starGeometry, starMaterial)
    scene.add(star)

    const edgeGeometry = new THREE.EdgesGeometry(starGeometry, 16)
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffb91f, transparent: true, opacity: 0.58 })
    star.add(new THREE.LineSegments(edgeGeometry, edgeMaterial))

    const state = { z: 18, rotation: 0, spread: 0, starScale: 1 }
    let frame = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    let visible = true
    let running = false

    const render = time => {
      camera.position.z = state.z
      camera.position.x = Math.sin(state.rotation * 0.7) * 0.9
      camera.position.y = Math.cos(state.rotation * 0.52) * 0.45
      camera.rotation.z = state.rotation * 0.025

      clouds.forEach((cloud, index) => {
        cloud.rotation.z = time * (0.000018 + index * 0.0000018) + state.rotation * (0.03 + index * 0.005) + index * 0.12
        cloud.rotation.y = Math.sin(time * 0.00015 + index) * 0.018 + state.spread * 0.025
      })

      halo.rotation.z = time * 0.00008 + state.rotation * 0.12
      halo.scale.setScalar(1 + state.spread * 0.18)

      star.position.set(0, 0.08, camera.position.z - 7.4)
      star.rotation.y = time * 0.0012 + state.rotation * 0.82
      star.rotation.z = time * 0.0005 - state.rotation * 0.2
      star.rotation.x = -0.2 + Math.sin(time * 0.00075) * 0.2
      star.scale.setScalar(state.starScale)

      renderer.render(scene, camera)
      if (visible) {
        frame = requestAnimationFrame(render)
      } else {
        running = false
      }
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.15,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .to(state, { z: -54, rotation: 4.4, spread: 1, starScale: 0.74, duration: 1, ease: 'none' }, 0)
      .to(cueRef.current, { opacity: 0, y: 18, duration: 0.28, ease: 'none' }, 0)

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      if (visible && !running) {
        running = true
        frame = requestAnimationFrame(render)
      } else if (!visible) {
        running = false
        cancelAnimationFrame(frame)
      }
    }, { rootMargin: '250px' })
    visibilityObserver.observe(section)

    resize()
    running = true
    frame = requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
      cancelAnimationFrame(frame)
      timeline.scrollTrigger?.kill()
      timeline.kill()
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => material.dispose())
      haloGeometry.dispose()
      haloMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      edgeGeometry.dispose()
      edgeMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section className="star-intro" id="starIntro" ref={sectionRef} aria-label="Pembuka portofolio interaktif">
      <div className="star-intro-sticky">
        <canvas ref={canvasRef} id="starCanvas" aria-hidden="true" />
        <div ref={cueRef} className="star-scroll-label" aria-hidden="true">
          <span>Scroll</span>
          <i className="fa-solid fa-arrow-down" />
        </div>
      </div>
    </section>
  )
})
