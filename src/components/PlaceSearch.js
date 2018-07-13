import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'

import { graphql, compose } from 'react-apollo'
import GET_CURRENT_LOCATION from '../queries/curent_location_query'

class PlaceSearch extends Component {
    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal({
            country: 'PH'
        })
        .then((place) => {
            console.log(place);
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    render() {
        const { currentLocation: { name, longitude, latitude } } = this.props
        return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.openSearchModal()}
            >
            <Text>Not my location {name}</Text>
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }
}

export default compose(
    graphql(GET_CURRENT_LOCATION, {
        props: ({ data: { currentLocation } }) => ({
            currentLocation
        })
    })
)(PlaceSearch)