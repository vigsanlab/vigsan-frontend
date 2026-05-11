<template>
  <footer style="background: linear-gradient(160deg, #060B1A 0%, #0C1630 50%, #142247 100%);">
    <!-- Top wave -->
    <div class="w-full overflow-hidden leading-none" style="margin-bottom: -2px;">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:60px;display:block;">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#F4F9FF"/>
      </svg>
    </div>

    <div class="container-pad pt-14 pb-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">

        <!-- Brand col -->
        <div class="md:col-span-4">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">
              <!-- <Microscope :size="20" color="white" :stroke-width="2" /> -->
              <NuxtLink to="/">
              <img
              src="/logo.png"
              alt="Vigsan Healthcare Labs"
              class="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style="max-width: 200px; filter: brightness(1.05);"
            />
            </NuxtLink>
            </div>
            <div>
              <p class="font-[family-name:var(--font-heading)] font-black text-white text-base leading-none">{{ config.public.labName }}</p>
              <p class="text-[10px] font-semibold uppercase tracking-widest mt-0.5" style="color: #3EBD41;">Healthcare Labs</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed mb-5" style="color: rgba(255,255,255,0.55);">
            Trusted diagnostics coordination service in Pune. Certified partner labs, free home collection, digital reports.
          </p>
          <div class="flex gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-lg text-xs font-semibold" style="background: rgba(46,171,49,0.15); color: #65CF68; border: 1px solid rgba(46,171,49,0.25);">NABL Certified</span>
            <span class="px-3 py-1 rounded-lg text-xs font-semibold" style="background: rgba(59,155,232,0.15); color: #7EC8F8; border: 1px solid rgba(59,155,232,0.25);">ISO 9001</span>
            <span class="px-3 py-1 rounded-lg text-xs font-semibold" style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.12);">5+ Years</span>
          </div>
        </div>

        <!-- Quick links -->
        <div class="md:col-span-3 md:col-start-6">
          <h4 class="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-widest mb-5" style="color: #3EBD41;">Quick Links</h4>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.to">
              <NuxtLink :to="link.to"
                class="text-sm transition-colors flex items-center gap-2 group"
                style="color: rgba(255,255,255,0.5);">
                <span class="w-1 h-1 rounded-full flex-shrink-0 transition-all group-hover:w-2" style="background: #3EBD41;"></span>
                <span class="group-hover:text-white transition-colors">{{ link.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="md:col-span-4 md:col-start-9">
          <h4 class="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-widest mb-5" style="color: #3EBD41;">Contact Us</h4>
          <ul class="space-y-4">
            <li>
              <a :href="`tel:${(config.public.labPhone as string).replace(/\s/g,'')}`"
                class="flex items-start gap-3 group">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style="background: rgba(46,171,49,0.15);">
                  <Phone :size="14" style="color: #3EBD41;" />
                </div>
                <div>
                  <p class="text-xs mb-0.5" style="color: rgba(255,255,255,0.4);">Phone</p>
                  <p class="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">{{ config.public.labPhone }}</p>
                </div>
              </a>
            </li>
            <li>
              <a :href="`mailto:${config.public.labEmail}`" class="flex items-start gap-3 group">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style="background: rgba(59,155,232,0.15);">
                  <Mail :size="14" style="color: #7EC8F8;" />
                </div>
                <div>
                  <p class="text-xs mb-0.5" style="color: rgba(255,255,255,0.4);">Email</p>
                  <p class="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">{{ config.public.labEmail }}</p>
                </div>
              </a>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style="background: rgba(255,255,255,0.08);">
                <MapPin :size="14" style="color: rgba(255,255,255,0.5);" />
              </div>
              <div>
                <p class="text-xs mb-0.5" style="color: rgba(255,255,255,0.4);">Address</p>
                <p class="text-sm" style="color: rgba(255,255,255,0.6);">{{ config.public.labAddress }}</p>
              </div>
            </li>
          </ul>

          <a :href="`https://wa.me/${(config.public.labPhone as string).replace(/[^0-9]/g,'')}`"
            target="_blank"
            class="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style="background: linear-gradient(135deg, #25D366, #128C7E); box-shadow: 0 4px 16px rgba(37,211,102,0.3);">
            <MessageCircle :size="15" /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t" style="border-color: rgba(255,255,255,0.07);">
      <div class="container-pad py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p class="text-xs" style="color: rgba(255,255,255,0.3);">© {{ year }} {{ config.public.labName }}. All rights reserved.</p>
        <NuxtLink to="/admin/login" class="text-xs transition-colors" style="color: rgba(255,255,255,0.2);">Admin</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Microscope, Phone, Mail, MapPin, MessageCircle } from 'lucide-vue-next'
const config = useRuntimeConfig()
const year = new Date().getFullYear()
const links = [
  { to: '/',                       label: 'Home'             },
  { to: '/tests',                  label: 'All Tests'         },
  { to: '/tests?category=package', label: 'Health Packages'   },
  { to: '/gallery',                label: 'Gallery'           },
  { to: '/about',                  label: 'About Us'          },
  { to: '/contact',                label: 'Contact & Enquiry' },
]
</script>
