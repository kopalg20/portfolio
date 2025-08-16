import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leadership - Roles & Responsibilities",
  description:
    "My leadership roles and responsibilities in various organizations including AWS Cloud Club, Taarangana, and Rotaract Club",
  keywords: [
    "leadership",
    "roles",
    "responsibilities",
    "AWS",
    "Rotaract",
    "Taarangana",
    "team management",
    "coordination",
  ],
}

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
