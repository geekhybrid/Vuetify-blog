<template>
  <v-container class="fill-height">
    <div class="h-100 w-100">
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
          <h1 class="text-h4">{{ id ? 'Edit Post' : 'New Post' }}</h1>
        </div>
      </div>

      <v-form @submit.prevent="handleSubmit" class="flex-grow-1 d-flex flex-column">
        <v-text-field
          v-model="title"
          label="Title"
          required
          class="mb-4"
        />

        <v-text-field
          v-model="author"
          label="Author"
          required
          class="mb-4"
        />

        <v-textarea
          v-model="content"
          label="Content"
          required
          auto-grow
          class="flex-grow-1 mb-4"
        />

        <div class="d-flex justify-end">
          <v-btn
            type="submit"
            color="primary"
            :loading="store.isLoading"
          >
            {{ id ? 'Update' : 'Create' }} Post
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/features/store'

const store = useBlogStore()
const router = useRouter()
const route = useRoute()
const title = ref('')
const author = ref('')
const content = ref<string | undefined>('')
const id = ref<number | null>(null)

onMounted(async () => {
  const postId = route.query.id ? Number(route.query.id) : null
  if (postId) {
    const post = store.getPost(postId)
    if (post) {
      id.value = post.id
      title.value = post.title
      author.value = post.author
      content.value = post.content
    }
  }
})

const handleSubmit = async () => {
  try {
    if (id.value) {
      await store.updatePost(id.value, {
        title: title.value,
        author: author.value,
        content: content.value,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        status: 'Draft'
      })
    } else {
      await store.addPost({
        title: title.value,
        author: author.value,
        content: content.value,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        status: 'Draft'
      })
    }
    await router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error('Failed to save post:', error)
  }
}
</script>
