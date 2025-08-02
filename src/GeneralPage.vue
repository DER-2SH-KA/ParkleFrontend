<script setup lang="ts">
import WelcomePhraseComponent from './subComponents/WelcomePhraseComponent.vue'
import SearchBar from './subComponents/SearchBar.vue'
import TopWebsites from './subComponents/TopWebsites.vue'
import { ref } from 'vue'
import WebsiteEditor from './subComponents/WebsiteEditor.vue'
import { useCurrentUserStore } from './scripts/stores/piniaStore'

const searchBarText = ref<string>('')
const isEditingModeActive = ref<boolean>(false)
const isAddingModeActive = ref<boolean>(false)

const currentUserStore = useCurrentUserStore()

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
        <div v-if="currentUserStore.currentUser != undefined">
          <VBtn @click="changeEditMode">{{ isEditingModeActive ? 'End edit' : 'Edit' }}</VBtn>
          <VBtn class="hidden-search-bar-button" @click="showAddModeDialog">Add</VBtn>
        </div>

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
