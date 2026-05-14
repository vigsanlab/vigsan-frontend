<template>
  <div>
    <!-- ══ PREMIUM HERO BANNER ════════════════════════════════════════ -->
    <section
      class="relative overflow-hidden"
      style="min-height: 92vh; display: flex; flex-direction: column; justify-content: center; background: #060B1A;"
    >
      <!-- Layered background -->
      <div class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse 80% 70% at 10% 50%, rgba(255,107,0,0.07) 0%, transparent 65%),
               radial-gradient(ellipse 60% 60% at 90% 20%, rgba(28,45,94,0.5) 0%, transparent 70%),
               radial-gradient(ellipse 50% 80% at 80% 80%, rgba(255,107,0,0.04) 0%, transparent 60%);"/>
      <!-- Subtle dot mesh -->
      <div class="absolute inset-0 pointer-events-none opacity-30"
        style="background-image: radial-gradient(circle, rgba(255,107,0,0.15) 1px, transparent 1px); background-size: 28px 28px;"/>
      <!-- Top saffron accent line -->
      <div class="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style="background: linear-gradient(90deg, transparent 0%, #FF6B00 30%, #FFB300 55%, #FF6B00 75%, transparent 100%); opacity: 0.7;"/>
      <!-- Saffron left glow strip -->
      <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none"
        style="background: linear-gradient(180deg, transparent, rgba(255,107,0,0.6) 30%, rgba(255,178,0,0.8) 55%, rgba(255,107,0,0.6) 75%, transparent); filter: blur(1px);"/>

      <div class="container-pad relative py-16 md:py-20 flex-1 flex items-center">
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <!-- ── LEFT: Text content ── -->
          <div class="relative z-10">
            <!-- Saffron live pill -->
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7 text-xs font-bold"
              style="background: rgba(255,107,0,0.1); border: 1px solid rgba(255,107,0,0.35); color: #FF9500; letter-spacing: 0.04em;">
              <span class="relative flex h-2.5 w-2.5">
                <span class="ping-slow absolute inline-flex h-full w-full rounded-full" style="background: #FF6B00;"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5" style="background: #FF6B00;"></span>
              </span>
              Serving Pune &amp; surrounding areas
            </div>

            <!-- Main headline -->
            <h1 class="font-[family-name:var(--font-heading)] font-black text-white leading-tight mb-5"
              style="font-size: clamp(2.4rem, 5.5vw, 4.2rem);">
              Trusted<br/>
              <span style="background: linear-gradient(135deg, #FF6B00 0%, #FFB300 50%, #FF8C00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Diagnostics
              </span>
              <br/>At Your Doorstep
            </h1>

            <p class="text-base md:text-lg leading-relaxed mb-4 max-w-lg" style="color: rgba(255,255,255,0.6);">
              Certified partner labs. <span style="color: rgba(255,149,0,0.85); font-weight: 600;">Free home sample collection.</span><br class="hidden md:block" />
              Accurate results delivered online — within 24 hours.
            </p>

            <!-- Feature pills -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span v-for="pill in heroPills" :key="pill"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style="background: rgba(255,107,0,0.08); border: 1px solid rgba(255,107,0,0.22); color: rgba(255,200,100,0.9);">
                <span style="color: #FF9500;">●</span> {{ pill }}
              </span>
            </div>

            <!-- CTA row -->
            <div class="flex flex-col sm:flex-row gap-4 mb-10">
              <NuxtLink to="/tests"
                class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all"
                style="background: linear-gradient(135deg, #FF6B00, #FF9500); box-shadow: 0 6px 28px rgba(255,107,0,0.4); font-family: var(--font-heading);"
                onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 36px rgba(255,107,0,0.55)'"
                onmouseleave="this.style.transform=''; this.style.boxShadow='0 6px 28px rgba(255,107,0,0.4)'">
                View All Tests <ArrowRight :size="16" />
              </NuxtLink>
              <NuxtLink to="/contact"
                class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all"
                style="background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,107,0,0.3); backdrop-filter: blur(8px);"
                onmouseenter="this.style.background='rgba(255,107,0,0.12)'; this.style.borderColor='rgba(255,107,0,0.55)'"
                onmouseleave="this.style.background='rgba(255,255,255,0.06)'; this.style.borderColor='rgba(255,107,0,0.3)'">
                Enquire Now
              </NuxtLink>
            </div>

            <!-- Partner strip -->
            <div class="flex items-center gap-4 flex-wrap">
              <p class="text-xs font-semibold uppercase tracking-wider" style="color: rgba(255,255,255,0.25);">Processed by</p>
              <div class="flex gap-3 flex-wrap">
                <span v-for="lab in ['Thyrocare', 'Metropolis']" :key="lab"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style="background: rgba(255,107,0,0.07); color: rgba(255,178,100,0.7); border: 1px solid rgba(255,107,0,0.18);">
                  {{ lab }}
                </span>
              </div>
            </div>
          </div>

          <!-- ── RIGHT: Carousel ── -->
          <div class="relative flex items-center justify-center lg:justify-end">
            <div class="absolute pointer-events-none"
              style="width: 500px; height: 420px; background: radial-gradient(ellipse, rgba(255,107,0,0.12) 0%, transparent 70%); filter: blur(30px);"/>

            <div class="relative overflow-hidden rounded-3xl w-full max-w-lg"
              style="height: 390px; border: 1px solid rgba(255,107,0,0.2); box-shadow: 0 0 60px rgba(255,107,0,0.1), 0 24px 60px rgba(0,0,0,0.5);"
              @mouseenter="carouselPause = true"
              @mouseleave="carouselPause = false"
              @touchstart="onTouchStart"
              @touchend="onTouchEnd">

              <!-- Slides -->
              <div v-for="(slide, i) in heroSlides" :key="i"
                class="hero-slide absolute inset-0"
                :class="i === heroCurrentSlide ? 'slide-active' : (i === heroPrevSlide ? 'slide-exit' : 'slide-hidden')">
                <div class="absolute inset-0" :style="`background: ${slide.bg};`"/>
                <!-- <img :src="slide.image" :alt="slide.title"
                  class="absolute inset-0 w-full h-full object-cover" style="opacity: 0.95;"/> -->
                  <img
                    :src="isMobile ? slide.mobileImage : slide.image"
                    :alt="slide.title"
                    class="absolute inset-0 w-full h-full object-cover"
                    style="opacity: 0.95;"
                  />
                <!-- Bottom overlay title -->
                <div class="absolute bottom-0 left-0 right-0 px-6 py-5"
                  style="background: linear-gradient(0deg, rgba(6,11,26,0.92) 0%, rgba(6,11,26,0.6) 60%, transparent 100%);">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2"
                    :style="`background: ${slide.tagBg}; color: ${slide.tagColor}; border: 1px solid ${slide.tagBorder};`">
                    <span>{{ slide.tagIcon }}</span> {{ slide.tag }}
                  </div>
                  <h3 class="font-[family-name:var(--font-heading)] font-black text-white leading-tight mb-1"
                    style="font-size: clamp(1.1rem, 2.5vw, 1.45rem);">
                    {{ slide.title }}
                  </h3>
                  <p class="text-sm" style="color: rgba(255,255,255,0.6);">{{ slide.sub }}</p>
                </div>
              </div>

              <!-- Arrows -->
              <button @click="heroPrev"
                class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,107,0,0.3); color: white; backdrop-filter: blur(4px);"
                onmouseenter="this.style.background='rgba(255,107,0,0.3)'"
                onmouseleave="this.style.background='rgba(0,0,0,0.5)'">
                <ChevronLeft :size="16" />
              </button>
              <button @click="heroNext"
                class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,107,0,0.3); color: white; backdrop-filter: blur(4px);"
                onmouseenter="this.style.background='rgba(255,107,0,0.3)'"
                onmouseleave="this.style.background='rgba(0,0,0,0.5)'">
                <ChevronRight :size="16" />
              </button>

              <!-- Vertical dot indicators -->
              <div class="absolute bottom-16 right-4 flex flex-col gap-1.5 z-20">
                <button v-for="(_, i) in heroSlides" :key="i" @click="heroGoTo(i)"
                  class="transition-all rounded-full"
                  :style="i === heroCurrentSlide
                    ? 'width:6px;height:24px;background:linear-gradient(180deg,#FF6B00,#FFB300);'
                    : 'width:6px;height:6px;background:rgba(255,107,0,0.35);'" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div ref="statsRef" style="background: rgba(0,0,0,0.35); border-top: 1px solid rgba(255,107,0,0.12); backdrop-filter: blur(12px);">
        <div class="container-pad py-5">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(stat, i) in stats" :key="stat.label" class="stat-pill">
              <p class="stat-number" style="background: linear-gradient(135deg, #FF8C00, #FFB300); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                <template v-if="stat.static"><span>{{ stat.staticValue }}</span></template>
                <template v-else>
                  <span>{{ stat.prefix }}</span>
                  <span>{{ (displayValues[i] as number).toLocaleString('en-IN') }}</span>
                  <span>{{ stat.suffix }}</span>
                </template>
              </p>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ HERO BANNER CAROUSEL ══════════════════════════════════════ -->
    <HeroBannerCarousel />

    <!-- ══ PROMO CARDS CAROUSEL ══════════════════════════════════════ -->
    <section class="section-pad bg-white">
      <div class="container-pad">
        <div class="flex items-end justify-between mb-8 reveal">
          <div>
            <p class="section-label mb-3">Why Vigsan</p>
            <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.5rem, 3vw, 2.25rem);">
              Everything you need from a lab
            </h2>
          </div>
        </div>
        <PromoCarousel />
      </div>
    </section>

    <!-- ══ TEST MARQUEE TICKER ════════════════════════════════════════ -->
    <div class="overflow-hidden py-3 border-y" style="background: #0C1630; border-color: rgba(255,107,0,0.12);">
      <div class="marquee-track">
        <span v-for="test in [...tickerTests, ...tickerTests]" :key="Math.random()"
          class="inline-flex items-center gap-2 mx-6 text-xs font-semibold whitespace-nowrap"
          style="color: rgba(255,255,255,0.5);">
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #FF7A00;"></span>
          {{ test }}
        </span>
      </div>
    </div>

    <!-- ══ TRUST CHIPS ════════════════════════════════════════════════ -->
    <section class="bg-white border-b" style="border-color: rgba(28,45,94,0.08);">
      <div class="container-pad py-7">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(badge, i) in trustBadges" :key="badge.title"
            class="trust-chip reveal" :class="`reveal-delay-${i+1}`">
            <div class="icon-box">
              <component :is="badge.icon" :size="20" style="color: #FF7A00;" />
            </div>
            <div>
              <p class="font-[family-name:var(--font-heading)] font-bold text-sm leading-tight" style="color: #1C2D5E;">{{ badge.title }}</p>
              <p class="text-xs mt-0.5" style="color: #6B7280;">{{ badge.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FEATURED TESTS ════════════════════════════════════════════ -->
    <section class="section-pad" style="background: #F4F9FF;">
      <div class="container-pad">
        <div class="flex items-end justify-between mb-12 reveal">
          <div>
            <p class="section-label mb-3">Most Booked</p>
            <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
              Popular Tests
            </h2>
          </div>
          <NuxtLink to="/tests"
            class="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style="color: #1C2D5E;">
            View all <ArrowRight :size="14" />
          </NuxtLink>
        </div>
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="skeleton h-64" />
        </div>
        <div v-else-if="featuredTests.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <TestCard v-for="test in featuredTests" :key="test._id" :test="test" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">No tests available yet.</div>
      </div>
    </section>

    <!-- ══ HEALTH PACKAGES ════════════════════════════════════════════ -->
    <section class="section-pad bg-white">
      <div class="container-pad">
        <div class="flex items-end justify-between mb-12 reveal">
          <div>
            <p class="section-label mb-3">Best Value</p>
            <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
              Health Packages
            </h2>
          </div>
          <NuxtLink to="/tests?category=package"
            class="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style="color: #1C2D5E;">
            All packages <ArrowRight :size="14" />
          </NuxtLink>
        </div>
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="i in 3" :key="i" class="skeleton h-52" />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="(pkg, i) in packages" :key="pkg._id" class="reveal" :class="`reveal-delay-${i+1}`">
            <TestCard :test="pkg" />
          </div>
        </div>
      </div>
    </section>

    <!-- ══ HOW IT WORKS ════════════════════════════════════════════════ -->
    <section class="section-pad" style="background: linear-gradient(160deg, #EEF1F8 0%, #F4F9FF 100%);">
      <div class="container-pad">
        <div class="text-center mb-16 reveal">
          <p class="section-label mb-3 justify-center">Simple Process</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
            How It Works
          </h2>
          <p class="mt-3 text-gray-500 max-w-lg mx-auto text-sm">From booking to your doorstep in four simple steps</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, i) in howItWorks" :key="i"
            class="relative text-center reveal" :class="`reveal-delay-${i+1}`">
            <div v-if="i < 3" class="step-line hidden md:block" />
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 relative"
              style="background: linear-gradient(135deg, #FF6B00, #FF9500); box-shadow: 0 8px 28px rgba(255,107,0,0.32);">
              <component :is="step.icon" :size="26" color="white" />
              <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A); font-family: var(--font-heading);">{{ i + 1 }}</div>
            </div>
            <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ WHY VIGSAN ════════════════════════════════════════════════ -->
    <section class="section-pad bg-white">
      <div class="container-pad">
        <div class="text-center mb-14 reveal">
          <p class="section-label mb-3 justify-center">Why Choose Us</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
            The Vigsan Difference
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="(feat, i) in features" :key="feat.title"
            class="flex gap-4 p-5 rounded-2xl border transition-all reveal" :class="`reveal-delay-${(i % 3) + 1}`"
            style="border-color: rgba(28,45,94,0.08); background: #F4F9FF;">
            <div class="icon-box flex-shrink-0">
              <component :is="feat.icon" :size="20" style="color: #FF7A00;" />
            </div>
            <div>
              <h3 class="font-[family-name:var(--font-heading)] font-bold text-sm mb-1" style="color: #1C2D5E;">{{ feat.title }}</h3>
              <p class="text-xs text-gray-500 leading-relaxed">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ REVIEWS CAROUSEL ══════════════════════════════════════════ -->
    <ReviewsCarousel />

    <!-- ══ CTA BANNER ════════════════════════════════════════════════ -->
    <section class="relative overflow-hidden" style="background: linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #1a0800 100%);">
      <div class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,107,0,0.15) 0%, transparent 60%),
               radial-gradient(ellipse 50% 60% at 100% 50%, rgba(255,149,0,0.08) 0%, transparent 60%);"/>
      <div class="absolute top-0 left-0 right-0 h-px"
        style="background: linear-gradient(90deg, transparent, #FF6B00 30%, #FFB300 55%, #FF6B00 75%, transparent);"/>
      <div class="container-pad relative py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div class="reveal">
          <p class="section-label mb-3" style="color: #FF9500;">Get Started Today</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-white mb-3"
            style="font-size: clamp(1.75rem, 4vw, 2.75rem);">
            Book your test in<br />under 2 minutes
          </h2>
          <p class="text-sm max-w-md" style="color: rgba(255,255,255,0.5);">
            Call us, WhatsApp, or send an online enquiry. Our team schedules your home pickup and handles everything else.
          </p>
        </div>
        <div class="flex flex-col gap-3 flex-shrink-0 reveal reveal-delay-2">
          <a :href="`tel:${(config.public.labPhone as string).replace(/\s/g,'')}`"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all"
            style="background: linear-gradient(135deg, #FF6B00, #FF9500); box-shadow: 0 4px 20px rgba(255,107,0,0.4); font-family: var(--font-heading);">
            <Phone :size="16" /> Call {{ config.public.labPhone }}
          </a>
          <a :href="`https://wa.me/${(config.public.labPhone as string).replace(/[^0-9]/g,'')}`" target="_blank"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all"
            style="background: linear-gradient(135deg, #25D366, #128C7E); box-shadow: 0 4px 20px rgba(37,211,102,0.3);">
            <MessageCircle :size="16" /> WhatsApp Us
          </a>
          <NuxtLink to="/contact"
            class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all text-center"
            style="background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,107,0,0.3);">
            Send Online Enquiry
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Phone, HomeIcon, ShieldCheck, BarChart3, Tag, Search, ClipboardList, Home, FileText, Clock, MessageCircle, Award, ChevronLeft, ChevronRight } from 'lucide-vue-next'
useHead({ title: 'Vigsan Healthcare Labs — Trusted Lab Tests at Your Doorstep' })
useReveal()

