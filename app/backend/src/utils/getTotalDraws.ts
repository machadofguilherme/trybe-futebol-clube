import MatchModel from '../database/models/MatchModel';

const getTotalDraws = (listMatches: MatchModel[]): number => {
  const sumTotalDraws = listMatches.filter((draws) => draws.homeTeamGoals === draws.awayTeamGoals);
  return sumTotalDraws.length;
};

export default getTotalDraws;
