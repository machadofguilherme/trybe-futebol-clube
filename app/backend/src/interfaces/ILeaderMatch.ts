export interface ILeaderMatch {
  goalsFavor: number,
  goalsOwn: number,
  homeTeam: {
    id: number,
    teamName: string;
  };
  awayTeam: {
    id: number,
    teamName: string;
  };
}
