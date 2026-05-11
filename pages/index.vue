<template>
  <div>
    <!-- ══ HERO ══════════════════════════════════════════════════════ -->
    <section class="relative overflow-hidden hero-bg" style="min-height: 88vh; display: flex; flex-direction: column; justify-content: center;">
      <!-- Dot grid overlay -->
      <div class="dot-grid absolute inset-0 pointer-events-none" />

      <!-- Floating decorative orbs -->
      <div class="float-a absolute top-20 right-[8%] w-64 h-64 rounded-full pointer-events-none opacity-20"
        style="background: radial-gradient(circle, #3EBD41 0%, transparent 70%); filter: blur(40px);" />
      <div class="float-b absolute bottom-16 right-[25%] w-48 h-48 rounded-full pointer-events-none opacity-15"
        style="background: radial-gradient(circle, #3B9BE8 0%, transparent 70%); filter: blur(32px);" />

      <div class="container-pad relative py-20 md:py-28">
        <div class="max-w-3xl">
          <!-- Live pill -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold"
            style="background: rgba(46,171,49,0.15); border: 1px solid rgba(46,171,49,0.3); color: #65CF68;">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background: #3EBD41;"></span>
            Serving Pune &amp; surrounding areas
          </div>

          <!-- Headline -->
          <h1 class="font-[family-name:var(--font-heading)] font-black text-white leading-tight mb-6"
            style="font-size: clamp(2.5rem, 6vw, 4.2rem);">
            Lab tests that come<br />
            <span class="gradient-text-green">to your doorstep</span>
          </h1>
          <p class="text-lg md:text-xl leading-relaxed mb-10 max-w-xl" style="color: rgba(255,255,255,0.65);">
            Certified partner labs. Free home sample collection.<br class="hidden md:block" /> Accurate results delivered online — within 24 hours.
          </p>

          <!-- CTA row -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/tests"
              class="btn-green-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white"
              style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
              View All Tests
              <ArrowRight :size="16" />
            </NuxtLink>
            <NuxtLink to="/contact"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all"
              style="background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);"
              onmouseenter="this.style.background='rgba(255,255,255,0.14)'"
              onmouseleave="this.style.background='rgba(255,255,255,0.08)'">
              Enquire Now
            </NuxtLink>
          </div>

          <!-- Partner logos strip -->
          <div class="mt-12 flex items-center gap-4 flex-wrap">
            <p class="text-xs font-semibold uppercase tracking-wider" style="color: rgba(255,255,255,0.35);">Processed by</p>
            <div class="flex gap-3 flex-wrap">
              <span v-for="lab in ['SRL', 'Thyrocare', 'Metropolis']" :key="lab"
                class="px-3 py-1.5 rounded-lg text-xs font-bold"
                style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.12);">
                {{ lab }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div style="background: rgba(0,0,0,0.25); border-top: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(8px);">
        <div class="container-pad py-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="stat in stats" :key="stat.label" class="stat-pill">
              <p class="stat-number">{{ stat.value }}</p>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ TRUST CHIPS ═══════════════════════════════════════════════ -->
    <section class="bg-white border-b" style="border-color: rgba(28,45,94,0.08);">
      <div class="container-pad py-7">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="badge in trustBadges" :key="badge.title" class="trust-chip">
            <div class="icon-box">
              <component :is="badge.icon" :size="20" style="color: #2EAB31;" />
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
        <div class="flex items-end justify-between mb-12">
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

    <!-- ══ HEALTH PACKAGES ═══════════════════════════════════════════ -->
    <section class="section-pad bg-white">
      <div class="container-pad">
        <div class="flex items-end justify-between mb-12">
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
          <TestCard v-for="pkg in packages" :key="pkg._id" :test="pkg" />
        </div>
      </div>
    </section>

    <!-- ══ HOW IT WORKS ══════════════════════════════════════════════ -->
    <section class="section-pad" style="background: linear-gradient(160deg, #EEF1F8 0%, #F4F9FF 100%);">
      <div class="container-pad">
        <div class="text-center mb-16">
          <p class="section-label mb-3 justify-center">Simple Process</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
            How It Works
          </h2>
          <p class="mt-3 text-gray-500 max-w-lg mx-auto">From booking to your doorstep in four simple steps</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, i) in howItWorks" :key="i" class="relative text-center">
            <!-- Connector line -->
            <div v-if="i < 3" class="step-line hidden md:block" />

            <!-- Step icon -->
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
              style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A); box-shadow: 0 8px 24px rgba(28,45,94,0.25);">
              <component :is="step.icon" :size="26" color="white" />
              <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">{{ i + 1 }}</div>
            </div>
            <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ WHY VIGSAN (feature strip) ════════════════════════════════ -->
    <section class="section-pad bg-white">
      <div class="container-pad">
        <div class="text-center mb-14">
          <p class="section-label mb-3 justify-center">Why Choose Us</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900" style="font-size: clamp(1.75rem, 4vw, 2.5rem);">
            The Vigsan Difference
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="feat in features" :key="feat.title"
            class="flex gap-4 p-5 rounded-2xl border transition-all"
            style="border-color: rgba(28,45,94,0.08); background: #F4F9FF;">
            <div class="icon-box flex-shrink-0">
              <component :is="feat.icon" :size="20" style="color: #2EAB31;" />
            </div>
            <div>
              <h3 class="font-[family-name:var(--font-heading)] font-bold text-sm mb-1" style="color: #1C2D5E;">{{ feat.title }}</h3>
              <p class="text-xs text-gray-500 leading-relaxed">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CTA BANNER ════════════════════════════════════════════════ -->
    <section class="relative overflow-hidden" style="background: linear-gradient(135deg, #1C2D5E 0%, #0C1630 100%);">
      <div class="dot-grid absolute inset-0 pointer-events-none opacity-50" />
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style="background: radial-gradient(circle, #2EAB31, transparent); filter: blur(60px); transform: translate(30%, -30%);" />
      <div class="container-pad relative py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p class="section-label mb-3" style="color: #65CF68;">Get Started Today</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-white text-3xl md:text-4xl mb-2">
            Ready to book your test?
          </h2>
          <p style="color: rgba(255,255,255,0.55);">Call us or send an enquiry — we handle everything else.</p>
        </div>
        <div class="flex gap-3 flex-shrink-0 flex-wrap">
          <a :href="`tel:${(config.public.labPhone as string).replace(/\s/g,'')}`"
            class="btn-green-glow inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-bold text-white"
            style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
            <Phone :size="16" /> Call Now
          </a>
          <NuxtLink to="/contact"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-white transition-all"
            style="background: rgba(255,255,255,0.1); border: 1.5px solid rgba(255,255,255,0.2);">
            Enquire
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Phone, HomeIcon, ShieldCheck, BarChart3, Tag, Search, ClipboardList, Home, FileText, Clock, MessageCircle, Award } from 'lucide-vue-next'
useHead({ title: 'Vigsan Healthcare Labs — Trusted Lab Tests at Your Doorstep' })

