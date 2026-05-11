export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const token = localStorage.getItem('lab_admin_token')
    if (!token) return navigateTo('/admin/login')
  }
})
