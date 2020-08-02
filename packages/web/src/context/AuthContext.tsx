import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';

interface User {
  username: string;
  password: string;
  fullName: string;
  contactNumber: string;
}

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AuthContextType =
  | {
      token: string;
      authenticated: true;
      username: string;
      role: UserRole;
    }
  | {
      authenticated: false;
    };

export interface AuthContextStateType {
  auth: AuthContextType;
  SignIn: (
    username: string,
    password: string
  ) => Promise<boolean | Response | void>;
  SignUp: (user: User) => Promise<boolean | Response | void>;
  SignOut: (logOutMessage?: string) => void;
}

export const AuthContext = createContext<AuthContextStateType>({
  auth: {authenticated: false},
  SignIn: async () => {},
  SignOut: () => {},
  SignUp: async () => {},
});

const serverUri = 'http://localhost:5000';

interface Props {
  children: JSX.Element;
}

export function AuthContextProvider({children}: Props) {
  const [loggingOut, setLoggingOut] = useState(false);
  const authTokenLoaded = React.useRef<boolean>(false);
  const [logOutMessage, setLogoutMessage] = useState(
    'You have been logged out'
  );
  const [localAuth, setLocalAuth] = useLocalStorage<AuthContextType>('auth', {
    authenticated: false,
  });
  // @ts-ignore
  const [auth, setAuth] = useState<AuthContextType>(() => {
    authTokenLoaded.current = true;
    return localAuth;
  });
  const SignIn = React.useCallback(
    async function (username: string, password: string) {
      setLoggingOut(false);

      const body = new URLSearchParams();
      body.set('grant_type', 'client_credentials');

      // TODO: Only throws if the server cant be reached
      const result = await fetch(`${serverUri}/signin`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        method: 'POST',
        body,
      });

      if (result.ok) {
        const responseObject = await result.json();
        const token = responseObject.accessToken;
        const role = responseObject.role;

        const newAuth: AuthContextType = {
          authenticated: true,
          token,
          username,
          role,
        };
        setAuth(newAuth);
        setLocalAuth(newAuth);
        return result;
      } else {
        const responseObject = await result.json();
        return responseObject;
      }
      // TODO handle timeout
    },
    [setLocalAuth]
  );

  const SignUp = React.useCallback(async function (userData: User) {
    const {username, password, fullName, contactNumber} = userData;
    setLoggingOut(false);
    const json = {grant_type: 'client_credentials', fullName, contactNumber};

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const result = await fetch(`${serverUri}/signup`, {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(json),
    });

    const responseObject = await result.json();
    return responseObject;
  }, []);

  async function SignOut(logOutMessage?: string) {
    //** sCalls useEffects
    //* with logout as dependency for ONLY Logout
    //* as the callback for the state update on is logging out
    //**
    if (logOutMessage) {
      setLogoutMessage(logOutMessage);
      setLoggingOut(true);
    } else {
      setLoggingOut(true);
    }
  }
  const doLogout = useCallback(
    (message: string) => {
      if (auth.authenticated === true) {
        setAuth({authenticated: false});
        localStorage.removeItem('auth');
        // alert(message);
        setLogoutMessage('You have been logged out');
      }
    },
    [auth.authenticated]
  );

  useEffect(() => {
    if (loggingOut) {
      //** Calls callback with dependencies on auth and
      //* history so that the useEffect don't fire on those dependencies
      //**
      doLogout(logOutMessage);
      setLoggingOut(false);
    }
  }, [loggingOut, doLogout, logOutMessage]);

  useEffect(() => {
    const authString = localStorage.getItem('auth') as string;
    const localAuth = JSON.parse(authString);
    let auth: AuthContextType = {authenticated: false};
    if (
      localAuth !== null
      // TODO: Localize expiry
    ) {
      auth = {
        authenticated: localAuth.authenticated,
        token: localAuth.token,
        username: localAuth.username,
        role: localAuth.role,
      };
      setAuth(auth);
    }
  }, []);

  // Prevent double render before auth token loaded
  if (!authTokenLoaded.current) {
    return null;
  }

  return (
    <AuthContext.Provider value={{auth, SignIn, SignOut, SignUp}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuthContextProvider = () => useContext(AuthContext);
