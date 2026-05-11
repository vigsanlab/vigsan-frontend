<template>
  <div>
    <div class="mb-8">
      <p class="section-label mb-2">Overview</p>
      <h1 class="font-[family-name:var(--font-heading)] font-black text-2xl" style="color: #1C2D5E;">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label"
        class="card p-5 hover:cursor-default">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center"
            :style="`background: ${stat.bgColor};`">
            <component :is="stat.icon" :size="18" :style="`color: ${stat.color};`" />
          </div>
          <span class="text-xs font-bold px-2 py-0.5 rounded-lg" :style="`background: ${stat.bgColor}; color: ${stat.color};`">
            {{ stat.change }}
          </span>
        </div>
        <p class="font-[family-name:var(--font-heading)] font-black text-2xl mb-0.5" style="color: #111827;">
          {{ loading ? '—' : stat.value }}
        </p>
        <p class="text-xs text-gray-500">{{ stat.label }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent enquiries -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-[family-name:var(--font-heading)] font-bold text-gray-900">Recent Enquiries</h2>
          <NuxtLink to="/admin/enquiries"
            class="text-xs font-semibold transition-colors" style="color: #2EAB31;">View all →</NuxtLink>
        </div>
        <div v-if="loadingEnq" class="space-y-3">
          <div v-for="i in 4" :key="i" class="skeleton h-14" />
        </div>
        <div v-else-if="recentEnquiries.length" class="space-y-3">
          <div v-for="enq in recentEnquiries" :key="enq._id"
            class="flex items-start gap-3 p-3 rounded-xl" style="background: #F4F9FF;">
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-white"
              style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">
              {{ enq.name?.charAt(0)?.toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm text-gray-900 truncate">{{ enq.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ enq.testInterest || 'General enquiry' }}</p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="text-xs px-2 py-0.5 rounded-lg font-semibold capitalize"
                :style="enq.status === 'resolved' ? 'background:#EDFAEE;color:#2EAB31;' : 'background:#EEF1F8;color:#2A4E9A;'">
                {{ enq.status || 'new' }}
              </span>
              <span class="text-xs text-gray-400">{{ formatAge(enq.createdAt) }}</span>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-400 py-4 text-center">No enquiries yet.</p>
      </div>

      <!-- Quick actions -->
      <div class="card p-6">
        <h2 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-5">Quick Actions</h2>
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink v-for="action in quickActions" :key="action.label" :to="action.to"
            class="flex flex-col items-start gap-3 p-4 rounded-2xl transition-all"
            style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.07);"
            onmouseenter="this.style.boxShadow='0 4px 16px rgba(28,45,94,0.1)'; this.style.transform='translateY(-2px)'"
            onmouseleave="this.style.boxShadow='none'; this.style.transform='none'">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" :style="`background: ${action.bg};`">
              <component :is="action.icon" :size="16" :style="`color: ${action.color};`" />
            </div>
            <span class="text-xs font-bold" style="color: #1C2D5E;">{{ action.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlaskConical, MessageSquare, Image, Settings, Plus, TrendingUp } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Dashboard — Vigsan Admin' })
const { get } = useApi()
const loading = ref(true); const loadingEnq = ref(true)
const counts = ref({ tests: 0, enquiries: 0, images: 0 }); const recentEnquiries = ref<any[]>([])
const formatAge = (d: string) => {
  const diff = Date.now() - new Date(d).getTime(); const h = Math.floor(diff/3600000)
  if (h < 1) return 'Just now'; if (h < 24) return `${h}h ago`
  return `${Math.floor(h/24)}d ago`
}
const stats = computed(() => [
  { label: 'Total Tests',     value: counts.value.tests,     icon: FlaskConical,  change: 'Live', color: '#2EAB31', bgColor: '#EDFAEE' },
  { label: 'Enquiries',       value: counts.value.enquiries, icon: MessageSquare, change: 'Total', color: '#2A4E9A', bgColor: '#EEF1F8' },
  { label: 'Gallery Images',  value: counts.value.images,    icon: Image,         change: 'Items', color: '#9333EA', bgColor: '#F5F3FF' },
  { label: 'Active Today',    value: '—',                    icon: TrendingUp,    change: 'Live',  color: '#D97706', bgColor: '#FEF3C7' },
])
const quickActions = [
  { label: 'Add Test',      to: '/admin/tests',     icon: Plus,          bg: '#EDFAEE', color: '#2EAB31' },
  { label: 'Enquiries',     to: '/admin/enquiries', icon: MessageSquare, bg: '#EEF1F8', color: '#2A4E9A' },
  { label: 'Upload Images', to: '/admin/images',    icon: Image,         bg: '#F5F3FF', color: '#9333EA' },
  { label: 'Settings',      to: '/admin/settings',  icon: Settings,      bg: '#FEF3C7', color: '#D97706' },
]
onMounted(async () => {
  try {
    const [tests, enq, imgs] = await Promise.all([get<any[]>('/tests'), get<any[]>('/enquiries'), get<any[]>('/images')])
    counts.value = { tests: tests.length, enquiries: enq.length, images: imgs.length }
    recentEnquiries.value = enq.slice(0, 5)
  } catch (e) { console.error(e) } finally { loading.value = false; loadingEnq.value = false }
})
</script>
