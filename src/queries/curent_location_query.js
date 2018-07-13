import gql from 'graphql-tag'

export default gql `
    query {
        currentLocation @client {
            latitude,
            longitude
        }
    }
`