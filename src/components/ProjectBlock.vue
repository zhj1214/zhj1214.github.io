<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'

defineProps<{
  projects: any[]
}>()
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">精选案例</h2>
      <span class="text-xs text-gray-400 font-medium">{{ projects?.length || 0 }} Projects</span>
    </div>

    <div class="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
      <div
        v-for="project in projects"
        :key="project.id"
        class="group p-4 bg-gray-50 rounded-2xl hover:bg-white hover:ring-1 hover:ring-gray-100 hover:shadow-sm transition-all"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-sm text-gray-900">{{ project.title }}</h3>
          <a v-if="project.link" :href="project.link" target="_blank" class="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink class="w-4 h-4 text-gray-400" />
          </a>
        </div>
        <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tech in project.techStack?.slice(0, 3)"
            :key="tech"
            class="px-2 py-0.5 bg-white border border-gray-100 text-[10px] text-gray-500 rounded-md"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
</style>
