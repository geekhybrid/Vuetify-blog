import { mount } from '@vue/test-utils'
import Dashboard from '../dashboard.vue'
import RecentPost from '../recent-post.vue'
import Loading from '../../../../shared-components/loading.vue'
import type { Post } from '../../types/post'
import { createVuetify } from 'vuetify'

const createTestPosts = (): Post[] => [
  {
    id: 1,
    title: 'Test Post 1',
    date: '2025-03-01',
    status: 'Published',
    author: 'Test Author 1'
  },
  {
    id: 2,
    title: 'Test Post 2',
    date: '2025-03-02',
    status: 'Draft',
    author: 'Test Author 2'
  },
  {
    id: 3,
    title: 'Test Post 3',
    date: '2025-03-03',
    status: 'Published',
    author: 'Test Author 3'
  }
]

const mockStore = {
  recentPosts: createTestPosts(),
  fetchRecentPosts: jest.fn(),
  isLoading: false,
  error: null as string | null
}

jest.mock('@/features/store', () => ({
  useBlogStore: () => mockStore
}))

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockStore.recentPosts = createTestPosts()
    mockStore.isLoading = false
    mockStore.error = null
  })

  const mountComponent = () => {
    return mount(Dashboard, {
      global: {
        plugins: [createVuetify()]
      }
    })
  }

  it('renders all posts from the store', async () => {
    const testPosts = createTestPosts()
    const wrapper = mountComponent()

    expect(mockStore.fetchRecentPosts).toHaveBeenCalledTimes(1)
    const renderedPosts = wrapper.findAllComponents(RecentPost)
    expect(renderedPosts).toHaveLength(testPosts.length)
    renderedPosts.forEach((post, index) => {
      expect(post.props('post')).toEqual(testPosts[index])
    })
  })

  it('shows loading state when loading', () => {
    mockStore.isLoading = true
    const wrapper = mountComponent()
    expect(wrapper.findComponent(Loading).exists()).toBe(true)
  })

  it('shows error message when there is an error', () => {
    mockStore.error = 'Test error message'
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('Test error message')
  })

  it('shows empty state when there are no posts', () => {
    mockStore.recentPosts = []
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('No posts yet')
  })
})
