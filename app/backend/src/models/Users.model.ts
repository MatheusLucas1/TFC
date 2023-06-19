import { IUser } from '../Interfaces/IUser';
import SequelizeUser from '../database/models/UsersModel';

export default class UserModel {
  private model = SequelizeUser;

  async getAll(): Promise<IUser[]> {
    return this.model.findAll().then((teams) => teams.map((team) => team.toJSON()));
  }

  async getById(id: number): Promise<IUser | null> {
    return this.model.findByPk(id).then((team) => team?.toJSON() ?? null);
  }

  async getByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } }).then((team) => team?.toJSON() ?? null);
  }
}
