import { compareSync } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import tokenGenerate from '../utils/tokenGenerate';
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import { emailSchema, passwordSchema } from '../schemas/LoginSchema';
import { ILoginError } from '../interfaces/ILoginError';
import tokenChecker from '../utils/tokenChecker';

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

    if (!checkCrypt) {
      const error: ILoginError = { code: 404, message: 'Algo deu errado!' };
      return error;
    }

    const token = await tokenGenerate({ email, password });
    return { token } as keyof object;
  }

  async loginRole(token: string): Promise<ILoginError> {
    const checkToken: JwtPayload = tokenChecker(token) as JwtPayload;

    if (!checkToken) {
      const error: ILoginError = { code: 401, message: 'Token must be a valid token' };
      return error;
    }

    const { email } = checkToken;

    const user: UserModel | null = await this._model.findOne({
      where: { email },
    });

    return { role: user?.role } as keyof object;
  }
}
