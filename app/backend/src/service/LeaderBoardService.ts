import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { ILeaderMin } from '../interfaces/ILeaderMin';
import { ILeaderConstructor, IReturnLeader } from '../interfaces/IReturnLeader';

export default class LeaderBoardService {
  // Agradeço de coração à Hellen Ribas.

  constructor(private _matchModel = MatchModel, private _teamModel = TeamModel) { }

  public async find(): Promise<ILeaderBoard[]> {
    const findMatches = await this._matchModel.findAll({ where: { inProgress: false } });
    const response = JSON.parse(JSON.stringify(findMatches));
    const findTeam = await this._teamModel.findAll();
    const result = LeaderBoardService.sortTeams(findTeam.map((team) => {
      const infoHome = LeaderBoardService.pointsTeam(Number(team.id), response);
      const infoAway = LeaderBoardService.pointsTeam(Number(team.id), response);

      return LeaderBoardService.setInfo({
        team,
        infoHome,
        infoAway,
        totalVictories: infoHome.totalVictories + infoAway.totalVictories,
        totalDraws: infoHome.totalDraws + infoAway.totalDraws,
        totalGames: infoHome.totalGames + infoAway.totalGames,
      });
    }));

    return result;
  }

  private static pointsTeam(home:number, arrayMatch: IReturnLeader[]) {
    const matches = arrayMatch.filter((item) => item.homeTeamId === home);
    const equal = matches.filter((item) => item.homeTeamGoals === item.awayTeamGoals);
    const goals = matches.filter((item) => item.homeTeamGoals > item.awayTeamGoals);
    const loser = matches.filter((item) => item.homeTeamGoals < item.awayTeamGoals);
    const favor = matches.map((item) => item.homeTeamGoals).reduce((acc, item) => item + acc);
    const own = matches.map((item) => item.awayTeamGoals).reduce((acc, item) => item + acc);

    return {
      totalPoints: (goals.length * 3) + equal.length,
      totalGames: matches.length,
      totalVictories: goals.length,
      totalDraws: equal.length,
      totalLosses: loser.length,
      goalsFavor: favor,
      goalsOwn: own,
      goalsBalance: favor - own,
      efficiency: ((((goals.length * 3) + equal.length) / (matches.length * 3)) * 100),
    };
  }

  private static sortTeams(board: ILeaderBoard[]): ILeaderBoard[] {
    return board.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
  }

  private static setInfo({
    team, infoHome, infoAway, totalVictories, totalDraws, totalGames,
  }: ILeaderMin): ILeaderConstructor {
    return {
      name: team.teamName,
      totalPoints: infoHome.totalPoints + infoAway.totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: infoHome.totalLosses + infoAway.totalLosses,
      goalsFavor: infoHome.goalsFavor + infoAway.goalsFavor,
      goalsOwn: infoHome.goalsOwn + infoAway.goalsOwn,
      goalsBalance:
      (infoHome.goalsFavor - infoHome.goalsOwn) + (infoAway.goalsFavor - infoAway.goalsOwn),
      efficiency: `${
        ((((totalVictories * 3) + totalDraws) / (totalGames * 3)) * 100).toFixed(2)
      }`,
    };
  }
}
