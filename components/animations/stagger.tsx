"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface StaggerProps {
  children: ReactNode[]
  delay?: number
  className?: string
}

export function Stagger({ children, delay = 0.1, className }: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * delay }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

