import { ITeam } from '../Interfaces/teams/ITeams';
import TeamModel from '../models/Teams.model';

export default class TeamService {
  private teamModel = new TeamModel();

  getAll(): Promise<ITeam[]> {
    return this.teamModel.getAll();
  }

  getById(id: number): Promise<ITeam | null> {
    return this.teamModel.getById(id);
  }
}
