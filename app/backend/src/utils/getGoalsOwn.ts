import MatchModel from '../database/models/MatchModel';

const getGoalsOwn = (listMatches: MatchModel[], teamName: string): number => {
  const teamGames = listMatches
    .filter((matches) => matches.dataValues.homeTeam.teamName === teamName);

  const sumGoalsOwn = teamGames
    .map((match) => match.awayTeamGoals).reduce((acc, match) => match + acc);

  return sumGoalsOwn;
};

export default getGoalsOwn;
