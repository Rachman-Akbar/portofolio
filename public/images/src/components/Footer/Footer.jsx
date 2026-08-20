import { memo } from 'react'
import { portfolioData } from '../../data/portfolioData'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-top">
          <div className="footer-brand-block">
            <p className="footer-kicker">MRAF · Portfolio</p>
            <h2 className="footer-title">Open for thoughtful collaborations.</h2>
          </div>

          <a className="footer-contact" href={`mailto:${portfolioData.contact.email}`}>
            <span className="footer-contact-icon" aria-hidden="true"><i className="fa-solid fa-envelope" /></span>
            <span className="footer-contact-copy">
              <small>Contact</small>
              <strong>{portfolioData.contact.email}</strong>
            </span>
          </a>
        </div>

        <div className="footer-content">
          <div className="footer-identity">
            <strong>Mochammad Rachman Akbar Fahlevy</strong>
            <span>Software Engineer · Full Stack Developer</span>
          </div>

          <nav className="footer-socials" aria-label="Media sosial">
            {portfolioData.socials.map(item => item.url ? (
              <a
                className="footer-social-link"
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                <span className="footer-social-icon" aria-hidden="true"><i className={item.icon} /></span>
                <span className="footer-social-name">{item.label}</span>
                <span className="footer-social-arrow" aria-hidden="true">↗</span>
              </a>
            ) : null)}
          </nav>
        </div>

        <div className="footer-base">
          <span>© 2026 MRAF. All rights reserved.</span>
          <span>React · Three.js · GSAP</span>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
