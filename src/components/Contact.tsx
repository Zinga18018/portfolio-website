'use client'

import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { SiHuggingface } from 'react-icons/si'
import { useReveal } from '@/lib/useReveal'
import { socialLinks } from '@/lib/data'

const links = [
  {
    label: 'Email',
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
    icon: FiMail,
  },
  {
    label: 'GitHub',
    value: 'Zinga18018',
    href: socialLinks.github,
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    value: 'yogesh-kuchimanchi',
    href: socialLinks.linkedin,
    icon: FiLinkedin,
  },
  {
    label: 'Hugging Face',
    value: 'Yogesh18018',
    href: socialLinks.huggingface,
    icon: SiHuggingface,
  },
]

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's connect</h2>
          <p className="text-zinc-400 mb-6 max-w-md">
            Open to research collaborations, data science roles, and interesting ML projects.
          </p>

          <a href={`mailto:${socialLinks.email}`} className="btn-primary mb-10 inline-flex">
            <FiMail size={16} />
            Send me an email
          </a>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
            {links.map((l, i) => {
              const Icon = l.icon
              return (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="card flex items-center gap-3 hover:border-accent/40"
                >
                  <Icon size={18} className="text-accent shrink-0" />
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      {l.label}
                    </span>
                    <span className="text-white text-sm">{l.value}</span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
