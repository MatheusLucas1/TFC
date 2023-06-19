import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

const reqMessage = 'All fields must be filled-400';
const invalidField = 'Invalid email or password-401';

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const validadeFields = joi.object({
    email: joi.string().email().required().regex(/.*@.*\.com$/)
      .messages({
        'string.empty': reqMessage,
        'string.email': invalidField,
      }),
    password: joi.string().required().min(7).messages({
      'string.empty': reqMessage,
      'string.min': invalidField,
    }),
  }).validate(req.body);

  const { error } = validadeFields;

  if (error && error.message) {
    const [errorMessage, status] = error.message.split('-');
    return res.status(+status).json({ message: errorMessage });
  }

  next();
};
export default loginValidator;
