<template>
  <NuxtLink
    :to="`/tests/${test.slug}`"
    class="card relative flex flex-col group cursor-pointer"
  >
    <div class="discount-badge" v-if="test.discountPercent > 0">{{ test.discountPercent }}% off</div>

    <!-- Top accent bar — purple for packages, brand gradient for tests -->
    <div class="h-1 w-full" :style="isPackage
      ? 'background: linear-gradient(90deg, #7C3AED, #8B5CF6, #3B9BE8);'
      : 'background: linear-gradient(90deg, #1C2D5E, #2EAB31, #3B9BE8);'" />

    <div class="p-5 flex-1 flex flex-col">

      <!-- Badges row -->
      <div class="flex items-center gap-2 mb-3 flex-wrap">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold capitalize"
          :style="isPackage
            ? 'background: #F5F3FF; color: #7C3AED;'
            : 'background: #EEF1F8; color: #1C2D5E;'">
          {{ isPackage ? '📦 Package' : test.category }}
        </span>
        <span v-if="test.isFeatured"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold"
          style="background: #FEF9E7; color: #D97706;">
          ⭐ Popular
        </span>
        <span v-if="isPackage && test.subTests?.length"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold"
          style="background: #F5F3FF; color: #7C3AED;">
          {{ test.subTests.length }} tests included
        </span>
      </div>

      <!-- Name -->
      <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 text-base leading-tight mb-1.5">
        {{ test.name }}
      </h3>

      <!-- Short intro (if available) or description -->
      <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed"
        :class="isPackage && test.subTests?.length ? 'mb-3' : 'mb-3 flex-1'">
        {{ test.shortIntro || test.description }}
      </p>

      <!-- ── PACKAGE: sub-test pills ── -->
      <div v-if="isPackage && test.subTests?.length" class="mb-3 flex-1">
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="st in test.subTests.slice(0, visibleSubTests)"
            :key="st._id || st.name"
            class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
            style="background: #F5F3FF; color: #6D28D9; border: 1px solid rgba(124,58,237,0.15);">
            <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #8B5CF6;"></span>
            {{ st.name }}
            <span class="text-purple-300 font-normal">({{ st.parameterCount }})</span>
          </span>
          <span v-if="test.subTests.length > visibleSubTests"
            class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium"
            style="background: #F5F3FF; color: #8B5CF6;">
            +{{ test.subTests.length - visibleSubTests }} more
          </span>
        </div>
        <!-- Total params summary -->
        <div class="flex items-center gap-1.5 mt-2 text-xs font-medium" style="color: #7C3AED;">
          <ClipboardList :size="11" />
          {{ test.parameterCount }} total parameters
        </div>
      </div>

      <!-- ── SIMPLE TEST: parameter count ── -->
      <div v-else-if="test.parameterCount" class="flex items-center gap-1.5 text-xs mb-3 font-medium" style="color: #1C2D5E;">
        <ClipboardList :size="12" />
        {{ test.parameterCount }} parameters
      </div>

      <!-- Meta chips -->
      <div class="flex items-center gap-2 mb-4 flex-wrap">
        <span v-if="test.homeCollection"
          class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium"
          style="background: #EDFAEE; color: #2EAB31;">
          <Home :size="10" /> Free pickup
        </span>
        <span v-if="test.fastingRequired"
          class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium"
          style="background: #FEF3C7; color: #D97706;">
          <Clock :size="10" /> Fasting
        </span>
        <span class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium"
          style="background: #F4F9FF; color: #6B7280;">
          <Timer :size="10" /> {{ test.turnaroundTime || '24-48h' }}
        </span>
      </div>

      <!-- Price row -->
      <div class="flex items-end justify-between pt-3.5" style="border-top: 1px solid rgba(28,45,94,0.07);">
        <div>
          <p v-if="test.mrp > test.price" class="text-xs text-gray-400 line-through leading-none mb-1">₹{{ test.mrp }}</p>
          <p class="font-[family-name:var(--font-heading)] font-extrabold text-2xl leading-none" style="color: #1C2D5E;">
            ₹{{ test.price }}
          </p>
          <p v-if="test.mrp > test.price" class="text-xs font-semibold mt-0.5" style="color: #2EAB31;">
            Save ₹{{ test.mrp - test.price }}
          </p>
        </div>
        <span class="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all"
          :style="isPackage
            ? 'background: linear-gradient(135deg, #7C3AED, #8B5CF6); box-shadow: 0 2px 10px rgba(124,58,237,0.3);'
            : 'background: linear-gradient(135deg, #2EAB31, #239126); box-shadow: 0 2px 10px rgba(46,171,49,0.3);'">
          {{ isPackage ? 'View Package →' : 'Enquire →' }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ClipboardList, Home, Clock, Timer } from 'lucide-vue-next'

interface SubTest {
  _id?: string
  name: string
  parameters: string[]
  parameterCount: number
}

interface Test {
  slug: string
  name: string
  category: string
  shortIntro?: string
  description: string
  parameterCount: number
  mrp: number
  price: number
  discountPercent: number
  homeCollection: boolean
  fastingRequired: boolean
  isFeatured: boolean
  turnaroundTime?: string
  subTests?: SubTest[]
}

const props = defineProps<{ test: Test }>()

const isPackage = computed(() => props.test.category === 'package')

// Show up to 4 sub-test pills on the card; rest shown as "+N more"
const visibleSubTests = computed(() => {
  const count = props.test.subTests?.length || 0
  return count <= 5 ? count : 4
})
</script>