<script setup lang="ts">
import { Send } from "lucide-vue-next";
import { reactive, ref } from "vue";
import { submitInquiry } from "@/api/brand";

const form = reactive({
  name: "",
  contact: "",
  content: "",
});

const loading = ref(false);
const success = ref(false);

const handleSubmit = async () => {
  if (!form.name || !form.contact || !form.content) {
    alert("请填写完整信息");
    return;
  }

  try {
    loading.value = true;
    await submitInquiry(form);
    success.value = true;
    form.name = "";
    form.contact = "";
    form.content = "";
    setTimeout(() => (success.value = false), 3000);
  } catch (err) {
    alert("提交失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-full flex flex-col">
    <h2 class="text-lg font-bold mb-4">合作咨询</h2>
    <div class="flex-1 flex flex-col justify-center">
      <div v-if="success" class="text-center py-8">
        <div class="text-blue-600 font-bold mb-2 text-xl italic">Thanks!</div>
        <p class="text-xs text-gray-500 font-medium tracking-tight">
          我会尽快与您取得联系
        </p>
      </div>
      <div v-else class="space-y-3">
        <input
          v-model="form.name"
          placeholder="您的姓名"
          class="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        />
        <input
          v-model="form.contact"
          placeholder="微信或邮箱"
          class="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        />
        <textarea
          v-model="form.content"
          placeholder="需求简述"
          rows="2"
          class="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
        ></textarea>
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center group"
        >
          <Send
            class="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
          {{ loading ? "发送中..." : "发送意向" }}
        </button>
      </div>
    </div>
  </div>
</template>
