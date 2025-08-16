"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Calendar, MapPin } from "lucide-react"
import { Information } from "../../info/info"

// Define Education type
interface Education {
  id: number
  level: string
  institution: string
  degree: string
  duration: string
  location: string
  grade: string
  color: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function EducationPage() {
  const router = useRouter()

  const educationData: Education[] = Information.educationDetails

  return (
    <main
      className="min-h-screen bg-gray-900 text-white relative overflow-hidden select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
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
          <div className="flex items-center justify-center">
            <h1 className="text-3xl items-center md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Education
            </h1>
          </div>
        </div>
      </motion.header>

      {/* Education Timeline */}
      <section className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {educationData.map((edu, index) => {
            const Icon = edu.icon
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline line */}
                {index < educationData.length - 1 && (
                  <div className="absolute left-1/2 top-32 w-px h-24 bg-gradient-to-b from-gray-600 to-transparent transform -translate-x-1/2 hidden md:block" />
                )}

                {/* Education Card */}
                <div className={`relative ${index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl"
                  >
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${edu.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{edu.level}</h3>
                        <h4 className="text-xl text-blue-400 font-semibold">{edu.institution}</h4>
                        <p className="text-gray-300 text-lg">{edu.degree}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <p className="text-green-400 font-semibold">{edu.grade}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline dot */}
                  <div className="absolute top-8 left-1/2 w-4 h-4 bg-blue-400 rounded-full transform -translate-x-1/2 border-4 border-gray-900 hidden md:block" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
