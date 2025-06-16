'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface CosmicElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  type: 'asteroid' | 'comet' | 'star' | 'nebula' | 'plasma'
  color: string
  opacity: number
  angle: number
}

export default function AsteroidShower() {
  const [elements, setElements] = useState<CosmicElement[]>([])

  const createCosmicElement = useMemo(() => {
    return (): CosmicElement => {
      const types: CosmicElement['type'][] = ['asteroid', 'comet', 'star', 'nebula', 'plasma']
      const type = types[Math.floor(Math.random() * types.length)]
      
      const colors = {
        asteroid: ['#ff6b35', '#f7931e', '#ffb347', '#ff8c42'],
        comet: ['#00d4ff', '#0099cc', '#66ccff', '#33b5e5'],
        star: ['#ffffff', '#ffffcc', '#ccffff', '#ffccff'],
        nebula: ['#9d4edd', '#7209b7', '#c77dff', '#e0aaff'],
        plasma: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec']
      }

      return {
        id: Math.random(),
        x: Math.random() * (window.innerWidth + 200) - 100,
        y: -50 - Math.random() * 100,
        size: type === 'nebula' ? Math.random() * 8 + 4 : Math.random() * 4 + 1,
        speed: type === 'comet' ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5,
        type,
        color: colors[type][Math.floor(Math.random() * colors[type].length)],
        opacity: Math.random() * 0.6 + 0.3,
        angle: Math.random() * 40 + 20
      }
    }
  }, [])

  useEffect(() => {
    // Create initial elements
    const initialElements = Array.from({ length: 30 }, createCosmicElement)
    setElements(initialElements)

    // Spawn new elements periodically
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.4) {
        setElements(prev => [...prev, createCosmicElement()])
      }
    }, 800)

    return () => clearInterval(spawnInterval)
  }, [createCosmicElement])

  useEffect(() => {
    const animateElements = () => {
      setElements(prev => 
        prev
          .map(element => ({
            ...element,
            x: element.x - Math.cos(element.angle * Math.PI / 180) * element.speed,
            y: element.y + Math.sin(element.angle * Math.PI / 180) * element.speed,
            opacity: element.type === 'star' ? element.opacity : Math.max(0, element.opacity - 0.001)
          }))
          .filter(element => 
            element.x > -200 && 
            element.y < window.innerHeight + 200 && 
            element.opacity > 0.1
          )
      )
    }

    const animationFrame = setInterval(animateElements, 16)
    return () => clearInterval(animationFrame)
  }, [])

  const renderElement = (element: CosmicElement) => {
    const baseStyle = {
      left: element.x,
      top: element.y,
      opacity: element.opacity
    }

    switch (element.type) {
      case 'asteroid':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={baseStyle}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              rotate: 360
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Main asteroid body */}
            <div
              className="rounded-full relative"
              style={{
                width: element.size,
                height: element.size,
                background: `radial-gradient(circle at 30% 30%, ${element.color}, ${element.color}88)`,
                boxShadow: `0 0 ${element.size * 3}px ${element.color}66, inset -2px -2px 4px rgba(0,0,0,0.3)`
              }}
            />
            
            {/* Fiery trail */}
            <motion.div
              className="absolute top-1/2"
              style={{
                left: element.size,
                width: element.size * 8,
                height: 2,
                background: `linear-gradient(90deg, ${element.color}, ${element.color}66, transparent)`,
                transform: 'translateY(-50%)',
                filter: 'blur(1px)'
              }}
              animate={{
                scaleX: [0.7, 1.3, 0.7],
                opacity: [0.8, 0.4, 0.8]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary trail */}
            <div
              className="absolute top-1/2"
              style={{
                left: element.size * 1.5,
                width: element.size * 12,
                height: 1,
                background: `linear-gradient(90deg, ${element.color}44, transparent)`,
                transform: 'translateY(-50%)',
                filter: 'blur(2px)'
              }}
            />
          </motion.div>
        )

      case 'comet':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={baseStyle}
          >
            {/* Comet nucleus */}
            <motion.div
              className="rounded-full"
              style={{
                width: element.size,
                height: element.size,
                background: `radial-gradient(circle, #ffffff, ${element.color})`,
                boxShadow: `0 0 ${element.size * 4}px ${element.color}88`
              }}
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Brilliant tail */}
            <motion.div
              className="absolute top-1/2"
              style={{
                left: element.size,
                width: element.size * 15,
                height: 4,
                background: `linear-gradient(90deg, ${element.color}, ${element.color}88, ${element.color}44, transparent)`,
                transform: 'translateY(-50%)',
                filter: 'blur(2px)'
              }}
              animate={{
                scaleX: [0.8, 1.2, 0.8],
                opacity: [0.9, 0.6, 0.9]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Outer glow tail */}
            <div
              className="absolute top-1/2"
              style={{
                left: element.size * 0.5,
                width: element.size * 20,
                height: 8,
                background: `linear-gradient(90deg, ${element.color}33, ${element.color}22, transparent)`,
                transform: 'translateY(-50%)',
                filter: 'blur(4px)'
              }}
            />
          </motion.div>
        )

      case 'star':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={baseStyle}
            animate={{
              opacity: [element.opacity * 0.3, element.opacity, element.opacity * 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: element.size,
                height: element.size,
                backgroundColor: element.color,
                boxShadow: `0 0 ${element.size * 2}px ${element.color}88`,
                filter: 'blur(0.5px)'
              }}
            />
          </motion.div>
        )

      case 'nebula':
        return (
          <motion.div
            key={element.id}
            className="absolute rounded-full"
            style={{
              ...baseStyle,
              width: element.size * 2,
              height: element.size * 2,
              background: `radial-gradient(circle, ${element.color}22, ${element.color}11, transparent)`,
              filter: 'blur(8px)'
            }}
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [element.opacity * 0.3, element.opacity * 0.7, element.opacity * 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )

      case 'plasma':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={baseStyle}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: element.size,
                height: element.size,
                background: `radial-gradient(circle, ${element.color}, ${element.color}66)`,
                boxShadow: `0 0 ${element.size * 5}px ${element.color}88`
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Plasma trail */}
            <motion.div
              className="absolute top-1/2"
              style={{
                left: element.size,
                width: element.size * 6,
                height: element.size * 0.8,
                background: `linear-gradient(90deg, ${element.color}88, ${element.color}44, transparent)`,
                transform: 'translateY(-50%)',
                filter: 'blur(1px)',
                borderRadius: '50%'
              }}
              animate={{
                scaleX: [0.5, 1.2, 0.5],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-black/80" />
      
      {/* Distant galaxies */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`galaxy-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: `radial-gradient(ellipse, ${['#9d4edd', '#7209b7', '#c77dff'][i % 3]} 0%, transparent 70%)`,
              filter: 'blur(30px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Render all cosmic elements */}
      {elements.map(renderElement)}

      {/* Epic shooting stars */}
      {typeof window !== 'undefined' && [...Array(4)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 50}%`,
            top: `${Math.random() * 30}%`
          }}
          animate={{
            x: [0, window.innerWidth + 300],
            y: [0, window.innerHeight * 0.7],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeOut"
          }}
        >
          {/* Shooting star core */}
          <div className="w-2 h-2 bg-white rounded-full shadow-lg" 
               style={{ boxShadow: '0 0 20px #ffffff88' }} />
          
          {/* Main trail */}
          <div 
            className="absolute top-1/2 left-full h-1 bg-gradient-to-r from-white via-blue-200 to-transparent transform -translate-y-1/2"
            style={{ width: '100px', filter: 'blur(1px)' }}
          />
          
          {/* Outer glow */}
          <div 
            className="absolute top-1/2 left-full h-3 bg-gradient-to-r from-white via-cyan-300 to-transparent transform -translate-y-1/2 opacity-50"
            style={{ width: '120px', filter: 'blur(3px)' }}
          />
        </motion.div>
      ))}
    </div>
  )
} 