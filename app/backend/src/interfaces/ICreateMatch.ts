export interface ICreateMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  code?: number;
  message?: string;
}
