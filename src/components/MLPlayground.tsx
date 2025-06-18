'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  BarChart3, 
  Zap, 
  Eye, 
  TrendingUp, 
  Database,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Download,
  Upload
} from 'lucide-react'

interface DataPoint {
  x: number
  y: number
  label: string
  color: string
}

interface MLModel {
  name: string
  type: string
  accuracy: number
  isTraining: boolean
  data: DataPoint[]
  predictions: DataPoint[]
}

export default function MLPlayground() {
  const [activeDemo, setActiveDemo] = useState('clustering')
  const [isRunning, setIsRunning] = useState(false)
  const [models, setModels] = useState<Record<string, MLModel>>({
    clustering: {
      name: 'K-Means Clustering',
      type: 'Unsupervised',
      accuracy: 0,
      isTraining: false,
      data: [],
      predictions: []
    },
    classification: {
      name: 'SVM Classification',
      type: 'Supervised',
      accuracy: 0,
      isTraining: false,
      data: [],
      predictions: []
    },
    regression: {
      name: 'Neural Network Regression',
      type: 'Supervised',
      accuracy: 0,
      isTraining: false,
      data: [],
      predictions: []
    }
  })

  const generateRandomData = useCallback((count: number, type: string) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
    const data: DataPoint[] = []
    
    for (let i = 0; i < count; i++) {
      if (type === 'clustering') {
        // Create clusters
        const cluster = Math.floor(Math.random() * 3)
        const centerX = [20, 50, 80][cluster]
        const centerY = [30, 70, 40][cluster]
        
        data.push({
          x: centerX + (Math.random() - 0.5) * 30,
          y: centerY + (Math.random() - 0.5) * 30,
          label: `Cluster ${cluster + 1}`,
          color: colors[cluster]
        })
      } else if (type === 'classification') {
        // Create two classes
        const isClass1 = Math.random() > 0.5
        data.push({
          x: Math.random() * 100,
          y: isClass1 ? Math.random() * 40 + 10 : Math.random() * 40 + 50,
          label: isClass1 ? 'Class A' : 'Class B',
          color: isClass1 ? colors[0] : colors[1]
        })
      } else if (type === 'regression') {
        // Create regression data
        const x = Math.random() * 100
        const y = 20 + 0.5 * x + (Math.random() - 0.5) * 20
        data.push({
          x,
          y: Math.max(0, Math.min(100, y)),
          label: 'Data Point',
          color: colors[0]
        })
      }
    }
    
    return data
  }, [])

  const runMLDemo = useCallback(async (demoType: string) => {
    setIsRunning(true)
    setModels(prev => ({
      ...prev,
      [demoType]: {
        ...prev[demoType],
        isTraining: true,
        accuracy: 0
      }
    }))

    // Generate initial data
    const initialData = generateRandomData(50, demoType)
    setModels(prev => ({
      ...prev,
      [demoType]: {
        ...prev[demoType],
        data: initialData
      }
    }))

    // Simulate training process
    for (let epoch = 0; epoch < 20; epoch++) {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      setModels(prev => ({
        ...prev,
        [demoType]: {
          ...prev[demoType],
          accuracy: Math.min(95, prev[demoType].accuracy + Math.random() * 5),
        }
      }))
    }

    // Generate predictions
    const predictions = generateRandomData(20, demoType)
    setModels(prev => ({
      ...prev,
      [demoType]: {
        ...prev[demoType],
        isTraining: false,
        predictions
      }
    }))

    setIsRunning(false)
  }, [generateRandomData])

  // Initialize with sample data on mount
  useEffect(() => {
    const initializeDemo = () => {
      const sampleData = generateRandomData(30, 'clustering')
      setModels(prev => ({
        ...prev,
        clustering: {
          ...prev.clustering,
          data: sampleData,
          accuracy: 85
        }
      }))
    }
    
    // Small delay to ensure component is mounted
    const timer = setTimeout(initializeDemo, 100)
    return () => clearTimeout(timer)
  }, [generateRandomData])

  const demos = [
    {
      id: 'clustering',
      name: 'K-Means Clustering',
      description: 'Unsupervised learning to find hidden patterns',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'classification',
      name: 'SVM Classification',
      description: 'Supervised learning to classify data points',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'regression',
      name: 'Neural Network',
      description: 'Deep learning for prediction tasks',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Live ML Playground
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Interactive machine learning demonstrations - Watch algorithms learn in real-time
          </p>
        </motion.div>

        {/* Demo Selection */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {demos.map((demo, index) => (
            <motion.button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                activeDemo === demo.id
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 scale-105'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: activeDemo === demo.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${demo.color} flex items-center justify-center mb-4 mx-auto text-white`}>
                {demo.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{demo.name}</h3>
              <p className="text-gray-300 text-sm">{demo.description}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Demo */}
        <motion.div 
          className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {models[activeDemo].name}
              </h3>
              <p className="text-gray-300">
                Type: {models[activeDemo].type} Learning
              </p>
            </div>
            <div className="flex gap-4">
              <motion.button
                onClick={() => runMLDemo(activeDemo)}
                disabled={isRunning}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                }`}
                whileHover={!isRunning ? { scale: 1.05 } : {}}
                whileTap={!isRunning ? { scale: 0.95 } : {}}
              >
                {isRunning ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                {isRunning ? 'Training...' : 'Run Demo'}
              </motion.button>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Data Visualization */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-600"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                Data Visualization
              </h4>
              <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#grid)" />
                  
                  {/* Data Points */}
                  <AnimatePresence>
                    {models[activeDemo].data.map((point, index) => (
                      <motion.circle
                        key={`data-${index}`}
                        cx={Math.max(10, Math.min(390, (point.x / 100) * 400))}
                        cy={Math.max(10, Math.min(290, (point.y / 100) * 300))}
                        r="4"
                        fill={point.color}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ delay: index * 0.02 }}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {/* Predictions */}
                  <AnimatePresence>
                    {models[activeDemo].predictions.map((point, index) => (
                      <motion.circle
                        key={`pred-${index}`}
                        cx={Math.max(10, Math.min(390, (point.x / 100) * 400))}
                        cy={Math.max(10, Math.min(290, (point.y / 100) * 300))}
                        r="6"
                        fill="none"
                        stroke={point.color}
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      />
                    ))}
                  </AnimatePresence>
                </svg>
              </div>
            </motion.div>

            {/* Model Metrics */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-600"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Model Performance
              </h4>
              
              <div className="space-y-6">
                {/* Accuracy */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Accuracy</span>
                    <span className="text-white font-semibold">
                      {models[activeDemo].accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${models[activeDemo].accuracy}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Training Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    models[activeDemo].isTraining ? 'bg-yellow-500 animate-pulse' : 
                    models[activeDemo].accuracy > 0 ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  <span className="text-gray-300 text-sm">
                    {models[activeDemo].isTraining ? 'Training in progress...' :
                     models[activeDemo].accuracy > 0 ? 'Model ready' : 'Click "Run Demo" to start'}
                  </span>
                </div>

                {/* Data Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-2xl font-bold text-cyan-400">
                      {models[activeDemo].data.length}
                    </div>
                    <div className="text-xs text-gray-400">Training Points</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-2xl font-bold text-purple-400">
                      {models[activeDemo].predictions.length}
                    </div>
                    <div className="text-xs text-gray-400">Predictions</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Code Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gray-900 rounded-2xl p-6 border border-gray-700"
        >
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            Sample Implementation
          </h4>
          <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto border border-gray-800">
            <pre>{`# ${models[activeDemo].name} Implementation
import numpy as np
from sklearn.${activeDemo === 'clustering' ? 'cluster import KMeans' : 
                activeDemo === 'classification' ? 'svm import SVC' : 
                'neural_network import MLPRegressor'}

# Load and prepare data
X = np.random.rand(100, 2)
${activeDemo !== 'clustering' ? 'y = np.random.randint(0, 2, 100)' : ''}

# Initialize model
model = ${activeDemo === 'clustering' ? 'KMeans(n_clusters=3)' : 
         activeDemo === 'classification' ? 'SVC(kernel="rbf")' : 
         'MLPRegressor(hidden_layer_sizes=(100, 50))'}

# Train model
model.fit(X${activeDemo !== 'clustering' ? ', y' : ''})

# Make predictions
predictions = model.${activeDemo === 'clustering' ? 'predict(X)' : 'predict(X_test)'}
print(f"Accuracy: {model.score(X_test, y_test):.2f}")
`}</pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 