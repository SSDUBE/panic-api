import {Transaction} from 'objection';
import {Request} from 'express';

export interface BaseContext {
  req?: Request;

  user?: {id: number; username: string};
}

export type SqlContext = BaseContext & {
  trx?: Transaction;
};

type Context = BaseContext;

export default Context;
