<script setup lang="ts">
import WelcomePhraseComponent from './subComponents/WelcomePhraseComponent.vue'
import SearchBar from './subComponents/SearchBar.vue'
import WebsitesBlock from './subComponents/WebsitesBlock.vue'
import { ref } from 'vue'
import WebsiteEditor from './subComponents/WebsiteEditor.vue'
import { useCurrentUserStore } from './scripts/stores/piniaStore'
import WebsiteTagBlockCompose from './subComponents/WebsiteTagBlockCompose.vue'

const searchBarEngineText = ref<string>('')
const searchBarWebsiteText = ref<string>('')

const isShowSearchEngineSettings = ref<boolean>(false)
const isShowSearchWebsiteSettings = ref<boolean>(false)

const isEditingModeActive = ref<boolean>(false)
const isWebsiteTagBlockDialogActive = ref<boolean>(false)
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

function showWebsiteTagBlockDialog() {
  isWebsiteTagBlockDialogActive.value = true
}

function showAddingModeDialog() {
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

        <v-container class="home-page__search-bars ma-0 pa-0">
          <!-- Search Engine -->
          <v-row class="home-page__search-bars ma-0 pa-0">
            <v-col class="pa-1">
              <SearchBar
                v-model="searchBarEngineText"
                v-on:when-enter="showResultBySearchRequest"
                placeholder="Найти в интернете..."
              />
            </v-col>

            <v-col class="pa-1" cols="auto">
              <v-btn
                class="ma-0 h-100"
                @click="showResultBySearchRequest"
                elevation="0"
                rounded="xl"
              >
                <v-icon icon="$magnify" color="gray" size="32" />
              </v-btn>
            </v-col>

            <!--
            <v-col class="pa-1" cols="auto">
              <v-btn
                class="ma-0 h-100"
                @click="isShowSearchEngineSettings = !isShowSearchEngineSettings"
                elevation="0"
              >
                <v-icon icon="$cog" color="gray" size="32" />
              </v-btn>
            </v-col>
          -->
          </v-row>

          <!-- Search Website -->
          <v-row class="ma-0" v-if="currentUserStore.currentUser != undefined">
            <v-col class="pa-1">
              <SearchBar placeholder="Найти сохранённый сайт..." v-model="searchBarWebsiteText" />
            </v-col>

            <v-col class="pa-1" cols="auto">
              <v-btn
                class="h-100"
                @click="isShowSearchWebsiteSettings = !isShowSearchWebsiteSettings"
                elevation="0"
                rounded="xl"
                style="position: relative"
              >
                <v-icon icon="$cog" color="gray" size="32" />

                <v-card
                  id="websites-search-bar-settings-menu"
                  v-if="isShowSearchWebsiteSettings"
                  rounded="xl"
                >
                  <v-btn class="rounded-b-0" @click="showAddingModeDialog" elevation="0"
                    >Добавить</v-btn
                  >

                  <v-btn class="rounded-0" @click="showWebsiteTagBlockDialog" elevation="0"
                    >Теги</v-btn
                  >

                  <v-btn class="rounded-t-0" @click="changeEditMode" elevation="0">{{
                    !isEditingModeActive ? 'Редактировать' : 'Закончить'
                  }}</v-btn>
                </v-card>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Website Editor Dialog -->
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12">
            <WebsiteEditor :website="undefined" v-model="isAddingModeActive" />
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="pa-0" cols="12">
            <WebsiteTagBlockCompose v-model="isWebsiteTagBlockDialogActive" />
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
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
}

.home-page__search-bars {
  max-width: 800px;
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
