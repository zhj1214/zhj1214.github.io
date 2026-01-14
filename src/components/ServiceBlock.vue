<script setup lang="ts">
import { Zap } from "lucide-vue-next";

defineProps<{
  services: any[];
}>();
</script>

<template>
  <div class="h-full flex flex-col">
    <h2 class="text-lg font-bold mb-4">提供服务</h2>
    <div class="space-y-3">
      <div
        v-for="service in services"
        :key="service.id"
        class="flex items-center p-3 bg-blue-50/50 rounded-xl"
      >
        <span class="text-xl mr-3">{{ service.icon || "🛠️" }}</span>
        <div class="flex-1">
          <div class="text-sm font-bold text-gray-900">{{ service.title }}</div>
          <div
            class="text-[10px] text-gray-500 uppercase tracking-wider font-semibold"
          >
            {{ service.priceRange || "按需报价" }}
          </div>
        </div>
        <Zap class="w-4 h-4 text-blue-400" />
      </div>

      <!-- Fallback -->
      <template v-if="!services?.length">
        <div class="flex items-center p-3 bg-blue-50/50 rounded-xl">
          <span class="text-xl mr-3">🚀</span>
          <div class="flex-1">
            <div class="text-sm font-bold text-gray-900">MVP 交付</div>
            <div class="text-[10px] text-gray-500">按需报价</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
