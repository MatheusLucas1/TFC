import { Request, Response } from 'express';
import TeamService from '../services/Team.services';

export default class TeamController {
  private teamService = new TeamService();

  async getAll(_req: Request, resp: Response):Promise<Response> {
    const result = await this.teamService.getAll();
    return resp.status(200).json(result);
  }

  async getById(req: Request, resp: Response):Promise<Response> {
    const { id } = req.params;
    const result = await this.teamService.getById(Number(id));
    return resp.status(200).json(result);
  }
}
