import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'

// client side local state
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'

import { API_ENDPOINT } from './config/keys'

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
})

// default global state store (like redux but apollo!)
const defaultState = {
  currentLocation: {
    __typename: 'CurrentLocation',
    latitude: '',
    longitude: '',
    name: 'Edgardo'
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState // default state
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink, // local state
    new HttpLink({ uri: API_ENDPOINT }), // link that connects to /graphql backend
  ]), 
  cache
});

export default client
