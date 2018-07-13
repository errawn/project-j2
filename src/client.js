import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'

import { API_ENDPOINT } from './config/keys'

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
})

const client = new ApolloClient({
  link: new HttpLink({ uri: API_ENDPOINT }),
  cache
});

export default client
