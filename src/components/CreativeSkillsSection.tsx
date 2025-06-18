'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Star, Code2, Database, Sparkles, Brain, Globe, Cloud, Palette, TrendingUp } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  icon: React.ReactNode
  color: string
  level: 'novice' | 'intermediate' | 'advanced' | 'expert' | 'master'
  description: string
  x: number
  y: number
  size: number
  connections: string[]
  yearsExperience: number
  projects: number
}

// Technology Icons
const TechIcon = ({ name, className = "w-6 h-6" }: { name: string, className?: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    python: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="pythonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#306998"/>
            <stop offset="50%" stopColor="#4B8BBE"/>
            <stop offset="100%" stopColor="#FFD43B"/>
          </linearGradient>
        </defs>
        <path d="M12.18 2.09c-.92 0-1.8.08-2.55.23C7.86 2.75 6.5 3.84 6.5 5.5v2.27h5.45v.69H5.33c-1.5 0-2.83.9-3.25 2.61-.48 1.97-.5 3.2 0 5.24.37 1.52 1.25 2.61 2.75 2.61h1.78v-2.37c0-1.71 1.48-3.22 3.25-3.22h5.44c1.43 0 2.58-1.17 2.58-2.61V5.5c0-1.58-1.33-2.75-2.92-2.98-.82-.15-1.77-.23-2.73-.23zm-3.02 1.45c.54 0 .98.44.98.98 0 .53-.44.97-.98.97-.53 0-.97-.44-.97-.97 0-.54.44-.98.97-.98zm9.82 4.23v2.28c0 1.79-1.52 3.31-3.25 3.31H10.29c-1.41 0-2.58 1.21-2.58 2.61v5.22c0 1.58 1.38 2.51 2.92 2.75 1.85.29 3.62.03 5.44 0 1.21-.02 2.58-.65 2.58-2.75v-2.27h-5.44v-.69h8.19c1.5 0 2.06-1.05 2.58-2.61.54-1.61.51-3.15 0-5.24-.37-1.5-.98-2.61-2.58-2.61zm-3.02 11.13c.53 0 .97.44.97.97 0 .54-.44.98-.97.98-.54 0-.98-.44-.98-.98 0-.53.44-.97.98-.97z" fill="url(#pythonGrad)"/>
      </svg>
    ),
    javascript: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="jsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7DF1E"/>
            <stop offset="100%" stopColor="#F7E018"/>
          </linearGradient>
        </defs>
        <rect width="24" height="24" fill="url(#jsGrad)" rx="3"/>
        <path d="M6.5 19.5c0-1.5.8-2.3 2.2-2.3 1.2 0 1.8.6 1.8 1.8v1.5h-1.2v-1.4c0-.6-.3-.8-.7-.8-.5 0-.7.3-.7.9v2.3H6.5v-1.5zm6.5 0c0-1.5.9-2.3 2.5-2.3 1.4 0 2.3.8 2.3 2.1 0 1.5-.9 2.2-2.3 2.2-1.6 0-2.5-.8-2.5-2z" fill="#000"/>
        <path d="M8.5 8.5h1.2v6.2c0 1.3-.7 2-2 2s-2-.7-2-2v-.3h1.2v.3c0 .5.3.7.8.7s.8-.2.8-.7V8.5zm5.8 0h1.2v3.8c0 .8.3 1.1.8 1.1s.8-.3.8-1.1V8.5h1.2v3.8c0 1.4-.7 2.2-2 2.2s-2-.8-2-2.2V8.5z" fill="#000"/>
      </svg>
    ),
    react: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="reactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#61DAFB"/>
            <stop offset="100%" stopColor="#21D4FD"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="2" fill="url(#reactGrad)"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" stroke="url(#reactGrad)" strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" stroke="url(#reactGrad)" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" stroke="url(#reactGrad)" strokeWidth="1.5" fill="none" transform="rotate(-60 12 12)"/>
      </svg>
    ),
    tensorflow: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="tfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6F00"/>
            <stop offset="100%" stopColor="#FFA726"/>
          </linearGradient>
        </defs>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z" fill="url(#tfGrad)"/>
      </svg>
    ),
    aws: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="awsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9900"/>
            <stop offset="100%" stopColor="#232F3E"/>
          </linearGradient>
        </defs>
        <path d="M6.5 14.8c0-.2-.1-.3-.3-.3H3.8c-.2 0-.3.1-.3.3v.8c0 .2.1.3.3.3h2.4c.2 0 .3-.1.3-.3v-.8zM12 14.8c0-.2-.1-.3-.3-.3H9.3c-.2 0-.3.1-.3.3v.8c0 .2.1.3.3.3h2.4c.2 0 .3-.1.3-.3v-.8zm5.5 0c0-.2-.1-.3-.3-.3h-2.4c-.2 0-.3.1-.3.3v.8c0 .2.1.3.3.3h2.4c.2 0 .3-.1.3-.3v-.8z" fill="url(#awsGrad)"/>
        <path d="M3.5 17.5c3.8 2.8 9.3 2.8 13.1 0 .3-.2.6-.1.8.2.2.3.1.6-.2.8-4.2 3.1-10.1 3.1-14.3 0-.3-.2-.4-.5-.2-.8.2-.3.5-.4.8-.2z" fill="url(#awsGrad)"/>
      </svg>
    ),
    docker: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="dockerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2496ED"/>
            <stop offset="100%" stopColor="#0DB7ED"/>
          </linearGradient>
        </defs>
        <path d="M13.5 11h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm9-3h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2h-2V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5z" fill="url(#dockerGrad)"/>
        <path d="M21.5 11c-.3-2-1.4-3.5-3-4.2-.2-.1-.4 0-.5.2-.1.2 0 .4.2.5 1.3.6 2.2 1.8 2.4 3.2.1.6 0 1.2-.2 1.8-.5 1.4-1.5 2.5-2.9 3.1-1.8.8-3.9.7-5.6-.2-1.7-.9-2.8-2.5-3.1-4.4-.1-.6 0-1.2.2-1.8.5-1.4 1.5-2.5 2.9-3.1.2-.1.3-.3.2-.5-.1-.2-.3-.3-.5-.2-1.6.7-2.7 2.2-3 4.2-.1.7 0 1.4.3 2.1.6 1.6 1.8 2.9 3.4 3.6 2 .9 4.3.8 6.2-.3 1.6-.9 2.8-2.4 3.4-4.1.3-.7.3-1.4.2-2.1z" fill="url(#dockerGrad)"/>
      </svg>
    ),
    default: <Code2 className={className} />
  }
  return icons[name] || icons.default
}

