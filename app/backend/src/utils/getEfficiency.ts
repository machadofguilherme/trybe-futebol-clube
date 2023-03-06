import MatchModel from '../database/models/MatchModel';
import getTotalPoints from './getTotalPoints';

const getEfficiency = (listMatches: MatchModel[]) => {
  const points = getTotalPoints(listMatches);
  return ((points / (listMatches.length * 3)) * 100).toFixed(2);
};

export default getEfficiency;
