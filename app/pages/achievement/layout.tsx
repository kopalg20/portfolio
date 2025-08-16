import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Achievements - Awards & Recognition",
  description: "My achievements including academic awards, technical certifications, and professional recognition",
  keywords: [
    "achievements",
    "awards",
    "recognition",
    "CBSE",
    "academic excellence",
    "GDSC",
    "Java certification",
    "Udemy",
  ],
}

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
