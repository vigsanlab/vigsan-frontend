<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <p class="section-label mb-2">Manage</p>
        <h2 class="font-[family-name:var(--font-heading)] font-black text-2xl" style="color: #1C2D5E;">Gallery & Images</h2>
        <p class="text-sm text-gray-400 mt-0.5">{{ images.length }} images uploaded</p>
      </div>
      <button @click="showUpload = true"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white btn-green-glow"
        style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
        <Upload :size="15" /> Upload Image
      </button>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="skeleton h-48" />
    </div>

    <div v-else-if="!images.length" class="card p-16 text-center">
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style="background: #EEF1F8;">
        <ImageOff :size="32" style="color: #9BAED6;" />
      </div>
      <p class="font-[family-name:var(--font-heading)] font-bold text-gray-400 mb-4">No images uploaded yet.</p>
      <button @click="showUpload = true"
        class="px-5 py-2.5 rounded-xl text-sm font-bold text-white btn-green-glow"
        style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
        Upload first image
      </button>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="img in images" :key="img._id" class="card group overflow-hidden">
        <div class="relative overflow-hidden bg-gray-100" style="padding-top:66%">
          <img :src="`${apiBase}/images/${img._id}/file`" :alt="img.caption || 'Lab image'"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy" />
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
            style="background: rgba(28,45,94,0.55);">
            <button @click="editImage(img)"
              class="w-9 h-9 rounded-xl flex items-center justify-center text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
              <Pencil :size="14" />
            </button>
            <button @click="confirmDelete(img)"
              class="w-9 h-9 rounded-xl flex items-center justify-center text-white bg-red-500/70 backdrop-blur-sm hover:bg-red-500 transition-all">
              <Trash2 :size="14" />
            </button>
          </div>
          <div v-if="!img.isPublished" class="absolute top-2 left-2">
            <span class="px-2 py-0.5 rounded-lg text-xs font-bold" style="background: #DC2626; color: #fff;">Hidden</span>
          </div>
        </div>
        <div class="p-3 bg-white">
          <p class="text-xs font-semibold text-gray-800 truncate">{{ img.caption || 'No caption' }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ formatDate(img.createdAt) }} · {{ formatSize(img.size) }}</p>
        </div>
      </div>
    </div>

    <!-- Upload modal -->
    <UModal v-model:open="showUpload" title="Upload image" :ui="{ content: 'max-w-md' }">
      <template #body>
        <div class="space-y-4">
          <div @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="onDrop" @click="fileInput?.click()"
            class="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all"
            :style="dragOver ? 'border-color: #2EAB31; background: #EDFAEE;' : 'border-color: rgba(28,45,94,0.15); background: #F4F9FF;'">
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelect" />
            <div v-if="previewUrl">
              <img :src="previewUrl" class="max-h-40 mx-auto rounded-xl object-contain mb-3" />
              <p class="text-xs text-gray-500">{{ selectedFile?.name }}</p>
            </div>
            <div v-else>
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style="background: #EEF1F8;">
                <ImagePlus :size="28" style="color: #9BAED6;" />
              </div>
              <p class="text-sm font-semibold text-gray-600">Click or drag & drop an image</p>
              <p class="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 10 MB</p>
            </div>
          </div>
          <UFormField label="Caption">
            <UInput v-model="uploadCaption" placeholder="e.g. December Offer — 30% off all packages" class="w-full" />
          </UFormField>
          <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <UCheckbox v-model="uploadPublished" /> Publish immediately on public gallery
          </label>
          <UAlert v-if="uploadError" color="error" variant="subtle" :description="uploadError" />
          <div v-if="uploading" class="space-y-1.5">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Uploading…</span><span>{{ uploadProgress }}%</span>
            </div>
            <div class="h-2 rounded-full overflow-hidden" style="background: #EEF1F8;">
              <div class="h-full rounded-full transition-all duration-300" :style="`width:${uploadProgress}%; background: linear-gradient(90deg, #2EAB31, #3EBD41);`" />
            </div>
          </div>
          <div class="flex gap-3 pt-1">
            <UButton @click="showUpload = false" variant="outline" color="neutral" class="flex-1 justify-center">Cancel</UButton>
            <UButton @click="uploadImage" :loading="uploading" :disabled="!selectedFile" color="primary" class="flex-1 justify-center font-[family-name:var(--font-heading)] font-semibold">Upload</UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Edit modal -->
    <UModal v-model:open="editModalOpen" title="Edit image" :ui="{ content: 'max-w-sm' }">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Caption"><UInput v-model="editCaption" placeholder="Caption" class="w-full" /></UFormField>
          <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><UCheckbox v-model="editPublished" /> Published on public gallery</label>
          <div class="flex gap-3">
            <UButton @click="editModalOpen = false" variant="outline" color="neutral" class="flex-1 justify-center">Cancel</UButton>
            <UButton @click="saveEdit" :loading="saving" color="primary" class="flex-1 justify-center font-[family-name:var(--font-heading)] font-semibold">Save</UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Delete confirm -->
    <UModal v-model:open="deleteModalOpen" title="Delete image?">
      <template #body>
        <p class="text-sm text-gray-500 mb-5">Are you sure you want to delete <strong>{{ deleteTarget?.caption || 'this image' }}</strong>? This is permanent.</p>
        <div class="flex gap-3">
          <UButton @click="deleteModalOpen = false" variant="outline" color="neutral" class="flex-1 justify-center">Cancel</UButton>
          <UButton @click="doDelete" :loading="saving" color="error" class="flex-1 justify-center">Delete</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { Upload, ImageOff, ImagePlus, Pencil, Trash2 } from 'lucide-vue-next'
definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: 'Images — Vigsan Admin' })
const { get, put, del, base: apiBase } = useApi(); const { invalidate } = useCache()
const images = ref<any[]>([]); const loading = ref(true); const saving = ref(false)
const showUpload = ref(false); const uploading = ref(false); const uploadProgress = ref(0)
const uploadCaption = ref(''); const uploadPublished = ref(true)
const selectedFile = ref<File | null>(null); const previewUrl = ref(''); const uploadError = ref(''); const dragOver = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const editTarget = ref<any>(null); const editCaption = ref(''); const editPublished = ref(true)
const editModalOpen = computed({ get: () => !!editTarget.value, set: (v) => { if (!v) editTarget.value = null } })
const deleteTarget = ref<any>(null)
const deleteModalOpen = computed({ get: () => !!deleteTarget.value, set: (v) => { if (!v) deleteTarget.value = null } })
const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const formatSize = (bytes: number) => bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`
const onFileSelect = (e: Event) => { const file = (e.target as HTMLInputElement).files?.[0]; if (file) { selectedFile.value = file; previewUrl.value = URL.createObjectURL(file) } }
const onDrop = (e: DragEvent) => { dragOver.value = false; const file = e.dataTransfer?.files[0]; if (file?.type.startsWith('image/')) { selectedFile.value = file; previewUrl.value = URL.createObjectURL(file) } }
const uploadImage = async () => {
  if (!selectedFile.value) return; uploading.value = true; uploadError.value = ''; uploadProgress.value = 10
  try {
    const token = localStorage.getItem('lab_admin_token'); const fd = new FormData()
    fd.append('image', selectedFile.value); fd.append('caption', uploadCaption.value); fd.append('isPublished', String(uploadPublished.value))
    uploadProgress.value = 35
    const res = await fetch(`${apiBase}/images`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    uploadProgress.value = 90
    if (!res.ok) { const e = await res.json(); throw new Error(e.message) }
    const img = await res.json(); images.value.unshift(img); uploadProgress.value = 100; invalidate('gallery-images')
    setTimeout(() => { showUpload.value = false; selectedFile.value = null; previewUrl.value = ''; uploadCaption.value = ''; uploadProgress.value = 0 }, 500)
  } catch (e: any) { uploadError.value = e.message } finally { uploading.value = false }
}
const editImage = (img: any) => { editTarget.value = img; editCaption.value = img.caption; editPublished.value = img.isPublished }
const saveEdit = async () => {
  saving.value = true
  try {
    const updated = await put<any>(`/images/${editTarget.value._id}`, { caption: editCaption.value, isPublished: editPublished.value })
    const idx = images.value.findIndex(i => i._id === editTarget.value._id)
    if (idx > -1) images.value[idx] = updated; invalidate('gallery-images'); editTarget.value = null
  } catch (e: any) { alert(e.message) } finally { saving.value = false }
}
const confirmDelete = (img: any) => { deleteTarget.value = img }
const doDelete = async () => {
  if (!deleteTarget.value) return; saving.value = true
  try {
    await del(`/images/${deleteTarget.value._id}`); images.value = images.value.filter(i => i._id !== deleteTarget.value._id)
    invalidate('gallery-images'); deleteTarget.value = null
  } catch (e: any) { alert(e.message) } finally { saving.value = false }
}
onMounted(async () => { try { images.value = await get<any[]>('/images/all-admin') } catch (e) { console.error(e) } finally { loading.value = false } })
</script>
