"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Award,
  Star,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { Information } from "../../info/info"

// ✅ Define the Achievement type
interface Achievement {
  id: number
  title: string
  subtitle: string
  date: string
  organization: string
  description: string
  details: string[]
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgGradient: string
  certificateUrl?: string
}

export default function AchievementsPage() {
  const [animatedAchievements, setAnimatedAchievements] = useState<string[]>([])

  // ✅ Tell TS what type this is
  const achievementsData: Achievement[] = Information.achievements

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.2, 0.8, 0.2],
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Achievements & Recognition
            </h1>
            <p className="text-gray-400 text-lg">Celebrating milestones and accomplishments in my journey</p>
          </div>
        </div>
      </motion.header>

      {/* Achievements Grid */}
      <section className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {achievementsData.map((achievement, index) => {
              const Icon = achievement.icon
              const isAnimated = animatedAchievements.includes(achievement.id.toString())

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-gradient-to-br ${achievement.bgGradient} backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full`}
                  >
                    {/* Achievement Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${achievement.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{achievement.title}</h3>
                          <p className="text-blue-400 font-semibold">{achievement.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{achievement.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Organization */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Award className="w-4 h-4" />
                        <span className="font-medium">{achievement.organization}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">{achievement.description}</p>

                    {/* Details */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-2" />
                        Achievement Details
                      </h4>
                      <ul className="space-y-2">
                        {achievement.details.map((detail, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 1 + index * 0.2 + idx * 0.1 + 0.5,
                            }}
                            className="text-gray-300 flex items-start space-x-3 text-sm"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: isAnimated ? 1 : 0 }}
                              transition={{ duration: 0.3, delay: 1.5 + index * 0.2 + idx * 0.1 }}
                              className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"
                            />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Certificate Link */}
                    {achievement.id === 3 && achievement.certificateUrl && (
                      <div className="pt-4 border-t border-gray-700">
                        <motion.a
                          href={achievement.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 w-fit"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Certificate</span>
                        </motion.a>
                      </div>
                    )}
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
