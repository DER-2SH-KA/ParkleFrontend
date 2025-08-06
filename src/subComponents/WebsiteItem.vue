<script lang="ts" setup>
import { ref } from 'vue'
import type { WebsiteResponseDto } from '@/scripts/declaration'

const props = defineProps<{
  website: WebsiteResponseDto
  isEditingModeActive: boolean
}>()

const emits = defineEmits<{
  onDelete: [id: string]
}>()

const isActiveDeleteDialog = ref<boolean>(false)

const fLetterColor = props.website.hexColor

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
  <div class="website-item">
    <a
      class="link-name"
      :href="props.website.url"
      :title="website.description ? website.description : website.title"
      target="_blank"
      >{{ props.website.title }}</a
    >
    <VBtn
      class="link-delete"
      @click="onDeleteWebsite"
      variant="plain"
      size="small"
      rounded="lg"
      :style="`display: ${props.isEditingModeActive ? 'block' : 'none'}; color: red;`"
      >&otimes;</VBtn
    >

    <v-dialog id="website-delete-dialog" v-model="isActiveDeleteDialog" not-padding>
      <VCol id="website-delete-items">
        <p>
          Are you sure you want to delete the site with title '{{ props.website.title }}' and
          description '{{ props.website.description ?? 'None' }}'?
        </p>
        <VRow id="website-delete-dialog-answer-buttons">
          <VBtn @click="onDeleteWebsiteAccept()">Yes</VBtn>
          <VBtn @click="onDeleteWebsiteDenie()">Cancel</VBtn>
        </VRow>
      </VCol>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.website-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-item-color-dark-theme);
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
}

.link-name {
  color: var(--text-color-dark-theme);
  text-align: center;
  text-decoration: none;
  font-size: 14pt;

  &::first-letter {
    color: v-bind(fLetterColor);
  }
}

.link-delete {
  color: red;
  text-align: end;
  text-decoration: none;
  font-size: 14pt;
  padding: 0px 3px;
  margin-left: 10px;
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
  #website-delete-dialog {
    max-width: 90%;
  }
}
</style>
