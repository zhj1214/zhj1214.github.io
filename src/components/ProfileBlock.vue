<script setup lang="ts">
import { Github, Mail, MessageSquare } from 'lucide-vue-next'

defineProps<{
  profile: any
}>()
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex items-center space-x-4 mb-6">
      <img
        :src="profile?.avatar || 'https://via.placeholder.com/150'"
        class="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-white"
      />
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{ profile?.name || 'Sunflower' }}</h1>
        <p class="text-sm text-blue-600 font-medium">{{ profile?.title || '10年全栈专家' }}</p>
      </div>
    </div>

    <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
      {{ profile?.bio || '助力初创团队用最快、最省钱的方式把 AI 想法落地。' }}
    </p>

    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="skill in profile?.skills?.slice(0, 5)"
        :key="skill"
        class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full"
      >
        {{ skill }}
      </span>
    </div>

    <div class="flex items-center space-x-4">
      <a :href="profile?.socialLinks?.github" target="_blank" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
        <Github class="w-5 h-5 text-gray-700" />
      </a>
      <a :href="'mailto:' + profile?.socialLinks?.email" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
        <Mail class="w-5 h-5 text-gray-700" />
      </a>
      <div class="flex-1"></div>
      <button @click="$emit('scroll-to-inquiry')" class="px-4 py-2 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center">
        <MessageSquare class="w-4 h-4 mr-2" />
        咨询我
      </button>
    </div>
  </div>
</template>
