import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'

import { graphql, compose } from 'react-apollo'
import GET_CURRENT_LOCATION from '../queries/curent_location_query'
import UPDATE_NAME from '../mutations/update_name_mutation'

class PlaceSearch extends Component {
    openSearchModal() {
        const { updateName } = this.props
        RNGooglePlaces.openAutocompleteModal({
            country: 'PH'
        })
        .then((place) => {
            updateName({ variables: { name: 'Warren!' } })
            console.log(place);
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    render() {
        const { 
            currentLocation
        } = this.props
        return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.openSearchModal()}
            >
            <Text>Not my location {currentLocation.name}</Text>
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
    graphql(UPDATE_NAME, { name: 'updateName' }),
    graphql(GET_CURRENT_LOCATION, {
        props: ({ data: { currentLocation } }) => ({
            currentLocation
        })
    })
)(PlaceSearch)