"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Code2, BookOpen, Star, Zap } from "lucide-react"
import { Information } from "../../info/info"

// --- Types for Information.skills ---
type Skill = {
  name: string
  level: number
}

type SkillCategory = {
  category: string
  color: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  skills: Skill[]
}

export default function SkillsPage() {
  const router = useRouter()
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([])

  const skillsData: SkillCategory[] = Information.skills

  // Animate skill bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const allSkills = skillsData.flatMap((category) =>
        category.skills.map((skill) => `${category.category}-${skill.name}`),
      )
      setAnimatedSkills(allSkills)
    }, 500)

    return () => clearTimeout(timer)
  }, [skillsData])

  return (
    <main className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
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
              opacity: [0.2, 0.7, 0.2],
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
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Skills
              </h1>
              <p className="text-gray-400 mt-2">My technical and professional capabilities</p>
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      {/* Skills Grid */}
      <section className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${category.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const skillId = `${category.category}-${skill.name}`
                      const isAnimated = animatedSkills.includes(skillId)

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                          }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-400">{skill.level}%</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{
                                width: isAnimated ? `${skill.level}%` : 0,
                              }}
                              transition={{
                                duration: 1.5,
                                delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.8,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 container mx-auto px-6 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: "Programming Languages", count: "3+", icon: Code2 },
              { label: "Technologies", count: "11+", icon: Zap },
              { label: "Courses Completed", count: "7+", icon: BookOpen },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700"
                >
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.count}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>
    </main>
  )
}
