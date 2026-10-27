<script lang="ts" setup>
import type { WebsiteTagResponseDto } from '@/scripts/declaration'
import SearchWebsiteTagComponent from '@/view/subComponents/SearchWebsiteTagComponent.vue'
import WebsiteTagEditComponent from './WebsiteTagEditComponent.vue'
import { ref } from 'vue'

const currentWebsiteTag = ref<WebsiteTagResponseDto | undefined>(undefined)

function onClickTag(tag: WebsiteTagResponseDto) {
  currentWebsiteTag.value = tag
}
</script>

<template>
  <v-container class="d-flex flex-column" fluid>
    <v-row justify="center">
      <v-col cols="10">
        <h2>Настройка тегов</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <website-tag-edit-component :websiteTag="currentWebsiteTag" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <search-website-tag-component
          @click-on-tag="(tag: WebsiteTagResponseDto) => onClickTag(tag)"
          :show-close-button="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
