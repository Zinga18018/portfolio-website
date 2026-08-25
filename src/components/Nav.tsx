'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`site-nav ${scrolled ? 'scrolled' : ''}`}
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
          onClick={() => setOpen(!open)}
          className="nav-toggle"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu">
          <div className="section-container">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-link"
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
