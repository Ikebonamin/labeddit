import { UsersDB } from '../types';


export class Users{
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: string,
  ){}
public getId(): string{
  return this.id; 
}
public getName(): string{
  return this.name; 
}
public getEmail(): string{
  return this.email; 
}
public getPassword(): string{
  return this.password; 
}
public getCreatedAt(): string{
  return this.createdAt; 
}
public setId(id: string): void{
  this.id = id;
}
public setName(name: string): void{
  this.name = name;
}
public setEmail(email: string): void{
  this.email = email;
} 
public setPassword(password: string): void{
  this.password = password;
}
public setCreatedAt(createdAt: string): void{
  this.createdAt = createdAt;
}
public toModelDB(): UsersDB{
  return {
    id: this.getId(),
    name: this.getName(),
    email: this.getEmail(),
    password: this.getPassword(),
    created_at: this.getCreatedAt(),
    // isso é sensacional!//
  }
}
} 
