import type { Meta, StoryObj } from '@storybook/vue3'
import RecentPost from '../recent-post.vue'
import type { Post } from '@/features/home-page/types/post'

const meta = {
  title: 'Components/HomePage/recent-post.vue',
  component: RecentPost,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div style="width: 900px"><story /></div>'
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `
A component that displays a single blog post item with its title, date, and status.

## Features
- Shows post title with proper formatting
- Displays post date and author
- Indicates post status (Published/Draft)`
      }
    }
  }
} satisfies Meta<typeof RecentPost>

export default meta
type Story = StoryObj<typeof meta>

const basePost: Post = {
  id: 1,
  title: '10 Tips for Better Blog Writing',
  date: 'March 5, 2025',
  status: 'Published',
  author: 'John Doe'
}

export const Published: Story = {
  args: {
    post: basePost
  }
}

export const Draft: Story = {
  args: {
    post: {
      ...basePost,
      id: 2,
      title: 'Understanding SEO Basics',
      date: 'March 4, 2025',
      status: 'Draft',
      author: 'Jane Smith'
    }
  }
}

export const LongTitle: Story = {
  args: {
    post: {
      ...basePost,
      id: 3,
      title: 'This is a very long blog post title that might wrap to multiple lines and need special handling in the UI',
      date: 'March 3, 2025',
      author: 'Mike Johnson'
    }
  }
}
