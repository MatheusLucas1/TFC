import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import validations from '../middlewares';

const router = Router();

const matchController = new MatchController();

router.get('/', (req, resp) => matchController.getAll(req, resp));

router.patch(
  '/:id/finish',
  validations.validateToken,
  (req, resp) => matchController.finish(req, resp),
);

router.patch(
  '/:id',
  validations.validateToken,
  validations.validateMatch.validateUpdate,
  (req, resp) => matchController.update(req, resp),
);

router.post(
  '/',
  validations.validateToken,
  validations.validateMatch.validateCreate,
  (req, resp) => matchController.create(req, resp),
);

export default router;
