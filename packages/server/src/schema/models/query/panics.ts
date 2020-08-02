import {globalIdField} from 'graphql-relay';
import {GraphQLFloat, GraphQLObjectType, GraphQLNonNull} from 'graphql';
import {GraphQLDateTime} from 'graphql-iso-date';

export const Panics = new GraphQLObjectType({
  name: 'Panics',
  // @ts-ignore
  fields: () => ({
    id: globalIdField('Team'),
    latitude: {type: new GraphQLNonNull(GraphQLFloat)},
    longitude: {type: new GraphQLNonNull(GraphQLFloat)},
    createdAt: {type: GraphQLDateTime},
  }),
});
