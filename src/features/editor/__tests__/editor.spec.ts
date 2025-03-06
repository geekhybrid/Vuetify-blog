import { mount, flushPromises } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import Editor from '../editor.vue'
import type { Post } from '@/features/home-page/types/post'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: { template: '<div>Home</div>' }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: { template: '<div>Dashboard</div>' }
    }
  ]
})

const vuetify = createVuetify()

const mockStore = {
  recentPosts: [] as Post[],
  addPost: jest.fn(),
  updatePost: jest.fn(),
  getPost: jest.fn(),
  isLoading: false,
  error: null as string | null
}

jest.mock('@/stores', () => ({
  useBlogStore: () => mockStore
}))

describe('Editor.vue', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    mockStore.recentPosts = []
    mockStore.isLoading = false
    mockStore.error = null
    await router.push('/')
    await router.isReady()
  })

  const createTestPost = (fields?: Partial<Post>): Post => ({
    id: 1,
    title: 'Test Post',
    author: 'Test Author',
    content: 'Test Content',
    date: 'March 6, 2025',
    status: 'Draft',
    ...fields
  })

  const mountEditor = async (query = {}, initialPost?: Post) => {
    await router.push({ name: 'Editor', query })
    await router.isReady()
    
    if (initialPost) {
      mockStore.recentPosts = [initialPost]
      mockStore.getPost.mockReturnValue(initialPost)
    }
    
    return mount(Editor, {
      global: {
        plugins: [vuetify, router]
      }
    })
  }

  it('should render new post form by default', async () => {
    const unitUnderTest = await mountEditor()
    expect(unitUnderTest.find('h1').text()).toBe('New Post')
    expect(unitUnderTest.find('[type="submit"]').text()).toBe('Create Post')
  })

  it('should load post data when editing existing post', async () => {
    const post = createTestPost()
    const unitUnderTest = await mountEditor({ id: '1' }, post)

    expect(unitUnderTest.find('h1').text()).toBe('Edit Post')
    expect(unitUnderTest.find('[type="submit"]').text()).toBe('Update Post')
    expect(unitUnderTest.findAllComponents({ name: 'VTextField' }).length).toBe(2)
    expect(unitUnderTest.findComponent({ name: 'VTextarea' }).exists()).toBe(true)
  })

  it('should create new post and redirect to dashboard', async () => {
    const unitUnderTest = await mountEditor()
    const newPost = createTestPost({ id: 2 })
    const addPostPromise = Promise.resolve(newPost)
    mockStore.addPost.mockReturnValue(addPostPromise)

    await unitUnderTest.findAllComponents({ name: 'VTextField' })[0].setValue('New Post')
    await unitUnderTest.findAllComponents({ name: 'VTextField' })[1].setValue('New Author')
    await unitUnderTest.findComponent({ name: 'VTextarea' }).setValue('New Content')
    await unitUnderTest.find('form').trigger('submit.prevent')
    
    await flushPromises()

    expect(mockStore.addPost).toHaveBeenCalledWith({
      title: 'New Post',
      author: 'New Author',
      content: 'New Content',
      date: expect.any(String),
      status: 'Draft'
    })
    expect(router.currentRoute.value.name).toBe('Dashboard')
  })

  it('should update existing post and redirect to dashboard', async () => {
    const post = createTestPost()
    const unitUnderTest = await mountEditor({ id: '1' }, post)
    const updatePostPromise = Promise.resolve(post)
    mockStore.updatePost.mockReturnValue(updatePostPromise)

    await unitUnderTest.findAllComponents({ name: 'VTextField' })[0].setValue('Updated Post')
    await unitUnderTest.findAllComponents({ name: 'VTextField' })[1].setValue('Updated Author')
    await unitUnderTest.findComponent({ name: 'VTextarea' }).setValue('Updated Content')
    await unitUnderTest.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(mockStore.updatePost).toHaveBeenCalledWith(1, {
      title: 'Updated Post',
      author: 'Updated Author',
      content: 'Updated Content',
      date: expect.any(String),
      status: 'Draft'
    })
    expect(router.currentRoute.value.name).toBe('Dashboard')
  })

  it('should handle store errors gracefully', async () => {
    const unitUnderTest = await mountEditor()
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockStore.addPost.mockRejectedValueOnce(new Error('Failed to save'))

    await unitUnderTest.findAllComponents({ name: 'VTextField' })[0].setValue('New Post')
    await unitUnderTest.findAllComponents({ name: 'VTextField' })[1].setValue('New Author')
    await unitUnderTest.findComponent({ name: 'VTextarea' }).setValue('New Content')
    await unitUnderTest.find('form').trigger('submit.prevent')

    expect(consoleSpy).toHaveBeenCalledWith('Failed to save post:', expect.any(Error))
    consoleSpy.mockRestore()
  })
})
