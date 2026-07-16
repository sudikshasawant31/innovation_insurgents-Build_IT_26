'use client'

import { AlertTriangle, AlertCircle } from 'lucide-react'

interface ThreatBadgeProps {
  severity: string
  threatType: string
}

export function ThreatBadge({ severity, threatType }: ThreatBadgeProps) {
  const colorMap: Record<string, string> = {
    critical: 'bg-[#ff3333]/20 border-[#ff3333]/40 text-[#ff3333]',
    high: 'bg-[#ffa500]/20 border-[#ffa500]/40 text-[#ffa500]',
    medium: 'bg-[#ffff00]/20 border-[#ffff00]/40 text-[#ffff00]',
    low: 'bg-[#00d9ff]/20 border-[#00d9ff]/40 text-[#00d9ff]',
  }

  const iconMap: Record<string, JSX.Element> = {
    critical: <AlertTriangle className="w-4 h-4" />,
    high: <AlertTriangle className="w-4 h-4" />,
    medium: <AlertCircle className="w-4 h-4" />,
    low: <AlertCircle className="w-4 h-4" />,
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${colorMap[severity]}`}>
      {iconMap[severity]}
      <span>{threatType}</span>
    </div>
  )
}
