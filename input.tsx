import React from 'react'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-2 rounded-lg bg-[#0f1535] border border-[#2d3a5f] text-[#e0e8ff] placeholder-[#94a3b8] focus:outline-none focus:border-[#00d9ff] transition-colors ${className}`}
      {...props}
    />
  )
)

Input.displayName = 'Input'
