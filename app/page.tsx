"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {  Github, Linkedin, Mail, Code } from 'lucide-react'

export default function HomePage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const texts = [
    "Hi, I'm Kopal Garg",
    "Let's walk through my portfolio",
  ]

  // Typing animation effect
  useEffect(() => {
    const currentText = texts[currentTextIndex]
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, currentTextIndex, texts])

  return (
    <main
      className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center relative overflow-hidden select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <section className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-blue-400"
            >
              |
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Software Developer
          </p>
          <p className="text-lg md:text-xl text-blue-400 mt-2">
            Turning coffee and code into seamless user experiences.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-6 mb-16"
          aria-label="Social media links"
        >
          {[
            { icon: Github, href: "https://github.com/kopalg20", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/kopal-garg-6ab454287/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:kopalgarg2005@gmail.com", label: "Email" },
            {icon: Code, href: "https://leetcode.com/u/kopalgarg20/", label: "LeetCode" }
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gray-800 rounded-full border border-gray-700 hover:border-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors duration-300" />
            </motion.a>
          ))}
        </motion.nav>
      </section>
    </main>
  )
}
