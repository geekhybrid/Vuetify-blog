<template>
  <v-container fluid>
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4 bg-secondary">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h1 class="text-h4 mb-2">Hi, Blog Contributor!</h1>
              <p>"Your intuition knows what to write, so get out of the way."</p>
            </div>
            <v-btn class="bg-primary" prepend-icon="mdi-plus"  :to="{ name: 'Editor' }">New Post</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-card-title class="text-h5">Recent Posts</v-card-title>
          
          <loading v-if="store.isLoading" />

          <v-card-text v-else-if="store.error">
            <v-alert type="error" :text="store.error" />
          </v-card-text>

          <v-card-text v-else-if="!store.recentPosts.length">
            <v-alert type="info" text="No posts yet. Click 'New Post' to create your first post!" />
          </v-card-text>

          <v-list v-else lines="two">
            <recent-post v-for="post in store.recentPosts" :key="post.id" :post="post" />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import RecentPost from '@/features/home-page/components/recent-post.vue'
import { useBlogStore } from '@/stores'
import Loading from '@/shared-components/loading.vue'

const store = useBlogStore()
onMounted(useBlogStore().fetchRecentPosts)
</script>
