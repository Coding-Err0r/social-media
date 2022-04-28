import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getOperationAST } from 'graphql';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';

const wsLink: any = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: String(process.env.NEXT_PUBLIC_WEBSOCKET_URL),
      options: {
        lazy: true,
        reconnect: true,
        connectionParams: () => {
          return { headers: { Authorization: 'Bearer TOKEN' } };
        }
      }
    })
  : null;

const httplink: any = new HttpLink({
  uri: String(process.env.NEXT_PUBLIC_HASURA_URL)
});

const link = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return (
          kind === 'OperationDefinition' &&
          operation === 'subscription'
        );
      },
      wsLink,
      httplink
    )
  : httplink;

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: link,
  cache: new InMemoryCache()
});

export default client;
