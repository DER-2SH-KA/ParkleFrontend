<script setup lang="ts">
import WelcomePhraseComponent from '../home/WelcomePhraseComponent.vue'
import SearchBar from '../subComponents/SearchBar.vue'
import WebsitesBlock from '../subComponents/WebsitesBlock.vue'
import { ref } from 'vue'
import WebsiteEditor from '../subComponents/WebsiteEditor.vue'
// import { useCurrentUserStore } from '../../scripts/stores/piniaStore.ts'

const searchBarEngineText = ref<string>('')
const searchBarWebsiteText = ref<string>('')

const isShowSearchWebsiteSettings = ref<boolean>(false)
const isEditingModeActive = ref<boolean>(false)
const isAddingModeActive = ref<boolean>(false)

// const currentUserStore = useCurrentUserStore()

function changeEditMode() {
  isEditingModeActive.value = !isEditingModeActive.value
  isAddingModeActive.value = false
  isShowSearchWebsiteSettings.value = false
}

function showResultBySearchRequest() {
  const encodedRequestText = encodeURIComponent(searchBarEngineText.value.trim())
  if (!encodedRequestText) return

  window.open(`https://ya.ru/search/?text=${encodedRequestText}`, '_blank')
  window.open(`https://www.google.com/search?q=${encodedRequestText}`, '_blank')
}

function showAddingModeDialog() {
  isAddingModeActive.value = true
  isShowSearchWebsiteSettings.value = false
}
</script>

<template>
  <v-container class="fill-height d-flex flex-column pa-0" fluid>
    <!-- 1. Верхняя распорка: забирает ровно 1 часть (1/4) свободного пространства -->
    <div style="flex: 1 1 0; min-height: 0" />

    <!-- 2. Центральный блок: фраза + инпуты + кнопки (высота по контенту, не сжимается) -->
    <v-container class="d-flex flex-column px-4 flex-shrink-0" align="center" fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <!-- Приветственная фраза -->
          <WelcomePhraseComponent />

          <!-- Поисковые строки -->
          <div class="w-100 d-flex flex-column ga-3">
            <!-- 1. Поиск в интернете -->
            <div class="d-flex align-center ga-3">
              <div class="flex-grow-1">
                <SearchBar
                  v-model="searchBarEngineText"
                  placeholder="Найти в интернете..."
                  hide-details
                  @when-enter="showResultBySearchRequest"
                />
              </div>
              <v-btn
                icon="$magnify"
                size="56"
                elevation="1"
                rounded="lg"
                @click="showResultBySearchRequest"
              />
            </div>

            <!-- 2. Поиск сохранённых сайтов -->
            <div class="d-flex align-center ga-3">
              <div class="flex-grow-1">
                <SearchBar
                  v-model="searchBarWebsiteText"
                  placeholder="Найти сохранённый сайт..."
                  hide-details
                />
              </div>

              <v-menu
                v-model="isShowSearchWebsiteSettings"
                location="bottom end"
                :close-on-content-click="false"
              >
                <template #activator="{ props }">
                  <v-btn v-bind="props" icon="$cog" size="56" elevation="1" rounded="lg" />
                </template>

                <v-card min-width="180" class="pa-0" rounded="lg">
                  <v-list density="compact" nav>
                    <v-list-item prepend-icon="$plus" @click="showAddingModeDialog">
                      <span class="website-cog-menu__v-list-item-title">Добавить</span>
                    </v-list-item>
                    <v-list-item
                      :prepend-icon="!isEditingModeActive ? '$pencil' : '$check'"
                      @click="changeEditMode"
                    >
                      <span class="website-cog-menu__v-list-item-title">{{
                        !isEditingModeActive ? 'Редактировать' : 'Закончить'
                      }}</span>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- 3. Нижняя зона: забирает 3 части (3/4) свободного места и вмещает сайты -->
    <div class="w-100 d-flex justify-center websites-block-on-home-page__div">
      <v-container class="d-flex justify-center" fluid>
        <v-row justify="center" align="start">
          <v-col cols="12" sm="10" lg="8">
            <WebsitesBlock
              v-model="searchBarWebsiteText"
              :is-editing-mode-active="isEditingModeActive"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div style="flex: 1 1 0; min-height: 0" />

    <!-- Модальное окно добавления/редактирования -->
    <WebsiteEditor :website="undefined" v-model="isAddingModeActive" />
  </v-container>
</template>

<style lang="css" scoped>
.website-cog-menu__v-list-item-title {
  font-size: 11pt;
}

.websites-block-on-home-page__div {
  flex: 3 1 0;
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>
