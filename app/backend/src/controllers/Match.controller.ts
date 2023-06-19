import { Request, Response } from 'express';
import TeamService from '../services/Teams.services';
import MatchService from '../services/Matches.service';

type MatchUpdate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

type MatchCreate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeamId: number;
  awayTeamId: number;
};

export default class MatchController {
  private matchService = new MatchService();
  private teamService = new TeamService();

  async getAll(req: Request, resp: Response):Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const result = await this.matchService.getAll();
      return resp.status(200).json(result);
    }
    if (inProgress === 'true') {
      const result = await this.matchService.getUnfinished();
      return resp.status(200).json(result);
    }
    const result = await this.matchService.getFinished();
    return resp.status(200).json(result);
  }

  async finish(req: Request, resp: Response):Promise<Response> {
    const { id } = req.params;
    await this.matchService.finish(Number(id));
    return resp.status(200).json({ message: 'Finished' });
  }

  async update(req: Request, resp: Response):Promise<Response> {
    const { id } = req.params;
    const body = req.body as MatchUpdate;
    await this.matchService.update(Number(id), body);
    return resp.status(200).json({ message: 'Updated' });
  }

  async create(req: Request, resp: Response):Promise<Response> {
    const body = req.body as MatchCreate;

    if (body.homeTeamId === body.awayTeamId) {
      return resp.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const homeTeam = await this.teamService.getById(body.homeTeamId);
    const awayTeam = await this.teamService.getById(body.awayTeamId);

    if (homeTeam === null || awayTeam === null) {
      return resp.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    const result = await this.matchService.create(body);
    return resp.status(201).json(result);
  }
}
