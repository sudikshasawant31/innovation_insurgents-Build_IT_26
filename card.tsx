export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-[#2d3a5f] bg-[#1a2555] ${className}`}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pb-0">{children}</div>
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-[#e0e8ff]">{children}</h2>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6">{children}</div>
}
