import { Request, Response } from 'express';
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
}
