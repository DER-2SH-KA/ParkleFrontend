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
  <div
    class="website_tag__container"
    :style="`color: ${props.websiteTag.hex}; border: 2px solid ${props.websiteTag.hex};`"
  >
    <p class="website_tag__content" :style="`color: ${props.websiteTag.hex}`">
      {{ props.websiteTag.title }}
    </p>
  </div>
</template>

<style lang="css" scoped>
.website_tag__container {
  font-size: 11pt;
  font-weight: bold;
  border-radius: 20px;
  margin: 5px;
}

.website_tag__content {
  margin: 5px 10px 5px 10px;
}
</style>
