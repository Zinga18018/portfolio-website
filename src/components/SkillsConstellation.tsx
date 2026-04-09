'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useReveal } from '@/lib/useReveal'

interface SkillNode {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  group: number
  label: string
}

interface Edge {
  from: number
  to: number
}

const GROUPS = [
  { name: 'ML & AI', color: '#10b981', skills: ['PyTorch', 'TensorFlow', 'Transformers', 'scikit-learn', 'XGBoost', 'LangChain', 'Hugging Face', 'spaCy'] },
  { name: 'Models', color: '#8b5cf6', skills: ['TinyLlama', 'DistilBERT', 'ViT', 'GPT-2', 'VGG19', 'ARIMA', 'RAG'] },
  { name: 'Infra', color: '#f59e0b', skills: ['FastAPI', 'Docker', 'AWS', 'GCP', 'CUDA', 'CI/CD', 'Linux'] },
  { name: 'Data', color: '#06b6d4', skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Plotly', 'Streamlit'] },
  { name: 'Databases', color: '#ec4899', skills: ['PostgreSQL', 'MongoDB', 'ChromaDB', 'Redis', 'Spark'] },
  { name: 'Stats', color: '#f97316', skills: ['Hypothesis Testing', 'A/B Testing', 'Regression', 'Time Series', 'SHAP'] },
]

function buildGraph(): { nodes: SkillNode[]; edges: Edge[] } {
  const nodes: SkillNode[] = []
  const edges: Edge[] = []

  GROUPS.forEach((group, gi) => {
    const angle = (gi / GROUPS.length) * Math.PI * 2
    const cx = 0.5 + Math.cos(angle) * 0.28
    const cy = 0.5 + Math.sin(angle) * 0.28

    group.skills.forEach((skill, si) => {
      const sa = (si / group.skills.length) * Math.PI * 2
      const spread = 0.08 + Math.random() * 0.06
      nodes.push({
        id: skill,
        x: cx + Math.cos(sa) * spread,
        y: cy + Math.sin(sa) * spread,
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        radius: skill.length > 10 ? 3 : 3.5,
        group: gi,
        label: skill,
      })
    })
  })

  // Connect skills within the same group
  let idx = 0
  GROUPS.forEach((group) => {
    for (let i = 0; i < group.skills.length; i++) {
      for (let j = i + 1; j < group.skills.length; j++) {
        if (Math.random() < 0.4) {
          edges.push({ from: idx + i, to: idx + j })
        }
      }
      // Always connect adjacent
      if (i < group.skills.length - 1) {
        edges.push({ from: idx + i, to: idx + i + 1 })
      }
    }
    idx += group.skills.length
  })

  // A few cross-group connections
  const crossPairs = [
    ['Python', 'PyTorch'], ['FastAPI', 'Python'], ['Docker', 'AWS'],
    ['Pandas', 'scikit-learn'], ['ChromaDB', 'RAG'], ['CUDA', 'PyTorch'],
    ['Streamlit', 'Plotly'], ['SQL', 'PostgreSQL'], ['LangChain', 'GPT-2'],
  ]
  crossPairs.forEach(([a, b]) => {
    const ai = nodes.findIndex(n => n.id === a)
    const bi = nodes.findIndex(n => n.id === b)
    if (ai >= 0 && bi >= 0) edges.push({ from: ai, to: bi })
  })

  return { nodes, edges }
}

export default function SkillsConstellation() {
  const sectionRef = useReveal()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const graphRef = useRef(buildGraph())
  const mouseRef = useRef({ x: -1, y: -1 })
  const hoveredRef = useRef(-1)
  const [hovered, setHovered] = useState(-1)
  const [dimensions, setDimensions] = useState({ w: 800, h: 500 })
  const animRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { nodes, edges } = graphRef.current
    const { w, h } = dimensions
    const dpr = window.devicePixelRatio || 1

    ctx.clearRect(0, 0, w * dpr, h * dpr)
    ctx.save()
    ctx.scale(dpr, dpr)

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    // Gentle drift
    nodes.forEach(node => {
      node.x += node.vx
      node.y += node.vy

      // Bounce at edges
      if (node.x < 0.05 || node.x > 0.95) node.vx *= -1
      if (node.y < 0.05 || node.y > 0.95) node.vy *= -1

      // Mouse repulsion
      if (mx >= 0) {
        const dx = node.x * w - mx
        const dy = node.y * h - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80 && dist > 0) {
          node.x += (dx / dist) * 0.002
          node.y += (dy / dist) * 0.002
        }
      }
    })

    // Find hovered node
    let closestIdx = -1
    let closestDist = 20
    if (mx >= 0) {
      nodes.forEach((node, i) => {
        const dx = node.x * w - mx
        const dy = node.y * h - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = i
        }
      })
    }
    if (closestIdx !== hoveredRef.current) {
      hoveredRef.current = closestIdx
      setHovered(closestIdx)
    }

    // Draw edges
    edges.forEach(({ from, to }) => {
      const a = nodes[from]
      const b = nodes[to]
      const isHighlighted = closestIdx === from || closestIdx === to
      ctx.beginPath()
      ctx.moveTo(a.x * w, a.y * h)
      ctx.lineTo(b.x * w, b.y * h)
      ctx.strokeStyle = isHighlighted
        ? `${GROUPS[a.group].color}50`
        : 'rgba(255,255,255,0.04)'
      ctx.lineWidth = isHighlighted ? 1.5 : 0.5
      ctx.stroke()
    })

    // Draw nodes
    nodes.forEach((node, i) => {
      const px = node.x * w
      const py = node.y * h
      const color = GROUPS[node.group].color
      const isHov = i === closestIdx
      const connectedToHovered = closestIdx >= 0 && edges.some(
        e => (e.from === closestIdx && e.to === i) || (e.to === closestIdx && e.from === i)
      )

      // Glow
      if (isHov || connectedToHovered) {
        ctx.beginPath()
        ctx.arc(px, py, isHov ? 16 : 10, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(px, py, 0, px, py, isHov ? 16 : 10)
        grad.addColorStop(0, `${color}30`)
        grad.addColorStop(1, `${color}00`)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Node dot
      ctx.beginPath()
      ctx.arc(px, py, isHov ? 5 : node.radius, 0, Math.PI * 2)
      ctx.fillStyle = isHov ? color : `${color}99`
      ctx.fill()

      // Label
      if (isHov || connectedToHovered) {
        ctx.font = `${isHov ? '13px' : '11px'} Inter, system-ui, sans-serif`
        ctx.fillStyle = isHov ? '#fff' : 'rgba(255,255,255,0.7)'
        ctx.textAlign = 'center'
        ctx.fillText(node.label, px, py - (isHov ? 12 : 8))
      }
    })

    ctx.restore()
    animRef.current = requestAnimationFrame(draw)
  }, [dimensions])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = Math.min(520, Math.max(380, w * 0.5))
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      setDimensions({ w, h })
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1, y: -1 }
  }, [])

  const hoveredNode = hovered >= 0 ? graphRef.current.nodes[hovered] : null

  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <div ref={sectionRef} className="reveal">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technical constellation</h2>
          <p className="text-zinc-400 mb-6 max-w-xl">
            Hover to explore. Connected nodes represent tools I use together in production.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {GROUPS.map((g, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                {g.name}
              </div>
            ))}
          </div>

          {/* Canvas */}
          <div className="relative rounded-xl border border-zinc-800/60 bg-zinc-950/50 overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="cursor-crosshair w-full"
            />

            {/* Hovered tooltip */}
            {hoveredNode && (
              <div className="absolute top-4 right-4 bg-zinc-900/90 border border-zinc-700 rounded-lg px-4 py-3 backdrop-blur-sm pointer-events-none">
                <p className="text-white font-semibold text-sm">{hoveredNode.label}</p>
                <p className="text-xs mt-1" style={{ color: GROUPS[hoveredNode.group].color }}>
                  {GROUPS[hoveredNode.group].name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
