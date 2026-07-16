'use client'

import { Activity, Menu, Radio, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const nav = [
  ['Command', '/dashboard'], ['Capsules', '/knowledge'], ['Map', '/map'], ['Exchange', '/resources'],
  ['Registry', '/survivors'], ['Field Ops', '/field'], ['Intelligence', '/intelligence'], ['Language Lab', '/language'], ['Translator', '/translator'], ['Timeline', '/timeline'], ['Broadcast', '/broadcast'], ['Relay Network', '/relay-network'], ['Integrations', '/integrations'], ['About', '/about'],
]

export function PhoenixHeader() {
  const [open, setOpen] = useState(false)
  return <header className="phoenix-header sticky top-0 z-50">
    <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 lg:px-8">
      <Link href="/" className="group flex items-center gap-3" aria-label="PHOENIX home">
        <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/60 bg-cyan-300/15 shadow-[0_0_28px_rgba(34,211,238,.3)]"><Radio className="h-5 w-5 text-cyan-200" /><i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-300 animate-ping" /></span>
        <span><b className="tracking-[.28em] text-cyan-100">PHOENIX</b><small className="ml-2 hidden text-[9px] tracking-[.18em] text-slate-500 sm:inline">CIVILIZATION OS</small></span>
      </Link>
      <nav className="hidden items-center gap-1 xl:flex">{nav.map(([name, href]) => <Link key={href} href={href} className="rounded-md px-2 py-2 text-[11px] font-medium text-slate-400 transition hover:bg-cyan-300/10 hover:text-cyan-100">{name}</Link>)}</nav>
      <div className="flex items-center gap-3"><span className="hidden items-center gap-2 text-[10px] font-bold tracking-widest text-emerald-300 md:flex"><Activity className="h-3 w-3 animate-pulse" /> MESH ONLINE</span><button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 text-cyan-100 xl:hidden" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button></div>
    </div>
    {open && <nav className="grid grid-cols-2 gap-1 border-t border-cyan-300/10 bg-[#07101f]/95 p-4 xl:hidden">{nav.map(([name, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="rounded-lg p-3 text-sm text-slate-300 hover:bg-cyan-300/10">{name}</Link>)}</nav>}
  </header>
}
