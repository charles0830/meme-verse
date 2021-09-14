import jwt, { Secret } from 'jsonwebtoken';

export const generateToken = async (id: string): Promise<string> => {
  return jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '1d',
  });
};
