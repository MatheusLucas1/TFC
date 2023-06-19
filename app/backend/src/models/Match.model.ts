import IMatches from '../Interfaces/matches/IMatches';
import SequelizeMatch from '../database/models/MatchesModel';

type MatchCreate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeamId: number;
  awayTeamId: number;
};

export default class MatchModel {
  private model = SequelizeMatch;

  async getAll(): Promise<IMatches[]> {
    return this.model.findAll().then((teams) => teams.map((team) => team.toJSON()));
  }

  async getById(id: number): Promise<IMatches | null> {
    return this.model.findByPk(id).then((team) => team?.toJSON() ?? null);
  }

  async getUnfinished(): Promise<IMatches[]> {
    return this.model.findAll({ where: { inProgress: true } })
      .then((teams) => teams.map((team) => team.toJSON()));
  }

  async getFinished(): Promise<IMatches[]> {
    return this.model.findAll({ where: { inProgress: false } })
      .then((teams) => teams.map((team) => team.toJSON()));
  }

  async create(match: MatchCreate): Promise<IMatches> {
    return this.model.create({ ...match, inProgress: true }).then((team) => team.toJSON());
  }

  async update(match: IMatches): Promise<IMatches | null> {
    return this.model.update(match, { where: { id: match.id } })
      .then(() => this.getById(match.id));
  }
}
