/* tslint:disable */
/* eslint-disable */

import {ConcreteRequest} from 'relay-runtime';
export type UserPanicsInput = {
  latitude: number;
  longitude: number;
  clientMutationId?: string | null;
};
export type UserQueryVariables = {
  input: UserPanicsInput;
};
export type UserQueryResponse = {
  readonly userPanics: {
    readonly clientMutationId: string | null;
  } | null;
};
export type UserQuery = {
  readonly response: UserQueryResponse;
  readonly variables: UserQueryVariables;
};

/*
mutation UserQuery(
  $input: UserPanicsInput!
) {
  userPanics(input: $input) {
    clientMutationId
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'UserPanicsPayload',
        kind: 'LinkedField',
        name: 'userPanics',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'clientMutationId',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'UserQuery',
      selections: v1 /*: any*/,
      type: 'Mutations',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'UserQuery',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'abfb8cb05f47a459563dc238ee70dffb',
      id: null,
      metadata: {},
      name: 'UserQuery',
      operationKind: 'mutation',
      text:
        'mutation UserQuery(\n  $input: UserPanicsInput!\n) {\n  userPanics(input: $input) {\n    clientMutationId\n  }\n}\n',
    },
  };
})();
(node as any).hash = 'd6554796d43d5480a8ebd5634bda6fe4';
export default node;
