/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { ApolloProvider } from 'react-apollo'
import { View, Text } from 'react-native'

import client from '../client'
import Centers from './Centers'
import Map from './Map'

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View>
          <Text>Hello!</Text>
        </View>
      </ApolloProvider>
    );
  }
}