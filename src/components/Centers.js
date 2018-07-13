import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { Query } from 'react-apollo'
import Spinner from 'react-native-loading-spinner-overlay'
import MapView from 'react-native-maps'

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
						<MapView
							initialRegion={{
							latitude: 37.78825,
							longitude: -122.4324,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
							}}
						/>
      				)
      			}}
	      		</Query>
	    	</View>
		)
	}
}

export default Centers