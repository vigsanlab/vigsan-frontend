<template>
  <Transition name="slide-down">
    <div
      v-if="status === 'waking'"
      class="fixed top-0 inset-x-0 z-50 bg-amber-500 text-white text-xs text-center py-2 px-4 flex items-center justify-center gap-2"
    >
      <span class="w-2 h-2 rounded-full bg-white animate-[pulse_1.5s_ease-in-out_infinite]" />
      Starting services — first load may take up to 30 seconds. Thank you for your patience.
    </div>
  </Transition>
</template>

<script setup lang="ts">
const status = useState<'waking' | 'ready' | 'error'>('backendStatus')
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-100%); }
</style>
