<template>
  <div>
    <section class="relative overflow-hidden hero-bg py-20">
      <div class="dot-grid absolute inset-0 pointer-events-none" />
      <div class="container-pad relative">
        <p class="section-label mb-4" style="color: #65CF68;">Catalogue</p>
        <h1 class="font-[family-name:var(--font-heading)] font-black text-white mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem);">
          Tests &amp; Packages
        </h1>
        <p class="text-lg max-w-lg" style="color: rgba(255,255,255,0.6);">Browse our full range — processed by NABL-certified partner labs.</p>
      </div>
    </section>

    <section class="section-pad" style="background: #F4F9FF;">
      <div class="container-pad">
        <!-- Search + filters -->
        <div class="mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div class="relative flex-1 max-w-md">
            <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2" style="color: #9BAED6;" />
            <input
              v-model="searchQuery"
              placeholder="Search tests, packages, symptoms…"
              class="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
              style="background: #fff; border: 1.5px solid rgba(28,45,94,0.1); color: #111827; font-family: var(--font-body);"
              onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.boxShadow='0 0 0 3px rgba(46,171,49,0.1)'"
              onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.boxShadow='none'"
            />
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="cat in categories" :key="cat.value"
              @click="setCategory(cat.value)"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              :style="activeCategory === cat.value
                ? 'background: linear-gradient(135deg, #1C2D5E, #2A4E9A); color: #fff; box-shadow: 0 4px 14px rgba(28,45,94,0.25);'
                : 'background: #fff; color: #6B7280; border: 1.5px solid rgba(28,45,94,0.1);'"
            >{{ cat.label }}</button>
          </div>
        </div>

        <p class="text-sm text-gray-500 mb-7 font-medium" v-if="!loading">
          Showing <span class="font-bold" style="color: #1C2D5E;">{{ filteredTests.length }}</span> tests
          <span v-if="activeCategory !== 'all'"> in <span class="font-bold capitalize" style="color: #2EAB31;">{{ activeCategory }}</span></span>
        </p>

        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="i in 8" :key="i" class="skeleton h-64" />
        </div>
        <div v-else-if="filteredTests.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <TestCard v-for="test in filteredTests" :key="test._id" :test="test" />
        </div>
        <div v-else class="text-center py-20">
          <Frown :size="52" class="mx-auto mb-4" style="color: #CDD5EB;" />
          <p class="font-[family-name:var(--font-heading)] font-semibold text-gray-400 mb-1">No tests found</p>
          <p class="text-sm text-gray-400 mb-5">Try a different search term or category</p>
          <button @click="resetFilters"
            class="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style="background: linear-gradient(135deg, #2EAB31, #239126);">
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, Frown } from 'lucide-vue-next'
useHead({ title: 'All Tests & Packages — Vigsan Healthcare Labs' })
const route = useRoute(); const router = useRouter()
const { get } = useApi(); const { fetchWithCache } = useCache()
const allTests = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const activeCategory = ref((route.query.category as string) || 'all')
const categories = [
  { value: 'all',      label: 'All'      },
  { value: 'blood',    label: 'Blood'    },
  { value: 'thyroid',  label: 'Thyroid'  },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'liver',    label: 'Liver'    },
  { value: 'kidney',   label: 'Kidney'   },
  { value: 'vitamins', label: 'Vitamins' },
  { value: 'cardiac',  label: 'Cardiac'  },
  { value: 'package',  label: 'Packages' },
]
const filteredTests = computed(() => {
  let list = allTests.value
  if (activeCategory.value !== 'all') list = list.filter(t => t.category === activeCategory.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.includes(q))
  }
  return list
})
const setCategory = (val: string) => { activeCategory.value = val; router.replace({ query: val !== 'all' ? { category: val } : {} }) }
const resetFilters = () => { searchQuery.value = ''; activeCategory.value = 'all'; router.replace({ query: {} }) }
onMounted(async () => {
  try { allTests.value = await fetchWithCache('all-tests', () => get<any[]>('/tests')) }
  catch (e) { console.error(e) } finally { loading.value = false }
})
</script>
