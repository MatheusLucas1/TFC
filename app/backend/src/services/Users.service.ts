import UsersModel from '../models/Users.model';
import { IUsers } from '../Interfaces/users/IUsers';

export default class UserService {
  private userModel = new UsersModel();

  getByEmail(email: string): Promise<IUsers | null> {
    return this.userModel.getByEmail(email);
  }
}
