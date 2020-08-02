import bcrypt from 'bcrypt';

const saltROunds = 10;

export default class PasswordService {
  public static async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, saltROunds);
  }

  public static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
