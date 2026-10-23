<script lang="ts" setup>
import { ref } from 'vue'
import type { WebsiteResponseDto } from '@/scripts/declaration'
import WebsiteEditor from './WebsiteEditor.vue'

const props = defineProps<{
  website: WebsiteResponseDto
  isEditingModeActive: boolean
}>()

const emits = defineEmits<{
  onDelete: [id: string]
}>()

const linkFetchFavicon = 'https://www.google.com/s2/favicons?domain=' + props.website.url + '&sz=32'

const isEditingBegun = ref<boolean>(false)
const isActiveDeleteDialog = ref<boolean>(false)

const onEditWebsite = () => {
  isEditingBegun.value = true
}

const onDeleteWebsite = () => {
  isActiveDeleteDialog.value = true
}

const onDeleteWebsiteAccept = () => {
  isActiveDeleteDialog.value = false
  emits('onDelete', props.website.id)
}

const onDeleteWebsiteDenie = () => {
  isActiveDeleteDialog.value = false
}
</script>

<template>
  <v-sheet
    class="pa-2 d-flex justify-center align-center flex-nowrap flex-grow-1 flex-shrink-1"
    color="surface"
    elevation="1"
    rounded="lg"
  >
    <!-- Website favicon -->
    <img
      :src="linkFetchFavicon"
      alt="favicon"
      style="width: 24px; height: 24px; margin-right: 3px"
    />

    <!-- Website href -->
    <a
      class="website-item__title"
      :href="props.website.url"
      :title="website.description ? website.description : website.title"
      target="_blank"
      ><span>{{ props.website.title.charAt(0) }}</span
      >{{ props.website.title.slice(1) }}</a
    >

    <!-- Website settings buttons -->
    <div class="d-flex flex-row flex-nowrap ga-0 pl-1" v-if="props.isEditingModeActive">
      <!-- Edit website button -->
      <v-btn @click="onEditWebsite" density="compact" variant="text" icon="$pencil" />

      <!-- Delete website button -->
      <v-btn @click="onDeleteWebsite" density="compact" variant="text" icon="$delete" color="red" />
    </div>
  </v-sheet>

  <!-- Website Editor Dialog -->
  <WebsiteEditor :website="website" v-model="isEditingBegun" />

  <!-- Website Delete Dialog -->
  <v-dialog v-model="isActiveDeleteDialog">
    <v-card>
      <v-card-title>Удаление ссылки</v-card-title>
      <v-card-subtitle><span>Действие необратимо</span></v-card-subtitle>

      <v-card-text>
        <p>
          Вы уверены, что хотите
          <span>УДАЛИТЬ</span> сайт &quot;{{ props.website.title }}&quot; с описанием &quot;{{
            props.website.description ?? 'None'
          }}&quot;?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onDeleteWebsiteAccept()">Да</v-btn>
        <v-btn @click="onDeleteWebsiteDenie()">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="css" scoped>
.website-item__title {
  font-size: 16pt;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
}
</style>
