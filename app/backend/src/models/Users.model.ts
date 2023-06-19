import UsersModel from '../database/models/UsersModel';
import { IUsers } from '../Interfaces/users/IUsers';

export default class UserModel {
  private model = UsersModel;

  async getAll(): Promise<IUsers[]> {
    return this.model.findAll().then((teams) => teams.map((team) => team.toJSON()));
  }

  async getById(id: number): Promise<IUsers | null> {
    return this.model.findByPk(id).then((team) => team?.toJSON() ?? null);
  }

  async getByEmail(email: string): Promise<IUsers | null> {
    return this.model.findOne({ where: { email } }).then((team) => team?.toJSON() ?? null);
  }
}
