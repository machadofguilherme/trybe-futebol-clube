import { sign, Secret } from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';

const varToken: Secret = process.env.JWT_SECRET as Secret;

const tokenGenerate = async (payload: ILogin): Promise<string> => {
  const token = await sign(payload, varToken);
  return token;
};

export default tokenGenerate;
