import {BaseModel} from './base';

export default class UserPanics extends BaseModel {
  public readonly id!: number;
  public userId!: number;
  public latitude!: number;
  public longitude!: number;
}
