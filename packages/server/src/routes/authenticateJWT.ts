import {Response, NextFunction, Request} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const secret = config.get('oauth.secret');

const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
  isValidateRoute?: boolean
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, secret, (err: any, user: any) => {
      if (err) {
        return res.status(401).json({message: 'Token has any invalid subject'});
      }
      // @ts-ignore
      req.user = user;
      if (isValidateRoute) res.send();
      return next();
    });
  }
};

export default authenticateJWT;
