'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/60' : ''
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        <a href="#" className="text-white font-bold text-lg tracking-tight">
          YK<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="mailto:kuchimanchiyogesh@gmail.com" className="btn-primary text-sm !py-2 !px-4">
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#09090b]/98 backdrop-blur-md border-b border-zinc-800/60 pb-6">
          <div className="section-container flex flex-col gap-4 pt-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-white transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:kuchimanchiyogesh@gmail.com"
              className="btn-primary text-sm !py-2 w-fit mt-2"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
