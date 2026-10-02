<script lang="ts" setup>
import { onMounted } from 'vue'
import type { WebsiteTagResponseDto } from '@/scripts/declaration'

const props = defineProps<{
  websiteTag: WebsiteTagResponseDto
}>()

onMounted(() => {
  console.info(props.websiteTag)
})
</script>

<template>
  <div>
    <p>
      {{ props.websiteTag.title }}
    </p>
  </div>
</template>
