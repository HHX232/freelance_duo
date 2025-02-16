export interface INews {
  id: number
  created_at: string
  title: string
  description: string
  image_path: string
  content: string
  onClick?: () => void
  selected?: number
  slug: string
}
