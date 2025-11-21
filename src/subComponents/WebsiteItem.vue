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

const fLetterColor = props.website.hexColor

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
  <div class="website-item-containter">
    <div class="website-item">
      <!-- Website favicon -->
      <img :src="linkFetchFavicon" alt=">" width="24" height="24" style="margin-right: 5px" />

      <!-- Website href -->
      <a
        class="link-name"
        :href="props.website.url"
        :title="website.description ? website.description : website.title"
        target="_blank"
        >{{ props.website.title }}</a
      >

      <!-- Website settings buttons -->
      <div class="website-item-buttons" v-if="props.isEditingModeActive">
        <!-- Edit website button -->
        <VBtn
          class="no-select website-item-button"
          @click="onEditWebsite"
          variant="plain"
          size="small"
          rounded="0"
        >
          <v-icon icon="$pencil" color="white" size="24" />
        </VBtn>

        <!-- Delete website button -->
        <VBtn
          class="no-select website-item-button"
          @click="onDeleteWebsite"
          variant="plain"
          size="small"
          rounded="0"
        >
          <v-icon icon="$delete" color="red" size="24" />
        </VBtn>
      </div>
    </div>
  </div>

  <!-- Website Editor Dialog -->
  <WebsiteEditor :website="website" v-model="isEditingBegun" />

  <!-- Website Delete Dialog -->
  <v-dialog id="website-delete-dialog" v-model="isActiveDeleteDialog" not-padding>
    <VCol id="website-delete-items">
      <p>
        Вы уверены, что хотите удалить сайт &quot;{{ props.website.title }}&quot; с описанием
        &quot;{{ props.website.description ?? 'None' }}&quot;?
      </p>
      <VRow id="website-delete-dialog-answer-buttons">
        <VBtn @click="onDeleteWebsiteAccept()">Да</VBtn>
        <VBtn @click="onDeleteWebsiteDenie()">Отмена</VBtn>
      </VRow>
    </VCol>
  </v-dialog>
</template>

<style lang="scss">
.website-item-containter {
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 0px;
  justify-content: center;
  align-items: center;
  background-color: var(--background-item-color-dark-theme);
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  height: auto;
}

.website-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.link-name {
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

  &::first-letter {
    color: v-bind(fLetterColor);
  }
}

.website-item-buttons {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: end;
}

.website-item-button {
  min-width: 0px !important;
  padding: 0 4px !important;
}

#website-delete-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  max-width: 500px;
}

#website-delete-items {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  gap: 20px;
  background-color: var(--background-second-color-dark-theme);
  border-radius: 20px;
  padding: 20px;

  & > p {
    color: red;
    font-size: 18pt;
    text-align: center;
  }
}

#website-delete-dialog-answer-buttons {
  display: flex;
  justify-content: end;
  align-items: center;
  flex-flow: row wrap;
  flex: 1 0 auto;
  gap: 10px;
}

@media (max-width: 768px) {
  .link-name {
    font-size: 14pt;
  }

  #website-delete-dialog {
    max-width: 90%;
  }
}
</style>
