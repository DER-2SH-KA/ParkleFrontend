<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { WebsiteTagResponseDto } from '@/scripts/declaration.ts'
import WebsiteTagItem from './WebsiteTagItem.vue'
import { getUsersWebsiteTags } from '@/scripts/api/websiteTagApi.ts'

const emits = defineEmits(['add-tag-to-website'])

const allTags = ref<WebsiteTagResponseDto[]>([])
const tagsToShow = allTags

function onTagClick(tag: WebsiteTagResponseDto) {
  emits('add-tag-to-website', tag)
  tagsToShow.value = tagsToShow.value.filter((x) => x.id != tag.id)
}

onMounted(async () => {
  allTags.value = await getUsersWebsiteTags()
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Тег" variant="solo" clearable rounded="lg" hide-details />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-sheet
          class="pa-4 d-flex flex-row flex-wrap ga-2"
          color="background"
          rounded="lg"
          style="overflow-y: scroll; scrollbar-width: none; min-height: 65px"
        >
          <website-tag-item
            v-for="websiteTag in tagsToShow"
            :key="websiteTag.id"
            :website-tag="websiteTag"
            @click="onTagClick(websiteTag)"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="css" scoped></style>
