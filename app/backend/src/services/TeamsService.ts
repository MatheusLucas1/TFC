import TeamModel from '../models/Team.model';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam>> {
    const dbData = await this.teamModel.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}