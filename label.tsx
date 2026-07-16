export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-[#e0e8ff] mb-2">
      {children}
    </label>
  )
}
