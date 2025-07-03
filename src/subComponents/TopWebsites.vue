<script lang="ts" setup>
import type { Website } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, ref } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'

const modelSearchBarText = defineModel<string>()

const websites = ref<Website[]>([
  { id: 0, name: 'AliExpress', url: 'https://aliexpress.ru/', fLetterColor: '#f00' },
  {
    id: 1,
    name: 'NATK',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
    fLetterColor: '#0f0',
  },
  { id: 2, name: 'VK', url: 'https://vk.com/', fLetterColor: '#0ff' },
  { id: 3, name: 'Yandex', url: 'https://ya.ru/', fLetterColor: '#ff0' },
  { id: 4, name: 'AliExpress', url: 'https://aliexpress.ru/', fLetterColor: '#f00' },
  {
    id: 5,
    name: 'NATK',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
    fLetterColor: '#0f0',
  },
  { id: 6, name: 'VK', url: 'https://vk.com/', fLetterColor: '#0ff' },
  { id: 7, name: 'Yandex', url: 'https://ya.ru/', fLetterColor: '#ff0' },
])

const sortedWebsites = computed<Website[]>(() => {
  const sortedList = sortWebsiteByName(websites.value)
  return sortedList
})

const websitesToShow = computed<Website[]>(() => {
  const filteredList = sortedWebsites.value.filter((x) => {
    if (modelSearchBarText.value == undefined || modelSearchBarText.value! == '') {
      return true
    } else {
      return (
        x.name.toLowerCase().includes(modelSearchBarText.value!.toLowerCase()) ||
        x.url.toLowerCase().includes(modelSearchBarText.value!.toLowerCase())
      )
    }
  })
  return filteredList
})
</script>

<template>
  <div id="top-websites">
    <div v-for="website in websitesToShow" :key="website.id">
      <WebsiteItem :website="website" />
    </div>
  </div>
</template>

<style lang="scss">
#top-websites {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: center;
  /*background-color: red;*/
}
</style>
