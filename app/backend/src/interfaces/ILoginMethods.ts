import { ILoginError } from './ILoginError';

export interface ILoginMethods {
  login(email: string, password: string): Promise<ILoginError>;
  loginRole(token: string | undefined): Promise<ILoginError>;
}
