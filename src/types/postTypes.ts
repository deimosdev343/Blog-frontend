export interface Post {
  id: number,
  author_id: number,
  title: string,
  content: string,
  username: string,
  user_avatar?: string
  created_at?: Date,
  updated_at?: Date
}
