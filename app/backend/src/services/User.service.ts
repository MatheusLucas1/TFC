import { IUser } from '../Interfaces/IUser';
import UserModel from '../models/Users.model';

export default class UserService {
  private userModel = new UserModel();

  getByEmail(email: string): Promise<IUser | null> {
    return this.userModel.getByEmail(email);
  }
}
