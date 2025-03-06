import type { Meta, StoryObj } from '@storybook/vue3'
import Dashboard from '../dashboard.vue'
import { useBlogStore } from '@/stores'
import type { Post } from '../../types/post'

const mockPosts: Post[] = [
  {
    id: 1,
    title: '10 Tips for Better Blog Writing',
    date: 'March 5, 2025',
    status: 'Published',
    author: 'John Doe'
  },
  {
    id: 2,
    title: 'Understanding SEO Basics',
    date: 'March 4, 2025',
    status: 'Draft',
    author: 'Jane Smith'
  }
]

const withStoreOverride = <T extends {
  recentPosts?: Post[],
  isLoading?: boolean,
  error?: string | null
}>(stateToOverride: T) => {
  return () => ({
    setup() {
      const store = useBlogStore()
      store.fetchRecentPosts = async () => {
        if (stateToOverride?.recentPosts) {
          store.recentPosts = stateToOverride.recentPosts
        }
        if (stateToOverride?.isLoading !== undefined) {
          store.isLoading = stateToOverride.isLoading
        }
        if (stateToOverride?.error !== undefined) {
          store.error = stateToOverride.error
        }
      }
      return {}
    },
    template: '<div><story /></div>'
  })
}

const meta = {
  title: 'Components/HomePage/dashboard.vue',
  component: Dashboard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Dashboard component is the main landing page of our blog application. 
It displays a greeting to the admin and shows a list of recent blog posts.

## Features
- Displays a welcoming header with a motivational quote
- Shows a "New Post" button that links to the post creation page
- Lists recent blog posts with their titles, dates, and status
- Handles loading, error, and empty states gracefully`
      }
    }
  }
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof meta>

export const WithData: Story = {
  decorators: [
    withStoreOverride({
      recentPosts: mockPosts,
      isLoading: false,
      error: null
    })
  ]
}

export const WhenLoading: Story = {
  decorators: [
    withStoreOverride({
      recentPosts: [],
      isLoading: true,
      error: null
    })
  ]
}

export const WhenEmpty: Story = {
  decorators: [
    withStoreOverride({
      recentPosts: [],
      isLoading: false,
      error: null
    })
  ]
}
