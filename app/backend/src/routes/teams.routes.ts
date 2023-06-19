import { Request, Router, Response } from 'express';
import TeamController from '../controllers/Teams.controller';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getBookById(req, res));

export default router;
