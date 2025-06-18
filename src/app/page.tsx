'use client'

import React from 'react'
import AnimatedHero from '@/components/AnimatedHero'
import CreativeSkillsSection from '@/components/CreativeSkillsSection'
import MLPlayground from '@/components/MLPlayground'
import ProjectSearch from '@/components/ProjectSearch'
import EducationSection from '@/components/EducationSection'
import ResearchAndAchievements from '@/components/ResearchAndAchievements'
import ThemeToggle from '@/components/ThemeToggle'
import ChatbotPopup from '@/components/ChatbotPopup'
import AsteroidShower from '@/components/AsteroidShower'
import WorkExperienceSection from '@/components/WorkExperienceSection'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        {/* Background Elements - Lowest Z-Index */}
        <div className="fixed inset-0 z-0">
          <AsteroidShower density="medium" theme="space" interactive={true} />
        </div>

        {/* UI Elements - High Z-Index */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <ChatbotPopup />

        {/* Content Sections - Medium Z-Index */}
        <div className="relative z-10">
          {/* Animated Hero Section */}
          <AnimatedHero />

          {/* Creative Skills Section */}
          <div className="relative">
            <CreativeSkillsSection />
          </div>

          {/* Work Experience Section */}
          <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-blue-900/30">
            <WorkExperienceSection />
          </div>

          {/* Live ML Playground */}
          <div className="relative bg-gradient-to-br from-gray-900/80 to-purple-900/20">
            <MLPlayground />
          </div>

          {/* Enhanced Projects Section with Search */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-blue-900/30">
            <ProjectSearch />
          </div>

          {/* Research & Achievements Section */}
          <div className="relative bg-gradient-to-br from-gray-800/80 to-purple-900/20">
            <ResearchAndAchievements />
          </div>

          {/* Education Section */}
          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90">
            <EducationSection />
          </div>

          {/* Enhanced About Section */}
          <section id="about" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900/20 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                  About Me
                </h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      I'm a seasoned Data Scientist with hands-on experience building ML pipelines, automating data workflows, and delivering practical solutions. 
                      Currently pursuing my M.S. in Data Science at Rochester Institute of Technology while working as a Research Assistant.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      My expertise spans machine learning, data engineering, MLOps, and cloud computing. I've successfully optimized data processing scripts 
                      achieving 75% performance improvements and built AI-powered applications with 95% detection accuracy.
                    </p>
                                          <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
                          <div className="text-3xl font-bold text-cyan-400 mb-2">12+</div>
                          <div className="text-gray-300">ML Projects</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
                          <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                          <div className="text-gray-300">Avg Accuracy</div>
                        </div>
                      </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                      <h3 className="text-2xl font-bold mb-4">What I Do</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                          Machine Learning & Predictive Analytics
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                          Data Engineering & Pipeline Automation
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                          AI-powered Healthcare Solutions
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                          Performance Optimization & MLOps
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                          Research & Development
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Contact Section */}
          <section id="contact" className="py-20 bg-gray-800 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                  Get in Touch
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Let's collaborate on your next AI project or discuss opportunities
                </p>

              </div>
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <a
                    href="https://github.com/Zinga18018"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-8 bg-gray-700/50 backdrop-blur-sm rounded-2xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border border-gray-600"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">GitHub Profile</h3>
                      <p className="text-gray-300">View my code and projects</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/Zinga18018?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-8 bg-gray-700/50 backdrop-blur-sm rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 border border-gray-600"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">All Projects</h3>
                      <p className="text-gray-300">Explore my complete portfolio</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  )
} 