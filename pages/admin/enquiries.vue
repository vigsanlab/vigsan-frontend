<template>
  <div>
    <div class="mb-8">
      <p class="section-label mb-2">Manage</p>
      <h2 class="font-[family-name:var(--font-heading)] font-black text-2xl" style="color: #1C2D5E;">Enquiries</h2>
      <p class="text-sm text-gray-400 mt-0.5">{{ pagination.total }} total · {{ enquiryStats.pending }} pending</p>
    </div>

    <!-- Status filter cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <button v-for="s in statusFilters" :key="s.value"
        @click="filterStatus = s.value; fetchEnquiries()"
        class="card p-4 text-left hover:cursor-pointer transition-all"
        :style="filterStatus === s.value ? 'border: 1.5px solid #2EAB31; box-shadow: 0 0 0 3px rgba(46,171,49,0.12);' : ''">
        <p class="font-[family-name:var(--font-heading)] font-black text-2xl mb-0.5" :style="`color: ${s.color};`">
          {{ enquiryStats[s.statKey] ?? '—' }}
        </p>
        <p class="text-xs text-gray-500">{{ s.label }}</p>
      </button>
    </div>

    <!-- List -->
    <div class="space-y-3">
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-20" />
      </div>
      <div v-else-if="!enquiries.length" class="card p-12 text-center text-sm text-gray-400">
        No enquiries found.
      </div>
      <div v-else v-for="enq in enquiries" :key="enq._id"
        class="card p-4 sm:p-5 cursor-pointer"
        @click="openDetail(enq)">
        <div class="flex flex-col sm:flex-row sm:items-start gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
            style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">
            {{ enq.name?.charAt(0)?.toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <p class="font-semibold text-gray-900">{{ enq.name }}</p>
              <span class="px-2.5 py-0.5 rounded-lg text-xs font-bold capitalize"
                :style="enq.status === 'resolved' ? 'background:#EDFAEE;color:#2EAB31;' : enq.status === 'contacted' ? 'background:#EEF1F8;color:#2A4E9A;' : 'background:#FEF3C7;color:#D97706;'">
                {{ enq.status || 'pending' }}
              </span>
            </div>
            <div class="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
              <span class="flex items-center gap-1"><Phone :size="11" /> {{ enq.phone }}</span>
              <span v-if="enq.email">{{ enq.email }}</span>
              <span v-if="enq.testInterest" class="font-medium" style="color: #2EAB31;">{{ enq.testInterest }}</span>
              <span>{{ formatDate(enq.createdAt) }}</span>
            </div>
            <p v-if="enq.message" class="text-xs text-gray-500 mt-1.5 truncate">{{ enq.message }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0" @click.stop>
            <a :href="`tel:${enq.phone}`"
              class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs transition-all"
              style="background: linear-gradient(135deg, #2EAB31, #239126);">
              <Phone :size="13" />
            </a>
            <a :href="`https://wa.me/${enq.phone.replace(/[^0-9]/g,'')}`" target="_blank"
              class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs transition-all"
              style="background: linear-gradient(135deg, #25D366, #128C7E);">
              <MessageCircle :size="13" />
            </a>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.pages > 1" class="flex justify-center gap-2 pt-4">
        <button v-for="p in pagination.pages" :key="p"
          @click="pagination.page = p; fetchEnquiries()"
          class="w-9 h-9 rounded-xl text-sm font-bold transition-all"
          :style="pagination.page === p
            ? 'background: linear-gradient(135deg, #1C2D5E, #2A4E9A); color: #fff;'
            : 'background: #fff; color: #6B7280; border: 1.5px solid rgba(28,45,94,0.12);'">
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Detail modal (unchanged logic, styled) -->
    <UModal v-model:open="detailOpen" title="Enquiry Detail" :ui="{ content: 'max-w-lg' }">
      <template #body>
        <div v-if="selectedEnq" class="space-y-4">
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><p class="text-xs text-gray-400 mb-0.5">Name</p><p class="font-semibold">{{ selectedEnq.name }}</p></div>
            <div><p class="text-xs text-gray-400 mb-0.5">Phone</p><a :href="`tel:${selectedEnq.phone}`" class="font-semibold" style="color: #2EAB31;">{{ selectedEnq.phone }}</a></div>
            <div v-if="selectedEnq.email"><p class="text-xs text-gray-400 mb-0.5">Email</p><p class="font-semibold">{{ selectedEnq.email }}</p></div>
            <div><p class="text-xs text-gray-400 mb-0.5">Test interest</p><p class="font-semibold">{{ selectedEnq.testInterest || '—' }}</p></div>
            <div><p class="text-xs text-gray-400 mb-0.5">Received</p><p class="font-semibold">{{ formatDate(selectedEnq.createdAt) }}</p></div>
          </div>
          <div v-if="selectedEnq.message">
            <p class="text-xs text-gray-400 mb-1">Message</p>
            <p class="text-sm text-gray-700 rounded-xl p-3" style="background: #F4F9FF;">{{ selectedEnq.message }}</p>
          </div>
          <UFormField label="Status">
            <select v-model="editStatus"
              class="w-full px-3 py-2 rounded-xl text-sm outline-none appearance-none cursor-pointer"
              style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); color: #111827; font-family: var(--font-body);"
              onfocus="this.style.borderColor='rgba(46,171,49,0.5)'"
              onblur="this.style.borderColor='rgba(28,45,94,0.1)'">
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
            </select>
          </UFormField>
          <UFormField label="Admin note">
            <UTextarea v-model="editNote" :rows="2" placeholder="Internal note…" class="w-full" />
          </UFormField>
          <div class="flex gap-3 pt-1">
            <UButton @click="deleteEnquiry(selectedEnq._id)" variant="ghost" color="error" size="sm"><Trash2 :size="14" /> Delete</UButton>
            <div class="flex-1" />
            <UButton @click="detailOpen = false" variant="outline" color="neutral">Cancel</UButton>
            <UButton @click="updateEnquiry" :loading="saving" color="primary" class="font-[family-name:var(--font-heading)] font-semibold">Save</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { Phone, MessageCircle, Trash2 } from 'lucide-vue-next'
definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: 'Enquiries — Vigsan Admin' })
const { get, put, del } = useApi()
const enquiries = ref<any[]>([]); const loading = ref(true); const saving = ref(false)
const filterStatus = ref('all'); const detailOpen = ref(false); const selectedEnq = ref<any>(null)
const editStatus = ref(''); const editNote = ref('')
const enquiryStats = ref<any>({ total: 0, pending: 0, contacted: 0, resolved: 0 })
const pagination = reactive({ page: 1, pages: 1, total: 0 })
const statusFilters = [
  { value: 'all',       label: 'All enquiries', statKey: 'total',     color: '#111827'  },
  { value: 'pending',   label: 'Pending',        statKey: 'pending',   color: '#D97706'  },
  { value: 'contacted', label: 'Contacted',      statKey: 'contacted', color: '#2A4E9A'  },
  { value: 'resolved',  label: 'Resolved',       statKey: 'resolved',  color: '#2EAB31'  },
]
const formatDate = (d: string) => new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const fetchEnquiries = async () => {
  loading.value = true
  try {
    const params: Record<string, string> = { page: String(pagination.page), limit: '15' }
    if (filterStatus.value !== 'all') params.status = filterStatus.value
    const res = await get<any>('/enquiries', params)
    enquiries.value = res.enquiries; pagination.pages = res.pages; pagination.total = res.total
  } catch (e) { console.error(e) } finally { loading.value = false }
}
const loadStats = async () => { try { enquiryStats.value = await get<any>('/enquiries/stats') } catch {} }
const openDetail = (enq: any) => { selectedEnq.value = enq; editStatus.value = enq.status; editNote.value = enq.adminNote || ''; detailOpen.value = true }
const updateEnquiry = async () => {
  saving.value = true
  try {
    const updated = await put<any>(`/enquiries/${selectedEnq.value._id}`, { status: editStatus.value, adminNote: editNote.value })
    const idx = enquiries.value.findIndex(e => e._id === selectedEnq.value._id)
    if (idx > -1) enquiries.value[idx] = updated; detailOpen.value = false; await loadStats()
  } catch (e: any) { alert(e.message) } finally { saving.value = false }
}
const deleteEnquiry = async (id: string) => {
  if (!confirm('Delete this enquiry?')) return
  try {
    await del(`/enquiries/${id}`); enquiries.value = enquiries.value.filter(e => e._id !== id)
    pagination.total--; detailOpen.value = false; await loadStats()
  } catch (e: any) { alert(e.message) }
}
onMounted(async () => { await Promise.all([fetchEnquiries(), loadStats()]) })
</script>
