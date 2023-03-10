import { Database } from 'sqlite3';
import { PostsDB } from '../types';
import { BaseDatabase } from './BaseDatabase';
import { userdatabase } from './UsersDatabase';

export class PostsDatabase extends BaseDatabase {
  public static TABLE_POSTS = 'posts';
  public static TABLE_USERS = 'users';

  public getAllPosts = async () => {
    const result = await BaseDatabase.connection(
      PostsDatabase.TABLE_POSTS
    ).select();

    return result;
  };

  public getPostCreator = async () => {
    const postDB = await this.getAllPosts();
    const userDB = await BaseDatabase.connection(
      userdatabase.TABLE_USERS
    ).select();

    return {
      postDB,
      userDB,
    };
  };
  public insertPost = async (postDB: PostsDB) => {
    const result = await BaseDatabase.connection(
      PostsDatabase.TABLE_POSTS
    ).insert(postDB);
  };
  public postById = async (id: string): Promise<PostsDB> => {
    const result: PostsDB[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POSTS
    )
      .select()
      .where({ id: id });

    return result[0];
  };
}
