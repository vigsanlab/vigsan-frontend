<template>
  <div class="min-h-screen bg-gray-50 flex">

    <!-- Sidebar -->
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">
      <!-- Logo -->
      <div class="px-5 py-4 border-b border-gray-100">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
            <FlaskConical :size="16" color="white" :stroke-width="2.5" />
          </div>
          <div>
            <p class="font-[family-name:var(--font-heading)] font-bold text-sm text-gray-900 leading-tight">LabCare Admin</p>
            <p class="text-xs text-gray-400">Dashboard</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <NuxtLink to="/admin"          exact-active-class="active" class="admin-nav-link">
          <LayoutDashboard :size="17" /> Overview
        </NuxtLink>
        <NuxtLink to="/admin/tests"    active-class="active" class="admin-nav-link">
          <FlaskConical :size="17" /> Tests & Packages
        </NuxtLink>
        <NuxtLink to="/admin/enquiries" active-class="active" class="admin-nav-link">
          <Mail :size="17" /> Enquiries
          <UBadge v-if="pendingCount > 0" :label="String(pendingCount)" color="warning" variant="solid" size="xs" class="ml-auto" />
        </NuxtLink>
        <NuxtLink to="/admin/images"   active-class="active" class="admin-nav-link">
          <ImageIcon :size="17" /> Gallery & Images
        </NuxtLink>
        <NuxtLink to="/admin/settings" active-class="active" class="admin-nav-link">
          <Settings :size="17" /> Settings
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="px-3 py-4 border-t border-gray-100">
        <button @click="logout" class="admin-nav-link text-red-500 hover:!bg-red-50 hover:!text-red-600">
          <LogOut :size="17" /> Logout
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/30 z-30 md:hidden" />

    <!-- Main -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
      <!-- Top bar -->
      <header class="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <button @click="sidebarOpen = !sidebarOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu :size="20" />
        </button>
        <h1 class="hidden md:block font-[family-name:var(--font-heading)] font-semibold text-gray-900 text-base">{{ pageTitle }}</h1>
        <div class="flex items-center gap-3">
          <NuxtLink to="/" target="_blank" class="text-xs text-teal-700 hover:underline flex items-center gap-1">
            View website <ExternalLink :size="11" />
          </NuxtLink>
          <div class="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center text-white text-xs font-[family-name:var(--font-heading)] font-bold">A</div>
        </div>
      </header>

      <main class="flex-1 p-4 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlaskConical, LayoutDashboard, Mail, Image as ImageIcon, Settings, LogOut, Menu, ExternalLink } from 'lucide-vue-next'
const { logout } = useAdmin()
const { get } = useApi()
const route = useRoute()
const sidebarOpen = ref(false)
const pendingCount = ref(0)

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    '/admin':            'Overview',
    '/admin/tests':      'Tests & Packages',
    '/admin/enquiries':  'Enquiries',
    '/admin/images':     'Gallery & Images',
    '/admin/settings':   'Settings',
  }
  return map[route.path] || 'Admin'
})

onMounted(async () => {
  try {
    const stats = await get<{ pending: number }>('/enquiries/stats')
    pendingCount.value = stats.pending
  } catch {}
})
</script>
