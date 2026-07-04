export interface Author {
  id: number,
  username: string,
  avatar_url: string
}

export interface Comment {
  id: number,
  author_id: number,
  content: string,
  username: string,
  user_avatar?: string
  created_at?: Date,
  updated_at?: Date,
  author: Author
  
}
