<script lang="ts" setup>
import { ref } from 'vue'
const searchBarText = ref<string>('')
</script>

<template>
  <div class="search-bar-div">
    <v-text-field
      label="Search"
      placeholder="Website name or url"
      variant="solo"
      type="text"
      clearable
      v-model="searchBarText"
    />
  </div>
</template>

<style lang="scss"></style>
