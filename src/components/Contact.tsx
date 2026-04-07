const links = [
  { label: 'Email', value: 'kuchimanchiyogesh@gmail.com', href: 'mailto:kuchimanchiyogesh@gmail.com' },
  { label: 'LinkedIn', value: 'yogesh-kuchimanchi', href: 'https://linkedin.com/in/yogesh-kuchimanchi' },
  { label: 'GitHub', value: 'Zinga18018', href: 'https://github.com/Zinga18018' },
  { label: 'Hugging Face', value: 'Yogesh18018', href: 'https://huggingface.co/Yogesh18018' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <p className="text-sm font-mono text-accent mb-2">Contact</p>
        <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
        <p className="text-zinc-400 mb-10 max-w-md">
          Open to research collaborations, data science roles, and interesting ML projects.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          {links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener"
              className="card flex flex-col hover:border-accent/40 transition-colors">
              <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{l.label}</span>
              <span className="text-white text-sm">{l.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
