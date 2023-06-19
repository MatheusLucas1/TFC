import * as Joi from 'joi';

const matchCreateSchema = Joi.object({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
  homeTeamId: Joi.number().min(1).required(),
  awayTeamId: Joi.number().min(1).required(),
});

export default matchCreateSchema;
