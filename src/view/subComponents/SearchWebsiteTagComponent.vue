<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { WebsiteTagResponseDto } from '@/scripts/declaration.ts'
import WebsiteTagItem from './WebsiteTagItem.vue'
import { getUsersWebsiteTags } from '@/scripts/api/websiteTagApi.ts'
import { sortWebsiteTagsByName } from '@/scripts/utils.ts'

const searchTextField = ref<string>('')

const websiteTagsModel = defineModel<WebsiteTagResponseDto[]>({ default: () => [] })
const props = defineProps<{
  showCloseButton: boolean
}>()
const emits = defineEmits(['click-on-tag', 'click-on-close-button'])

const allTags = ref<WebsiteTagResponseDto[]>([])

const tagsToShow = computed(() => {
  const selectedTagIds = new Set(websiteTagsModel.value.map((t) => t.id))
  const notAddedToWebsiteTags = allTags.value.filter((tag) => !selectedTagIds.has(tag.id))
  return sortWebsiteTagsByName(
    notAddedToWebsiteTags.filter((x) =>
      !!searchTextField.value
        ? x.title.toLowerCase().includes(searchTextField.value.toLocaleLowerCase())
        : true,
    ),
  )
})

function onTagClick(tag: WebsiteTagResponseDto) {
  emits('click-on-tag', tag)
}

function onClickCloseButton(tag: WebsiteTagResponseDto) {
  emits('click-on-close-button', tag)
}

onMounted(async () => {
  allTags.value = await getUsersWebsiteTags()
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="searchTextField"
          label="Тег"
          variant="solo"
          clearable
          rounded="lg"
          hide-details
        />
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
            :show-close-button="props.showCloseButton"
            @click="onTagClick(websiteTag)"
            @remove-tag="onClickCloseButton(websiteTag)"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="css" scoped></style>
