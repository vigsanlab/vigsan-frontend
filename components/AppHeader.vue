<template>
  <header class="sticky top-0 z-30 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-navy-900/8 border-b border-navy-100/60' : 'bg-white/80 backdrop-blur-md border-b border-navy-100/40'">
    <div class="container-pad">
      <div class="flex items-center justify-between h-[68px]">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group flex-shrink-0">
          <div class="relative w-10 h-10 flex-shrink-0">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center"
              style="background: linear-gradient(135deg, #1C2D5E 0%, #2A4E9A 100%);">
               <img
                src="/logo.png"
                alt="Vigsan Healthcare Labs"
                class="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style="max-width: 180px;"
              />
            </div>
            <div class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
              style="background: linear-gradient(135deg, #2EAB31, #65CF68);"></div>
          </div>
          <div class="leading-tight">
            <p class="font-[family-name:var(--font-heading)] font-black text-[15px] leading-none"
              style="color: #1C2D5E;">{{ config.public.labName }}</p>
            <p class="text-[10px] font-semibold uppercase tracking-widest leading-none mt-1"
              style="color: #2EAB31;">Healthcare Labs</p>
          </div>
        </NuxtLink>
        <!-- <NuxtLink to="/" class="flex items-center flex-shrink-0 group">
          <img
            src="/logo.png"
            alt="Vigsan Healthcare Labs"
            class="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            style="max-width: 180px;"
          />
        </NuxtLink> -->

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks" :key="link.to" :to="link.to"
            class="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy-700 rounded-xl transition-all duration-200 group"
            active-class="text-navy-700"
          >
            <span class="relative z-10">{{ link.label }}</span>
            <!-- Active underline -->
            <span class="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full scale-x-0 group-[.router-link-active]:scale-x-100 transition-transform duration-300 origin-left"
              style="background: linear-gradient(90deg, #2EAB31, #65CF68);"></span>
          </NuxtLink>
        </nav>

        <!-- CTA right -->
        <div class="flex items-center gap-3">
          <a :href="`tel:${(config.public.labPhone as string).replace(/\s/g,'')}`"
            class="hidden lg:flex items-center gap-2 text-sm font-semibold transition-colors"
            style="color: #1C2D5E;">
            <div class="w-7 h-7 rounded-full flex items-center justify-center"
              style="background: #EDFAEE;">
              <Phone :size="13" style="color: #2EAB31;" />
            </div>
            {{ config.public.labPhone }}
          </a>

          <NuxtLink to="/contact"
            class="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all btn-green-glow"
            style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
            Book Test
          </NuxtLink>

          <button @click="mobileOpen = !mobileOpen"
            class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border transition-colors"
            style="border-color: rgba(28,45,94,0.15); color: #1C2D5E;">
            <Menu v-if="!mobileOpen" :size="18" />
            <X v-else :size="18" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden bg-white border-t py-4 px-4 space-y-1"
        style="border-color: rgba(28,45,94,0.08);">
        <NuxtLink
          v-for="link in navLinks" :key="link.to" :to="link.to"
          @click="mobileOpen = false"
          class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl transition-all"
          active-class="font-semibold"
          :style="{ background: 'transparent' }"
        >{{ link.label }}</NuxtLink>
        <div class="pt-3 border-t" style="border-color: rgba(28,45,94,0.08);">
          <a :href="`tel:${(config.public.labPhone as string).replace(/\s/g,'')}`"
            class="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl"
            style="color: #2EAB31; background: #EDFAEE;">
            <Phone :size="14" /> {{ config.public.labPhone }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Microscope, Phone, Menu, X } from 'lucide-vue-next'
const config = useRuntimeConfig()
const mobileOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 }, { passive: true })
})

const navLinks = [
  { to: '/',        label: 'Home'            },
  { to: '/tests',   label: 'Tests & Packages'},
  { to: '/gallery', label: 'Gallery'          },
  { to: '/about',   label: 'About'            },
  { to: '/contact', label: 'Contact'          },
]
</script>
