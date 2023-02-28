import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controller/LoginController';
import LoginService from '../service/LoginService';

const router = Router();
const loginController = new LoginController(new LoginService());

router.post('/login', validateLogin, (req, res) => loginController.login(req, res));

export default { router };
