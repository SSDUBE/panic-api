import {Request} from 'express';
import Context from './Context';

export function createContext(req: Request): Context {
  return {
    // @ts-ignore
    user: req.user,
    req,
  };
}
