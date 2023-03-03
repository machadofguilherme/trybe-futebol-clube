import { IMatch } from './IMatch';

export interface IMatchMethods {
  findAll(): Promise<IMatch[]>;
  checkMatches(query: string): Promise<IMatch[] | undefined>;
}