// Skill level configurations
const skillLevels = {
  novice: { size: 40, glow: 8, pulseSpeed: 3, color: '#64748b' },
  intermediate: { size: 50, glow: 12, pulseSpeed: 2.5, color: '#3b82f6' },
  advanced: { size: 60, glow: 16, pulseSpeed: 2, color: '#8b5cf6' },
  expert: { size: 70, glow: 20, pulseSpeed: 1.5, color: '#f59e0b' },
  master: { size: 80, glow: 24, pulseSpeed: 1, color: '#ef4444' }
}

// Skills data with constellation positioning
const skillsData: Skill[] = [
  // Core Programming Constellation
  { id: 'python', name: 'Python', category: 'Programming', icon: <TechIcon name="python" />, color: '#3b82f6', level: 'master', description: 'Advanced scripting, data analysis, ML', x: 30, y: 25, size: 80, connections: ['pandas', 'tensorflow', 'sklearn'], yearsExperience: 4, projects: 25 },
  { id: 'javascript', name: 'JavaScript', category: 'Programming', icon: <TechIcon name="javascript" />, color: '#f59e0b', level: 'expert', description: 'Modern ES6+, async programming', x: 70, y: 20, size: 70, connections: ['react', 'nextjs'], yearsExperience: 3, projects: 18 },
  { id: 'sql', name: 'SQL', category: 'Programming', icon: <Database className="w-6 h-6" />, color: '#8b5cf6', level: 'expert', description: 'Complex queries, optimization', x: 50, y: 40, size: 70, connections: ['postgresql', 'mongodb'], yearsExperience: 3, projects: 20 },

  // ML/AI Constellation
  { id: 'tensorflow', name: 'TensorFlow', category: 'ML/AI', icon: <TechIcon name="tensorflow" />, color: '#ef4444', level: 'expert', description: 'Deep learning, neural networks', x: 20, y: 60, size: 70, connections: ['python', 'pytorch'], yearsExperience: 2, projects: 15 },
  { id: 'pytorch', name: 'PyTorch', category: 'ML/AI', icon: <Sparkles className="w-6 h-6" />, color: '#f97316', level: 'advanced', description: 'Research, experimentation', x: 40, y: 70, size: 60, connections: ['tensorflow'], yearsExperience: 2, projects: 12 },
  { id: 'sklearn', name: 'Scikit-learn', category: 'ML/AI', icon: <Star className="w-6 h-6" />, color: '#06b6d4', level: 'master', description: 'Classical ML algorithms', x: 15, y: 45, size: 80, connections: ['python'], yearsExperience: 3, projects: 22 },

  // Data Science Constellation
  { id: 'pandas', name: 'Pandas', category: 'Data Science', icon: <Database className="w-6 h-6" />, color: '#8b5cf6', level: 'master', description: 'Data manipulation, analysis', x: 25, y: 80, size: 80, connections: ['python', 'numpy'], yearsExperience: 4, projects: 30 },
  { id: 'numpy', name: 'NumPy', category: 'Data Science', icon: <TrendingUp className="w-6 h-6" />, color: '#3b82f6', level: 'expert', description: 'Numerical computing', x: 45, y: 85, size: 70, connections: ['pandas'], yearsExperience: 4, projects: 28 },

  // Web Development Constellation
  { id: 'react', name: 'React', category: 'Web Development', icon: <TechIcon name="react" />, color: '#06b6d4', level: 'expert', description: 'Component-based UIs', x: 80, y: 40, size: 70, connections: ['javascript', 'nextjs'], yearsExperience: 2, projects: 15 },
  { id: 'nextjs', name: 'Next.js', category: 'Web Development', icon: <Globe className="w-6 h-6" />, color: '#64748b', level: 'advanced', description: 'Full-stack React framework', x: 85, y: 60, size: 60, connections: ['react'], yearsExperience: 1, projects: 8 },

  // Cloud/DevOps Constellation
  { id: 'aws', name: 'AWS', category: 'Cloud/DevOps', icon: <TechIcon name="aws" />, color: '#f59e0b', level: 'advanced', description: 'Cloud infrastructure, ML services', x: 60, y: 15, size: 60, connections: ['docker'], yearsExperience: 2, projects: 12 },
  { id: 'docker', name: 'Docker', category: 'Cloud/DevOps', icon: <TechIcon name="docker" />, color: '#3b82f6', level: 'expert', description: 'Containerization, deployment', x: 75, y: 75, size: 70, connections: ['aws'], yearsExperience: 2, projects: 15 },

  // Database Constellation
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', icon: <Database className="w-6 h-6" />, color: '#8b5cf6', level: 'expert', description: 'Relational database design', x: 65, y: 85, size: 70, connections: ['sql'], yearsExperience: 2, projects: 14 },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', icon: <Database className="w-6 h-6" />, color: '#10b981', level: 'advanced', description: 'NoSQL, document storage', x: 85, y: 30, size: 60, connections: ['sql'], yearsExperience: 1, projects: 8 },
]

