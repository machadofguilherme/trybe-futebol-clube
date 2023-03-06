import MatchModel from '../database/models/MatchModel';

const getTeamData = async () => {
  const result = await MatchModel.findAll({
    where: { inProgress: false },
  });

  return result;
};

export default getTeamData;
