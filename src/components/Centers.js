import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { Query } from 'react-apollo'
import Map from './Map'

import GET_CENTERS from '../queries/centers_query'

class Centers extends Component {
	state = { visible: true }

	render() {
		return (
			<Map/>	
		)
	}
}

export default Centers