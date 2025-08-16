import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience - Professional Journey",
  description: "My professional experience including internships in software development and AI/ML",
  keywords: ["experience", "internship", "software development", "AI", "machine learning", "professional"],
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
