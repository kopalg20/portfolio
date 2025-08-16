"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Code, Zap } from "lucide-react"
import { Information } from "../../info/info"

// Define the project type from your Information shape
interface Project {
  id: string | number
  title: string
  subtitle: string
  description: string
  longDescription: string
  date: string
  icon: React.ComponentType<{ className?: string }>
  bgGradient: string
  color: string
  features: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl: string
}

export default function ProjectsPage() {
  const [animatedProjects, setAnimatedProjects] = useState<string[]>([])

  const projectsData: Project[] = Information.projects

  // Animate projects on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProjects(projectsData.map((project) => project.id.toString()))
    }, 800)

    return () => clearTimeout(timer)
  }, [projectsData])

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-8 pb-4"
      >
        <div className="container mx-auto px-6 pt-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              My Projects
            </h1>
            <p className="text-gray-400 text-lg">Innovative solutions and creative implementations</p>
          </div>
        </div>
      </motion.header>

      {/* Projects Grid */}
      <section className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.map((project, index) => {
              const Icon = project.icon
              const isAnimated = animatedProjects.includes(project.id.toString())

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.3 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-gradient-to-br ${project.bgGradient} backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full`}
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${project.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                          </div>
                          <p className="text-blue-400 font-semibold">{project.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.date}</span>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="mb-6">
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">{project.description}</p>
                      <p className="text-gray-400 leading-relaxed">{project.longDescription}</p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.8 + index * 0.3 + idx * 0.1 + 0.5,
                            }}
                            className="text-gray-300 flex items-start space-x-2 text-sm"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: isAnimated ? 1 : 0 }}
                              transition={{ duration: 0.3, delay: 1.2 + index * 0.3 + idx * 0.1 }}
                              className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                            />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Code className="w-5 h-5 text-purple-400 mr-2" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 1.5 + index * 0.3 + idx * 0.05,
                            }}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600 hover:border-gray-500 transition-colors duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium border border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Code</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
