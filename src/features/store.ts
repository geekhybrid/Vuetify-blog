import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/features/home-page/types/post'

export const useBlogStore = defineStore('blog', () => {
  const recentPosts = ref<Post[]>([])

  const seedPosts: Post[] = [
    {
      id: 1,
      title: 'Why I used Screaming Architecture',
      date: 'March 3, 2025',
      status: 'Published',
      author: 'Hocaha Enyi',
      content: `
        <p>Screaming architecture is a style of organising files that allow the intent of the app to be visible at a high level. 
        I have introduced non-standard-vue-project folders like features and arranged contents in them to immediately hint at what the app is about.</p>

        <br/>
        <p>Some frameworks benefit from conventions such as directory naming e.g '/components', '/layouts', '/pages', '/store', '/router', '/plugins etc. 
        While screaming Architecture goes a step further by making the intent of the app visible at a high level, it might be a bit "different" or "strange" for people who are used to working
        with conventional scaffolding.</p>

        <hr style="margin:5px"/>

        <h3>Also I have chosen to keep related files together. This adheres to principle of proximity. So while this is not also very conventional, I have found it helpful in the past for very large projects.</h3>

        <img src="https://miro.medium.com/v2/resize:fit:1400/1*Tivq9b-eXo9NqBLhrwLMIQ.png" style="margin-top:20px">
        <p>Source: https://miro.medium.com/v2/resize:fit:1400/1*Tivq9b-eXo9NqBLhrwLMIQ.png</p>` 
    },
    {
      id: 2,
      title: 'Why I used Visual Testing using Storybook',
      date: 'March 3, 2025',
      status: 'Published',
      author: 'Hocaha Enyi',
      content: `
        <p>For a project of this size, it wasn't absolutely necessary, but merely a demonstration of how I prefer to document my components when collaborating with designers and product managers. Storybook is a good designer-developer documentation and testing tool.</p>

        <hr style="margin:5px"/>

        <h3>One sentence for why I used Storybook</h3>
        <p>The whole app/page doesn't need to be ready to get a feel of how distinct components will look, feel and work.</p>`
    },
    {
      id: 3,
      title: 'My Perspective on Pragmatic Development',
      date: 'March 4, 2025',
      status: 'Draft',
      author: 'Hocaha Enyi',
      content: `Sometimes it isn't always feasible to do fancy-unit-tested components with a storybook implementation, I am not a purist. However, when possible I try to make things better by incorporating these practices.`
    },
    {
      id: 5,
      title: 'Lionel Messi is the GOAT',
      date: 'March 2, 2025',
      status: 'Published',
      author: 'Jane Smith',
      content: 'Just a daily reminder to myself that I was previledged to watch LM10 play.'
    }
  ]

  const storedPosts = localStorage.getItem('posts')
  if (storedPosts) {
    recentPosts.value = JSON.parse(storedPosts)
  } else {
    recentPosts.value = seedPosts
    localStorage.setItem('posts', JSON.stringify(recentPosts.value))
  }

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchRecentPosts = async () => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (e) {
      error.value = 'Failed to fetch posts'
    } finally {
      isLoading.value = false
    }
  }

  const getPost = (id: number) => {
    return recentPosts.value.find(post => post.id === id) || null
  }

  
  const savePostsToLocalStorage = () => 
    localStorage.setItem('posts', JSON.stringify(recentPosts.value))

  const addPost = async (newPost: Omit<Post, 'id'>) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const post: Post = {
        ...newPost,
        id: Math.max(...recentPosts.value.map(p => p.id)) + 1
      }
      recentPosts.value.unshift(post)
      savePostsToLocalStorage()
      return post
    } catch (e) {
      error.value = 'Failed to add post'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const updatePost = async (id: number, updates: Omit<Post, 'id'>) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const index = recentPosts.value.findIndex(p => p.id === id)
      if (index === -1) {
        throw new Error('Post not found')
      }
      recentPosts.value[index] = {
        ...recentPosts.value[index],
        ...updates
      }

      savePostsToLocalStorage()
      return recentPosts.value[index]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update post'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const removePost = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const index = recentPosts.value.findIndex(p => p.id === id)
      if (index === -1) {
        throw new Error('Post not found')
      }
      recentPosts.value.splice(index, 1)
      savePostsToLocalStorage()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to remove post'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    recentPosts,
    isLoading,
    error,
    fetchRecentPosts,
    addPost,
    getPost,
    updatePost,
    removePost
  }
})