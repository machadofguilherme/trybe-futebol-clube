import { ICreateMatch } from './ICreateMatch';
import { IMatch } from './IMatch';

export interface IMatchMethods {
  findAll(): Promise<IMatch[]>;
  checkMatches(query: string): Promise<IMatch[] | undefined>;
  finishMatch(id: number, token: string | undefined): Promise<object>;

  updateScore(
    id: number,
    token: string | undefined,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<object>;

  create(token: string, object: ICreateMatch): Promise<object>;
}
