import { Router } from 'express';
import TeamController from '../controllers/Teams.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', (req, resp) => teamController.getAll(req, resp));

router.get('/:id', (req, resp) => teamController.getById(req, resp));

export default router;
