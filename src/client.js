import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'

// client side local state
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'

import gql from 'graphql-tag'

import { API_ENDPOINT } from './config/keys'

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
})

// default global state store (like redux but apollo!)
const defaultState = {
  currentLocation: {
    __typename: 'CurrentLocation',
    latitude: '',
    longitude: ''
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState, // default state
  // this resolvers serves like an action creator in Redux.
  //It updates local state
  resolvers: {
    Mutation: {
      // updateName mutation
      updateCurrentLocation: (_, { latitude, longitude }, { cache }) => {
        const query = gql `
          query {
              currentLocation @client {
                  latitude,
                  longitude
              }
          }
        `
        // get currentLocation
        const previousState = cache.readQuery({ query })
        // append currentLocation to previous state
        const data = {
          ...previousState,
          currentLocation: {
            ...previousState.currentLocation,
            latitude,
            longitude
          }
        }
        // update cache for ui to auto render!
        cache.writeData({ query, data })
        //get rid of the warning missing field
        return null
      }
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink, // local state
    new HttpLink({ uri: API_ENDPOINT }), // link that connects to /graphql backend
  ]), 
  cache
});

export default client
