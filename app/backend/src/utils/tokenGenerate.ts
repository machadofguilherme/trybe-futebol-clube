import { sign, Secret } from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';

const varToken: Secret = process.env.JWT_SECRET as Secret;

const tokenGenerate = (payload: ILogin): string => {
  const token = sign(payload, varToken, { expiresIn: '15m' });
  return token;
};

export default tokenGenerate;
