import { NextFunction, Request, Response } from 'express';
import schemas from '../schemas';

const validateLogin = (req: Request, resp: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return resp.status(400).json({ message: 'All fields must be filled' });
  }
  const validation = schemas.loginSchema.validate(req.body);
  if (validation.error) {
    return resp.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateLogin;
