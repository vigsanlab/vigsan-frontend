<template>
  <div class="flex gap-0 relative">
    <!-- ══ MAIN LIST ═══════════════════════════════════════════════ -->
    <div class="flex-1 min-w-0 transition-all duration-300" :class="drawerOpen ? 'mr-[520px]' : ''">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p class="section-label mb-2">Manage</p>
          <h2 class="font-[family-name:var(--font-heading)] font-black text-2xl" style="color: #1C2D5E;">Tests & Packages</h2>
          <p class="text-sm text-gray-400 mt-0.5">{{ tests.length }} total · {{ tests.filter(t=>t.category==='package').length }} packages</p>
        </div>
        <button @click="openDrawer()"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white btn-green-glow"
          style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);">
          <Plus :size="15" /> Add Test / Package
        </button>
      </div>

      <!-- Filters -->
      <div class="card p-4 mb-5 flex flex-col sm:flex-row gap-3 flex-wrap">
        <div class="relative flex-1 max-w-xs">
          <Search :size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: #9BAED6;" />
          <input v-model="search" placeholder="Search tests…"
            class="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
            style="background: #F4F9FF; border: 1.5px solid rgba(28,45,94,0.1); font-family: var(--font-body); color: #111827;" />
        </div>
        <select v-model="filterCat" class="px-3 py-2.5 rounded-xl text-sm outline-none"
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
        <div v-if="loading" class="p-10 text-center text-sm text-gray-400">Loading…</div>
        <div v-else-if="!filteredTests.length" class="p-10 text-center text-sm text-gray-400">No tests found.</div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead style="background: #F4F9FF; border-bottom: 1px solid rgba(28,45,94,0.07);">
              <tr>
                <th class="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">Name</th>
                <th class="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider hidden md:table-cell" style="color: #6B7280;">Category</th>
                <th class="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider hidden lg:table-cell" style="color: #6B7280;">Contents</th>
                <th class="text-right px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">MRP</th>
                <th class="text-right px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">Price</th>
                <th class="text-center px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style="color: #6B7280;">Status</th>
                <th class="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="test in filteredTests" :key="test._id"
                class="transition-colors border-b cursor-pointer"
                style="border-color: rgba(28,45,94,0.05);"
                @click="openDrawer(test)"
                onmouseenter="this.style.background='#F4F9FF'"
                onmouseleave="this.style.background='transparent'">
                <td class="px-5 py-4">
                  <p class="font-semibold text-gray-900 leading-tight">{{ test.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    {{ test.parameterCount }} params
                    <span v-if="test.subTests?.length"> · {{ test.subTests.length }} sub-tests</span>
                    · {{ test.turnaroundTime }}
                  </p>
                </td>
                <td class="px-4 py-4 hidden md:table-cell">
                  <span class="px-2.5 py-0.5 rounded-lg text-xs font-bold capitalize"
                    style="background: #EEF1F8; color: #1C2D5E;">{{ test.category }}</span>
                  <span v-if="test.category === 'package'"
                    class="ml-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold"
                    style="background: #FEF3C7; color: #D97706;">PKG</span>
                </td>
                <td class="px-4 py-4 hidden lg:table-cell">
                  <div class="flex gap-1 flex-wrap max-w-xs">
                    <span v-for="st in (test.subTests || []).slice(0,3)" :key="st._id"
                      class="px-2 py-0.5 rounded text-xs"
                      style="background: rgba(28,45,94,0.06); color: #6B7280;">{{ st.name }}</span>
                    <span v-if="(test.subTests||[]).length > 3"
                      class="px-2 py-0.5 rounded text-xs" style="color: #9CA3AF;">
                      +{{ test.subTests.length - 3 }} more
                    </span>
                    <span v-if="!(test.subTests||[]).length && test.parameters?.length"
                      class="text-xs text-gray-400">{{ test.parameters.slice(0,2).join(', ') }}{{ test.parameters.length > 2 ? '…' : '' }}</span>
                  </div>
                </td>
                <td class="px-4 py-4 text-right text-xs text-gray-400"><s>₹{{ test.mrp }}</s></td>
                <td class="px-4 py-4 text-right font-bold" style="color: #2EAB31;">₹{{ test.price }}</td>
                <td class="px-4 py-4 text-center" @click.stop>
                  <button @click="toggleActive(test)"
                    class="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    :style="test.isActive ? 'background:#EDFAEE;color:#2EAB31;' : 'background:#FEF2F2;color:#DC2626;'">
                    {{ test.isActive ? 'Active' : 'Inactive' }}
                  </button>
                </td>
                <td class="px-4 py-4" @click.stop>
                  <button @click="deleteTarget = test"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all ml-auto"
                    style="color: #6B7280;"
                    onmouseenter="this.style.background='#FEF2F2'; this.style.color='#DC2626'"
                    onmouseleave="this.style.background='transparent'; this.style.color='#6B7280'">
                    <Trash2 :size="13" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══ SIDE DRAWER ════════════════════════════════════════════ -->
    <Transition name="drawer">
      <div v-if="drawerOpen"
        class="fixed top-0 right-0 h-full z-40 bg-white shadow-2xl flex flex-col"
        style="width: 520px; border-left: 1px solid rgba(28,45,94,0.1);">

        <!-- Drawer header -->
        <div class="flex items-center justify-between px-6 py-4 border-b" style="border-color: rgba(28,45,94,0.08);">
          <div>
            <h3 class="font-[family-name:var(--font-heading)] font-black text-lg" style="color: #1C2D5E;">
              {{ editTest ? 'Edit' : 'New' }} {{ form.category === 'package' ? 'Package' : 'Test' }}
            </h3>
            <p class="text-xs text-gray-400 mt-0.5">{{ editTest ? editTest.name : 'Fill details below' }}</p>
          </div>
          <button @click="closeDrawer" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style="color: #6B7280; background: #F4F9FF;" onmouseenter="this.style.background='#FEF2F2';this.style.color='#DC2626'" onmouseleave="this.style.background='#F4F9FF';this.style.color='#6B7280'">
            <X :size="16" />
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b px-6 gap-1" style="border-color: rgba(28,45,94,0.08); background: #FAFBFF;">
          <button v-for="tab in visibleTabs" :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5"
            :style="activeTab === tab.id
              ? 'border-color: #2EAB31; color: #1C2D5E;'
              : 'border-color: transparent; color: #9CA3AF;'">
            <component :is="tab.icon" :size="12" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Scrollable form body -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          <!-- ── TAB: BASIC INFO ── -->
          <div v-show="activeTab === 'basic'" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="field-label">Test / Package Name *</label>
                <input v-model="form.name" required placeholder="e.g. Full Body Health Checkup"
                  class="field-input w-full" />
              </div>
              <div>
                <label class="field-label">Category *</label>
                <select v-model="form.category" class="field-input w-full appearance-none cursor-pointer">
                  <option value="" disabled>Select category</option>
                  <option v-for="c in categories" :key="c" :value="c" class="capitalize">{{ c }}</option>
                </select>
              </div>
              <div>
                <label class="field-label">Sample Type</label>
                <select v-model="form.sampleType" class="field-input w-full appearance-none cursor-pointer">
                  <option v-for="s in sampleTypes" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="field-label">Short Intro <span class="text-gray-400 font-normal">(shown on cards, max 120 chars)</span></label>
              <input v-model="form.shortIntro" placeholder="e.g. Comprehensive 77-parameter panel for complete health assessment"
                class="field-input w-full" maxlength="150" />
              <p class="text-xs text-gray-400 mt-1 text-right">{{ (form.shortIntro||'').length }}/150</p>
            </div>

            <div>
              <label class="field-label">Description *</label>
              <textarea v-model="form.description" required rows="3" placeholder="Full description paragraph shown on the detail page…"
                class="field-input w-full resize-none" />
            </div>

            <div>
              <label class="field-label">Full Details <span class="text-gray-400 font-normal">(long-form, supports paragraphs)</span></label>
              <textarea v-model="form.fullDetails" rows="5" placeholder="Detailed explanation of what this test/package covers, what the results mean, who should get it…"
                class="field-input w-full resize-y font-mono text-xs" />
            </div>

            <div>
              <label class="field-label">Why Take This? <span class="text-gray-400 font-normal">(one bullet per line)</span></label>
              <textarea v-model="whyTakeText" rows="4" placeholder="Recommended for annual health screening&#10;Ideal if you have fatigue or weakness&#10;Essential before starting medication"
                class="field-input w-full resize-none font-mono text-xs" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Partner Lab</label>
                <input v-model="form.partnerLab" placeholder="e.g. SRL Diagnostics" class="field-input w-full" />
              </div>
              <div>
                <label class="field-label">Turnaround Time</label>
                <input v-model="form.turnaroundTime" placeholder="24-48 hours" class="field-input w-full" />
              </div>
              <div>
                <label class="field-label">Report Format</label>
                <select v-model="form.reportFormat" class="field-input w-full appearance-none cursor-pointer">
                  <option>PDF</option><option>Online</option><option>PDF + Online</option>
                </select>
              </div>
            </div>

            <!-- Pricing -->
            <div class="p-4 rounded-2xl" style="background: #F4F9FF; border: 1px solid rgba(28,45,94,0.08);">
              <p class="text-xs font-bold uppercase tracking-wider mb-3" style="color: #1C2D5E;">Pricing</p>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="field-label">MRP (₹) *</label>
                  <input v-model.number="form.mrp" type="number" min="0" required placeholder="1999" class="field-input w-full" />
                </div>
                <div>
                  <label class="field-label">Discount %</label>
                  <input v-model.number="form.discountPercent" type="number" min="0" max="100" placeholder="0" class="field-input w-full" />
                </div>
                <div>
                  <label class="field-label">Final Price (₹)</label>
                  <input :value="calcPrice" readonly class="field-input w-full font-bold" style="color: #2EAB31;" />
                </div>
              </div>
            </div>

            <!-- Flags -->
            <div class="flex flex-wrap gap-4">
              <label v-for="flag in flags" :key="flag.key"
                class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" v-model="(form as any)[flag.key]" class="rounded" />
                {{ flag.label }}
              </label>
            </div>
          </div>

          <!-- ── TAB: PARAMETERS (flat, for simple tests) ── -->
          <div v-show="activeTab === 'params'" class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-bold" style="color: #1C2D5E;">Test Parameters</p>
                <p class="text-xs text-gray-400 mt-0.5">For simple tests (not packages). One parameter per line.</p>
              </div>
              <span class="px-3 py-1 rounded-lg text-xs font-bold" style="background: #EDFAEE; color: #2EAB31;">
                {{ flatParamCount }} params
              </span>
            </div>
            <textarea v-model="parametersText" rows="14"
              placeholder="Hemoglobin (Hb)&#10;RBC Count&#10;WBC Count&#10;Platelet Count&#10;MCV&#10;MCH&#10;MCHC&#10;Hematocrit (PCV)"
              class="field-input w-full resize-y font-mono text-xs" />
            <p class="text-xs text-gray-400">
              💡 For packages, use the <strong>Sub-tests</strong> tab instead — it lets you group parameters under named test panels.
            </p>
          </div>

          <!-- ── TAB: PREPARATION ── -->
          <div v-show="activeTab === 'prep'" class="space-y-4">
            <div>
              <label class="field-label">Preparation Instructions</label>
              <textarea v-model="form.preparation" rows="6"
                placeholder="e.g. Fast for 10–12 hours before sample collection. You may drink plain water. Avoid heavy meals the previous night. Continue regular medications unless advised otherwise."
                class="field-input w-full resize-y" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="flex items-center gap-2 text-sm font-bold cursor-pointer mb-2" style="color: #1C2D5E;">
                  <input type="checkbox" v-model="form.fastingRequired" class="rounded" /> Fasting Required
                </label>
              </div>
              <div v-if="form.fastingRequired">
                <label class="field-label">Fasting Hours</label>
                <input v-model.number="form.fastingHours" type="number" min="0" max="24" placeholder="10"
                  class="field-input w-full" />
              </div>
            </div>
          </div>

          <!-- ── TAB: SUB-TESTS (for packages) ── -->
          <div v-show="activeTab === 'subtests'" class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-bold" style="color: #1C2D5E;">Package Sub-tests</p>
                <p class="text-xs text-gray-400 mt-0.5">Each sub-test is a named panel with its own parameters.</p>
              </div>
              <button @click="addSubTest"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">
                <Plus :size="12" /> Add Panel
              </button>
            </div>

            <div v-if="!form.subTests?.length" class="text-center py-8 text-gray-400 text-sm">
              No sub-tests added yet.<br />
              <span class="text-xs">Click "Add Panel" to add a test group (e.g. CBC, LFT, KFT).</span>
            </div>

            <div v-for="(st, idx) in form.subTests" :key="idx"
              class="rounded-2xl overflow-hidden"
              style="border: 1.5px solid rgba(28,45,94,0.1);">
              <!-- Sub-test header -->
              <div class="flex items-center gap-3 px-4 py-3" style="background: #F4F9FF;">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style="background: linear-gradient(135deg, #1C2D5E, #2A4E9A);">{{ idx + 1 }}</div>
                <input v-model="st.name" placeholder="Panel name (e.g. Complete Blood Count)"
                  class="flex-1 text-sm font-semibold bg-transparent outline-none" style="color: #1C2D5E;" />
                <span class="text-xs text-gray-400 flex-shrink-0">{{ (st.parameters||[]).length }} params</span>
                <button @click="removeSubTest(idx)"
                  class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style="color: #9CA3AF;" onmouseenter="this.style.color='#DC2626'" onmouseleave="this.style.color='#9CA3AF'">
                  <X :size="12" />
                </button>
              </div>
              <!-- Parameters for this sub-test -->
              <div class="px-4 py-3">
                <p class="text-xs font-semibold text-gray-400 mb-2">Parameters (one per line)</p>
                <textarea
                  :value="(st.parameters||[]).join('\n')"
                  @input="updateSubTestParams(idx, ($event.target as HTMLTextAreaElement).value)"
                  rows="4" placeholder="Hemoglobin&#10;RBC Count&#10;WBC Count"
                  class="field-input w-full resize-y font-mono text-xs" />
              </div>
            </div>

            <!-- Total count -->
            <div v-if="form.subTests?.length" class="flex items-center justify-between px-4 py-3 rounded-xl"
              style="background: #EDFAEE; border: 1px solid rgba(46,171,49,0.2);">
              <p class="text-sm font-bold" style="color: #2EAB31;">
                {{ form.subTests.length }} panels · {{ totalSubTestParams }} total parameters
              </p>
              <span class="text-xs text-gray-500">Will auto-populate parameterCount</span>
            </div>
          </div>

          <!-- ── TAB: DETAIL TABLE ── -->
          <div v-show="activeTab === 'table'" class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-bold" style="color: #1C2D5E;">Detail Table</p>
                <p class="text-xs text-gray-400 mt-0.5">Optional table shown on the public detail page (e.g. normal ranges, test codes).</p>
              </div>
              <label class="flex items-center gap-2 text-xs font-bold cursor-pointer" style="color: #1C2D5E;">
                <input type="checkbox" v-model="showDetailTable" class="rounded" /> Enable
              </label>
            </div>

            <div v-if="showDetailTable" class="space-y-4">
              <div>
                <label class="field-label">Table Title</label>
                <input v-model="form.detailTable!.title" placeholder="e.g. Reference Ranges"
                  class="field-input w-full" />
              </div>

              <!-- Column headers -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="field-label mb-0">Column Headers</label>
                  <button @click="addTableColumn"
                    class="text-xs font-bold px-2.5 py-1 rounded-lg transition-all"
                    style="background: #EEF1F8; color: #1C2D5E;">+ Column</button>
                </div>
                <div class="flex gap-2 flex-wrap">
                  <div v-for="(h, i) in form.detailTable!.headers" :key="i" class="flex items-center gap-1">
                    <input v-model="form.detailTable!.headers[i]" :placeholder="`Col ${i+1}`"
                      class="field-input text-xs w-28" />
                    <button @click="removeTableColumn(i)"
                      class="text-gray-400 hover:text-red-500 transition-colors"><X :size="12" /></button>
                  </div>
                </div>
              </div>

              <!-- Rows -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="field-label mb-0">Rows</label>
                  <button @click="addTableRow"
                    class="text-xs font-bold px-2.5 py-1 rounded-lg transition-all"
                    style="background: #EEF1F8; color: #1C2D5E;">+ Row</button>
                </div>
                <div class="overflow-x-auto rounded-xl border" style="border-color: rgba(28,45,94,0.1);">
                  <table class="w-full text-xs">
                    <thead style="background: #F4F9FF;">
                      <tr>
                        <th v-for="h in form.detailTable!.headers" :key="h"
                          class="px-3 py-2 text-left font-bold" style="color: #1C2D5E;">{{ h || '—' }}</th>
                        <th class="w-8" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, ri) in form.detailTable!.rows" :key="ri"
                        class="border-t" style="border-color: rgba(28,45,94,0.05);">
                        <td v-for="(cell, ci) in row" :key="ci" class="px-2 py-1.5">
                          <input v-model="form.detailTable!.rows[ri][ci]" :placeholder="form.detailTable!.headers[ci] || ''"
                            class="field-input text-xs w-full" />
                        </td>
                        <td class="px-2 py-1.5">
                          <button @click="removeTableRow(ri)" class="text-gray-300 hover:text-red-500 transition-colors"><X :size="11" /></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="!form.detailTable!.rows.length" class="py-4 text-center text-xs text-gray-400">No rows yet. Click "+ Row".</div>
                </div>
              </div>
            </div>
            <div v-else class="py-8 text-center text-sm text-gray-400">
              Enable the detail table to add tabular data to the public page.
            </div>
          </div>
        </div>

        <!-- Drawer footer -->
        <div class="px-6 py-4 border-t flex gap-3" style="border-color: rgba(28,45,94,0.08); background: #FAFBFF;">
          <UAlert v-if="formError" color="error" variant="subtle" :description="formError" class="flex-1 text-xs" />
          <div class="flex gap-3 w-full">
            <button @click="closeDrawer" class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style="background: #F4F9FF; color: #6B7280; border: 1.5px solid rgba(28,45,94,0.1);">Cancel</button>
            <button @click="saveTest" :disabled="saving"
              class="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all btn-green-glow"
              style="background: linear-gradient(135deg, #2EAB31, #239126); font-family: var(--font-heading);"
              :style="saving ? 'opacity:0.7' : ''">
              {{ saving ? 'Saving…' : editTest ? 'Save Changes' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition name="fade">
      <div v-if="drawerOpen" @click="closeDrawer"
        class="fixed inset-0 z-30 md:hidden"
        style="background: rgba(0,0,0,0.4);" />
    </Transition>

    <!-- Delete confirm modal -->
    <UModal v-model:open="showDeleteModal" title="Delete test?">
      <template #body>
        <p class="text-sm text-gray-500 mb-5">Delete <strong>{{ deleteTarget?.name }}</strong>? This cannot be undone.</p>
        <div class="flex gap-3">
          <UButton @click="deleteTarget = null" variant="outline" color="neutral" class="flex-1 justify-center">Cancel</UButton>
          <UButton @click="doDelete" :loading="saving" color="error" class="flex-1 justify-center">Delete</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, Trash2, X, Info, List, FlaskConical, Table, Settings, ClipboardList } from 'lucide-vue-next'
definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: 'Tests — Vigsan Admin' })
const { get, post, put, del } = useApi(); const { invalidate } = useCache()

