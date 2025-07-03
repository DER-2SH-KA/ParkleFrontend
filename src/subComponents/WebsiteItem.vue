<script lang="ts" setup>
import type { Website } from '@/scripts/declaration'

const props = defineProps<{
  website: Website
}>()

const fLetterColor = props.website.hex
</script>

<template>
  <div class="website-item">
    <a :href="props.website.url" target="_blank">{{ props.website.title }}</a>
  </div>
</template>

<style lang="scss">
.website-item {
  color: var(--text-color-dark-theme);
  background-color: var(--background-item-color-dark-theme);
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;

  &::first-letter {
    color: v-bind(fLetterColor);
  }

  & > a {
    color: var(--text-color-dark-theme);
    text-align: center;
    text-decoration: none;
    font-size: 14pt;
  }
}
</style>