const categories = [
  { id: 'all', name: 'All Constellations', icon: <Sparkles className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
  { id: 'Programming', name: 'Programming', icon: <Code2 className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
  { id: 'ML/AI', name: 'ML/AI', icon: <Brain className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
  { id: 'Data Science', name: 'Data Science', icon: <TrendingUp className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
  { id: 'Web Development', name: 'Web Dev', icon: <Globe className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
  { id: 'Cloud/DevOps', name: 'Cloud/DevOps', icon: <Cloud className="w-4 h-4" />, color: 'from-indigo-500 to-purple-500' },
  { id: 'Databases', name: 'Databases', icon: <Database className="w-4 h-4" />, color: 'from-teal-500 to-cyan-500' },
]

const SkillOrb = ({ skill, isHighlighted, onHover, onLeave }: { 
  skill: Skill, 
  isHighlighted: boolean, 
  onHover: () => void, 
  onLeave: () => void 
}) => {
  const levelConfig = skillLevels[skill.level]

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.2 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: Math.random() * 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {/* Outer Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${skill.color}40, transparent)`,
          width: levelConfig.size + levelConfig.glow * 2,
          height: levelConfig.size + levelConfig.glow * 2,
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: levelConfig.pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Orb */}
      <motion.div
        className="relative rounded-full flex items-center justify-center backdrop-blur-md border-2"
        style={{
          width: levelConfig.size,
          height: levelConfig.size,
          background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
          borderColor: skill.color,
          boxShadow: `0 0 ${levelConfig.glow}px ${skill.color}80`
        }}
        animate={{
          boxShadow: [
            `0 0 ${levelConfig.glow}px ${skill.color}60`,
            `0 0 ${levelConfig.glow * 1.5}px ${skill.color}80`,
            `0 0 ${levelConfig.glow}px ${skill.color}60`
          ]
        }}
        transition={{
          duration: levelConfig.pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div style={{ color: skill.color }}>
          {skill.icon}
        </div>

        {/* Skill Level Indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold"
          style={{ 
            backgroundColor: levelConfig.color,
            color: 'white'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {skill.level === 'master' ? '★' : 
           skill.level === 'expert' ? '◆' : 
           skill.level === 'advanced' ? '●' : 
           skill.level === 'intermediate' ? '▲' : '○'}
        </motion.div>
      </motion.div>

      {/* Hover Info Panel */}
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -100, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700 min-w-max z-50"
          >
            <div className="text-center">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{skill.name}</h3>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-sm px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: levelConfig.color }}>
                  {skill.level.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {skill.yearsExperience} years • {skill.projects} projects
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-48">
                {skill.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ConnectionLine = ({ from, to, isActive }: { from: Skill, to: Skill, isActive: boolean }) => {
  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={isActive ? from.color : `${from.color}30`}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 0.8 : 0.3 
        }}
        transition={{ 
          duration: 2,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  )
}

export default function CreativeSkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    const section = document.getElementById('skills')
    if (section) observer.observe(section)
    
    return () => observer.disconnect()
  }, [])

  const filteredSkills = skillsData.filter(skill => 
    selectedCategory === 'all' || skill.category === selectedCategory
  )

  const getConnectedSkills = (skillId: string) => {
    const skill = skillsData.find(s => s.id === skillId)
    return skill?.connections || []
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Skills Constellation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Interactive technology orbs representing my expertise - hover to explore connections and details
          </p>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>★ Master</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>◆ Expert</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>● Advanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>▲ Intermediate</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Constellation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full h-[600px] bg-gradient-to-br from-gray-800/30 to-purple-900/30 rounded-3xl backdrop-blur-md border border-white/10 overflow-hidden"
        >
          {/* Connection Lines */}
          {filteredSkills.map(skill => 
            skill.connections.map(connectionId => {
              const connectedSkill = skillsData.find(s => s.id === connectionId)
              if (!connectedSkill || !filteredSkills.includes(connectedSkill)) return null
              
              return (
                <ConnectionLine
                  key={`${skill.id}-${connectionId}`}
                  from={skill}
                  to={connectedSkill}
                  isActive={hoveredSkill === skill.id || hoveredSkill === connectionId}
                />
              )
            })
          )}

          {/* Skill Orbs */}
          {filteredSkills.map(skill => (
            <SkillOrb
              key={skill.id}
              skill={skill}
              isHighlighted={hoveredSkill === skill.id}
              onHover={() => setHoveredSkill(skill.id)}
              onLeave={() => setHoveredSkill(null)}
            />
          ))}

                     {/* Floating Particles */}
           {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm">
            ✨ Hover over orbs to reveal connections • Larger orbs indicate higher expertise • Lines show technology relationships
          </p>
        </motion.div>
      </div>
    </section>
  )
} 