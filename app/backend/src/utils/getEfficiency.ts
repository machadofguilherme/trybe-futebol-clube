import MatchModel from '../database/models/MatchModel';
import getTotalDraws from './getTotalDraws';
import getTotalPoints from './getTotalPoints';
import getTotalVictories from './getTotalVictories';

const getEfficiency = (listMatches: MatchModel[], teamName: string) => {
  const list = listMatches.filter((item) => item.dataValues.homeTeam.teamName === teamName);
  const x = list.map((item) => {
    const i: MatchModel = item as MatchModel;
    const victories = getTotalVictories(listMatches, i.dataValues.homeTeam.teamName);
    const draws = getTotalDraws(listMatches, i.dataValues.homeTeam.teamName);
    const total = getTotalPoints(i.homeTeamGoals, i.awayTeamGoals);
    return ((((victories * 3) + draws) / (total * 3)) * 100);
  });

  return x.find((i) => Math.max(i))?.toFixed(2);
};

export default getEfficiency;
