<script setup lang="ts">
import WelcomePhraseComponent from './subComponents/WelcomePhraseComponent.vue'
import SearchBar from './subComponents/SearchBar.vue'
import TopWebsites from './subComponents/TopWebsites.vue'
import { ref } from 'vue'

const searchBarText = ref<string>('')
</script>

<template>
  <main>
    <div id="main-content">
      <section>
        <WelcomePhraseComponent />
      </section>
      <section id="search-bar-section">
        <SearchBar v-model="searchBarText" />
      </section>
      <section>
        <TopWebsites v-model="searchBarText" />
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

#search-bar-section {
  max-width: 600px;
}

@media (max-width: 768px) {
  section {
    width: 80%;
  }
}
</style>
