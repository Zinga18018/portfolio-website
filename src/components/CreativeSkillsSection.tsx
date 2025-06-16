'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Database, Cloud, Code, BarChart3, Zap, Settings, Terminal, Globe, GitBranch } from 'lucide-react'

interface SkillNode {
  id: string
  name: string
  level: number
  category: string
  icon: React.ReactNode
  color: string
  x: number
  y: number
  connections: string[]
}

const skillNodes: SkillNode[] = [
  // Core Languages
  { id: 'python', name: 'Python', level: 98, category: 'Languages', icon: <Code className="w-6 h-6" />, color: '#3776ab', x: 200, y: 200, connections: ['pandas', 'sklearn', 'tensorflow'] },
  { id: 'sql', name: 'SQL', level: 95, category: 'Languages', icon: <Database className="w-6 h-6" />, color: '#336791', x: 400, y: 150, connections: ['postgresql', 'mongodb'] },
  { id: 'r', name: 'R', level: 85, category: 'Languages', icon: <BarChart3 className="w-6 h-6" />, color: '#276DC3', x: 100, y: 300, connections: ['python'] },
  
  // Data Science
  { id: 'pandas', name: 'Pandas', level: 98, category: 'Data Science', icon: <Database className="w-6 h-6" />, color: '#150458', x: 300, y: 250, connections: ['numpy', 'sklearn'] },
  { id: 'numpy', name: 'NumPy', level: 95, category: 'Data Science', icon: <BarChart3 className="w-6 h-6" />, color: '#013243', x: 350, y: 320, connections: ['pandas'] },
  { id: 'sklearn', name: 'Scikit-learn', level: 95, category: 'ML/AI', icon: <Brain className="w-6 h-6" />, color: '#F7931E', x: 450, y: 280, connections: ['xgboost', 'tensorflow'] },
  
  // ML/AI
  { id: 'tensorflow', name: 'TensorFlow', level: 88, category: 'ML/AI', icon: <Brain className="w-6 h-6" />, color: '#FF6F00', x: 500, y: 200, connections: ['pytorch'] },
  { id: 'pytorch', name: 'PyTorch', level: 85, category: 'ML/AI', icon: <Brain className="w-6 h-6" />, color: '#EE4C2C', x: 550, y: 300, connections: ['tensorflow'] },
  { id: 'xgboost', name: 'XGBoost', level: 90, category: 'ML/AI', icon: <Zap className="w-6 h-6" />, color: '#00A651', x: 400, y: 350, connections: ['sklearn'] },
  
  // Tools & Platforms
  { id: 'streamlit', name: 'Streamlit', level: 95, category: 'Tools', icon: <Globe className="w-6 h-6" />, color: '#FF4B4B', x: 150, y: 150, connections: ['python'] },
  { id: 'docker', name: 'Docker', level: 85, category: 'MLOps', icon: <Settings className="w-6 h-6" />, color: '#2496ED', x: 250, y: 100, connections: ['aws'] },
  { id: 'aws', name: 'AWS', level: 82, category: 'Cloud', icon: <Cloud className="w-6 h-6" />, color: '#FF9900', x: 350, y: 80, connections: ['docker'] },
  
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', level: 90, category: 'Databases', icon: <Database className="w-6 h-6" />, color: '#336791', x: 500, y: 120, connections: ['sql'] },
  { id: 'mongodb', name: 'MongoDB', level: 85, category: 'Databases', icon: <Database className="w-6 h-6" />, color: '#47A248', x: 450, y: 50, connections: ['sql'] },
  
  // Development Tools
  { id: 'git', name: 'Git', level: 95, category: 'Tools', icon: <GitBranch className="w-6 h-6" />, color: '#F05032', x: 100, y: 100, connections: ['linux'] },
  { id: 'linux', name: 'Linux', level: 88, category: 'Tools', icon: <Terminal className="w-6 h-6" />, color: '#FCC624', x: 50, y: 200, connections: ['git'] },
]

