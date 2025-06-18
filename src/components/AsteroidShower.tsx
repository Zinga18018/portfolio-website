'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  type: 'star' | 'asteroid' | 'dust' | 'comet'
  color: string
  rotation: number
  rotationSpeed: number
  trail?: { x: number; y: number; opacity: number }[]
  life: number
  maxLife: number
  pulse: number
}

interface MousePosition {
  x: number
  y: number
}

interface AsteroidShowerProps {
  density?: 'low' | 'medium' | 'high'
  theme?: 'space' | 'cosmic' | 'minimal'
  interactive?: boolean
  reduceMotion?: boolean
}

export default function AsteroidShower({ 
  density = 'high', 
  theme = 'space', 
  interactive = true,
  reduceMotion = false 
}: AsteroidShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const lastTimeRef = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high')

  // Performance detection
  useEffect(() => {
    const checkPerformance = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion || reduceMotion) {
        setPerformanceMode('low')
        return
      }

      // Set default to medium for better stability
      setPerformanceMode('medium')
    }

    checkPerformance()
  }, [reduceMotion])

  // Particle configuration based on density and performance
  const getParticleConfig = useCallback(() => {
    const configs = {
      low: { count: 100, trailLength: 5 },
      medium: { count: 200, trailLength: 8 },
      high: { count: 300, trailLength: 10 }
    }

    const performanceMultiplier = performanceMode === 'high' ? 1 : performanceMode === 'medium' ? 0.8 : 0.6
    const baseConfig = configs[density]
    
    return {
      count: Math.floor(baseConfig.count * performanceMultiplier),
      trailLength: Math.floor(baseConfig.trailLength * performanceMultiplier)
    }
  }, [density, performanceMode])

  // Theme colors
  const getThemeColors = useCallback(() => {
    const themes = {
      space: {
        background: 'rgba(0, 0, 20, 0.02)',
        particles: [
          '#ffffff', '#e6f3ff', '#cce7ff', '#b3dbff', 
          '#99cfff', '#80c3ff', '#66b7ff', '#4dabff'
        ],
        comets: ['#ffd700', '#ffed4e', '#fff59d']
      },
      cosmic: {
        background: 'rgba(139, 69, 193, 0.03)',
        particles: [
          '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc',
          '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a'
        ],
        comets: ['#ff6ec7', '#ff9a9e', '#fad0c4']
      },
      minimal: {
        background: 'rgba(100, 100, 100, 0.01)',
        particles: [
          '#f5f5f5', '#eeeeee', '#e0e0e0', '#d5d5d5',
          '#cccccc', '#c0c0c0', '#b5b5b5', '#aaaaaa'
        ],
        comets: ['#90a4ae', '#78909c', '#607d8b']
      }
    }
    return themes[theme]
  }, [theme])

  // Create particle
  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const colors = getThemeColors()
    const types: Particle['type'][] = ['star', 'asteroid', 'dust', 'comet']
    const type = types[Math.floor(Math.random() * types.length)]
    
    // Adjust probabilities for better visual balance - more asteroids and variety
    const adjustedType = Math.random() < 0.35 ? 'star' : 
                        Math.random() < 0.35 ? 'dust' :
                        Math.random() < 0.25 ? 'asteroid' : 'comet'

    const isComet = adjustedType === 'comet'
    const size = isComet ? 2 + Math.random() * 4 : 
                adjustedType === 'asteroid' ? 1.5 + Math.random() * 3 :
                adjustedType === 'dust' ? 0.5 + Math.random() * 1.5 :
                0.8 + Math.random() * 2

    const speed = isComet ? 3 + Math.random() * 4 : 
                 adjustedType === 'asteroid' ? 1 + Math.random() * 2 :
                 0.5 + Math.random() * 1.5

    return {
      x: Math.random() * (canvas.width + 200) - 100,
      y: Math.random() * (canvas.height + 200) - 100,
      size,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      opacity: 0.3 + Math.random() * 0.7,
      type: adjustedType,
      color: isComet ? colors.comets[Math.floor(Math.random() * colors.comets.length)] :
             colors.particles[Math.floor(Math.random() * colors.particles.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      trail: isComet ? [] : undefined,
      life: Math.random(),
      maxLife: 1,
      pulse: Math.random() * Math.PI * 2
    }
  }, [getThemeColors])

  // Initialize particles
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const config = getParticleConfig()
    particlesRef.current = Array.from({ length: config.count }, () => createParticle(canvas))
  }, [createParticle, getParticleConfig])

  // Draw particle
  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    
    // Apply opacity
    ctx.globalAlpha = particle.opacity * Math.sin(particle.life * Math.PI)

    switch (particle.type) {
      case 'star':
        // Draw twinkling star
        ctx.fillStyle = particle.color
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        
        // Star shape
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5
          const x = Math.cos(angle) * particle.size
          const y = Math.sin(angle) * particle.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
          
          const innerAngle = ((i + 0.5) * Math.PI * 2) / 5
          const innerX = Math.cos(innerAngle) * (particle.size * 0.4)
          const innerY = Math.sin(innerAngle) * (particle.size * 0.4)
          ctx.lineTo(innerX, innerY)
        }
        ctx.closePath()
        ctx.fill()

        // Add glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
        break

      case 'asteroid':
        // Draw rough asteroid
        ctx.fillStyle = particle.color
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        
        ctx.beginPath()
        const sides = 6 + Math.floor(Math.random() * 4)
        for (let i = 0; i < sides; i++) {
          const angle = (i * Math.PI * 2) / sides
          const variation = 0.7 + Math.random() * 0.6
          const x = Math.cos(angle) * particle.size * variation
          const y = Math.sin(angle) * particle.size * variation
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        break

      case 'dust':
        // Draw small dust particle
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        break

      case 'comet':
        // Draw comet with trail
        if (particle.trail) {
          // Draw trail
          for (let i = 0; i < particle.trail.length; i++) {
            const trailPoint = particle.trail[i]
            ctx.globalAlpha = trailPoint.opacity * particle.opacity * 0.6
            ctx.fillStyle = particle.color
            ctx.beginPath()
            ctx.arc(trailPoint.x, trailPoint.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Draw comet head
        ctx.globalAlpha = particle.opacity
        const cometGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        cometGradient.addColorStop(0, particle.color)
        cometGradient.addColorStop(0.5, particle.color + '80')
        cometGradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = cometGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        break
    }
    
    ctx.restore()
  }, [])

  // Update particle
  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement, deltaTime: number, mouse: MousePosition) => {
    // Mouse interaction
    if (interactive && mouse) {
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 150) {
        const force = (150 - distance) / 150
        const angle = Math.atan2(dy, dx)
        particle.speedX -= Math.cos(angle) * force * 0.01
        particle.speedY -= Math.sin(angle) * force * 0.01
      }
    }

    // Update position
    particle.x += particle.speedX * deltaTime * 60
    particle.y += particle.speedY * deltaTime * 60
    particle.rotation += particle.rotationSpeed * deltaTime * 60

    // Update life cycle
    particle.life += deltaTime * 0.5
    if (particle.life > particle.maxLife) {
      particle.life = 0
    }

    // Update comet trail
    if (particle.type === 'comet' && particle.trail) {
      const config = getParticleConfig()
      particle.trail.unshift({ x: particle.x, y: particle.y, opacity: 1 })
      if (particle.trail.length > config.trailLength) {
        particle.trail.pop()
      }
      
      // Fade trail
      particle.trail.forEach((point, index) => {
        point.opacity = 1 - (index / particle.trail!.length)
      })
    }

    // Boundary wrapping with buffer
    const buffer = 100
    if (particle.x < -buffer) particle.x = canvas.width + buffer
    if (particle.x > canvas.width + buffer) particle.x = -buffer
    if (particle.y < -buffer) particle.y = canvas.height + buffer
    if (particle.y > canvas.height + buffer) particle.y = -buffer
  }, [interactive, getParticleConfig])

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const deltaTime = (currentTime - lastTimeRef.current) / 1000
    lastTimeRef.current = currentTime

    // Clear canvas with theme background
    const colors = getThemeColors()
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(particle, canvas, deltaTime, mouseRef.current)
      drawParticle(ctx, particle)
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [isVisible, updateParticle, drawParticle, getThemeColors])

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!interactive) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }, [interactive])

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    // Redistribute particles
    initParticles(canvas)
  }, [initParticles])

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initial setup
    handleResize()
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Event listeners
    window.addEventListener('resize', handleResize)
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleResize, handleMouseMove, animate, interactive])

  // Performance indicator (dev mode)
  const [showPerformance, setShowPerformance] = useState(false)
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: 'transparent',
          mixBlendMode: theme === 'minimal' ? 'normal' : 'screen'
        }}
      />
      
      {/* Performance Debug (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowPerformance(!showPerformance)}
            className="bg-black/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
          >
            Debug
          </button>
          {showPerformance && (
            <div className="mt-2 bg-black/80 text-white text-xs p-2 rounded backdrop-blur-sm">
              <div>Performance: {performanceMode}</div>
              <div>Particles: {particlesRef.current.length}</div>
              <div>Theme: {theme}</div>
              <div>Interactive: {interactive ? 'Yes' : 'No'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 