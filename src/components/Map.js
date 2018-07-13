import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import { graphql, compose } from 'react-apollo'
import GET_CURRENT_LOCATION from '../queries/curent_location_query'
import UPDATE_CURRENT_LOCATION from '../mutations/update_current_location_mutation'

import PlaceSearch from './PlaceSearch'
  
class Map extends Component {
  state = { isVisible: false }

  componentDidMount() {
    // close overlay spinner
    this.setState({ isVisible: false })
    // get user's current location and update local State
    navigator.geolocation.getCurrentPosition(
      (position) => {
          let currentUserPosition = position.coords
          const { longitude, latitude } = currentUserPosition
          const { updateCurrentLocation } = this.props
          updateCurrentLocation({ 
              variables: { 
                  longitude,
                  latitude
              } 
          })
      },
      (error) => {
          console.log(error)
      }
    )
  }

  render() {
    const { currentLocation: { longitude, latitude } } = this.props
    const { isVisible } = this.state

    if (!longitude || !latitude) {
      return <Spinner visible={isVisible} textContent={"Accessing your location..."} textStyle={{color: '#fff'}} />
    }

    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        {this.props.centers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.lat, longitude: marker.long }}
            title={marker.name}
            description={marker.name}
          />
        ))}
        </MapView>
        <PlaceSearch />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


export default compose(
  graphql(UPDATE_CURRENT_LOCATION, { name: 'updateCurrentLocation' }),
  graphql(GET_CURRENT_LOCATION, {
    props: ({ data: { currentLocation } }) => ({
      currentLocation
    })
  })
)(Map)