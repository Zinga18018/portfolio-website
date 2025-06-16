'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code, Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [loadingText, setLoadingText] = useState('')
  
  const loadingTexts = [
    'Initializing AI systems...',
    'Loading neural networks...',
    'Preparing interactive demos...',
    'Optimizing performance...',
    'Almost ready!'
  ]

  useEffect(() => {
    let textIndex = 0
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[textIndex])
      textIndex = (textIndex + 1) % loadingTexts.length
    }, 800)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    return () => {
      clearInterval(textInterval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Logo/Icon */}
            <motion.div
              className="mb-8 relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="relative w-24 h-24 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full">
                  <div className="w-full h-full flex items-center justify-center">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-900" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Code className="w-3 h-3 text-green-900" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Zinga18018
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              AI Engineer & ML Specialist
            </motion.p>

            {/* Loading Progress */}
            <motion.div
              className="w-64 mx-auto"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-white h-full rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 3, ease: 'easeInOut' }}
                />
              </div>
              
              {/* Loading Text */}
              <motion.p
                key={loadingText}
                className="text-white/70 text-sm mt-4 h-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loadingText}
              </motion.p>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 