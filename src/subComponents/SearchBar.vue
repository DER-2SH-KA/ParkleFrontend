<script lang="ts" setup>
const model = defineModel()
</script>

<template>
  <div class="search-bar-div">
    <v-text-field
      label="Search"
      placeholder="Website name or url"
      style="font-size: 18pt"
      variant="solo"
      type="text"
      clearable
      v-model="model"
    />
  </div>
</template>
