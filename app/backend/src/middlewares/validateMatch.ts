import { NextFunction, Request, Response } from 'express';
import schemas from '../schemas';

const validateUpdate = (req: Request, resp: Response, next: NextFunction) => {
  const validation = schemas.matchUpdateSchema.validate(req.body);
  if (validation.error) {
    return resp.status(400).json({ message: 'Invalid params' });
  }
  next();
};

const validateCreate = (req: Request, resp: Response, next: NextFunction) => {
  const validation = schemas.matchCreateSchema.validate(req.body);
  if (validation.error) {
    return resp.status(400).json({ message: 'Invalid params' });
  }
  next();
};

export default {
  validateUpdate,
  validateCreate,
};
