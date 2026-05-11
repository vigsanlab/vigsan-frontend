export const useApi = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string

  const getToken = (): string | null =>
    process.client ? localStorage.getItem('lab_admin_token') : null

  const authHeaders = (): Record<string, string> => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const request = async <T>(
    path: string,
    options: RequestInit & { params?: Record<string, string> } = {}
  ): Promise<T> => {
    const url = new URL(`${base}${path}`)
    if (options.params)
      Object.entries(options.params).forEach(([k, v]) => url.searchParams.set(k, v))

    const headers: Record<string, string> = {
      ...authHeaders(),
      ...(options.headers as Record<string, string>),
    }
    if (options.body && !(options.body instanceof FormData) && !headers['Content-Type'])
      headers['Content-Type'] = 'application/json'

    const res = await fetch(url.toString(), { ...options, headers })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }))
      throw new Error(err.message || `HTTP ${res.status}`)
    }
    return res.json()
  }

  const get  = <T>(path: string, params?: Record<string, string>) =>
    request<T>(path, { method: 'GET', params })
  const post = <T>(path: string, body: unknown, isFormData = false) =>
    request<T>(path, { method: 'POST', body: isFormData ? (body as FormData) : JSON.stringify(body) })
  const put  = <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
  const del  = <T>(path: string) => request<T>(path, { method: 'DELETE' })

  return { get, post, put, del, base }
}
