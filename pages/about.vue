<template>
  <div>
    <!-- Page hero -->
    <section class="relative overflow-hidden hero-bg py-20">
      <div class="dot-grid absolute inset-0 pointer-events-none" />
      <div class="container-pad relative">
        <p class="section-label mb-4" style="color: #65CF68;">Our Story</p>
        <h1 class="font-[family-name:var(--font-heading)] font-black text-white mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem);">
          About Vigsan<br /><span class="gradient-text-green">Healthcare Labs</span>
        </h1>
        <p class="text-lg max-w-xl leading-relaxed" style="color: rgba(255,255,255,0.6);">
          Bridging the gap between you and trusted diagnostics — with the convenience of home collection and digital results.
        </p>
      </div>
    </section>

    <!-- Who we are -->
    <section class="section-pad bg-white">
      <div class="container-pad">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center mb-20">
          <div>
            <p class="section-label mb-4">Who We Are</p>
            <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-3xl mb-5">
              Pune's trusted diagnostics<br />coordination service
            </h2>
            <p class="text-gray-600 leading-relaxed mb-4">We manage the entire diagnostic journey — from booking to sample pickup to digital report delivery — so you never have to step out of your home.</p>
            <p class="text-gray-600 leading-relaxed mb-4">As a third-party collection and coordination partner, we work exclusively with NABL-certified and ISO-accredited laboratories like SRL Diagnostics, Thyrocare, and Metropolis.</p>
            <p class="text-gray-600 leading-relaxed">Our trained phlebotomists visit your home, office, or any location at your preferred time. You get accurate results without stepping out.</p>
          </div>
          <!-- Stats grid -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in aboutStats" :key="stat.label"
              class="p-6 rounded-2xl text-center"
              style="background: linear-gradient(135deg, #EEF1F8, #F4F9FF); border: 1px solid rgba(28,45,94,0.08);">
              <p class="font-[family-name:var(--font-heading)] font-black text-3xl mb-1" style="color: #1C2D5E;">{{ stat.value }}</p>
              <p class="text-xs text-gray-500 font-medium">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Partner labs -->
        <div class="mb-20">
          <p class="section-label mb-4">Certified Partners</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-3xl mb-2">Our Partner Labs</h2>
          <p class="text-gray-500 text-sm mb-10">We partner only with nationally accredited, quality-certified laboratories.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div v-for="lab in partnerLabs" :key="lab.name" class="card p-6 hover:cursor-default">
              <div class="icon-box mb-4">
                <FlaskConical :size="22" style="color: #2EAB31;" />
              </div>
              <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-3">{{ lab.name }}</h3>
              <div class="flex gap-2 flex-wrap mb-3">
                <span v-for="cert in lab.certifications" :key="cert"
                  class="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                  style="background: #EDFAEE; color: #2EAB31;">{{ cert }}</span>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">{{ lab.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Values -->
        <div>
          <p class="section-label mb-4 justify-center text-center">Why Choose Us</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-3xl mb-10 text-center">What sets us apart</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="val in values" :key="val.title"
              class="flex gap-4 p-5 rounded-2xl border"
              style="border-color: rgba(28,45,94,0.08); background: #F4F9FF;">
              <div class="icon-box flex-shrink-0">
                <component :is="val.icon" :size="20" style="color: #2EAB31;" />
              </div>
              <div>
                <h3 class="font-[family-name:var(--font-heading)] font-bold text-sm mb-1" style="color: #1C2D5E;">{{ val.title }}</h3>
                <p class="text-xs text-gray-500 leading-relaxed">{{ val.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FlaskConical, ShieldCheck, Home, DollarSign, FileText, Clock, MessageCircle } from 'lucide-vue-next'
useHead({ title: 'About Us — Vigsan Healthcare Labs' })
const aboutStats = [
  { value: '10K+',  label: 'Patients served' },
  { value: '500+',  label: 'Tests offered'   },
  { value: '3+',    label: 'Partner labs'    },
  { value: '5 yrs', label: 'In service'      },
]
const partnerLabs = [
  { name: 'SRL Diagnostics', certifications: ['NABL', 'ISO 15189'], desc: "One of India's largest diagnostics networks with state-of-the-art equipment." },
  { name: 'Thyrocare',       certifications: ['NABL', 'CAP'],       desc: 'Specialist lab for thyroid, hormones, and preventive health packages.'         },
  { name: 'Metropolis',      certifications: ['NABL', 'ISO 9001'],  desc: 'Advanced diagnostics including genomics, oncology, and rare disease testing.'   },
]
const values = [
  { title: 'Accuracy Guaranteed',    desc: 'NABL-certified labs using internationally validated methods.',     icon: ShieldCheck   },
  { title: 'Home Sample Collection', desc: 'Trained phlebotomists visit at your preferred time slot.',        icon: Home          },
  { title: 'Affordable Pricing',     desc: 'Significant discounts on MRP with transparent pricing.',          icon: DollarSign    },
  { title: 'Online Reports',         desc: 'Reports delivered to your email — no lab visit needed.',          icon: FileText      },
  { title: 'Quick Turnaround',       desc: 'Most reports ready within 24-48 hours.',                         icon: Clock         },
  { title: 'Expert Guidance',        desc: "Not sure which test? Call us — our team will advise you.",        icon: MessageCircle },
]
</script>
