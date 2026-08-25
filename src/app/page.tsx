import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import SkillsConstellation from '@/components/SkillsConstellation'
import Contact from '@/components/Contact'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <SkillsConstellation />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>Yogesh Kuchimanchi · Built with care in Rochester, NY</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}
