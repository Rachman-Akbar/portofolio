import Konva from 'konva'
import { useCallback, useEffect, useRef, useState } from 'react'
import { portfolioData } from '../../data/portfolioData'
import useRevealScope from '../../hooks/useRevealScope'
import './Contact.css'

function useKonvaForm(containerRef) {
  const motionRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    const stage = new Konva.Stage({ container, width: 1, height: 1 })
    const layer = new Konva.Layer()
    stage.add(layer)
    const trail = new Konva.Line({ points: [0, 0, 0, 0], stroke: '#d8d4f7', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', opacity: 0.85 })
    const plane = new Konva.Line({ points: [0, 0, 30, 10, 12, 18, 10, 32], closed: true, fill: '#6f61f5', opacity: 0.95 })
    const sparks = [
      new Konva.Circle({ radius: 4, fill: '#ff7f93', opacity: 0 }),
      new Konva.Circle({ radius: 4, fill: '#4f8dff', opacity: 0 }),
      new Konva.Circle({ radius: 4, fill: '#36bda1', opacity: 0 }),
    ]
    layer.add(trail, plane, ...sparks)
    let width = 1
    let height = 1

    const reset = () => {
      plane.position({ x: width * 0.16, y: height * 0.48 })
      plane.rotation(-8)
      plane.opacity(0.9)
      trail.opacity(0.85)
      trail.points([width * 0.05, height * 0.63, width * 0.12, height * 0.54, width * 0.2, height * 0.5])
      sparks.forEach(node => node.opacity(0))
      layer.batchDraw()
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      stage.size({ width, height })
      reset()
    }

    const send = () => {
      plane.to({ x: width * 0.78, y: height * 0.2, rotation: 12, opacity: 0.15, duration: 0.72, easing: Konva.Easings.EaseInOut })
      new Konva.Tween({ node: trail, duration: 0.72, opacity: 0.15, easing: Konva.Easings.EaseInOut }).play()
    }

    const success = () => {
      plane.position({ x: width * 0.5, y: height * 0.45 })
      plane.opacity(0.12)
      const targets = [
        { x: width * 0.36, y: height * 0.25 },
        { x: width * 0.52, y: height * 0.18 },
        { x: width * 0.67, y: height * 0.31 },
      ]
      sparks.forEach((node, index) => {
        node.position({ x: width * 0.5, y: height * 0.45 })
        node.opacity(1)
        node.scale({ x: 0.5, y: 0.5 })
        node.to({ x: targets[index].x, y: targets[index].y, scaleX: 1.7, scaleY: 1.7, opacity: 0, duration: 0.7 + index * 0.08, easing: Konva.Easings.EaseOut })
      })
      layer.batchDraw()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)
    resize()
    motionRef.current = { reset, send, success }

    return () => {
      observer.disconnect()
      stage.destroy()
      motionRef.current = null
    }
  }, [containerRef])

  return motionRef
}

export default function Contact() {
  const sectionRef = useRef(null)
  const konvaRef = useRef(null)
  const timeoutRef = useRef(0)
  const formRef = useRef(null)
  const motionRef = useKonvaForm(konvaRef)
  const [celebrate, setCelebrate] = useState(false)
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  useRevealScope(sectionRef)

  const openModal = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setCelebrate(false)
    requestAnimationFrame(() => setCelebrate(true))
    timeoutRef.current = window.setTimeout(() => {
      setOpen(true)
      setSuccess(false)
      motionRef.current?.reset()
      requestAnimationFrame(() => formRef.current?.querySelector('input:not([type="hidden"])')?.focus())
    }, 620)
  }, [motionRef])

  const closeModal = useCallback(() => {
    setOpen(false)
    setCelebrate(false)
  }, [])

  useEffect(() => {
    const escape = event => {
      if (event.key === 'Escape' && open) closeModal()
    }
    document.addEventListener('keydown', escape)
    return () => {
      clearTimeout(timeoutRef.current)
      document.removeEventListener('keydown', escape)
    }
  }, [closeModal, open])

  const submit = useCallback(async event => {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)
    motionRef.current?.send()
    const form = event.currentTarget
    const fields = new FormData(form)
    const payload = Object.fromEntries(fields.entries())
    try {
      const response = await fetch(portfolioData.contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Gagal mengirim pesan')
      setSuccess(true)
      motionRef.current?.success()
      timeoutRef.current = window.setTimeout(() => {
        form.reset()
        setSubmitting(false)
        closeModal()
      }, 2200)
    } catch {
      setSubmitting(false)
      motionRef.current?.reset()
      window.alert('Pesan belum berhasil dikirim. Silakan coba lagi atau gunakan email pada footer.')
    }
  }, [closeModal, motionRef, submitting])

  return (
    <section ref={sectionRef} className="section contact" id="kontak">
      <div className="section-head reveal">
        <p className="section-kicker">Kolaborasi</p>
        <h2 className="section-title">Mari Membuat Sesuatu yang Berguna</h2>
      </div>
      <div className="mail-stage reveal" id="mailStage">
        <div className={`mailbox-container${celebrate ? ' celebrate' : ''}`} id="openFormBtn">
          <span className="mail-confetti" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</span>
          <button className="letter-preview" type="button" aria-haspopup="dialog" aria-controls="contactForm" aria-label="Buka surat kolaborasi" onClick={openModal}>
            <span className="letter-line letter-line-a" />
            <span className="letter-line letter-line-b" />
            <span className="letter-seal" />
          </button>
          <span className="mailbox-box"><span className="mailbox-lid" /><span className="mailbox-slot" /><span className="mailbox-flag" /><span className="mailbox-post" /></span>
        </div>
      </div>
      <div className={`overlay${open ? ' active' : ''}`} id="overlay" onClick={closeModal} />
      <div className={`contact-form${open ? ' active' : ''}`} id="contactForm" role="dialog" aria-modal="true" aria-labelledby="formTitle" aria-hidden={!open}>
        <button className="close-btn" type="button" aria-label="Tutup form" onClick={closeModal}>×</button>
        <p className="form-kicker">Surat Baru</p>
        <h3 id="formTitle">Kirim Surat Kolaborasi</h3>
        <p className="form-sub">Ceritakan tujuan proyek, kebutuhan utama, dan bagaimana saya bisa membantu.</p>
        <div ref={konvaRef} className="form-konva" id="formKonva" aria-hidden="true" />
        <form ref={formRef} style={{ display: success ? 'none' : undefined }} onSubmit={submit}>
          <input type="hidden" name="_subject" value="Pesan baru dari portofolio MRAF" />
          <input type="hidden" name="_template" value="table" />
          <label><span>Nama</span><input type="text" name="name" placeholder="Nama Anda" autoComplete="name" required /></label>
          <label><span>Email</span><input type="email" name="email" placeholder="nama@email.com" autoComplete="email" required /></label>
          <label><span>Pesan</span><textarea name="message" rows="4" placeholder="Tuliskan pesan..." required /></label>
          <button type="submit" className="submit-btn" disabled={submitting}>{submitting ? 'Mengirim...' : 'Kirim Surat'}</button>
        </form>
        <div className={`form-success${success ? ' active' : ''}`}>
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.5 2.5L16 9" /></svg>
          <p>Surat terkirim. Terima kasih sudah menghubungi saya.</p>
        </div>
      </div>
    </section>
  )
}
