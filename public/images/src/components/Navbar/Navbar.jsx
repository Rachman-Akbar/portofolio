import { memo, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const goTo = useCallback(hash => event => {
    event.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(`/#${hash}`)
  }, [location.pathname, navigate])

  return (
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
        </Link>
        <div className="nav-links">
          <a href="#perjalanan" onClick={goTo('perjalanan')}>Perjalanan</a>
          <a href="#proyek" onClick={goTo('proyek')}>Proyek</a>
          <a href="#kontak" onClick={goTo('kontak')} className="nav-cta">Hubungi Saya</a>
        </div>
      </div>
    </nav>
  )
}

export default memo(Navbar)
