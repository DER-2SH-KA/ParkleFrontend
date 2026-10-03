<script setup lang="ts">
import WelcomePhraseComponent from '../home/WelcomePhraseComponent.vue'
import SearchBar from '../subComponents/SearchBar.vue'
import WebsitesBlock from '../subComponents/WebsitesBlock.vue'
import { ref } from 'vue'
import WebsiteEditor from '../subComponents/WebsiteEditor.vue'
import { useCurrentUserStore } from '../../scripts/stores/piniaStore.ts'
import WebsiteTagBlockCompose from '../subComponents/WebsiteTagBlockCompose.vue'

const searchBarEngineText = ref<string>('')
const searchBarWebsiteText = ref<string>('')

// const isShowSearchEngineSettings = ref<boolean>(false)
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

function showAddingModeDialog() {
  isAddingModeActive.value = true
}
</script>

<template>
  <main>
    <section>
      <div>
        <!-- Welcome Phrase -->
        <v-row>
          <v-col>
            <div>
              <WelcomePhraseComponent />
            </div>
          </v-col>
        </v-row>

        <v-container>
          <!-- Search Engine -->
          <v-row>
            <v-col>
              <SearchBar
                v-model="searchBarEngineText"
                v-on:when-enter="showResultBySearchRequest"
                placeholder="Найти в интернете..."
              />
            </v-col>

            <v-col>
              <v-btn @click="showResultBySearchRequest">
                <v-icon icon="$magnify" />
              </v-btn>
            </v-col>
          </v-row>

          <!-- Search Website -->
          <v-row v-if="currentUserStore.currentUser != undefined">
            <v-col>
              <SearchBar placeholder="Найти сохранённый сайт..." v-model="searchBarWebsiteText" />
            </v-col>

            <v-col>
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
        </v-container>

        <!-- Website Editor Dialog -->
        <v-row>
          <v-col>
            <WebsiteEditor :website="undefined" v-model="isAddingModeActive" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <WebsiteTagBlockCompose v-model="isWebsiteTagBlockDialogActive" />
          </v-col>
        </v-row>

        <!-- Website Block -->
        <WebsitesBlock
          v-model="searchBarWebsiteText"
          :is-editing-mode-active="isEditingModeActive"
        />
      </div>
    </section>

    <section v-if="1"></section>
  </main>
</template>
