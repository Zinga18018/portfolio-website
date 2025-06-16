'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award, Star } from 'lucide-react'

const educationData = [
  {
    id: 1,
    institution: "Rochester Institute of Technology, NY",
    degree: "M.S. in Data Science",
    period: "Aug 2024 – Present",
    status: "Current",
    highlights: [
      "Machine Learning",
      "Cloud Computing", 
      "Deep Learning",
      "Big Data Analytics"
    ],
    project: "Developed AI code-refactoring platform with 95% detection accuracy",
    gpa: "Current",
    color: "from-blue-500 to-purple-600",
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: 2,
    institution: "Vellore Institute of Technology, India",
    degree: "PGP in Data Science",
    period: "Aug 2023 – Jul 2024",
    status: "Completed",
    highlights: [
      "Data Engineering",
      "MLOps",
      "Predictive Analytics", 
      "Time Series"
    ],
    project: "Built Customer Churn Prediction model (80% accuracy, 0.85 F1-score)",
    achievement: "Specialized in ML Operations",
    color: "from-purple-500 to-pink-600",
    icon: <Award className="w-6 h-6" />
  },
  {
    id: 3,
    institution: "New Shores International College, India",
    degree: "B.C.A. (Computer Applications)",
    period: "Nov 2020 – Dec 2023",
    status: "Completed",
    highlights: [
      "Software Development",
      "Data Structures",
      "Algorithms",
      "Database Management"
    ],
    achievement: "Top 5% of class; Led team for multi-user library system",
    color: "from-green-500 to-blue-600",
    icon: <Star className="w-6 h-6" />
  }
]

export default function EducationSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Educational Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building expertise through continuous learning and hands-on experience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="relative flex items-start mb-12 last:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline Node */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center text-white shadow-lg`}>
                  {edu.icon}
                  {edu.status === 'Current' && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Content Card */}
                <motion.div
                  className="ml-8 flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {edu.period}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        edu.status === 'Current'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Key Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight, idx) => (
                        <motion.span
                          key={highlight}
                          className={`px-3 py-1 bg-gradient-to-r ${edu.color} text-white rounded-full text-sm font-medium`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Project/Achievement */}
                  {edu.project && (
                    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Key Project
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        {edu.project}
                      </p>
                    </div>
                  )}

                  {edu.achievement && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border-l-4 border-yellow-400">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-yellow-500" />
                        Achievement
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        {edu.achievement}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { 
              label: "Years of Education", 
              value: "6+", 
              description: "Continuous learning journey",
              color: "from-blue-500 to-purple-500" 
            },
            { 
              label: "Specializations", 
              value: "3", 
              description: "Data Science focus areas",
              color: "from-purple-500 to-pink-500" 
            },
            { 
              label: "Major Projects", 
              value: "10+", 
              description: "Academic & research projects",
              color: "from-green-500 to-blue-500" 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
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
      </div>
    </section>
  )
} 