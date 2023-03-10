import { PostsModels } from '../types';

export interface GetPostInput {
  token: string | undefined;
}

export type GetPostOutput = PostsModels[];

export interface CreatePostInput {
  token: string | undefined;
  content: unknown;
}

export interface LikeOrDislikeInput {
  idToLikeOrDislike: string;
  token: string;
  like: unknown;
}

export interface CreateCommentInput {
  id_post: string;
  token: string | undefined;
  comment: unknown;
}
