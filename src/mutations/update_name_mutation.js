import gql from 'graphql-tag'

// @client decorator indicates
// that the mutation is used for updating
// local state not with graphql backend

export default gql `
    mutation updateName($name: String!) {
        updateName(name: $name) @client {
            name
        }
    }
`