import express from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { UserController } from '../controller/UserController';
import { userdatabase } from '../database/UsersDatabase';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
export const userRouter = express.Router();

// isso é boilerplate. Tem que copiar da business e tem que ser na sequencia correta.
// se vamos usar dados da controlle, e da businnes, importampos tudo.
const usercontroller = new UserController(
  new UserBusiness(
    new userdatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
);

userRouter.post('/signup', usercontroller.signup);
userRouter.post('/login', usercontroller.login);
