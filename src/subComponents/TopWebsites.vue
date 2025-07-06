<script lang="ts" setup>
import type { Website } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, ref } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'

const modelSearchBarText = defineModel<string>()
const props = defineProps<{
  isEditingModeActive: boolean
}>()

const websites = ref<Website[]>([
  {
    id: 0,
    user_id: 1833719,
    hex: '#f00',
    title: 'AliExpressAliExpressAliExpressAliExpressAliExpress',
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
    title: 'VKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVK',
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
    title: 'AliExpressAliExpressAliExpressAliExpressAliExpress',
    url: 'https://aliexpress.ru/',
  },
  {
    id: 5,
    user_id: 1833719,
    hex: '#0f0',
    title: 'NATKNATKNATKNATKNATKNATKNATKNATKNATKNATKNATK',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
  },
  {
    id: 6,
    user_id: 1833719,
    hex: '#0ff',
    title: 'VKVKVKVKVKVKVKVKVKVKVK',
    url: 'https://vk.com/',
  },
  {
    id: 7,
    user_id: 1833719,
    hex: '#f0f',
    title: 'Yandex',
    url: 'https://ya.ru',
  },
  {
    id: 8,
    user_id: 1833719,
    hex: '#0f0',
    title: 'NATKNATKNATKNATKNATKNATKNATK',
    description: 'Расписание НАТК группы ПР-22.101',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
  },
  {
    id: 9,
    user_id: 1833719,
    hex: '#0ff',
    title: 'VKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVKVK',
    url: 'https://vk.com/',
  },
  {
    id: 10,
    user_id: 1833719,
    hex: '#f0f',
    title: 'Yandex',
    url: 'https://ya.ru',
  },
  {
    id: 11,
    user_id: 1833719,
    hex: '#f00',
    title: 'AliExpressAliExpressAliExpressAliExpressAliExpress',
    url: 'https://aliexpress.ru/',
  },
  {
    id: 12,
    user_id: 1833719,
    hex: '#0f0',
    title: 'NATKNATKNATKNATKNATKNATKNATKNATKNATK',
    url: 'https://natk.ru/stud-grad/schedule/187?group=%D0%9F%D0%A0-22.101',
  },
  {
    id: 13,
    user_id: 1833719,
    hex: '#0ff',
    title: 'VKVKVKVKVKVKVKVKVKVKVKVK',
    url: 'https://vk.com/',
  },
  {
    id: 14,
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

const removeWebsiteById = (id: number) => {
  websites.value = websites.value.filter((x) => x.id != id)
}
</script>

<template>
  <div id="top-websites">
    <div v-for="website in websitesToShow" :key="website.id">
      <WebsiteItem
        :website="website"
        :is-editing-mode-active="props.isEditingModeActive"
        @on-delete="(id) => removeWebsiteById(id)"
      />
    </div>
  </div>
</template>

<style lang="scss">
#top-websites {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: start;
  /*background-color: red;*/
}
</style>
