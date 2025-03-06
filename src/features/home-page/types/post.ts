export interface Post {
  id: number
  title: string
  date: string
  status: 'Published' | 'Draft'
  author: string
  content?: string
}