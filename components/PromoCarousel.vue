<template>
  <div class="relative overflow-hidden" @mouseenter="pause = true" @mouseleave="pause = false">
    <!-- Track -->
    <div class="flex gap-4 transition-transform duration-500"
      :style="`transform: translateX(calc(-${current * (100 / visibleCount)}% - ${current * 16 / visibleCount}px))`">
      <div v-for="(card, i) in cards" :key="i"
        class="flex-shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer"
        :style="`width: calc(${100 / visibleCount}% - ${16 * (visibleCount - 1) / visibleCount}px); min-height: 180px; background: linear-gradient(135deg, ${card.bg1}, ${card.bg2});`"
        @click="$router.push(card.link)">

        <!-- Pattern overlay -->
        <div class="absolute inset-0 pointer-events-none opacity-8"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 20px 20px;" />
        <!-- Orb -->
        <div class="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none"
          :style="`background: ${card.orb}; opacity: 0.2; filter: blur(20px);`" />

        <div class="relative p-5 h-full flex flex-col justify-between">
          <!-- Top -->
          <div>
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
              :style="`background: ${card.iconBg};`">
              <component :is="card.icon" :size="22" :style="`color: ${card.iconColor};`" />
            </div>
            <h3 class="font-[family-name:var(--font-heading)] font-black text-white leading-tight mb-1"
              style="font-size: 1rem;">{{ card.title }}</h3>
            <p class="text-xs leading-relaxed" style="color: rgba(255,255,255,0.65);">{{ card.sub }}</p>
          </div>
          <!-- Bottom -->
          <div class="flex items-center justify-between mt-4">
            <span v-if="card.badge"
              class="px-2.5 py-1 rounded-lg text-xs font-bold"
              :style="`background: ${card.badgeBg}; color: ${card.badgeColor};`">
              {{ card.badge }}
            </span>
            <span class="text-xs font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
              style="color: rgba(255,255,255,0.7);">
              Learn more <ArrowRight :size="11" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots -->
    <div class="flex justify-center gap-2 mt-5">
      <button v-for="i in dotCount" :key="i"
        @click="current = i - 1"
        class="carousel-dot-navy"
        :class="{ active: current === i - 1 }" />
    </div>

    <!-- Arrows desktop -->
    <button v-if="current > 0" @click="current--"
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hidden md:flex"
      style="color: #1C2D5E; box-shadow: 0 4px 16px rgba(28,45,94,0.15);">
      <ChevronLeft :size="16" />
    </button>
    <button v-if="current < dotCount - 1" @click="current++"
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hidden md:flex"
      style="color: #1C2D5E; box-shadow: 0 4px 16px rgba(28,45,94,0.15);">
      <ChevronRight :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Home, ShieldCheck, BarChart3, Clock, Tag, Heart, Microscope } from 'lucide-vue-next'

const cards = [
  {
    title: 'Book in 60 Seconds', sub: 'Choose your test, enter details, done. No waiting rooms.',
    bg1: '#0C1630', bg2: '#1C2D5E', orb: '#3B9BE8',
    icon: Zap, iconBg: 'rgba(59,155,232,0.2)', iconColor: '#7EC8F8',
    badge: 'Super Fast', badgeBg: 'rgba(59,155,232,0.2)', badgeColor: '#7EC8F8',
    link: '/contact',
  },
  {
    title: 'Free Home Pickup', sub: 'Phlebotomist arrives at your preferred time. Zero travel needed.',
    bg1: '#0A2218', bg2: '#0F3020', orb: '#2EAB31',
    icon: Home, iconBg: 'rgba(46,171,49,0.2)', iconColor: '#6EE27A',
    badge: '₹0 Collection Fee', badgeBg: 'rgba(46,171,49,0.2)', badgeColor: '#6EE27A',
    link: '/contact',
  },
  {
    title: 'Accurate Reports', sub: 'NABL-certified labs. Internationally validated methods. Zero errors.',
    bg1: '#1A0A0A', bg2: '#2A0F0F', orb: '#EF4444',
    icon: ShieldCheck, iconBg: 'rgba(239,68,68,0.2)', iconColor: '#FCA5A5',
    badge: 'NABL Certified', badgeBg: 'rgba(239,68,68,0.15)', badgeColor: '#FCA5A5',
    link: '/about',
  },
  {
    title: 'Results in 6–72h', sub: 'Most reports delivered to your email within one working day.',
    bg1: '#0D0A20', bg2: '#1A1040', orb: '#8B5CF6',
    icon: Clock, iconBg: 'rgba(139,92,246,0.2)', iconColor: '#C4B5FD',
    badge: 'Same Day Possible', badgeBg: 'rgba(139,92,246,0.2)', badgeColor: '#C4B5FD',
    link: '/tests',
  },
  {
    title: 'Save Up to 60%', sub: 'Our prices are significantly lower than walk-in lab MRP rates.',
    bg1: '#1A1000', bg2: '#2A1800', orb: '#F59E0B',
    icon: Tag, iconBg: 'rgba(245,158,11,0.2)', iconColor: '#FCD34D',
    badge: 'Best Price Guarantee', badgeBg: 'rgba(245,158,11,0.2)', badgeColor: '#FCD34D',
    link: '/tests',
  },
  {
    title: '500+ Tests Available', sub: 'From basic CBC to advanced cancer markers — all under one roof.',
    bg1: '#081820', bg2: '#0F2A30', orb: '#06B6D4',
    icon: Microscope, iconBg: 'rgba(6,182,212,0.2)', iconColor: '#67E8F9',
    badge: 'Comprehensive', badgeBg: 'rgba(6,182,212,0.2)', badgeColor: '#67E8F9',
    link: '/tests',
  },
  {
    title: 'Heart Health Check', sub: 'Lipid profile + cardiac markers. Know your heart risk in one draw.',
    bg1: '#1A0818', bg2: '#2A0F20', orb: '#EC4899',
    icon: Heart, iconBg: 'rgba(236,72,153,0.2)', iconColor: '#F9A8D4',
    badge: '@ ₹599*', badgeBg: 'rgba(236,72,153,0.2)', badgeColor: '#F9A8D4',
    link: '/tests?category=cardiac',
  },
  {
    title: 'Online Report Access', sub: 'Downloadable PDF reports — share with your doctor instantly.',
    bg1: '#0A1818', bg2: '#0F2820', orb: '#10B981',
    icon: BarChart3, iconBg: 'rgba(16,185,129,0.2)', iconColor: '#6EE7B7',
    badge: 'PDF + Email', badgeBg: 'rgba(16,185,129,0.2)', badgeColor: '#6EE7B7',
    link: '/contact',
  },
]

const current = ref(0)
const pause = ref(false)
const visibleCount = ref(3)
const dotCount = computed(() => Math.ceil(cards.length / visibleCount.value))

const updateVisible = () => {
  visibleCount.value = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  updateVisible()
  window.addEventListener('resize', updateVisible)
  timer = setInterval(() => {
    if (!pause.value) current.value = (current.value + 1) % dotCount.value
  }, 3500)
})
onUnmounted(() => { clearInterval(timer); window.removeEventListener('resize', updateVisible) })
</script>
