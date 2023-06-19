import { ITeam } from '../Interfaces/ITeam';
import TeamModel from '../models/Team.model';

export default class TeamService {
  private teamModel = new TeamModel();

  getAll(): Promise<ITeam[]> {
    return this.teamModel.getAll();
  }

  getById(id: number): Promise<ITeam | null> {
    return this.teamModel.getById(id);
  }
}
