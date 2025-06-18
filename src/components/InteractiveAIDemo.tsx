'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

// Initialize Gemini AI with error handling
let genAI: GoogleGenerativeAI | null = null

try {
  genAI = new GoogleGenerativeAI('AIzaSyBDYDhq9B51nyE55Ue4MwAMVF8PoOPr-2I')
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error)
}

export default function InteractiveAIDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Yogesh's AI assistant powered by Google Gemini. I can help you learn about his background in data science, machine learning projects, technical skills, and research work. Ask me anything about his portfolio!",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Portfolio context for Gemini AI
  const portfolioContext = `
  You are an AI assistant for Yogesh Kuchimanchi's portfolio. Here's his background:

  PERSONAL INFO:
  - Name: Yogesh Kuchimanchi
  - Title: Data Scientist | Machine Learning Innovator
  - Currently: M.S. Data Science student at Rochester Institute of Technology (Aug 2024-Present)
  - Research Assistant at RIT (Jan-Feb 2025) with 75% performance improvements
  - Previous: Data Science Intern at Internpe (Jun-Jul 2024) with 40% efficiency gains

  EDUCATION:
  - Rochester Institute of Technology - M.S. Data Science (Aug 2024-Present)
  - Vellore Institute of Technology - PGP Data Science (Aug 2023-Jul 2024)
  - New Shores International College - B.C.A. (Nov 2020-Dec 2023)

  TECHNICAL SKILLS:
  - Programming: Python, R, SQL, Java, JavaScript, HTML/CSS
  - Machine Learning: Scikit-learn, XGBoost, TensorFlow, PyTorch, Keras
  - Data Tools: Pandas, NumPy, Matplotlib, Seaborn, Plotly
  - Big Data: Apache Spark, Hadoop
  - Databases: MySQL, PostgreSQL, MongoDB
  - Cloud: AWS, Google Cloud Platform, Azure
  - MLOps: Docker, Kubernetes, MLflow, Git
  - Visualization: Tableau, Power BI, Streamlit, Dash

  KEY PROJECTS:
  1. SymptomAid - AI-powered medical symptom analysis with 95% accuracy
  2. FixMyData - Automated data quality assessment tool
  3. Stock Sentiment Dashboard - Real-time sentiment analysis for trading
  4. Hecs-Refactoring - AI-powered code optimization platform
  5. Customer Churn Prediction - ML model with 92% accuracy
  6. Python Performance Optimization - 75% speed improvements

  ML PLAYGROUND PROJECTS:
  1. Neural Network Visualizer - Interactive neural network architecture explorer
  2. Time Series Forecaster - Advanced forecasting with multiple algorithms
  3. Scientific Paper Intelligence - AI-powered research paper analysis
  4. Computer Vision Laboratory - Real-time image processing demos

  ACHIEVEMENTS:
  - 95% average model accuracy across projects
  - 75% performance improvements in research work
  - 40% efficiency gains in data processing workflows
  - 12+ machine learning projects completed

  Please answer questions about Yogesh's background, skills, projects, education, and career in data science. Be helpful, informative, and showcase his expertise in AI/ML.
  `

  const generateAIResponse = async (userInput: string): Promise<string> => {
    try {
      if (!genAI) {
        return getFallbackResponse(userInput)
      }

      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      })
      
      const prompt = `${portfolioContext}

User Question: ${userInput}

Please provide a helpful and informative response about Yogesh Kuchimanchi's portfolio, background, or related topics. Keep responses conversational but professional (2-3 paragraphs max), and mention specific projects, skills, or achievements relevant to the question.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      
      if (response.candidates && response.candidates.length > 0) {
        const text = response.text()
        return text || getFallbackResponse(userInput)
      } else {
        throw new Error('No valid response from API')
      }
    } catch (error: any) {
      console.error('Gemini AI Error:', error)
      
      // Return fallback response for network issues
      return getFallbackResponse(userInput)
    }
  }

  // Fallback response system when Gemini AI is unavailable
  const getFallbackResponse = (userInput: string): string => {
    const query = userInput.toLowerCase()
    
    if (query.includes('research') || query.includes('work')) {
      return "Yogesh is currently a Research Assistant at Rochester Institute of Technology (Jan-Feb 2025), where he has achieved impressive 75% performance improvements in data processing workflows. His research focuses on machine learning optimization, data engineering pipelines, and AI-powered applications. He previously worked as a Data Science Intern at Internpe (Jun-Jul 2024) with 40% efficiency gains in automated processes."
    }
    
    if (query.includes('project') || query.includes('github')) {
      return "Yogesh has developed several impressive projects including SymptomAid (AI medical analysis with 95% accuracy), FixMyData (data quality assessment tool), Stock Sentiment Dashboard (real-time trading analytics), Hecs-Refactoring (AI code optimization), Mycelial Memories (bio-inspired distributed systems), and Time Chronicles (temporal analytics platform). All projects are available on his GitHub profile at github.com/Zinga18018."
    }
    
    if (query.includes('skill') || query.includes('technology') || query.includes('tech')) {
      return "Yogesh's technical expertise spans Python, R, SQL, machine learning frameworks (Scikit-learn, XGBoost, TensorFlow, PyTorch), data tools (Pandas, NumPy), cloud platforms (AWS, GCP, Azure), MLOps tools (Docker, Kubernetes, MLflow), and visualization tools (Tableau, Power BI, Streamlit). He specializes in data science, machine learning, and AI-powered solutions."
    }
    
    if (query.includes('education') || query.includes('study') || query.includes('degree')) {
      return "Yogesh is currently pursuing his M.S. in Data Science at Rochester Institute of Technology (Aug 2024-Present). He previously completed a PGP in Data Science from Vellore Institute of Technology (Aug 2023-Jul 2024) and earned his B.C.A. from New Shores International College (Nov 2020-Dec 2023). His educational journey reflects a strong focus on data science and machine learning."
    }
    
    if (query.includes('background') || query.includes('about') || query.includes('who')) {
      return "Yogesh Kuchimanchi is a Data Scientist and Machine Learning Innovator currently pursuing his M.S. in Data Science at Rochester Institute of Technology. He works as a Research Assistant at RIT and has experience as a Data Science Intern. With expertise in AI/ML, data engineering, and performance optimization, he has achieved 95% average model accuracy across his projects and 75% performance improvements in research work."
    }
    
    if (query.includes('contact') || query.includes('reach') || query.includes('connect')) {
      return "You can connect with Yogesh through his GitHub profile at github.com/Zinga18018 where you can explore all his projects and repositories. His portfolio showcases his work in data science, machine learning, and AI development. Feel free to check out his repositories for detailed project information and code samples."
    }
    
    return "I'm currently experiencing connectivity issues with the AI service, but I can tell you that Yogesh Kuchimanchi is a talented Data Scientist specializing in machine learning and AI development. He's currently pursuing his M.S. in Data Science at RIT while working as a Research Assistant. Feel free to ask specific questions about his projects, skills, education, or research work!"
  }

  const handleSendMessage = async () => {
    console.log('handleSendMessage called with input:', input); // Debug log
    
    if (!input.trim()) {
      console.log('Input is empty, returning'); // Debug log
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input.trim()
    setInput('')
    setIsLoading(true)

    try {
      console.log('Generating AI response for:', currentInput); // Debug log
      const aiResponseText = await generateAIResponse(currentInput)
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      console.log('AI response added successfully'); // Debug log
    } catch (error) {
      console.error('Error in handleSendMessage:', error); // Debug log
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble processing your request right now. Please try again!",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      handleSendMessage()
    }
  }

  // Quick question suggestions
  const quickQuestions = [
    "Tell me about Yogesh's background",
    "What are his key ML projects?",
    "What technical skills does he have?",
    "What's his education background?",
    "Tell me about his research work"
  ]

  const handleQuickQuestion = (question: string) => {
    console.log('Quick question clicked:', question); // Debug log
    setInput(question);
    
    // Auto-send after a short delay to allow user to see the input change
    setTimeout(() => {
      if (!isLoading) {
        handleSendMessage();
      }
    }, 200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Portfolio Assistant - Powered by Gemini
        </h3>
        <p className="text-blue-100 text-sm">
          Interactive AI chatbot showcasing Yogesh's portfolio
        </p>
      </div>

      {/* Quick Questions */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions to get started:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                console.log('Button clicked:', question);
                handleQuickQuestion(question);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('Button mouse down:', question);
                handleQuickQuestion(question);
              }}
              disabled={isLoading}
              className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-0"
              style={{ 
                pointerEvents: 'auto',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              type="button"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4" style={{ pointerEvents: 'auto' }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                }`}>
                  {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-2xl p-3 ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Gemini AI is thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-600 p-4" style={{ pointerEvents: 'auto' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Yogesh's projects, skills, background..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm"
            style={{ pointerEvents: 'auto' }}
            disabled={isLoading}
            autoComplete="off"
          />
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSendMessage();
            }}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Powered by Google Gemini AI
          </div>
        </div>
      </div>
    </motion.div>
  )
} 