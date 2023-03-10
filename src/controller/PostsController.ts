import { Request, Response } from 'express';
import {
  CreateCommentInput,
  CreatePostInput,
  GetPostInput,
} from '../dtos/PostsDTO';
import { BaseError } from '../errors/BaseError';
import { PostsBusiness } from '../business/PostsBusiness';

export class PostsController {
  constructor(private postsBusiness: PostsBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input: GetPostInput = {
        token: req.headers.authorization,
      };
      const output = await this.postsBusiness.getPosts(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };
  public createPost = async (req: Request, res: Response) => {
    try {
      const input: CreatePostInput = {
        token: req.headers.authorization,
        content: req.body.content,
      };
      const output = await this.postsBusiness.createPost(input);
      res.status(200).send('Post criado com sucesso');
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };
  public createComment = async (req: Request, res: Response) => {
    try {
      const input: CreateCommentInput = {
        id_post: req.body.post_id,
        token: req.headers.authorization,
        comment: req.body.comment,
      };
      const output = await this.postsBusiness.createComment(input);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };
}
