'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, TrendingUp, Users, Award, Code, Github, ExternalLink } from 'lucide-react'

const workExperience = [
  {
    id: 1,
    company: "Rochester Institute of Technology, NY",
    position: "Research Assistant",
    period: "Jan 2025 – Feb 2025",
    type: "Research",
    achievements: [
      "Optimized a Python data-processing script by refactoring loops and vectorizing operations, cutting runtime from 4 hours to 1 hour (75% improvement)",
      "Built command-line tools in Bash and Python to automate daily file-handling tasks—moving, renaming, and validating research data—saving the team approximately 50% of manual effort each week",
      "Created a Docker-based test environment that mirrored RIT server configurations, reducing compatibility issues by 60% when integrating new scripts with shared resources"
    ],
    technologies: ["Python", "Bash", "Docker", "Linux", "Data Processing", "Automation"],
    color: "from-blue-500 to-purple-600",
    icon: <Code className="w-5 h-5" />,
    projectLink: "https://github.com/Zinga18018/Python-Script",
    projectTitle: "Python Data Processing Scripts"
  },
  {
    id: 2,
    company: "Internpe, Remote",
    position: "Data Science Intern",
    period: "Apr 2024 – Jun 2024",
    type: "Internship",
    achievements: [
      "Cleaned and joined multiple CSV/JSON datasets (totaling 500K+ rows) using Pandas, reducing data-preparation time by 40% and enabling faster model prototyping",
      "Generated weekly summary reports with visualizations in Matplotlib and Seaborn, improving stakeholder visibility on key metrics by 50% and facilitating more informed decision-making",
      "Assisted senior data scientists in model evaluation, validating performance metrics—accuracy, precision, and recall—reporting a 10% improvement over previous benchmarks through hyperparameter tuning"
    ],
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Data Analysis", "Machine Learning"],
    color: "from-purple-500 to-pink-600",
    icon: <TrendingUp className="w-5 h-5" />
  }
]

export default function WorkExperienceSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Professional Experience Timeline
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hands-on experience delivering practical solutions and driving efficiency improvements
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>
          
          <div className="space-y-12">
            {workExperience.map((job, index) => (
              <motion.div
                key={job.id}
                className="relative flex items-start pl-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 top-6">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${job.color} flex items-center justify-center text-white shadow-2xl border-4 border-gray-900`}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    {job.icon}
                  </motion.div>
                </div>

                {/* Job Card */}
                <motion.div
                  className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700/50"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Subtle Background Decoration */}
                  <div className="absolute top-4 right-4 w-24 h-24 opacity-5">
                    <div className={`w-full h-full bg-gradient-to-br ${job.color} rounded-full`}></div>
                  </div>

                  <div className="relative">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${job.color} flex items-center justify-center text-white shadow-lg`}>
                          {job.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {job.position}
                          </h3>
                          <div className="flex items-center text-gray-300 mt-1">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {job.company}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start md:items-end space-y-2">
                        <div className="flex items-center text-gray-400">
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
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {job.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start space-x-3 text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className={job.projectLink ? "mb-6" : ""}>
                      <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium border border-gray-600"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Project Link */}
                    {job.projectLink && (
                      <div>
                        <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <Github className="w-4 h-4 mr-2" />
                          Related Project
                        </h5>
                        <motion.a
                          href={job.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          <span className="mr-2">{job.projectTitle}</span>
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              value: "2+", 
              label: "Years Experience",
              description: "In data science & development",
              color: "from-purple-500 to-pink-500" 
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mx-auto mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</p>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 