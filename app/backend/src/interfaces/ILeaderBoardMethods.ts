import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderBoardMethods {
  find(): Promise<ILeaderBoard[]>;
}
