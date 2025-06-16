'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, TrendingUp, Users, Award, Code } from 'lucide-react'

const workExperience = [
  {
    id: 1,
    company: "Rochester Institute of Technology, NY",
    position: "Research Assistant",
    period: "Jan 2025 – Feb 2025",
    type: "Research",
    achievements: [
      "Optimized Python data-processing script by refactoring loops and vectorizing operations, cutting runtime from 4 hours to 1 hour (75% improvement)",
      "Built command-line tools in Bash and Python to automate daily file-handling tasks, saving the team approximately 50% of manual effort each week",
      "Created Docker-based test environment that mirrored RIT server configurations, reducing compatibility issues by 60%"
    ],
    technologies: ["Python", "Bash", "Docker", "Linux", "Data Processing", "Automation"],
    color: "from-blue-500 to-purple-600",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 2,
    company: "Internpe, Remote",
    position: "Data Science Intern",
    period: "Jun 2024 – Jul 2024",
    type: "Internship",
    achievements: [
      "Cleaned and joined multiple CSV/JSON datasets (totaling 500K+ rows) using Pandas, reducing data-preparation time by 40%",
      "Generated weekly summary reports with visualizations in Matplotlib and Seaborn, improving stakeholder visibility on key metrics by 50%",
      "Assisted senior data scientists in model evaluation, reporting a 10% improvement over previous benchmarks through hyperparameter tuning"
    ],
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Data Analysis", "Machine Learning"],
    color: "from-purple-500 to-pink-600",
    icon: <TrendingUp className="w-5 h-5" />
  }
]

export default function WorkExperienceSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hands-on experience delivering practical solutions and driving efficiency improvements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {workExperience.map((job, index) => (
            <motion.div
              key={job.id}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className={`w-full h-full bg-gradient-to-br ${job.color} rounded-full transform translate-x-16 -translate-y-16`}></div>
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${job.color} flex items-center justify-center text-white shadow-lg`}>
                      {job.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {job.position}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.company}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {job.period}
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      job.type === 'Research'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Technologies Used
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { 
              icon: <TrendingUp className="w-8 h-8" />,
              value: "75%", 
              label: "Performance Improvement",
              description: "Average optimization achieved",
              color: "from-green-500 to-emerald-500" 
            },
            { 
              icon: <Users className="w-8 h-8" />,
              value: "50%", 
              label: "Team Efficiency",
              description: "Manual effort reduction",
              color: "from-blue-500 to-cyan-500" 
            },
            { 
              icon: <Award className="w-8 h-8" />,
              value: "60%", 
              label: "Issue Reduction",
              description: "Compatibility problems solved",
              color: "from-purple-500 to-pink-500" 
            },
          ].map((highlight, index) => (
            <motion.div
              key={highlight.label}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${highlight.color} rounded-2xl flex items-center justify-center text-white`}>
                {highlight.icon}
              </div>
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent`}>
                {highlight.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {highlight.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {highlight.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 