"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { Home, GraduationCap, Code, FolderOpen, Mail, Menu, X } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/"},
    { name: "Education", path: "/pages/education"},
    { name: "Skills", path: "/pages/skill"},
    { name: "Experiences", path: "/pages/experience"},
    { name: "Projects", path: "/pages/project"},
    { name: "Leaderships", path: "/pages/leadership"},
    { name: "Achievements", path: "/pages/achievement"},
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-700"
        >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Empty for spacing */}
          <div className="w-8 md:w-0"></div>

          {/* Center - Portfolio Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2"
          >
          </motion.div>

          {/* Right side - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? "text-white bg-gray-800" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-sm font-medium">{item.name}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-700 py-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.path

                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive ? "text-white bg-gray-800" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>

                      {isActive && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full" />}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
