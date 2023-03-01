import { NextFunction, Request, Response } from 'express';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  next();
};

export default validateToken;
