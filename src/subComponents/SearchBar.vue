<script lang="ts" setup>
const model = defineModel()
const props = defineProps(['placeholder'])
</script>

<template>
  <v-row class="ma-0">
    <v-col class="pa-0">
      <v-text-field
        :placeholder="props.placeholder ?? 'Что-то...'"
        type="text"
        variant="solo"
        clearable
        hide-details
        v-model="model"
        bg-color="white"
        elevation="0"
      >
        <template v-slot:prepend-inner>
          <v-icon icon="$magnify" color="gray" />
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>
