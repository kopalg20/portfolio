import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education - My Academic Journey',
  description: 'My educational background including college, higher secondary, and secondary education details',
  keywords: ['education', 'academic', 'college', 'school', 'qualifications'],
}

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
