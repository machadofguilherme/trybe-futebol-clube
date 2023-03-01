import { Secret, verify } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET as Secret;

const tokenChecker = (token: string) => {
  try {
    const check = verify(token, secret);
    return check;
  } catch (error) {
    return false;
  }
};

export default tokenChecker;
