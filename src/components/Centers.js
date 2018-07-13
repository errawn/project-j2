import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { Query } from 'react-apollo'
import Spinner from 'react-native-loading-spinner-overlay'
import Map from './Map'

import GET_CENTERS from '../queries/centers_query'

class Centers extends Component {
	state = { visible: true }

	render() {
		return (
			<Query query={GET_CENTERS}>	
			{({ loading, error, data }) => {	
				if (loading) { return <Spinner visible={this.state.visible} textContent={"Getting nearest centers..."} textStyle={{color: '#fff'}} /> }	
				if (error) { return <Text>{error.message}</Text> }	
				return (
					<Map centers={data.centers} />
				)	
			}}	
	      	</Query>	
		)
	}
}

export default Centers