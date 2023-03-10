import { PostsDatabase } from '../database/PostDatabase';
import {
  CreateCommentInput,
  CreatePostInput,
  GetPostInput,
  GetPostOutput,
} from '../dtos/PostsDTO';
import { BadRequestError } from '../errors/BadRequest';
import { NotFoundError } from '../errors/NotFound';
import { Posts } from '../models/Posts';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { PostsDB } from '../types';

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPosts = async (input: GetPostInput): Promise<GetPostOutput> => {
    const { token } = input;

    if (!token) {
      throw new NotFoundError(" 'Token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("'Token' inválido");
    }

    const { postDB, userDB } = await this.postsDatabase.getPostCreator();

    function creator(userId: string) {
      const user = userDB.find((userDB) => {
        return userDB.id === userId;
      });

      return {
        id: user.id,
        name: user.name,
      };
    }

    const posts = postDB.map((postDB) => {
      const post = new Posts(
        postDB.id,
        postDB.content,
        postDB.comment,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        creator(postDB.user_id)
      );

      return post.toBusinessPostsModels();
    });
    const output: GetPostOutput = posts;

    return output;
  };
  public createPost = async (input: CreatePostInput): Promise<void> => {
    const { token, content } = input;

    if (!token) {
      throw new NotFoundError(" 'Token' ausente ou incorreto");
    }

    if (content === null) {
      throw new BadRequestError('Conteúdo vazio');
    }
    if (typeof content !== 'string') {
      throw new BadRequestError('Conteúdo deve ser string');
    }
    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError('Payload inexistente');
    }
    const id = this.idGenerator.generate();
    const created_at = new Date().toISOString();
    const user_id = payload.id;

    const newPost = new Posts(id, content, '', 0, 0, created_at, {
      id: user_id,
      name: payload.apelido,
    });

    const postDB = newPost.toModelsPostsDB();
    await this.postsDatabase.insertPost(postDB);
  };
  public createComment = async (input: CreateCommentInput): Promise<void> => {
    const { id_post, comment, token } = input;

    if (!token) {
      throw new NotFoundError(" 'Token' ausente ou incorreto");
    }
    if (id_post) {
      throw new NotFoundError(" 'Token' ausente ou incorreto");
    }

    if (comment === null) {
      throw new BadRequestError('Conteúdo vazio');
    }
    if (typeof comment !== 'string') {
      throw new BadRequestError('Conteúdo deve ser string');
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError('Payload inexistente');
    }
    const filterspost = await this.postsDatabase.postById(id_post);
    if (!filterspost) {
      throw new BadRequestError('Post não encontrado');
    }
    // const id = this.idGenerator.generate();
    // const newComment = new Posts(id, content, '', 0, 0, created_at, {
    //   id: user_id,
    //   name: payload.apelido,
    // });
  };
}
