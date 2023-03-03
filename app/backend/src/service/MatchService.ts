import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import tokenChecker from '../utils/tokenChecker';
import { ILoginError } from '../interfaces/ILoginError';
import { IFinishMatch } from '../interfaces/IFinishMatch';

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

  async finishMatch(id: number, token: string): Promise<ILoginError | IFinishMatch> {
    const checkToken = await tokenChecker(token);

    if (!checkToken) {
      const errorMessage: ILoginError = {
        code: 401, message: 'Token must be a valid token',
      };

      return errorMessage;
    }

    await this._model.update({ inProgress: false }, {
      where: { id },
    });

    const response = { message: 'Finished' };
    return response;
  }

  async updateScore(
    id: number,
    token: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ILoginError | IFinishMatch> {

    const checkToken = await tokenChecker(token);

    if (!checkToken) {
      const errorMessage: ILoginError = {
        code: 401, message: 'Token must be a valid token',
      };

      return errorMessage;
    }

    await this._model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const response = { message: 'Updated scoreboard' };
    return response;
  }
}
