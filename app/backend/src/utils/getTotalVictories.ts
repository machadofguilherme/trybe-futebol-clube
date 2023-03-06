import MatchModel from '../database/models/MatchModel';

const getTotalVictories = (listMatches: MatchModel[], teamName: string): number => {
  const sumTotalVictories = listMatches
    .filter((matches) => matches
      .dataValues.homeTeam.teamName === teamName
      && matches.homeTeamGoals > matches.awayTeamGoals).length;

  return sumTotalVictories;
};

export default getTotalVictories;