// ── List state ────────────────────────────────────────────────
const tests = ref<any[]>([]); const loading = ref(true)
const search = ref(''); const filterCat = ref(''); const showInactive = ref(false)
const deleteTarget = ref<any>(null)
const showDeleteModal = computed({ get: () => !!deleteTarget.value, set: v => { if (!v) deleteTarget.value = null } })
const saving = ref(false); const formError = ref('')

// ── Drawer state ──────────────────────────────────────────────
const drawerOpen = ref(false)
const activeTab = ref('basic')
const editTest = ref<any>(null)

// ── Tabs ──────────────────────────────────────────────────────
const allTabs = [
  { id: 'basic',    label: 'Basic Info',  icon: Info          },
  { id: 'params',   label: 'Parameters',  icon: List          },
  { id: 'subtests', label: 'Sub-tests',   icon: FlaskConical  },
  { id: 'prep',     label: 'Preparation', icon: ClipboardList },
  { id: 'table',    label: 'Detail Table',icon: Table         },
]
const visibleTabs = computed(() => {
  if (form.category === 'package') return allTabs.filter(t => t.id !== 'params')
  return allTabs.filter(t => t.id !== 'subtests')
})

// ── Form ──────────────────────────────────────────────────────
const categories = ['blood','thyroid','diabetes','liver','kidney','vitamins','cardiac','package','other']
const sampleTypes = ['Blood','Urine','Stool','Swab','Saliva','Hair','Skin','Other']
const flags = [
  { key: 'fastingRequired', label: 'Fasting required' },
  { key: 'homeCollection',  label: 'Home collection'  },
  { key: 'isActive',        label: 'Active'            },
  { key: 'isFeatured',      label: 'Featured'          },
]

