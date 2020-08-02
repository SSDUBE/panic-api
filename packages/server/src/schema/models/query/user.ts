import {globalIdField} from 'graphql-relay';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import {GraphQLDateTime} from 'graphql-iso-date';
import {Panics} from './panics';

export const UserQuery = new GraphQLObjectType({
  name: 'UserQuery',
  // @ts-ignore
  fields: () => ({
    id: globalIdField('User'),
    fullname: {type: new GraphQLNonNull(GraphQLString)},
    contactNumber: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    active: {type: new GraphQLNonNull(GraphQLString)},
    createdAt: {type: GraphQLDateTime},
    userPanics: {type: new GraphQLNonNull(new GraphQLList(Panics))},
  }),
});
