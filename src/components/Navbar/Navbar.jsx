import { memo, useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const goTo = useCallback(hash => event => {
    event.preventDefault()
    setSidebarOpen(false)
    if (location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(`/#${hash}`)
  }, [location.pathname, navigate])

  const handleNavClick = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  useEffect(() => {
    if (!sidebarOpen) return
    function onKey(e) {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link to="/#top" className="nav-logo nav-home" aria-label="Kembali ke beranda">
            <svg className="nav-star" viewBox="0 0 64 64" aria-hidden="true">
              <defs>
                <linearGradient id="navStarGradient" x1="7" y1="8" x2="57" y2="56" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#ff7f93" />
                  <stop offset="0.32" stopColor="#7d6cf2" />
                  <stop offset="0.62" stopColor="#4f8dff" />
                  <stop offset="1" stopColor="#49c7a5" />
                </linearGradient>
              </defs>
              <path fill="url(#navStarGradient)" d="M32 3.8l7.4 19 20.4 1.2-15.8 13 5.2 19.8L32 45.7 14.8 56.8 20 37 4.2 24l20.4-1.2L32 3.8z" />
            </svg>
            <span className="nav-name">M. Rachman Akbar F.</span>
          </Link>
          <div className="nav-links">
            <a href="#perjalanan" onClick={goTo('perjalanan')}>Perjalanan</a>
            <a href="#proyek" onClick={goTo('proyek')}>Proyek</a>
            <Link to="/work">Pengalaman</Link>
            <a href="#kontak" onClick={goTo('kontak')} className="nav-cta">Hubungi Saya</a>
          </div>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div
            className="nav-sidebar-overlay is-open"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="nav-sidebar is-open"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi"
          >
            <div className="nav-sidebar-header">
              <span className="nav-sidebar-title">Menu</span>
              <button
                type="button"
                className="nav-sidebar-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </svg>
              </button>
            </div>
            <nav className="nav-sidebar-links">
              <a href="#perjalanan" onClick={goTo('perjalanan')}>Perjalanan</a>
              <a href="#proyek" onClick={goTo('proyek')}>Proyek</a>
              <Link to="/work" onClick={handleNavClick}>Pengalaman</Link>
              <a href="#kontak" onClick={goTo('kontak')} className="nav-sidebar-cta">Hubungi Saya</a>
            </nav>
          </aside>
        </>
      )}
    </>
  )
}

export default memo(Navbar)
