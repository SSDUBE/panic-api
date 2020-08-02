/* tslint:disable */
/* eslint-disable */

import {ConcreteRequest} from 'relay-runtime';
export type AdminQueryVariables = {};
export type AdminQueryResponse = {
  readonly viewer: {
    readonly user: ReadonlyArray<{
      readonly fullname: string;
      readonly contactNumber: string;
      readonly username: string;
      readonly active: string;
      readonly createdAt: unknown | null;
      readonly userPanics: ReadonlyArray<{
        readonly latitude: number;
        readonly longitude: number;
        readonly createdAt: unknown | null;
      } | null>;
    } | null> | null;
  };
};
export type AdminQuery = {
  readonly response: AdminQueryResponse;
  readonly variables: AdminQueryVariables;
};

/*
query AdminQuery {
  viewer {
    user {
      fullname
      contactNumber
      username
      active
      createdAt
      userPanics {
        latitude
        longitude
        createdAt
        id
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'fullname',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'contactNumber',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'username',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'active',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'createdAt',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'latitude',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'longitude',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'AdminQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'Viewer',
          kind: 'LinkedField',
          name: 'viewer',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'UserQuery',
              kind: 'LinkedField',
              name: 'user',
              plural: true,
              selections: [
                v0 /*: any*/,
                v1 /*: any*/,
                v2 /*: any*/,
                v3 /*: any*/,
                v4 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'Panics',
                  kind: 'LinkedField',
                  name: 'userPanics',
                  plural: true,
                  selections: [v5 /*: any*/, v6 /*: any*/, v4 /*: any*/],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'AdminQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'Viewer',
          kind: 'LinkedField',
          name: 'viewer',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'UserQuery',
              kind: 'LinkedField',
              name: 'user',
              plural: true,
              selections: [
                v0 /*: any*/,
                v1 /*: any*/,
                v2 /*: any*/,
                v3 /*: any*/,
                v4 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'Panics',
                  kind: 'LinkedField',
                  name: 'userPanics',
                  plural: true,
                  selections: [
                    v5 /*: any*/,
                    v6 /*: any*/,
                    v4 /*: any*/,
                    v7 /*: any*/,
                  ],
                  storageKey: null,
                },
                v7 /*: any*/,
              ],
              storageKey: null,
            },
            v7 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'f4a3c9e3c42bebda9df78fcaf750aab0',
      id: null,
      metadata: {},
      name: 'AdminQuery',
      operationKind: 'query',
      text:
        'query AdminQuery {\n  viewer {\n    user {\n      fullname\n      contactNumber\n      username\n      active\n      createdAt\n      userPanics {\n        latitude\n        longitude\n        createdAt\n        id\n      }\n      id\n    }\n    id\n  }\n}\n',
    },
  };
})();
(node as any).hash = '273080f305b7141bddd5f15f9d0e4fa8';
export default node;
