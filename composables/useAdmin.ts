export const useAdmin = () => {
  const token = useState<string | null>('adminToken', () =>
    process.client ? localStorage.getItem('lab_admin_token') : null
  )
  const isLoggedIn = computed(() => !!token.value)

  const login = (newToken: string) => {
    token.value = newToken
    if (process.client) localStorage.setItem('lab_admin_token', newToken)
  }

  const logout = () => {
    token.value = null
    if (process.client) {
      localStorage.removeItem('lab_admin_token')
      Object.keys(localStorage).filter(k => k.startsWith('lab_cache_')).forEach(k => localStorage.removeItem(k))
    }
    navigateTo('/admin/login')
  }

  return { token, isLoggedIn, login, logout }
}
