'use client'

import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import React from 'react'

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });

const ApolloProvider: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
  return (
    <Provider client={client}>
        {children}
    </Provider>
  )
}

export default ApolloProvider