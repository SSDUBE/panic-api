/* tslint:disable no-any */
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
  errorMiddleware,
  retryMiddleware,
  progressMiddleware,
  SubscribeFunction,
} from 'react-relay-network-modern/es';
import {Environment, RecordSource, Store, INetwork} from 'relay-runtime';

const SHOW_PROGRESS = false;
const IS_DEV_ENV = process.env.NODE_ENV === 'development';
const serverUri = 'http://localhost:5000';

type HandleLogoutFn = () => void;
type GetAuthTokenFn = () => string;

function createNetworkLayer(
  handleLogout: HandleLogoutFn,
  getAuthTokenFn: GetAuthTokenFn,
  subscribeFn: SubscribeFunction
): INetwork {
  const network = new RelayNetworkLayer(
    [
      urlMiddleware({
        url: () => Promise.resolve(`${serverUri}/graphql`),
        headers: {
          Authorization: `Bearer ${getAuthTokenFn()}`,
        },
      }),
      IS_DEV_ENV ? errorMiddleware() : null,
      retryMiddleware({
        fetchTimeout: 45000,
        retryDelays: [3200, 6400, 12800],
        forceRetry: (cb, delay) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          window.forceRelayRetry = cb;
          // eslint-disable-next-line no-console
          console.log(
            `call \`forceRelayRetry()\` for immediately retry! Or wait ${delay} ms.`
          );
        },
        statusCodes: [500, 503, 504],
      }),
      authMiddleware({
        allowEmptyToken: true,
        token: getAuthTokenFn(),
      }),
      SHOW_PROGRESS
        ? progressMiddleware({
            onProgress: (current, total) => {
              // eslint-disable-next-line no-console
              console.log(
                `Downloaded: ${current} B, total: ${
                  total ? total.toString() : '0'
                } B`
              );
            },
          })
        : null,

      (next) => async (req) => {
        req.fetchOpts.headers.Accept = 'application/json';
        req.fetchOpts.headers['Content-Type'] = 'application/json';

        // TODO x-Request-ID
        // req.fetchOpts.headers['X-Request-ID'] = uuid.v4(); // add `X-Request-ID` to request headers
        req.fetchOpts.credentials = 'same-origin'; // allow to send cookies (sending credentials to same domains)

        try {
          return await next(req);
        } catch (ex) {
          // Logout user out if we get a 401
          if (ex.res && ex.res.status === 401) {
            handleLogout();
          } else {
            // Report error
            console.log('something went wrong ', ex);
          }

          throw ex;
        }
      },
    ],
    {
      subscribeFn,
      noThrow: true,
    }
  );

  return (network as unknown) as INetwork;
}

export default function createEnv(
  handleLogout: HandleLogoutFn,
  getAuthTokenFn: GetAuthTokenFn
) {
  const handlerProvider = undefined;

  const network = createNetworkLayer(
    handleLogout,
    getAuthTokenFn,
    // @ts-ignore
    null
  );
  const source = new RecordSource();
  const relayStore = new Store(source);

  return new Environment({
    handlerProvider,
    network,
    store: relayStore,
  });
}
