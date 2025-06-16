'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Tag, Calendar, Code } from 'lucide-react'
import AnimatedProjectCard from './AnimatedProjectCard'
import { projects, Project } from '@/data/projects'

interface SearchFilters {
  query: string
  category: string
  technologies: string[]
  sortBy: 'relevance' | 'newest' | 'name'
}

export default function ProjectSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    technologies: [],
    sortBy: 'relevance'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Get all unique technologies and categories
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech))
    })
    return Array.from(techs).sort()
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category))
    return ['all', ...Array.from(cats)]
  }, [])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(query)
        const matchesDescription = project.description.toLowerCase().includes(query)
        const matchesTech = project.technologies.some(tech => 
          tech.toLowerCase().includes(query)
        )
        if (!matchesTitle && !matchesDescription && !matchesTech) {
          return false
        }
      }

      // Category filter
      if (filters.category !== 'all' && project.category !== filters.category) {
        return false
      }

      // Technology filter
      if (filters.technologies.length > 0) {
        const hasAllTechs = filters.technologies.every(tech =>
          project.technologies.includes(tech)
        )
        if (!hasAllTechs) {
          return false
        }
      }

      return true
    })

    // Sort results
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'newest':
        // In a real app, you'd have creation dates
        filtered.reverse()
        break
      default:
        // Keep relevance order (original order)
        break
    }

    return filtered
  }, [filters])

  // Generate search suggestions
  useEffect(() => {
    if (filters.query.length > 1) {
      const query = filters.query.toLowerCase()
      const titleSuggestions = projects
        .filter(p => p.title.toLowerCase().includes(query))
        .map(p => p.title)
        .slice(0, 3)
      
      const techSuggestions = allTechnologies
        .filter(tech => tech.toLowerCase().includes(query))
        .slice(0, 3)

      setSuggestions([...titleSuggestions, ...techSuggestions])
    } else {
      setSuggestions([])
    }
  }, [filters.query, allTechnologies])

  const toggleTechnology = (tech: string) => {
    setFilters(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      technologies: [],
      sortBy: 'relevance'
    })
  }

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.technologies.length +
    (filters.query ? 1 : 0)

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Explore Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Search and filter through my portfolio of AI and ML projects
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies, or keywords..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-lg"
              />
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mt-2 shadow-lg z-10"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setFilters(prev => ({ ...prev, query: suggestion }))}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </span>
              {activeFiltersCount > 0 && (
                <motion.button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <X className="w-4 h-4" />
                  Clear all
                </motion.button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">Newest First</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>

                  {/* Technology Tags */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {allTechnologies.map(tech => (
                        <motion.button
                          key={tech}
                          onClick={() => toggleTechnology(tech)}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            filters.technologies.includes(tech)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {filters.query && (
                <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  <Search className="w-3 h-3" />
                  "{filters.query}"
                  <button onClick={() => setFilters(prev => ({ ...prev, query: '' }))}>
                    <X className="w-3 h-3 hover:text-blue-600" />
                  </button>
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  <Tag className="w-3 h-3" />
                  {filters.category}
                  <button onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}>
                    <X className="w-3 h-3 hover:text-purple-600" />
                  </button>
                </span>
              )}
              {filters.technologies.map(tech => (
                <span key={tech} className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  <Code className="w-3 h-3" />
                  {tech}
                  <button onClick={() => toggleTechnology(tech)}>
                    <X className="w-3 h-3 hover:text-green-600" />
                  </button>
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <AnimatedProjectCard
                  key={project.title}
                  {...project}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your search criteria or browse all projects
              </p>
              <motion.button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show All Projects
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 