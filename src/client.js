import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://318b0850.ngrok.io/graphql'
});

export default client
