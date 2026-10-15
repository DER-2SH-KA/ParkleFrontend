<script setup lang="ts">
import WelcomePhraseComponent from '../home/WelcomePhraseComponent.vue'
import SearchBar from '../subComponents/SearchBar.vue'
import WebsitesBlock from '../subComponents/WebsitesBlock.vue'
import { ref } from 'vue'
import WebsiteEditor from '../subComponents/WebsiteEditor.vue'
import { useCurrentUserStore } from '../../scripts/stores/piniaStore.ts'

const searchBarEngineText = ref<string>('')
const searchBarWebsiteText = ref<string>('')

// const isShowSearchEngineSettings = ref<boolean>(false)
const isShowSearchWebsiteSettings = ref<boolean>(false)

const isEditingModeActive = ref<boolean>(false)
const isAddingModeActive = ref<boolean>(false)

const currentUserStore = useCurrentUserStore()

function changeEditMode() {
  // websites.value = websites.value
  isEditingModeActive.value = !isEditingModeActive.value
  isAddingModeActive.value = false
}

function showResultBySearchRequest() {
  const encodedRequestText = encodeURIComponent(searchBarEngineText.value)

  window.open(`https://ya.ru/search/?text=${encodedRequestText}`, '_blank')
  window.open(`https://www.google.com/search?q=${encodedRequestText}`, '_blank')
}

function showAddingModeDialog() {
  isAddingModeActive.value = true
}
</script>

<template>
  <div class="home_page__background">
    <v-container style="background-color: orange" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <!-- Search Engine -->
          <WelcomePhraseComponent />
        </v-col>

        <v-col cols="12" sm="12" md="8" lg="4" xl="2">
          <v-row>
            <v-col cols="max">
              <SearchBar
                v-model="searchBarEngineText"
                v-on:when-enter="showResultBySearchRequest"
                placeholder="Найти в интернете..."
              />
            </v-col>

            <v-col cols="auto">
              <v-btn @click="showResultBySearchRequest">
                <v-icon icon="$magnify" />
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="12" md="8" lg="4" xl="2">
          <v-row>
            <v-col cols="max">
              <!-- Search Website -->
              <SearchBar placeholder="Найти сохранённый сайт..." v-model="searchBarWebsiteText" />
            </v-col>

            <v-col cols="auto">
              <v-btn @click="isShowSearchWebsiteSettings = !isShowSearchWebsiteSettings">
                <v-icon icon="$cog" />

                <v-card v-if="isShowSearchWebsiteSettings">
                  <v-btn @click="showAddingModeDialog">Добавить</v-btn>

                  <v-btn @click="changeEditMode">{{
                    !isEditingModeActive ? 'Редактировать' : 'Закончить'
                  }}</v-btn>
                </v-card>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Website Editor Dialog -->
      <WebsiteEditor :website="undefined" v-model="isAddingModeActive" />

      <!-- Website Block -->
      <WebsitesBlock v-model="searchBarWebsiteText" :is-editing-mode-active="isEditingModeActive" />
    </v-container>
  </div>
</template>

<style lang="css" scoped>
.home_page__background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
