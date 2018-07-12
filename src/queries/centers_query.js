import gql from 'graphql-tag'

export default gql `
	query GET_CLIENTS {
	  centers {
	    id
	    name
	    lat
	    long
	  }
	}
`