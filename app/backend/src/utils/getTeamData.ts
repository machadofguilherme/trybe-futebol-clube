import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

const getTeamData = async () => {
  const result = await MatchModel.findAll({
    where: { inProgress: false },
    include: [
      { model: TeamModel, as: 'homeTeam' },
      { model: TeamModel, as: 'awayTeam' },
    ],
    attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
  });

  return result;
};

export default getTeamData;
