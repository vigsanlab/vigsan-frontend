<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background: linear-gradient(135deg, #060B1A 0%, #0C1630 50%, #1C2D5E 100%);">
    <div class="dot-grid fixed inset-0 pointer-events-none opacity-50" />
    <div class="relative w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-3xl p-10 shadow-2xl" style="box-shadow: 0 40px 100px rgba(6,11,26,0.5);">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center"
              style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">
              <Microscope :size="24" color="white" />
            </div>
            <div>
              <p class="font-[family-name:var(--font-heading)] font-black text-base leading-none" style="color: #1C2D5E;">Vigsan Labs</p>
              <p class="text-[11px] font-bold uppercase tracking-widest mt-0.5" style="color: #2EAB31;">Admin Portal</p>
            </div>
          </div>
        </div>

        <div class="text-center mb-8">
          <h1 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-2xl mb-1">Welcome back</h1>
          <p class="text-sm text-gray-400">Sign in to your admin account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-bold mb-2" style="color: #1C2D5E;">Username</label>
            <div class="relative">
              <User :size="15" class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: #9BAED6;" />
              <input v-model="username" type="text" placeholder="admin" required autofocus
                class="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
                onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
                onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold mb-2" style="color: #1C2D5E;">Password</label>
            <div class="relative">
              <Lock :size="15" class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: #9BAED6;" />
              <input v-model="password" :type="showPass ? 'text' : 'password'" placeholder="••••••••" required
                class="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
                onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
                onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'" />
              <button type="button" @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition-opacity"
                style="color: #1C2D5E;">
                <Eye v-if="!showPass" :size="15" /><EyeOff v-else :size="15" />
              </button>
            </div>
          </div>

          <div v-if="error"
            class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style="background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B;">
            <AlertCircle :size="15" /> {{ error }}
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all btn-green-glow mt-2"
            style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A); font-family: var(--font-heading);"
            :style="loading ? 'opacity: 0.7;' : ''">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <Loader2 :size="15" class="animate-spin" /> Signing in…
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-xs transition-colors" style="color: #9BAED6;">← Back to website</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, Eye, EyeOff } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ title: 'Admin Login — LabCare' })

const { login } = useAdmin(); const { post } = useApi()
const username = ref(''); const password = ref('')
const showPwd = ref(false); const loading = ref(false); const error = ref('')
const showPass = ref(false);
const handleLogin = async () => {
  loading.value = true; error.value = ''
  try {
    const res = await post<{ token: string }>('/admin/login', { username: username.value, password: password.value })
    login(res.token)
    await navigateTo('/admin')
  } catch (e: any) { error.value = e.message || 'Invalid credentials.' }
  finally { loading.value = false }
}
</script>
