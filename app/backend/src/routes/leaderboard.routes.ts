import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';
// import validations from '../middlewares';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, resp) => leaderboardController.scoreboardHome(req, resp));

router.get('/away', (req, resp) => leaderboardController.scoreboardAway(req, resp));

export default router;
