import {mutationWithClientMutationId} from 'graphql-relay';
import {
  GraphQLNonNull,
  // GraphQLString,
  // GraphQLList,
  GraphQLFloat,
} from 'graphql';
import Context from '../../../Context';
import UserPanics from '../../../models/userPanics';

export default mutationWithClientMutationId({
  name: 'UserPanics',
  inputFields: {
    latitude: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    longitude: {
      type: GraphQLNonNull(GraphQLFloat),
    },
  },
  outputFields: {},
  mutateAndGetPayload: async ({latitude, longitude}, context: Context) => {
    await UserPanics.query()
      .context(context)
      .insertGraph({latitude, longitude, userId: context.user?.id});
    return {created: true};
  },
});
