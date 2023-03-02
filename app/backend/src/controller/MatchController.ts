import { Request, Response } from 'express';
import { IMatchMethods } from '../interfaces/IMatchMethods';

export default class MatchController {
  constructor(private _service: IMatchMethods) { }

  async findAll(req: Request, res: Response): Promise<void> {
    const x = await this._service.findAll();

    res.status(200).json(x);
  }
}
