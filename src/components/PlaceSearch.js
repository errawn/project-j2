import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'

import { graphql, compose } from 'react-apollo'
import GET_CURRENT_LOCATION from '../queries/curent_location_query'
import UPDATE_CURRENT_LOCATION from '../mutations/update_current_location_mutation'

class PlaceSearch extends Component {
    openSearchModal() {
        const { updateCurrentLocation } = this.props
        RNGooglePlaces.openAutocompleteModal({
            country: 'PH'
        })
        .then(({ longitude, latitude }) => {
            console.log(longitude, latitude);
            updateCurrentLocation({ 
                variables: { 
                    longitude,
                    latitude
                } 
            })
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    render() {
        const { currentLocation: { longitude, latitude } } = this.props
        return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.openSearchModal()}
            >
            <Text>Lat: {latitude}</Text>
            <Text>Long: {longitude}</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }
}

export default compose(
    graphql(UPDATE_CURRENT_LOCATION, { name: 'updateCurrentLocation' }),
    graphql(GET_CURRENT_LOCATION, {
        props: ({ data: { currentLocation } }) => ({
            currentLocation
        })
    })
)(PlaceSearch)