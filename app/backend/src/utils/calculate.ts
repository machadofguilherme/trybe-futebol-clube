import MatchModel from '../database/models/MatchModel';

const calculate = async (result: MatchModel[]) => {
  await (await MatchModel.findAll()).map((item) => item.id);
  const pontuaram = result.filter((item) => item.homeTeamGoals > item.awayTeamGoals);
  const ids = pontuaram.map((item) => item.homeTeamId);

  // 4 times se repetem nessa lista

  return ids;
};

export default calculate;
