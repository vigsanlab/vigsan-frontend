<template>
  <NuxtLink
    :to="`/tests/${test.slug}`"
    class="card relative flex flex-col group cursor-pointer"
  >
    <div class="discount-badge" v-if="test.discountPercent > 0">{{ test.discountPercent }}% off</div>

    <!-- Color accent top bar -->
    <div class="h-1 w-full" style="background: linear-gradient(90deg, #1C2D5E, #2EAB31, #3B9BE8);"></div>

    <div class="p-5 flex-1 flex flex-col">
      <!-- Badges -->
      <div class="flex items-center gap-2 mb-3 flex-wrap">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold capitalize"
          style="background: #EEF1F8; color: #1C2D5E;">
          {{ test.category }}
        </span>
        <span v-if="test.isFeatured"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold"
          style="background: #FEF9E7; color: #D97706;">
          ⭐ Popular
        </span>
      </div>

      <!-- Name -->
      <h3 class="font-[family-name:var(--font-heading)] font-bold text-gray-900 text-base leading-tight mb-2 group-hover:transition-colors"
        :style="{ color: '#111827' }">
        {{ test.name }}
      </h3>

      <!-- Description -->
      <p class="text-xs text-gray-500 line-clamp-2 mb-3 flex-1 leading-relaxed">{{ test.description }}</p>

      <!-- Parameters -->
      <div v-if="test.parameterCount" class="flex items-center gap-1.5 text-xs mb-3 font-medium"
        style="color: #1C2D5E;">
        <ClipboardList :size="12" />
        {{ test.parameterCount }} parameters
      </div>

      <!-- Meta chips -->
      <div class="flex items-center gap-2 mb-4 flex-wrap">
        <span v-if="test.homeCollection"
          class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium"
          style="background: #EDFAEE; color: #2EAB31;">
          <Home :size="10" /> Home pickup
        </span>
        <span v-if="test.fastingRequired"
          class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium"
          style="background: #FEF3C7; color: #D97706;">
          <Clock :size="10" /> Fasting
        </span>
      </div>

      <!-- Price row -->
      <div class="flex items-end justify-between pt-3.5" style="border-top: 1px solid rgba(28,45,94,0.07);">
        <div>
          <p v-if="test.mrp > test.price" class="text-xs text-gray-400 line-through leading-none mb-1">₹{{ test.mrp }}</p>
          <p class="font-[family-name:var(--font-heading)] font-extrabold text-2xl leading-none" style="color: #1C2D5E;">
            ₹{{ test.price }}
          </p>
        </div>
        <span class="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all"
          style="background: linear-gradient(135deg, #2EAB31, #239126); box-shadow: 0 2px 10px rgba(46,171,49,0.3);">
          Enquire →
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ClipboardList, Home, Clock } from 'lucide-vue-next'
interface Test {
  slug: string; name: string; category: string; description: string
  parameterCount: number; mrp: number; price: number; discountPercent: number
  homeCollection: boolean; fastingRequired: boolean; isFeatured: boolean
}
defineProps<{ test: Test }>()
</script>
