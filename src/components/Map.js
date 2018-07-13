import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native'

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
  
  export default class MyApp extends React.Component {
    render() {
      const { region } = this.props;
      console.log(region);
  
      return (
        <View style ={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: 14.582913,
              longitude: 121.062174,
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