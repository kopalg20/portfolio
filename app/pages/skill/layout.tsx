import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills - My Technical Expertise",
  description: "My technical skills including programming languages, development tools, AI/ML, and soft skills",
  keywords: ["skills", "programming", "development", "AI", "machine learning", "technical expertise"],
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
