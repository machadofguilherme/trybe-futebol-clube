import { NextFunction, Request, Response } from 'express';
import MatchModel from '../database/models/MatchModel';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const count = await MatchModel.count();

  if (count < homeTeamId || count < awayTeamId) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }

  next();
};

export default validateMatch;
