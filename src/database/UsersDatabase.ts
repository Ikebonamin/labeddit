import { Users } from '../models/Users';
import { UsersDB } from '../types';
import { BaseDatabase } from './BaseDatabase';

// depois de passarmos pelo vai e vem da controller e business, vamos puxar nossa tabela em questão, e criar os métodos usadons NA BUSINESS

export class userdatabase extends BaseDatabase {
  // se vamos editar a tabela users, chamamos ela!
  public static TABLE_USERS = 'users';
  //se o método é inserir chamamos o código abaixo//
  public async insert(usersDB: UsersDB): Promise<void> {
    await BaseDatabase.connection(userdatabase.TABLE_USERS).insert(usersDB);
  }
  public findByEmail = async (email: string): Promise<UsersDB | undefined> => {
    const result: UsersDB[] = await BaseDatabase.connection(
      userdatabase.TABLE_USERS
    )
      .select()
      .where({ email });
    return result[0];
  };
}
// pra esses métodos funcionarem, vamos para a rota o index e criamos a rota dessa forma agora o vai e volta é entre UserDatabase e UserRouter e Index!