export default function CreativeSkillsSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(
    skillNodes.reduce((acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }), {})
  )

  const categories = ['all', 'Languages', 'Data Science', 'ML/AI', 'Tools', 'MLOps', 'Cloud', 'Databases']

  const filteredNodes = selectedCategory === 'all' 
    ? skillNodes 
    : skillNodes.filter(node => node.category === selectedCategory)

  const handleNodeDrag = (nodeId: string, x: number, y: number) => {
    setNodePositions(prev => ({
      ...prev,
      [nodeId]: { x, y }
    }))
  }

  const resetPositions = () => {
    setNodePositions(
      skillNodes.reduce((acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }), {})
    )
  }

  const getConnectionPath = (from: SkillNode, to: SkillNode) => {
    const fromPos = nodePositions[from.id] || { x: from.x, y: from.y }
    const toPos = nodePositions[to.id] || { x: to.x, y: to.y }
    
    const dx = toPos.x - fromPos.x
    const dy = toPos.y - fromPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const midX = fromPos.x + dx * 0.5
    const midY = fromPos.y + dy * 0.5 - distance * 0.1
    
    return `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY} ${toPos.x} ${toPos.y}`
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Technical Universe
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my interconnected skill ecosystem - hover over nodes to see connections
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Skills' : category}
            </motion.button>
          ))}
        </div>

        {/* Control Panel */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={resetPositions}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Reset Positions & Play Around!
          </motion.button>
        </div>

        {/* Interactive Skill Network */}
        <div className="relative w-full h-96 bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl border border-gray-700 overflow-hidden" id="skills-container">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Connection Lines */}
            <AnimatePresence>
              {filteredNodes.map((node) =>
                node.connections.map((connectionId) => {
                  const connectedNode = filteredNodes.find(n => n.id === connectionId)
                  if (!connectedNode) return null
                  
                  const isHighlighted = hoveredNode === node.id || hoveredNode === connectionId
                  
                  return (
                    <motion.path
                      key={`${node.id}-${connectionId}`}
                      d={getConnectionPath(node, connectedNode)}
                      stroke="url(#connectionGradient)"
                      strokeWidth={isHighlighted ? 3 : 1}
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: isHighlighted ? 0.8 : 0.3,
                        strokeWidth: isHighlighted ? 3 : 1
                      }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  )
                })
              )}
            </AnimatePresence>
          </svg>

          {/* Skill Nodes */}
          <AnimatePresence>
            {filteredNodes.map((node, index) => {
              const position = nodePositions[node.id] || { x: node.x, y: node.y }
              return (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none"
                  style={{ left: `${(position.x / 600) * 100}%`, top: `${(position.y / 400) * 100}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.2 }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.2}
                  dragConstraints={{
                    left: -position.x + 30,
                    right: 600 - position.x - 30,
                    top: -position.y + 30,
                    bottom: 400 - position.y - 30
                  }}
                  onDragStart={() => setDraggedNode(node.id)}
                  onDrag={(event, info) => {
                    const newX = Math.max(30, Math.min(570, position.x + info.offset.x))
                    const newY = Math.max(30, Math.min(370, position.y + info.offset.y))
                    handleNodeDrag(node.id, newX, newY)
                  }}
                  onDragEnd={() => setDraggedNode(null)}
                >)
                <div 
                  className="relative p-4 rounded-full border-2 backdrop-blur-sm transition-all duration-300"
                  style={{
                    backgroundColor: `${node.color}20`,
                    borderColor: node.color,
                    boxShadow: hoveredNode === node.id ? `0 0 20px ${node.color}60` : 'none'
                  }}
                >
                  <div className="text-white">
                    {node.icon}
                  </div>
                  
                  {/* Node Label */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-gray-600"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: hoveredNode === node.id ? 1 : 0,
                      y: hoveredNode === node.id ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {node.name} - {node.level}%
                  </motion.div>
                </div>
              </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Academic Projects', value: '6+', color: 'from-cyan-400 to-blue-500' },
            { label: 'Technologies Learned', value: '20+', color: 'from-purple-400 to-pink-500' },
            { label: 'Coursework Focus', value: 'Data Science', color: 'from-green-400 to-emerald-500' },
            { label: 'Current Status', value: 'MS Student', color: 'from-orange-400 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-700 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 