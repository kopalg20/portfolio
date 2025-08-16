import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - My Work & Innovations",
  description:
    "Showcase of my projects including AI-powered applications, machine learning models, and web development work",
  keywords: ["projects", "portfolio", "AI", "machine learning", "web development", "Flask", "Python", "JavaScript"],
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
