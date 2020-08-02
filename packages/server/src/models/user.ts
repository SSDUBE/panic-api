import {BaseModel} from './base';
import UserRole from './userRole';
import UserPanics from './userPanics';

export default class User extends BaseModel {
  public readonly id!: number;
  public username!: string;
  public fullname!: string;
  public contactNumber!: string;
  public password!: string;
  public active?: boolean;
  public roleId!: number;
  public roles!: Partial<UserRole>[];

  public static get tableName() {
    return 'users';
  }

  static relationMappings = {
    roles: {
      relation: BaseModel.HasOneRelation,
      modelClass: UserRole,
      join: {
        from: 'users.id',
        to: 'userRole.userId',
      },
    },
    userPanics: {
      relation: BaseModel.HasManyRelation,
      modelClass: UserPanics,
      join: {
        from: 'users.id',
        to: 'userPanics.userId',
      },
    },
  };
}
