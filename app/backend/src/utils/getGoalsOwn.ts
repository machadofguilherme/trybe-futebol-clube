import MatchModel from '../database/models/MatchModel';

const getGoalsOwn = (listMatches: MatchModel[]): number => {
  const sumGoalsOwn = listMatches
    .reduce((acc, match) => match.awayTeamGoals + acc, 0);

  return sumGoalsOwn;
};

export default getGoalsOwn;
