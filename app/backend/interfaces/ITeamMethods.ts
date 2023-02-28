import { ITeam } from './ITeam';

export interface ITeamMethods {
  findAll(): ITeam[] | object;
  findOne(id: number): object;
}
