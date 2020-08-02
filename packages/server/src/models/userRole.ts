import {BaseModel} from './base';
import Role from './role';

export default class UserRole extends BaseModel {
  public roleId!: number;
  public userId!: number;
  public role!: Partial<Role>;

  static get relationMappings() {
    return {
      role: {
        relation: BaseModel.HasOneRelation,
        modelClass: Role,
        join: {
          from: 'userRole.roleId',
          to: 'role.id',
        },
      },
    };
  }
}
