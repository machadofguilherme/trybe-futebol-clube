import MatchModel from '../database/models/MatchModel';

const getTotalGames = (listMatches: MatchModel[], teamName: string): number => {
  const findTotalGames = listMatches
    .filter((matches) => matches.dataValues.homeTeam.teamName === teamName).length;

  return findTotalGames;
};

export default getTotalGames;
