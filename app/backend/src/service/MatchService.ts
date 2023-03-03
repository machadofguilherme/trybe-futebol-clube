import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  constructor(private _model = MatchModel) { }

  async findAll(): Promise<IMatch[]> {
    const teamMatches = await this._model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return teamMatches as [];
  }

  async checkMatches(query: string): Promise<IMatch[] | undefined> {
    if (query === 'true') {
      const teamMatches = await this._model.findAll({
        include: [
          { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],

        where: { inProgress: true },
      });

      return teamMatches as [];
    }

    if (query === 'false') {
      const teamMatches = await this._model.findAll({
        include: [{ model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
        where: { inProgress: false },
      });

      return teamMatches as [];
    }
  }
}
