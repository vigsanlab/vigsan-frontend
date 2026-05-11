export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const backendStatus = useState<'waking' | 'ready' | 'error'>('backendStatus', () => 'waking')

  const ping = async () => {
    try {
      const res = await fetch(`${config.public.apiBase}/ping`, {
        method: 'GET',
        signal: AbortSignal.timeout(60_000),
      })
      backendStatus.value = res.ok ? 'ready' : 'error'
    } catch {
      backendStatus.value = 'error'
    }
  }

  ping() // fire and forget — does not block page render
})
