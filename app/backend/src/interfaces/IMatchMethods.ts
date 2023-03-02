import { IMatch } from './IMatch';

export interface IMatchMethods {
  findAll(): Promise<IMatch[]>;
}
