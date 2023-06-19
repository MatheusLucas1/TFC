import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/User.service';
import jwtAuth from '../auth/jwtAuth';

export default class LoginController {
  private userService = new UserService();

  async login(req: Request, resp: Response):Promise<Response | void> {
    const { email, password } = req.body;
    const user = await this.userService.getByEmail(email);
    if (!user) {
      return resp.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPass: boolean = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      return resp.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwtAuth.createToken({
      id: user.id,
      email,
      userName: user.username,
      role: user.role,
    });

    return resp.status(200).json({ token });
  }

  static role(req: Request, resp: Response) {
    const token = req.headers.authorization;
    const user = jwtAuth.verifyToken(token!);
    return resp.status(200).json({ role: user!.role });
  }
}
