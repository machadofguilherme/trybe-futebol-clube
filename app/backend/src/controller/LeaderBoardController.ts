import { Request, Response } from 'express';
import { ILeaderBoardMethods } from '../interfaces/ILeaderBoardMethods';

export default class LeaderBoardController {
  constructor(private _service: ILeaderBoardMethods) { }

  async find(_req: Request, res: Response): Promise<Response | void> {
    const result = await this._service.find();
    res.status(200).json(result);
  }
}
