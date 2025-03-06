<template>
  <v-container class="fill-height pa-8">
    <div class="d-flex flex-column h-100">
      <div class="d-flex align-center mb-6">
        <v-btn
          variant="text"
          color="primary"
          :to="{ name: 'Dashboard' }"
          class="me-4"
          prepend-icon="mdi-arrow-left"
        >
          Back
        </v-btn>
        <div>
          <h1 class="text-h4">{{ post?.title }}</h1>
          <p class="text-subtitle-1 text-medium-emphasis">By {{ post?.author }} on {{ post?.date }}</p>
        </div>
        <v-spacer />
        <v-chip
          size="large"
          :color="post?.status === 'Published' ? 'success' : 'warning'"
        >
          {{ post?.status }}
        </v-chip>
      </div>

      <div class="text-body-1 flex-grow-1">
        <div v-html="post?.content"></div>
      </div>

      <div class="d-flex justify-end mt-6">
        <v-btn
          variant="text"
          color="primary"
          :to="{
            name: 'Editor',
            query: { id: post?.id }
          }"
        >
          Edit Post
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/features/store'

const route = useRoute()
const store = useBlogStore()

const post = computed(() => {
  const postId = Number(route.params.id)
  return store.recentPosts.find(p => p.id === postId)
})
</script>
