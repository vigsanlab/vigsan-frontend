<template>
  <div>
    <div class="mb-8">
      <p class="section-label mb-2">System</p>
      <h2 class="font-[family-name:var(--font-heading)] font-black text-2xl" style="color: #1C2D5E;">Settings</h2>
      <p class="text-sm text-gray-400 mt-0.5">Site configuration and deployment info.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Site config -->
      <div class="card p-6">
        <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-1">Site Configuration</h3>
        <p class="text-sm text-gray-500 mb-5 leading-relaxed">Configured via environment variables. Update in your Render service and redeploy.</p>
        <div class="space-y-3">
          <div v-for="field in configFields" :key="field.key"
            class="flex items-start gap-3 p-3.5 rounded-xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.06);">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EEF1F8;">
              <component :is="field.icon" :size="14" style="color: #2A4E9A;" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-400 mb-0.5">{{ field.label }}</p>
              <p class="text-sm font-semibold text-gray-800 truncate">{{ field.value }}</p>
            </div>
            <span class="px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0" style="background: #EEF1F8; color: #2A4E9A;">env</span>
          </div>
        </div>
      </div>

      <!-- Admin account -->
      <div class="card p-6">
        <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-1">Admin Account</h3>
        <p class="text-sm text-gray-500 mb-4 leading-relaxed">Credentials are stored as backend env vars <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">ADMIN_USERNAME</code> and <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">ADMIN_PASSWORD</code>.</p>
        <div class="flex items-start gap-3 p-4 rounded-xl mb-5" style="background: #FEF3C7; border: 1px solid rgba(217,119,6,0.2);">
          <ShieldAlert :size="16" style="color: #D97706; margin-top: 2px; flex-shrink: 0;" />
          <div>
            <p class="text-sm font-bold" style="color: #92400E;">Security tip</p>
            <p class="text-xs mt-0.5" style="color: #B45309;">Use a strong, unique password. JWT tokens expire after 7 days and require a fresh login.</p>
          </div>
        </div>
        <button @click="logout"
          class="w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2"
          style="background: #FEF2F2; color: #DC2626; border: 1.5px solid rgba(220,38,38,0.2);">
          <LogOut :size="15" /> Logout from admin
        </button>
      </div>

      <!-- Deployment -->
      <div class="card p-6 lg:col-span-2">
        <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-5">Deployment & Performance</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.06);">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-bold text-gray-500">Backend API</p>
              <span class="px-2.5 py-0.5 rounded-lg text-xs font-bold"
                :style="backendStatus === 'ready' ? 'background:#EDFAEE;color:#2EAB31;' : backendStatus === 'error' ? 'background:#FEF2F2;color:#DC2626;' : 'background:#FEF3C7;color:#D97706;'">
                {{ backendStatus === 'ready' ? 'Online' : backendStatus === 'error' ? 'Offline' : 'Waking…' }}
              </span>
            </div>
            <p class="text-xs font-mono text-gray-500 truncate">{{ apiBase }}</p>
          </div>
          <div class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.06);">
            <p class="text-xs font-bold text-gray-500 mb-2">Cache strategy</p>
            <p class="text-sm font-bold text-gray-800">5 min TTL</p>
            <p class="text-xs text-gray-400 mt-1">Stale-while-revalidate. Admin saves auto-invalidate.</p>
          </div>
          <div class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.06);">
            <p class="text-xs font-bold text-gray-500 mb-2">Backend wake-up</p>
            <p class="text-sm font-bold text-gray-800">Auto on page load</p>
            <p class="text-xs text-gray-400 mt-1">Fires to <code class="text-xs">/api/ping</code> when any visitor opens the site.</p>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between p-4 rounded-2xl" style="background: #FEF3C7; border: 1px solid rgba(217,119,6,0.2);">
          <div>
            <p class="text-sm font-bold" style="color: #92400E;">Clear all cached data</p>
            <p class="text-xs mt-0.5" style="color: #B45309;">Forces fresh fetch on next page load. Useful after bulk test updates.</p>
          </div>
          <button @click="clearCache"
            class="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            style="background: #fff; color: #D97706; border: 1.5px solid rgba(217,119,6,0.3);">
            <Trash2 :size="12" /> Clear cache
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogOut, Trash2, Building2, Phone, Mail, MapPin, Globe, ShieldAlert } from 'lucide-vue-next'
definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: 'Settings — Vigsan Admin' })
const { logout } = useAdmin(); const { base: apiBase } = useApi(); const { invalidateAll } = useCache()
const config = useRuntimeConfig(); const backendStatus = useState<string>('backendStatus')
const toast = useToast()
const configFields = [
  { key: 'labName',    label: 'Lab Name',     value: config.public.labName,    icon: Building2 },
  { key: 'labPhone',   label: 'Phone',        value: config.public.labPhone,   icon: Phone     },
  { key: 'labEmail',   label: 'Email',        value: config.public.labEmail,   icon: Mail      },
  { key: 'labAddress', label: 'Address',      value: config.public.labAddress, icon: MapPin    },
  { key: 'apiBase',    label: 'API Base URL', value: apiBase,                  icon: Globe     },
]
const clearCache = () => {
  invalidateAll()
  toast.add({ title: 'Cache cleared', description: 'Fresh data will be fetched on next load.', color: 'success' })
}
</script>
