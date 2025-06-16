'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Cloud, GitBranch, Palette, BarChart3, Settings, Terminal, FileText, Zap, Globe } from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: string
  color: string
  icon: React.ReactNode
}

const skills: Skill[] = [
  { name: 'Python', level: 98, category: 'Languages', color: 'from-green-400 to-green-600', icon: <Code className="w-5 h-5" /> },
  { name: 'R', level: 85, category: 'Languages', color: 'from-blue-400 to-blue-600', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'SQL', level: 95, category: 'Languages', color: 'from-orange-400 to-orange-600', icon: <Database className="w-5 h-5" /> },
  { name: 'Java', level: 80, category: 'Languages', color: 'from-red-400 to-red-600', icon: <Code className="w-5 h-5" /> },
  { name: 'Scikit-learn', level: 95, category: 'ML/AI', color: 'from-purple-400 to-purple-600', icon: <Brain className="w-5 h-5" /> },
  { name: 'XGBoost', level: 90, category: 'ML/AI', color: 'from-green-400 to-green-600', icon: <Zap className="w-5 h-5" /> },
  { name: 'TensorFlow', level: 88, category: 'ML/AI', color: 'from-orange-400 to-orange-600', icon: <Brain className="w-5 h-5" /> },
  { name: 'PyTorch', level: 85, category: 'ML/AI', color: 'from-red-400 to-red-600', icon: <Brain className="w-5 h-5" /> },
  { name: 'Pandas', level: 98, category: 'Data', color: 'from-blue-400 to-blue-600', icon: <FileText className="w-5 h-5" /> },
  { name: 'NumPy', level: 95, category: 'Data', color: 'from-cyan-400 to-cyan-600', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'Tableau', level: 90, category: 'Visualization', color: 'from-blue-400 to-blue-600', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'Matplotlib', level: 92, category: 'Visualization', color: 'from-green-400 to-green-600', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'Streamlit', level: 95, category: 'Tools', color: 'from-red-400 to-red-600', icon: <Globe className="w-5 h-5" /> },
  { name: 'Docker', level: 85, category: 'MLOps', color: 'from-blue-400 to-blue-600', icon: <Settings className="w-5 h-5" /> },
  { name: 'FastAPI', level: 88, category: 'MLOps', color: 'from-green-400 to-green-600', icon: <Zap className="w-5 h-5" /> },
  { name: 'AWS', level: 82, category: 'Cloud', color: 'from-orange-400 to-orange-600', icon: <Cloud className="w-5 h-5" /> },
  { name: 'PostgreSQL', level: 90, category: 'Databases', color: 'from-blue-400 to-blue-600', icon: <Database className="w-5 h-5" /> },
  { name: 'MongoDB', level: 85, category: 'Databases', color: 'from-green-400 to-green-600', icon: <Database className="w-5 h-5" /> },
  { name: 'Git', level: 95, category: 'Tools', color: 'from-gray-400 to-gray-600', icon: <GitBranch className="w-5 h-5" /> },
  { name: 'Linux', level: 88, category: 'Tools', color: 'from-yellow-400 to-yellow-600', icon: <Terminal className="w-5 h-5" /> },
]

const categories = ['All', 'Languages', 'ML/AI', 'Data', 'Visualization', 'MLOps', 'Cloud', 'Databases', 'Tools']

export default function EnhancedSkillsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>([])

  useEffect(() => {
    const filtered = selectedCategory === 'All' 
      ? skills 
      : skills.filter(skill => skill.category === selectedCategory)
    
    setAnimatedSkills(filtered)
  }, [selectedCategory])

  const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-lg bg-gradient-to-r ${skill.color}`}>
            {skill.icon}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
        </div>
        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{skill.level}%</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-white opacity-20"
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )

  const RadarChart = () => {
    const radarData = [
      { label: 'Data Science', value: 95 },
      { label: 'Machine Learning', value: 92 },
      { label: 'Python/R', value: 95 },
      { label: 'Data Engineering', value: 88 },
      { label: 'MLOps', value: 85 },
      { label: 'Cloud/AWS', value: 82 },
    ]

    const centerX = 150
    const centerY = 150
    const radius = 100
    const angleStep = (2 * Math.PI) / radarData.length

    const getCoordinates = (index: number, valueRadius: number) => {
      const angle = index * angleStep - Math.PI / 2
      return {
        x: centerX + Math.cos(angle) * valueRadius,
        y: centerY + Math.sin(angle) * valueRadius
      }
    }

    const pathData = radarData
      .map((item, index) => {
        const coords = getCoordinates(index, (item.value / 100) * radius)
        return `${index === 0 ? 'M' : 'L'} ${coords.x} ${coords.y}`
      })
      .join(' ') + ' Z'

    return (
      <div className="relative">
        <svg width="300" height="300" className="overflow-visible">
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map((percent) => (
            <circle
              key={percent}
              cx={centerX}
              cy={centerY}
              r={(percent / 100) * radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-600"
              opacity="0.3"
            />
          ))}

          {/* Grid lines */}
          {radarData.map((_, index) => {
            const coords = getCoordinates(index, radius)
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={coords.x}
                y2={coords.y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300 dark:text-gray-600"
                opacity="0.3"
              />
            )
          })}

          {/* Data polygon */}
          <motion.path
            d={pathData}
            fill="url(#radarGradient)"
            stroke="url(#radarStroke)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Data points */}
          {radarData.map((item, index) => {
            const coords = getCoordinates(index, (item.value / 100) * radius)
            return (
              <motion.circle
                key={index}
                cx={coords.x}
                cy={coords.y}
                r="4"
                fill="url(#radarStroke)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="drop-shadow-lg"
              />
            )
          })}

          {/* Labels */}
          {radarData.map((item, index) => {
            const coords = getCoordinates(index, radius + 20)
            return (
              <motion.text
                key={index}
                x={coords.x}
                y={coords.y}
                textAnchor="middle"
                className="text-sm font-medium fill-current text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                {item.label}
              </motion.text>
            )
          })}

          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive skill set spanning AI/ML, full-stack development, and cloud technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Skills List */}
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Skills Bars */}
            <div className="space-y-6">
              {animatedSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Skill Proficiency Overview
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <RadarChart />
            </div>
            
            {/* Legend */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'].map((level, index) => (
                <div key={level} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  />
                  <span className="text-gray-600 dark:text-gray-300">{level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Years Experience', value: '2+', icon: <Code className="w-6 h-6" /> },
            { label: 'Projects Completed', value: '6+', icon: <GitBranch className="w-6 h-6" /> },
            { label: 'Technologies', value: '20+', icon: <Database className="w-6 h-6" /> },
            { label: 'Research Work', value: '3+', icon: <Palette className="w-6 h-6" /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 