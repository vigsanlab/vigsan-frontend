<template>
  <div class="relative overflow-hidden w-full" style="height: 220px; background: #0C1630;"
    @mouseenter="pause = true" @mouseleave="pause = false">

    <!-- Slides -->
    <div v-for="(slide, i) in slides" :key="i"
      class="banner-slide absolute inset-0"
      :class="i === current ? 'active' : i === prev ? 'exit-left' : 'enter-right'"
      :style="`background: linear-gradient(135deg, ${slide.bg1} 0%, ${slide.bg2} 100%);`">

      <!-- Background pattern -->
      <div class="absolute inset-0 pointer-events-none opacity-5"
        style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 22px 22px;" />
      <!-- Glow orb -->
      <div class="absolute right-0 top-0 w-72 h-72 rounded-full pointer-events-none"
        :style="`background: radial-gradient(circle, ${slide.orb} 0%, transparent 70%); opacity: 0.25; transform: translate(25%, -25%); filter: blur(30px);`" />

      <div class="container-pad h-full flex items-center justify-between gap-6">
        <!-- Text side -->
        <div class="flex-1 min-w-0">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
            :style="`background: ${slide.tagBg}; color: ${slide.tagColor};`">
            <component :is="slide.tagIcon" :size="11" />
            {{ slide.tag }}
          </div>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-white leading-tight mb-2"
            style="font-size: clamp(1.3rem, 3vw, 2rem);">
            {{ slide.title }}
          </h2>
          <p class="text-sm mb-4 max-w-sm" style="color: rgba(255,255,255,0.7);">{{ slide.sub }}</p>
          <NuxtLink :to="slide.link"
            class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            :style="`background: ${slide.btnBg}; box-shadow: 0 4px 16px ${slide.btnShadow};`">
            {{ slide.btn }} <ArrowRight :size="13" />
          </NuxtLink>
        </div>

        <!-- Illustration side -->
        <div class="hidden sm:flex flex-shrink-0 items-center justify-center w-48 h-48 relative">
          <div class="absolute inset-0 rounded-3xl opacity-20" :style="`background: ${slide.orb};`" />
          <component :is="slide.illustration" :size="90" :style="`color: ${slide.illColor}; opacity: 0.85;`" />
        </div>
      </div>
    </div>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      <button v-for="(_, i) in slides" :key="i"
        @click="goTo(i)"
        class="carousel-dot"
        :class="{ active: i === current }" />
    </div>

    <!-- Arrows -->
    <button @click="prev_slide"
      class="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
      style="background: rgba(255,255,255,0.1); color: white;"
      onmouseenter="this.style.background='rgba(255,255,255,0.25)'"
      onmouseleave="this.style.background='rgba(255,255,255,0.1)'">
      <ChevronLeft :size="16" />
    </button>
    <button @click="next_slide"
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
      style="background: rgba(255,255,255,0.1); color: white;"
      onmouseenter="this.style.background='rgba(255,255,255,0.25)'"
      onmouseleave="this.style.background='rgba(255,255,255,0.1)'">
      <ChevronRight :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ChevronLeft, ChevronRight, Tag, Home, Zap, Shield, Gift, FlaskConical } from 'lucide-vue-next'

const slides = [
  {
    tag: 'Limited Offer', tagIcon: Tag, tagBg: 'rgba(245,158,11,0.25)', tagColor: '#FCD34D',
    title: 'Full Body Checkup @ ₹799*', sub: '77 parameters · Free home collection · Reports in 24 hrs',
    bg1: '#0C1630', bg2: '#1C2D5E', orb: '#3B9BE8',
    btn: 'Book Now', btnBg: 'linear-gradient(135deg, #2EAB31, #239126)', btnShadow: 'rgba(46,171,49,0.4)',
    link: '/tests?category=package', tagColor2: '#FCD34D',
    illustration: FlaskConical, illColor: '#7EC8F8',
  },
  {
    tag: 'Free Service', tagIcon: Home, tagBg: 'rgba(46,171,49,0.2)', tagColor: '#6EE27A',
    title: 'Free Home Sample Collection', sub: 'Trained phlebotomists at your doorstep — morning slots available',
    bg1: '#0A2218', bg2: '#0D3320', orb: '#2EAB31',
    btn: 'Schedule Pickup', btnBg: 'linear-gradient(135deg, #2EAB31, #1A8F1D)', btnShadow: 'rgba(46,171,49,0.4)',
    link: '/contact',
    illustration: Home, illColor: '#3EBD41',
  },
  {
    tag: 'Fast Results', tagIcon: Zap, tagBg: 'rgba(59,155,232,0.2)', tagColor: '#7EC8F8',
    title: 'Thyroid Test @ ₹299*', sub: 'TSH + T3 + T4 · NABL certified · Digital report same day',
    bg1: '#080F25', bg2: '#102040', orb: '#3B9BE8',
    btn: 'Book Thyroid Test', btnBg: 'linear-gradient(135deg, #1566B5, #3B9BE8)', btnShadow: 'rgba(59,155,232,0.4)',
    link: '/tests?category=thyroid',
    illustration: Zap, illColor: '#3B9BE8',
  },
  {
    tag: 'NABL Certified', tagIcon: Shield, tagBg: 'rgba(139,92,246,0.2)', tagColor: '#C4B5FD',
    title: 'Diabetes Panel @ ₹349*', sub: 'HbA1c + Fasting Glucose + Insulin · Know your risk today',
    bg1: '#0D0A20', bg2: '#1A1040', orb: '#8B5CF6',
    btn: 'Check Diabetes Risk', btnBg: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', btnShadow: 'rgba(139,92,246,0.4)',
    link: '/tests?category=diabetes',
    illustration: Shield, illColor: '#A78BFA',
  },
  {
    tag: 'New Package', tagIcon: Gift, tagBg: 'rgba(245,158,11,0.2)', tagColor: '#FCD34D',
    title: 'Vitamin Deficiency Panel @ ₹499*', sub: 'Vitamin D + B12 + Iron + Calcium · 4 tests in one draw',
    bg1: '#1A1000', bg2: '#2A1A00', orb: '#F59E0B',
    btn: 'Book Panel', btnBg: 'linear-gradient(135deg, #D97706, #F59E0B)', btnShadow: 'rgba(245,158,11,0.4)',
    link: '/tests?category=vitamins',
    illustration: Gift, illColor: '#FCD34D',
  },
]

const current = ref(0)
const prev = ref<number | null>(null)
const pause = ref(false)

const goTo = (i: number) => { prev.value = current.value; current.value = i }
const next_slide = () => goTo((current.value + 1) % slides.length)
const prev_slide = () => goTo((current.value - 1 + slides.length) % slides.length)

let timer: ReturnType<typeof setInterval>
onMounted(() => { timer = setInterval(() => { if (!pause.value) next_slide() }, 4500) })
onUnmounted(() => clearInterval(timer))
</script>
