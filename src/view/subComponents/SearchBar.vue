<script lang="ts" setup>
const model = defineModel()
const props = defineProps(['placeholder'])
const emits = defineEmits(['whenEnter'])
</script>

<template>
  <v-text-field
    v-model="model"
    @keyup.enter="emits('whenEnter')"
    type="text"
    :placeholder="props.placeholder ?? 'Текст-заглушка'"
    hide-details
    variant="solo"
    density="default"
    rounded="lg"
    prepend-inner-icon="$magnify"
  />
</template>
