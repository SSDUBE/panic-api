import React from 'react';
import Home from './modules/home/Home';
import {SignIn, SignUp} from './modules/auth';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import {RelayEnvironmentProvider} from 'relay-hooks';
import AuthContextProvider, {
  useAuthContextProvider,
  AuthContext,
} from './context/AuthContext';
import {Environment} from 'react-relay';
import createRelayEnv from './CreateRelayEnv';
import {MuiThemeProvider} from '@material-ui/core';
import {theme} from './Theme';
import _ from 'lodash';

function PrivateRoute({
  component: PrivateRouteComponent,
  ...rest
}: Omit<RouteProps, 'render' | 'children'> & {
  component: React.ComponentType<RouteComponentProps>;
}) {
  const {auth} = React.useContext(AuthContext);

  if (!auth.authenticated) {
    return (
      <Route
        render={({location}) => (
          <Redirect
            to={{
              pathname: '/signin',
              state: {from: location},
            }}
          />
        )}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={({location, history, match}) => (
        <PrivateRouteComponent
          location={location}
          history={history}
          match={match}
          {...rest}
        />
      )}
    />
  );
}

function App() {
  const {auth, SignOut} = useAuthContextProvider();
  const authRef = React.useRef(auth);

  const createEnvironment: () => Environment = React.useCallback(() => {
    return createRelayEnv(
      () => {
        SignOut();
      },
      () => {
        if (auth.authenticated) {
          return auth.token;
        } else {
          return '';
        }
      }
    );
  }, [auth, SignOut]);

  const [environment, setEnvironment] = React.useState(createEnvironment());

  React.useEffect(() => {
    if (!_.isEqual(authRef.current, auth) && environment) {
      setEnvironment(createEnvironment());
    }

    authRef.current = auth;
  }, [auth, createEnvironment, environment]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Router>
        <Switch>
          <Redirect exact={true} path="/" to="/home" />
          {
            // @ts-ignore
            <PrivateRoute exact={true} path={['/home']} component={Home} />
          }
          <Route exact path={['/signin']} component={SignIn} />
          <Route exact path={['/signup']} component={SignUp} />
        </Switch>
      </Router>
    </RelayEnvironmentProvider>
  );
}

export const AuthApp = () => (
  <MuiThemeProvider theme={theme}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </MuiThemeProvider>
);
