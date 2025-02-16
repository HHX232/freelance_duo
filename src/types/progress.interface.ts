export interface IProgress {
  id: number
  name: string
  image: string
  total_images: number
  last_image_date: string | null
}

export interface IProgressItem {
  id: number
  name: string
  months: IProgressMonths[]
  title: string
  meta_description: string
}

export interface IProgressMonths {
  name: string
  images: string[]
}
