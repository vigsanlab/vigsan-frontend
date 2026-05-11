<template>
  <div>
    <section class="relative overflow-hidden hero-bg py-20">
      <div class="dot-grid absolute inset-0 pointer-events-none" />
      <div class="container-pad relative">
        <p class="section-label mb-4" style="color: #65CF68;">Updates & Offers</p>
        <h1 class="font-[family-name:var(--font-heading)] font-black text-white mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem);">Gallery</h1>
        <p class="text-lg max-w-lg" style="color: rgba(255,255,255,0.6);">Latest offers, price lists and updates from our lab.</p>
      </div>
    </section>

    <section class="section-pad" style="background: #F4F9FF;">
      <div class="container-pad">
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="skeleton h-64" />
        </div>
        <div v-else-if="images.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div v-for="img in images" :key="img._id"
            @click="lightboxImg = img"
            class="card cursor-pointer group">
            <div class="relative overflow-hidden bg-gray-100" style="padding-top: 66%;">
              <img :src="`${apiBase}/images/${img._id}/file`" :alt="img.caption || 'Lab image'"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy" />
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style="background: rgba(28,45,94,0.5);">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn :size="22" color="white" />
                </div>
              </div>
            </div>
            <div class="p-4 bg-white">
              <p class="text-sm font-semibold text-gray-800 truncate" style="font-family: var(--font-heading);">{{ img.caption || 'Lab update' }}</p>
              <p class="text-xs mt-1" style="color: #9BAED6;">{{ formatDate(img.createdAt) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-24">
          <div class="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
            style="background: linear-gradient(135deg, #EEF1F8, #CDD5EB);">
            <Images :size="36" style="color: #6987C1;" />
          </div>
          <p class="font-[family-name:var(--font-heading)] font-bold text-gray-400 text-lg">No gallery images yet</p>
          <p class="text-sm text-gray-400 mt-1">Check back soon for updates!</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxImg"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="background: rgba(6,11,26,0.92); backdrop-filter: blur(8px);"
          @click.self="lightboxImg = null">
          <div class="max-w-4xl w-full">
            <img :src="`${apiBase}/images/${lightboxImg._id}/file`" :alt="lightboxImg.caption"
              class="w-full h-auto max-h-[78vh] object-contain rounded-2xl"
              style="box-shadow: 0 40px 80px rgba(0,0,0,0.6);" />
            <div class="flex items-center justify-between mt-5">
              <p class="text-white text-sm font-medium">{{ lightboxImg.caption }}</p>
              <button @click="lightboxImg = null"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">
                <X :size="18" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Images, X, ZoomIn } from 'lucide-vue-next'
useHead({ title: 'Gallery — Vigsan Healthcare Labs' })
const { get, base: apiBase } = useApi(); const { fetchWithCache } = useCache()
const images = ref<any[]>([]); const loading = ref(true); const lightboxImg = ref<any>(null)
const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
onMounted(async () => {
  try { images.value = await fetchWithCache('gallery-images', () => get<any[]>('/images'), 2 * 60 * 1000) }
  catch (e) { console.error(e) } finally { loading.value = false }
})
</script>
