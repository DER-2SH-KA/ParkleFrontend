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
  <div>
    <div>
      <!-- Website favicon -->
      <img :src="linkFetchFavicon" alt=">" />

      <!-- Website href -->
      <a
        :href="props.website.url"
        :title="website.description ? website.description : website.title"
        target="_blank"
        ><span>{{ props.website.title.charAt(0) }}</span
        >{{ props.website.title.slice(1) }}</a
      >

      <!-- Website settings buttons -->
      <div v-if="props.isEditingModeActive">
        <!-- Edit website button -->
        <v-btn @click="onEditWebsite">
          <v-icon icon="$pencil" />
        </v-btn>

        <!-- Delete website button -->
        <v-btn @click="onDeleteWebsite">
          <v-icon icon="$delete" />
        </v-btn>
      </div>
    </div>
  </div>

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