const config = useRuntimeConfig()
const { get } = useApi()
const { fetchWithCache } = useCache()
const loading = ref(true)
const featuredTests = ref<any[]>([])
const packages = ref<any[]>([])
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}
const heroPills = ['1000+ Tests', 'NABL Certified', 'Free Home Collection', 'Reports in 24hrs']

const heroSlides = [
  {
    image: '/carousel-1.svg',
    mobileImage: '/carousel-1_mobile.svg',
    bg: '#1a0a00',
    tag: 'Quick & Easy',
    tagIcon: '⚡',
    tagBg: 'rgba(255,107,0,0.2)',
    tagColor: '#FF9500',
    tagBorder: 'rgba(255,107,0,0.4)',
    title: 'Book Health Tests in Seconds',
    sub: 'Choose from 1000+ tests. Slot confirmed in under 2 minutes.',
  },
  {
    image: '/carousel-2.svg',
    mobileImage: '/carousel-2_mobile.svg',
    bg: '#001a12',
    tag: 'Precision Diagnostics',
    tagIcon: '🏆',
    tagBg: 'rgba(0,199,122,0.15)',
    tagColor: '#00C77A',
    tagBorder: 'rgba(0,199,122,0.35)',
    title: 'Accurate Reports, Faster Results',
    sub: 'NABL certified labs. Digital reports delivered within 24 hours.',
  },
  {
    image: '/carousel-3.svg',
    mobileImage: '/carousel-3_mobile.svg',
    bg: '#060816',
    tag: 'Free Service',
    tagIcon: '🏠',
    tagBg: 'rgba(59,155,232,0.15)',
    tagColor: '#7EC8F8',
    tagBorder: 'rgba(59,155,232,0.3)',
    title: "Pune's Most Trusted Home Collection",
    sub: 'Trained phlebotomists at your doorstep. Zero extra charges.',
  },
]
const heroCurrentSlide = ref(0)
const heroPrevSlide = ref<number | null>(null)
const carouselPause = ref(false)
let touchStartX = 0

