<script lang="ts" setup>
const model = defineModel()
const props = defineProps(['placeholder'])
const emits = defineEmits(['whenEnter'])
</script>

<template>
  <v-row>
    <v-col>
      <v-text-field
        @keyup.enter="emits('whenEnter')"
        :placeholder="props.placeholder ?? 'Что-то...'"
        type="text"
        v-model="model"
      >
        <template v-slot:prepend-inner>
          <v-icon icon="$magnify" />
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>
