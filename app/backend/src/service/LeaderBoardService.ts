import MatchModel from '../database/models/MatchModel';
// import { ILeaderMatch } from '../interfaces/ILeaderMatch';
import getTeamData from '../utils/getTeamData';

/*
  "totalPoints": 13,
  "totalGames": 5,
  "totalVictories": 4,
  "totalDraws": 1,
  "totalLosses": 0,
*/

// type TName = { name: string };

export default class LeaderBoardService {
  constructor(private _model = getTeamData) { }

  async find(): Promise<[]> {
    const listMatches = await this._model();

    // const listTeams: ILeaderBoard = await TeamModel.findAll() as ILeaderBoard;

    const objectCreate = listMatches.map((item) => {
      const x: MatchModel = item;

      return {
        name: x.dataValues.homeTeam.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      };
    });

    return objectCreate as [];
  }
}
