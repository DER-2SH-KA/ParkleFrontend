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
  <div class="website-item__content">
    <div class="website-item__container">
      <!-- Website favicon -->
      <img :src="linkFetchFavicon" alt=">" width="24" height="24" style="margin-right: 5px" />

      <!-- Website href -->
      <a
        class="website-item-containter__link-name"
        :href="props.website.url"
        :title="website.description ? website.description : website.title"
        target="_blank"
        ><span :style="`color: ${props.website.hexColor}`">{{ props.website.title.charAt(0) }}</span
        >{{ props.website.title.slice(1) }}</a
      >

      <!-- Website settings buttons -->
      <div class="website-item-containter__buttons" v-if="props.isEditingModeActive">
        <!-- Edit website button -->
        <v-btn
          class="no-select website-item-containter__button"
          @click="onEditWebsite"
          variant="plain"
          size="small"
          rounded="0"
        >
          <v-icon icon="$pencil" color="white" size="24" />
        </v-btn>

        <!-- Delete website button -->
        <v-btn
          class="no-select website-item-containter__button"
          @click="onDeleteWebsite"
          variant="plain"
          size="small"
          rounded="0"
        >
          <v-icon icon="$delete" color="red" size="24" />
        </v-btn>
      </div>
    </div>
  </div>

  <!-- Website Editor Dialog -->
  <WebsiteEditor :website="website" v-model="isEditingBegun" />

  <!-- Website Delete Dialog -->
  <v-dialog id="website-delete-dialog__dialog" v-model="isActiveDeleteDialog" not-padding>
    <v-card class="delete-website-dialog__delete-card pa-1">
      <v-card-title>Удаление ссылки</v-card-title>
      <v-card-subtitle
        ><span class="card__subtitle-cacution">Действие необратимо</span></v-card-subtitle
      >

      <v-card-text>
        <p style="font-size: 14pt">
          Вы уверены, что хотите
          <span style="color: red; font-size: 14pt; text-decoration: underline">УДАЛИТЬ</span> сайт
          &quot;{{ props.website.title }}&quot; с описанием &quot;{{
            props.website.description ?? 'None'
          }}&quot;?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onDeleteWebsiteAccept()" variant="outlined">Да</v-btn>
        <v-btn @click="onDeleteWebsiteDenie()" variant="flat">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.website-item__content {
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 0px;
  justify-content: center;
  align-items: center;
  background-color: var(--background-item-color-dark-theme);
  border-radius: 13px;
  margin: 5px;
  padding: 5px;
  height: auto;

  &:hover {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
  }
}

.website-item__container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.website-item-containter__link-name {
  display: block;
  color: var(--text-color-dark-theme);
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16pt;
  overflow-wrap: break-word;
  width: 100%;
  max-width: 200px;

  &::first-letter {
    font-weight: 500;
  }
}

.website-item-containter__buttons {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: end;
}

.website-item-containter__button {
  min-width: 0px !important;
  padding: 0 4px !important;
}

.delete-website-dialog__delete-card {
  background: rgba(10, 10, 10, 0.75) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  color: white;
}

#website-delete-dialog__dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  max-width: 500px;
}

@media (max-width: 768px) {
  .website-item-containter__link-name {
    font-size: 14pt;
  }

  #website-delete-dialog__dialog {
    max-width: 90%;
  }
}
</style>
