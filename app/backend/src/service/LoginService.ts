import { compareSync } from 'bcryptjs';
import tokenGenerate from '../utils/tokenGenerate';
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import { emailSchema, passwordSchema } from '../schemas/LoginSchema';
import { ILoginError } from '../interfaces/ILoginError';

export default class LoginService {
  constructor(private _model = UserModel) { }

  async login(email: string, password: string): Promise<ILoginError> {
    const emailError = emailSchema.validate(email);
    const passwordError = passwordSchema.validate(password);
    const user = await this._model.findOne({ where: { email } }) as ILogin;

    if (!user || emailError.error || passwordError.error) {
      return { code: 401, message: 'Invalid email or password' };
    }

    const checkCrypt = compareSync(password, user.password);

    if (checkCrypt) {
      const token = await tokenGenerate({ email, password });
      return { token } as keyof object;
    }

    const error: ILoginError = { code: 404, message: 'Algo deu errado!' };
    return error;
  }
}
