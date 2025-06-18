'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Bot, Send, Sparkles } from 'lucide-react'
import InteractiveAIDemo from './InteractiveAIDemo'

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false)

  // Expose the chatbot open function globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openChatbot = () => setIsOpen(true);
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).openChatbot;
      }
    };
  }, []);

  // Prevent page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Chatbot Icon - Always visible with maximum z-index */}
      <div
        id="chatbot-button"
        className="chatbot-container fixed bottom-6 right-6"
        style={{ 
          zIndex: 999999999,
          position: 'fixed',
          pointerEvents: 'auto',
          visibility: 'visible',
          opacity: 1,
          display: 'block'
        }}
        data-chatbot="true"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 border-2 border-purple-300/50 cursor-pointer"
          style={{ 
            pointerEvents: 'auto',
            zIndex: 999999999,
            position: 'relative'
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-8 h-8" />
          
          {/* Pulsing Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* AI Badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white pointer-events-none"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-2 h-2 text-white" />
          </motion.div>
        </motion.button>
      </div>

      {/* Popup Modal - Fixed z-index */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 999999998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Gemini AI Assistant
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Real AI-powered portfolio assistant by Google Gemini
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
              
              {/* Content */}
              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto" style={{ pointerEvents: 'auto' }}>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Welcome to Yogesh's Real AI Assistant! 🤖✨
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    I'm powered by Google Gemini AI and can answer any questions about Yogesh's portfolio, projects, and expertise in data science & machine learning. Ask me about:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {[
                      "🤖 Machine Learning Projects",
                      "📊 Data Science Experience", 
                      "🔬 Research Work",
                      "💼 Professional Background",
                      "🛠️ Technical Skills",
                      "🎓 Educational Journey"
                    ].map((topic, index) => (
                      <motion.div
                        key={topic}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ pointerEvents: 'auto' }}
                      >
                        {topic}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Interactive AI Demo Component */}
                <InteractiveAIDemo />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 