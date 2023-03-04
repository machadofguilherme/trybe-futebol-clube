import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controller/MatchController';
import MatchService from '../service/MatchService';
import validateMatch from '../middlewares/validateMatch';

const router = Router();
const matchController = new MatchController(new MatchService());

router.get('/matches', (req, res) => matchController.findAll(req, res));

router.post(
  '/matches',
  validateToken,
  validateMatch,
  (req, res) => matchController.create(req, res),
);

router.patch(
  '/matches/:id/finish',
  validateToken,
  (req, res) => matchController.finishMatch(req, res),
);

router.patch(
  '/matches/:id',
  validateToken,
  (req, res) => matchController.updateScore(req, res),
);

export default { router };
