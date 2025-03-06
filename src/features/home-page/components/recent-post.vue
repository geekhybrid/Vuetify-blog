<template>
    <div class="d-flex flex-row w-100 align-center">
        <v-btn small dense color="error" class="mt-1" @click.stop="showDialog = true">
            Delete
        </v-btn> 
        
        <v-list-item hover link @click="handleClick">
            <v-list-item-title class="my-auto"> {{ post.title }}</v-list-item-title>
            <v-list-item-subtitle class="my-auto">
                <span class="text-medium-emphasis">By {{ post.author }} on {{ post.date }}</span>
                <v-chip size="small" :color="post.status === 'Published' ? 'success' : 'warning'" class="ml-2">
                    {{ post.status }}
                </v-chip>
                <v-spacer />
            </v-list-item-subtitle>
        </v-list-item>

        <v-dialog v-model="showDialog" max-width="500">
            <v-card>
                <v-card-title class="text-h5">
                    Confirm Delete
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete "{{ post.title }}"? This action cannot be undone.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" variant="text" @click="showDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" variant="text" @click="handleDelete">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { Post } from '../types/post'
import { useBlogStore } from '@/stores'

const router = useRouter()
const store = useBlogStore()
const showDialog = ref(false)

const props = defineProps<{
    post: Post
}>()

const handleClick = () => {
    router.push({
        name: 'PostPreview',
        params: { id: props.post.id }
    })
}

const handleDelete = async () => {
    await store.removePost(props.post.id)
    showDialog.value = false
}
</script>

<style scoped></style>