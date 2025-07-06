<script setup lang="ts">
import WelcomePhraseComponent from './subComponents/WelcomePhraseComponent.vue'
import SearchBar from './subComponents/SearchBar.vue'
import TopWebsites from './subComponents/TopWebsites.vue'
import { type Website } from './scripts/declaration'
import { ref } from 'vue'
import WebsiteEditor from './subComponents/WebsiteEditor.vue'

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

const searchBarText = ref<string>('')
const isEditingModeActive = ref<boolean>(false)
const isAddingModeActive = ref<boolean>(false)

function changeEditMode() {
  // websites.value = websites.value
  isEditingModeActive.value = !isEditingModeActive.value
  isAddingModeActive.value = false
}

function showAddModeDialog() {
  if (isEditingModeActive.value) {
    isAddingModeActive.value = true
  } else {
    isAddingModeActive.value = false
  }
}
</script>

<template>
  <main>
    <div id="main-content">
      <section id="general-page-top-section">
        <WelcomePhraseComponent />
      </section>
      <section id="search-bar-section">
        <SearchBar v-model="searchBarText" />
        <VBtn @click="changeEditMode">{{ isEditingModeActive ? 'Save' : 'Edit' }}</VBtn>
        <VBtn class="hidden-search-bar-button" @click="showAddModeDialog">Add</VBtn>
        <VBtn class="hidden-search-bar-button" @click="changeEditMode">Cancel</VBtn>

        <WebsiteEditor v-model="isAddingModeActive" />
      </section>
      <section>
        <TopWebsites
          id="top-websites"
          v-model="searchBarText"
          :is-editing-mode-active="isEditingModeActive"
        />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  /*background-color: red;*/
}

#main-content {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  flex: 0.75 0 auto;
  width: 100%;
  /*background-color: orange;*/
}

section {
  width: 50%;
}

#general-page-top-section {
  display: flex;
  justify-content: center;
  align-items: end;
  /*background-color: aqua;*/
}

#search-bar-section {
  max-width: 600px;
  margin: 5px 0px;
}

.hidden-search-bar-button {
  display: v-bind("isEditingModeActive ? 'inline': 'none'");
  margin-left: 10px;
}

#top-websites {
  overflow-x: auto;
  overflow-y: auto;
  height: 20vh;
}

@media (max-width: 768px) {
  section {
    width: 80%;
  }
}
</style>
