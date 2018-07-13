import gql from 'graphql-tag'

// @client decorator indicates
// that the mutation is used for updating
// local state not with graphql backend

export default gql `
    mutation updateCurrentLocation($latitude: Float!, $longitude: Float!) {
        updateCurrentLocation(latitude: $latitude, longitude: $longitude) @client {
            latitude
            longitude
        }
    }
`