const heroGoTo = (i: number) => { heroPrevSlide.value = heroCurrentSlide.value; heroCurrentSlide.value = i }
const heroNext = () => heroGoTo((heroCurrentSlide.value + 1) % heroSlides.length)
const heroPrev = () => heroGoTo((heroCurrentSlide.value - 1 + heroSlides.length) % heroSlides.length)
const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX }
const onTouchEnd = (e: TouchEvent) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 40) diff > 0 ? heroNext() : heroPrev()
}
let heroTimer: ReturnType<typeof setInterval>
// onMounted(() => { heroTimer = setInterval(() => { if (!carouselPause.value) heroNext() }, 4800) })

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  heroTimer = setInterval(() => {
    if (!carouselPause.value) heroNext()
  }, 4800)
})

// onUnmounted(() => clearInterval(heroTimer))
onUnmounted(() => {
  clearInterval(heroTimer)
  window.removeEventListener('resize', checkMobile)
})

const stats = [
  { target: 1000,   prefix: '',  suffix: '+', label: 'Tests Available', static: false },
  { target: 10000, prefix: '',  suffix: '+', label: 'Happy Patients',  static: false },
  { target: null,  prefix: '',  suffix: '',  label: 'Report Delivery', static: true, staticValue: '6–72h' },
  { target: 100,   prefix: '',  suffix: '%', label: 'Certified Labs',  static: false },
]
const displayValues = ref(stats.map((s) => s.static ? s.staticValue : 0))
const statsRef = ref<HTMLElement | null>(null)
const hasCounted = ref(false)
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
const runCounters = () => {
  if (hasCounted.value) return
  hasCounted.value = true
  const duration = 2000
  const startTime = performance.now()
  const tick = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutQuart(progress)
    stats.forEach((stat, i) => {
      if (!stat.static) displayValues.value[i] = Math.floor(eased * stat.target!)
    })
    if (progress < 1) requestAnimationFrame(tick)
    else stats.forEach((stat, i) => { if (!stat.static) displayValues.value[i] = stat.target })
  }
  requestAnimationFrame(tick)
}
const { stop } = useIntersectionObserver(
  statsRef,
  ([entry]) => { if (entry.isIntersecting) { runCounters(); stop() } },
  { threshold: 0.3 }
)

