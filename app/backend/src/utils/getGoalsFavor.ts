import MatchModel from '../database/models/MatchModel';

const getGoalsFavor = (listMatches: MatchModel[], teamName: string): number => {
  const teamGames = listMatches
    .filter((matches) => matches.dataValues.homeTeam.teamName === teamName);

  const sumGoalsFavor = teamGames
    .map((match) => match.homeTeamGoals).reduce((acc, match) => match + acc);

  return sumGoalsFavor;
};

export default getGoalsFavor;
