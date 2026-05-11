<template>
  <div>
    <Transition name="fade" mode="out-in">
      <!-- Success -->
      <div v-if="submitted" key="success" class="text-center py-10">
        <div class="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
          style="background: linear-gradient(135deg, #EDFAEE, #D0F2D1);">
          <CheckCircle :size="36" style="color: #2EAB31;" />
        </div>
        <h3 class="font-[family-name:var(--font-heading)] font-black text-gray-900 text-xl mb-2">Enquiry Submitted!</h3>
        <p class="text-gray-500 text-sm">We'll call you back within a few hours. Thank you!</p>
        <button @click="submitted = false"
          class="mt-5 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
          style="color: #2EAB31; background: #EDFAEE;">
          Submit another
        </button>
      </div>

      <!-- Form -->
      <form v-else key="form" @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold mb-1.5" style="color: #1C2D5E;">Full Name <span style="color: #E53E3E;">*</span></label>
            <input v-model="form.name" placeholder="Your full name" required
              class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
              onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
              onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'" />
          </div>
          <div>
            <label class="block text-xs font-bold mb-1.5" style="color: #1C2D5E;">Phone Number <span style="color: #E53E3E;">*</span></label>
            <input v-model="form.phone" type="tel" placeholder="+91 98000 00000" required
              class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
              onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
              onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold mb-1.5" style="color: #1C2D5E;">Email Address</label>
          <input v-model="form.email" type="email" placeholder="your@email.com"
            class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
            onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
            onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1.5" style="color: #1C2D5E;">Test / Service Interested In</label>
          <input v-model="form.testInterest" :placeholder="defaultTest || 'e.g., Full Body Health Checkup'"
            class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
            onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
            onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1.5" style="color: #1C2D5E;">Message / Special Requirements</label>
          <textarea v-model="form.message" placeholder="Preferred pickup time, location, any requirements…" rows="3"
            class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
            style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;"
            onfocus="this.style.borderColor='rgba(46,171,49,0.5)'; this.style.background='#fff'"
            onblur="this.style.borderColor='rgba(28,45,94,0.1)'; this.style.background='#F4F9FF'"></textarea>
        </div>

        <div v-if="error"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style="background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B;">
          <AlertCircle :size="16" />
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all btn-green-glow flex items-center justify-center gap-2"
          style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);"
          :style="loading ? 'opacity: 0.7; cursor: not-allowed;' : ''">
          <Loader2 v-if="loading" :size="16" class="animate-spin" />
          <span>{{ loading ? 'Sending…' : 'Send Enquiry' }}</span>
        </button>
        <p class="text-xs text-center text-gray-400">We respond within 2–4 hours during business hours.</p>
      </form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'
const props = defineProps<{ defaultTest?: string }>()
const { post } = useApi()
const form = reactive({ name: '', phone: '', email: '', testInterest: props.defaultTest || '', message: '' })
const loading = ref(false); const submitted = ref(false); const error = ref('')
const submit = async () => {
  loading.value = true; error.value = ''
  try {
    await post('/enquiries', { ...form })
    submitted.value = true
    Object.assign(form, { name: '', phone: '', email: '', testInterest: '', message: '' })
  } catch (e: any) {
    error.value = e.message || 'Something went wrong. Please try again.'
  } finally { loading.value = false }
}
</script>
