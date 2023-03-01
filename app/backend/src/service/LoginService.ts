import { compareSync } from 'bcryptjs';
import tokenChecker from '../utils/tokenChecker';
import tokenGenerate from '../utils/tokenGenerate';
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import { emailSchema, passwordSchema } from '../schemas/LoginSchema';
import { ILoginError } from '../interfaces/ILoginError';

export default class LoginService {
  constructor(private _model = UserModel) { }
  async login(email: string, password: string): Promise<ILoginError> {
    const messageError = { code: 401, message: 'Invalid email or password' };

    const emailError = emailSchema.validate(email);
    const passwordError = passwordSchema.validate(password);

    const user = await this._model.findOne({ where: { email } }) as ILogin;
    if (!user || emailError.error || passwordError.error) return messageError;

    const checkPass = compareSync(password, user.password);
    if (!checkPass) return messageError;

    const token = await tokenGenerate({ email, password });
    return { token } as keyof object;
  }

  async loginRole(token: string): Promise<ILoginError> {
    const check = tokenChecker(token);

    if (!check) {
      const error = { code: 401, message: 'Token must be a valid token' };
      return error;
    }

    const { email } = check;

    const user = await this._model.findOne({
      where: { email },
    });

    return { role: user?.role } as keyof object;
  }
}
