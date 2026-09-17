'use client'

import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiGithub, FiStar } from 'react-icons/fi'
import initialRepos from '@/lib/github-repos.json'

type Repository = (typeof initialRepos)[number]
const profile = 'https://github.com/Zinga18018'

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repository[]>(initialRepos)
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    let active = true
    setStatus('loading')

    async function refresh() {
      const collected: Repository[] = []
      for (let page = 1; ; page++) {
        const response = await fetch(`https://api.github.com/users/Zinga18018/repos?type=owner&sort=pushed&per_page=100&page=${page}`, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (!response.ok) throw new Error('GitHub is temporarily unavailable')
        const items: Repository[] = await response.json()
        if (!Array.isArray(items)) throw new Error('Invalid repository response')
        collected.push(...items)
        if (items.length < 100) break
      }
      if (active) {
        setRepos(collected)
        setStatus('ready')
      }
    }

    refresh().catch(() => { if (active) setStatus('fallback') }).finally(() => clearTimeout(timeout))
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [attempt])

  const languages = Array.from(new Set(repos.map(repo => repo.language).filter((value): value is string => Boolean(value)))).sort()
  const search = query.trim().toLowerCase()
  const filtered = repos.filter(repo =>
    (language === 'All' || repo.language === language) &&
    `${repo.name} ${repo.description ?? ''} ${repo.language ?? ''}`.toLowerCase().includes(search)
  ).sort((a, b) => (b.pushed_at ?? '').localeCompare(a.pushed_at ?? '') || a.name.localeCompare(b.name))

  return (
    <section id="github-projects" className="section github-section" aria-labelledby="github-heading">
      <div className="section-container">
        <div className="section-intro">
          <p className="eyebrow">The full collection</p>
          <h2 id="github-heading">All GitHub Projects.</h2>
          <p>Explore my public repositories, from machine learning systems to experiments and tools. New public repositories appear automatically.</p>
        </div>
        <div className="repo-toolbar">
          <label>Search projects<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name, topic, or language" /></label>
          <label>Language<select value={language} onChange={event => setLanguage(event.target.value)}><option value="All">All languages</option>{languages.map(item => <option key={item}>{item}</option>)}</select></label>
          <a className="repo-profile" href={`${profile}?tab=repositories`} target="_blank" rel="noreferrer"><FiGithub /> View GitHub <FiArrowUpRight /></a>
        </div>
        <p className="repo-status" role="status">
          {filtered.length} of {repos.length} repositories · Most recently updated first
          {status === 'loading' && ' · Refreshing from GitHub…'}
          {status === 'ready' && ' · Updated from GitHub'}
          {status === 'fallback' && <> · Showing saved projects; GitHub could not be refreshed. <button type="button" onClick={() => setAttempt(value => value + 1)}>Retry</button></>}
        </p>
        <div className="repo-grid">
          {filtered.map(repo => (
            <article key={repo.id} className="repo-card">
              <div className="repo-meta"><span>{repo.language || 'Repository'}</span>{repo.fork && <span>Fork</span>}{repo.archived && <span>Archived</span>}</div>
              <h3><a href={`${profile}/${encodeURIComponent(repo.name)}`} target="_blank" rel="noreferrer">{repo.name.replace(/[-_]/g, ' ')} <FiArrowUpRight aria-hidden="true" /></a></h3>
              <p>{repo.description || 'Explore the source code and project files on GitHub.'}</p>
              <div className="repo-footer"><span>{repo.pushed_at ? `Updated ${repo.pushed_at.slice(0, 10)}` : 'Public repository'}</span>{repo.stargazers_count > 0 && <span><FiStar aria-hidden="true" /> {repo.stargazers_count} stars</span>}</div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="repo-empty">No matching projects. Try another search or language.</p>}
      </div>
    </section>
  )
}
