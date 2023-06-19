import * as Joi from 'joi';

const matchUpdateSchema = Joi.object({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
});

export default matchUpdateSchema;
