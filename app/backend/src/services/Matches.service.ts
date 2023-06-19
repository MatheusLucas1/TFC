import IMatches from '../Interfaces/matches/IMatches';
import MatchModel from '../models/Match.model';
import TeamModel from '../models/Teams.model';

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

export default class MatchService {
  private matchModel = new MatchModel();
  private teamModel = new TeamModel();

  private async getTeamNames(matches: IMatches[]): Promise<IMatches[]> {
    const teams = await this.teamModel.getAll();
    return matches.map((match) => {
      const homeTeam = teams.find((team) => team.id === match.homeTeamId);
      const awayTeam = teams.find((team) => team.id === match.awayTeamId);
      return {
        ...match,
        homeTeam: {
          teamName: homeTeam?.teamName,
        },
        awayTeam: {
          teamName: awayTeam?.teamName,
        },
      };
    });
  }

  async getAll(): Promise<IMatches[]> {
    const matches = await this.matchModel.getAll();
    return this.getTeamNames(matches);
  }

  getById(id: number): Promise<IMatches | null> {
    return this.matchModel.getById(id);
  }

  async getFinished(): Promise<IMatches[]> {
    const matches = await this.matchModel.getFinished();
    return this.getTeamNames(matches);
  }

  async getUnfinished(): Promise<IMatches[]> {
    const matches = await this.matchModel.getUnfinished();
    return this.getTeamNames(matches);
  }

  async finish(id: number): Promise<IMatches | null> {
    const match = await this.matchModel.getById(id);
    if (match === null) {
      return null;
    }
    if (match.inProgress === false) {
      return match;
    }
    const updatedMatch = await this.matchModel.update({ ...match, inProgress: false });
    return updatedMatch;
  }

  async update(id: number, body: MatchUpdate): Promise<IMatches | null> {
    const match = await this.matchModel.getById(id);
    return this.matchModel.update({ ...match!, ...body });
  }

  async create(body: MatchCreate): Promise<IMatches> {
    const match = await this.matchModel.create(body);
    return match;
  }
}
