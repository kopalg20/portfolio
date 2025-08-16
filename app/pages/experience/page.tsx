"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Building, Code, Brain, CheckCircle, TrendingUp, FileCheck } from "lucide-react"
import { Information } from "../../info/info"

export default function ExperiencePage() {
  const [animatedItems, setAnimatedItems] = useState<string[]>([])

  const experienceData = Information.experiences

  const stats = [
    { label: "Total Experience", value: "4+ Months", icon: Calendar },
    { label: "Projects Completed", value: "4+", icon: CheckCircle },
    { label: "Technologies Used", value: "10+", icon: Code },
    { label: "Performance Improvement", value: "Hours to Seconds", icon: TrendingUp },
  ]

  // Animate achievements on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const allAchievements = experienceData.flatMap((exp) => exp.achievements.map((_, idx) => `${exp.id}-${idx}`))
      setAnimatedItems(allAchievements)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
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
              Professional Experience
            </h1>
            <p className="text-gray-400 text-lg">My internships and professional journey</p>
          </div>
        </div>
      </motion.header>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 container mx-auto px-6 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors duration-300"
                >
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <section className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {experienceData.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.3 }}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline line */}
                {index < experienceData.length - 1 && (
                  <div className="absolute left-1/2 top-96 w-px h-32 bg-gradient-to-b from-gray-600 to-transparent transform -translate-x-1/2 hidden lg:block" />
                )}

                {/* Experience Card */}
                <div className={`relative ${index % 2 === 0 ? "lg:pr-1/2" : "lg:pl-1/2 lg:ml-auto"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`${exp.bgPattern} backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${exp.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-2xl font-bold text-white mb-1 flex items-center">
                              {exp.role}
                              {exp.certificate && (
                                <a
                                  href={exp.certificate}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-400 hover:text-blue-600"
                                  title="View Certificate"
                                >
                                  <FileCheck className="w-5 h-5 inline" />
                                </a>
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-2 text-blue-400 font-semibold">
                            <Building className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.color} text-white`}
                      >
                        {exp.type}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => {
                          const itemId = `${exp.id}-${idx}`
                          const isAnimated = animatedItems.includes(itemId)

                          return (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.8 + index * 0.3 + idx * 0.1 + 0.5,
                              }}
                              className="text-gray-300 flex items-start space-x-3 leading-relaxed"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: isAnimated ? 1 : 0 }}
                                transition={{ duration: 0.3, delay: 1.2 + index * 0.3 + idx * 0.1 }}
                                className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                              />
                              <span>{achievement}</span>
                            </motion.li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Code className="w-5 h-5 text-purple-400 mr-2" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
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
                  </motion.div>

                  {/* Timeline dot */}
                  <div className="absolute top-8 left-1/2 w-4 h-4 bg-blue-400 rounded-full transform -translate-x-1/2 border-4 border-gray-900 hidden lg:block" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
