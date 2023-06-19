import { Router } from 'express';
import LoginController from '../controllers/Users.controller';
import validations from '../middlewares';

const router = Router();

const loginController = new LoginController();

router.post('/', validations.validateLogin, (req, resp) => loginController.login(req, resp));
router.get('/role', validations.validateToken, (req, resp) => LoginController.role(req, resp));

export default router;
