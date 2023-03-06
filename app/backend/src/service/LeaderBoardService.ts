import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import MatchModel from '../database/models/MatchModel';

import getTeamData from '../utils/getTeamData';
import getTotalPoints from '../utils/getTotalPoints';
import getTotalGames from '../utils/getTotalGames';
import getTotalVictories from '../utils/getTotalVictories';
import getTotalDraws from '../utils/getTotalDraws';
import getTotalLosses from '../utils/getTotalLosses';
import getGoalsFavor from '../utils/getGoalsFavor';
import getGoalsOwn from '../utils/getGoalsOwn';
import getEfficiency from '../utils/getEfficiency';

export default class LeaderBoardService {
  constructor(private _model = getTeamData) { }

  sortList(list: ILeaderBoard[]): ILeaderBoard[] {
    return list.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));

    this._model();
  }

  calcBalance(listMatches: MatchModel[], teamName: string) {
    const favor = getGoalsFavor(listMatches, teamName);
    const own = getGoalsOwn(listMatches, teamName);
    return favor - own;
    this._model();
  }

  async find() {
    const listMatches: MatchModel[] = await this._model();
    const objectCreate = listMatches.map((item) => {
      const i: MatchModel = item as MatchModel;
      return {
        name: i.dataValues.homeTeam.teamName,
        totalPoints: getTotalPoints(i.homeTeamGoals, i.awayTeamGoals),
        totalGames: getTotalGames(listMatches, i.dataValues.homeTeam.teamName),
        totalVictories: getTotalVictories(listMatches, i.dataValues.homeTeam.teamName),
        totalDraws: getTotalDraws(listMatches, i.dataValues.homeTeam.teamName),
        totalLosses: getTotalLosses(listMatches, i.dataValues.homeTeam.teamName),
        goalsFavor: getGoalsFavor(listMatches, i.dataValues.homeTeam.teamName),
        goalsOwn: getGoalsOwn(listMatches, i.dataValues.homeTeam.teamName),
        goalsBalance: this.calcBalance(listMatches, i.dataValues.homeTeam.teamName),
        efficiency: getEfficiency(listMatches, i.dataValues.homeTeam.teamName),
      };
    }) as unknown as ILeaderBoard[];

    return this.sortList(objectCreate);
  }
}
