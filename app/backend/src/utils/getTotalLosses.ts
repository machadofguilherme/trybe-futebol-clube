import MatchModel from '../database/models/MatchModel';

const getTotalLosses = (listMatches: MatchModel[]): number => {
  const sumTotalLosses = listMatches
    .filter((matches) => matches.homeTeamGoals < matches.awayTeamGoals).length;

  return sumTotalLosses;
};

export default getTotalLosses;
