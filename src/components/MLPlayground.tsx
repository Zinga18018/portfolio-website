'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Code, Database, Brain, Zap, TrendingUp, BarChart3, Activity, Cpu, Network } from 'lucide-react'

interface MLModel {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  demoType: 'sentiment' | 'prediction' | 'classification' | 'anomaly' | 'nlp'
  color: string
  accuracy: string
  dataset: string
}

const mlModels: MLModel[] = [
  {
    id: 'neural-network-visualizer',
    name: 'Neural Network Visualizer',
    description: 'Interactive deep learning architecture visualization with real-time forward propagation',
    category: 'Deep Learning',
    icon: <Network className="w-6 h-6" />,
    demoType: 'classification',
    color: 'from-cyan-500 to-blue-600',
    accuracy: '96.7%',
    dataset: 'MNIST + Custom datasets'
  },
  {
    id: 'time-series-forecaster',
    name: 'Advanced Time Series Forecaster',
    description: 'LSTM-based forecasting with attention mechanisms for complex temporal patterns',
    category: 'Predictive Analytics',
    icon: <TrendingUp className="w-6 h-6" />,
    demoType: 'prediction',
    color: 'from-green-500 to-emerald-600',
    accuracy: '94.2%',
    dataset: 'Financial & sensor data'
  },
  {
    id: 'research-paper-analyzer',
    name: 'Scientific Paper Intelligence',
    description: 'Advanced NLP for extracting insights from research papers using transformer models',
    category: 'Academic AI',
    icon: <Brain className="w-6 h-6" />,
    demoType: 'nlp',
    color: 'from-purple-500 to-indigo-600',
    accuracy: '91.8%',
    dataset: '100K+ research papers'
  },
  {
    id: 'anomaly-detection-engine',
    name: 'Multi-Modal Anomaly Detection',
    description: 'Ensemble learning approach combining Isolation Forest, DBSCAN, and Autoencoders',
    category: 'Anomaly Detection',
    icon: <Activity className="w-6 h-6" />,
    demoType: 'anomaly',
    color: 'from-red-500 to-pink-600',
    accuracy: '97.3%',
    dataset: 'IoT & system logs'
  },
  {
    id: 'optimization-lab',
    name: 'Hyperparameter Optimization Lab',
    description: 'Bayesian optimization with Gaussian processes for automated ML tuning',
    category: 'AutoML',
    icon: <Zap className="w-6 h-6" />,
    demoType: 'prediction',
    color: 'from-orange-500 to-red-600',
    accuracy: '15x faster',
    dataset: 'ML model parameters'
  },
  {
    id: 'ensemble-predictor',
    name: 'Intelligent Ensemble Engine',
    description: 'Dynamic ensemble methods with voting classifiers and stacking techniques',
    category: 'Ensemble Learning',
    icon: <Database className="w-6 h-6" />,
    demoType: 'classification',
    color: 'from-violet-500 to-purple-600',
    accuracy: '93.1%',
    dataset: 'Multi-domain datasets'
  }
]

