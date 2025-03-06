import { mount } from '@vue/test-utils'
import RecentPost from '../recent-post.vue'
import type { Post } from '../../types/post'
import type { ComponentMountingOptions } from '@vue/test-utils'
import { describe, it, expect, jest } from '@jest/globals'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'

describe('RecentPost.vue', () => {
  const createTestPost = (fields?: Partial<Post>): Post => ({
    id: 1,
    title: 'Test Blog Post',
    date: '2025-03-05',
    status: 'Published',
    author: 'Test Author',
    ...fields
  })

  const mountComponent = (post: Post) => {
    const options: ComponentMountingOptions<typeof RecentPost> = {
      props: { post },
      global: {
        plugins: [createVuetify(), createPinia()]
      }
    }
    return mount(RecentPost, options)
  }

  it('displays the post title correctly', () => {
    const post = createTestPost({ title: 'My Test Post' })
    const unitUnderTest = mountComponent(post)

    const title = unitUnderTest.find('.v-list-item-title')
    expect(title.text()).toBe('My Test Post')
  })

  it('displays the post date and author correctly', () => {
    const post = createTestPost({ 
      date: '2025-03-05',
      author: 'John Doe'
    })
    const unitUnderTest = mountComponent(post)

    const subtitle = unitUnderTest.find('.v-list-item-subtitle')
    expect(subtitle.text()).toContain('2025-03-05')
    expect(subtitle.text()).toContain('John Doe')
  })

  it('shows success color for published posts', () => {
    const post = createTestPost({ status: 'Published' })
    const unitUnderTest = mountComponent(post)
    const chip = unitUnderTest.findComponent({ name: 'VChip' })

    expect(chip.props('color')).toBe('success')
    expect(chip.text()).toBe('Published')
  })

  it('shows warning color for draft posts', () => {
    const post = createTestPost({ status: 'Draft' })
    const unitUnderTest = mountComponent(post)
    const chip = unitUnderTest.findComponent({ name: 'VChip' })

    expect(chip.props('color')).toBe('warning')
    expect(chip.text()).toBe('Draft')
  })

  it('Should throw when post prop is not provided', () => {
    console.error = jest.fn()

    // @ts-expect-error - Testing missing required prop
    expect(() => mountComponent()).toThrow()
  })

  it('Should not throw when valid props are provided', () => {
    const post = createTestPost()
    expect(() => mountComponent(post)).not.toThrow()
  })
})
