import { Request, Response } from 'express';
import { ILoginError } from '../interfaces/ILoginError';
import { IMatchMethods } from '../interfaces/IMatchMethods';

export default class MatchController {
  constructor(private _service: IMatchMethods) { }

  async findAll(req: Request, res: Response): Promise<Response | void> {
    const isTrueOrFalse = req.query.inProgress;

    if (isTrueOrFalse === 'true' || isTrueOrFalse === 'false') {
      const foundMatches = await this._service.checkMatches(String(isTrueOrFalse));
      return res.status(200).json(foundMatches);
    }

    const result = await this._service.findAll();
    res.status(200).json(result);
  }

  async finishMatch(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const token = req.headers.authorization;

    const result: ILoginError = await this._service.finishMatch(Number(id), token);

    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }

    res.status(200).json(result);
  }

  async updateScore(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const token = req.headers.authorization;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const result: ILoginError = await this
      ._service.updateScore(Number(id), token, homeTeamGoals, awayTeamGoals);

    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }

    res.status(200).json(result);
  }
}
