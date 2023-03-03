import { PostsDB } from '../types';

export class Posts{
  constructor(
    public id: string,
    public userId: string,
    public content: string,
    public likes: number,
    public dislikes: number,
    public createdAt: string,
  ){}
public getId(): string{
  return this.id; 
}
public getUserId(): string{
  return this.userId; 
} 
public getContent(): string{
  return this.content; 
} 
public getLikes(): number{
  return this.likes; 
} 
public getDislikes(): number{
  return this.dislikes; 
}
public getCreatedAt(): string{
  return this.createdAt; 
}
public setId(id: string): void{
  this.id = id;
} 
public setUserId(user_id: string): void{
  this.userId = user_id;
}
public setContent(content: string): void{
  this.content = content;
}
public setLikes(likes: number): void{
  this.likes = likes;
} 
public toModelDB(): PostsDB{
  return {
    id: this.id,
    user_id: this.userId,
    content: this.content,
    likes: this.likes,
    dislikes: this.dislikes,
    created_at: this.createdAt,
  }     
}
}