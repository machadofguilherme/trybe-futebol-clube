import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';
import LeaderBoardService from '../service/LeaderBoardService';

const router = Router();
const leaderBoardController = new LeaderBoardController(new LeaderBoardService());

router.get('/leaderboard/home', (req, res) => leaderBoardController.find(req, res));

export default { router };
