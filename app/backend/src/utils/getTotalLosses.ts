import MatchModel from '../database/models/MatchModel';

const getTotalLosses = (listMatches: MatchModel[], teamName: string): number => {
  const sumTotalLosses = listMatches
    .filter((matches) => matches
      .dataValues.homeTeam.teamName === teamName
      && matches.homeTeamGoals < matches.awayTeamGoals).length;

  return sumTotalLosses;
};

export default getTotalLosses;
