'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Github, Mail, Linkedin, Database, Brain, TrendingUp, Zap, Download } from 'lucide-react'

const TypewriterEffect = ({ texts, speed = 100, deleteSpeed = 50, delayBetween = 2000 }: {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  delayBetween?: number
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex]
      
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delayBetween)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, speed, deleteSpeed, delayBetween])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setIsVisible(scrolled < 300) // Increased threshold for better visibility
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#skills') || document.querySelector('section:nth-child(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30" style={{ marginLeft: "-60px" }}
        >
          <motion.button
            onClick={scrollToNextSection}
            className="group relative flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Animated Scroll Orb */}
            <motion.div
              className="relative w-12 h-20 border-2 border-cyan-400/60 rounded-full backdrop-blur-sm bg-gray-900/40 flex items-start justify-center pt-3"
              animate={{ 
                borderColor: [
                  "rgba(6, 182, 212, 0.6)",
                  "rgba(147, 51, 234, 0.6)", 
                  "rgba(6, 182, 212, 0.6)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {/* Animated Scroll Dot */}
              <motion.div
                className="w-2 h-2 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [1, 0.3, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut",
                  delay: 0.5 
                }}
              />
              
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            
            {/* Elegant Text Label */}
            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.span 
                className="text-xs font-light tracking-widest text-cyan-300/80 uppercase"
                animate={{ 
                  color: [
                    "rgba(103, 232, 249, 0.8)",
                    "rgba(196, 181, 253, 0.8)",
                    "rgba(103, 232, 249, 0.8)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                Explore Below
              </motion.span>
            </motion.div>

            {/* Subtle Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-400/10 to-purple-400/10 blur-xl"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "easeInOut" 
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function AnimatedHero() {
  const typingTexts = [
    "Data Scientist",
    "ML Engineer", 
    "AI Researcher",
    "Python Developer",
    "Data Analyst"
  ]

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const floatingIcons = [
    { icon: <Database className="w-6 h-6" />, delay: 0.2, x: "10%", y: "20%" },
    { icon: <Brain className="w-8 h-8" />, delay: 0.8, x: "80%", y: "30%" },
    { icon: <TrendingUp className="w-5 h-5" />, delay: 1.2, x: "15%", y: "70%" },
    { icon: <Zap className="w-7 h-7" />, delay: 1.6, x: "85%", y: "60%" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-8 py-12 text-center relative z-10 overflow-visible"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ minHeight: "auto", overflow: "visible" }}
      >
        <motion.div variants={itemVariants} className="px-6 py-8">
          <motion.h1 
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-tight overflow-visible"
            animate={floatingAnimation}
            style={{ 
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontFeatureSettings: "'kern' 1, 'liga' 1",
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              wordBreak: "keep-all",
              overflow: "visible",
              display: "block",
              width: "100%"
            }}
          >
            Yogesh Kuchimanchi
          </motion.h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div className="text-xl md:text-3xl text-gray-300 mb-8 font-light">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <TypewriterEffect texts={typingTexts} />
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium"
            >
              View Projects
            </button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={scrollToContact}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400/10 backdrop-blur-sm transition-all duration-300 font-medium"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex gap-6 justify-center mb-8"
        >
          <motion.a
            href="https://github.com/Zinga18018"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-400/20 transition-all duration-300 text-white hover:text-cyan-400"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:kuchimanchiyogesh@gmail.com"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-purple-400/20 transition-all duration-300 text-white hover:text-purple-400"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/zinga/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-400/20 transition-all duration-300 text-white hover:text-blue-400"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* LinkedIn Profile & Chatbot Mention */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <motion.a
            href="https://www.linkedin.com/in/zinga/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn Profile
          </motion.a>
          

        </motion.div>


      </motion.div>

      {/* Floating Background Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-cyan-400/20"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2], 
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            delay: item.delay,
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
} 