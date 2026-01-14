<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="['bento-card overflow-hidden', $props.class]">
    <slot />
  </div>
</template>