const defaultForm = () => ({
  name: '', category: '', shortIntro: '', description: '', fullDetails: '',
  whyTakeThis: [] as string[], sampleType: 'Blood', preparation: '',
  mrp: 0, price: 0, discountPercent: 0,
  partnerLab: '', turnaroundTime: '24-48 hours', reportFormat: 'PDF + Online',
  fastingRequired: false, fastingHours: 0,
  homeCollection: true, isActive: true, isFeatured: false,
  parameters: [] as string[],
  subTests: [] as any[],
  detailTable: null as any,
})

const form = reactive(defaultForm())
const parametersText = ref('')
const whyTakeText = ref('')
const showDetailTable = ref(false)

const calcPrice = computed(() =>
  form.discountPercent > 0 ? Math.round(form.mrp - (form.mrp * form.discountPercent) / 100) : form.mrp
)
const flatParamCount = computed(() => parametersText.value.split('\n').filter(l => l.trim()).length)
const totalSubTestParams = computed(() =>
  (form.subTests || []).reduce((sum: number, st: any) => sum + (st.parameters?.length || 0), 0)
)

// ── Drawer open/close ─────────────────────────────────────────
const openDrawer = (test?: any) => {
  formError.value = ''
  editTest.value = test ?? null
  activeTab.value = 'basic'
  if (test) {
    Object.assign(form, { ...defaultForm(), ...test })
    parametersText.value = (test.parameters || []).join('\n')
    whyTakeText.value = (test.whyTakeThis || []).join('\n')
    showDetailTable.value = !!test.detailTable
    if (!form.detailTable) form.detailTable = { title: '', headers: [], rows: [] }
    if (!form.subTests) form.subTests = []
  } else {
    Object.assign(form, defaultForm())
    parametersText.value = ''
    whyTakeText.value = ''
    showDetailTable.value = false
    form.detailTable = { title: '', headers: [], rows: [] }
    form.subTests = []
  }
  drawerOpen.value = true
}
const closeDrawer = () => { drawerOpen.value = false; editTest.value = null }

