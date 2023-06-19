import { IMatch } from '../Interfaces/IMatch';
import SequelizeMatch from '../database/models/MatchesModel';

type MatchCreate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeamId: number;
  awayTeamId: number;
};

export default class MatchModel {
  private model = SequelizeMatch;

  async getAll(): Promise<IMatch[]> {
    return this.model.findAll().then((teams) => teams.map((team) => team.toJSON()));
  }

  async getById(id: number): Promise<IMatch | null> {
    return this.model.findByPk(id).then((team) => team?.toJSON() ?? null);
  }

  async getUnfinished(): Promise<IMatch[]> {
    return this.model.findAll({ where: { inProgress: true } })
      .then((teams) => teams.map((team) => team.toJSON()));
  }

  async getFinished(): Promise<IMatch[]> {
    return this.model.findAll({ where: { inProgress: false } })
      .then((teams) => teams.map((team) => team.toJSON()));
  }

  async create(match: MatchCreate): Promise<IMatch> {
    return this.model.create({ ...match, inProgress: true }).then((team) => team.toJSON());
  }

  async update(match: IMatch): Promise<IMatch | null> {
    return this.model.update(match, { where: { id: match.id } })
      .then(() => this.getById(match.id));
  }
}
