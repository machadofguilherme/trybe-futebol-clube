import TeamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

export default class TeamService {
  constructor(private _model = TeamModel) {}

  async findAll(): Promise<ITeam[]> {
    const result = await this._model.findAll();
    return result;
  }

  async findOne(id: number): Promise<object> {
    const result = await this._model.findOne({
      where: { id },
    }) as object;

    return result;
  }
}
