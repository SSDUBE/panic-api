import * as React from 'react';
import {useQuery} from 'relay-hooks';
import {QueryOptions} from 'relay-hooks/lib/RelayHooksType';
import {GraphQLTaggedNode} from 'react-relay';
import {OperationType} from 'relay-runtime';
interface QueryRendererProps<R extends OperationType> {
  variables: R['variables'] | (() => R['variables']);
  query: GraphQLTaggedNode;
  queryOpts?: QueryOptions;
  children: (data: R['response']) => JSX.Element | null; // blegh
  // Allow customization of loading component
  loading?: null | React.ReactElement | (() => React.ReactElement);
}
//R is the queryResponseType
export function RelayRenderer<R extends OperationType = OperationType>({
  query,
  variables,
  children,
  loading,
  queryOpts,
}: QueryRendererProps<R>) {
  const queryVariables =
    typeof variables === 'function' ? variables() : variables;
  const queryOptions = queryOpts ? queryOpts : {};
  const {props, error} = useQuery<R>(query, queryVariables, queryOptions);
  if (error) {
    console.log('something went wrong ', error);
  }
  if (!props) {
    // Passing in null can be used to suppress the spinner
    if (loading !== undefined) {
      if (typeof loading === 'function') {
        return loading();
      } else {
        return loading;
      }
    }
    return null;
  }
  return children(props);
}
// TODO: remove
export default RelayRenderer;
