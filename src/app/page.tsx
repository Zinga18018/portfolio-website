'use client'

import React, { Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'

// Lazy load components for better mobile performance
const AnimatedHero = dynamic(() => import('../components/AnimatedHero'), { 
  ssr: false,
  loading: () => <div className="h-screen bg-gradient-to-br from-purple-900 to-blue-900 animate-pulse" />
})

const WorkExperienceSection = dynamic(() => import('../components/WorkExperienceSection'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
})

const EducationSection = dynamic(() => import('../components/EducationSection'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
})

const CreativeSkillsSection = dynamic(() => import('../components/CreativeSkillsSection'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
})

const ResearchAndAchievements = dynamic(() => import('../components/ResearchAndAchievements'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
})

const ProjectSearch = dynamic(() => import('../components/ProjectSearch'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
})

const MLPlayground = dynamic(() => import('../components/MLPlayground'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
})

const ChatbotPopup = dynamic(() => import('../components/ChatbotPopup'), {
  ssr: false
})

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), {
  ssr: false
})

const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), {
  ssr: false
})

export default function Home() {
  return (
    <div className="mobile-container mobile-viewport-fix">
      {/* Loading Screen */}
      <Suspense fallback={null}>
        <LoadingScreen />
      </Suspense>

      {/* Theme Toggle */}
      <Suspense fallback={null}>
        <ThemeToggle />
      </Suspense>

      {/* Main Content */}
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative">
          <Suspense fallback={
            <div className="h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
              <div className="text-white text-2xl">Loading...</div>
            </div>
          }>
            <AnimatedHero />
          </Suspense>
        </section>

        {/* Work Experience */}
        <section id="experience" className="py-8 md:py-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />}>
            <WorkExperienceSection />
          </Suspense>
        </section>

        {/* Education */}
        <section id="education" className="py-8 md:py-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />}>
            <EducationSection />
          </Suspense>
        </section>

        {/* Skills */}
        <section id="skills" className="py-8 md:py-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />}>
            <CreativeSkillsSection />
          </Suspense>
        </section>

        {/* Research & Achievements */}
        <section id="research" className="py-8 md:py-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />}>
            <ResearchAndAchievements />
          </Suspense>
        </section>

        {/* Projects */}
        <section id="projects" className="py-8 md:py-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />}>
            <ProjectSearch />
          </Suspense>
        </section>

        {/* ML Playground */}
        <section id="playground" className="py-8 md:py-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />}>
            <MLPlayground />
          </Suspense>
        </section>
      </main>

      {/* Chatbot - Only load on user interaction for mobile performance */}
      <Suspense fallback={null}>
        <ChatbotPopup />
      </Suspense>
    </div>
  )
} 