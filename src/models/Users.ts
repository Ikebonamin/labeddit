import { UsersDB, UsersModels } from '../types';

export class Users {
  constructor(
    public id: string,
    public apelido: string,
    public email: string,
    public password: string,
    public createdAt: string
  ) {}
  public getId(): string {
    return this.id;
  }
  public getApelido(): string {
    return this.apelido;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setId(id: string): void {
    this.id = id;
  }
  public setApelido(apelido: string): void {
    this.apelido = apelido;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }
  public toModelDB(): UsersDB {
    return {
      id: this.getId(),
      apelido: this.getApelido(),
      email: this.getEmail(),
      password: this.getPassword(),
      created_at: this.getCreatedAt(),
      // isso é sensacional!//
    };
  }
  public toBusinessPostsModels(): UsersModels {
    return {
      id: this.getId(),
      apelido: this.getApelido(),
      email: this.getEmail(),
      password: this.getPassword(),
      createdAt: this.getCreatedAt(),
    };
  }
}
