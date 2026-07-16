export async function supabaseRequest(table: string, method = 'GET', body?: unknown) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.')
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}`, { method, headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' })
  const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Supabase request failed. Run the supplied supabase/schema.sql first.')
  return data
}
