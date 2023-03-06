import MatchModel from '../database/models/MatchModel';

const getGoalsFavor = (listMatches: MatchModel[]): number => {
  const sumGoalsFavor = listMatches
    .reduce((acc, match) => match.homeTeamGoals + acc, 0);

  return sumGoalsFavor;
};

export default getGoalsFavor;
