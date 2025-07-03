<script lang="ts" setup>
import type { Website } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, ref } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'

const modelSearchBarText = defineModel<string>()

const websites = ref<Website[]>([
  {
    id: 0,
    user_id: 1833719,
    hex: '#f00',
    title: 'AliExpress',
    url: 'https://aliexpress.ru/',
  },
  {
    id: 1,
    user_id: 1833719,
    hex: '#0f0',
    title: 'NATK',
    description: 'Расписание НАТК группы ПР-22.101',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
  },
  {
    id: 2,
    user_id: 1833719,
    hex: '#0ff',
    title: 'VK',
    url: 'https://vk.com/',
  },
  {
    id: 3,
    user_id: 1833719,
    hex: '#f0f',
    title: 'Yandex',
    url: 'https://ya.ru',
  },
  {
    id: 4,
    user_id: 1833719,
    hex: '#f00',
    title: 'AliExpress',
    url: 'https://aliexpress.ru/',
  },
  {
    id: 5,
    user_id: 1833719,
    hex: '#0f0',
    title: 'NATK',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
  },
  {
    id: 6,
    user_id: 1833719,
    hex: '#0ff',
    title: 'VK',
    url: 'https://vk.com/',
  },
  {
    id: 7,
    user_id: 1833719,
    hex: '#f0f',
    title: 'Yandex',
    url: 'https://ya.ru',
  },
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
        x.title.toLowerCase().includes(modelSearchBarText.value!.toLowerCase()) ||
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
