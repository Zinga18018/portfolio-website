'use client'

import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/60' : ''
    }`}>
      <div className="section-container flex items-center justify-between h-16">
        <a href="#" className="text-white font-semibold tracking-tight">
          YK
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a href="mailto:kuchimanchiyogesh@gmail.com"
          className="text-sm text-accent hover:text-white transition-colors">
          Get in touch
        </a>
      </div>
    </nav>
  )
}
