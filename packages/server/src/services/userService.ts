import {User, Role} from '../models/index';
import PasswordService from './PasswordService';
import Knex from 'knex';
import Context from '../context';
let knex: Knex;

export default class UserService {
  public static async findByUsername(
    context: Context,
    username: string
  ): Promise<User | undefined> {
    return User.query(knex)
      .context({context})
      .findOne({username});
  }

  public static async createUser(user: any, context: Context) {
    const [role] = await Role.query(knex)
      .context({context})
      .where('name', 'user');
    return await User.query(knex)
      .context(context)
      .insertGraphAndFetch({...user, roles: {roleId: role.id}});
  }

  public static async registerUser(data: any, context: Context) {
    data.user.password = await PasswordService.encrypt(data.user.password);
    const user = await this.createUser(data.user, context);
    return user;
  }
}
