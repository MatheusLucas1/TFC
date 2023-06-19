import { ITeam } from './ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>
  // create(team: ITeam): Promise<ITeam>,
  // update(id: number, team: ITeam): Promise<ITeam>,
  // delete(id: number): Promise<ITeam>,
}
