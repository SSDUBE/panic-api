import {Response, Request} from 'express';
import UserService from '../services/userService';
import {createContext} from '../util';

const signupUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization!;
  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    'base64'
  ).toString();
  const [username, password] = decodedCredentials.split(':');
  const context = createContext(req);
  const user = await UserService.findByUsername(context, username);

  if (user) {
    res.status(405).send({error: 'User already exists please signin'});
  } else {
    req.body.user = {
      username,
      password,
      contactNumber: req.body.contactNumber,
      fullname: req.body.fullName,
    };

    const createUser = await UserService.registerUser(req.body, context);

    if (createUser) {
      res
        .status(200)
        .send({success: 'Account was succefully created please signin'});
    } else {
      res.status(404).send({error: 'Something went wrong creating the user'});
    }
  }
};

export default signupUser;
