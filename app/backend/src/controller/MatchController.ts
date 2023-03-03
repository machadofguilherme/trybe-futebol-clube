import { Request, Response } from 'express';
import { IMatchMethods } from '../interfaces/IMatchMethods';

export default class MatchController {
  constructor(private _service: IMatchMethods) { }

  async findAll(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;

    if (inProgress === 'true' || inProgress === 'false') {
      const result = await this._service.checkMatches(String(inProgress));
      return res.status(200).json(result);
    }

    const result = await this._service.findAll();
    res.status(200).json(result);
  }
}
