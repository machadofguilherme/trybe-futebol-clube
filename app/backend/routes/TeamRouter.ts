import { Router } from 'express';
import TeamController from '../controller/TeamController';
import TeamService from '../service/TeamService';

const router = Router();
const teamController = new TeamController(new TeamService());

router.get('/teams', (req, res) => teamController.findAll(req, res));
router.get('/teams/:id', (req, res) => teamController.findOne(req, res));

export default { router };
