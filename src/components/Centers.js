import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { Query } from 'react-apollo'

import GET_CENTERS from '../queries/centers_query'

export default class Centers extends Component {
	render() {
		return (
			<View>
	      		<Query query={GET_CENTERS}>
      			{({ loading, error, data }) => {
      				if (loading) { return <Text>Loading...</Text> }
      				if (error) { return <Text>{error.message}</Text> }
      				return (
      					<View>
							{ data.centers.map(center => <Text key={center.id}>{center.name}</Text>) }	      						
      					</View>
      				)
      			}}
	      		</Query>
	    	</View>
		)
	}
}