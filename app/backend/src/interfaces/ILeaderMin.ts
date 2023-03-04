import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderMin {
  team: {
    teamName: string,
  };
  infoHome: ILeaderBoard;
  infoAway: ILeaderBoard;
  totalVictories: number;
  totalDraws: number;
  totalGames: number;
}
