<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBrandData } from "@/api/brand";
import BentoCard from "@/components/BentoCard.vue";
import InquiryBlock from "@/components/InquiryBlock.vue";
import ProfileBlock from "@/components/ProfileBlock.vue";
import ProjectBlock from "@/components/ProjectBlock.vue";
import ServiceBlock from "@/components/ServiceBlock.vue";

const brandData = ref<any>(null);
const loading = ref(true);

const loadData = async () => {
  try {
    const res = await getBrandData();
    brandData.value = res;
  } catch (err) {
    console.error("Failed to load brand data:", err);
  } finally {
    loading.value = false;
  }
};

const inquiryRef = ref<any>(null);
const scrollToInquiry = () => {
  inquiryRef.value?.$el.scrollIntoView({ behavior: "smooth" });
};

onMounted(loadData);
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12 md:py-24">
    <!-- Header/Logo (Optional) -->
    <div class="flex items-center space-x-2 mb-12 animate-fade-in">
      <div
        class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shadow-inner"
      >
        <span class="text-xl">🌻</span>
      </div>
      <span class="font-bold tracking-tighter text-2xl">Sunflower</span>
    </div>

    <!-- Bento Grid -->
    <div
      v-if="!loading"
      class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6"
    >
      <!-- Profile: 2x2 -->
      <BentoCard class="md:col-span-2 md:row-span-2">
        <ProfileBlock
          :profile="brandData?.profile"
          @scroll-to-inquiry="scrollToInquiry"
        />
      </BentoCard>

      <!-- Projects: 2x2 -->
      <BentoCard class="md:col-span-2 md:row-span-2 h-[400px] md:h-auto">
        <ProjectBlock :projects="brandData?.projects" />
      </BentoCard>

      <!-- Services: 2x1 -->
      <BentoCard class="md:col-span-2">
        <ServiceBlock :services="brandData?.services" />
      </BentoCard>

      <!-- Inquiry: 2x1 -->
      <BentoCard ref="inquiryRef" class="md:col-span-2 border-2 border-blue-50">
        <InquiryBlock />
      </BentoCard>
    </div>

    <!-- Loading State -->
    <div v-else class="h-96 flex items-center justify-center">
      <div class="flex space-x-2">
        <div class="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div
          class="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"
        ></div>
        <div
          class="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"
        ></div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-24 text-center text-gray-400 text-sm">
      <p>© 2026 Sunflower. Built with Vue 3 & Vite.</p>
    </footer>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
