import { Request, Response } from 'express';
import { ITeamMethods } from '../interfaces/ITeamMethods';

export default class TeamController {
  constructor(private _service: ITeamMethods) {}

  async findAll(_req: Request, res: Response): Promise<void> {
    const result = await this._service.findAll();
    res.status(200).json(result);
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this._service.findOne(Number(id));
    res.status(200).json(result);
  }
}
