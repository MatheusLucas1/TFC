import * as jwt from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';

export type UserLogin = {
  id: number;
  email: string;
  userName: string;
  role: string;
};

function createToken(user: UserLogin) {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
}

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as UserLogin;
  } catch (error) {
    return null;
  }
}

export default {
  createToken,
  verifyToken,
};
