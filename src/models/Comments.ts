import { CommentsDB } from '../types';

export class Comments{
  constructor(
    public id: string,
    public userId: string,
    public postId: string,
    public comment: string,
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
public getPostId(): string{
  return this.postId; 
}
public getComment(): string{
  return this.comment; 
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
public setPostId(post_id: string): void{
  this.postId = post_id;
} 
public setComment(comment: string): void{
  this.comment = comment;
} 
public setLikes(likes: number): void{
  this.likes = likes;
}
public setDislikes(dislikes: number): void{
  this.dislikes = dislikes;
}
public setCreatedAt(createdAt: string): void{
  this.createdAt = createdAt;
}
public toModelDB(): CommentsDB{
  return {
    id: this.id,
    user_id: this.userId,
    post_id: this.postId,
    comment: this.comment,
    likes: this.likes,
    dislikes: this.dislikes,
    created_at: this.createdAt,
  }
}
}