const config = useRuntimeConfig()
const { get } = useApi()
const { fetchWithCache } = useCache()
const loading = ref(true)
const featuredTests = ref<any[]>([])
const packages = ref<any[]>([])

const stats = [
  { value: '500+',    label: 'Tests Available'  },
  { value: '10,000+', label: 'Happy Patients'   },
  { value: '24–72h',  label: 'Report Delivery'  },
  { value: '100%',    label: 'Certified Labs'   },
]
const trustBadges = [
  { title: 'Free Home Collection', sub: 'We come to you',         icon: HomeIcon    },
  { title: 'NABL Certified Labs',  sub: 'Nationally accredited',  icon: ShieldCheck },
  { title: 'Online Reports',       sub: 'Results via email',      icon: BarChart3   },
  { title: 'Affordable Pricing',   sub: 'Up to 60% off MRP',      icon: Tag         },
]
const howItWorks = [
  { title: 'Choose Your Test',    desc: 'Browse our catalogue or call us for expert guidance.',  icon: Search       },
  { title: 'Send an Enquiry',     desc: 'Fill a quick form and we schedule your home pickup.',   icon: ClipboardList},
  { title: 'Home Sample Pickup',  desc: 'Our phlebotomist visits at your preferred time slot.',  icon: Home         },
  { title: 'Get Results Online',  desc: 'Reports emailed to you within 24–72 hours.',            icon: FileText     },
]
const features = [
  { title: 'Accuracy Guaranteed',    desc: 'NABL-certified labs using internationally validated testing methods.',   icon: Award         },
  { title: 'Home Sample Collection', desc: 'Trained phlebotomists at your doorstep — any time, any location.',     icon: HomeIcon      },
  { title: 'Transparent Pricing',    desc: 'No hidden charges. Significant discount from MRP, always.',             icon: Tag           },
  { title: 'Online Reports',         desc: 'Digital reports delivered to your inbox — no lab visits needed.',       icon: BarChart3     },
  { title: 'Quick Turnaround',       desc: 'Most reports ready within 24–48 hours of sample collection.',          icon: Clock         },
  { title: 'Expert Guidance',        desc: "Not sure which test? Our team will advise you — for free.",             icon: MessageCircle },
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
