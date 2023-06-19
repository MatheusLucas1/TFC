import { NextFunction, Request, Response } from 'express';
import jwtAuth from '../auth/jwtAuth';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const user = jwtAuth.verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
