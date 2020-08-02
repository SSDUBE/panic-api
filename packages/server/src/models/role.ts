import {BaseModel} from './base';

export default class Role extends BaseModel {
  public readonly id!: number;
  public name!: string;
  public description!: string;

  static get tableName() {
    return 'role';
  }
}
