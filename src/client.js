import ApolloClient from 'apollo-boost'
import { API_ENDPOINT } from './config/keys'
const client = new ApolloClient({
  uri: API_ENDPOINT
});

export default client
