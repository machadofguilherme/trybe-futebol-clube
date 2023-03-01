import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controller/LoginController';
import LoginService from '../service/LoginService';
import validateToken from '../middlewares/validateToken';

const router = Router();
const loginController = new LoginController(new LoginService());

router.post('/login', validateLogin, (req, res) => loginController.login(req, res));
router.get('/login/role', validateToken, (req, res) => loginController.loginRole(req, res));

export default { router };
