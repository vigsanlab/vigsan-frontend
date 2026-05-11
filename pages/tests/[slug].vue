<template>
  <div>
    <div v-if="loading" class="container-pad py-20 space-y-4">
      <div class="skeleton h-10 w-72" />
      <div class="skeleton h-4 w-full max-w-xl" />
      <div class="skeleton h-4 w-2/3" />
    </div>

    <div v-else-if="!test" class="container-pad py-24 text-center">
      <p class="text-gray-400 text-lg mb-4">Test not found.</p>
      <NuxtLink to="/tests"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
        style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">
        ← Back to all tests
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Hero -->
      <section class="relative overflow-hidden hero-bg py-16">
        <div class="dot-grid absolute inset-0 pointer-events-none" />
        <div class="container-pad relative">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-xs mb-8" style="color: rgba(255,255,255,0.45);">
            <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
            <ChevronRight :size="12" />
            <NuxtLink to="/tests" class="hover:text-white transition-colors">Tests</NuxtLink>
            <ChevronRight :size="12" />
            <span style="color: rgba(255,255,255,0.75);">{{ test.name }}</span>
          </nav>

          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-4 flex-wrap">
                <span class="px-3 py-1 rounded-lg text-xs font-bold capitalize"
                  style="background: rgba(28,45,94,0.5); color: #9BAED6; border: 1px solid rgba(155,174,214,0.2);">
                  {{ test.category }}
                </span>
                <span v-if="test.isFeatured"
                  class="px-3 py-1 rounded-lg text-xs font-bold"
                  style="background: rgba(245,158,11,0.2); color: #FCD34D; border: 1px solid rgba(245,158,11,0.25);">
                  ⭐ Popular
                </span>
              </div>
              <h1 class="font-[family-name:var(--font-heading)] font-black text-white mb-4" style="font-size: clamp(1.75rem, 4vw, 3rem);">
                {{ test.name }}
              </h1>
              <p class="max-w-xl leading-relaxed mb-6" style="color: rgba(255,255,255,0.6);">{{ test.description }}</p>
              <div class="flex items-center gap-5 flex-wrap">
                <span v-if="test.homeCollection" class="flex items-center gap-2 text-sm font-medium" style="color: #65CF68;">
                  <Home :size="15" /> Free home collection
                </span>
                <span class="flex items-center gap-2 text-sm" style="color: rgba(255,255,255,0.5);">
                  <Clock :size="15" /> Report in {{ test.turnaroundTime }}
                </span>
                <span v-if="test.fastingRequired" class="flex items-center gap-2 text-sm" style="color: #FCD34D;">
                  <AlertTriangle :size="15" /> Fasting required
                </span>
              </div>
            </div>

            <!-- Price card -->
            <div class="bg-white rounded-3xl p-7 md:w-72 flex-shrink-0"
              style="box-shadow: 0 24px 64px rgba(0,0,0,0.25);">
              <span v-if="test.discountPercent > 0"
                class="inline-block mb-3 px-3 py-1 rounded-lg text-xs font-bold"
                style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E;">
                {{ test.discountPercent }}% discount applied
              </span>
              <p v-if="test.mrp > test.price" class="text-xs text-gray-400 line-through mb-1">MRP ₹{{ test.mrp }}</p>
              <p class="font-[family-name:var(--font-heading)] font-black mb-1" style="font-size: 2.75rem; color: #1C2D5E; line-height: 1;">
                ₹{{ test.price }}
              </p>
              <p class="text-xs text-gray-400 mb-6">Inclusive of all charges</p>
              <NuxtLink :to="`/contact?test=${encodeURIComponent(test.name)}`"
                class="block w-full text-center py-3.5 rounded-2xl text-sm font-bold text-white mb-3 transition-all btn-green-glow"
                style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
                Book This Test
              </NuxtLink>
              <p class="text-center text-xs text-gray-400">or call {{ config.public.labPhone }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Details -->
      <section class="section-pad" style="background: #F4F9FF;">
        <div class="container-pad grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2 space-y-6">
            <!-- Parameters -->
            <div class="card p-6">
              <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-xl mb-5 flex items-center gap-2">
                <div class="icon-box w-9 h-9 rounded-xl">
                  <ClipboardCheck :size="16" style="color: #2EAB31;" />
                </div>
                Parameters ({{ test.parameterCount }})
              </h2>
              <div v-if="test.parameters?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div v-for="p in test.parameters" :key="p"
                  class="flex items-center gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-xl"
                  style="background: #F4F9FF;">
                  <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style="background: #EDFAEE;">
                    <CheckCircle :size="12" style="color: #2EAB31;" />
                  </div>
                  {{ p }}
                </div>
              </div>
              <p v-else class="text-gray-400 text-sm">Parameter list not available.</p>
            </div>

            <!-- Test info -->
            <div class="card p-6">
              <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-xl mb-5">Test Information</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div v-for="info in testInfoItems" :key="info.label"
                  class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.06);">
                  <p class="text-xs text-gray-400 mb-1.5">{{ info.label }}</p>
                  <p class="font-[family-name:var(--font-heading)] font-bold text-sm" style="color: #1C2D5E;">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar enquiry -->
          <div class="md:col-span-1">
            <div class="card p-6 sticky top-24">
              <p class="section-label mb-3">Quick Booking</p>
              <h3 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg mb-5">Send an Enquiry</h3>
              <EnquiryForm :default-test="test.name" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Home, Clock, AlertTriangle, ClipboardCheck, CheckCircle } from 'lucide-vue-next'
const route = useRoute()
const { get } = useApi(); const { fetchWithCache } = useCache()
const config = useRuntimeConfig()
const test = ref<any>(null); const loading = ref(true)
useHead(() => ({ title: test.value ? `${test.value.name} — Vigsan Healthcare Labs` : 'Test Details' }))
const testInfoItems = computed(() => test.value ? [
  { label: 'Fasting Required', value: test.value.fastingRequired ? 'Yes (8–10 hrs)' : 'Not required'                  },
  { label: 'Report Time',      value: test.value.turnaroundTime                                                        },
  { label: 'Home Collection',  value: test.value.homeCollection ? 'Available' : 'Lab visit required'                  },
  ...(test.value.partnerLab ? [{ label: 'Processed By', value: test.value.partnerLab }] : []),
] : [])
onMounted(async () => {
  try {
    test.value = await fetchWithCache(`test-${route.params.slug}`, () => get<any>(`/tests/${route.params.slug}`))
  } catch { test.value = null } finally { loading.value = false }
})
</script>