export default function MLPlayground() {
  const [selectedModel, setSelectedModel] = useState<MLModel>(mlModels[0])
  const [isRunning, setIsRunning] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState<any>(null)
  const [modelMetrics, setModelMetrics] = useState({
    accuracy: 0,
    latency: 0,
    throughput: 0
  })

  const simulateMLInference = async (model: MLModel, input: string) => {
    setIsRunning(true)
    setResults(null)
    
    // Simulate realistic ML inference timing
    const processingTime = Math.random() * 2000 + 500
    
    // Animate metrics
    const metricsInterval = setInterval(() => {
      setModelMetrics(prev => ({
        accuracy: Math.min(prev.accuracy + Math.random() * 10, parseFloat(model.accuracy)),
        latency: Math.random() * 150 + 50,
        throughput: Math.random() * 1000 + 500
      }))
    }, 100)

    await new Promise(resolve => setTimeout(resolve, processingTime))
    
    clearInterval(metricsInterval)
    
    // Generate realistic results based on model type
    let mockResults
    switch (model.demoType) {
      case 'sentiment':
        mockResults = {
          sentiment: Math.random() > 0.5 ? 'Positive' : 'Negative',
          confidence: (Math.random() * 0.3 + 0.7).toFixed(3),
          breakdown: {
            positive: (Math.random() * 0.4 + 0.3).toFixed(3),
            negative: (Math.random() * 0.4 + 0.3).toFixed(3),
            neutral: (Math.random() * 0.3 + 0.1).toFixed(3)
          }
        }
        break
      case 'prediction':
        mockResults = {
          prediction: `${(Math.random() * 100).toFixed(1)}%`,
          risk_level: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
          factors: ['Feature 1', 'Feature 2', 'Feature 3'].map(f => ({
            name: f,
            importance: (Math.random() * 0.8 + 0.2).toFixed(3)
          }))
        }
        break
      case 'classification':
        mockResults = {
          category: ['Quality Issues', 'Performance Problems', 'Security Vulnerabilities'][Math.floor(Math.random() * 3)],
          confidence: (Math.random() * 0.3 + 0.7).toFixed(3),
          suggestions: ['Refactor loops', 'Optimize algorithms', 'Add error handling']
        }
        break
      case 'anomaly':
        mockResults = {
          anomaly_score: (Math.random() * 0.8 + 0.2).toFixed(3),
          is_anomaly: Math.random() > 0.7,
          affected_features: ['Column A', 'Column B', 'Column C'].slice(0, Math.floor(Math.random() * 3) + 1)
        }
        break
      case 'nlp':
        mockResults = {
          diagnosis: ['Common Cold', 'Flu', 'Allergies', 'Stress'][Math.floor(Math.random() * 4)],
          confidence: (Math.random() * 0.3 + 0.7).toFixed(3),
          risk_level: Math.random() > 0.8 ? 'High' : 'Low',
          recommendations: ['Rest', 'Hydration', 'Monitor symptoms']
        }
        break
    }
    
    setResults(mockResults)
    setIsRunning(false)
  }

  const getSampleInput = (model: MLModel) => {
    switch (model.demoType) {
      case 'sentiment':
        return 'AAPL stock looks promising with strong Q4 earnings and positive market trends'
      case 'prediction':
        return 'Customer: Age 35, Tenure 2 years, Monthly charges $75, Total charges $1800'
      case 'classification':
        return 'for i in range(len(data)): result.append(data[i] * 2)'
      case 'anomaly':
        return 'Dataset with 1000 rows, 15 columns, checking for outliers in numerical features'
      case 'nlp':
        return 'I have been experiencing headache, fatigue, and mild fever for the past 2 days'
      default:
        return 'Enter your data here...'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            🚀 Live ML Playground
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience real-time machine learning models in action! Test live demos of my production-grade AI systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Model Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">🎯 Select ML Model</h3>
            <div className="space-y-4">
              {mlModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    selectedModel.id === model.id
                      ? `bg-gradient-to-r ${model.color} border-white/30 shadow-lg`
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedModel(model)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-white">
                      {model.icon}
                    </div>
                    <h4 className="font-semibold text-white">{model.name}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{model.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{model.accuracy}</span>
                    <span className="text-gray-400">{model.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Model Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedModel.color} flex items-center justify-center text-white`}>
                    {selectedModel.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedModel.name}</h3>
                    <p className="text-gray-400">{selectedModel.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Accuracy</div>
                  <div className="text-xl font-bold text-green-400">{selectedModel.accuracy}</div>
                </div>
              </div>

              {/* Real-time Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Network className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Accuracy</span>
                  </div>
                  <div className="text-xl font-bold text-blue-400">
                    {modelMetrics.accuracy.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-400">Latency</span>
                  </div>
                  <div className="text-xl font-bold text-yellow-400">
                    {modelMetrics.latency.toFixed(0)}ms
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Throughput</span>
                  </div>
                  <div className="text-xl font-bold text-green-400">
                    {modelMetrics.throughput.toFixed(0)}/s
                  </div>
                </div>
              </div>

              {/* Input Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input Data
                </label>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={getSampleInput(selectedModel)}
                  className="w-full h-24 bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                />
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => setInputValue(getSampleInput(selectedModel))}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Use Sample Data
                  </button>
                  <motion.button
                    onClick={() => simulateMLInference(selectedModel, inputValue)}
                    disabled={isRunning || !inputValue.trim()}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      isRunning || !inputValue.trim()
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : `bg-gradient-to-r ${selectedModel.color} text-white hover:scale-105 shadow-lg`
                    }`}
                    whileHover={!isRunning && inputValue.trim() ? { scale: 1.05 } : {}}
                    whileTap={!isRunning && inputValue.trim() ? { scale: 0.95 } : {}}
                  >
                    {isRunning ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Run Model</span>
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Results Section */}
              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-6 border border-gray-600"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-green-400" />
                      Model Output
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(results).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">
                            {key.replace('_', ' ')}:
                          </span>
                          <span className="text-white font-medium">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">🏆 Production Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Models Deployed', value: '6+', icon: <Brain className="w-6 h-6" /> },
              { label: 'Accuracy Average', value: '89%', icon: <TrendingUp className="w-6 h-6" /> },
              { label: 'Data Processed', value: '1M+', icon: <Database className="w-6 h-6" /> },
              { label: 'Performance Gain', value: '75%', icon: <Zap className="w-6 h-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 