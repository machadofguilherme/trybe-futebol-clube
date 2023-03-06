import MatchModel from '../database/models/MatchModel';

const getTotalDraws = (listMatches: MatchModel[], teamName: string): number => {
  const sumTotalDraws = listMatches
    .filter((matches) => matches
      .dataValues.homeTeam.teamName === teamName
      && matches.homeTeamGoals === matches.awayTeamGoals).length;

  return sumTotalDraws;
};

export default getTotalDraws;
