<script setup lang="ts">
import WelcomePhraseComponent from './subComponents/WelcomePhraseComponent.vue'
import SearchBar from './subComponents/SearchBar.vue'
import WebsitesBlock from './subComponents/WebsitesBlock.vue'
import { ref } from 'vue'
import WebsiteEditor from './subComponents/WebsiteEditor.vue'
import { useCurrentUserStore } from './scripts/stores/piniaStore'

const searchBarEngineText = ref<string>('')
const searchBarWebsiteText = ref<string>('')

const isShowSearchEngineSettings = ref<boolean>(false)
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

function showAddModeDialog() {
  isAddingModeActive.value = true
}
</script>

<template>
  <main>
    <section id="section-main-center-content">
      <div id="div-all-content-of-main-section">
        <!-- Welcome Phrase -->
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12">
            <div id="general-page-top-section">
              <WelcomePhraseComponent />
            </div>
          </v-col>
        </v-row>

        <!-- Search Engine -->
        <v-row class="ma-0">
          <v-col class="pa-1" cols="10">
            <v-row class="pa-0 ma-0 mr-1 w-100" justify="space-between">
              <v-col class="pa-0 mr-1 mx-0">
                <SearchBar
                  v-model="searchBarEngineText"
                  v-on:when-enter="showResultBySearchRequest"
                  placeholder="Найти в интернете..."
                />
              </v-col>

              <v-col class="pa-0 d-flex justify-end" width="auto" cols="auto">
                <v-btn class="ma-0 h-100" @click="showResultBySearchRequest" elevation="0">
                  <v-icon icon="$magnify" color="gray" size="32" />
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col class="pa-1" cols="2">
            <v-btn
              class="ma-0 h-100"
              @click="isShowSearchEngineSettings = !isShowSearchEngineSettings"
              elevation="0"
            >
              <v-icon icon="$cog" color="gray" size="32" />
            </v-btn>
          </v-col>
        </v-row>

        <!-- Search Website -->
        <v-row class="ma-0" v-if="currentUserStore.currentUser != undefined">
          <v-col class="pa-1" cols="10">
            <SearchBar placeholder="Найти сохранённый сайт..." v-model="searchBarWebsiteText" />
          </v-col>

          <v-col class="pa-1" cols="2">
            <v-btn
              class="h-100"
              @click="isShowSearchWebsiteSettings = !isShowSearchWebsiteSettings"
              elevation="0"
              style="position: relative"
            >
              <v-icon icon="$cog" color="gray" size="32" />

              <div id="websites-search-bar-settings-menu" v-if="isShowSearchWebsiteSettings">
                <v-btn class="rounded-b-0" @click="showAddModeDialog" elevation="0">Добавить</v-btn>
                <v-btn class="rounded-t-0" @click="changeEditMode" elevation="0">{{
                  !isEditingModeActive ? 'Редактировать' : 'Закончить'
                }}</v-btn>
              </div>
            </v-btn>
          </v-col>
        </v-row>

        <!-- Website Editor Dialog -->
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12">
            <WebsiteEditor :website="undefined" v-model="isAddingModeActive" />
          </v-col>
        </v-row>

        <!-- Website Block -->
        <WebsitesBlock
          id="websites"
          v-model="searchBarWebsiteText"
          :is-editing-mode-active="isEditingModeActive"
        />
      </div>
    </section>

    <section v-if="1" style="position: absolute"></section>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  align-content: center;
}

section {
  width: 50%;
}

#general-page-top-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#div-all-content-of-main-section {
  position: relative;
}

.hidden-search-bar-button {
  display: v-bind("isEditingModeActive ? 'inline': 'none'");
  margin-left: 10px;
}

#websites-search-bar-settings-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0%;
  left: 100%;
  z-index: 1;
  margin-left: 10px;
}

#websites {
  overflow-x: auto;
  overflow-y: auto;
  height: 20vh;
}

@media (max-width: 768px) {
  section {
    width: 80%;
  }

  #websites-search-bar-settings-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left: -290%;
  }
}
</style>
