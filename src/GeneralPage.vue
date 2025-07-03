<script setup lang="ts">
import WelcomePhraseComponent from './subComponents/WelcomePhraseComponent.vue'
import SearchBar from './subComponents/SearchBar.vue'
</script>

<template>
  <main>
    <div id="main-content">
      <section id="welcome-phrase-section">
        <WelcomePhraseComponent />
      </section>
      <section id="search-bar-section">
        <SearchBar />
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

#welcome-phrase-section {
  /*background-color: green;*/
  width: 60%;
}

#search-bar-section {
  /*background-color: green;*/
  width: 60%;
}
</style>
