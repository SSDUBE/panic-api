import {GraphQLObjectType, GraphQLResolveInfo, GraphQLList} from 'graphql';
import Context from '../../context';
import {
  // connectionDefinitions,
  // forwardConnectionArgs,
  globalIdField,
} from 'graphql-relay';

import {User} from '../../models/index';
// import UserService from '../../services/userService';
import {AuthenticationError} from 'apollo-server-express';
import {UserQuery} from './query/User';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    user: {
      type: new GraphQLList(UserQuery),
      resolve: async (
        _parent: any,
        _args: {[key: string]: any},
        context: Context,
        _resolveInfo: GraphQLResolveInfo
      ) => {
        if (!context.user)
          throw new AuthenticationError('User not authenticated');
        const user = await User.query()
          .context({context})
          .withGraphJoined('userPanics')
        return user;
      },
    },
  }),
});
