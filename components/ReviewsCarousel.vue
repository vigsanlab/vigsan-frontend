<template>
  <section class="section-pad" style="background: linear-gradient(160deg, #EEF1F8 0%, #F4F9FF 100%);">
    <div class="container-pad">

      <!-- Header -->
      <div class="text-center mb-12 reveal">
        <p class="section-label mb-3 justify-center">Patient Stories</p>
        <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
          What Our Patients Say
        </h2>
        <p class="mt-3 text-gray-500 text-sm max-w-md mx-auto">Real experiences from real patients across Pune</p>
      </div>

      <!-- Carousel -->
      <div class="relative overflow-hidden reveal"
        @mouseenter="pause = true" @mouseleave="pause = false">
        <div class="flex gap-6 transition-transform duration-500"
          :style="`transform: translateX(calc(-${current * (100 / visibleCount)}% - ${current * 24 / visibleCount}px))`">
          <div v-for="(r, i) in reviews" :key="i"
            class="testimonial-card flex-shrink-0"
            :style="`width: calc(${100 / visibleCount}% - ${24 * (visibleCount - 1) / visibleCount}px);`">
            <!-- Stars -->
            <div class="flex gap-1 mb-3">
              <Star v-for="s in 5" :key="s" :size="14" fill="#F59E0B" style="color: #F59E0B;" />
            </div>
            <!-- Quote mark -->
            <div class="text-4xl leading-none mb-2 font-serif" style="color: rgba(28,45,94,0.12);">"</div>
            <!-- Text -->
            <p class="text-sm text-gray-600 leading-relaxed mb-4 italic">{{ r.text }}</p>
            <!-- Footer -->
            <div class="flex items-center justify-between pt-3.5" style="border-top: 1px solid rgba(28,45,94,0.07);">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                  :style="`background: linear-gradient(135deg, ${r.c1}, ${r.c2});`">
                  {{ r.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-[family-name:var(--font-heading)] font-bold text-sm" style="color: #1C2D5E;">{{ r.name }}</p>
                  <p class="text-xs text-gray-400">{{ r.location }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="px-2.5 py-0.5 rounded-lg text-xs font-bold mb-1" style="background: #EDFAEE; color: #2EAB31;">✓ Verified</div>
                <p class="text-xs text-gray-400">{{ r.test }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <button v-if="current > 0" @click="current--"
          class="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-white shadow-lg items-center justify-center transition-all hidden md:flex"
          style="color: #1C2D5E; box-shadow: 0 4px 16px rgba(28,45,94,0.15);">
          <ChevronLeft :size="16" />
        </button>
        <button v-if="current < dotCount - 1" @click="current++"
          class="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-white shadow-lg items-center justify-center transition-all hidden md:flex"
          style="color: #1C2D5E; box-shadow: 0 4px 16px rgba(28,45,94,0.15);">
          <ChevronRight :size="16" />
        </button>
      </div>

      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-6">
        <button v-for="i in dotCount" :key="i"
          @click="current = i - 1"
          class="carousel-dot-navy"
          :class="{ active: current === i - 1 }" />
      </div>

      <!-- Rating summary bar -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4 reveal">
        <div class="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white"
          style="border: 1px solid rgba(28,45,94,0.08); box-shadow: 0 2px 12px rgba(28,45,94,0.06);">
          <div class="text-center">
            <p class="font-[family-name:var(--font-heading)] font-black text-4xl leading-none" style="color: #1C2D5E;">4.9</p>
            <div class="flex gap-0.5 mt-1 justify-center">
              <Star v-for="s in 5" :key="s" :size="11" fill="#F59E0B" style="color: #F59E0B;" />
            </div>
          </div>
          <div class="border-l pl-4" style="border-color: rgba(28,45,94,0.1);">
            <p class="text-sm font-bold text-gray-800">200+ Reviews</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs px-2 py-0.5 rounded-lg font-semibold" style="background: #EDFAEE; color: #2EAB31;">Google</span>
              <span class="text-xs px-2 py-0.5 rounded-lg font-semibold" style="background: #EEF1F8; color: #1C2D5E;">Practo</span>
              <span class="text-xs px-2 py-0.5 rounded-lg font-semibold" style="background: #FEF3C7; color: #D97706;">Justdial</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3 flex-wrap">
          <div v-for="bar in ratingBars" :key="bar.pct"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white"
            style="border: 1px solid rgba(28,45,94,0.07);">
            <div class="flex gap-0.5">
              <Star v-for="s in bar.stars" :key="s" :size="10" fill="#F59E0B" style="color:#F59E0B;" />
              <Star v-for="s in (5 - bar.stars)" :key="`e${s}`" :size="10" style="color:#E5E7EB;" />
            </div>
            <div class="w-20 h-1.5 rounded-full overflow-hidden" style="background: #F3F4F6;">
              <div class="h-full rounded-full" :style="`width: ${bar.pct}%; background: #F59E0B;`" />
            </div>
            <span class="text-xs font-semibold text-gray-500">{{ bar.pct }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const reviews = [
  { name: 'Priya Sharma',    location: 'Kothrud, Pune',   test: 'Full Body Checkup',  c1: '#1C2D5E', c2: '#2A4E9A',
    text: 'The phlebotomist arrived right on time at 7 AM. Reports were in my inbox by evening. Incredibly smooth — will definitely book again.' },
  { name: 'Rahul Deshmukh',  location: 'Baner, Pune',     test: 'Thyroid Profile',    c1: '#2EAB31', c2: '#239126',
    text: 'Prices are almost 50% less than my local lab. Same NABL quality, much more convenient. Vigsan is now my go-to for all tests.' },
  { name: 'Anjali Kulkarni', location: 'Hinjewadi, Pune', test: 'Diabetes Panel',     c1: '#1566B5', c2: '#3B9BE8',
    text: 'My elderly mother cannot travel easily. Vigsan\'s home collection is a blessing. Staff was very polite and professional.' },
  { name: 'Suresh Patil',    location: 'Wakad, Pune',     test: 'Vitamin D & B12',    c1: '#7C3AED', c2: '#8B5CF6',
    text: 'Booked at 9 PM, pickup was at 7 AM next morning. Report by noon. This is the kind of service healthcare should always be.' },
  { name: 'Meera Joshi',     location: 'Aundh, Pune',     test: 'Lipid Profile',      c1: '#D97706', c2: '#F59E0B',
    text: 'Easy online booking, friendly staff, accurate results. Saved a lot compared to walking into a diagnostic centre. 5 stars!' },
  { name: 'Amit Bhosale',    location: 'Pimpri, Pune',    test: 'CBC + LFT + KFT',    c1: '#0F766E', c2: '#14B8A6',
    text: 'Booked a comprehensive panel for my father. Three tests in one visit, all reports on email within 24 hours. Outstanding.' },
]

const ratingBars = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 13 },
  { stars: 3, pct: 4  },
]

const current = ref(0)
const pause = ref(false)
const visibleCount = ref(3)
const dotCount = computed(() => Math.max(1, reviews.length - visibleCount.value + 1))

const updateVisible = () => {
  visibleCount.value = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  updateVisible()
  window.addEventListener('resize', updateVisible)
  timer = setInterval(() => {
    if (!pause.value) current.value = (current.value + 1) % dotCount.value
  }, 4000)
})
onUnmounted(() => { clearInterval(timer); window.removeEventListener('resize', updateVisible) })
</script>
