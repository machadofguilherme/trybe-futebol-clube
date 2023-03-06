import MatchModel from '../database/models/MatchModel';

const getTotalVictories = (listMatches: MatchModel[]): number => {
  const sumTotalVictories = listMatches
    .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length;
  return sumTotalVictories;
};

export default getTotalVictories;
