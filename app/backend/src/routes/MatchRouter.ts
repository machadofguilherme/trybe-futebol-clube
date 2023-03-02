import { Router } from 'express';
import MatchController from '../controller/MatchController';
import MatchService from '../service/MatchService';

const router = Router();
const matchController = new MatchController(new MatchService());

router.get('/matches', (req, res) => matchController.findAll(req, res));

export default { router };
