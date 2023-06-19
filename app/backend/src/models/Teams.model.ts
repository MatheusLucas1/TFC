import SequelizeTeam from '../database/models/TeamsModel';
import { ITeam } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;
  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    return dbData ? { id, teamName: dbData.teamName } : null;
  }
}
