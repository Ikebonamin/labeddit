export interface TokenPayload {
  id: string;
  apelido: string;
}

export interface UsersDB {
  id: string;
  apelido: string;
  email: string;
  password: string;
  created_at: string;
}

export interface UsersModels {
  id: string;
  apelido: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface PostsDB {
  id: string;
  user_id: string;
  content: string;
  comment: string;
  likes: number;
  dislikes: number;
  created_at: string;
}
export interface PostsModels {
  id: string;
  userId: string;
  content: string;
  comment: string;
  likes: number;
  dislikes: number;
  createdAt: string;
}

export interface CommentsDB {
  id: string;
  user_id: string;
  post_id: string;
  comment: string;
  likes: number;
  dislikes: number;
  created_at: string;
}
export interface CommentsModels {
  id: string;
  user_id: string;
  post_id: string;
  comments: string;
  likes: number;
  dislikes: number;
  createdAt: string;
}

export interface Posts_likes_dislikesDB {
  user_id: string;
  post_id: string;
  likes: number;
}

export interface Posts_likes_dislikesModels {
  user_id: string;
  post_id: string;
  likes: number;
}

export interface Comments_likes_dislikesDB {
  user_id: string;
  comment_id: string;
  likes: number;
}
export interface Comments_likes_dislikesModels {
  userId: string;
  commentId: string;
  likes: number;
}
export interface PostsCreatorDB {
  id: string;
  content: string;
  comment: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}
