'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface DashboardCardProps {
  title: string
  value?: string | number
  icon?: ReactNode
  children?: ReactNode
  className?: string
  alert?: boolean
}

export function DashboardCard({
  title,
  value,
  icon,
  children,
  className = '',
  alert = false,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`phoenix-card ${alert ? 'phoenix-card-glow' : ''} p-6 ${className} ${
        alert ? 'border-[#ff3333]/40' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#e0e8ff]">{title}</h3>
        {icon && <div className="text-[#00d9ff]">{icon}</div>}
      </div>

      {value !== undefined && (
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#00d9ff] phoenix-glow">{value}</span>
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  )
}
