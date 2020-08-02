import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';

import Mutations from './models/mutations';
import {nodeField} from './Relay';
import Viewer from './models/Viewer.graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: new GraphQLNonNull(Viewer),
      // Return empty object so that other resolvers run
      resolve: () => ({}),
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: Mutations,
});

export default new GraphQLSchema({
  query,
  mutation,
});
