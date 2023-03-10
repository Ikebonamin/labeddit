import { userdatabase } from '../database/UsersDatabase';
import {
  LogInDTO,
  LoginOutputDTO,
  SignupDTOInput,
  SignUpDTOOutput,
} from '../dtos/UserDTO';
import { BadRequestError } from '../errors/BadRequest';
import { NotFoundError } from '../errors/NotFound';
import { Users } from '../models/Users';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { TokenPayload } from '../types';

//feito o usercontroller, vem pra cá //
export class UserBusiness {
  constructor(
    private userDatabase: userdatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}
  // criamos o método chamado pela controller aqui. Sem esse método dá erro lá.
  //aqui tem o try and catch, sempre,

  public signup = async (input: SignupDTOInput): Promise<SignUpDTOOutput> => {
    const { apelido, email, password } = input;
    console.log('input business', input);

    //reprovou?
    if (typeof apelido !== 'string') {
      throw new BadRequestError("'Name' deve ser string");
    }

    if (typeof email !== 'string') {
      throw new BadRequestError("'Email' deve ser string");
    }

    if (typeof password !== 'string') {
      throw new BadRequestError("'Password' deve ser string");
    }

    //passou? Criamos um novo objeto instanciando o modelo users
    else {
      const id = this.idGenerator.generate();
      const HashedPassowrd = await this.hashManager.hash(password);
      const newuser = new Users(
        id,
        apelido,
        email,
        HashedPassowrd,
        new Date().toISOString()
      );
      console.log(`"newuser"`, newuser);

      //criado o usuário, com os dados do front, transformamos em objeto com formato DataBase!

      const userDB = newuser.toModelDB();
      // criado o modelo de database, precisamos inserir no banco de dados. Para isso criamos o metodo

      await this.userDatabase.insert(userDB);

      // agora é proteger os dados, via tokens e payload.

      const payload: TokenPayload = {
        id: newuser.getId(), //como o newuser é instancia de users, chamamos os métodos herdados
        apelido: newuser.getApelido(),
      };
      // autorizamos o usuário com nome e apelido.
      const output: SignUpDTOOutput = {
        token: this.tokenManager.createToken(payload),
      };
      return output;
    }
    // agora voltamos para o Usersdatabase e resolvemos o método da linha 45
  };
  public login = async (input: LogInDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    if (typeof email !== 'string') {
      throw new BadRequestError("'Email' deve ser string");
    }

    if (typeof password !== 'string') {
      throw new BadRequestError("'Password' deve ser string");
    }
    const UserDB = await this.userDatabase.findByEmail(email);
    if (!UserDB) {
      throw new NotFoundError('e-mail inválido');
    }
    const isPassCorrect = await this.hashManager.compare(
      password,
      UserDB.password
    );
    if (!isPassCorrect) {
      throw new Error('Senha inválida');
    }
    const users = new Users(
      UserDB.id,
      UserDB.apelido,
      UserDB.email,
      UserDB.password,
      UserDB.created_at
    );
    const payload: TokenPayload = {
      id: users.getId(),
      apelido: users.getApelido(),
    };
    const token = this.tokenManager.createToken(payload);
    const output: LoginOutputDTO = {
      token,
    };
    return output;
  };
}