// ── Sub-test helpers ──────────────────────────────────────────
const addSubTest = () => { form.subTests = [...(form.subTests || []), { name: '', parameters: [], parameterCount: 0 }] }
const removeSubTest = (idx: number) => { form.subTests.splice(idx, 1) }
const updateSubTestParams = (idx: number, val: string) => {
  const params = val.split('\n').map((p: string) => p.trim()).filter(Boolean)
  form.subTests[idx].parameters = params
  form.subTests[idx].parameterCount = params.length
}

// ── Detail table helpers ──────────────────────────────────────
const addTableColumn = () => {
  form.detailTable.headers.push('')
  form.detailTable.rows.forEach((r: string[]) => r.push(''))
}
const removeTableColumn = (i: number) => {
  form.detailTable.headers.splice(i, 1)
  form.detailTable.rows.forEach((r: string[]) => r.splice(i, 1))
}
const addTableRow = () => {
  form.detailTable.rows.push(form.detailTable.headers.map(() => ''))
}
const removeTableRow = (i: number) => { form.detailTable.rows.splice(i, 1) }

// ── Save ──────────────────────────────────────────────────────
const saveTest = async () => {
  saving.value = true; formError.value = ''
  try {
    const params = parametersText.value.split('\n').map((p: string) => p.trim()).filter(Boolean)
    const why = whyTakeText.value.split('\n').map((p: string) => p.trim()).filter(Boolean)
    const subTests = (form.subTests || []).map((st: any) => ({
      ...st,
      parameterCount: (st.parameters || []).length,
    }))
    const payload: any = {
      ...form,
      parameters: params,
      parameterCount: form.category === 'package'
        ? subTests.reduce((s: number, st: any) => s + st.parameterCount, 0)
        : params.length,
      whyTakeThis: why,
      price: calcPrice.value,
      subTests,
      detailTable: showDetailTable.value ? form.detailTable : null,
    }
    if (editTest.value) {
      const updated = await put<any>(`/tests/${editTest.value._id}`, payload)
      const idx = tests.value.findIndex(t => t._id === editTest.value._id)
      if (idx > -1) tests.value[idx] = updated
    } else {
      const created = await post<any>('/tests', payload)
      tests.value.unshift(created)
    }
    invalidate('all-tests'); invalidate('featured-tests'); invalidate(`test-${payload.slug}`)
    closeDrawer()
  } catch (e: any) { formError.value = e.message }
  finally { saving.value = false }
}

// ── List actions ──────────────────────────────────────────────
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
const filteredTests = computed(() => {
  let list = tests.value
  if (!showInactive.value) list = list.filter(t => t.isActive)
  if (filterCat.value) list = list.filter(t => t.category === filterCat.value)
  if (search.value) { const q = search.value.toLowerCase(); list = list.filter(t => t.name.toLowerCase().includes(q)) }
  return list
})
onMounted(async () => {
  try { tests.value = await get<any[]>('/tests/all-admin') }
  catch (e) { console.error(e) } finally { loading.value = false }
})
</script>

<style scoped>
.field-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #1C2D5E;
}
.field-input {
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
  background: #F4F9FF;
  border: 1.5px solid rgba(28,45,94,0.1);
  font-family: var(--font-body);
  color: #111827;
  width: 100%;
}
.field-input:focus {
  border-color: rgba(46,171,49,0.5);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(46,171,49,0.08);
}
.drawer-enter-active, .drawer-leave-active { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }
</style>