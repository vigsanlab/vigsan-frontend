<template>
  <div>
    <div v-if="loading" class="container-pad py-20 space-y-4">
      <div class="skeleton h-10 w-72" /><div class="skeleton h-4 w-full max-w-xl" /><div class="skeleton h-4 w-2/3" />
    </div>

    <div v-else-if="!test" class="container-pad py-24 text-center">
      <p class="text-gray-400 text-lg mb-4">Test not found.</p>
      <NuxtLink to="/tests" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
        style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">← Back to all tests</NuxtLink>
    </div>

    <div v-else>
      <!-- ══ HERO ══════════════════════════════════════════════ -->
      <section class="relative overflow-hidden py-14" style="background: linear-gradient(145deg, #060B1A 0%, #0C1630 45%, #1C2D5E 100%);">
        <div class="absolute inset-0 pointer-events-none opacity-5"
          style="background-image: url('/hero-bg.svg'); background-size: cover;" />
        <div class="container-pad relative">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-xs mb-6" style="color: rgba(255,255,255,0.4);">
            <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
            <ChevronRight :size="12" />
            <NuxtLink to="/tests" class="hover:text-white transition-colors">Tests</NuxtLink>
            <ChevronRight :size="12" />
            <span style="color: rgba(255,255,255,0.7);">{{ test.name }}</span>
          </nav>

          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <!-- Left info -->
            <div class="flex-1 max-w-2xl">
              <!-- Badges row -->
              <div class="flex items-center gap-2 mb-4 flex-wrap">
                <span class="px-3 py-1 rounded-lg text-xs font-bold capitalize"
                  style="background: rgba(28,45,94,0.6); color: #9BAED6; border: 1px solid rgba(155,174,214,0.2);">
                  {{ test.category }}
                </span>
                <span v-if="test.isFeatured" class="px-3 py-1 rounded-lg text-xs font-bold"
                  style="background: rgba(245,158,11,0.2); color: #FCD34D; border: 1px solid rgba(245,158,11,0.25);">⭐ Popular</span>
                <span v-if="test.category === 'package'" class="px-3 py-1 rounded-lg text-xs font-bold"
                  style="background: rgba(139,92,246,0.2); color: #C4B5FD; border: 1px solid rgba(139,92,246,0.25);">
                  📦 {{ test.subTests?.length || 0 }} test panels included
                </span>
              </div>

              <h1 class="font-[family-name:var(--font-heading)] font-black text-white mb-3" style="font-size: clamp(1.75rem, 4vw, 3rem);">
                {{ test.name }}
              </h1>

              <!-- Short intro (bold hook) -->
              <p v-if="test.shortIntro" class="text-base font-semibold mb-2" style="color: rgba(255,255,255,0.8);">
                {{ test.shortIntro }}
              </p>
              <p class="leading-relaxed mb-6 text-sm" style="color: rgba(255,255,255,0.55);">{{ test.description }}</p>

              <!-- Quick meta chips -->
              <div class="flex flex-wrap gap-3">
                <span v-if="test.homeCollection" class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style="background: rgba(46,171,49,0.15); color: #65CF68; border: 1px solid rgba(46,171,49,0.2);">
                  <Home :size="12" /> Free Home Collection
                </span>
                <span class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style="background: rgba(59,155,232,0.15); color: #7EC8F8; border: 1px solid rgba(59,155,232,0.2);">
                  <Clock :size="12" /> Report in {{ test.turnaroundTime }}
                </span>
                <span class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1);">
                  <FlaskConical :size="12" /> {{ test.sampleType || 'Blood' }}
                </span>
                <span v-if="test.fastingRequired" class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style="background: rgba(245,158,11,0.15); color: #FCD34D; border: 1px solid rgba(245,158,11,0.2);">
                  <AlertTriangle :size="12" /> Fasting {{ test.fastingHours ? test.fastingHours + 'h' : 'Required' }}
                </span>
                <span class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1);">
                  <FileText :size="12" /> {{ test.reportFormat || 'PDF + Online' }}
                </span>
              </div>
            </div>

            <!-- Price card -->
            <div class="bg-white rounded-3xl p-7 lg:w-72 flex-shrink-0"
              style="box-shadow: 0 24px 64px rgba(0,0,0,0.3);">
              <span v-if="test.discountPercent > 0"
                class="inline-block mb-3 px-3 py-1 rounded-lg text-xs font-bold"
                style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E;">
                {{ test.discountPercent }}% OFF
              </span>
              <p v-if="test.mrp > test.price" class="text-xs text-gray-400 line-through mb-1">MRP ₹{{ test.mrp }}</p>
              <p class="font-[family-name:var(--font-heading)] font-black mb-1"
                style="font-size: 2.75rem; color: #1C2D5E; line-height: 1;">₹{{ test.price }}</p>
              <p class="text-xs text-gray-400 mb-4">Inclusive of all charges</p>

              <!-- Quick info inside card -->
              <div class="space-y-2 mb-5">
                <div v-for="info in quickInfoItems" :key="info.label"
                  class="flex items-center justify-between text-xs py-1.5"
                  style="border-bottom: 1px solid rgba(28,45,94,0.06);">
                  <span class="text-gray-400">{{ info.label }}</span>
                  <span class="font-semibold" style="color: #1C2D5E;">{{ info.value }}</span>
                </div>
              </div>

              <NuxtLink :to="`/contact?test=${encodeURIComponent(test.name)}`"
                class="block w-full text-center py-3.5 rounded-2xl text-sm font-bold text-white mb-3 btn-green-glow"
                style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
                Book This {{ test.category === 'package' ? 'Package' : 'Test' }}
              </NuxtLink>
              <a :href="`tel:${(config.public.labPhone as string).replace(/\s/g,'')}`"
                class="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold transition-all"
                style="background: #F4F9FF; color: #1C2D5E; border: 1.5px solid rgba(28,45,94,0.1);">
                <Phone :size="14" /> {{ config.public.labPhone }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ TABBED DETAIL SECTION ══════════════════════════════ -->
      <section style="background: #F4F9FF;">
        <!-- Tab bar -->
        <div class="border-b bg-white sticky top-[68px] z-20" style="border-color: rgba(28,45,94,0.08);">
          <div class="container-pad">
            <div class="flex overflow-x-auto gap-0 no-scrollbar">
              <button v-for="tab in detailTabs" :key="tab.id"
                @click="activeTab = tab.id"
                class="flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px flex-shrink-0"
                :style="activeTab === tab.id
                  ? 'border-color: #2EAB31; color: #1C2D5E;'
                  : 'border-color: transparent; color: #9CA3AF;'">
                <component :is="tab.icon" :size="14" />
                {{ tab.label }}
                <span v-if="tab.count" class="px-1.5 py-0.5 rounded text-xs font-bold"
                  :style="activeTab === tab.id ? 'background:#EDFAEE;color:#2EAB31;' : 'background:#F3F4F6;color:#9CA3AF;'">
                  {{ tab.count }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="container-pad py-10">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main content -->
            <div class="lg:col-span-2 space-y-6">

              <!-- ── OVERVIEW TAB ── -->
              <div v-show="activeTab === 'overview'">
                <!-- Full details -->
                <div v-if="test.fullDetails" class="card p-6 mb-5">
                  <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <div class="icon-box w-9 h-9 rounded-xl"><BookOpen :size="16" style="color: #2EAB31;" /></div>
                    About This {{ test.category === 'package' ? 'Package' : 'Test' }}
                  </h2>
                  <div class="space-y-3">
                    <p v-for="(para, i) in test.fullDetails.split('\n').filter((p:string) => p.trim())" :key="i"
                      class="text-sm text-gray-600 leading-relaxed">{{ para }}</p>
                  </div>
                </div>

                <!-- Why take this -->
                <div v-if="test.whyTakeThis?.length" class="card p-6 mb-5">
                  <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <div class="icon-box w-9 h-9 rounded-xl"><Users :size="16" style="color: #2EAB31;" /></div>
                    Who Should Take This?
                  </h2>
                  <ul class="space-y-2.5">
                    <li v-for="(reason, i) in test.whyTakeThis" :key="i"
                      class="flex items-start gap-3 text-sm text-gray-700">
                      <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style="background: #EDFAEE;">
                        <CheckCircle :size="12" style="color: #2EAB31;" />
                      </div>
                      {{ reason }}
                    </li>
                  </ul>
                </div>

                <!-- Test info grid -->
                <div class="card p-6">
                  <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg mb-4">Test Information</h2>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div v-for="info in allInfoItems" :key="info.label"
                      class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.06);">
                      <p class="text-xs text-gray-400 mb-1.5">{{ info.label }}</p>
                      <p class="font-[family-name:var(--font-heading)] font-bold text-sm" style="color: #1C2D5E;">{{ info.value }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ── PARAMETERS TAB (simple tests) ── -->
              <div v-show="activeTab === 'parameters'">
                <div class="card p-6">
                  <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
                    <div class="icon-box w-9 h-9 rounded-xl"><ClipboardCheck :size="16" style="color: #2EAB31;" /></div>
                    Parameters ({{ test.parameterCount }})
                  </h2>
                  <div v-if="test.parameters?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div v-for="p in test.parameters" :key="p"
                      class="flex items-center gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-xl"
                      style="background: #F4F9FF;">
                      <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background: #EDFAEE;">
                        <CheckCircle :size="12" style="color: #2EAB31;" />
                      </div>
                      {{ p }}
                    </div>
                  </div>
                  <p v-else class="text-gray-400 text-sm">Parameter list not available.</p>
                </div>
              </div>

              <!-- ── WHAT'S INCLUDED TAB (packages — sub-tests) ── -->
              <div v-show="activeTab === 'included'">
                <div class="space-y-4">
                  <div v-for="(st, i) in test.subTests" :key="st._id || i" class="card overflow-hidden">
                    <!-- Panel header -->
                    <div class="flex items-center gap-4 px-6 py-4" style="background: linear-gradient(90deg, #F4F9FF, #fff);">
                      <div class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                        style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">{{ i + 1 }}</div>
                      <div class="flex-1">
                        <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900">{{ st.name }}</h3>
                        <p class="text-xs text-gray-400 mt-0.5">{{ st.parameterCount }} parameters</p>
                      </div>
                      <button @click="expandedPanels[i] = !expandedPanels[i]"
                        class="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                        style="background: #EEF1F8; color: #1C2D5E;">
                        <ChevronDown :size="14" :style="expandedPanels[i] ? 'transform:rotate(180deg)' : ''" class="transition-transform" />
                      </button>
                    </div>
                    <!-- Parameters -->
                    <div v-show="expandedPanels[i]" class="px-6 pb-5">
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-3" style="border-top: 1px solid rgba(28,45,94,0.06);">
                        <div v-for="p in st.parameters" :key="p"
                          class="flex items-center gap-2 text-sm text-gray-600 py-1 px-2.5 rounded-lg"
                          style="background: #F4F9FF;">
                          <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style="background: #EDFAEE;">
                            <CheckCircle :size="10" style="color: #2EAB31;" />
                          </div>
                          {{ p }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Total parameters summary -->
                  <div class="flex items-center justify-between px-6 py-4 rounded-2xl"
                    style="background: linear-gradient(135deg, #EDFAEE, #D0F2D1); border: 1px solid rgba(46,171,49,0.2);">
                    <div>
                      <p class="font-[family-name:var(--font-heading)] font-black text-lg" style="color: #1C2D5E;">
                        {{ test.parameterCount }} Total Parameters
                      </p>
                      <p class="text-xs" style="color: #2EAB31;">across {{ test.subTests?.length }} test panels</p>
                    </div>
                    <div class="text-3xl">🔬</div>
                  </div>
                </div>
              </div>

              <!-- ── PREPARATION TAB ── -->
              <div v-show="activeTab === 'preparation'">
                <div class="card p-6 space-y-5">
                  <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg flex items-center gap-2">
                    <div class="icon-box w-9 h-9 rounded-xl"><ClipboardList :size="16" style="color: #2EAB31;" /></div>
                    How to Prepare
                  </h2>

                  <!-- Fasting badge -->
                  <div v-if="test.fastingRequired"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style="background: #FEF3C7; border: 1px solid rgba(245,158,11,0.3);">
                    <AlertTriangle :size="18" style="color: #D97706;" />
                    <div>
                      <p class="text-sm font-bold" style="color: #92400E;">Fasting Required</p>
                      <p class="text-xs" style="color: #B45309;">
                        Please fast for {{ test.fastingHours || '8–12' }} hours before sample collection. You may drink plain water.
                      </p>
                    </div>
                  </div>
                  <div v-else class="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style="background: #EDFAEE; border: 1px solid rgba(46,171,49,0.2);">
                    <CheckCircle :size="18" style="color: #2EAB31;" />
                    <p class="text-sm font-semibold" style="color: #166534;">No fasting required for this test.</p>
                  </div>

                  <!-- Preparation instructions -->
                  <div v-if="test.preparation">
                    <h3 class="font-semibold text-gray-800 mb-3 text-sm">Instructions</h3>
                    <div class="space-y-2">
                      <p v-for="(line, i) in test.preparation.split('\n').filter((l:string) => l.trim())" :key="i"
                        class="flex items-start gap-2 text-sm text-gray-600">
                        <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                          style="background: #1C2D5E;">{{ i + 1 }}</span>
                        {{ line }}
                      </p>
                    </div>
                  </div>
                  <p v-else class="text-sm text-gray-400">No special preparation required. Follow normal routine.</p>

                  <!-- General tips -->
                  <div class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.07);">
                    <p class="text-xs font-bold mb-2" style="color: #1C2D5E;">General Tips</p>
                    <ul class="space-y-1.5 text-xs text-gray-500">
                      <!-- <li class="flex items-center gap-2"><CheckCircle :size="10" style="color:#2EAB31;" /> Stay hydrated — drink plenty of water unless fasting</li>
                      <li class="flex items-center gap-2"><CheckCircle :size="10" style="color:#2EAB31;" /> Continue regular medications unless your doctor says otherwise</li> -->
                      <li class="flex items-center gap-2"><CheckCircle :size="10" style="color:#2EAB31;" /> Wear loose clothing for easy access</li>
                      <li class="flex items-center gap-2"><CheckCircle :size="10" style="color:#2EAB31;" /> Inform the phlebotomist of any allergies or conditions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- ── DETAIL TABLE TAB ── -->
              <div v-show="activeTab === 'table'">
                <div class="card overflow-hidden">
                  <div class="p-6 border-b" style="border-color: rgba(28,45,94,0.07);">
                    <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-lg">
                      {{ test.detailTable?.title || 'Reference Table' }}
                    </h2>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead style="background: #F4F9FF; border-bottom: 1px solid rgba(28,45,94,0.07);">
                        <tr>
                          <th v-for="h in test.detailTable?.headers" :key="h"
                            class="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider"
                            style="color: #1C2D5E;">{{ h }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, ri) in test.detailTable?.rows" :key="ri"
                          class="border-t transition-colors"
                          style="border-color: rgba(28,45,94,0.05);"
                          onmouseenter="this.style.background='#F4F9FF'"
                          onmouseleave="this.style.background='transparent'">
                          <td v-for="(cell, ci) in row" :key="ci"
                            class="px-5 py-3.5 text-gray-700"
                            :class="ci === 0 ? 'font-semibold' : ''">{{ cell }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── SIDEBAR ── -->
            <div class="lg:col-span-1 space-y-5">
              <!-- Quick enquiry -->
              <div class="card p-5 sticky top-28">
                <p class="section-label mb-3">Quick Booking</p>
                <h3 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-base mb-4">Send an Enquiry</h3>
                <EnquiryForm :default-test="test.name" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight, ChevronDown, Home, Clock, AlertTriangle, FlaskConical,
  ClipboardCheck, CheckCircle, Phone, FileText, Info, List,
  BookOpen, Users, ClipboardList, Table
} from 'lucide-vue-next'

const route = useRoute()
const { get } = useApi(); const { fetchWithCache } = useCache()
const config = useRuntimeConfig()
const test = ref<any>(null); const loading = ref(true)
const activeTab = ref('overview')
const expandedPanels = ref<Record<number, boolean>>({})

useHead(() => ({ title: test.value ? `${test.value.name} — Vigsan Healthcare Labs` : 'Test Details' }))

// ── Tabs ─────────────────────────────────────────────────────
const detailTabs = computed(() => {
  if (!test.value) return []
  const tabs: any[] = [
    { id: 'overview', label: 'Overview', icon: Info },
  ]
  // Packages → "What's Included" tab; simple tests → "Parameters" tab
  if (test.value.category === 'package' && test.value.subTests?.length) {
    tabs.push({ id: 'included', label: "What's Included", icon: List, count: test.value.subTests.length })
  } else if (test.value.parameters?.length) {
    tabs.push({ id: 'parameters', label: 'Parameters', icon: ClipboardCheck, count: test.value.parameterCount })
  }
  tabs.push({ id: 'preparation', label: 'Preparation', icon: ClipboardList })
  if (test.value.detailTable?.headers?.length) {
    tabs.push({ id: 'table', label: test.value.detailTable.title || 'Reference Table', icon: Table })
  }
  return tabs
})

// ── Info items ────────────────────────────────────────────────
const quickInfoItems = computed(() => test.value ? [
  { label: 'Parameters',   value: `${test.value.parameterCount} tests` },
  { label: 'Report time',  value: test.value.turnaroundTime             },
  { label: 'Sample type',  value: test.value.sampleType || 'Blood'      },
] : [])

const allInfoItems = computed(() => test.value ? [
  { label: 'Fasting',       value: test.value.fastingRequired ? `Yes — ${test.value.fastingHours || '8–10'} hrs` : 'Not required' },
  { label: 'Report Time',   value: test.value.turnaroundTime                                                                       },
  { label: 'Home Pickup',   value: test.value.homeCollection ? 'Available (free)' : 'Lab visit required'                          },
  { label: 'Sample Type',   value: test.value.sampleType || 'Blood'                                                               },
  { label: 'Report Format', value: test.value.reportFormat || 'PDF + Online'                                                      },
  ...(test.value.partnerLab ? [{ label: 'Processed By', value: test.value.partnerLab }] : []),
] : [])

// ── Auto-expand first sub-test panel ─────────────────────────
watch(test, (t) => {
  if (t?.subTests?.length) expandedPanels.value = { 0: true }
})

onMounted(async () => {
  try {
    test.value = await fetchWithCache(`test-${route.params.slug}`, () => get<any>(`/tests/${route.params.slug}`))
  } catch { test.value = null } finally { loading.value = false }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
