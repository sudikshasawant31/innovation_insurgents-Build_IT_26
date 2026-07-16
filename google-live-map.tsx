'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, LocateFixed, MapPinned } from 'lucide-react'

export type LivePin = { name: string; type: string; lat: number; lng: number; detail: string; color: string }

declare global { interface Window { google?: any } }

const style = [
  { elementType: 'geometry', stylers: [{ color: '#061321' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8da3b8' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#061321' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#15354b' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0b1e2c' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#061d31' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
]

export function GoogleLiveMap({ pins, onSelect }: { pins: LivePin[]; onSelect: (pin: LivePin) => void }) {
  const mapNode = useRef<HTMLDivElement>(null); const map = useRef<any>(null); const markers = useRef<any[]>([])
  const [error, setError] = useState(''); const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const showMarkers = () => {
    if (!map.current || !window.google) return
    markers.current.forEach(m => m.setMap(null)); markers.current = pins.map(pin => {
      const marker = new window.google.maps.Marker({ position: { lat: pin.lat, lng: pin.lng }, map: map.current, title: pin.name, icon: { path: window.google.maps.SymbolPath.CIRCLE, fillColor: pin.color, fillOpacity: 1, strokeColor: '#e0faff', strokeWeight: 2, scale: 9 } })
      marker.addListener('click', () => onSelect(pin)); return marker
    })
  }
  useEffect(() => {
    if (!key) { setError('Google Maps key missing. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local, then restart pnpm dev.'); return }
    const init = () => { if (!mapNode.current || !window.google) return; map.current = new window.google.maps.Map(mapNode.current, { center: { lat: 19.076, lng: 72.8777 }, zoom: 12, styles: style, mapTypeControl: false, streetViewControl: false, fullscreenControl: true, zoomControl: true }); showMarkers() }
    if (window.google?.maps) { init(); return }
    const existing = document.querySelector<HTMLScriptElement>('script[data-phoenix-google-map]')
    if (existing) { existing.addEventListener('load', init); return () => existing.removeEventListener('load', init) }
    const script = document.createElement('script'); script.dataset.phoenixGoogleMap = 'true'; script.async = true; script.defer = true; script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&v=weekly`; script.onload = init; script.onerror = () => setError('Google Maps could not load. Check your API key, billing, enabled Maps JavaScript API, and localhost referrer restriction.'); document.head.appendChild(script)
  }, [key])
  useEffect(() => { showMarkers() }, [pins])
  function locate() { if (!navigator.geolocation || !map.current) return; navigator.geolocation.getCurrentPosition(p => { const pos = { lat: p.coords.latitude, lng: p.coords.longitude }; map.current.panTo(pos); map.current.setZoom(15); new window.google.maps.Marker({ position: pos, map: map.current, title: 'Your location', icon: { path: window.google.maps.SymbolPath.CIRCLE, fillColor: '#22d3ee', fillOpacity: 1, strokeColor: '#ffffff', strokeWeight: 3, scale: 8 } }) }, () => setError('Location permission was denied. Allow it in your browser settings and try again.')) }
  if (error) return <div className="grid h-[500px] place-items-center rounded-xl border border-red-400/25 bg-red-400/[.04] p-6 text-center"><div><AlertTriangle className="mx-auto h-8 w-8 text-orange-300"/><h2 className="mt-4 font-bold">Google Maps is not connected yet</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">{error}</p></div></div>
  return <div className="relative h-[500px] overflow-hidden rounded-xl"><div ref={mapNode} className="h-full w-full"/><button onClick={locate} className="absolute bottom-5 left-5 phoenix-button px-3 py-2 text-xs"><LocateFixed className="h-4 w-4"/> Use my location</button><div className="absolute right-4 top-4 rounded-lg border border-cyan-300/25 bg-[#061321]/90 px-3 py-2 text-[10px] font-bold tracking-wider text-cyan-100"><MapPinned className="mr-1 inline h-3 w-3"/> GOOGLE MAPS / LIVE</div></div>
}
