'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '/research/women-safety', label: 'Paper' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = ''
      links.forEach(({ href }) => {
        if (!href.startsWith('#')) return
        const section = document.querySelector(href)
        if (section && section.getBoundingClientRect().top <= 144) current = href
      })
      setActiveHref(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`site-nav ${scrolled ? 'scrolled' : ''}`}
      aria-label="Primary navigation"
    >
      <div className="section-container nav-inner">
        <a href="#top" className="nav-mark"><span>YK</span><small>Data Science</small></a>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              aria-current={activeHref === l.href ? 'location' : undefined}
            >
              {l.label}
            </a>
          ))}
          <a href="mailto:kuchimanchiyogesh@gmail.com" className="nav-contact">
            Email me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="portfolio-mobile-menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu" id="portfolio-mobile-menu">
          <div className="section-container">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-link"
                aria-current={activeHref === l.href ? 'location' : undefined}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:kuchimanchiyogesh@gmail.com"
              className="nav-contact"
            >
              Email me
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