const tickerTests = [
  'Complete Blood Count (CBC)', 'Thyroid Profile (TSH, T3, T4)', 'HbA1c — Diabetes Check',
  'Vitamin D & B12', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)',
  'Lipid Profile', 'Full Body Health Checkup', 'Urine Routine', 'Iron Studies',
  'Dengue NS1 Antigen', 'COVID Antibody Test', 'Hormone Panel', 'Bone Profile',
  'Cardiac Risk Markers', 'PSA — Prostate Screen', 'PCOS Panel', 'Allergy Profile',
]

const trustBadges = [
  { title: 'Free Home Collection', sub: 'We come to you',        icon: HomeIcon    },
  { title: 'NABL Certified Labs',  sub: 'Nationally accredited', icon: ShieldCheck },
  { title: 'Online Reports',       sub: 'Results via email',     icon: BarChart3   },
  { title: 'Affordable Pricing',   sub: 'Up to 60% off MRP',     icon: Tag         },
]

const howItWorks = [
  { title: 'Choose Your Test',   desc: 'Browse our catalogue or call us for expert guidance.',  icon: Search        },
  { title: 'Send an Enquiry',    desc: 'Fill a quick form and we schedule your home pickup.',   icon: ClipboardList },
  { title: 'Home Sample Pickup', desc: 'Our phlebotomist visits at your preferred time slot.',  icon: Home          },
  { title: 'Get Results Online', desc: 'Reports emailed to you within 24–72 hours.',            icon: FileText      },
]

