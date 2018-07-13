import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { Query } from 'react-apollo'
import Spinner from 'react-native-loading-spinner-overlay'

import GET_CENTERS from '../queries/centers_query'

class Centers extends Component {
	state = { visible: true }

	render() {
		return (
			<View>
	      		<Query query={GET_CENTERS}>
      			{({ loading, error, data }) => {
      				if (loading) { return <Spinner visible={this.state.visible} textContent={"Getting nearest centers..."} textStyle={{color: '#fff'}} /> }
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

export default Centers