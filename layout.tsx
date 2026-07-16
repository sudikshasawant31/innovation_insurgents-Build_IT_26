import { PhoenixHeader } from '@/components/phoenix-header'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen overflow-x-hidden bg-background"><PhoenixHeader /><main className="mx-auto max-w-[1480px] px-4 py-6 lg:px-8">{children}</main></div>
}
