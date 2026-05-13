<template>
  <div>
    <section class="relative overflow-hidden hero-bg py-20">
      <div class="dot-grid absolute inset-0 pointer-events-none" />
      <div class="container-pad relative">
        <p class="section-label mb-4" style="color: #65CF68;">Get In Touch</p>
        <h1 class="font-[family-name:var(--font-heading)] font-black text-white mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem);">
          Contact &amp; Enquiry
        </h1>
        <p class="text-lg max-w-lg" style="color: rgba(255,255,255,0.6);">Send us an enquiry and we'll call you back within a few hours.</p>
      </div>
    </section>

    <section class="section-pad" style="background: #F4F9FF;">
      <div class="container-pad grid grid-cols-1 lg:grid-cols-5 gap-10">

        <!-- Form -->
        <div class="lg:col-span-3 card p-8 md:p-10">
          <div class="mb-8">
            <p class="section-label mb-3">Send a Message</p>
            <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-2xl">Book Your Test Today</h2>
            <p class="text-gray-500 text-sm mt-1">We typically respond within 2–4 hours during business hours.</p>
          </div>
          <EnquiryForm :default-test="prefillTest" />
        </div>

        <!-- Contact info -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="info in contactInfo" :key="info.title"
            class="card p-5 flex items-start gap-4 hover:cursor-default">
            <div class="icon-box flex-shrink-0">
              <component :is="info.icon" :size="20" style="color: #2EAB31;" />
            </div>
            <div>
              <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 text-sm mb-1">{{ info.title }}</h3>
              <a v-if="info.href" :href="info.href"
                class="text-sm font-semibold transition-colors" style="color: #1C2D5E;">{{ info.value }}</a>
              <p v-else class="text-sm text-gray-600">{{ info.value }}</p>
              <p v-if="info.sub" class="text-xs text-gray-400 mt-0.5">{{ info.sub }}</p>
            </div>
          </div>

          <!-- WhatsApp -->
          <a :href="`https://wa.me/${(config.public.labPhone as string).replace(/[^0-9]/g,'')}`" target="_blank"
            class="card p-5 flex items-center gap-4 group transition-all"
            style="border: 1.5px solid rgba(37,211,102,0.2);">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style="background: linear-gradient(135deg, #EDFAEE, #D0F2D1);">
              <MessageCircle :size="22" style="color: #25D366;" />
            </div>
            <div class="flex-1">
              <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 text-sm mb-0.5">Chat on WhatsApp</h3>
              <p class="text-xs text-gray-400">Fastest way to reach us</p>
            </div>
            <ArrowRight :size="16" class="text-gray-300 group-hover:text-green-400 transition-colors" />
          </a>

          <!-- Hours card -->
          <div class="card p-5 hover:cursor-default" style="background: linear-gradient(135deg, #EEF1F8, #F4F9FF);">
            <h3 class="font-[family-name:var(--font-heading)] font-bold text-sm mb-3" style="color: #1C2D5E;">Working Hours</h3>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Monday – Saturday</span>
                <span class="font-semibold" style="color: #1C2D5E;">6:00 AM – 8:00 PM</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Sunday</span>
                <span class="font-semibold" style="color: #1C2D5E;">6:00 AM – 8:00 PM</span>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-3 pt-3" style="border-top: 1px solid rgba(28,45,94,0.08);">
              <span class="w-2 h-2 rounded-full animate-pulse" style="background: #2EAB31;"></span>
              <span class="text-xs font-semibold" style="color: #2EAB31;">Currently accepting bookings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-vue-next'
useHead({ title: 'Contact & Enquiry — Vigsan Healthcare Labs' })
const config = useRuntimeConfig(); const route = useRoute()
const prefillTest = ref((route.query.test as string) || '')
const contactInfo = [
  { title: 'Phone',   value: config.public.labPhone,   href: `tel:${(config.public.labPhone as string).replace(/\s/g,'')}`,  sub: 'Mon–Sat: 7 AM – 8 PM', icon: Phone  },
  { title: 'Email',   value: config.public.labEmail,   href: `mailto:${config.public.labEmail}`,                              sub: 'We reply within 4 hrs', icon: Mail   },
  { title: 'Address', value: config.public.labAddress, href: null,                                                            sub: 'Walk-ins welcome',      icon: MapPin },
]
</script>
