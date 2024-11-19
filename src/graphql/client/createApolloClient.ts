import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { headers } from 'next/headers';

const createApolloClient = () => {

  const getCookieHeader = () => {
    if(typeof headers === 'undefined'){
      return ''
    }

    return headers().get('Cookie') ?? ''
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',  // Disables force-fetching on the server (so queries are only run once)
    link: createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/graphql`,
      credentials: 'same-origin',
      headers: {
        cookie: getCookieHeader(),
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
