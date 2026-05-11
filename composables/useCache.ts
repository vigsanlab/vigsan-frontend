const CACHE_TTL = 5 * 60 * 1000

interface CacheEntry<T> { data: T; timestamp: number }

export const useCache = () => {
  const set = <T>(key: string, data: T, ttl = CACHE_TTL): void => {
    if (!process.client) return
    try {
      localStorage.setItem(`lab_cache_${key}`, JSON.stringify({ data, timestamp: Date.now() + ttl }))
    } catch {}
  }

  const get = <T>(key: string): T | null => {
    if (!process.client) return null
    try {
      const raw = localStorage.getItem(`lab_cache_${key}`)
      if (!raw) return null
      const entry: CacheEntry<T> = JSON.parse(raw)
      if (Date.now() > entry.timestamp) { localStorage.removeItem(`lab_cache_${key}`); return null }
      return entry.data
    } catch { return null }
  }

  const invalidate = (key: string) => { if (process.client) localStorage.removeItem(`lab_cache_${key}`) }

  const invalidateAll = () => {
    if (!process.client) return
    Object.keys(localStorage).filter(k => k.startsWith('lab_cache_')).forEach(k => localStorage.removeItem(k))
  }

  const fetchWithCache = async <T>(key: string, fetcher: () => Promise<T>, ttl = CACHE_TTL): Promise<T> => {
    const cached = get<T>(key)
    if (cached) {
      fetcher().then(fresh => set(key, fresh, ttl)).catch(() => {})
      return cached
    }
    const data = await fetcher()
    set(key, data, ttl)
    return data
  }

  return { set, get, invalidate, invalidateAll, fetchWithCache }
}