const features = [
  { title: 'Accuracy Guaranteed',    desc: 'NABL-certified labs using internationally validated testing methods.',   icon: Award         },
  { title: 'Home Sample Collection', desc: 'Trained phlebotomists at your doorstep — any time, any location.',     icon: HomeIcon      },
  { title: 'Transparent Pricing',    desc: 'No hidden charges. Significant discount from MRP, always.',            icon: Tag           },
  { title: 'Online Reports',         desc: 'Digital reports delivered to your inbox — no lab visits needed.',      icon: BarChart3     },
  { title: 'Quick Turnaround',       desc: 'Most reports ready within 24–48 hours of sample collection.',         icon: Clock         },
  { title: 'Expert Guidance',        desc: "Not sure which test? Our team will advise you — for free.",            icon: MessageCircle },
]

onMounted(async () => {
  try {
    const [f, p] = await Promise.all([
      fetchWithCache('featured-tests', () => get<any[]>('/tests?featured=true&limit=6')),
      fetchWithCache('packages',       () => get<any[]>('/tests?category=package&limit=3')),
    ])
    featuredTests.value = f
    packages.value = p
  } catch (e) { console.error(e) }
  finally { loading.value = false }
})
</script>

<style scoped>
.hero-slide {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-active  { opacity: 1; transform: translateX(0) scale(1); z-index: 10; }
.slide-exit    { opacity: 0; transform: translateX(-3%) scale(0.98); z-index: 5; pointer-events: none; }
.slide-hidden  { opacity: 0; transform: translateX(3%) scale(0.98); z-index: 1; pointer-events: none; }
</style>
