import MatchModel from '../database/models/MatchModel';
import getTotalDraws from './getTotalDraws';
import getTotalVictories from './getTotalVictories';

const getTotalPoints = (listMatches: MatchModel[]): number =>
  (getTotalVictories(listMatches) * 3) + getTotalDraws(listMatches);

export default getTotalPoints;
