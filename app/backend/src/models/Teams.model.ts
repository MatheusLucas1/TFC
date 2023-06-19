import { ITeam } from '../Interfaces/teams/ITeams';
import SequelizeTeam from '../database/models/TeamsModel';

export default class TeamModel {
  private model = SequelizeTeam;

  async getAll(): Promise<ITeam[]> {
    return this.model.findAll().then((teams) => teams.map((team) => team.toJSON()));
  }

  async getById(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id).then((team) => team?.toJSON() ?? null);
  }
}