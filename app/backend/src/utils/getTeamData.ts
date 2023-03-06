import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

const getTeamData = async () => {
  const result = await MatchModel.findAll({
    where: { inProgress: false },
    include: [
      { model: TeamModel, as: 'homeTeam' },
      { model: TeamModel, as: 'awayTeam' },
    ],
  });

  return result;
};

export default getTeamData;
