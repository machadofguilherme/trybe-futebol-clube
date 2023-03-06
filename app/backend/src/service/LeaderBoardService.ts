import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import MatchModel from '../database/models/MatchModel';

import getTeamData from '../utils/getTeamData';
import getTotalPoints from '../utils/getTotalPoints';
import getTotalVictories from '../utils/getTotalVictories';
import getTotalDraws from '../utils/getTotalDraws';
import getTotalLosses from '../utils/getTotalLosses';
import getGoalsFavor from '../utils/getGoalsFavor';
import getGoalsOwn from '../utils/getGoalsOwn';
import getEfficiency from '../utils/getEfficiency';
import TeamModel from '../database/models/TeamModel';

export default class LeaderBoardService {
  constructor(
    private _model = getTeamData,
  ) { }

  private static sortList(list: ILeaderBoard[]): ILeaderBoard[] {
    return list.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
  }

  async find() {
    const listMatches: MatchModel[] = await this._model();
    const listTeams = await TeamModel.findAll();
    const leaderBoard = listTeams.map((team) => {
      const teamListMatches = listMatches.filter((match) => match.homeTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: getTotalPoints(teamListMatches),
        totalGames: teamListMatches.length,
        totalVictories: getTotalVictories(teamListMatches),
        totalDraws: getTotalDraws(teamListMatches),
        totalLosses: getTotalLosses(teamListMatches),
        goalsFavor: getGoalsFavor(teamListMatches),
        goalsOwn: getGoalsOwn(teamListMatches),
        goalsBalance: getGoalsFavor(teamListMatches) - getGoalsOwn(teamListMatches),
        efficiency: getEfficiency(teamListMatches),
      };
    });

    return LeaderBoardService.sortList(leaderBoard);
  }
}
