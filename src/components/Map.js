import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

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
  
class Map extends Component {

  constructor(props) {
    super(props)
    this.state = { longitude: '', latitude: '' }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          let currentUserPosition = position.coords
          const { longitude, latitude } = currentUserPosition
          this.setState({ longitude, latitude  })
      },
      (error) => {
          console.log(error)
      }
  )
  }

  render() {
    const { longitude, latitude } = this.state

    if (!longitude || !latitude) {
      return <Spinner visible={true} textContent={"Accessing your location..."} textStyle={{color: '#fff'}} />
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
      </View>
    );
  }
}

export default Map