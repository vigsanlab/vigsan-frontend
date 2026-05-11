<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <p class="section-label mb-2">Manage</p>
        <h2 class="font-[family-name:var(--font-heading)] font-black text-2xl" style="color: #1C2D5E;">Tests & Packages</h2>
        <p class="text-sm text-gray-400 mt-0.5">{{ tests.length }} total tests in catalogue</p>
      </div>
      <button @click="openModal()"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all btn-green-glow"
        style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
        <Plus :size="15" /> Add Test
      </button>
    </div>

    <!-- Filter bar -->
    <div class="card p-4 mb-5 flex flex-col sm:flex-row gap-3 flex-wrap">
      <div class="relative flex-1 max-w-xs">
        <Search :size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: #9BAED6;" />
        <input v-model="search" placeholder="Search tests…"
          class="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
          style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;" />
      </div>
      <select v-model="filterCat"
        class="px-3 py-2.5 rounded-xl text-sm outline-none"
        style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); color: #111827; min-width: 160px;">
        <option value="">All categories</option>
        <option v-for="c in categories" :key="c" :value="c" class="capitalize">{{ c }}</option>
      </select>
      <label class="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none px-1">
        <input type="checkbox" v-model="showInactive" class="rounded" /> Show inactive
      </label>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div v-if="loading" class="p-10 text-center text-sm text-gray-400">Loading tests…</div>
      <div v-else-if="!filteredTests.length" class="p-10 text-center text-sm text-gray-400">No tests found.</div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead style="background: #F4F9FF; border-bottom: 1px solid rgba(28,45,94,0.07);">
            <tr>
              <th class="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">Test name</th>
              <th class="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider hidden md:table-cell" style="color: #6B7280;">Category</th>
              <th class="text-right px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">MRP</th>
              <th class="text-right px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">Price</th>
              <th class="text-right px-4 py-3.5 text-xs font-bold uppercase tracking-wider hidden sm:table-cell" style="color: #6B7280;">Disc.</th>
              <th class="text-center px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">Status</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="test in filteredTests" :key="test._id"
              class="transition-colors border-b"
              style="border-color: rgba(28,45,94,0.05);"
              onmouseenter="this.style.background='#F4F9FF'"
              onmouseleave="this.style.background='transparent'">
              <td class="px-5 py-4">
                <p class="font-semibold text-gray-900 leading-tight">{{ test.name }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ test.parameterCount }} params · {{ test.turnaroundTime }}</p>
              </td>
              <td class="px-4 py-4 hidden md:table-cell">
                <span class="px-2.5 py-0.5 rounded-lg text-xs font-bold capitalize"
                  style="background: #EEF1F8; color: #1C2D5E;">{{ test.category }}</span>
              </td>
              <td class="px-4 py-4 text-right text-xs text-gray-400"><s>₹{{ test.mrp }}</s></td>
              <td class="px-4 py-4 text-right font-bold" style="color: #2EAB31;">₹{{ test.price }}</td>
              <td class="px-4 py-4 text-right hidden sm:table-cell">
                <span v-if="test.discountPercent > 0"
                  class="px-2 py-0.5 rounded-lg text-xs font-bold"
                  style="background: #FEF3C7; color: #D97706;">{{ test.discountPercent }}%</span>
                <span v-else class="text-gray-300 text-xs">—</span>
              </td>
              <td class="px-4 py-4 text-center">
                <button @click="toggleActive(test)"
                  class="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                  :style="test.isActive
                    ? 'background: #EDFAEE; color: #2EAB31;'
                    : 'background: #FEF2F2; color: #DC2626;'">
                  {{ test.isActive ? 'Active' : 'Inactive' }}
                </button>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1.5 justify-end">
                  <button @click="openModal(test)"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style="color: #6B7280;"
                    onmouseenter="this.style.background='#EEF1F8'; this.style.color='#1C2D5E'"
                    onmouseleave="this.style.background='transparent'; this.style.color='#6B7280'">
                    <Pencil :size="13" />
                  </button>
                  <button @click="deleteTarget = test"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style="color: #6B7280;"
                    onmouseenter="this.style.background='#FEF2F2'; this.style.color='#DC2626'"
                    onmouseleave="this.style.background='transparent'; this.style.color='#6B7280'">
                    <Trash2 :size="13" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <UModal v-model:open="showModal" :title="editTest ? 'Edit test' : 'Add new test'" :ui="{ content: 'max-w-2xl' }">
      <template #body>
        <form @submit.prevent="saveTest" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Test name" required>
              <UInput v-model="form.name" required placeholder="e.g. Complete Blood Count" class="w-full" />
            </UFormField>
            <UFormField label="Category" required>
              <select v-model="form.category" required
                class="w-full px-3 py-2 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); color: #111827; font-family: var(--font-body);"
                onfocus="this.style.borderColor='rgba(46,171,49,0.5)'"
                onblur="this.style.borderColor='rgba(28,45,94,0.1)'">
                <option value="" disabled>Select category</option>
                <option v-for="c in categories" :key="c" :value="c" class="capitalize">{{ c }}</option>
              </select>
            </UFormField>
          </div>
          <UFormField label="Description" required>
            <UTextarea v-model="form.description" required :rows="3" placeholder="Describe what this test measures…" class="w-full" />
          </UFormField>
          <UFormField label="Parameters (one per line)">
            <UTextarea v-model="parametersText" :rows="4" placeholder="Hemoglobin&#10;RBC Count&#10;WBC Count" class="w-full font-mono text-xs" />
          </UFormField>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <UFormField label="MRP (₹)" required>
              <UInput v-model.number="form.mrp" type="number" min="0" required placeholder="500" @input="form.price = calcPrice" class="w-full" />
            </UFormField>
            <UFormField label="Discount %">
              <UInput v-model.number="form.discountPercent" type="number" min="0" max="100" placeholder="0" @input="form.price = calcPrice" class="w-full" />
            </UFormField>
            <UFormField label="Final price (₹)">
              <UInput :model-value="calcPrice" readonly class="w-full font-semibold" />
            </UFormField>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Partner lab">
              <UInput v-model="form.partnerLab" placeholder="e.g. SRL Diagnostics" class="w-full" />
            </UFormField>
            <UFormField label="Turnaround time">
              <UInput v-model="form.turnaroundTime" placeholder="24-48 hours" class="w-full" />
            </UFormField>
          </div>
          <div class="flex flex-wrap gap-5">
            <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><UCheckbox v-model="form.fastingRequired" /> Fasting required</label>
            <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><UCheckbox v-model="form.homeCollection" /> Home collection</label>
            <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><UCheckbox v-model="form.isActive" /> Active</label>
            <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><UCheckbox v-model="form.isFeatured" /> Featured</label>
          </div>
          <UAlert v-if="formError" color="error" variant="subtle" :description="formError" />
          <div class="flex gap-3 pt-2">
            <UButton @click="showModal = false" variant="outline" color="neutral" class="flex-1 justify-center">Cancel</UButton>
            <UButton type="submit" :loading="saving" color="primary" class="flex-1 justify-center font-[family-name:var(--font-heading)] font-semibold">
              {{ editTest ? 'Save changes' : 'Create test' }}
            </UButton>
          </div>
        </form>
      </template>
    </UModal>

    <!-- Delete confirm -->
    <UModal v-model:open="showDeleteModal" title="Delete test?">
      <template #body>
        <p class="text-sm text-gray-500 mb-5">Are you sure you want to delete <strong>{{ deleteTarget?.name }}</strong>? This cannot be undone.</p>
        <div class="flex gap-3">
          <UButton @click="deleteTarget = null" variant="outline" color="neutral" class="flex-1 justify-center">Cancel</UButton>
          <UButton @click="doDelete" :loading="saving" color="error" class="flex-1 justify-center">Delete</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, Pencil, Trash2 } from 'lucide-vue-next'
definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: 'Tests — Vigsan Admin' })
const { get, post, put, del } = useApi(); const { invalidate } = useCache()
const tests = ref<any[]>([]); const loading = ref(true)
const search = ref(''); const filterCat = ref(''); const showInactive = ref(false)
const showModal = ref(false); const editTest = ref<any>(null)
const deleteTarget = ref<any>(null)
const showDeleteModal = computed({ get: () => !!deleteTarget.value, set: (v) => { if (!v) deleteTarget.value = null } })
const saving = ref(false); const formError = ref(''); const parametersText = ref('')
const categories = ['blood','thyroid','diabetes','liver','kidney','vitamins','cardiac','package','other']
const defaultForm = () => ({ name:'',category:'',description:'',mrp:0,price:0,discountPercent:0,partnerLab:'',turnaroundTime:'24-48 hours',fastingRequired:false,homeCollection:true,isActive:true,isFeatured:false })
const form = reactive(defaultForm())
const calcPrice = computed(() => form.discountPercent > 0 ? Math.round(form.mrp - (form.mrp * form.discountPercent) / 100) : form.mrp)
const filteredTests = computed(() => {
  let list = tests.value
  if (!showInactive.value) list = list.filter(t => t.isActive)
  if (filterCat.value) list = list.filter(t => t.category === filterCat.value)
  if (search.value) { const q = search.value.toLowerCase(); list = list.filter(t => t.name.toLowerCase().includes(q)) }
  return list
})
const openModal = (test?: any) => {
  formError.value = ''; editTest.value = test ?? null
  Object.assign(form, test ? { ...test } : defaultForm())
  parametersText.value = (test?.parameters || []).join('\n'); showModal.value = true
}
const saveTest = async () => {
  saving.value = true; formError.value = ''
  try {
    const params = parametersText.value.split('\n').map((p: string) => p.trim()).filter(Boolean)
    const payload = { ...form, parameters: params, parameterCount: params.length, price: calcPrice.value }
    if (editTest.value) {
      const updated = await put<any>(`/tests/${editTest.value._id}`, payload)
      const idx = tests.value.findIndex(t => t._id === editTest.value._id)
      if (idx > -1) tests.value[idx] = updated
    } else { const created = await post<any>('/tests', payload); tests.value.unshift(created) }
    invalidate('all-tests'); invalidate('featured-tests'); showModal.value = false
  } catch (e: any) { formError.value = e.message } finally { saving.value = false }
}
const toggleActive = async (test: any) => {
  try {
    const updated = await put<any>(`/tests/${test._id}`, { isActive: !test.isActive })
    const idx = tests.value.findIndex(t => t._id === test._id)
    if (idx > -1) tests.value[idx] = updated; invalidate('all-tests')
  } catch (e: any) { alert(e.message) }
}
const doDelete = async () => {
  if (!deleteTarget.value) return; saving.value = true
  try {
    await del(`/tests/${deleteTarget.value._id}`)
    tests.value = tests.value.filter(t => t._id !== deleteTarget.value._id)
    invalidate('all-tests'); invalidate('featured-tests'); deleteTarget.value = null
  } catch (e: any) { alert(e.message) } finally { saving.value = false }
}
onMounted(async () => {
  try { tests.value = await get<any[]>('/tests/all-admin') } catch (e) { console.error(e) } finally { loading.value = false }
})
</script>