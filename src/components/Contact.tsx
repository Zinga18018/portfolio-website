'use client'

import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div ref={ref} className="reveal contact-card">
          <div><p className="eyebrow">Contact</p><h2>Have a real data problem?</h2><p>I’m open to data science and ML engineering opportunities, research collaboration, and useful technical conversations.</p></div>
          <a className="contact-email" href={`mailto:${socialLinks.email}`}><FiMail /> {socialLinks.email}<FiArrowUpRight /></a>
          <div className="contact-links"><a href={socialLinks.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div>
        </div>
      </div>
    </section>
  )
}
