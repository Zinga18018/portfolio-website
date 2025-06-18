'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Zap, TrendingUp, Users, Code, Database, Brain, Rocket, Star, Trophy } from 'lucide-react'

const achievements = [
  {
    id: 1,
    category: "Academic Project",
    title: "AI Code-Refactoring Platform",
    description: "Built an innovative platform achieving 95% detection accuracy for code quality issues as coursework project",
    impact: "Demonstrated understanding of software engineering and AI principles",
    metrics: ["95% accuracy", "Automated refactoring", "Academic excellence"],
    color: "from-blue-500 to-purple-600",
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 2,
    category: "Coursework Project", 
    title: "Time Chronicles Analytics",
    description: "Built a comprehensive time-series analysis platform with advanced visualization capabilities",
    impact: "Applied data science concepts to create practical time-series solutions",
    metrics: ["Real-time analysis", "Multiple datasets", "Interactive dashboards"],
    color: "from-green-500 to-emerald-600",
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 3,
    category: "Healthcare AI Project",
    title: "SymptomAid Medical AI",
    description: "Academic project building a medical symptom analysis system using local LLM with safety protocols",
    impact: "Demonstrated ability to apply AI in healthcare domain with ethical considerations",
    metrics: ["92% classification accuracy", "Academic dataset", "Safety protocols"],
    color: "from-red-500 to-pink-600",
    icon: <Award className="w-6 h-6" />
  },
  {
    id: 4,
    category: "Academic Project",
    title: "FixMyData Quality Platform",
    description: "Academic project building a data quality assessment tool with anomaly detection capabilities",
    impact: "Demonstrated practical application of data engineering principles",
    metrics: ["95% precision", "Academic datasets", "Real-time processing"],
    color: "from-purple-500 to-violet-600",
    icon: <Database className="w-6 h-6" />
  },
  {
    id: 5,
    category: "Financial Analytics",
    title: "Stock Sentiment Dashboard",
    description: "Academic project creating a sentiment analysis system for financial market data",
    impact: "Applied NLP and time-series analysis to financial domain",
    metrics: ["Real-time analysis", "Multiple data sources", "Interactive dashboard"],
    color: "from-yellow-500 to-orange-600",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 6,
    category: "Research Project",
    title: "Mycelial Memories System",
    description: "Graduate research project exploring bio-inspired distributed computing architectures",
    impact: "Contributing to cutting-edge research in distributed systems and nature-inspired computing",
    metrics: ["Research contribution", "Bio-inspired design", "Distributed architecture"],
    color: "from-indigo-500 to-blue-600",
    icon: <Star className="w-6 h-6" />
  }
]

const researchStats = [
  {
    icon: <Rocket className="w-8 h-8" />,
    value: "6+",
    label: "Academic Projects",
    description: "ML/AI implementations",
    color: "from-blue-500 to-cyan-500"
  },
      {
      icon: <Trophy className="w-8 h-8" />,
      value: "Graduate",
      label: "Student Status",
      description: "MS Data Science",
      color: "from-green-500 to-emerald-500"
    },
  {
    icon: <Database className="w-8 h-8" />,
    value: "500K+",
    label: "Data Points",
    description: "In coursework projects",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Code className="w-8 h-8" />,
    value: "20+",
    label: "Technologies",
    description: "Learned & applied",
    color: "from-orange-500 to-red-500"
  }
]

export default function ResearchAndAchievements() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            🎓 Academic Projects & Learning
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Academic projects and coursework showcasing technical skills and passion for AI and data science
          </p>
        </motion.div>

        {/* Research Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
        >
          {researchStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${achievement.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white shadow-lg`}>
                    {achievement.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {achievement.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {achievement.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Impact & Recognition
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.impact}
                  </p>
                </div>

                {/* Metrics */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Key Metrics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {achievement.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${achievement.color} text-white rounded-full text-xs font-medium`}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                Research Methodology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Approach</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Data-driven experimental design with rigorous validation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Cross-validation and statistical significance testing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Reproducible research with open-source implementations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Focus Areas</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Applied machine learning for real-world problems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Performance optimization and algorithmic efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Healthcare AI and ethical AI development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 