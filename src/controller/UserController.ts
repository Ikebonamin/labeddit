//controller e business é legal fazer junto
// cria o arquivo userbusiness.ts, e a classe. A parti disso exporta ela vaia mesmo. Só pra...
// instanciar aqui na controller!

// esses imports são cássicos:
import { UserBusiness } from '../business/UserBusiness';
import { BaseError } from '../errors/BaseError';
import { Request, Response } from 'express';
import { LogInDTO, SignupDTOInput } from '../dtos/UserDTO';

export class UserController {
  constructor(private userbusiness: UserBusiness) {}

  // 1 agora pega todos os métodos que teremos na aplicação;

  public signup = async (req: Request, res: Response) => {
    // 2 primeiro contato com o mundo externo, via front
    try {
      const input: SignupDTOInput = {
        apelido: req.body.apelido,
        email: req.body.email,
        password: req.body.password,
      };
      console.log('input', input);

      //
      // 3 manda esses dados para a business! o awit é esperar a respode dela
      const output = await this.userbusiness.signup(input);
      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input: LogInDTO = {
        email: req.body.email,
        password: req.body.password,
      };
      const output = await this.userbusiness.login(input);
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
}
